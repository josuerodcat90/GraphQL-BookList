const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const port = process.env.PORT || 5000;
require('./database');

///middleware
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

///server
app.listen(port, () => {
	console.log(`Server running on port ${port} 🔥`);
});
