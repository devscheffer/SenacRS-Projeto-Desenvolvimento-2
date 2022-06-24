/** @format */

import styled from "styled-components";
import {
	Line,
	LineChart,
	Tooltip,
	ResponsiveContainer,
	XAxis,
	Legend,
	YAxis,
	CartesianGrid,
} from "recharts";
import ChartDataService from "../../services/chart.service";
import React, {Component} from "react";

export default class Earnings extends Component {
	constructor(props) {
		super(props);
		this.chart3 = this.chart3.bind(this);

		this.state = {
			id: null,
			queue: "fila1",
			description: "",
			is_checked: false,
			user: "person1",
			submitted: false,
			pending_count: null,
			not_pending_count: null,
			chart_data: {},
		};
		this.chart3();
	}

	async chart3() {
		let res = await ChartDataService.get_chart3();
		try {
            let chart_data = res.data.chart3.sort((a, b) => a.n-b.n);
			this.setState({
				chart_data: chart_data,
			});
			return chart_data;
		} catch (err) {
			console.log(err);
		}
	}
    render() {
		return (
			<Section>
				<article className="leaderboard">
					<header>
						<h1 className="leaderboard__title">
							<span className="leaderboard__title--top">
								Tempo de atendimento
							</span>
							<span className="leaderboard__title--bottom">
								Estatísticas Gerais
							</span>
						</h1>
					</header>
					<div className="chart">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							width={500}
							height={400}
							data={this.state.chart_data}
							margin={{top: 10, right: 30, left: 0, bottom: 0}}
						>
							<XAxis dataKey="n" />
							<YAxis />
							<Legend verticalAlign="top"/>
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip />
							<Line
                            name = "Duração média de atendimento (min)"
								connectNulls
								type="monotone"
								dataKey="service_time_avg"
								stroke="#8884d8"
								fillOpacity={1}
								fill="url(#colorUv)"
								strokeWidth={3}
								dot={{
									stroke: "blue",
									strokeWidth: 1,
									r: 4,
									strokeDasharray: "",
								}}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				</article>
			</Section>
		);
	}
}

const Section = styled.section`
	.top {
		.info {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.2rem;
			h1 {
				font-size: 2rem;
			}
			.growth {
				background-color: #d7e41e1d;
				padding: 0.5rem;
				border-radius: 1rem;
				transition: 0.3s ease-in-out;
				&:hover {
					background-color: #ffc107;
					span {
						color: black;
					}
				}
				span {
					color: #ffc107;
				}
			}
		}
	}
	.chart {
		height: 70%;
		min-height: 20rem;

		.recharts-default-tooltip {
			background-color: black !important;
			border-color: black !important;
		}
	}
	@media screen and (min-width: 280px) and (max-width: 1080px) {
	}

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
