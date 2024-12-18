# easygenerator

This small application shows how signin and signup works. Couple of points to be noted before starting the application

Folder Structure
/
   backend
   frontend

Each folder needs to be run separately. Backend runs on 4000 port while frontend runs on 3000.
Go into each of these and hit `npm i`

Add the .env file respectively shared over the email. Then hit `npm start` in each folder to run separately. A demo link
is as below for live application

https://www.loom.com/share/734a2e9b67aa4f55a8e3f5c1296b9fef?sid=d7997455-156f-4151-b7a9-eda936c560be

## swagger documentation
`http://localhost:4000/api-docs`

The application is made in NestJS using mongoose and client side is made using react using redux, thunk and use states.

## Improvement

- To avoid multiple login or ddos attack to figure out password, block the user after fifth attempt
- Have cache and rate limit the APIs using API Gateway and Lambdas
- Sharding the database to enable multi tenant clients load
- Apply security to APIs so it can be accessed only by the client end and not some random guy who has inspected xhr request
- use blue green deployments in order for the application not to get interrupted
