var express = require('express');
var router = express.Router();
var fs = require('fs');
var Student = require('./students');

router.get('/', function(req, res) {
    Student.find(function(err, students) {
        if (err) {
            return res.status(500).send("Server Error!");
        }
        res.render('index.html', {
            fruit: [
                '苹果',
                '香蕉',
                '橙子',
                '西瓜'
            ],
            students: students
        });
    });
});

router.get('/students/save', function(req, res) {
   res.render('save.html');
});


router.post("/students/save", function(req, res){
   var formData = req.body;
   Student.save(formData, function(err){
    if (err) {
        return res.status(500).send('Server Error!');
    }
    res.redirect('/');
   });
});

router.get('/students/edit', function(req, res){
    Student.findById(req.query.id, function(err, student){
        if (err) {
            return res.status(500).send('Server Error!');
        }
         res.render('edit.html', {
            student: student
         });
    });
});

router.post('/students/edit', function(req, res){
    Student.update(req.body, function(err) {
        if (err) {
            return res.status(500).send('Server Error!');
        }
        res.redirect('/');
    })
});

router.get('/students/delete', function(req, res){
    Student.deleteById(req.query.id, function(err) {
        if (err) {
            return res.status(500).send('Server Error!');
        }
        res.redirect('/');
    });
});
module.exports = router;