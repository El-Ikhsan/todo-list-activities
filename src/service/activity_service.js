import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js"
import { createActivityValidation, getActivityValidation, searchActivityValidation, updateActivityValidation } from "../validation/activity_validation.js"
import { ResponseError } from "../error/response_error.js";



const create = async (user, request) => {
    const activity = await validate(createActivityValidation, request);
    if(!activity) {
        throw new ResponseError(401, "data is not valid");
    }

    activity.username = user.username;

    return prismaClient.activity.create({
        data: activity,
        select: {
            id: true,
            title: true,
            information: true,
            day: true,
            date: true,
            time: true,
        }
    });
}

const get = async (user, activityId) => {

    activityId = validate(getActivityValidation, activityId);
    const activity = await prismaClient.activity.findFirst({
        where: {
            username: user.username,
            id: activityId
        },
        select: {
            id: true,
            title: true,
            information: true,
            day: true,
            date: true,
            time: true,
        }
    });

    if(!activity) {
        throw new ResponseError(404, "activity is not found");
    }

    return activity;
}

const update = async (user, request) => {
    const activity = validate(updateActivityValidation, request);

    const totalActivity = await prismaClient.activity.count({
        where: {
            username: user.username,
            id: activity.id
        }
    });
   
    if (totalActivity !== 1) {
        throw new ResponseError(404, "activity is not found");
    }

    return prismaClient.activity.update({
        where: {
            id: activity.id
        },
        data: {
            id: activity.id,
            title: activity.title,
            information: activity.information,
            day: activity.day,
            date: activity.date,
            time: activity.time
        },
        select: {
            id: true,
            title: true,
            information: true,
            day: true,
            date: true,
            time: true,
        }
    });
}


const remove = async (user, request) => {
    const activityId = await validate(getActivityValidation, request);

    const findActivity = await prismaClient.activity.findFirst({
        where: {
            username: user.username,
            id: activityId
        }
    });

    if (!findActivity) {
        throw new ResponseError(404, "activity is not found");
    }

    return prismaClient.activity.delete({
        where: {
            id: activityId
        }
    });
}

const search = async (user, request) => {
    request = await validate(searchActivityValidation, request);

    const filters = [];
    filters.push({
        username: user.username
    })

    if (request.title) {
        filters.push({
            title: {
                contains: request.title,
                mode: 'insensitive',
            }
        });
    }

    if (request.day) {
        filters.push({
            day: {
                contains: request.day,
                mode: 'insensitive',
            }
        });
    }

    return prismaClient.activity.findMany({
        where: {
            AND: filters
        }
    });
    
}

export default {
    create,
    get,
    update,
    remove,
    search
}