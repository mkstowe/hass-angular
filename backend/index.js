const app = require('./server');

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
