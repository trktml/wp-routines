import sqlite3 from 'sqlite3';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    let newCron = {};
    // sqlite get all crons from crons table column names are name and date
    const db = new sqlite3.Database('crons.sqlite', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    db.on('error', (err) => {
        console.error(err.message);
    });

    db.serialize(() => {
        db.get(
            `INSERT INTO crons (value, date, isChecked)
            VALUES ("${req.query['value']}", "${req.query['date']}", 0);`,
            (err: any, rows: ResponseData) => {
                console.log(rows);
                // return rows
                newCron = rows;
            }
        );
    });

    db.close();
    console.log(newCron);
    res.status(200).send(newCron as any);
}
