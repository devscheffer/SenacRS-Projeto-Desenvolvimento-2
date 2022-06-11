/** @format */

import styled from "styled-components";
import {BsFillCalendar2WeekFill} from "react-icons/bs";
import {cardStyles} from "../ReusableStyles";
import TicketDataService from "../../services/ticket.service";
import React, {Component} from "react";

export default class Tests extends Component {
	constructor(props) {
		super(props);
		this.n_ticket_front = this.n_ticket_front.bind(this);
		this.state = {
			n_ticket_front: null,
		};
		this.n_ticket_front();
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
			<Section>
				<div className="analytic ">
					<div className="logo">
						<BsFillCalendar2WeekFill />
					</div>
					<div className="content">
						<h5>Total de pessoas na frente</h5>
						<h2>{this.state.n_ticket_front}</h2>
					</div>
				</div>
			</Section>
		);
	}
}

const Section = styled.section`
display:grid;
margin: 2em;
gap: 20px;
grid-template-columns: minmax(200px,1fr);
.analytic{
    background: #1F2124;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    border-radius: 1rem;
    padding: 20px;
    text-align: center;
    color: white;
    float: left;
}
`;
