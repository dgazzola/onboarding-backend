"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = require("./database");
const user_router_1 = require("./user/user.router");
const admin_router_1 = require("./admin/admin.router");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === 'production';
const corsOptions = isProduction
    ? {
        // origin: 'https://gazzola-onboard-frontend-968f4888cbbf.herokuapp.com',
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
    : {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    };
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, database_1.connect)();
app.options('*', (0, cors_1.default)(corsOptions)); // include before defining routes
app.use('/user', user_router_1.userRouter);
app.use('/admin', admin_router_1.adminRouter);
app.use((req, res, next) => {
    console.log(req.url);
    const error = new Error('Not Found');
    res.status(404);
    next(error);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(res.statusCode || 500);
    res.json({ message: err.message });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
