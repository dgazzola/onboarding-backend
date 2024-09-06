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
exports.UserService = void 0;
const user_models_1 = require("./models/user.models");
class UserService {
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = user;
            let existingUser = yield user_models_1.User.findOne({ email });
            if (existingUser) {
                if (existingUser.password === password) {
                    const _a = existingUser.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
                    return userWithoutPassword;
                }
                else {
                    return false;
                }
            }
            else {
                const newUser = new user_models_1.User({ email, password });
                yield newUser.save();
                const _b = newUser.toObject(), { password: newPassword } = _b, newUserWithoutPassword = __rest(_b, ["password"]);
                return newUserWithoutPassword;
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = user, updateFields = __rest(user, ["_id"]);
                const updatedUser = yield user_models_1.User.findByIdAndUpdate(_id, updateFields, { new: true });
                if (!updatedUser) {
                    throw new Error('User not found');
                }
                const _a = updatedUser.toObject(), { password } = _a, updatedUserWithoutPassword = __rest(_a, ["password"]);
                return updatedUserWithoutPassword;
            }
            catch (error) {
                console.error('Update failed:', error);
                throw error;
            }
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUsers = yield user_models_1.User.find();
                if (!foundUsers) {
                    throw new Error('No users found!');
                }
                const usersWithoutPasswords = foundUsers.map(user => {
                    const userObj = user.toObject();
                    const { password } = userObj, userWithoutPassword = __rest(userObj, ["password"]);
                    return userWithoutPassword;
                });
                return usersWithoutPasswords;
            }
            catch (error) {
                console.error('Error fetching users:', error);
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
