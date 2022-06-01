/** @format */

import styled from "styled-components";
import {BsFillCalendar2WeekFill} from "react-icons/bs";
import {cardStyles} from "../ReusableStyles";
import React, {Component} from "react";
import TicketDataService from "../../services/ticket.service";

export default class Tests extends Component {
	constructor(props) {
		super(props);
		this.estimate_waiting = this.estimate_waiting.bind(this);
		this.state = {
            id:null,
			estimate_waiting: null,
		};
		this.estimate_waiting();
	}

    async avg_service_time() {
		const res = await TicketDataService.getNotPending();
		try {
			let data = res.data.sort((a, b) => a.id - b.id);
			let service_time = data.map((ticket) =>
				parseInt(Date.parse(ticket.ticketChecked_ts))
			);
			let service_time_arr = [];
			for (let j = 0; j < service_time.length - 1; j++) {
				let waiting = parseInt(
					(Math.abs(service_time[j + 1] - service_time[j]) /
						(1000 * 60)) %
						60
				);
				service_time_arr.push(waiting);
			}
			const service_time_avg = Math.floor(
				service_time_arr.reduce((a, b) => a + b, 0) /
					service_time_arr.length
			);
			this.setState({
				avg_service_time: service_time_avg,
			});
			return service_time_avg;
		} catch (err) {
			console.log(err);
		}
	}
	async n_ticket_front(id) {
		const n_ticket_front = await TicketDataService.get_n_ticket_front(id);
		try {
			let res = n_ticket_front.data.n_ticket_front;
			this.setState({
				n_ticket_front: res,
			});
			console.log(res);
			return res;
		} catch (err) {
			console.log(err);
		}
	}
    	async estimate_waiting(id) {
		let service_time = await this.avg_service_time();
		let n_people = await this.n_ticket_front(id);
		try {
			let estimate_waiting = service_time * n_people;
			this.setState({
				estimate_waiting: estimate_waiting,
			});
			return estimate_waiting;
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
						<h5>Tempo estimado para atendimento</h5>
						<h2>{this.state.estimate_waiting}</h2>
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
