/** @format */

import http from "../http-common";

class TicketDataService {
	// Create
	create(data) {
		return http.post("/tickets", data);
	}
    // Get number of tickets in front
	get_n_ticket_front() {
		return http.get("/tickets/get_n_ticket_front");
	}
    // Get avg service time
	get_avg_service_time() {
		return http.get("/tickets/get_avg_service_time");
	}
	getAll() {
		return http.get("/tickets");
	}
	getNext() {
		return http.get("/tickets/next");
	}
	getPending() {
		return http.get("/tickets/pending");
	}
	getNotPending() {
		return http.get("/tickets/notpending");
	}

	getCountPending() {
		return http.get("/tickets/countpending");
	}

	get(id) {
		return http.get(`/tickets/${id}`);
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
