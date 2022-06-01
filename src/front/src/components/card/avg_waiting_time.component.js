/** @format */

import styled from "styled-components";
import {BsFillCalendar2WeekFill} from "react-icons/bs";
import {cardStyles} from "../ReusableStyles";
import TicketDataService from "../../services/ticket.service";
import React, {Component} from "react";

export default class Tests extends Component {
	constructor(props) {
		super(props);
		this.avg_waiting_time = this.avg_waiting_time.bind(this);
		this.state = {
			avg_waiting_time: null,
		};
		this.avg_waiting_time();
	}
	async avg_waiting_time() {
		const res = await TicketDataService.getNotPending();
		try {
			let waiting_time = res.data.map((ticket) =>
				parseInt(
					(Math.abs(
						Date.parse(ticket.ticketChecked_ts) -
							Date.parse(ticket.ticketCreated)
					) /
						(1000 * 60)) %
						60
				)
			);
			const avg_waiting_time = Math.floor(
				waiting_time.filter((x) => x).reduce((a, b) => a + b) /
					waiting_time.length
			);
			console.log(avg_waiting_time);
			this.setState({
				avg_waiting_time: avg_waiting_time,
			});
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
					<div className="content">
						<h5>Tempo de espera (média)</h5>
						<h2>{this.state.avg_waiting_time}</h2>
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
