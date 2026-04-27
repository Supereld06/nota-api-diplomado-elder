export const successResponse = (res, status, data) => {
    return res.status(status).json({
        status,
        data
    });
};

export const errorResponse = (res, status, message) => {
    return res.status(status).json({
        status,
        error: status === 403 ? "Forbidden" : "Error",
        message
    });
};