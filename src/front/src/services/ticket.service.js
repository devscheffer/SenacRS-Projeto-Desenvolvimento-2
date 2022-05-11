import http from "../http-common";

class TicketDataService {
  getAll() {
    return http.get("/tickets");
  }
  getNext() {
    return http.get("/tickets/next");

  }
  getPending() {
    return http.get("/tickets/pending");
  }

  getCountPending() {
    return http.get("/tickets/countpending");
  }

  get(id) {
    return http.get(`/tickets/${id}`);
  }

  create(data) {
    return http.post("/tickets", data);
  }

  update(id, data) {
    return http.put(`/tickets/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tickets/${id}`);
  }

  deleteAll() {
    return http.delete(`/tickets`);
  }

  findByTitle(title) {
    return http.get(`/tickets?title=${title}`);
  }
}

export default new TicketDataService();
