/** @format */

import styled from "styled-components";
import {BsFillCalendar2WeekFill} from "react-icons/bs";
import {cardStyles} from "../ReusableStyles";
import TicketDataService from "../../services/ticket.service";
import React, {Component} from "react";

export default class Tests extends Component {
	constructor(props) {
		super(props);
		this.retrieveTickets = this.retrieveTickets.bind(this);
		this.setActiveTicket = this.setActiveTicket.bind(this);
		this.state = {
			tickets: [],
			currentTicket: null,
			currentIndex: -1,
			searchTitle: "",
			id: "",
		};
		this.retrieveTickets();
	}

	setActiveTicket(ticket, index, id) {
		this.setState({
			currentTicket: ticket,
			currentIndex: index,
			id: id,
		});
	}
	async retrieveTickets() {
		const response = await TicketDataService.getPending();
		try {
			this.setState({
				tickets: response.data,
			});
			console.log("teste");
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
						<div className="lista">
							<div className="list row">
								<div className="col-md-6">
									<h4>Tickets List</h4>
									<ul className="list-group color:black">
										{this.state.tickets &&
											this.state.tickets.map(
												(ticket, index) => (
													<li
														className={
															"list-group-item " +
															(index ===
															this.state
																.currentIndex
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
												)
											)}
									</ul>
								</div>
							</div>
						</div>
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
