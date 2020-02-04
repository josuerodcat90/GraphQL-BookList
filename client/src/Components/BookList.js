import React from 'react';
import { useQuery } from '@apollo/react-hooks';

///GraphQL Queries & Mutations
import { getBooksQuery } from '../GraphQL/Queries';

const BookList = props => {
	///Make the query to DB
	const { loading, error, data } = useQuery(getBooksQuery);

	///Get loading or error states
	if (loading)
		return (
			<p>
				Loading...{' '}
				<span role='img' aria-label='think'>
					🤔
				</span>
			</p>
		);
	if (error)
		return (
			<p>
				Error{' '}
				<span role='img' aria-label='sad'>
					😢
				</span>
			</p>
		);

	///asign all books to a const
	const { books } = data;

	///map the books const to show all book items
	const bookListItems = books.map(({ id, name }) => {
		return <li key={id}>{name}</li>;
	});

	return (
		<div>
			<ul id='book-list'>{bookListItems}</ul>
		</div>
	);
};

export default BookList;
