const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shruti@1512',
    database: 'blog_db',
    port: 3306
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Endpoint to create a new blog post
app.post('/api/blogs', (req, res) => {
    const { title, author, content } = req.body;
    const query = 'INSERT INTO blogs (title, author, content) VALUES (?, ?, ?)';
    db.execute(query, [title, author, content], (err, results) => {
        if (err) {
            console.error('Error inserting blog post:', err);
            return res.status(500).json({ message: 'Error creating blog post.' });
        }
        res.status(201).json({ message: 'Blog post created successfully!' });
    });
});

// Endpoint to get all blogs
// Endpoint to get all blog posts
app.get('/api/blogs', (req, res) => {
    const query = 'SELECT * FROM blogs';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching blog posts:', err);
            return res.status(500).json({ message: 'Error fetching blog posts.' });
        }
        res.json(results); // Send the results as JSON
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
