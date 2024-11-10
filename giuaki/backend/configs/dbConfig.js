const mysql = require('mysql');

// Cấu hình kết nối MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '19112005',  // Sửa lại mật khẩu nếu cần
    database: 'todolist_db' // Tên database
});

db.connect((err) => {
    if (err) throw err;
    console.log('Đã kết nối tới MySQL');
});

module.exports = db;
