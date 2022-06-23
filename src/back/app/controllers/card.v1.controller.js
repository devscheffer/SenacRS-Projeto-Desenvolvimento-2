/** @format */

const db = require("../models");
const Ticket = db.ticket_v1;
const Op = db.Sequelize.Op;

exports.pending_count = async (req, res) => {
	try {
		const id = req.body.id;
		let condition = id ? {id: {[Op.lt]: id}} : {};
		const query = await Ticket.findAll({
			where: {[Op.and]: [{is_checked: false}, condition]},
		});
		let total_user = query.length;
		res.send({total_user: total_user});
	} catch (err) {
		res.sendStatus(500).send({
			message:
				err.message || "Some error occurred while retrieving tickets.",
		});
	}
};
exports.not_pending_count = async (req, res) => {
	try {
		const query = await Ticket.findAll({
			where: {[Op.and]: [{is_checked: true}]},
		});

		let total_user = query.length;
		res.send({total_user: total_user});
	} catch (err) {
		res.sendStatus(500).send({
			message:
				err.message || "Some error occurred while retrieving tickets.",
		});
	}
};
exports.waiting_time = async (req, res) => {
	try {
		const [query, metadata] = await db.sequelize.query(
			`
        SELECT round(extract(epoch from checked_ts-created_ts)/60,1) AS waiting_time
        FROM tickets
        WHERE checked_ts IS NOT NULL;
        `
		);

		let waiting_time = query.map((item) => parseFloat(item.waiting_time));
        if (waiting_time.length==0){
            waiting_time = [0]
        }
		res.send({waiting_time: stats(waiting_time)});
	} catch (err) {
		res.sendStatus(500).send({
			message:
				err.message || "Some error occurred while retrieving tickets.",
		});
	}
};

exports.service_time = async (req, res) => {
	try {
		const [query, metadata] = await db.sequelize.query(
			`
        WITH base AS (
            SELECT
            dense_rank() over (ORDER BY checked_ts) AS id,
            checked_ts
            FROM tickets
            WHERE checked_ts IS NOT NULL
            )
            SELECT round(extract(epoch from b2.checked_ts-b1.checked_ts)/60,1) AS service_time
            FROM base b1
            JOIN base b2
                ON b1.id+1=b2.id
        `
		);
		let service_time = query.map((item) => parseFloat(item.service_time));
        if (service_time.length==0){
            service_time = [0]
        }
		res.send({service_time: stats(service_time)});
	} catch (err) {
		res.sendStatus(500).send({
			message:
				err.message || "Some error occurred while retrieving tickets.",
		});
	}
};
function stats(arr) {
	let sts_avg = avg(arr);
	let sts_median = median(arr);
	let sts_stddev = stddev(arr);
	let stats_dict = {avg: sts_avg, median: sts_median, stddev: sts_stddev};
	return stats_dict;
}

function avg(arr) {
    let result = arr.reduce((a, b) => a + b, 0) / arr.length
	return result??0;
}
function median(arr) {
	const sorted = Array.from(arr).sort((a, b) => a - b);
	const middle = Math.floor(sorted.length / 2);
    let result = 0
	if (sorted.length % 2 === 0) {
		result= (sorted[middle - 1] + sorted[middle]) / 2;
	}

	result= sorted[middle];
    return result??0
}
function stddev(array) {
	const n = array.length;
	const mean = array.reduce((a, b) => a + b) / n;
	let result = 0
    result =  Math.sqrt(
		array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
	);
    return result??0
}
