// app.js

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL接続情報
const pool = new Pool({
    user: 'test_user',
    host: 'localhost',
    database: '2024_gxp_test_db',
    password: 'test_password',
    port: 5432,
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// ホームページを表示するルート
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// 計算結果を保存するルート
app.post('/calculate', (req, res) => {
    const input1 = parseInt(req.body.input1);
    const input2 = parseInt(req.body.input2);
    const result = input1 + input2;

    // PostgreSQLに結果を保存
    pool.query('INSERT INTO calculations (input1, input2, result) VALUES ($1, $2, $3)', [input1, input2, result], (error, results) => {
        if (error) {
            throw error;
        }
        res.json({ result });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
