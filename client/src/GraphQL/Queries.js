import { gql } from 'apollo-boost';

const getBooksQuery = gql`
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

const getAuthorsQuery = gql`
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

export { getBooksQuery, getAuthorsQuery };
