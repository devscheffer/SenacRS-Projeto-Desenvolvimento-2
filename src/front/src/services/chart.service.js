import http from "../http-common";

class ChartDataService {
	get_chart1() {
		return http.get("/v1/chart/chart1");
	}
	get_chart2() {
		return http.get("/v1/chart/chart2");
	}
	get_chart3() {
		return http.get("/v1/chart/chart3");
	}
}
export default new ChartDataService();
