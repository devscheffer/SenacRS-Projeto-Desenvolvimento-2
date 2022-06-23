/** @format */

import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";

import Atendente from "./components/atendente.component";
import Cliente from "./components/cliente.component";
import Gerente from "./components/gerente.component";
class App extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<Link to={"/cliente"} className="navbar-brand">
						Qfila
					</Link>
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to={"/atendente"} className="nav-link">
								Atendente
							</Link>
						</li>
						<li className="nav-item">
							<Link to={"/cliente"} className="nav-link">
								Cliente
							</Link>
						</li>
						<li className="nav-item">
							<Link to={"/gerente"} className="nav-link">
								Gerente
							</Link>
						</li>
					</div>
				</nav>

				<div className="">
					<Switch>
						<Route exact path={["/", "/atendente"]} component={Atendente}/>
						<Route exact path="/cliente" component={Cliente} />
						<Route path="/gerente" component={Gerente} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
