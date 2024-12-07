// userController.ts
import { Request, Response } from "express";
import { query } from "../connections/PostgreDbConnection";

// Create a new user
const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;";
  try {
    const result = await query(sql, [name, email]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Get all users
const getUsers = async (req: Request, res: Response) => {
  const sql = "SELECT * FROM users;";
  try {
    const result = await query(sql);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

// Get a single user by ID
const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE id = $1;";
  try {
    const result = await query(sql, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

// Update a user
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql =
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *;";
  try {
    const result = await query(sql, [name, email, id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete a user
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = $1 RETURNING *;";
  try {
    const result = await query(sql, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
