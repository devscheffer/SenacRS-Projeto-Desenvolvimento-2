/** @format */

import React, {Component} from "react";
import TicketDataService from "../services/ticket.service";
import styled from "styled-components";
import {cardStyles} from "./ReusableStyles";
import {FiActivity} from "react-icons/fi";

export default class AddTicket extends Component {
	constructor(props) {
		super(props);
		this.saveTicket = this.saveTicket.bind(this);
		this.newTicket = this.newTicket.bind(this);
		this.n_ticket_front = this.n_ticket_front.bind(this);
		this.avg_service_time = this.avg_service_time.bind(this);
		this.avg_waiting_time = this.avg_waiting_time.bind(this);
		this.estimate_waiting = this.estimate_waiting.bind(this);

		this.n_ticket_front();
		this.avg_service_time();
		this.avg_waiting_time();
		this.estimate_waiting();

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
			console.log(waiting_time);
			console.log(avg_waiting_time);
			this.setState({
				avg_waiting_time: avg_waiting_time,
			});
		} catch (err) {
			console.log(err);
		}
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
		await this.n_ticket_front();
		await this.avg_service_time();
		await this.avg_waiting_time();
		await this.estimate_waiting();

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

	render() {
		return (
			<div className="container_cliente">
				<div className="Botao">
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
                <Section>                <div className="analytic ">
					<div className="content">
					<p>Total de pessoa na frente</p>
					<p>{this.state.n_ticket_front}</p>
					</div>
					<div className="logo">
						<FiActivity />
					</div>
				</div>
                <div className="analytic ">
					<div className="content">
					<p>Tempo médio de atendimento</p>
					<p>{this.state.avg_service_time}</p>
					</div>
					<div className="logo">
						<FiActivity />
					</div>
				</div>
                <div className="analytic ">
					<div className="content">
					<p>Tempo médio de espera</p>
					<p>{this.state.avg_waiting_time}</p>
					</div>
					<div className="logo">
						<FiActivity />
					</div>
				</div>
                <div className="analytic ">
					<div className="content">
					<p>Tempo estimado para ser atendido</p>
					<p>{this.state.estimate_waiting}</p>
					</div>
					<div className="logo">
						<FiActivity />
					</div>
				</div>
                </Section>
			</div>
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
