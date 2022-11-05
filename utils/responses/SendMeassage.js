const SendMessage = (res, message, status) => {
    res.status(status ? status : 404).json({  
      message,
    });
  };
  
  export default SendMessage;
  