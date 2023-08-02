const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET students
router.get('/', (req, res) => {
    // Get all of the students in the table
    const sqlText = `SELECT * FROM students ORDER BY id ASC`;
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});

router.put('/:id', (req, res) => {
    // Update this single student
    const idToUpdate = req.params.id;
    const sqlText = `UPDATE students SET cohort = $1, first_name = $2, last_name = $3, github_name = $4 WHERE id = $5`;
    pool.query(sqlText, [req.body.cohort, req.body.first_name, req.body.last_name, req.body.github_name, idToUpdate])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});

// POST students
router.post('/', (req, res) => {
    console.log(req.body);
    const newStudent = req.body;
    const sqlText = `INSERT INTO students (cohort, first_name, last_name, github_name) VALUES ($1, $2, $3, $4)`;

    pool.query(sqlText, [newStudent.cohort, newStudent.first_name, newStudent.last_name, newStudent.github_name])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});

module.exports = router;