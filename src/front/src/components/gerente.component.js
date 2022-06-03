/** @format */

import React, {Component} from "react";
import Chart1 from "./chart/chart1";
import Chart2 from "./chart/chart2";
import Chart3 from "./chart/chart3";
import CardServiceTime from "./card/service_time.component";
import CardWaitingTime from "./card/waiting_time.component";
import TicketsPending from "./card/pending.component";
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
					<CardServiceTime />
				</div>
				<div className="card2">
					<CardWaitingTime />
				</div>
				<div className="card3">
					<TicketsPending />
				</div>
				<div className="graph3">
					<Chart1 />
					<Chart2 />
					<Chart3 />
				</div>
			</div>
		);
	}
}
