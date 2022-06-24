/** @format */

import styled from "styled-components";
import ListDataService from "../../services/list.service";
import React, {Component} from "react";
import Stat1 from "../stat/service_time.component"
import Stat2 from "../stat/waiting_time.component"
import Stat3 from "../stat/estimate_waiting.component"
import Stat4 from "../stat/pending_id.component"
export default class ClientList extends Component {
	constructor(props) {
		super(props);
		this.retrieveTickets = this.retrieveTickets.bind(this);
		this.setActiveTicket = this.setActiveTicket.bind(this);
		this.state = {
			tickets: [],
			currentTicket: null,
			currentIndex: -1,
			searchTitle: "",
			id: "",
		};
		this.retrieveTickets();
	}

	setActiveTicket(ticket, index, id) {
		this.setState({
			currentTicket: ticket,
			currentIndex: index,
			id: id,
		});
	}
	async retrieveTickets() {
		try {
			const response = await ListDataService.get_pending();
			const data = response.data.pending;
			console.log(data);
			this.setState({
				tickets: data,
			});
		} catch (e) {
			console.log(e);
		}
	}
	render() {
		return (
			<Section>
				<article className="leaderboard">
					<header>
						<h1 className="leaderboard__title">
							<span className="leaderboard__title--top">
								Tickets
							</span>
							<span className="leaderboard__title--bottom">
								Estatísticas Pessoais
							</span>
						</h1>
					</header>

					<main className="leaderboard__profiles">
                        <Stat1 />
                        <Stat2 />
                        <Stat3 />
                        <Stat4 />

					</main>
				</article>
			</Section>
		);
	}
}

const Section = styled.section`
	.leaderboard {
		border-radius: 12px;
        display: grid;
        margin: 2em;
        gap: 20px;
        grid-template-columns: minmax(200px, 1fr);
        background: #1F2124;

		header {
			--start: 15%;

			height: 130px;
			background-image: repeating-radial-gradient(
					circle at var(--start),
					transparent 0%,
					transparent 10%,
					rgba(54, 89, 219, 0.33) 10%,
					rgba(54, 89, 219, 0.33) 17%
				),
				linear-gradient(to right, #5b7cfa, #3659db);
			color: #fff;
			position: relative;
			border-radius: 12px 12px 0 0;
			overflow: hidden;

			.leaderboard__title {
				position: absolute;
				z-index: 2;
				top: 50%;
				right: calc(var(--start) * 0.75);
				transform: translateY(-50%);
				text-transform: uppercase;
				margin: 0;

				span {
					display: block;
				}

				&--top {
					font-size: 24px;
					font-weight: 700;
					letter-spacing: 6.5px;
				}

				&--bottom {
					font-size: 13px;
					font-weight: 500;
					letter-spacing: 3.55px;
					opacity: 0.65;
					transform: translateY(-2px);
				}
			}

			.leaderboard__icon {
				fill: #fff;
				opacity: 0.35;
				width: 50px;
				position: absolute;
				top: 50%;
				left: var(--start);
				transform: translate(-50%, -50%);
			}
		}

		&__profiles {
            background: #1F2124;

			border-radius: 0 0 12px 12px;
			padding: 15px 15px 20px;
			display: grid;
			row-gap: 8px;
		}

		&__profile {
			display: grid;
			grid-template-columns: 1fr 3fr 1fr;
			align-items: center;
			padding: 10px 30px 10px 10px;
			overflow: hidden;
			border-radius: 10px;
			box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
			cursor: pointer;
			transition: transform 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98),
				box-shadow 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);
			background-color: #fff;
		}

		&__picture {
			max-width: 100%;
			width: 60px;
			border-radius: 50%;
			box-shadow: 0 0 0 10px #ebeef3, 0 0 0 22px #f3f4f6;
		}

		&__name {
			color: #979cb0;
			font-weight: 600;
			font-size: 20px;
			letter-spacing: 0.64px;
			margin-left: 12px;
		}

		&__value {
			color: #35d8ac;
			font-weight: 700;
			font-size: 34px;
			text-align: right;

			& > span {
				opacity: 0.8;
				font-weight: 600;
				font-size: 13px;
				margin-left: 3px;
			}
		}
	}

	// bare minimuu styles

	body {
		margin: 0;
		background-color: #eaeaea;
		display: grid;
		height: 100vh;
		place-items: center;
		font-family: "Source Sans Pro", sans-serif;
	}

	.leaderboard {
		box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.4);
	}
`;
