/** @format */
import styled from "styled-components";

import React, {Component} from "react";
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
				<CallTicket />
				<ListTicket />
			</Section>
		);
	}
}

const Section = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fill, 1fr);
`;
