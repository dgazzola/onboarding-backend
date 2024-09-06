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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
class AdminController {
    constructor() {
        this.read = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.service.read();
                res.status(200).json(admin);
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.service.update(req.body);
                res.status(201).json(admin);
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
        this.service = new admin_service_1.AdminService();
    }
}
exports.AdminController = AdminController;
