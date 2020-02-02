const { ApolloServer } = require('apollo-server');
const schema = require('./schema/schema');
require('dotenv/config');
const port = process.env.PORT || 5000;
require('./database');

///server
const server = new ApolloServer({ schema }, { playground: true });

///middleware
server.listen(port, () => {
	console.log('🚀  Server ready at port ' + port);
});
