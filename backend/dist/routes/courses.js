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
const express_1 = require("express");
const postgress_1 = require("../config/postgress");
const auth_1 = require("../middleware/auth");
const courserouter = (0, express_1.Router)();
courserouter.get("/allcourses", auth_1.UserAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllCourses = yield postgress_1.client.query("SELECT * FROM courses");
        const Data = AllCourses.rows;
        console.log(Data);
        if (Data) {
            res.status(200).send({
                Data
            });
        }
        else {
            res.json({
                message: "Error While Getting The Data"
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            mesage: "Internal Server Error"
        });
    }
}));
courserouter.post("/purchesecourse/:id", auth_1.UserAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const courseid = req.params.id;
    try {
        const InsertquaryTransection = "INSERT INTO purchese (userid , courseid) VALUES ($1, $2)";
        const InsertData = yield postgress_1.client.query(InsertquaryTransection, [userId, courseid]);
        if (InsertData) {
            res.status(200).send({
                message: "You Have been Successfully Buy The Courses"
            });
        }
        else {
            res.status(401).send({
                message: "Error While Buying"
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: "Internal Server Error" });
    }
}));
courserouter.get("/mypurchesecourse", auth_1.UserAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const UserPurchese = yield postgress_1.client.query("SELECT p.id, p.userid, p.courseid, p.created_at, c.title, c.description, c.imageurl , c.price FROM purchese p JOIN courses c ON p.courseid = c.id WHERE p.userid = $1", [userId]);
        const PurcheseData = UserPurchese.rows;
        console.log(PurcheseData);
        if (PurcheseData) {
            res.status(200).send({ PurcheseData });
        }
        else {
            res.status(401).send({ message: "Error While Fetching" });
        }
    }
    catch (e) {
        console.log(e);
        res.json({ message: "Internal Sever Error" });
    }
}));
exports.default = courserouter;
