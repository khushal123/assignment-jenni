let errorResponse = (res, data, status = 400) => {
    res.status(status).json({
        status: status,
        message: "failure",
        response: data
    });
}

let successResponse = (res, data, status = 200) => {
    res.status(status).json({
        status: status,
        message: "success",
        response: data
    });
}

module.exports = {
    errorResponse, successResponse
}