import Joi from 'joi';

export const signupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().regex(/^\S+@\S+\.\S{2,}$/).lowercase().required().messages({
        'string.pattern.base': 'Please enter a valid email address in the format name@example.example',
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});


export const loginSchema = Joi.object({
    email: Joi.string().regex(/^\S+@\S+\.\S{2,}$/).lowercase().required().messages({
        'string.pattern.base': 'Please enter a valid email address in the format name@example.example',
    }),
    password: Joi.string().required(),
});

export const blogSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});
export const subscribeSchema = Joi.object({
    email: Joi.string().regex(/^\S+@\S+\.\S{2,}$/).lowercase().required().messages({
        'string.pattern.base': 'Please enter a valid email address in the format name@example.example',
    }),
    
});

export const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().regex(/^\S+@\S+\.\S{2,}$/).lowercase().required().messages({
        'string.pattern.base': 'Please enter a valid email address in the format name@example.example',
    }),
    message: Joi.string().required()
});
