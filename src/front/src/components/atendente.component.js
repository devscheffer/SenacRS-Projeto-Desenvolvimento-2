/** @format */
import styled from "styled-components";

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
            <Section>

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
            </Section>
		);
	}
}

const Section = styled.section`
.container_atendente {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 3fr;
	grid-auto-columns: 1fr;
	gap: 0px 0px;
	grid-auto-flow: row;
	grid-template-areas:
		"botao lista"
		"card lista"
		"description lista";
}


.botao {
	grid-area: botao;
}
.card {
	grid-area: card;
}
.description {
	grid-area: description;
}
.lista {
	grid-area: lista;
}

.description {
	grid-area: description;
}
`;
