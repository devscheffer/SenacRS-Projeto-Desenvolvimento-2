/** @format */

import React, {Component} from "react";
import TicketDataService from "../services/ticket.service";

export default class AddTicket extends Component {
	constructor(props) {
		super(props);
		this.saveTicket = this.saveTicket.bind(this);
		this.newTicket = this.newTicket.bind(this);
		this.n_ticket_front = this.n_ticket_front.bind(this);

		this.n_ticket_front();
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
        await this.n_ticket_front();
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
			this.setState({
				n_ticket_front: n_ticket_front.data.n_ticket_front,
			});
			console.log(n_ticket_front.data.n_ticket_front);
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
				<div className="Total-de-pessoas">
					<p>Total de pessoa na frente</p>
					<p>{this.state.n_ticket_front}</p>
				</div>
				<div className="Media-atendimento"></div>
				<div className="Tempo-de-espera"></div>
				<div className="Extra"></div>
			</div>
		);
	}
}
