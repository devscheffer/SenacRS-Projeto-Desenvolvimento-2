/** @format */

import React, {Component} from "react";
import TicketDataService from "../services/ticket.service";

export default class TicketsList extends Component {
	constructor(props) {
		super(props);
		this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
		this.retrieveTickets = this.retrieveTickets.bind(this);
		this.refreshList = this.refreshList.bind(this);
		this.setActiveTicket = this.setActiveTicket.bind(this);
		this.removeAllTickets = this.removeAllTickets.bind(this);
		this.searchTitle = this.searchTitle.bind(this);
		this.updateticketChecked = this.updateticketChecked.bind(this);
		this.CountPending = this.CountPending.bind(this);

		this.state = {
			tickets: [],
			currentTicket: null,
			currentIndex: -1,
			searchTitle: "",
		};
	}

	componentDidMount() {
		this.retrieveTickets();
        this.CountPending();
	}

	onChangeSearchTitle(e) {
		const searchTitle = e.target.value;

		this.setState({
			searchTitle: searchTitle,
		});
	}

	retrieveTickets() {
		TicketDataService.getPending()
			.then((response) => {
				this.setState({
					tickets: response.data,
				});
				console.log("teste");
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	refreshList() {
		this.retrieveTickets();
        this.CountPending();

		this.setState({
			currentTicket: null,
			currentIndex: -1,
		});
	}

	setActiveTicket(ticket, index) {
		this.setState({
			currentTicket: ticket,
			currentIndex: index,
		});
	}

	CountPending() {
		console.log("testando gerson");
		TicketDataService.getCountPending()
			.then((response) => {
				this.setState({
					total_tickets: response.data.total,
				});
				console.log("testando gerson");
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}
	updateticketChecked(id, status) {
		var data = {
			id: id,
			ticketChecked: status,
		};

		TicketDataService.update(id, data)
			.then((response) => {
				this.setState((prevState) => ({
					currentTicket: {
						...prevState.currentTicket,
						ticketChecked: status,
					},
				}));
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}
	async removeAllTickets() {
		var nextTicket = await TicketDataService.getNext().then((response) => {
			return response.data[0].id;
		});
		this.updateticketChecked(nextTicket, true);
		await this.refreshList();
	}

	searchTitle() {
		this.setState({
			currentTicket: null,
			currentIndex: -1,
		});

		TicketDataService.findByTitle(this.state.searchTitle)
			.then((response) => {
				this.setState({
					tickets: response.data,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const {tickets, currentTicket, currentIndex,total_tickets} =
			this.state;

		return (
			<div className="list row">
				<div className="col-md-6">
					<h4>Tickets List</h4>
					<h3>Total pending tickes: {total_tickets}</h3>
					<ul className="list-group">
						{tickets &&
							tickets.map((ticket, index) => (
								<li
									className={
										"list-group-item " +
										(index === currentIndex ? "active" : "")
									}
									onClick={() =>
										this.setActiveTicket(ticket, index)
									}
									key={index}
								>
									{ticket.id}
								</li>
							))}
					</ul>
					<button
						className="m-3 btn btn-sm btn-danger"
						onClick={this.removeAllTickets}
					>
						Call next ticket
					</button>
				</div>
				<div className="col-md-6">
					{currentTicket ? (
						<div>
							<h4>Ticket</h4>
							<div>
								<label>
									<strong>Description:</strong>
								</label>{" "}
								{currentTicket.description}
							</div>
							<div>
								<label>
									<strong>Status:</strong>
								</label>{" "}
								{currentTicket.ticketChecked
									? "ticketChecked"
									: "Pending"}
							</div>
						</div>
					) : (
						<div>
							<br />
							<p>Click em um ticket para mais informações...</p>
						</div>
					)}
				</div>
			</div>
		);
	}
}
