/** @format */

const db = require("../models");
const Ticket = db.ticket_v1;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
	const ticket = {
		is_checked: false,
		created_ts: Date.now(),
	};
	try {
		const ticket_new = await Ticket.create(ticket);
		res.send(ticket_new);
	} catch (e) {
		res.status(500).send({
			message:
				e.message || "Some error occurred while creating the Ticket.",
		});
	}
};

exports.update = async (req, res) => {
	try {
		const id = req.params.id;
        
		let num = await Ticket.update(req.body, {
			where: {id: id},
		});
		console.log(num);
		console.log("teste");
		console.log(req.body);
		if (num == 1) {
			res.send({
				message: `Ticket ${id} was updated successfully.`,
			});
		} else {
			res.status(500).send({
				message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found or req.body is empty!`,
				error: e,
			});
		}
	} catch (e) {
		res.status(500).send({
			message: "Error updating Ticket with id=" + id,
			error: e,
		});
	}
};

exports.id = async (req, res) => {
	const id = req.params.id;
	const data = await Ticket.findByPk(id);
	try {
		if (data) {
			res.send(data);
		} else {
			res.status(404).send({
				message: `Cannot find Ticket with id=${id}.`,
			});
		}
	} catch (e) {
		res.status(500).send({
			message: "Error retrieving Ticket with id=" + id,
			error: e,
		});
	}
};
exports.call_next = async (req, res) => {
	try {
		const [query, metadata] = await db.sequelize.query(
			`
        select
            id,
            is_checked,
            created_ts,
            checked_ts
        from
            tickets t
        where
            is_checked = false
        order by
            id asc
        limit 1;
    `
		);
		let ticket_next = query[0];
		console.log(ticket_next);
		res.send({ticket_next: ticket_next});
	} catch (e) {
		res.status(500).send({
			message: "Error retrieving Ticket with id=" + id,
			error: e,
		});
	}
};
