import request from "supertest";
import { expect } from "chai";

describe("test api restfull", () => {
	describe("Testing GET", () => {
		it("It should throw a status 200", async () => {
			let response = await request("http://localhost:5000").get(
				"/api/products"
			);
			expect(response.status).to.eql(200);
		});
	});
	describe("Testing POST", () => {
		it("Adding a product expected", async () => {
			let product = {
				name: "New product",
				price: 100,
				image: "http//www.teste.com",
			};
			let response = await request("http://localhost:5000")
				.post("/api/products")
				.send(product);
			expect(response.status).to.eql(200);

			const prod = response.body;
			expect(prod).to.include.keys("name", "price", "image");
			expect(prod.name).to.eql("New product");
			expect(prod.price).to.eql(100);
			expect(prod.name).to.eql(product.name);
			expect(prod.price).to.eql(product.price);
			expect(prod.image).to.eql(product.image);
		});
	});
	describe("Testing PUT", () => {
		it("Refreshing product data expected", async () => {
			let product = {
				name: "Refreshed",
				price: 90,
				image: "http//www.teste2.com",
			};
			let response = await request("http://localhost:5000")
				.put("/api/products/123456789")
				.send(product);

			expect(response.status).to.eql(200);

			const prod = response.body;
			expect(prod).to.include.keys("name", "price", "image");
			expect(prod.name).to.eql("Refreshed");
			expect(prod.price).to.eql(90);
		});
	});
	describe("Testing DELETE", () => {
		it("Deleting a product expected", async () => {
			let response = await request("http://localhost:5000").delete(
				"/api/products/123456789"
			);
			expect(response.status).to.eql(200);
			const resp = response.body;
			expect(resp).to.include.keys("deletedCount");
			expect(resp.deletedCount).to.eql(1);
		});
	});
});