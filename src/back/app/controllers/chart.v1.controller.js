/** @format */

const db = require("../models");
const Ticket = db.ticket_v1;
const Op = db.Sequelize.Op;

exports.chart1 = async (req, res) => {
	const [query, metadata] = await db.sequelize.query(
		`
        WITH recursive tb_hour (n) AS (
            SELECT 0
            UNION ALL
            SELECT (tb_hour.n + 1) n
            FROM tb_hour
            WHERE tb_hour.n < 23
        ),
        tb_created AS (
            SELECT DISTINCT extract(
                    HOUR
                    FROM created_ts
                ) AS created_ts_hour,
                COUNT(*) over(
                    PARTITION by extract(
                        HOUR
                        FROM created_ts
                    )
                ) AS entrada
            FROM tickets
        ),
        tb_checked AS (
            SELECT DISTINCT extract(
                    HOUR
                    FROM checked_ts
                ) AS checked_ts_hour,
                COUNT(*) over(
                    PARTITION by extract(
                        HOUR
                        FROM checked_ts
                    )
                ) AS atendido
            FROM tickets
        )
        SELECT h.n
            ,coalesce (cr.entrada, 0) as entrada
            ,coalesce (ck.atendido, 0) as atendido
        FROM tb_hour h
            LEFT JOIN tb_created cr ON h.n = cr.created_ts_hour
            LEFT JOIN tb_checked ck ON h.n = ck.checked_ts_hour
        ORDER BY h.n ASC;
        `
	);
	try {
		console.log(
			query.map((item) => {
				item.n = item.n - 3;
				if (item.n < 0) {
					item.n = 24 + item.n;
				}
				return item;
			})
		);
		res.send({chart1: query});
	} catch (err) {
		res.sendStatus(500).send({
			message:
				err.message || "Some error occurred while retrieving tickets.",
		});
	}
};
exports.chart2 = async (req, res) => {
	const [query, metadata] = await db.sequelize.query(
		`
        WITH base AS (
            SELECT DISTINCT extract(
                    HOUR
                    FROM created_ts
                ) AS time_id,
                *
            FROM tickets
            WHERE checked_ts IS NOT NULL
        ),
        base2 AS (
            SELECT DISTINCT time_id,
                avg(checked_ts - created_ts) over (PARTITION by time_id) AS waiting_avg
            FROM base
        )
        SELECT time_id as n,
            cast(
                extract (
                    EPOCH
                    FROM waiting_avg
                ) / 60 AS int
            ) waiting_avg
        FROM base2
        ORDER BY n ASC
        `
	);
	try {
		console.log(
			query.map((item) => {
				item.n = item.n - 3;
				if (item.n < 0) {
					item.n = 24 + item.n;
				}
				return item;
			})
		);
		res.send({chart2: query});
	} catch (err) {
		res.sendStatus(500).send({
			message:
				err.message || "Some error occurred while retrieving tickets.",
		});
	}
};
exports.chart3 = async (req, res) => {
	const [query, metadata] = await db.sequelize.query(
		`
        WITH base AS (
            SELECT checked_ts,
                extract(
                    HOUR
                    FROM created_ts
                ) AS time_id,
                dense_rank () over(
                    ORDER BY id
                ) AS id_new
            FROM tickets t
            WHERE checked_ts IS NOT NULL
        ),
        base2 AS (
            SELECT DISTINCT b1.time_id,
                avg(b2.checked_ts - b1.checked_ts) over (PARTITION by b1.time_id) AS service_time_avg
            FROM base b1
                LEFT JOIN base b2 ON b1.id_new + 1 = b2.id_new
        )
        SELECT time_id AS n,
            cast(
                extract (
                    EPOCH
                    FROM service_time_avg
                ) / 60 AS int
            ) AS service_time_avg
        FROM base2
        ORDER BY 1 ASC
        `
	);
	try {
		console.log(
			query.map((item) => {
				item.n = item.n - 3;
				if (item.n < 0) {
					item.n = 24 + item.n;
				}
				return item;
			})
		);
		res.send({chart3: query});
	} catch (err) {
		res.sendStatus(500).send({
			message:
				err.message || "Some error occurred while retrieving tickets.",
		});
	}
};
