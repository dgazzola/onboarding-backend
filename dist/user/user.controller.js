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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
class UserController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.service.login(req.body);
                if (user === false) {
                    res.status(401).json({ message: 'Invalid email or password' });
                }
                else {
                    res.status(200).json(user);
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield this.service.update(req.body);
                res.status(200).json(updatedUser);
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
        this.readAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUsers = yield this.service.readAll();
                res.status(200).json(foundUsers);
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
        this.service = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
