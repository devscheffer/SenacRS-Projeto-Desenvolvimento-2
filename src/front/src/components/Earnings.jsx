/** @format */

import styled from "styled-components";
import {AreaChart, Area, Tooltip, ResponsiveContainer,XAxis, Legend,   YAxis,    CartesianGrid} from "recharts";
import {cardStyles} from "./ReusableStyles";
import TicketDataService from "../services/ticket.service";
import React, {Component} from "react";

export default class Earnings extends Component {
	constructor(props) {
		super(props);
		this.graph1 = this.graph1.bind(this);

		this.graph1();
		this.state = {
			id: null,
			queue: "fila1",
			description: "",
			ticketChecked: false,
			user: "person1",
			submitted: false,
		};
	}

	async graph1() {
		let data = await TicketDataService.getAll();
		try {
			let graphdata = data.data.map((x) => {
				x.graphdata = {
					entrada: new Date(x.createdAt).getUTCMinutes(),
					atendimento: new Date(x.ticketChecked_ts).getUTCMinutes(),
				};
				return x.graphdata;
			});
			let graphdata_final = {
				entrada: {},
				atendimento: {},
			};
			for (let i = 0; i < graphdata.length; i++) {
				graphdata_final["entrada"][graphdata[i].entrada] =
					graphdata_final.entrada[graphdata[i].entrada] + 1 || 1;
				graphdata_final["atendimento"][graphdata[i].atendimento] =
					graphdata_final.atendimento[graphdata[i].atendimento] + 1 ||
					1;
			}
			let graphentrada = Object.keys(graphdata_final.entrada).map((x) => {
				let element = {
					minuto: parseInt(x),
					entrada: graphdata_final.entrada[x],
				};
				return element;
			});
			let graphatendimento = Object.keys(graphdata_final.atendimento).map(
				(x) => {
					let element = {
						minuto: parseInt(x),
						atendimento: graphdata_final.atendimento[x],
					};

					return element;
				}
			);
			let areachartdata = graphentrada.concat(graphatendimento);
            areachartdata.sort((a,b) => a.minuto - b.minuto)
			this.setState({
				data2: areachartdata,
			});
			return areachartdata;
		} catch (err) {
			console.log(err);
		}
	}
	render() {
		return (
			<Section>
				<div className="top">
					<div className="info">
						<h5>Pessoas atendidas hoje</h5>
						<h1>30</h1>
						<div className="growth">
							<span>+15 aguardando atendimento</span>
						</div>
					</div>
				</div>
				<div className="chart">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							width={500}
							height={400}
							data={this.state.data2}
							margin={{top: 10, right: 30, left: 0, bottom: 0}}
						>
							<defs>
								<linearGradient
									id="colorUv"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="5%"
										stopColor="#8884d8"
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor="#8884d8"
										stopOpacity={0}
									/>
								</linearGradient>
								<linearGradient
									id="colorPv"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="5%"
										stopColor="#82ca9d"
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor="#82ca9d"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<XAxis dataKey="minuto" />
							<YAxis />
                            <Legend />
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip />
							<Area
                            connectNulls
								type="monotone"
								dataKey="atendimento"
								stroke="#8884d8"
								fillOpacity={1}
								fill="url(#colorUv)"
                                dot={{ stroke: 'blue', strokeWidth: 1, r: 4,strokeDasharray:''}}
							/>
							<Area
                            connectNulls
								type="monotone"
								dataKey="entrada"
								stroke="#82ca9d"
								fillOpacity={1}
								fill="url(#colorPv)"
                                dot={{ stroke: 'red', strokeWidth: 1, r: 4,strokeDasharray:''}}
							/>
						</AreaChart>
						{/* <AreaChart
							width={500}
							height={400}
							data={this.state.data2}
							margin={{top: 0, left: 0, right: 0, bottom: 0}}
						>
							<Tooltip cursor={false} />
							<Area
								animationBegin={800}
								animationDuration={2000}
								type="monotone"
								dataKey="minuto"
								stroke="#ffc107"
								fill="#8068233e"
								strokeWidth={4}
							/>
						</AreaChart> */}
					</ResponsiveContainer>
				</div>
			</Section>
		);
	}
}

const Section = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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
		.recharts-default-tooltip {
			background-color: black !important;
			border-color: black !important;
		}
	}
	@media screen and (min-width: 280px) and (max-width: 1080px) {
	}
`;
