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
					<div className="logo">
						<BsFillCalendar2WeekFill />
					</div>
					<div className="content">
						<button
							className="m-3 btn btn-sm btn-danger"
							onClick={this.get_next_ticket}
						>
							Call next ticket
						</button>
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
