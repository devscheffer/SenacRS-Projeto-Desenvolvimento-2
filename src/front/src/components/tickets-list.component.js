import React, { Component } from "react";
import TicketDataService from "../services/ticket.service";
import { Link } from "react-router-dom";

export default class TicketsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTickets = this.retrieveTickets.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTicket = this.setActiveTicket.bind(this);
    this.removeAllTickets = this.removeAllTickets.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.updatePublished = this.updatePublished.bind(this);

    this.state = {
      tickets: [],
      currentTicket: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTickets();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTickets() {
    TicketDataService.getPending()
      .then(response => {
        this.setState({
          tickets: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTickets();
    this.setState({
      currentTicket: null,
      currentIndex: -1
    });
  }

  setActiveTicket(ticket, index) {
    this.setState({
      currentTicket: ticket,
      currentIndex: index
    });
  }
  updatePublished(id,status) {
    var data = {
      id: id,
    //   title: this.state.currentTicket.title,
    //   description: this.state.currentTicket.description,
      published: status
    };

    TicketDataService.update(id, data)
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
  async removeAllTickets() {
    var nextTicket = await TicketDataService.getNext().then(response=>{return response.data[0].id;});
    this.updatePublished(nextTicket,true);
    await this.refreshList();
    // TicketDataService.delete(nextTicket)
    //   .then(response => {
    //     console.log(response.data);
    //     this.refreshList();
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  }

  searchTitle() {
    this.setState({
      currentTicket: null,
      currentIndex: -1
    });

    TicketDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tickets: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);

      });
  }

  render() {
    const { searchTitle, tickets, currentTicket, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            {/* <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div> */}
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tickets List</h4>

          <ul className="list-group">
            {tickets &&
              tickets.map((ticket, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTicket(ticket, index)}
                  key={index}
                >
                  {ticket.id}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTickets}
          >
            Call next ticket
          </button>
        </div>
        <div className="col-md-6">
          {currentTicket ? (
            <div>
              <h4>Ticket</h4>
              {/* <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTicket.title}
              </div> */}
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTicket.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTicket.published ? "Published" : "Pending"}
              </div>

              {/* <Link
                to={"/tickets/" + currentTicket.id}
                className="badge badge-warning"
              >
                Edit
              </Link> */}
            </div>
          ) : (
            <div>
              <br />
              <p>Click em um ticket para mais informações...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
