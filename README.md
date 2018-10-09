## Social Network for Developers
This is Full Stack implementation for social network for developers

## Technologies
* Node.js
* Express
* React
* Redux
* MongoDB

## User Actions
### Not Registered Users
  * See other developers profiles

### Registered Users
  * Create business profile
  * Add Experience, education and their enrolled projects
  * Upload profile picture
  * See posts from other developers
  * Add posts
  * Edit their own posts
  * Make comments on existing posts
  * Like posts
 

## Authentication
* Users are authenticated with JSON Web Tokens. 
* **Access Token** is used in every request
* **Refresh Token** is used for getting new access token

## Setting environment
* Make directories in project root for uploading profile pictures
 ```
 mkdir public 
 mkdir public/upload
 mkdir server/public
 mkdir server/public/upload
 mkdir server/public/upload/temp
 ```
 * Edit ```.env``` file, specify your development or production MongoDB URI. If nothing is specified application will try to connect to MongoDB on localhost on port 27017. Also if you want to run application in production mode set ```NODE_ENV``` value in ```.env``` file to **production**. If you specify **production** environment application will try to connect to production MongoDB URI specified in ```.env``` file, otherwise application will try to connect to development MongoDB URI specified in ```.env```.
 
## Running application
```
#Install server packages
npm install

#Install client packages
npm run client-install

#Start server
npm run server

#Start client
npm run client

#Start server and client using concurrently
npm run dev
```
