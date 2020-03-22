import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

///Components
import BookDetails from './BookDetails';

///GraphQL Queries & Mutations
import { GET_BOOKS_QUERY } from '../GraphQL/Queries';

const BookList = props => {
	///Make the query to DB
	const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

	///Ste to state the selected bookId
	const [selected, setSelected] = useState('');

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
		return (
			<li key={id} onClick={e => setSelected(id)}>
				{name}
			</li>
		);
	});

	return (
		<div>
			<ul id='book-list'>{bookListItems}</ul>
			{selected && <BookDetails bookId={selected} />}
		</div>
	);
};

export default BookList;
