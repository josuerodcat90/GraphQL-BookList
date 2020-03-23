const { ApolloServer } = require('apollo-server');
const schema = require('./schema/schema');
require('dotenv/config');
const PORT = process.env.PORT || 5000;
require('./database');

///server
const server = new ApolloServer({ schema });

///middleware
server.listen(PORT, () => {
	console.log(`>>>Server ready at port ${PORT}<<<`);
});
