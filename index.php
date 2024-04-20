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
    <ul>
    <?php
        $dir = "."; // Specify the directory to scan
        $files = scandir($dir); // Scan files in that directory
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) == "html") {
                echo '<li><a href="' . htmlspecialchars($file) . '">' . htmlspecialchars($file) . '</a></li>';
            }
        }
    ?>
    </ul>
</body>
</html>
