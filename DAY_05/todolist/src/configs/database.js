const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Tên người dùng MySQL
    password: '19112005', // Mật khẩu MySQL của bạn
    database: 'todolist'
});

connection.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err);
        return;
    }
    console.log('Kết nối MySQL thành công');
});

module.exports = connection;
