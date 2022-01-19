# bearer-auth

## Installation

to install run `git@github.com:ryanyinlee/bearer-auth.git`

`cd` bearer-auth

run `npm init -y`

`npm i dotenv express jest lint node pg router routes sequelize sequelize-cli sqlite3 supertest bcrypt base-64`

## Usage

`npm start` to run server

`npm test` to test server in terminal

## Routes

CRUD

**User**

/signup

Use the JSON body in ThunderClient and POST.

```
{
  "username": "john2",
  "password": "foo"
}
```

/signin

Use the handy Basic Auth in ThunderClient and POST

username: john2
password: foo

## Current Deploys/GitHub Repository

GitHubRepository

https://github.com/ryanyinlee/bearer-auth

Dev Branch:

https://ryanyinlee-bearer-auth.herokuapp.com/

Main/Production - Due to Heroku limitations this hasn't been used. Just running dev.


## UML

![](lab07uml.PNG)

## Credits

