import { Sequelize } from 'sequelize';

const database = process.env.DB_NAME;
const username = process.env.DB_USER; 
const password = process.env.DB_PASS; 
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;

export const sequelize = new Sequelize(
    database,
    username, // для sqlite не имеет значения
    password, // для sqlite не имеет значения
    {
        host, // сохраняем DB в файл
        dialect, 
        define: {
            //Наименование модели = наименование таблицы в БД
            freezeTableName: true,
        }
    }
)