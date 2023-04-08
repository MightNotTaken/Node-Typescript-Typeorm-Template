import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "username",
    password: "password",
    database: "dbname",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})


export const initializeDB = () => {
    return new Promise((res, rej) => {
        AppDataSource.initialize().then(async () => {
            res(true);
        }).catch(error => {
            rej(error)
            // if (error.code === 'ER_BAD_DB_ERROR') {
            //     AppDataSource.createQueryRunner()
            // }
        })
    });
}