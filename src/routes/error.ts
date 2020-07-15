const errorHandler = (res: any, errorMessage: string, errorCode?: string) => {
  if (errorCode === "invalidToken" || errorCode === "refreshExpired") {
    return res.status(403).send({
      success: false,
      message: errorMessage,
      code: errorCode,
    });
  } else {
    return res.status(400).send({
      success: false,
      message: errorMessage,
    });
  }
};

export { errorHandler };
