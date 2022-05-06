import React, { Component } from "react";
import TicketDataService from "../services/ticket.service";

export default class AddTicket extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTicket = this.saveTicket.bind(this);
    this.newTicket = this.newTicket.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      ticketChecked: false,
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTicket() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    TicketDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          ticketChecked: response.data.ticketChecked,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTicket() {
    this.setState({
      id: null,
      title: "",
      description: "",
      ticketChecked: false,

      submitted: false
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
            {/* <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div> */}

            <button onClick={this.saveTicket} className="btn btn-success">
              Ticket
            </button>
          </div>
        )}
      </div>
    );
  }
}
