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
