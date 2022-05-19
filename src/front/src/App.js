/** @format */

import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Ticket from "./components/ticket.component";
import Graph from "./components/graph.component";
import TicketsList from "./components/tickets-list.component";

class App extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<Link to={"/tickets"} className="navbar-brand">
						Qfila
					</Link>
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to={"/tickets"} className="nav-link">
								Atendente
							</Link>
						</li>
						<li className="nav-item">
							<Link to={"/ticket"} className="nav-link">
								Ticket
							</Link>
						</li>
						<li className="nav-item">
							<Link to={"/graph"} className="nav-link">
								Gerente
							</Link>
						</li>
					</div>
				</nav>

				<div className="container mt-3">
					<Switch>
						<Route exact path={["/", "/tickets"]} component={TicketsList}/>
						<Route exact path="/ticket" component={Ticket} />
						<Route path="/tickets/:id" component={Ticket} />
						<Route path="/graph" component={Graph} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
