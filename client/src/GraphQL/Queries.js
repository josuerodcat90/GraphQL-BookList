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

export { GET_BOOKS_QUERY, GET_AUTHORS_QUERY };
