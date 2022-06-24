/** @format */

import styled from "styled-components";
import CardDataService from "../../services/card.service";
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
            const res = await CardDataService.get_waiting_time();
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
                <article className="leaderboard__profile">
					<h1>1</h1>
					<span className="leaderboard__name">
                    Tempo de espera
					</span>
					<span className="leaderboard__value">
						{this.state.waiting_time.avg}
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
