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
const postgress_1 = require("../config/postgress");
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminrouter = (0, express_1.Router)();
const auth_1 = require("../middleware/auth");
const confi_1 = require("../config/confi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
adminrouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, firstname, lastname } = req.body;
    const Insertquary = "INSERT INTO adminaccount (email , password, username, firstname, lastname) VALUES ($1, $2, $3, $4, $5)";
    try {
        const HashPassword = yield bcrypt_1.default.hash(password, 5);
        const AdminCreateUser = yield postgress_1.client.query(Insertquary, [email, HashPassword, username, firstname, lastname]);
        if (AdminCreateUser) {
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
adminrouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const SearchQuary = "SELECT * FROM adminaccount WHERE email = ($1)";
    try {
        const AdminVerifyUser = yield postgress_1.client.query(SearchQuary, [email]);
        const admin = AdminVerifyUser.rows[0];
        if (AdminVerifyUser) {
            const VerifyPassword = yield bcrypt_1.default.compare(password, admin.password);
            if (VerifyPassword) {
                const token = yield jsonwebtoken_1.default.sign({
                    id: admin.id
                }, confi_1.ADMIN_JWT_TOKEN);
                if (token) {
                    res.json({
                        token: token
                    });
                }
                else {
                    res.json({
                        message: "Error While Signing The Token"
                    });
                }
            }
            else {
                res.status(401).send({
                    message: "Incorrect Password"
                });
            }
        }
        else {
            res.json({
                message: "Your Are Not Registered As Admin"
            });
        }
    }
    catch (e) {
        console.log(e);
        res.json({
            message: "Internal Server Error"
        });
    }
}));
adminrouter.post("/logout", (req, res) => {
});
adminrouter.post("/addcourses", auth_1.AdminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = req.adminId;
    const { title, description, price, imageurl } = req.body;
    try {
        const CourseAddingQuary = "INSERT INTO courses (title, description, price, imageurl, userId  ) VALUES ($1, $2, $3, $4, $5)";
        const CourseAdd = yield postgress_1.client.query(CourseAddingQuary, [title, description, price, imageurl, adminId]);
        if (CourseAdd) {
            res.json({
                message: "Your Course Added"
            });
        }
        else {
            res.json({
                message: "Error While Adding"
            });
        }
    }
    catch (e) {
        console.log(e);
        res.json({
            message: "Error While Adding"
        });
    }
}));
adminrouter.get("/alladmincourses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Data = yield postgress_1.client.query("SELECT * FROM courses");
        const DataRows = Data.rows;
        console.log(DataRows);
        res.json({
            DataRows
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Errror"
        });
    }
}));
adminrouter.put("/editcourse/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, description, price, imageurl } = req.body;
    try {
        const CheckCouseId = yield postgress_1.client.query("SELECT id FROM courses WHERE id = $1", [id]);
        if (CheckCouseId) {
            const UpdateQuary = "UPDATE courses SET title = $1 , description = $2 , price = $3 , imageurl = $4";
            const UpdataeCourse = yield postgress_1.client.query(UpdateQuary, [title, description, price, imageurl]);
            if (UpdataeCourse) {
                res.status(200).send({
                    message: "Course Updated Succsesfully"
                });
            }
            else {
                res.status(401).send({
                    messgae: "Errror While Updating"
                });
            }
        }
        else {
            res.json({ message: "The Course Is Not Available" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}));
adminrouter.delete("/deletecourse/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const GetCourseWithId = yield postgress_1.client.query("SELECT id FROM courses WHERE id = $1", [id]);
        if (GetCourseWithId) {
            const DeleteQuary = "DELETE FROM courses WHERE id = $1";
            const DeleteCouseRow = yield postgress_1.client.query(DeleteQuary, [id]);
            if (DeleteCouseRow) {
                res.status(200).send({
                    message: "Deleted Succsessfully"
                });
            }
            else {
                res.status(401).send({ message: "Error While Deleting" });
            }
        }
        else {
            res.status(401).send({
                message: "Course Not Present"
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}));
exports.default = adminrouter;
