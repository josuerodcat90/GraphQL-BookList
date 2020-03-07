import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

///Queries
import { getAuthorsQuery } from '../GraphQL/Queries';

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

	const options = useMemo(() => getOptions(loading, error, data), [loading, error, data]);

	const handleSubmit = e => {
		e.preventDefault();
		console.log(`The book name is ${name}, and the genre is ${genre} from the author ${authorId}`);
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
				/>
			</div>

			<div className='field'>
				<label>Genre: </label>
				<input
					type='text'
					onChange={e => {
						setGenre(e.target.value);
					}}
				/>
			</div>

			<div className='field'>
				<label>Author: </label>
				<select
					onChange={e => {
						setAuthorId(e.target.value);
					}}
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
