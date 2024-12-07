"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// userRoutes.ts
const express_1 = require("express");
const userPgController_1 = require("../controllers/userPgController");
const router = (0, express_1.Router)();
// CRUD operations
router.post("/user", userPgController_1.createUser); // Create user
router.get("/users", userPgController_1.getUsers); // Get all users
router.get("/users/:id", userPgController_1.getUser); // Get a single user by ID
router.put("/users/:id", userPgController_1.updateUser); // Update user
router.delete("/users/:id", userPgController_1.deleteUser); // Delete user
exports.default = router;
