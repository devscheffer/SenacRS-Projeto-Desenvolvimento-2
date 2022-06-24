/** @format */

const db = require("../models");
const Ticket = db.ticket_v1;
const Op = db.Sequelize.Op;

exports.pending = async (req, res) => {
	const [query, metadata] = await db.sequelize.query(
		`
        SELECT
            id,
            created_ts,
            cast(
                extract (
                    EPOCH
                    FROM (CURRENT_TIMESTAMP - created_ts)
                ) / 60 AS int
            ) as time_wait
        FROM tickets
        WHERE is_checked = false
        LIMIT 5;
		`
    )
	try {
		res.send({pending: query});
	} catch (err) {
		res.sendStatus(500).send({
			message:
				err.message || "Some error occurred while retrieving tickets.",
		});
	}
};
