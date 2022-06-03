/** @format */

import http from "../http-common";

class ButtonDataService {
	ticket_create(data) {
		return http.post("/v1/ticket", data);
	}

	ticket_id(id) {
		return http.get(`/v1/ticket/${id}`);
	}

	ticket_update(id) {
		return http.put(`/v1/ticket/${id}`);
	}
}

export default new ButtonDataService();
