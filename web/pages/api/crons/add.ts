import sqlite3 from 'sqlite3';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    // sqlite get all crons from crons table column names are name and date
    const db = new sqlite3.Database('pages/api/crons/crons.sqlite', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    db.on('error', (err) => {
        console.error(err.message);
    });

    db.serialize(() => {
        db.run(
            `INSERT INTO crons (value, date, isChecked)
            VALUES ("${
                (Math.random() * 100000).toString()
            }", "${new Date().toUTCString()}", 0);`,
            (err: any, rows: ResponseData) => {
                console.log(rows);
                // return rows
                res.status(200).send(rows);
            }
        );
    });

    db.close();
}
