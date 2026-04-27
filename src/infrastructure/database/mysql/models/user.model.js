import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const UserModel = sequelize.define("User", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    }
}, {
    tableName: "users",
    timestamps: true
});

export default UserModel;