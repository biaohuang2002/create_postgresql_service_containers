const { Client } = require('pg');

const pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
});


const table = 'CREATE TABLE student(id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, age INT, address VARCHAR(80), email VARCHAR(40))'
const text = 'INSERT INTO student(firstname, lastname, age, address, email) VALUES($1, $2, $3, $4, $5) RETURNING *'
const values = ['Mona the', 'Octocat', 9, '88 Colin P Kelly Jr St, San Francisco, CA 94107, United States', 'octocat@github.com']

// pgclient.query(table, (err, res) => {
//     if (err) throw err
// });
//
// pgclient.query(text, values, (err, res) => {
//     if (err) throw err
// });
//
// pgclient.query('SELECT * FROM student', (err, res) => {
//     if (err) throw err
//     console.log(err, res.rows) // Print the data in student table
//     pgclient.end()
// });

async function main ()
{
    try {
        await pgclient.connect();
        await pgclient.query(table)
        await pgclient.query(text, values)
        const res = await pgclient.query('SELECT * FROM student')
        console.log(res.rows)
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Re-throw the error if needed
    } finally {
        await pgclient.end()
    }
}

main()