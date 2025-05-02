"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuth = exports.UserAuth = void 0;
const confi_1 = require("../config/confi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserAuth = (req, res, next) => {
    const token = req.headers.token;
    try {
        if (!token) {
            res.status(401).json({
                message: "Token Required"
            });
            return;
        }
        const verifiedToken = jsonwebtoken_1.default.verify(token, confi_1.USER_JWT_TOKEN);
        if (verifiedToken && typeof verifiedToken !== 'string') {
            req.userId = verifiedToken.id;
            next();
        }
        else {
            res.json({
                message: "Token incorrect"
            });
        }
    }
    catch (e) {
        console.log(e);
        res.json({
            message: "Token Invalid"
        });
    }
};
exports.UserAuth = UserAuth;
const AdminAuth = (req, res, next) => {
    const token = req.headers.token;
    try {
        if (!token) {
            res.status(401).json({
                message: "Token Required"
            });
            return;
        }
        const verifiedToken = jsonwebtoken_1.default.verify(token, confi_1.ADMIN_JWT_TOKEN);
        if (verifiedToken && typeof verifiedToken !== 'string') {
            req.adminId = verifiedToken.id;
            next();
        }
        else {
            res.json({
                message: "Token incorrect"
            });
        }
    }
    catch (e) {
        console.log(e);
        res.json({
            message: "Token Invalid"
        });
    }
};
exports.AdminAuth = AdminAuth;
