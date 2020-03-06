const mongoose = require('mongoose');
const db = mongoose.connection;
const uri =
	'mongodb+srv://dbtester:SEcHkEcX5Fmdx6R4@devmongodbs-aoexc.mongodb.net/graphQL-ninja?retryWrites=true&w=majority';

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

db.once('open', () => {
	console.log('>>>Atlas DB is now Connected<<<');
});

db.on('error', err => {
	console.log(err);
});
