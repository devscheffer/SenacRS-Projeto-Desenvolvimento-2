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
import {cardStyles} from "../ReusableStyles";
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
			</Section>
		);
	}
}

const Section = styled.section`
	display: grid;
    margin: 2em;
	gap: 20px;
	grid-template-columns: minmax(200px, 1fr);
	min-height: 20rem;
	${cardStyles}
	padding: 2rem 0 0 0;
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
`;
