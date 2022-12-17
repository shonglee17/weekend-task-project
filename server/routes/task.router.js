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
router.post('/', (req, res) => {
    let jobToSend = req.body;

    let sqlQuery = `
        INSERT INTO "task" 
            ("job", "description")
        VALUES ($1, $2);
    `;
    let sqlValues = [jobToSend.job, jobToSend.description]
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.log(`error in POST: serverside`, dbErr);
            res.sendStatus(500);
        });
});
// PUT

// DELETE
router.delete('/:id', (req,res)=>{
    let idToDelete = req.params.id
    let sqlQuery = `
    DELETE FROM "task"
    WHERE "id" = $1;
    `;

    let sqlValues = [idToDelete]

    pool.query(sqlQuery, sqlValues)
    .then((dbRes)=>{
        res.sendStatus(201)
    }).catch(( dbErr)=>{
        console.log('broke in DELETE serverside', dbErr);
        res.sendStatus(500)
    })
})


module.exports = router;