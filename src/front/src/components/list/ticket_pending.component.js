/** @format */

import styled from "styled-components";
import {cardStyles} from "../ReusableStyles";
import ListDataService from "../../services/list.service";
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
		try {
			const response = await ListDataService.get_pending();
			this.setState({
				tickets: response.data.pending,
			});
		} catch (e) {
			console.log(e);
		}
	}
	render() {
		return (
			<Section>
				<div className="analytic ">
					<div className="content">
						<div className="lista">
							<div className="list row">
								<div>
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
    li{
        background-color: #1400ff;
    }
	.analytic {
		${cardStyles};
		padding: 1rem;
		display: grid;
		justify-content: space-evenly;
		align-items: center;
		gap: 1rem;
		transition: 0.5s ease-in-out;
		&:hover {
			color: white;
			svg {
				color: white;
			}
		}
	}
`;
