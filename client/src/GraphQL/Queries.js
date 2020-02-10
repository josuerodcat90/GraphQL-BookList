import { gql } from 'apollo-boost';

export const getBooksQuery = gql`
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

export const getAuthorsQuery = gql`
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
