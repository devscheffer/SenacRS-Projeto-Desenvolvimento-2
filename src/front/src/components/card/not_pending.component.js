/** @format */

import styled from "styled-components";
import {cardStyles} from "../ReusableStyles";
import CardDataService from "../../services/card.service";
import React, {Component} from "react";

export default class Tests extends Component {
	constructor(props) {
		super(props);
		this.not_pending_count = this.not_pending_count.bind(this);
		this.state = {
			id: null,
			not_pending_count: null,
		};
		this.not_pending_count(this.state.id);
	}
	async not_pending_count() {
		try {
			const res = await CardDataService.get_not_pending_count();
			this.setState({
				not_pending_count: res.data.total_user,
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
						<h5>Pessoas atendidas</h5>
						<h2>{this.state.not_pending_count}</h2>
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
