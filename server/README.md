# Demo Server

## Prerequisites
- Node.js [link](https://nodejs.org/)
  - Note: Must be a newer version that supports ES6.

## Startup
- Run the following command to start the server:
```
node server/server.js
```
- Populate the data:
```
var data_urls = [
	'76561197960434622', // al
	'76561197960640894', // johnwilber
	'76561197973097209', // phitaucox
	'76561197978304748', // beefghost
	'76561197982098945', // BlueFox
	'76561198022666574', // jswpy
	'76561198067180846'  // kalira77
];
data_urls.forEach(function (url) {
	var prefix = 'http://localhost:3000/api/steam/user/';
    var i = document.createElement('img');
    i.src = prefix + url;
});
```

## Features To Be Implemented
- Migrate server code to a private repository.
- Add MongoDB [link](https://www.mongodb.org/) backend.
- Enhanced logic around updating users and games.
- Add admin interface for managing users and games.
- Add API to support the home page's recommended games slider.
- Increase API synchronous request capacity from 1 to 5-10.
