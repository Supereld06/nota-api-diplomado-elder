import { successResponse, errorResponse } from "../../utils/apiResponse.js";

export default class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }

    createNote = async (req, res) => {
        const data = req.body;
        if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
        data.userId = req.user.id;

        try {
            const note = await this.noteService.createNote(data);
            return successResponse(res, 201, note); 
        } catch (error) {
            return errorResponse(res, 400, error.message);
        }
    }

    getNotesByUserId = async (req, res) => {
        const userId = req.user.id;

        try {
            const notes = await this.noteService.getNotesByUserId(userId);
            return successResponse(res, 200, notes); 
        } catch (error) {
            return errorResponse(res, 404, error.message);
        }
    }

    getNoteById = async (req, res) => {
        const { id } = req.params;

        try {
            const note = await this.noteService.getNoteById(id);
            return successResponse(res, 200, note); 
        } catch (error) {
            return errorResponse(res, 404, error.message);
        }
    }

    updateNote = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const userId = req.user.id;

        if (req.file) data.imageUrl = '/uploads/' + req.file.filename;

        try {
            const note = await this.noteService.updateNote(id, data, userId);
            return successResponse(res, 200, note);
        } catch (error) {
            return errorResponse(res, 403, error.message);
        }
    }

    deleteNote = async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;

        try {
            const result = await this.noteService.deleteNote(id, userId);
            return successResponse(res, 200, result); 
        } catch (error) {
            return errorResponse(res, 403, error.message);
        }
    }

    shareNote = async (req, res) => {
        const { id } = req.params;
        const { email } = req.body;
        const currentUserId = req.user.id;

        if (!email) {
            return errorResponse(res, 400, "Target email is required"); 
        }

        try {
            const result = await this.noteService.shareNoteByEmail(id, email, currentUserId);
            return successResponse(res, 200, result); 
        } catch (error) {
            return errorResponse(res, 400, error.message);
        }
    }
}