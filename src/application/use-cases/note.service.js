import NoteEntity from "../../domain/entities/note.entity.js";

export default class NoteService {
    constructor(noteRepository, mailService) {
        this.noteRepository = noteRepository;
        this.mailService = mailService;
    }

    async createNote(data) {
        if (!data.title || !data.content) {
            throw new Error("Title and content are required");
        }

        const note = new NoteEntity(data);
        return await this.noteRepository.save(note);
    }

    async getNotesByUserId(userId) {
        return await this.noteRepository.findByUserId(userId);
    }

    async getNoteById(id) {
        const note = await this.noteRepository.findById(id);
        if (!note) throw new Error("Note not found");
        return note;
    }

    async updateNote(id, data, currentUserId) {
        const note = await this.noteRepository.findById(id);

        if (!note) {
            throw new Error("Note not found");
        }

        // Verificar que el usuario actual es el propietario de la nota
        if (Number(note.userId) !== Number(currentUserId)){
            throw new Error("Unauthorized: You can only update your own notes");
        }

        return await this.noteRepository.update(id, data);
    }

    async deleteNote(id, currentUserId) {
        const note = await this.noteRepository.findById(id);

        if (!note) {
            throw new Error("Note not found");
        }

        // Verificar que el usuario actual es el propietario de la nota
        if (Number(note.userId) !== Number(currentUserId)){
            throw new Error("Unauthorized: You can only delete your own notes");
        }

        await this.noteRepository.delete(id);

        return { message: "Note deleted successfully" };
    }

    async shareNoteByEmail(noteId, targetEmail, currentUserId) {
        const note = await this.noteRepository.findById(noteId);
        if (!note) throw new Error("Note not found");

        if (note.userId !== currentUserId) {
            throw new Error("Unauthorized: You can only share your own notes");
        }

        return await this.mailService.sendNoteEmail(targetEmail, note);
    }
}