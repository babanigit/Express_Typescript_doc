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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const PostgreDbConnection_1 = require("../connections/PostgreDbConnection");
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const sql = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;";
    try {
        const result = yield (0, PostgreDbConnection_1.query)(sql, [name, email]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});
exports.createUser = createUser;
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "SELECT * FROM users;";
    try {
        const result = yield (0, PostgreDbConnection_1.query)(sql);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve users" });
    }
});
exports.getUsers = getUsers;
// Get a single user by ID
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const sql = "SELECT * FROM users WHERE id = $1;";
    try {
        const result = yield (0, PostgreDbConnection_1.query)(sql, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve user" });
    }
});
exports.getUser = getUser;
// Update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *;";
    try {
        const result = yield (0, PostgreDbConnection_1.query)(sql, [name, email, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
});
exports.updateUser = updateUser;
// Delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE id = $1 RETURNING *;";
    try {
        const result = yield (0, PostgreDbConnection_1.query)(sql, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});
exports.deleteUser = deleteUser;
