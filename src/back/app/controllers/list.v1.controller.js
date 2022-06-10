/** @format */

const db = require("../models");
const Ticket = db.ticket_v1;
const Op = db.Sequelize.Op;

exports.pending = async (req, res) => {
	const query = await Ticket.findAll({
		where: {is_checked: false},
        limit: 5
	});
	try {
		res.send({pending: query});
	} catch (err) {
		res.sendStatus(500).send({
			message:
				err.message || "Some error occurred while retrieving tickets.",
		});
	}
};
