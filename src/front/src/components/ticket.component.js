import React, { Component } from "react";
import TicketDataService from "../services/ticket.service";

export default class AddTicket extends Component {
  constructor(props) {
    super(props);
    this.saveTicket = this.saveTicket.bind(this);
    this.newTicket = this.newTicket.bind(this);

    this.state = {
      id: null,
      queue: "fila1",
      description: "",
      ticketChecked: false,
      user: "person1",
      submitted: false
    };
  }
  newTicket() {
    this.setState({
        id: null,
        queue: "fila1",
        description: "",
        ticketChecked: false,
        user: "person1",
        submitted: false
    });
  }
//   onChangeTitle(e) {
//     this.setState({
//       title: e.target.value
//     });
//   }

//   onChangeDescription(e) {
//     this.setState({
//       description: e.target.value
//     });
//   }

  saveTicket() {
    var data = {
      queue: this.state.queue,
      description: this.state.description,
      user: this.state.user
    };

    TicketDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          queue: response.data.queue,
          description: response.data.description,
          ticketChecked: response.data.ticketChecked,
          user: response.data.user,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }



  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Ticket Number:</h4>
            <h4>{this.state.id}</h4>
            <button className="btn btn-success" onClick={this.newTicket}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <button onClick={this.saveTicket} className="btn btn-success">
              Ticket
            </button>
          </div>
        )}
      </div>
    );
  }
}
