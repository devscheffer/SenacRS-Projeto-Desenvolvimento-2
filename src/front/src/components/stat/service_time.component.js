/** @format */

import styled from "styled-components";
import CardDataService from "../../services/card.service";
import React, {Component} from "react";

export default class ServiceTime extends Component {
	constructor(props) {
		super(props);
		this.service_time = this.service_time.bind(this);
		this.state = {
			service_time: {avg: 0},
		};
		this.service_time();
	}
	async service_time() {
		try {
			const res = await CardDataService.get_service_time();
			let service_time_avg = Math.round(res.data.service_time.avg, 0);

			this.setState({
				service_time: {avg: service_time_avg},
			});
		} catch (err) {
			console.log(err);
		}
	}
	render() {
		return (
			<Section>
				<article className="leaderboard__profile">
					<h1>1</h1>
					<span className="leaderboard__name">
						Duração do atendimento
					</span>
					<span className="leaderboard__value">
						{this.state.service_time.avg}
						<span>min</span>
					</span>
				</article>
			</Section>
		);
	}
}

const Section = styled.section`
display: grid;
`;
