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
            ("job", "description", "status")
        VALUES 
            ($1, $2, $3);
    `;
    let sqlValues = [jobToSend.job, jobToSend.description, jobToSend.status]
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
router.put('/:id', (req,res)=>{
    let idToUpdate = req.params.id
    let newStatus = req.body.status
    let sqlValues = [newStatus, idToUpdate]
    let sqlQuery = `
    UPDATE "task"
        SET "status" = $1
        WHERE "id" = $2;
    `;
    pool.query(sqlQuery, sqlValues)
    .then((dbRes)=>{
        console.log('successful update from put: serverside');
        res.sendStatus(201)
    }).catch(( dbErr)=>{
        console.log('broke in PUT serverside', dbErr);
        res.sendStatus(500)
    })
})
// DELETE
router.delete('/:id', (req,res)=>{
    let idToDelete = req.params.id
    let sqlValues = [idToDelete]
    let sqlQuery = `
    DELETE FROM "task"
        WHERE "id" = $1;
    `;
    pool.query(sqlQuery, sqlValues)
    .then((dbRes)=>{
        res.sendStatus(201)
    }).catch(( dbErr)=>{
        console.log('broke in DELETE serverside', dbErr);
        res.sendStatus(500)
    })
})


module.exports = router;