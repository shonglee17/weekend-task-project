const express = require('express');
const router = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js')

// GET
router.get('/', (req,res) =>{
    let sqlQuery = `
    SELECT * FROM "task"
        ORDER BY "id";
    `;

    pool.query(sqlQuery)
    .then((dbRes)=>{
        console.log('success! from GET route: serverside');
        let task = dbRes.rows
        res.send(task)
    }).catch((dbErr) =>{
        console.log('GET route broke: serverside', dbErr)
        res.sendStatus(500)
    })

})
// POST

// PUT

// DELETE



module.exports = router;