/** @format */
import styled from "styled-components";

import React, {Component} from "react";
import CardServiceTime from "./card/service_time.component";
import CardWaitingTime from "./card/waiting_time.component";
import Card3 from "./card/estimate_waiting.component";
import PendingId from "./card/pending_id.component";
import Button from "./button/create_ticket.component";
import ClienteStat from "./list/cliente_list_stat.component";
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
			<Section>
					<Button />
                    <ClienteStat />
            </Section>
		);
	}
}
const Section = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fill, 1fr);
`;
