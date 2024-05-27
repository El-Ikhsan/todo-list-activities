import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    });
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("xxx", 10),
            name: "test",
            token: "test"
        }
    });
} 

export const getUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

export const removeAllActivityUser = async () => {
    await prismaClient.activity.deleteMany({
        where: {
            username: "test"
        }
    });
}

export const createTestActivityUser = async () => {
    await prismaClient.activity.create({
        data: {
            username: "test",
            title: "test",
            information: "test",
            day: "test",
            date: "2024-01-01",
            time: "12:00"
        }
    });
}

export const createManyTestActivityUser = async () => {
    for (let i = 1; i<=5; i++) {
        await prismaClient.activity.create({
            data: {
                username: "test",
                title: `test${i}`,
                information: "test",
                day: `hari${i}`,
                date: "2024-01-01",
                time: "12:00"
            }
        });
    }
}

export const getTestActivity = async () => {
    return prismaClient.activity.findFirst({
        where: {
            username: "test"
        }
    });
}