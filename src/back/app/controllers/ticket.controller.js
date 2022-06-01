/** @format */

const db = require("../models");
const Ticket = db.tickets;
const Op = db.Sequelize.Op;

// find all ticketChecked Ticket
exports.findAllticketChecked = (req, res) => {
	Ticket.findAll({where: {ticketChecked: true}})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving tickets.",
			});
		});
};
exports.findNextTicket = (req, res) => {
	Ticket.findAll({where: {ticketChecked: false}, orderby: 1, limit: 1})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving tickets.",
			});
		});
};
exports.findAllPending = (req, res) => {
	Ticket.findAll({where: {ticketChecked: false}})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving tickets.",
			});
		});
};
exports.findAllNotPending = (req, res) => {
	Ticket.findAll({where: {ticketChecked: true}})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving tickets.",
			});
		});
};

