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
