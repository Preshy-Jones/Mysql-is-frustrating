const express = require('express')
const mysql = require('mysql');
const request = require('request')

const router = express.Router();


const db = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bfc148d01d2b40',
    password: 'eee07c6c',
    database: 'heroku_5b4be569d534dc8',
});


//create db
router.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE users'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created ...');
    })
})

router.get('/createuserstable', (req, res) => {
    let sql = 'CREATE TABLE Users(id int AUTO_INCREMENT, name VARCHAR(255), username VARCHAR(255), email VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Users table created....');
    });
});


router.get('/populate', (req, res) => {
    request({
        url: "http://jsonplaceholder.typicode.com/users",
        json: true
    }, (err, resp, body) => {
        //res.send(typeof body);
        for (var i = 0; i < body.length; i++) {

            let post = { id: body[i].id, name: body[i].name, username: body[i].username, email: body[i].email };
            let sql = 'INSERT INTO users SET?';
            let query = db.query(sql, post, (err, result) => {
                if (err) throw err;
                console.log(result);
            });
        };
        res.send('users data added....')
    });

});

router.get('/deleteall', (req, res) => {
    db.query("DELETE FROM users", function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        console.log(result);
        res.send('all users deleted')
    });
})
router.get('/signup', (req, res) => res.render('signup'));

router.post('/signup', (req, res) => {
    let user = { name: req.body.name, username: req.body.username, email: req.body.email };
    db.query('INSERT INTO users SET?', user, (error, result) => {
        if (error) throw error;
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

router.get('/status', function (req, res) {
    if (req.session.loggedin) {
        res.status(200).json({ message: 'Logged in as ' + req.session.username + '!' });
    } else {
        res.redirect('/login')
    }
    res.end();
});

router.get('/login', (req, res) => res.render('login'));

router.post('/login', (req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    if (name && email) {
        db.query('SELECT * FROM users WHERE name = ? AND email = ?', [name, email], function (error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = name;
                res.redirect('/status');
            } else {
                res.status(400).json({ message: 'username or email is incorrect' });
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});


//delete user in last row
router.get('/delete', (req, res) => {
    let sql = 'delete from users order by id desc limit 1'
    //    let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User in last row deleted....');

    });
});

// //select single posts
router.get('/getuser/:id', (req, res) => {
    let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
    let query = db.query(sql, async (err, result) => {
        if (err) throw err;
        res.status(200).json(result[0]);

    });
});

//select users
router.get('/getusers', (req, res) => {
    let sql = 'SELECT * FROM users';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
        console.log('Users fetched....');
    });
});

// router.get('/adduser', (req, res) => {
//     let post = { id: 1, name: 'neymar', username: 'NMJR', email: 'neymarjr@gmail.com' };
//     let sql = 'INSERT INTO users SET?';
//     let query = db.query(sql, post, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('single user added....');

//     });
// });


// router.get('/addpost1', (req, res) => {
//     let post = { title: 'Post One', body: 'This is post number one' };
//     let sql = 'INSERT INTO posts SET?';
//     let query = db.query(sql, post, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Posts 1 added....');

//     });
// });

// router.get('/addpost2', (req, res) => {
//     let post = { title: 'Post Two', body: 'This is post number two' };
//     let sql = 'INSERT INTO posts SET?';
//     let query = db.query(sql, post, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Posts 2 added....');

//     });
// });


// //update post
// router.get('/updatepost/:id', (req, res) => {
//     let newTitle = 'Updated Title';
//     let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Post updated....');

//     });
// });
// router.get('/delete', (req, res) => {
//     let sql = `DELETE FROM users WHERE id=(SELECT MAX(id) FROM users)`;
//     let query = db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Last User deleted....');

//     });
// });


// to combact the error "unhandled error PROTOCOL_CONNECTION LOST"
db.query('select 1 + 1', (err, rows) => { /* */ });


module.exports = router