/** @format */
import styled from "styled-components";

import React, {Component} from "react";
import Button from "./button/create_ticket.component";
import ClienteStat from "./list/cliente_list_stat.component";
export default class AddTicket extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			queue: "fila1",
			description: "",
			is_checked: false,
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
