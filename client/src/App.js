import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

///Components
import BookList from './Components/BookList';

///Apollo client setup
const client = new ApolloClient({
	uri: 'http://localhost:5000/'
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<div id='main'>
				<h1>Ninja's Reading List</h1>
				<BookList />
			</div>
		</ApolloProvider>
	);
};

export default App;
