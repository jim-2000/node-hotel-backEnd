// error exception

class ErrorException extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }

    static badRequest(message) {
        return new ErrorException(400, message);
    }
    // 
    static notFound(message) {
        return new ErrorException(404, message);
    }
   
    //
    static unauthorized(message) {
        return new ErrorException(401, message);
    }
    // duplicate user
    static duplicateUser(message) {
        return new ErrorException(400, message);
    }
 

}