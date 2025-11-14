const express = require('express');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

const pool = require('../config/dbConfig');
const result = require('../utils/result');
const config = require('../utils/config');
const {  customAlphabet, nanoid } = require('nanoid');

const router = express.Router()

router.post('/register', (req, res) => {
  const { firstName, lastName, email, password, mobile , birth} = req.body
  const encryptedPassword = String(cryptoJs.SHA256(password))
  const sql = `INSERT INTO users(id, firstName, lastName, email, password, mobile) VALUES(?,?,?,?,?,?)`
  const generator = customAlphabet("1234567890", 4);
  const id = generator();
  pool.query(
    sql,
    [id, firstName, lastName, email, encryptedPassword, mobile],
    (error, data) => {
      res.send(result.createResult(error, data))
    }
  )
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const encryptedPassword = String(cryptoJs.SHA256(password))
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
  pool.query(sql, [email, encryptedPassword], (error, data) => {
    if (data) {
      if (data.length != 0) {
        const payload = {
          userId: data[0].id,
        }
        const token = jwt.sign(payload, config.secret)
        const body = {
          token: token,
          firstName: data[0].firstName,
          lastName: data[0].lastName,
        }
        res.send(result.createSuccessResult(body))
      } else res.send(result.createErrorResult('Invalid email or password'))
    } else res.send(result.createErrorResult(error))
  })
})

router.get('/profile', (req, res) => {
  const sql = `SELECT firstName, lastName, mobile, email from users where id = ?`;
  pool.query(sql, [req.headers.userId], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.put('/profile', (req, res) => {
  const { firstName, lastName, mobile} = req.body;
  const sql = "UPDATE USERS SET firstName = ? , lastName = ? , mobile = ? where id = ? ";
  pool.query(sql, [firstName, lastName, mobile, req.headers.userId]);

})

module.exports = router
