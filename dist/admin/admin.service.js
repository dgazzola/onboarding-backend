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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const admin_models_1 = require("./models/admin.models");
class AdminService {
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            let admin = yield admin_models_1.Admin.findOne();
            if (!admin) {
                admin = new admin_models_1.Admin({
                    aboutme: 3,
                    address: 2,
                    birthdate: 2,
                });
                yield admin.save();
            }
            return admin;
        });
    }
    update(updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = updates, updateData = __rest(updates, ["_id"]);
                const updatedAdmin = yield admin_models_1.Admin.findByIdAndUpdate(_id, updateData, { new: true });
                return updatedAdmin;
            }
            catch (error) {
                console.error('Error updating admin:', error);
                throw error;
            }
        });
    }
}
exports.AdminService = AdminService;
