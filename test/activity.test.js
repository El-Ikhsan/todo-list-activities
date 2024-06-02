import supertest from "supertest";
import { createManyTestActivityUser, createTestActivityUser, createTestUser, getTestActivity, removeAllActivityUser, removeTestUser } from "./test-util";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/loggin.js";

describe("POST /api/activities", function() {

    beforeEach (async () => {
        await createTestUser();
    });

    afterEach (async () => {
        await removeAllActivityUser();
        await removeTestUser();
    });

    it("should can create activity", async () => {
        const result = await supertest(web)
        .post("/api/activities")
        .set("authorization", "test")
        .send({
            title: "test",
            information: "test",
            day: "test",
            date: "2024-01-01",
            time: "12:00"
        });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.information).toBe("test");
        expect(result.body.data.day).toBe("test");
        expect(result.body.data.date).toBe("2024-01-01");
        expect(result.body.data.time).toBe("12:00");
    });
    it("should reject day is required", async () => {
        const result = await supertest(web)
        .post("/api/activities")
        .set("authorization", "test")
        .send({
            title: "test",
            information: "test",
            day: "",
            date: "2024-01-01",
            time: "12:00"
        });

        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe("GET /api/activities/:activityId", function() {
    beforeEach (async () => {
        await createTestUser();
        await createTestActivityUser();
    });

    afterEach (async () => {
        await removeAllActivityUser();
        await removeTestUser();
    });
    it("should can get activity", async () => {
        const testActivity = await getTestActivity();
        const result = await supertest(web)
        .get("/api/activities/" + testActivity.id)
        .set("authorization", "test");

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testActivity.id);
        expect(result.body.data.title).toBe(testActivity.title);
        expect(result.body.data.information).toBe(testActivity.information);
        expect(result.body.data.day).toBe(testActivity.day);
        expect(result.body.data.date).toBe(testActivity.date);
        expect(result.body.data.time).toBe(testActivity.time);

    });
    it("should reject get activity", async () => {
        const testActivity = await getTestActivity();
        const result = await supertest(web)
        .get("/api/activities/" + testActivity.id + 1)
        .set("authorization", "test");

        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});

describe("PATCH /api/activities/:activityId", function() {
    beforeEach (async () => {
        await createTestUser();
        await createTestActivityUser();
    });

    afterEach (async () => {
        await removeAllActivityUser();
        await removeTestUser();
    });
    it("should can update all data activity", async () => {
        const testActivity = await getTestActivity();
        const result = await supertest(web)
        .patch("/api/activities/" + testActivity.id)
        .set("authorization", "test")
        .send({
            title: "makan pagi",
            information: "testi",
            day: "testi",
            date: "2024-11-11",
            time: "12:12"
        });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testActivity.id);
        expect(result.body.data.title).toBe("makan pagi");
        expect(result.body.data.information).toBe("testi");
        expect(result.body.data.day).toBe("testi");
        expect(result.body.data.date).toBe("2024-11-11");
        expect(result.body.data.time).toBe("12:12");
    });

    it("should reject update activity is not found", async () => {
        const testActivity = await getTestActivity();
        const result = await supertest(web)
        .patch("/api/activities/" + testActivity.id + 2)
        .set("authorization", "test")
        .send({
            title: "makan pagi"
        });

        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it("should can update title activity", async () => {
        const testActivity = await getTestActivity();
        const result = await supertest(web)
        .patch("/api/activities/" + testActivity.id)
        .set("authorization", "test")
        .send({
            title: "makan pagi"
        });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testActivity.id);
        expect(result.body.data.title).toBe("makan pagi");
    });

    it("should reject update title is required", async () => {
        const testActivity = await getTestActivity();
        const result = await supertest(web)
        .patch("/api/activities/" + testActivity.id)
        .set("authorization", "test")
        .send({
            information: "makan pagi"
        });

        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe("DELETE /api/activities/:activityId", function() {
    beforeEach (async () => {
        await createTestUser();
        await createTestActivityUser();
    });

    afterEach (async () => {
        await removeAllActivityUser();
        await removeTestUser();
    });

    it("should can remove activity", async () => {
        let testActivity = await getTestActivity();
        const result = await supertest(web)
        .delete("/api/activities/" + testActivity.id)
        .set("authorization", "test");

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBe("ok");
        
        testActivity = await getTestActivity();
        expect(testActivity).toBeNull();
    });

    it("should reject remove activity is not found", async () => {
        const testActivity = await getTestActivity();
        const result = await supertest(web)
        .delete("/api/activities/" + testActivity.id + 1)
        .set("authorization", "test");

        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});

describe("GET /api/activities", function() {
    beforeEach (async () => {
        await createTestUser();
        await createManyTestActivityUser();
        await createManyTestActivityUser();
    });

    afterEach (async () => {
        await removeAllActivityUser();
        await removeTestUser();
    });

    it("should can search by title", async () => {
        const result = await supertest(web)
        .get("/api/activities")
        .set("authorization", "test")
        .query({
            title: "test1"
        });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(2);

        const testActivity = result.body.data[0];
        expect(testActivity.title).toBe("test1");

    });
    it("should can search by day", async () => {
        const result = await supertest(web)
        .get("/api/activities")
        .set("authorization", "test")
        .query({
            day: "Hari5"
        });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(2);

        const testActivity = result.body.data[0];
        expect(testActivity.day).toBe("hari5");

    });
});