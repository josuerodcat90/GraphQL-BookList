import { gql } from 'apollo-boost';

const ADD_BOOK_MUTATION = gql`
	mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			id
			name
			genre
		}
	}
`;

export { ADD_BOOK_MUTATION };
