import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_AUTHORS_QUERY, GET_BOOKS_QUERY } from '../GraphQL/Queries';
import { ADD_BOOK_MUTATION } from '../GraphQL/Mutations';

const AddBook = () => {
	const { loading, data } = useQuery(GET_AUTHORS_QUERY);
	const [AddBook] = useMutation(ADD_BOOK_MUTATION);
	const [name, setName] = useState('');
	const [genre, setGenre] = useState('');
	const [authorId, setAuthorId] = useState('');

	const displayAuthors = () => {
		return loading ? (
			<option disabled>Loading authors</option>
		) : (
			data.authors.map(author => {
				return (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				);
			})
		);
	};

	const submitForm = e => {
		e.preventDefault();
		AddBook({
			variables: {
				name: name,
				genre: genre,
				authorId: authorId
			},
			refetchQueries: [{ query: GET_BOOKS_QUERY }]
		});
	};

	return (
		<form id='add-book' onSubmit={submitForm}>
			<div className='field'>
				<label>Book name:</label>
				<input type='text' onChange={e => setName(e.target.value)} />
			</div>
			<div className='field'>
				<label>Genre:</label>
				<input type='text' onChange={e => setGenre(e.target.value)} />
			</div>
			<div className='field'>
				<label>Author:</label>
				<select onChange={e => setAuthorId(e.target.value)}>
					<option>Select author</option>
					{displayAuthors()}
				</select>
			</div>
			<button>+</button>
		</form>
	);
};

export default AddBook;
