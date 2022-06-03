import http from "../http-common";

class CardDataService {
	get_waiting_time() {
		return http.get("/v1/card/waiting_time");
	}
	get_service_time() {
		return http.get("/v1/card/service_time");
	}
	get_pending_count(id) {
        let body = {
            params: {
              "id": id
            }
          }
        let data = id?body:{}
		return http.get("/v1/card/pending_count",data);
	}
	get_not_pending_count() {
		return http.get("/v1/card/not_pending_count");
	}
}
export default new CardDataService();
