/** @format */

import styled from "styled-components";
import CardDataService from "../../services/card.service";
import React, {Component} from "react";

export default class NotPending extends Component {
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
				<article className="leaderboard__profile">
					<h1>1</h1>
					<span className="leaderboard__name">Pessoas atendidas</span>
					<span className="leaderboard__value">
						{this.state.not_pending_count}
						<span>qtd</span>
					</span>
				</article>
			</Section>
		);
	}
}

const Section = styled.section`
	display: grid;
`;
