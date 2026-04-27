import UserModel from "../models/user.model.js";

export default class UserMySQLRepository {

    async findByEmail(email) {
        const user = await UserModel.findOne({ where: { email } });
        return user ? user.toJSON() : null;
    }

    async save(userEntity) {
        const user = await UserModel.create(userEntity);
        return user.toJSON();
    }
}