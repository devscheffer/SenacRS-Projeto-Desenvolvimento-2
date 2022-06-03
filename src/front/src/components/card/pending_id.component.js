/** @format */

import styled from "styled-components";
import {cardStyles} from "../ReusableStyles";
import CardDataService from "../../services/card.service";
import React, {Component} from "react";

export default class Tests extends Component {
	constructor(props) {
		super(props);
		this.pending_count = this.pending_count.bind(this);
		this.state = {
            id:null,
			pending_count: 0,
		};
		this.pending_count(this.state.id);
	}
	async pending_count(id) {
        try {
            const res = await CardDataService.get_pending_count(id);
			this.setState({
				pending_count: res.data.total_user,
			});
		} catch (err) {
			console.log(err);
		}
	}
	render() {
		return (
			<Section>
				<div className="analytic ">
					<div className="content">
						<h5>Total de pessoas antes de você</h5>
						<h2>{this.state.pending_count}</h2>
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
