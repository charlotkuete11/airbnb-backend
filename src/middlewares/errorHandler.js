const errorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    res.status(errStatus).send({
        success: false,
        statut: errStatus,
        message: message,
        stack: process.env.NODE_ENV
    })
}

module.exports = errorHandler;