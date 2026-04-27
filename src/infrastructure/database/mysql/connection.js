import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false, // evita ruido en consola
  }
);

export const connectMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Connected to MySQL");

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync();
    }

  } catch (error) {
    console.error(" Error connecting to MySQL:", error);
    process.exit(1);
  }
};

export default sequelize;