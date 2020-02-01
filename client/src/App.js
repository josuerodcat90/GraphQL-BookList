import React from 'react';

///Components
import BookList from './Components/BookList';

const App = () => {
	return (
		<div id='main'>
			<h1>Ninja's Reading List</h1>
			<BookList />
		</div>
	);
};

export default App;
