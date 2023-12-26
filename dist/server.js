"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("app"));
process.env.DB_HOST &&
    mongoose_1.default
        .connect(process.env.DB_HOST)
        .then(() => {
        app_1.default.listen(3000);
        console.log('Database connection successful');
    })
        .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
//# sourceMappingURL=server.js.map