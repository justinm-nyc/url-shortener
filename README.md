# URL-SHORTENER
A URL shortener made using the MERN stack. 

The client portion was created by using [Create React App](https://create-react-app.dev/docs/getting-started/) and Bootstrap 5.
The server was set up using [Hello world example](https://expressjs.com/en/starter/hello-world.html).
For setting up mongoose, this was used [How to Build a REST API with Express and Mongoose](https://rahmanfadhil.com/express-rest-api/).


A [Short Unique ID (UUID) Generating Library](https://www.npmjs.com/package/short-unique-id) is used in the server.<br />
A [Copy to clipboard React component](https://github.com/nkbt/react-copy-to-clipboard) is used in the client. 


## Requirements
### Docker
- Full documentation on installing docker is available on [Docker's website](https://docs.docker.com/get-docker/).


## Start Application
Note: The application uses ports 3000 and 80 
1. Make sure Docker is running
2. Clone the repository
3. Open a terminal window in the root folder and run the command:
``` bash
# Build and start the container:
docker-compose up --build -d

```
3. After Docker finishes building the three containers, wait a few seconds and then go to `http://localhost:3000/` in you're web browser 
