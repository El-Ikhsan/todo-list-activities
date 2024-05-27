import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { LoginUserValidation, getUserValidation, registerUserValidation, updateUserValidation } from "../validation/user_validation.js";
import { ResponseError } from "../error/response_error.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import { logger } from "../application/loggin.js";


const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "username already exsist");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    });

}

const login = async (request) => {
    const loginRequest = validate(LoginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "username or password wrong");
    }

    const passwordValidation = await bcrypt.compare(loginRequest.password, user.password);
    if (!passwordValidation) {
        throw new ResponseError(401, "username or password wrong");
    } 
    
    const token = uuid().toString(loginRequest.username);
    logger.info(token);
    return prismaClient.user.update({
        data:{
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });
}

const get = async (request) => {
    const username = await validate(getUserValidation, request);
    
    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true
        }
    });

    if (!user) {
        throw new (404, "user is not found");
    }

    return user;
} 

const update = async (request) => {
    const user = await validate(updateUserValidation, request);

    const userTotal = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (userTotal !== 1) {
        throw new ResponseError(404, "user is not found");
    }

    const data = {};
    if (user.name) {
        data.name = user.name;
    }   
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.user.update({
        data: data,
        where: {
            username: user.username
        },
        select: {
            username: true,
            name: true
        }
    });
}

const logut = async (username) => {
    username = await validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }
    
    return prismaClient.user.update({
        where: {
            username: user.username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    });

}
export default{
    register,
    login,
    get,
    update,
    logut
}