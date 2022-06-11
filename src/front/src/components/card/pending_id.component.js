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
