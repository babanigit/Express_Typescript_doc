// userRoutes.ts
import { Router } from "express";
import { createUser, getUsers, getUser, updateUser, deleteUser } from "../controllers/userPgController";

const router = Router();


// CRUD operations
router.post("/user", createUser);  // Create user
router.get("/users", getUsers);     // Get all users

router.get("/users/:id", getUser);  // Get a single user by ID
router.put("/users/:id", updateUser); // Update user
router.delete("/users/:id", deleteUser); // Delete user

export default router;
