/** @format */

import styled from "styled-components";
import {cardStyles} from "../ReusableStyles";
import TicketDataService from "../../services/card.service";
import React, {Component} from "react";

export default class Tests extends Component {
	constructor(props) {
		super(props);
		this.waiting_time = this.waiting_time.bind(this);
		this.state = {
			waiting_time: {avg:0},
		};
		this.waiting_time();
	}
	async waiting_time() {
        try {
            const res = await TicketDataService.get_waiting_time();
			let waiting_time_avg = Math.round(res.data.waiting_time.avg,0)
			this.setState({
				waiting_time:{avg: waiting_time_avg},
			});
		} catch (err) {
			console.log(err);
		}
	}
	render() {
		return (
			 <Section>
				<div className="analytic">
                    <div className="content">
                        <div>
                            <h5>Tempo de espera (min)</h5>
                            <h2>{this.state.waiting_time.avg}</h2>
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
