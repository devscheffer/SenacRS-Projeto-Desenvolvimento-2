/** @format */

import styled from "styled-components";
import {BsFillCalendar2WeekFill} from "react-icons/bs";
import {IoStatsChart} from "react-icons/io5";
import {BiGroup} from "react-icons/bi";
import {FiActivity} from "react-icons/fi";
import {cardStyles} from "./ReusableStyles";
import TicketDataService from "../services/ticket.service";
import React, {Component} from "react";

export default class Analytics extends Component {
	constructor(props) {
		super(props);
		this.avg_service_time = this.avg_service_time.bind(this);
		this.avg_waiting_time = this.avg_waiting_time.bind(this);
		this.avg_service_time();
		this.avg_waiting_time();
		this.state = {
			id: null,
			queue: "fila1",
			description: "",
			ticketChecked: false,
			user: "person1",
			submitted: false,
		};
	}
    async avg_waiting_time() {
		const res = await TicketDataService.getNotPending();
		try {
			let waiting_time = res.data.map((ticket) =>
				parseInt(
					(Math.abs(
						Date.parse(ticket.ticketChecked_ts) -
							Date.parse(ticket.createdAt)
					) /
						(1000 * 60)) %
						60
				)
			);
			const avg_waiting_time = Math.floor(
				waiting_time.reduce((a, b) => a + b, 0) / waiting_time.length
			);
			this.setState({
				avg_waiting_time: avg_waiting_time,
			});
		} catch (err) {
			console.log(err);
		}
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
	render() {
		return (
			<Section>
				<div className="analytic ">
					<div className="content">
						<h5>Total de pessoas atendidas</h5>
						<h2>{this.state.avg_service_time}</h2>
					</div>
					<div className="logo">
						<BsFillCalendar2WeekFill />
					</div>
				</div>
				<div className="analytic">
					<div className="logo">
						<IoStatsChart />
					</div>
					<div className="content">
						<h5>Tempo de espera</h5>
						<h2>{this.state.avg_waiting_time}</h2>
					</div>
				</div>
				<div className="analytic">
					<div className="logo">
						<BiGroup />
					</div>
					<div className="content">
						<h5>Tempo de atendimento médio</h5>
						<h2>10</h2>
					</div>
				</div>
				<div className="analytic ">
					<div className="content">
						<h5>Desvio padrão do tempo de atendimento</h5>
						<h2>5</h2>
					</div>
					<div className="logo">
						<FiActivity />
					</div>
				</div>
			</Section>
		);
	}
}

const Section = styled.section`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
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
