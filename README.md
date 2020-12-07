# RPS View - Beta version

A web or desktop application to assist in visualization and monitoring of redis pub-sub clients.


### Problem

Testing your Redis pub sub clients in development requires multiple redis cli clients. Our tool allows you to create publishers and subscribers and channels in one place and monitor receipt of messages.

### App description

This app allows you to track redis pub / sub messages with dummy clients. The app uses

- Express erver
- Web sockets on 3030 to send messages to clients
- Redis IO to connect and subscribe clients
- Redux/React front end to manage state
- Redux Thunk middleware for fetch requests, asynchronous actions, and web socket message handling
- Jest & Supertest for unit tests and integration testing
- Electron for desktop cabailities

### Getting started

#### To run the application

- [ ] `npm install`
- [ ] Redis server must be open. Run `redis-server` if you don't already have a server up for your project.
- [ ] `npm run start` opens the electron app, using ports 3000 & 8080
- [ ] If the electron app is closed at any point, `npm run electron` will reopen it. 

#### Important Setup Notes

- Express - You must be running an Express server on port 3000 for the application to work
- Redis-server - You must run a redis server - either in your application or on the command line to connect the app. Make sure you connect to the same port that your redis-server is running on. If no server is specified, the application will attempt to create a redis client on port 6379.

### Examples



### How to contribute

- We're an open source project, and we're open to new contributions. 
- Add an issue to the github issues before starting a new feature.
- Make pull requests to staging with issue referenced in the PR.

### Contact

Website: [LINK]

Github: [https://github.com/oslabs-beta/RPS-View](https://github.com/oslabs-beta/RPS-View)

### Team

- Elise Bare [@Github](https://github.com/elisebare) [@LinkedIn](https://www.linkedin.com/in/elisebare/)
- Joe Cheng [@Github](https://github.com/EtOh200) [@LinkedIn](https://www.linkedin.com/in/josephcheng-y/)
- Lara Nichols [@Github](https://github.com/Lol-Whut) [@LinkedIn](https://www.linkedin.com/in/lara-nichols-ba822279/)
- Mark Washkewicz [@Github](https://github.com/Mark-Waskewicz) [@LinkedIn](https://www.linkedin.com/in/mark-washkewicz/) 

### License

Distributed under the MIT License. 


