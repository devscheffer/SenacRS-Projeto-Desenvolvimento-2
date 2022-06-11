/** @format */
import styled from "styled-components";
import React, {Component} from "react";
import {FaRocket} from "react-icons/fa";

export default class TicketsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tickets: [],
			currentTicket: null,
			currentIndex: -1,
			id: "",
			total_tickets: null,
		};
	}

	render() {
		return (
			<Section>
				<article class="leaderboard">
					<header>
						<h1 class="leaderboard__title">
							<span class="leaderboard__title--top">Forbes</span>
							<span class="leaderboard__title--bottom">
								Leaderboard
							</span>
						</h1>
					</header>

					<main class="leaderboard__profiles">
						<article class="leaderboard__profile">
							<h1>1</h1>
							<span class="leaderboard__name">
								Mark Zuckerberg
							</span>
							<span class="leaderboard__value">
								35.7<span>B</span>
							</span>
						</article>

						<article class="leaderboard__profile">
							<h1>1</h1>
							<span class="leaderboard__name">
								Dustin Moskovitz
							</span>
							<span class="leaderboard__value">
								9.9<span>B</span>
							</span>
						</article>

						<article class="leaderboard__profile">
							<h1>1</h1>
							<span class="leaderboard__name">
								Elizabeth Holmes
							</span>
							<span class="leaderboard__value">
								4.5<span>B</span>
							</span>
						</article>

						<article class="leaderboard__profile">
							<h1>1</h1>
							<span class="leaderboard__name">Evan Spiegel</span>
							<span class="leaderboard__value">
								2.1<span>B</span>
							</span>
						</article>
					</main>
				</article>
			</Section>
		);
	}
}

const Section = styled.section`
	.leaderboard {
		max-width: 490px;
		width: 100%;
		border-radius: 12px;

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
			background-color: #fff;
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

			&:hover {
				transform: scale(1.2);
				box-shadow: 0 9px 47px 11px rgba(51, 51, 51, 0.18);
			}
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
