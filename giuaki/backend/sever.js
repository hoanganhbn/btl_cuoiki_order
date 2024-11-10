const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes'); // Import các routes của tasks

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());           // Giải quyết vấn đề CORS (cho phép frontend kết nối từ domain khác)
app.use(bodyParser.json()); // Middleware để parse JSON từ client

// Sử dụng các route
app.use('/api', taskRoutes); // Định tuyến API cho tasks

// Khởi tạo server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
