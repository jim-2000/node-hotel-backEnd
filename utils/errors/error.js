export const createError = (res, status,msg)=>{
    const err = new Error();
    err.status = status;
    err.message= msg;
   res.status(status).json({
        status,
        message: msg,

  });
}

export const sendErrorDev = (err, res,) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  };
  
export const sendError = (err, res,statusCode) => {
    res.status(statusCode).json({ 
      message: err,
      status: statusCode,
    });
};

// send user create error
export const sendUserCreateError = (res, status,msg)=>{
 
}
  