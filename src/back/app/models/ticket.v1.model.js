/** @format */

module.exports = (sequelize, Sequelize) => {
	const Ticket = sequelize.define(
		"ticket",
		{
			is_checked: {
				type: Sequelize.BOOLEAN,
			},
            created_ts: {
                type: Sequelize.DATE,
            },
			checked_ts: {
				type: Sequelize.DATE,
			},
		},
		{
			timestamps: false,
		}
	);

	return Ticket;
};
