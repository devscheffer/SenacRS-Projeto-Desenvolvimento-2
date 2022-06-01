/** @format */

import styled from "styled-components";
import {BsFillCalendar2WeekFill} from "react-icons/bs";
import {cardStyles} from "../ReusableStyles";
import TicketDataService from "../../services/ticket.service";
import React, {Component} from "react";

export default class Tests extends Component {
	constructor(props) {
		super(props);
		this.saveTicket = this.saveTicket.bind(this);
		this.newTicket = this.newTicket.bind(this);

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
	newTicket() {
		this.setState({
			id: null,
			queue: "fila1",
			description: "",
			ticketChecked: false,
			user: "person1",
			submitted: false,
		});
	}

	async saveTicket() {
		var data = {
			queue: this.state.queue,
			description: this.state.description,
			user: this.state.user,
		};

		const ticket_save = await TicketDataService.create(data);

		try {
			this.setState({
				id: ticket_save.data.id,
				queue: ticket_save.data.queue,
				description: ticket_save.data.description,
				ticketChecked: ticket_save.data.ticketChecked,
				user: ticket_save.data.user,
				submitted: true,
			});
			console.log(ticket_save.data);
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<Section>
				<div className="analytic ">
					<div className="logo">
						<BsFillCalendar2WeekFill />
					</div>
						<div className="submit-form">
							{this.state.submitted ? (
								<div>
									<h4>Ticket Number:</h4>
									<h4>{this.state.id}</h4>
									<button
										className="btn btn-success"
										onClick={this.newTicket}
									>
										Add
									</button>
								</div>
							) : (
								<div>
									<h4>Ticket Number:</h4>
									<button
										onClick={this.saveTicket}
										className="btn btn-success"
									>
										Ticket
									</button>
								</div>
							)}
						</div>
					</div>
			</Section>
		);
	}
}

const Section = styled.section`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	gap: 1rem;
	.analytic {
		${cardStyles};
		padding: 1rem;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		gap: 1rem;
		transition: 0.5s ease-in-out;
		&:hover {
			background-color: #ffc107;
			color: black;
			svg {
				color: white;
			}
		}
		.logo {
			background-color: black;
			border-radius: 3rem;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 1.5rem;
			svg {
				font-size: 1.5rem;
			}
		}
	}

	@media screen and (min-width: 280px) and (max-width: 720px) {
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		.analytic {
			&:nth-of-type(3),
			&:nth-of-type(4) {
				flex-direction: row-reverse;
			}
		}
	}
`;
