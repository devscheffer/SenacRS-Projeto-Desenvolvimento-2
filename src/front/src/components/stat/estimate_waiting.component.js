/** @format */

import styled from "styled-components";
import React, {Component} from "react";
import CardDataService from "../../services/card.service";

export default class EstimateWaiting extends Component {
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
			let estimate_waiting = parseInt(service_time_data * n_people_data??0);
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
                <article className="leaderboard__profile">
					<h1>1</h1>
					<span className="leaderboard__name">
                    Tempo estimado para o atendimento
					</span>
					<span className="leaderboard__value">
						{this.state.estimate_waiting}
						<span>min</span>
					</span>
				</article>

			</Section>
		);
	}
}

const Section = styled.section`
display:grid;
`;
