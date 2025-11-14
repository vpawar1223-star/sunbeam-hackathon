const express = require("express");
const router = express.Router();
const pool = require('../config/dbConfig')
const result = require('../utils/result');
const { customAlphabet } = require("nanoid");
const getFormatedDate = require("../utils/formatedDate");

router.get('/reviews', (req, res) => {
    const { movieId } = req.body;
    const sql = "SELECT * FROM REVIEWS WHERE movieId = ? and  userId = ?"
    pool.query(sql, [movieId, req.headers.userId], (error, data) => {
        res.send(result.createResult(error, data));
    })
})

router.post('/reviews', (req, res) => {
    const { review, rating , movieId} = req.body;
    const sql = "INSERT INTO REVIEWS(id , movieId, review, rating , userId, modified) values (?,?,?,?,?,?)";
     const generator = customAlphabet("1234567890", 4);
    const id = generator();

    const formattedTimestamp = getFormatedDate();
    pool.query(sql, [id, movieId, review, rating, req.headers.userId, formattedTimestamp
        
    ], (error, data) => {
        res.send(result.createResult(error, data));
    });
})

router.delete('/reviews/:id', (req, res) => {
    const id = req.params.id;
  const sql = `DELETE FROM reviews where id = ?`
  pool.query(sql, [id], (error, data) => {
    res.send(result.createResult(error, data))
  })
})

router.post('/reviews', (req, res) => {
    const {  movieId, review, rating } = req.body;
    const sql = `INSERT INTO REVIEWS(id, movieId, review, rating, userId, modified) values (?,?,?,?,?,?)`;
    const generator = customAlphabet("1234567890", 4);
    const id = generator();
    
    pool.query(sql, [id, movieId, review, rating, Date.now()], (error, data) => {
        res.send(result.createResult(error, data))
    })
})


module.exports = router;