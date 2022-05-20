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
		this.get_next_ticket = this.get_next_ticket.bind(this);
		this.searchTitle = this.searchTitle.bind(this);
		this.updateticketChecked = this.updateticketChecked.bind(this);
		this.CountPending = this.CountPending.bind(this);

		this.state = {
			tickets: [],
			currentTicket: null,
			currentIndex: -1,
			searchTitle: "",
			id: "",
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
        this.CountPending();
        this.retrieveTickets();

		this.setState({
            currentTicket: null,
			currentIndex: -1,
            id:""
		});
	}

	setActiveTicket(ticket, index,id) {
        this.refreshList();
		this.setState({
			currentTicket: ticket,
			currentIndex: index,
			id: id,
		});
	}

	CountPending() {
		TicketDataService.getCountPending()
			.then((response) => {
				this.setState({
					total_tickets: response.data.total,
				});
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
            ticketChecked_ts: Date.now()
		};

		TicketDataService.update(id, data)
			.then((response) => {
				this.setState((prevState) => ({
					currentTicket: {
						...prevState.currentTicket,
						ticketChecked: status,
                        ticketChecked_ts: Date.now(),
                        id:id
					},
				}));
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}
	async get_next_ticket() {
		var nextTicket = await TicketDataService.getNext()
        try{
            this.updateticketChecked(nextTicket.data[0].id, true);
            this.refreshList();
            return nextTicket.data[0].id;
        }
        catch(err) {
            console.log(err);
        }
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
		const {tickets, currentTicket, currentIndex, total_tickets} =
			this.state;
            console.log(`teste ticket: ${currentTicket}`);
            console.log(currentTicket);

		return (
			<div className="container_atendente">
				<div className="botao">
					<p>Total pending tickes: {total_tickets}</p>
					<button
						className="m-3 btn btn-sm btn-danger"
						onClick={this.get_next_ticket}
					>
						Call next ticket
					</button>
				</div>
				<div className="lista">
					<div className="list row">
						<div className="col-md-6">
							<h4>Tickets List</h4>
							<ul className="list-group">
								{tickets &&
									tickets.map((ticket, index) => (
										<li
											className={
												"list-group-item " +
												(index === currentIndex
													? "active"
													: "")
											}
											onClick={() =>
												this.setActiveTicket(
													ticket,
													index
												)
											}
											key={index}
										>
											{ticket.id}
										</li>
									))}
							</ul>
						</div>
					</div>
				</div>
				<div className="description">
					<div className="col-md-6">
						{currentTicket ? (
							<div>
								<h4>Ticket: {currentTicket.id}</h4>
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
								<p>
									Click em um ticket para mais informações...
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
