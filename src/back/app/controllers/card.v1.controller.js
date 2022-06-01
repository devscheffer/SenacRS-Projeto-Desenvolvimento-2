/** @format */

const db = require("../models");
const Ticket = db.ticket_v1;
const Op = db.Sequelize.Op;

exports.pending_count = async (req, res) => {
	const id = req.body.id;
	let condition = id ? {id: {[Op.lt]: id}} : {};
	const query = await Ticket.findAll({
		where: {[Op.and]: [{is_checked: false}, condition]},
	});
	try {
		let total_user = query.length;
		res.send({total_user: total_user});
	} catch (e) {
		res.sendStatus(500).send({
			message:
				e.message || "Some error occurred while retrieving tickets.",
		});
	}
};
exports.waiting_time = async (req, res) => {
	const [query, metadata] = await db.sequelize.query(
		`
        SELECT round(extract(epoch from checked_ts-created_ts)/60,1) AS waiting_time_min
        FROM tickets
        WHERE checked_ts IS NOT NULL;
        `
	);
	try {
		let waiting_time_min =
			query
				.map((item) => parseFloat(item.waiting_time_min))
				.reduce((a, b) => a + b, 0) / query.length;
		res.send({waiting_time_min: waiting_time_min});
	} catch (e) {
		res.sendStatus(500).send({
			message:
				e.message || "Some error occurred while retrieving tickets.",
		});
	}
};
