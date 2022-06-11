/** @format */

import styled from "styled-components";
import {cardStyles} from "../ReusableStyles";
import React, {Component} from "react";
import CardDataService from "../../services/card.service";

export default class Tests extends Component {
	constructor(props) {
		super(props);
		this.estimate_waiting = this.estimate_waiting.bind(this);
		this.state = {
			id: null,
			estimate_waiting: null,
		};
		this.estimate_waiting();
	}

	async estimate_waiting(id) {
		let service_time = await CardDataService.get_service_time()
        let service_time_data= service_time.data.service_time.avg;
		let n_people = await CardDataService.get_pending_count(id)
        let n_people_data=n_people.data.total_user;
		try {
			let estimate_waiting = parseInt(service_time_data * n_people_data);
			this.setState({
				estimate_waiting: estimate_waiting,
			});
			return estimate_waiting;
		} catch (err) {
			console.log(err);
		}
	}
	render() {
		return (
			<Section>
				<div className="analytic ">
					<div className="content">
						<h5>Tempo estimado para o atendimento</h5>
						<h2>{this.state.estimate_waiting}</h2>
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
