import sqlite3 from 'sqlite3';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {

    const db = new sqlite3.Database('crons.sqlite', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    // sqlite error handling
    db.on('error', (err) => {
        console.error(err.message);
    });

    // sqlite remove cron from crons table
    db.serialize(() => {
        db.run(
            `DELETE FROM crons WHERE id = ${req.query['id']}`,
            (err: any, rows: ResponseData) => {
                res.status(200).send({ message: 'Cron removed successfully.' });
            }
        );
        db.close();
    });
}
