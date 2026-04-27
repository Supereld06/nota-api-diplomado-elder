import { Router } from "express";
import NoteController from "../controllers/note.controller.js";
import NoteService from "../../application/use-cases/note.service.js";
import upload from "../middlewares/upload.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

import NoteMySQLRepository from "../../infrastructure/database/mysql/repositories/note.mysql.repository.js";
import MailService from "../../infrastructure/services/mail.service.js";

// inyección de dependencias
const mailService = new MailService();
const noteRepository = new NoteMySQLRepository();
const noteService = new NoteService(noteRepository, mailService);
const noteController = new NoteController(noteService);

const router = Router();

// CREATE
router.post("/", authMiddleware, upload.single('image'), noteController.createNote);

// GET ALL
router.get("/", authMiddleware, noteController.getNotesByUserId);

//  GET BY ID 
router.get("/:id", authMiddleware, noteController.getNoteById);

// UPDATE
router.put("/:id", authMiddleware, upload.single('image'), noteController.updateNote);

// DELETE

//router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), noteController.deleteNote);
router.delete("/:id", authMiddleware, noteController.deleteNote);

// SHARE
router.post("/:id/share", authMiddleware, noteController.shareNote);

export default router;