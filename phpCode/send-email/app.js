const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve a simple HTML form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email to File</title>
    </head>
    <body>
      <h1>Enter Your Email</h1>
      <form action="/submit" method="POST">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <button type="submit">Submit</button>
      </form>
    </body>
    </html>
  `);
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { email } = req.body;

  if (email) {
    const filePath = path.join(__dirname, 'emails.txt');
    const data = `${email}\n`;

    // Append the email to the file
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).send('Server error. Please try again later.');
      }

      // Redirect back to the form page
      res.redirect('/');
    });
  } else {
    res.status(400).send('<h1>Invalid email!</h1><a href="/">Go back</a>');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
