import Joi from "joi";

// Signup validation
export const validateSignUp = {
    body:Joi.object().keys({
        username: Joi.string().required().error(new Error('Please provide your first name!')),
        email: Joi.string().email().required().error(new Error('Please provide your email!')),
        img: Joi.string().default("https://via.placeholder.com/150"),
        phone: Joi.string().required().error(new Error('Please provide your phone number!')),    
        password: Joi.string().required().error(new Error('Please provide your password!')),
        isBlocked: Joi.boolean().default(false),    
        // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().error(new Error('Please provide your password!')),
    })
};

// Login validation
export const validateLogin = {
    body:Joi.object().keys({
        email: Joi.string().email().required().error(new Error('Please provide your email!')),
        password: Joi.string().required().error(new Error('Please provide your password!')),
    })
};
