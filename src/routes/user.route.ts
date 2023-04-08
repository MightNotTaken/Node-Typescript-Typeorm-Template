import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();
const userController = new UserController();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/find", userController.getUser);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

export default router;
