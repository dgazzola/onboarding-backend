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
exports.disconnect = exports.connect = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.local' });
const mongoose_1 = __importDefault(require("mongoose"));
const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const cluster = process.env.DB_HOST;
const db = process.env.DB_NAME;
const uri = `mongodb+srv://${username}:${password}${cluster}/?retryWrites=true&writeConcern=majority`;
const options = {
    dbName: db,
    // useUnifiedTopology: true,
};
mongoose_1.default.Promise = global.Promise;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(uri, options);
        console.log('Connected to MongoDB');
        return mongoose_1.default.connection.getClient();
    }
    catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
});
exports.connect = connect;
mongoose_1.default.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});
const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.disconnect();
        console.log('Disconnected from MongoDB');
    }
    catch (err) {
        console.error('Failed to disconnect from MongoDB', err);
    }
});
exports.disconnect = disconnect;
(0, exports.connect)();
//# sourceMappingURL=database.js.map