/** @format */

import styled from "styled-components";
import ButtonDataService from "../../services/button.service";
import React, {Component} from "react";
export default class Call extends Component {
	constructor(props) {
		super(props);
		this.ticketNext = this.ticketNext.bind(this);
		this.ticketChecked = this.ticketChecked.bind(this);
		this.state = {
			tickets_pending: null,
		};
	}
	async ticketNext() {
		try {
			var nextTicket = await ButtonDataService.ticket_next();
			nextTicket = nextTicket.data.ticket_next;
			this.ticketChecked(nextTicket.id, true);
		} catch (err) {
			console.log(err);
		}
	}
	async ticketChecked(id, status) {
		try {
			var data = {
				id: id,
				is_checked: status,
				checked_ts: Date.now(),
			};
			const response = await ButtonDataService.ticket_update(id, data);
			this.setState((prevState) => ({
				currentTicket: {
					...prevState.currentTicket,
					is_checked: status,
					checked_ts: Date.now(),
					id: id,
				},
			}));
			console.log(response.data);
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<Section>
				<div className="analytic ">
					<div className="content">
						<h4>Chamar próximo ticket:</h4>
						<button
							className="m-3 btn btn-sm btn-danger"
							onClick={this.ticketNext}
						>
							Click
						</button>
					</div>
				</div>
			</Section>
		);
	}
}

const Section = styled.section`
	display: grid;
	margin: 2em;
	gap: 20px;
	grid-template-columns: minmax(200px, 1fr);
	.analytic {
		background: #1f2124;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
		border-radius: 1rem;
		padding: 20px;
		text-align: center;
		color: white;
		float: left;
	}
`;
