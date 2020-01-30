const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLError,
	GraphQLNonNull
} = graphql;
const _ = require('lodash');

const Book = require('../models/Book');
const Author = require('../models/Author');

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			async resolve(parent, args) {
				try {
					const bookAuthor = await Author.findById(parent.authorId);
					return bookAuthor;
				} catch (err) {
					const error = new GraphQLError('Error getting the author of this book: ' + err);
					return error;
				}
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			async resolve(parent, args) {
				try {
					const authorBooks = await Book.find({ authorId: parent.id });
					return authorBooks;
				} catch (err) {
					const error = new GraphQLError('Error getting the books of this author: ' + err);
					return error;
				}
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			async resolve(parent, args) {
				try {
					const getBook = await Book.findById(args.id);
					return getBook;
				} catch (err) {
					const error = new GraphQLError('Error finding the required book: ' + err);
					return error;
				}
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			async resolve(parent, args) {
				try {
					const getAuthor = await Author.findById(args.id);
					return getAuthor;
				} catch (err) {
					const error = new GraphQLError('Error finding the required author: ' + err);
					return error;
				}
			}
		},
		books: {
			type: new GraphQLList(BookType),
			async resolve(parent, args) {
				try {
					const getBooks = await Book.find();
					return getBooks;
				} catch (err) {
					const error = new GraphQLError('Error finding all the books: ' + err);
					return error;
				}
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			async resolve(parent, args) {
				try {
					const getAuthors = await Author.find();
					return getAuthors;
				} catch (err) {
					const error = new GraphQLError('Error finding all the authors: ' + err);
					return error;
				}
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				age: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			async resolve(parent, args) {
				const newAuthor = new Author({
					name: args.name,
					age: args.age
				});

				try {
					const savedAuthor = await newAuthor.save();
					return savedAuthor;
				} catch (err) {
					const error = new GraphQLError(err);
					return error;
				}
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				genre: {
					type: new GraphQLNonNull(GraphQLString)
				},
				authorId: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			async resolve(parent, args) {
				const newBook = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				});

				try {
					const savedBook = await newBook.save();
					return savedBook;
				} catch (err) {
					const error = new GraphQLError(err);
					return error;
				}
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
