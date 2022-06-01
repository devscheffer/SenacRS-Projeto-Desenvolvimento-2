/** @format */

module.exports = (app) => {
	const tickets = require("../controllers/ticket.controller.js");
	const ticket = require("../controllers/ticket.v1.controller.js");
	const card = require("../controllers/card.v1.controller.js");
	const router = require("express").Router();

    // Ticket
	router.post("/v1/ticket", ticket.ticket_create);
	router.put("/v1/ticket/:id", ticket.ticket_update);
	router.get("/v1/ticket/:id", ticket.ticket_id);
    // Card
	router.get("/v1/card/pending_count", card.pending_count);


    //[todo] Refatorar
	// Create a new Ticket
	// Get n tickets in front
	// router.get("/get_n_ticket_front", tickets.get_n_ticket_front);
	// // Get avg service time
	// // router.get("/get_avg_service_time", tickets.get_avg_service_time);
	// // Retrieve all Tickets
	// router.get("/", tickets.findAll);
	// // Retrieve next Tickets
	// router.get("/next", tickets.findNextTicket);
	// // Retrieve all Tickets pending
	// router.get("/pending", tickets.findAllPending);
	// // Retrieve all Tickets pending
	// router.get("/notpending", tickets.findAllNotPending);
	// // Retrieve total Tickets pending
	// router.get("/countpending", tickets.countPending);

	// // Retrieve all ticketChecked Tickets
	// router.get("/ticketChecked", tickets.findAllticketChecked);

	app.use("/api/tickets", router);
};
