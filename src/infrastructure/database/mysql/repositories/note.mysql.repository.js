import NoteModel from "../models/note.model.js";

export default class NoteMySQLRepository {

  async save(noteEntity) {
    const note = await NoteModel.create(noteEntity);
    return note.toJSON();
  }

  async findByUserId(userId) {
    return await NoteModel.findAll({ where: { userId } });
  }

  async findById(id) {
    const note = await NoteModel.findByPk(id);
    return note ? note.toJSON() : null;
  }

  async update(id, data) {
    const note = await NoteModel.findByPk(id);
    if (!note) return null;

    await note.update(data);
    return note.toJSON();
  }

  async delete(id) {
    const note = await NoteModel.findByPk(id);
    if (!note) return null;

    await note.destroy();
    return true;
  }
}