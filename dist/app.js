"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
// const authRouter = require('./routes/api/auth');
// const contactsRouter = require('./routes/api/contacts');
const app = (0, express_1.default)();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use((0, morgan_1.default)(formatsLogger));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use('/api/auth', authRouter);
// app.use('/api/contacts', contactsRouter);
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});
app.use((err, req, res, next) => {
    res.status(err.status).json({ message: err.message });
});
exports.default = app;
//# sourceMappingURL=app.js.map