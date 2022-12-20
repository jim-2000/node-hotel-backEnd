import {Joi} from "celebrate";

// Signup validation
export const validateSignUp = {
    body:Joi.object().keys({
        username: Joi.string().required().error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case "any.empty":
                  err.message = "Value should not be empty!";
                  break;
                default:
                  err.message = `Something went wrong in username!`;
                  break;
              }
            });
            return errors;
          }),
        email: Joi.string().email().required().error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case "any.empty":
                  err.message = "Email should not be empty!";
                  break;
                default:
                  err.message = `Something went wrong in username!`;
                  break;
              }
            });
            return errors;
          }),
        img: Joi.string().default("https://via.placeholder.com/150"),
        phone: Joi.string().required().error(errors => {           
            errors.forEach(err => {
              switch (err.type) {
                case "any.empty":
                  err.message = "Phone Number should not be empty!";
                  break;
                default:
                  err.message = `Something went wrong in username!`;
                  break;
              }
            });
            return errors;
          }), 
        password: Joi.string().required().min(6).max(64).error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case "any.empty":
                  err.message = "Value should not be empty!";
                  break;
                case "string.min":
                  err.message = `Value should have at least ${err.context.limit} characters!`;
                  break;
                case "string.max":
                  err.message = `Value should have at most ${err.context.limit} characters!`;
                  break;
                default:
                  break;
              }
            });
            console.log(errors);
            return errors;
          }),
        isBlocked: Joi.boolean().default(false),    
        // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().error(new Error('Please provide your password!')),
    })
    
};

// Login validation
export const validateLogin = {
    body:Joi.object().keys({
        email: Joi.string().email().required().error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case "any.empty":
                  err.message = "Email should not be empty!";
                  break;
                default:
                  err.message = `Something went wrong in username!`;
                  break;
              }
            });
            return errors;
        }),
        password: Joi.string().required().min(6).max(64).error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case "any.empty":
                  err.message = "Value should not be empty!";
                  break;
                case "string.min":
                  err.message = `Value should have at least ${err.context.limit} characters!`;
                  break;
                case "string.max":
                  err.message = `Value should have at most ${err.context.limit} characters!`;
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
    })
};
