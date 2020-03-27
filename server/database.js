const mongoose = require('mongoose');
const db = mongoose.connection;
const uri = process.env.DB_URI || 'http://localhost:27017/test';

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
