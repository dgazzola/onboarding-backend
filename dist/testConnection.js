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
const database_1 = require("./database");
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, database_1.connect)();
        const adminDb = client.db().admin();
        const { databases } = yield adminDb.listDatabases();
        console.log('Databases in the cluster:');
        databases.forEach((db) => console.log(db.name));
        yield (0, database_1.disconnect)();
    }
    catch (err) {
        console.error('Error during database connection test:', err);
        process.exit(1);
    }
});
testConnection();
