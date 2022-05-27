/** @format */

module.exports = (app) => {
	const tickets = require("../controllers/ticket.controller.js");
	const cliente = require("../controllers/cliente.controller.js");
	const router = require("express").Router();
	router.post("/v1/cliente", cliente.create_ticket);

    //[todo] Refatorar
	// Create a new Ticket
	router.post("/", tickets.create);
	// Get n tickets in front
	router.get("/get_n_ticket_front", tickets.get_n_ticket_front);
	// Get avg service time
	// router.get("/get_avg_service_time", tickets.get_avg_service_time);
	// Retrieve all Tickets
	router.get("/", tickets.findAll);
	// Retrieve next Tickets
	router.get("/next", tickets.findNextTicket);
	// Retrieve all Tickets pending
	router.get("/pending", tickets.findAllPending);
	// Retrieve all Tickets pending
	router.get("/notpending", tickets.findAllNotPending);
	// Retrieve total Tickets pending
	router.get("/countpending", tickets.countPending);

	// Retrieve all ticketChecked Tickets
	router.get("/ticketChecked", tickets.findAllticketChecked);

	// Retrieve a single Ticket with id
	router.get("/:id", tickets.findOne);

	// Update a Ticket with id
	router.put("/:id", tickets.update);

	// Delete a Ticket with id
	router.delete("/:id", tickets.delete);

	// Delete all Tickets
	router.delete("/", tickets.deleteAll);

	app.use("/api/tickets", router);
};
