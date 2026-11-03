const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  console.log(`[${req.method}] ${req.originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - startTime;

    console.log(
      `Status: ${res.statusCode} | Duration: ${duration}ms`
    );
  });

  next();
};

export default requestLogger;
