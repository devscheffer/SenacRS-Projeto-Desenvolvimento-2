/** @format */

import React, {Component} from "react";
import Earnings from "./chart/Earnings";
import Card1 from "./card/avg_service_time.component"
import Card2 from "./card/waiting_time.component"
import Card3 from "./card/estimate_waiting.component"
import Card4 from "./card/n_ticket_front.component"

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
			<div className="container_gerente">
				<div className="card1">
					<Card1 />
				</div>
				<div className="card2">
					<Card2 />
				</div>
				<div className="card3">
					<Card3 />
				</div>
				<div className="card4">
					<Card4 />
				</div>
				<div className="graph3">
					<Earnings />
				</div>
			</div>
		);
	}
}
