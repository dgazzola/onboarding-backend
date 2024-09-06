"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const methodNotAllowed_1 = require("../errors/methodNotAllowed");
const userController = new user_controller_1.UserController();
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.route('/sign-in')
    .post((req, res) => userController.login(req, res))
    .all(methodNotAllowed_1.methodNotAllowed);
userRouter.route('/')
    .get((req, res) => userController.readAll(req, res))
    .put((req, res) => userController.update(req, res))
    .all(methodNotAllowed_1.methodNotAllowed);
//# sourceMappingURL=user.router.js.map