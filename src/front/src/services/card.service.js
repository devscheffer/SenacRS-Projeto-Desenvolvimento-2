import http from "../http-common";

class TicketDataService {
	get_waiting_time() {
		return http.get("/v1/card/waiting_time");
	}
}
export default new TicketDataService();
