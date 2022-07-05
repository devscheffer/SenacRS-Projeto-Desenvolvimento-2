/** @format */

const db = require("../models");
const Ticket = db.ticket_v1;
const Op = db.Sequelize.Op;

exports.chart1 = async (req, res) => {
	const [query, metadata] = await db.sequelize.query(
		`
        WITH --
        tb_created AS (
            SELECT --
                DISTINCT extract(
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
            SELECT --
                DISTINCT extract(
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
            WHERE checked_ts IS NOT NULL
        ),
        base AS (
            SELECT --
                coalesce(cr.created_ts_hour, ck.checked_ts_hour) AS hora,
                coalesce (cr.entrada, 0) AS entrada,
                coalesce (ck.atendido, 0) AS atendido
            FROM tb_created cr
                FULL JOIN tb_checked ck ON cr.created_ts_hour = ck.checked_ts_hour
        )
        SELECT --
            hora,
            entrada,
            atendido
        FROM base
        ORDER BY hora ASC
        `
	);
	try {
		console.log(
			query.map((item) => {
                hora = item.hora
				hora = hora - 3;
				if (hora < 0) {
					hora = 24 + hora;
				}
                item.hora=hora
				return item;
			})
		);
        console.log("gerson test")
        console.log(query)
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
