class HttpResponse {
	constructor(success, payload, error = null) {
		this.success = success || false;
		this.payload = payload;
		this.error = error ? error.message : error;
	}
}

module.exports = HttpResponse;
