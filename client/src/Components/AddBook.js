import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

///Queries
import { getAuthorsQuery } from '../GraphQL/Queries';

///Mutations
import { addBookMutation } from '../GraphQL/Mutations';

///Set Scenarios
const getOptions = (loading, error, data) => {
	if (loading) {
		return <option disabled>Loading Authors...</option>;
	} else if (error) {
		return <option disabled>Error loading Authors...</option>;
	} else {
		return data.authors.map(({ name, id }) => {
			return (
				<option key={id} value={id}>
					{name}
				</option>
			);
		});
	}
};

const AddBook = () => {
	const { loading, error, data } = useQuery(getAuthorsQuery);
	const [name, setName] = useState('');
	const [genre, setGenre] = useState('');
	const [authorId, setAuthorId] = useState('');
	const { addBook } = useMutation(addBookMutation, {
		variables: {
			name,
			genre,
			authorId
		}
	});

	const options = useMemo(() => getOptions(loading, error, data), [loading, error, data]);

	const handleSubmit = e => {
		e.preventDefault();
		addBook();
	};

	return (
		<form id='add-book' onSubmit={handleSubmit}>
			<div className='field'>
				<label>Book name: </label>
				<input
					type='text'
					onChange={e => {
						setName(e.target.value);
					}}
					value='A Christmas Carol'
				/>
			</div>

			<div className='field'>
				<label>Genre: </label>
				<input
					type='text'
					onChange={e => {
						setGenre(e.target.value);
					}}
					value='Fantasy'
				/>
			</div>

			<div className='field'>
				<label>Author: </label>
				<select
					onChange={e => {
						setAuthorId(e.target.value);
					}}
					value='5e305caa81e67c315c40328f'
				>
					<option>Select Author</option>
					{options}
				</select>
			</div>

			<button>+</button>
		</form>
	);
};

export default AddBook;
