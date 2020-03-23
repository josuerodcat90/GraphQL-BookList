import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_AUTHORS_QUERY } from '../GraphQL/Queries';
import { ADD_AUTHOR_MUTATION } from '../GraphQL/Mutations';

const AddAuthor = () => {
	const { loading, data } = useQuery(GET_AUTHORS_QUERY);
	const [AddAuthor] = useMutation(ADD_AUTHOR_MUTATION);
	const [name, setName] = useState('');
	const [age, setAge] = useState('');

	const displayAuthors = () => {
		if (loading) {
			return <option disabled>Loading authors...</option>;
		} else {
			return data.authors.map(author => {
				return (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				);
			});
		}
	};

	const submitForm = e => {
		e.preventDefault();
		AddAuthor({
			variables: {
				name: name,
				age: Number(age)
			},
			refetchQueries: [{ query: GET_AUTHORS_QUERY }]
		});
	};

	return (
		<form id='add-author' onSubmit={submitForm}>
			<div className='field'>
				<label>Author name:</label>
				<input type='text' onChange={e => setName(e.target.value)} />
			</div>
			<div className='field'>
				<label>Age:</label>
				<input type='text' onChange={e => setAge(e.target.value)} />
			</div>
			<button>Add Author</button>
		</form>
	);
};
export default AddAuthor;
