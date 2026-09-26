require('dotenv').config();

const app = require('./src/app');
const PORT = 5000;

const connectToDB = require('./src/config/db');

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})

connectToDB();