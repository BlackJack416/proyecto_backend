import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';
import logger from "./logger.js";
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const numOfCpus = cpus().length;
const __dirname = path.resolve();
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI).then(() => {
    logger.info('Connected to db')
}).catch(err => {
    logger.error('Cannot connect')
})

app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res) => {
    res.send(process.env.GOOGLE_API_KEY || '');
});
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        logger.info('Mongoose disconnected on app termination');
        process.exit(0);
    });
});

io.on('connection', (socket) => {
  logger.info('connection', socket.id);
  socket.on('disconnect', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      logger.info('Offline', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });
  socket.on('onLogin', (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    logger.info('Online', user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit('updateUser', updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit('listUsers', users);
    }
  });

  socket.on('onUserSelected', (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit('selectUser', existUser);
    }
  });

  socket.on('onMessage', (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit('message', message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('message', message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit('message', {
          name: 'Admin',
          body: 'Sorry. I am not online right now',
        });
      }
    }
  });
});

if (cluster.isPrimary) {
  logger.info(`CPUs: ${numOfCpus}`)
  logger.info(`Primary ${process.pid} is running`)
  for (let i = 0; i < numOfCpus; i++) {
      cluster.fork();
  }
  cluster.on('exit', (worker) => {
      logger.warn(`Worker ${worker.process.pid} died`, new Date().toLocaleString())
      cluster.fork()
  })
} else {
  const port = (process.env.PORT || 5000)
  app.get('/', (req, res) => {
      res.send(`Worker on port ${port} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
  })
  httpServer.listen(port, err => {
      if (!err) { logger.info(`Worker on port ${port} - PID worker ${process.pid}`) }
  })
}