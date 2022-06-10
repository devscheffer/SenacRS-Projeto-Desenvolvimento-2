/** @format */

import http from "../http-common";

class ListDataService {
	get_pending() {
		return http.get("/v1/list/pending");
	}

}

export default new ListDataService();
