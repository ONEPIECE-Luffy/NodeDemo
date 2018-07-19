var fs = require("fs");
var dbPath = './db.json';
/**
 * 获取所有学生
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.find = function(callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, JSON.parse(data).students)
    });
}
/**
 * 添加学生
 */

exports.save = function(student, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        // 添加 id ，唯一不重复
        student.id = students[students.length - 1].id + 1

        // 把用户传递的对象保存到数组中
        students.push(student)

        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
            students: students
        })

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是 null
            callback(null)
        })
    })
}

/**
 * 根据id查找学生信息
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }

        var students = JSON.parse(data).students;
        var result = students.find(function(item) {
            return item.id === parseInt(id);
        });
        callback(null, result);
    })
}

/**
 * 更新学生信息
 * @param  {[type]}   student  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.update = function(student, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students;
        student.id = parseInt(student.id);
        var ret = students.find(function(item) {
            return item.id === student.id;
        });

        for (var key in student) {
            ret[key] = student[key];
        }
        //把对象转成字符串
        var fileData = JSON.stringify({
            students: students
        });

        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                callback(err);
            }
            callback(null);
        });

    })
}

/**
 * 根据id删除学生信息
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.deleteById = function(id, callback) {
    console.log("id是：" +id );
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;
        var deleteId = students.findIndex(function(item) {
            return item.id === parseInt(id);
        });

        students.splice(deleteId, 1);
        var fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    });
}