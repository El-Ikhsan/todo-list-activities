import activityService from "../service/activity_service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await activityService.create(user, request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const activityId = req.params.activityId;
        const result = await activityService.get(user, activityId);
        res.status(200).json({
            data: result
        });

    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const activityId = req.params.activityId;
        const request = req.body;
        request.id = activityId;
        const result = await activityService.update(user, request);
        res.status(200).json({
            data: result
        });

    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const activityId = req.params.activityId;
        await activityService.remove(user, activityId);
        res.status(200).json({
            data: "ok"
        });
        
    } catch (e) {
        next(e);
    }
}

const search = async (req, res, next) => {
    try {
        const user = req.user;
        const request = {
            title: req.query.title,
            day: req.query.day
        }
        const result = await activityService.search(user, request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}