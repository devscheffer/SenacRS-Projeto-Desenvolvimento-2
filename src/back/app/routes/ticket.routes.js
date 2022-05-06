module.exports = app => {
  const tickets = require("../controllers/ticket.controller.js");

  var router = require("express").Router();

  // Create a new Ticket
  router.post("/", tickets.create);

  // Retrieve all Tutorials
  router.get("/", tickets.findAll);
  // Retrieve all Tutorials
  router.get("/next", tickets.findNextTicket);

  // Retrieve all published Tutorials
  router.get("/published", tickets.findAllPublished);

  // Retrieve a single Ticket with id
  router.get("/:id", tickets.findOne);

  // Update a Ticket with id
  router.put("/:id", tickets.update);

  // Delete a Ticket with id
  router.delete("/:id", tickets.delete);

  // Delete all Tutorials
  router.delete("/", tickets.deleteAll);

  app.use("/api/tickets", router);
};
