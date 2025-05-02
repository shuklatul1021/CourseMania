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
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const postgress_1 = require("../config/postgress");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userrouter = (0, express_1.Router)();
const confi_1 = require("../config/confi");
userrouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, firstname, lastname } = req.body;
    const Insertquary = "INSERT INTO users (email , password, username, firstname, lastname) VALUES ($1, $2, $3, $4, $5)";
    try {
        const HashPassword = yield bcrypt_1.default.hash(password, 5);
        const CreateUser = yield postgress_1.client.query(Insertquary, [email, HashPassword, username, firstname, lastname]);
        if (CreateUser) {
            res.json({
                message: "User Created Succsessfully"
            });
        }
        else {
            res.json({
                message: "Error While Signup"
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
}));
userrouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const SearchQuary = "SELECT * FROM users WHERE email = ($1)";
    try {
        const VerifyUser = yield postgress_1.client.query(SearchQuary, [email]);
        const users = VerifyUser.rows[0];
        if (VerifyUser) {
            const VerifyPassword = yield bcrypt_1.default.compare(password, users.password);
            if (VerifyPassword) {
                const token = yield jsonwebtoken_1.default.sign({
                    id: users.id
                }, confi_1.USER_JWT_TOKEN);
                if (token) {
                    res.json({
                        token: token
                    });
                }
                else {
                    res.json({ message: "Error While Signing The Token" });
                }
            }
            else {
                res.status(401).send({ message: "Incorrect Password" });
            }
        }
        else {
            res.json({ message: "The Email Id Is Not Registered" });
        }
    }
    catch (e) {
        console.log(e);
        res.json({ message: "Internal Server Error" });
    }
}));
userrouter.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = userrouter;
