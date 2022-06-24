/** @format */
import styled from "styled-components";

import React, {Component} from "react";
import Chart1 from "./chart/chart1";
import Chart2 from "./chart/chart2";
import Chart3 from "./chart/chart3";
import GerenteStat from "./list/gerente_list_stat.component";
export default class AddTicket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			queue: "fila1",
			description: "",
			is_checked: false,
			user: "person1",
			submitted: false,
			n_ticket_front: null,
		};
	}
	render() {
		return (
			<Section>
				<GerenteStat />
				<div className="container_gerente">
					<div className="card1">
					</div>
					<div className="card2">
					</div>
					<div className="card3">
					</div>
					<div className="card4">
					</div>
					<div className="graph3">
						<Chart1 />
						<Chart2 />
						<Chart3 />
					</div>
				</div>
			</Section>
		);
	}
}
const Section = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fill, 1fr);
`;
