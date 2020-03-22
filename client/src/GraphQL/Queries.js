import { gql } from 'apollo-boost';

const GET_BOOKS_QUERY = gql`
	query {
		books {
			id
			name
			genre
			author {
				name
				age
			}
		}
	}
`;

const GET_AUTHORS_QUERY = gql`
	query {
		authors {
			id
			name
			age
			books {
				name
				genre
			}
		}
	}
`;

const GET_BOOK_QUERY = gql`
	query($id: ID) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					id
					name
				}
			}
		}
	}
`;

export { GET_BOOKS_QUERY, GET_AUTHORS_QUERY, GET_BOOK_QUERY };
