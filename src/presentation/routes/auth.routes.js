import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import AuthService from "../../application/use-cases/auth.service.js";


import UserMySQLRepository from "../../infrastructure/database/mysql/repositories/user.mysql.repository.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

// Inyección de dependencias
const userRepository = new UserMySQLRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController({ authService });

const router = Router();

// 
router.post("/register", authController.register);

router.post("/login", authController.login);

export default router;