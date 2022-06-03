/** @format */

import React, {Component} from "react";
import TicketsPending from "./card/pending.component";
import TicketInfo from "./card/ticket_info.component";
import CallTicket from "./button/call_ticket.component";
import ListTicket from "./list/ticket_pending.component.js";

export default class TicketsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tickets: [],
			currentTicket: null,
			currentIndex: -1,
			id: "",
			total_tickets: null,
		};
	}

	render() {
		return (
			<div className="container_atendente">
				<div className="card">
					<TicketsPending />
				</div>
				<div className="botao">
					<CallTicket />
				</div>
				<div className="lista">
					<ListTicket />
				</div>
				<div className="description">
					<TicketInfo />
				</div>
			</div>
		);
	}
}
