const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
// Password hashing;
const bcrypt = require("bcrypt")

const app = express();
const port = 3000;

app.use(cors());

// MySQL connection
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12M4nUn1t3d99#',
    database: 'pfa5_cafe_finder',
});

// ENDPOINT CAFES
app.get('/cafes', (req, res) => {
    connection.query('SELECT * FROM cafes', (error, result) => {
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})

app.get('/cafes/:id', (req, res) => {
    const cafeIdReq = req.params.id
    connection.query('SELECT * FROM cafes WHERE cafe_id=?', [cafeIdReq], (error, result) => {
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})

app.get('/cafes/:city', (req, res) => {
    const cafeCityReq = req.params['city']
    connection.query('SELECT * FROM cafes WHERE city=?', [cafeCityReq], (error, result) => {
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})

// ENDPOINT USERS
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, result) => {
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})

app.get('/users/:id', (req, res) => {
    const userIdRequest = req.params.id
    connection.query('SELECT * FROM users WHERE user_id=?', [userIdRequest], (error, result) => {
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})

// ENDPOINT FAVORITES
app.get('/favorites', (req, res) => {
    connection.query('SELECT * FROM favorites', (error, result) => {
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})

// CREATE USER
app.use(express.json());

app.post("/createUser", async (req, res) => {
    const newUser = req.body.name;
    const password = req.body.password;

    try {
        const [rows] = await connection.query("SELECT * FROM users WHERE users = ?", [newUser]);

        console.log("------> Search Results");
        console.log(rows.length);

        if (rows.length !== 0) {
            console.log("------> User already exists");
            res.sendStatus(409);
        } else {
            await connection.query("INSERT INTO users VALUES (0,?,?)", [newUser, password]);
            console.log("--------> Created new User");
            res.sendStatus(201);
        }
    } catch (err) {
        console.error(err);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});