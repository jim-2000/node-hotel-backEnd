import Joi from "joi";

// Login validation
export const checkRoomAvaliblityValidation = {
    body:Joi.object().keys({
        checkIn: Joi.date().required().error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case "any.empty":
                  err.message = "Checkin Date could't be empty YY-MM-DD!";
                  break;
                default:
                  err.message = `Something went wrong in CheckIn!`;
                  break;
              }
            });
            return errors;
        }),
        checkOut: Joi.date().required().error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case "any.empty":
                  err.message = "Checkin Date could't be empty YY-MM-DD!";
                  break;
                default:
                  err.message = `Something went wrong in CheckIn!`;
                  break;
              }
            });
            return errors;
        }),
        roomID: Joi.string().required().error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case "any.empty":
                  err.message = "Room ID could't be empty!";
                  break;
                default:
                  err.message = `Something went wrong in RoomID!`;
                  break;
              }
            });
            return errors;
        }),
    })
};
