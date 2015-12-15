# Steam Profiles Demo

Prototype of a concept I've been tinkering around with for a while. Uses React and ES6.

## Prerequisites
- Node.js [link](https://nodejs.org/)
  - Note: Must be a newer version that supports ES6.

## Startup
- Install required dependencies:
```
npm install
```
- Build the static assets:
```
gulp
```
- Run the following command to start the server:
```
node server/server.js
```

## Future Improvements
- Write more Generic Components that can be extended to reduce duplicate/similar code. I.E. The lists could probably extend a generic component.
- Integrate Steam login. Adjust elements based on user details. I.E. If a user is logged in, only show launch button for games they own. Otherwise have a link to the store.
- Add client side data cache rather than loading data on component load.
- User Completed Games datapoint
- Increase the `perform_request` to a configurable amount based on the limitations of the server, probably around 5-10 at a time.
- Add a high and low priority queue. The high priority queue would have information required by a pending request. Low priority will have background game and user updates.
- Add a url hash router
- Add Owner Achievements
- Achievement % and percentage bar.
- Responsive styles for mobile devices
- Add isomorphic (universal) javascript implementation.
