"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodNotAllowed = methodNotAllowed;
function methodNotAllowed(req, res, next) {
    next({
        status: 405,
        message: `${req.method} not allowed for ${req.originalUrl}`,
    });
}
