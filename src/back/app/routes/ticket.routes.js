/** @format */

module.exports = (app) => {
	const ticket = require("../controllers/ticket.v1.controller.js");
	const card = require("../controllers/card.v1.controller.js");
	const router = require("express").Router();

    // Ticket
	router.post("/v1/ticket", ticket.create);
	router.put("/v1/ticket/:id", ticket.update);
	router.get("/v1/ticket/:id", ticket.id);
    // Card
	router.get("/v1/card/pending_count", card.pending_count);

	app.use("/api/tickets", router);
};
