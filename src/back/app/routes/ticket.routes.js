/** @format */

module.exports = (app) => {
	const ticket = require("../controllers/ticket.v1.controller.js");
	const card = require("../controllers/card.v1.controller.js");
	const chart = require("../controllers/chart.v1.controller.js");
	const list = require("../controllers/list.v1.controller.js");
	const router = require("express").Router();

    // Ticket
	router.post("/v1/ticket", ticket.create);
	router.get("/v1/ticket/call_next", ticket.call_next);
	router.put("/v1/ticket/:id", ticket.update);
	router.get("/v1/ticket/:id", ticket.id);
    // Card
	router.get("/v1/card/waiting_time", card.waiting_time);
	router.get("/v1/card/service_time", card.service_time);
	router.get("/v1/card/pending_count", card.pending_count);
	router.get("/v1/card/not_pending_count", card.not_pending_count);
    // Chart
	router.get("/v1/chart/chart1", chart.chart1);
	router.get("/v1/chart/chart2", chart.chart2);
	router.get("/v1/chart/chart3", chart.chart3);
    // List
	router.get("/v1/list/pending", list.pending);

	app.use("/api/tickets", router);
};
