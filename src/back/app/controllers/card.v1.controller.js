/** @format */

const db = require("../models");
const Ticket = db.ticket_v1;
const Op = db.Sequelize.Op;

exports.pending_count = async (req, res) => {
	const id = req.body.id;
    let condition = id?{id: {[Op.lt]: id}}:{}
	const query = await Ticket.findAll({
		where: {[Op.and]: [{is_checked: false}, condition]},
	});
	try {
		let total_user = query.length;
		res.send({total_user: total_user});
	} catch (e) {
		res.status(500).send({
			message:
				e.message || "Some error occurred while retrieving tickets.",
		});
	}
};

