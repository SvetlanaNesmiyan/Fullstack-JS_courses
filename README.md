# Basic HTTP Server in Node.js

This is a simple HTTP server built with Node.js' built-in `http` module. It handles GET and POST requests to specific routes, returns statically generated HTML pages for GET requests, and processes data from POST requests.

## Features

- Listens on port 3000 (or the port specified by the `PORT` environment variable)
- Handles GET requests for `/`, `/about`, and `/contact` routes
- Handles POST requests to `/submit` with form data (name and email)
- Returns 404 for undefined routes
- Returns 400 for invalid form data (empty fields)
- Limits POST body size to 1 MB (returns 413 for larger payloads)
- Sets appropriate headers (Content-Type, Content-Length, X-Content-Type-Options)
- Sanitizes input to prevent XSS attacks
- Modular code structure with separate files for route handling and HTML generation

## Installation

1. Make sure you have Node.js installed (version 12 or higher recommended)
2. Clone this repository or copy the files to your local machine
3. Navigate to the project directory
4. Run `npm install` (though no external dependencies are required, this is good practice)
5. Start the server with `node server.js`

## Usage

### GET Requests

- `GET /` - Returns the home page with title "Home" and message "Welcome to the Home Page"
- `GET /about` - Returns the about page with title "About" and message "Learn more about us"
- `GET /contact` - Returns the contact page with title "Contact" and message "Get in touch"
- Any other GET request returns a 404 page with "Page Not Found"

### POST Request

- `POST /submit` - Expects form data with `name` and email fields (application/x-www-form-urlencoded)
  - On success: Returns a confirmation page with the submitted name and email
  - On failure (missing or empty fields): Returns a 400 error with "Invalid form data"
  - If payload exceeds 1 MB: Returns a 413 error with "Request entity too large"

### Example with curl

```bash
curl http://localhost:3000/


curl -X POST -d "name=John%20Doe&email=john%40example.com" http://localhost:3000/submit
```

## Project Structure

- `server.js` - Main server file that creates the HTTP server and routes requests
- `routeHandlers.js` - Contains logic for handling different routes and methods
- `htmlUtils.js` - Contains functions for generating HTML responses
- `README.md` - This file

## Limitations

- Only handles GET and POST methods; other methods return 404
- POST data is limited to application/x-www-form-urlencoded format
- Maximum POST body size is 1 MB
- No support for HTTPS
- No routing for static files (CSS, JS, images)
- No support for cookies or sessions

## Error Handling

The server returns appropriate HTTP status codes and HTML error pages for:
- 400: Bad Request (invalid form data)
- 404: Not Found (undefined routes)
- 413: Payload Too Large (POST data exceeds 1 MB)
- 500: Internal Server Error (unexpected errors)

## Running Tests

Although no specific test framework is set up, you can test the server manually using tools like curl, Postman, or a web browser.

To run the provided test file (if applicable), you would need to set up a testing environment with Vitest. However, note that the provided test file seems to be for a different module (`asyncOperationDemo`) and is not related to this HTTP server.

## License

This project is open source and available under the MIT License.