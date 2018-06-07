const express = require('express');
const router = express.Router();

// Get our connection to the database
const pool = require('../modules/pool.js')

router.get('/', (req, res) => {
    console.log('In song-router GET to read');
    const queryText = 'SELECT * FROM songs';
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((err) => {
    console.log('Error getting all songs', err);
    res.sendStatus(500);
    })
});


router.post('/', (req, res) => {
    console.log('In song-router POST to create');
    //     INSERT INTO songs (id, artist, track, published, rank)

// //note: sql uses two commas for a single comma not /‘
// VALUES (1, 'Billy Joel', 'We didn''t start the fire', '1/1/1989', 35);
    const queryText = `INSERT INTO songs (artist, track, published, rank)
    VALUES ($1, $2, $3, $4)`;
    pool.query(queryText, [req.body.artist, req.body.track, req.body.published, req.body.rank])
    .then((results) => {
        console.log('Successful POST of song,', results);
        res.sendStatus(200)
    } )
    .catch((err) => {
        console.log('Error', err);
        res.sendStatus(500)
    })
});

router.put('/:id', (req, res) => {
    console.log('In song-router PUT to update');
    const id = req.params.id;
    const queryText = `UPDATE songs SET  rank=$2, artist=$3, track=$4, published=$5 WHERE id=$1`;
    pool.query(queryText, [id, req.body.rank, req.body.artist, req.body.track, req.body.published])
    .then((results) => {
        console.log('Successful PUT of song,', results);
        res.sendStatus(200)
    } )
    .catch((err) => {
        console.log('Error', err);
        res.sendStatus(500)
    })

});

router.delete('/:id', (req, res) => {
    console.log('In song-router DELETE to delete, obviously');
    const id = req.params.id;
    const queryText = `DELETE FROM songs WHERE id=$1`;
    // passing two things to the query. 1) the query text
    // 2) the values to substitute into the query for the $1. $2, etc
    // when subbing things the order is important
    console.log(queryText);
    
    pool.query(queryText, [id])
    .then((results) =>{
        console.log('Successful delete of song', results);
        res.sendStatus(200)
    })
    .catch((err) => {
        console.log('Error deleting of song', err);
        res.sendStatus(500);
    })
});

module.exports = router;