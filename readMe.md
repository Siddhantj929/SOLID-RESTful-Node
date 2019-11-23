# Target

-   Separation of Concerns
-   Scalable Interfaces

# Setup

-   ~~Create a one-page API that will handle the CRUD operations for a user AND user's story.~~

# Pathway

After building the one-page api now it is time to refactor it to make it scalable and SOLID accomplice.

-   ~~Create a "database" module that will handle all things related to the actual database and separate the database concerns by using this module~~

-   ~~Create a user "model" that will be responsible for conversing database directly~~

-   ~~Create a stories "model" that may need to use the User's model to check and update User's data.~~

-   ~~Create a user "service" that will separate the "business logic" from "database handling". For now, just console the data and service name.~~

-   ~~Create a user "controller" that will separate the concern of handling the request and response properly from "processing" the data and "implementing" business logic.~~

-   ~~Create a "base" service and controller class that can be extended and have "basic" REST features. Implement "stories" service and controller by extending from base.~~

-   ~~Create a response model.~~
-   ~~Create a "error handler" middleware.~~
-   ~~Configure to run with "mongoose".~~
-   ~~Configure the security and logging middlewares.~~
-   ~~Improve performance by using compression middlewares.~~
-   ~~Imporve performance by using Parallel Processing using Clusters.~~
