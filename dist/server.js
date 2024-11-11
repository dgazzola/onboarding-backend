"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
        origin: process.env.FRONTEND_URL || 'https://onboarding-frontend-one.vercel.app/',
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
(0, database_1.connect)().catch((err) => console.error('Database connection failed:', err));
app.use('/user', user_router_1.userRouter);
app.use('/admin', admin_router_1.adminRouter);
app.use((req, res) => {
    console.log(req.url);
    res.status(404).json({ message: 'Not Found' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(res.statusCode || 500).json({ message: err.message });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Gracefully shutting down');
    yield (0, database_1.disconnect)();
    process.exit(0);
}));
//# sourceMappingURL=server.js.map