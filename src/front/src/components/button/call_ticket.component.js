/** @format */

import styled from "styled-components";
import {BsFillCalendar2WeekFill} from "react-icons/bs";
import {cardStyles} from "../ReusableStyles";
import TicketDataService from "../../services/ticket.service";
import React, {Component} from "react";

export default class Tests extends Component {
	constructor(props) {
		super(props);
		this.get_next_ticket = this.get_next_ticket.bind(this);
		this.updateticketChecked = this.updateticketChecked.bind(this);
		this.state = {
			tickets_pending: null,
		};
	}
	async get_next_ticket() {
		var nextTicket = await TicketDataService.getNext();
		try {
			this.updateticketChecked(nextTicket.data[0].id, true);
			return nextTicket.data[0].id;
		} catch (err) {
			console.log(err);
		}
	}
	async updateticketChecked(id, status) {
		var data = {
			id: id,
			ticketChecked: status,
			ticketChecked_ts: Date.now(),
		};
		const response = await TicketDataService.update(id, data);
		try {
			this.setState((prevState) => ({
				currentTicket: {
					...prevState.currentTicket,
					ticketChecked: status,
					ticketChecked_ts: Date.now(),
					id: id,
				},
			}));
			console.log(response.data);
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<Section>
				<div className="analytic ">
					<div className="content">
						<h4>Chamar próximo ticket:</h4>

						<button
							className="m-3 btn btn-sm btn-danger"
							onClick={this.get_next_ticket}
						>
							Click
						</button>
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
