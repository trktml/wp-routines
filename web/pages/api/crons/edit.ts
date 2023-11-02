import sqlite3 from "sqlite3";
import type { NextApiRequest, NextApiResponse } from "next";
import { CronsItemProps } from "../../../src/app/contexts/crons/type";

type ResponseData = {
    message: string;
    crons?: CronsItemProps;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const db = new sqlite3.Database("crons.sqlite", (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the database.");
    });

    db.on("error", (err) => {
        console.error(err.message);
    });

    db.serialize(() => {
        db.get(
            "SELECT * FROM crons WHERE id = ?",
            [req.query.id],
            (err: any, row: any) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).send({ message: "Error updating cron." });
                } else if (!row) {
                    res.status(404).send({ message: "Cron not found." });
                } else {
                    const { value, date, id } = req.query;
                    db.run(
                        "UPDATE crons SET value = ?, date = ? WHERE id = ?",
                        [value || row.value, date || row.date, id],
                        (err) => {
                            if (err) {
                                console.error(err.message);
                                res.status(500).send({ message: "Error updating cron." });
                            } else {
                                const updatedCron: CronsItemProps = {
                                    id: row.id,
                                    value: value || row.name,
                                    date: date || row.date,
                                    isChecked: row.isChecked,
                                };
                                res.status(200).send({
                                    message: "Cron updated successfully.",
                                    crons: updatedCron,
                                });
                            }
                            db.close();
                        }
                    );
                }
            }
        );
    });


}