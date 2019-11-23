# SOLID-RESTful-Node

A Node / Express RESTful API boilerplate based on SOLID and DRY principles following multiple Design Patterns.

## Features

-   MSC Architecture - Model, Service, Controller.
-   [Onion Architectural Separation.](https://www.codeguru.com/csharp/csharp/cs_misc/designtechniques/understanding-onion-architecture.html)
-   Application of SOLID and DRY Principles.
-   Multiple Clusters tech for Parallel Processing.
-   Response compression and improved overall header security.
-   Accute Separation of Concerns following App, Api and Server separation.
-   Unit Testing and TDD (Test Driven Development) friendly.
-   Node / Express best practices implementation.

## Installation

1. Clone this repository.
2. Rename the file `.env.example` to simply `.env` and update the Environment Variables with your values.
3. Open command line and run `npm install`.
4. Run `npm start`.

## MSC - Explained

MSC or Model Service Controller is a data-friendly relative of MVC (Model, View, Controller). I like MSC approach more for JSON APIs.

### Model

Model here is the default **Mongoose model**. I believe in _**Not** Re-inventing the Wheel_, and the default Mongoose model pretty much handles all the heavy lifting anyway.

Alternately, a Base Model wrapper class can be created that extends the mongoose Model and can be used an abstraction layer for more general purpose models.

For eg:

```javascript
class BaseModel {
	constructor(mongooseModel) {
		this.instance = mongooseModel;
	}

	async findById(id, options = {}) {
		// ...Your code here
		const result = await this.instance.findById(id, options);
		// ...Your custom parsing here
		return result;
	}
}
```

### Service

Service here is an abstraction layer over the Model and holds the actual **Business Logic** of the API.
I have created a Base Service class that contains the basic REST methods so that default REST resources can be created easily. They can ofcourse be overriden as shown in `services/story.js`.

Adding a Service layer helps in:

1. Separation of Concerns between Database transactions v/s Business Logic v/s Response handling.
2. Improves re-usability of core logic for multiple modules for eg: Unit Testing, multi-resource API etc.
3. Helps in de-coupling the App from API which allows using the same core for multiple APIs.

### Controller

Standard Controller that handles the Response, Header Validation etc. I have implemented a simple yet robust Base Controller class that includes the 5 major CRUD operations (Read and Read All too).

The idea here is to quickly develop basic and less complex REST resources while still having the freedom and flexibility to add more functionality as required.

> **NOTE**: To avoid Cyclic Requires in Node.js it is best to remember the layering: Controller >> Service >> Model. Controllers can use multiple Services, Service can use multiple Models. Models _should not_ use multiple models.

## Author

[Siddhant Jain](https://github.com/siddhantj929)
