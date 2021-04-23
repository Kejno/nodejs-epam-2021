import Joi from 'joi';

const bodySchemaForCreate = Joi.object({
    user_id: Joi.string()
        .required(),
    group_id: Joi.string()
        .required()
});

const bodySchemaForUpdate = Joi.object({
    user_id: Joi.string(),
    group_id: Joi.string()
});

export { bodySchemaForCreate, bodySchemaForUpdate };
