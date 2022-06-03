/** @format */

import React, {Component} from "react";
import CardServiceTime from "./card/service_time.component";
import CardWaitingTime from "./card/waiting_time.component";
import Card3 from "./card/estimate_waiting.component";
import PendingId from "./card/pending_id.component";
import Button from "./button/create_ticket.component";
export default class AddTicket extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			queue: "fila1",
			description: "",
			ticketChecked: false,
			user: "person1",
			submitted: false,
			n_ticket_front: null,
		};
	}

	render() {
		return (
			<div className="container_cliente">
				<div className="botao">
					<Button />
				</div>
				<div className="card1">
					<CardServiceTime />
				</div>
				<div className="card2">
					<CardWaitingTime />
				</div>
				<div className="card3">
					<Card3 />
				</div>
				<div className="card4">
					<PendingId />
				</div>
			</div>
		);
	}
}
