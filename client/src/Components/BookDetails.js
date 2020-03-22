import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOK_QUERY } from '../GraphQL/Queries';

const BookDetails = ({ bookId }) => {
	const { loading, data, error } = useQuery(GET_BOOK_QUERY, {
		variables: {
			id: bookId
		}
	});
	const displayDetails = () => {
		if (data) {
			const book = data.book;
			return (
				<div>
					<h2>{book.name}</h2>
					<p>{book.genre}</p>
					<p>{book.author.name}</p>
					<p>All books by this author:</p>
					<ul className='other-books'>
						{book.author.books.map(item => {
							return <li key={item.id}>{item.name}</li>;
						})}
					</ul>
				</div>
			);
		} else if (loading) {
			return <div>Loading selected book...</div>;
		} else if (error) {
			return <div>Error obtaining the book...</div>;
		} else {
			return <div>No book selected...</div>;
		}
	};
	return <div id='book-details'>{displayDetails()}</div>;
};

export default BookDetails;
