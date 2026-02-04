// DAY 3 - Request Lifecycle
// Goal: Parse request bodies, query strings, and handle streams

import http from 'http';

// YOUR MISSION:
// 1. Read request body from POST/PUT requests (using streams!)
// 2. Parse JSON from request body
// 3. Parse query strings (?name=value&age=30)
// 4. Handle different Content-Types

// REQUIREMENTS:
// POST /users + JSON body → Create user with that data
// PUT  /users/:id + JSON body → Update user with that data
// GET  /users?page=2&limit=10 → Parse query parameters
// Handle errors: invalid JSON, missing fields, etc.

// START CODING BELOW THIS LINE
// ========================================

function parseQueryString(url: string): Record<string, string> {
    const queryStart = url.indexOf('?');
    if(queryStart === -1) return {};

    const queryString = url.slice(queryStart + 1);
    const params : Record<string, string> = {};

    queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value || '');
    });

    return params;

}


//HELPER FUNCTION FOR REQUEST BODY
function readBody(req: http.IncomingMessage): Promise<string> {
    return new Promise((resolve, reject)=>{
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', ()=> resolve(body));
        req.on('error', (err)=>  reject(err))
    });

}

const server = http.createServer(async(req, res) =>{
    const url = req.url || '';

    //GET /user?page=2&limit=10
    if(url.startsWith('/users') && req.method === 'GET'){
        const queryParam =  parseQueryString(url);
        res.writeHead(200, {'content-Type': 'application/json'})
        res.end(JSON.stringify({
            message: 'USERS RETRIEVED',
            queryParams: queryParam,
            page: queryParam.page || '1',
            limit: queryParam.limit || '10'

        }));
        return
    }

    //POST /user
    if(url === '/users' && req.method === 'POST'){
        try{
            const contentType = req.headers['content-type'];
            if(contentType !== 'application/json'){
                res.writeHead(415, {'content-Type': 'application/json'});
                res.end(JSON.stringify({ error: 'content-Type must be application/json'}));
                return;
            }

            const body = await readBody(req);
            const data = JSON.parse(body);

            //validate required fields 
            if(!data.name || !data.email){
                res.writeHead(400, {'content-Type': 'application/json'});
                res.end(JSON.stringify({error: 'Missing required fields: name, email'}));
                return;
            }

            res.writeHead(201, {'content-Type': 'application/json'});
            res.end(JSON.stringify({
                message: 'User Created Successfully',
                user: data
            }));
        } catch (error){
            res.writeHead(400, {'content-Type': 'application/json'});
            res.end(JSON.stringify({error: 'invalid JSON'}))
        }
        return;
    }
    //PUT /users/:id
    if(url.startsWith('/users/') && req.method === 'PUT'){
        try{
            const id = url.split('/')[2];
            if(!id){
                res.writeHead(400, {'content-Type': 'application/json'});
                res.end(JSON.stringify({error: 'content-Type must be application/json'}));
                return;
            }

            const body = await readBody(req);
            const data = JSON.parse(body);

            res.writeHead(200, {'content-Type': 'application/json'});
            res.end(JSON.stringify({
                message:   `User ${id} updated successfully`,
                user: {id, ...data}
            }))
        }catch(error){
            res.writeHead(400, { 'content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
        return;

    }
    // 404 Not Found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


