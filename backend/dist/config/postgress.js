"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
exports.client = new pg_1.Client("postgresql://neondb_owner:npg_w4dE6uoBAkmJ@ep-icy-thunder-a4mqtbx1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require");
