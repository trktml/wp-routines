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
                    db.run(
                        "UPDATE crons SET lastSent = ? WHERE id = ?",
                        [new Date(), req.query.id],
                        (err) => {
                            if (err) {
                                console.error(err.message);
                                res.status(500).send({ message: "Error updating cron." });
                            } else {
                                row.lastSent = new Date();
                                res.status(200).send({
                                    message: "Cron updated successfully.",
                                    crons: row,
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