Middlewares are http middleware handlers that run on all routes. New middlewares are created in the `./middlewares/` folder.

```javascript
const { Middleware } = require('klasa-dashboard-hooks');

module.exports = class extends Middleware {

	async run(request, response, route) {
		// This is where you place the code you want to run on all routes
	}

};
```

The run method in {@link Middleware} takes 3 parameters:

| Name             | Type                             | Description                |
| ---------------- | -------------------------------- | -------------------------- |
| **request**      | {@link KlasaIncomingMessage}     | The incomming request      |
| **response**     | {@link external:ServerResponse}  | The outgoing response      |
| **route**        | {@link Route}                    | The route being run        |

```javascript
const { Middleware } = require('klasa-dashboard-hooks');

module.exports = class extends Middleware {

	run(request) {
		response.setHeader('Content-Type', 'application/json');
	}

};
```

How does the middleware work?

1. A request is made to your api
2. Since we are making a json api, we want to set the header in a way that clients know we are responding with json
3. The method is implicently resolved, and the next {@link Middleware} is run, or finally the {@link Route}.

>Note: the {@link Middleware#run()} may be async/return a promise as well.

# Further reading

- {@tutorial CreatingRoutes}
