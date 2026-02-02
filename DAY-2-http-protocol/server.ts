// DAY 2 - HTTP Protocol Deep Dive
// Goal: Handle different HTTP methods and return appropriate status codes

import http from 'http';

// YOUR MISSION:
// 1. Handle different HTTP methods (GET, POST, PUT, DELETE)
// 2. Return different status codes based on the request
// 3. Handle different routes (/users, /about, /missing)
// 4. Set custom response headers
// 5. Log request method, URL, and headers

// REQUIREMENTS:
// GET  /users     → 200 OK + "List of users"
// POST /users     → 201 Created + "User created"
// PUT  /users/123 → 200 OK + "User 123 updated"
// DELETE /users/123 → 204 No Content + empty body
// GET  /about     → 200 OK + "About page"
// ANY  /notfound  → 404 Not Found + "Page not found"

// HINTS:
// - Check req.method to see GET, POST, PUT, DELETE
// - Check req.url to see the path
// - Use res.writeHead(statusCode, headers) to set status and headers
// - Use res.end(body) to send response

// START CODING BELOW THIS LINE
// ========================================

interface Users {
    id: number;
    name: string;
    email?: string
};



const server = http.createServer((req, res) => {

    // Log the request
    console.log(`${req.method} ${req.url}`);


    const users: Users[] = [
        { id: 1, name: "john", email: "john@gmail.com" },
        { id: 2, name: "matthew", email: "matthew@gmail.com" }
    ];


    if (req.url === '/users') {
        switch (req.method) {
            case 'GET':
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('List of users');
                break;
            case 'POST':
                res.writeHead(201, { 'Content-Type': 'text/plain' });
                res.end('User created');
                break;
            default:
                res.writeHead(405, { 'Content-Type': 'text/plain' });
                res.end('Method not allowed');

        }

    }

    else if (req.url?.startsWith('/users/')) {
        const id = req.url.split('/')[2];
        switch (req.method) {
            case 'PUT':
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`User ${id} updated`);
                break;
            case 'DELETE':
                res.writeHead(204); // No Content-Type for 204
                res.end(); // Empty body!
                break;
            default:
                res.writeHead(405, { 'Content-Type': 'text/plain' });
                res.end('Method not allowed');
        }

    }
    // Handle /about route
    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About page');
    }
    // Handle 404 - Not Found
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }

})

server.listen(3000, () => console.log('Server listening on port 3000'));


