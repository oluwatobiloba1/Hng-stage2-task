# Hng-stage2-task
## PERSON RESOURCE

The application creates a person, deletes a person, update a person, and get a person using the name of the person.

four endpoints were created to handle the CRUD operation, POST and PUT endpoints receive necessary parameters via the request body, and each action resource receives the person name as a url parameter, except for the POST endpoint.


# How to run this app locally

***note: kindly have node of version >16 installed for mongodb to run and kindly have typescript installed***
### steps:
- you can fork or clone this repository
```
git clone https://github.com/oluwatobiloba1/Hng-stage2-task.git
```
- run npm install to install all necessary dependency

```
npm install
```

- create your mongodb atlas account, to get a free database
- once you have a mongodb atlas account, follow the steps given on the dashboard to connect your app to the database, this step will help you get a database uri
- add the uri gotten to your .env file with the right key 
```
MONGODB_URI='your_key
```
- enter the following comand to then start the app 
```
npm run start
```
- once the app starts you will see in the console what port it is being served on and you will also get a message displaying a secure connection to the database you created
- you can also start the server with this command 
```
ts-node src/index.ts
```
- open your api platform testing app and you are good to go.


### Provided endpoints

The application performs for independent tasks of creating, updating, fetching and deleting

To create a person:
to create a person resource, the POST method is used, and the route path is `/api`, a request body with the name of the person should be provided for a successfull request.

this operation returns the created resource that is an object with the person just created

for example :

Request
endpoint: `POST http://localhost:5000/api`
```
{
  "name": "seun bamisebi"
}
```
Response
```
{
  "_id": "12233344",
  "name": "seun bamisebi"
}
```
***note*** this application was designed to not have repetition of names, that is if a person resource with the same name provided exists, the request won't be successful.

To get a person:
to get a person resource, the GET method is used, and the route path is "/api/:name",
on successful request, the person resourse is returned.

this operation returns the requested resource that is an object with the person name provided.

for example :
Request
endpoint: `GET http://localhost:5000/api/tobi`

Response
```
{
  "_id": "12233344",
  "name": "tobi"
}
```
***note*** each person has a unique id and name.

To update a person:
to update a person resource, the PUT method is used, and the route path is "/api/:name",;
the "name" of the user to be updated should be passed as a param to the url;
a body with the updated name of the person should be provided for a successfull request.

this operation returns a the updated person resource.

Request
endpoint: `PUT http://localhost:5000/api/seun`
```
{
  "name": "seun bamisebi",
}
```
Response
```
{
  "_id": "12233344",
  "name": "seun"
}
```


To delete:
to delete a person resource, the PUT method is used, and the route path is "/api/:name", a request parameter with the name of the person should be provided for a successfull request.

this operation returns a message of a successful deletion and now that name can be used to create a new person.
Request

endpoint: `DELETE http://localhost:5000/api/seun`

Response
```
{
  "message": "user deleted",
  deleted_user: {
  "_id": "12233344",
  "name": "seun"
  }
}
```

If the request was not successful, a message indicating what was wrong will be sent.


this application was tested thoroughly using postman, you can use any api testing platform.
***The request body doesn't have to be in a Json format, the urlEncoded format is also permitted***






  Thank you.



![uml](diagram.png)
