"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const courses_1 = __importDefault(require("./routes/courses"));
const postgress_1 = require("./config/postgress");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/users", user_1.default);
app.use("/api/v1/admin", admin_1.default);
app.use("/api/v1/course", courses_1.default);
const Connect = () => {
    postgress_1.client.connect()
        .then(() => console.log("Database Connected"))
        .then(() => {
        app.listen(3000, () => {
            console.log("The Backend Is : http://localhost:" + 3000);
        });
    });
};
Connect();
