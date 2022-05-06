module.exports = app => {
  const tickets = require("../controllers/ticket.controller.js");

  var router = require("express").Router();

  // Create a new Ticket
  router.post("/", tickets.create);

  // Retrieve all Tickets
  router.get("/", tickets.findAll);
  // Retrieve all Tickets
  router.get("/next", tickets.findNextTicket);
  router.get("/pending", tickets.findAllPending);

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
