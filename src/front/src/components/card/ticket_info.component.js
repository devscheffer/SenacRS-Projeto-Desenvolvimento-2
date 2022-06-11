/** @format */

import styled from "styled-components";
import {BsFillCalendar2WeekFill} from "react-icons/bs";
import {cardStyles} from "../ReusableStyles";
import TicketDataService from "../../services/ticket.service";
import React, {Component} from "react";

export default class Tests extends Component {
	constructor(props) {
		super(props);
		this.updateticketChecked = this.updateticketChecked.bind(this);
		this.state = {
			tickets: [],
			currentTicket: null,
			currentIndex: -1,
			searchTitle: "",
			id: "",
		};
	}

	async updateticketChecked(id, status) {
		var data = {
			id: id,
			ticketChecked: status,
			ticketChecked_ts: Date.now(),
		};

		const response= await TicketDataService.update(id, data)
        try{
            this.setState((prevState) => ({
                currentTicket: {
                    ...prevState.currentTicket,
                    ticketChecked: status,
                    ticketChecked_ts: Date.now(),
                    id: id,
                },
            }));
            console.log(response.data);
        }
        catch(e){
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
                    <div className="description">
					<div className="col-md-6">
						{this.state.currentTicket ? (
							<div>
								<h4>Ticket: {this.state.currentTicket.id}</h4>
								<div>
									<label>
										<strong>Description:</strong>
									</label>{" "}
									{this.state.currentTicket.description}
								</div>
								<div>
									<label>
										<strong>Status:</strong>
									</label>{" "}
									{this.state.currentTicket.ticketChecked
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
