/** @format */

const db = require("../models");
const Ticket = db.tickets;
const Op = db.Sequelize.Op;

exports.create_ticket = async (req, res) => {
	const ticket = {
		ticketChecked: false,
		ticketCreated: Date.now(),
	};
	try {
		const ticket_new = await Ticket.create(ticket);
		res.send(ticket_new);
	} catch (err) {
		res.status(500).send({
			message:
				err.message || "Some error occurred while creating the Ticket.",
		});
	}
};
