import Joi from 'joi';

const createActivityValidation = Joi.object({
  title: Joi.string().max(50).required(),
  information: Joi.string().max(500).optional().allow(''),
  day: Joi.string().max(10).required(),
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional().allow(''),
  time: Joi.string().pattern(/^\d{2}\:\d{2}$/).required(),
});

const getActivityValidation = Joi.number().positive().required();

const updateActivityValidation = Joi.object({
  id: Joi.number().positive().required(),
  title: Joi.string().max(50).required(),
  information: Joi.string().max(500).optional().allow(''),
  day: Joi.string().max(10).optional(),
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional().allow(''),
  time: Joi.string().pattern(/^\d{2}\:\d{2}$/).optional().allow('')
});

const searchActivityValidation = Joi.object({
  title: Joi.string().optional(),
  day: Joi.string().optional()
})

export {
    createActivityValidation,
    getActivityValidation,
    updateActivityValidation,
    searchActivityValidation
}