const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const directoryPath = path.join(__dirname, "/public"); // Directory containing HTML files

// Middleware to modify HTML files
function addFooter(req, res, next) {
    let oldSend = res.send;
    res.send = function (data) {
        // Check if the response is HTML
        if (typeof data === 'string' && data.startsWith('<!DOCTYPE html>')) {
            // Insert footer before the closing body tag
            data = data.replace('</body>', `
                <footer style="text-align: center; margin-top: 20px; padding: 10px 0; background-color: #f0f0f0; border-top: 1px solid #ddd;">
                    <a href="/">Back to Home</a>
                </footer>
            </body>`);
        }
        oldSend.apply(res, [data]);
    };
    next();
}

app.use(express.static("public")); // Serve static files
app.use(addFooter);   // Apply the footer middleware
app.get("/", (req, res) => {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).send("Unable to scan directory");
    }
    let fileList = files.filter(file => file.endsWith('.html'))
                            .map(file => {
                                let displayName = file.replace('.html', ''); // Remove '.html' from the file name
                                return `<li><a href="${file}">${displayName}</a></li>`;
                            })
                            .join('');
    res.send(`
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Directory Listing</title>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif; /* Sets the font for the page */
                                        margin: 20px; /* Adds some margin around the content */
                                    }
                                    ul {
                                        list-style-type: none; /* Removes bullet points from the list */
                                        padding: 0;
                                    }
                                    li {
                                        margin: 10px 0; /* Adds vertical spacing between list items */
                                        padding: 10px;
                                        background-color: #f8f8f8; /* Light grey background */
                                        border: 1px solid #ddd; /* Grey border */
                                        border-radius: 5px; /* Rounded corners */
                                    }
                                    a {
                                        text-decoration: none; /* Removes underline from links */
                                        color: #333; /* Dark grey text color */
                                    }
                                    a:hover {
                                        color: #0275d8; /* Changes text color on hover */
                                    }
                                </style>
                            </head>
                            <body>
                                <h1>List of HTML Files</h1>
                                <ul>${fileList}</ul>
                            </body>
                            </html>
                            `);
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
