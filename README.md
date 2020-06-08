
## Course Rating API

This project is a REST API using MongoDB, Mongoose, Express.js and Node.js.

The API will provide a way for users to review educational courses: users can see a list of courses in a database; add courses to the database; and add reviews for a specific course.

## Installation

Clone the repo from github

```
git clone https://github.com/AllenLiu7/td-project-11.git
```

Change into the project directory

```
cd Course-rating-API-TechDegree-Project-11
```


Install the necessary dependencies with npm

```
npm install
```

Start it up

```
npm start
```

## Usage

Use Postman to send requests to this API to see how it works.

The CourseAPI.postman_collection.json file is a collection of Postman requests that you can use to test and explore your REST API.

Ensure that you have MongoDB installed.

If you haven't already done so, open a Command Prompt (on Windows) or Terminal (on Mac OS X) instance and run the command mongod (or sudo mongod) to start the MongoDB daemon.

Open a second Command Prompt (on Windows) or Terminal (on Mac OS X) instance.
Browse to the seed-data folder located in the root of the project.
Run the following commands:
```
mongoimport --db course-api --collection courses --type=json --jsonArray --file courses.json
mongoimport --db course-api --collection users --type=json --jsonArray --file users.json
mongoimport --db course-api --collection reviews --type=json --jsonArray --file reviews.json
```
Create user by defining "fullName", "emailAddress", "password" and "comfirmPassword" in the body tag in Postman. For example
```
{
    "fullName": "Allen",
    "emailAddress": "allen@gmail.com",
    "password": "123",
    "confirmPassword": "123"
}
```

When visiting routes with user validation, select Authorization tab in Postman and select Basic Auth. Enter your Username and password which just set up. These information will be sent along with the request for authentication.
