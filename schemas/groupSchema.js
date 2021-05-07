import Joi from 'joi';

const bodySchemaForCreate = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    permissions: Joi.array()
        .items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
        .required()
});

const bodySchemaForUpdate = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30),
    permissions: Joi.array()
        .items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
});

export { bodySchemaForCreate, bodySchemaForUpdate };
