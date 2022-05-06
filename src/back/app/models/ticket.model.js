module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("ticket", {
    queue: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    ticketChecked: {
      type: Sequelize.BOOLEAN
    },
    ticketChecked_ts: {
      type: Sequelize.DATE
    },
    user: {
      type: Sequelize.STRING
    }
  });

  return Ticket;
};
