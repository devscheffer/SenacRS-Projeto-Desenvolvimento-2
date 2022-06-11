/** @format */

import styled from "styled-components";
import {cardStyles} from "../ReusableStyles";
import CardDataService from "../../services/card.service";
import React, {Component} from "react";

export default class Tests extends Component {
	constructor(props) {
		super(props);
		this.service_time = this.service_time.bind(this);
        this.state = {
			service_time: {avg:0}
		};
        this.service_time();
	}
	async service_time() {
        try {
            const res = await CardDataService.get_service_time();
            let service_time_avg = Math.round(res.data.service_time.avg,0)

			this.setState({
				service_time: {avg:service_time_avg},
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
						<h5>Duração do atendimento (min)</h5>
						<h2>{this.state.service_time.avg}</h2>
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
