"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const methodNotAllowed_1 = require("../errors/methodNotAllowed");
const adminController = new admin_controller_1.AdminController();
const adminRouter = (0, express_1.Router)();
exports.adminRouter = adminRouter;
adminRouter.route('/')
    .get((req, res) => adminController.read(req, res))
    .put((req, res) => adminController.update(req, res))
    .all(methodNotAllowed_1.methodNotAllowed);
