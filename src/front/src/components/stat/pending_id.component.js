/** @format */

import styled from "styled-components";
import CardDataService from "../../services/card.service";
import React, {Component} from "react";

export default class PendingId extends Component {
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
                <article className="leaderboard__profile">
					<h1>1</h1>
					<span className="leaderboard__name">
                    Total de pessoas antes de você
					</span>
					<span className="leaderboard__value">
						{this.state.pending_count}
						<span>qtd</span>
					</span>
				</article>

			</Section>
		);
	}
}

const Section = styled.section`
display:grid;

`;
