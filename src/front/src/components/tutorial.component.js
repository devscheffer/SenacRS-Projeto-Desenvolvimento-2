import React, { Component } from "react";
import TicketDataService from "../services/ticket.service";

export default class Ticket extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTicket = this.getTicket.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTicket = this.updateTicket.bind(this);
    this.deleteTicket = this.deleteTicket.bind(this);

    this.state = {
      currentTicket: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTicket(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTicket: {
          ...prevState.currentTicket,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentTicket: {
        ...prevState.currentTicket,
        description: description
      }
    }));
  }

  getTicket(id) {
    TicketDataService.get(id)
      .then(response => {
        this.setState({
          currentTicket: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTicket.id,
      title: this.state.currentTicket.title,
      description: this.state.currentTicket.description,
      published: status
    };

    TicketDataService.update(this.state.currentTicket.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTicket: {
            ...prevState.currentTicket,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTicket() {
    TicketDataService.update(
      this.state.currentTicket.id,
      this.state.currentTicket
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The ticket was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTicket() {
    TicketDataService.delete(this.state.currentTicket.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tickets')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTicket } = this.state;

    return (
      <div>
        {currentTicket ? (
          <div className="edit-form">
            <h4>Ticket</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTicket.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTicket.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTicket.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTicket.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTicket}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTicket}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Ticket...</p>
          </div>
        )}
      </div>
    );
  }
}
