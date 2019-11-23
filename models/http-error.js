class HttpError extends Error {
	constructor(status, message) {
		this.status = status || 500;
		super(message || "Internal server error.");
	}
}
