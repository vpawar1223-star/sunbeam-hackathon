const express = require("express");
const router = express.Router();
const pool = require('../config/dbConfig')
const result = require('../utils/result');
const { customAlphabet } = require("nanoid");
const { route } = require("./reviewsRoutes");

router.get('/movies', (req, res) => {
    const sql = "SELECT * FROM MOVIES";
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data));
    })
})

router.post('/movies', (req, res) => {
    const {  title, releaseDate } = req.body;
    const sql = "INSERT INTO MOVIES(id, title, releaseDate) values ( ? , ? ,?)"
      const generator = customAlphabet("1234567890", 4);
        const id = generator();
    pool.query(sql, [id, title, releaseDate], (error, data) => {
        res.send(result.createResult(error, data));
    })
})

router.put('/movies/:id', (req, res) => {
    const { title, releaseDate } = req.body;
    const id = req.params.id;
    const sql = "update movies set title = ? , releaseDate = ? where id = ?"
    pool.query(sql, [title, releaseDate, id], (error, data) => {
        res.send(result.createResult(error, data));
    })
})

router.delete('/movies/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from movies where id = ?";
    pool.query(sql, [id], (error, data) => {
        res.send(result.createResult(error, data));
    })

})

module.exports = router;