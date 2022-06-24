/** @format */

import styled from "styled-components";
import {HiOutlineTicket} from "react-icons/hi";
import {cardStyles} from "../ReusableStyles";
import ButtonDataService from "../../services/button.service";
import React, {Component} from "react";

export default class Tests extends Component {
	state_default = {
		id: null,
		queue: "fila1",
		description: "",
		ticketChecked: false,
		user: "person1",
		submitted: false,
		n_ticket_front: null,
	};
	constructor(props) {
		super(props);
		this.saveTicket = this.saveTicket.bind(this);
		this.newTicket = this.newTicket.bind(this);

		this.state = JSON.parse(localStorage.getItem("ticket"));
        console.log(typeof(this.state))
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

		const ticket_save = await ButtonDataService.ticket_create(data);

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
			localStorage.setItem("ticket", JSON.stringify(this.state));
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<Section>
				<div className="analytic ">
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
								<h4>{this.state.id}</h4>
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
	margin: 2em;
	gap: 20px;
	grid-template-columns: minmax(200px, 1fr);
	.analytic {
		background: #1f2124;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
		border-radius: 1rem;
		padding: 20px;
		text-align: center;
		color: white;
		float: left;
	}
`;
