import http from 'http';

// ========================================
// TYPE DEFINITIONS
// ========================================

// Q: Why limit to these specific strings instead of just 'string'?
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Q: What does this function signature mean?
type RouteHandler = (
    req: http.IncomingMessage,
    res: http.ServerResponse
) => void | Promise<void>;

// Q: What information does a route need to store?
interface Route {
    method: HttpMethod;    // Which HTTP method? (GET, POST, etc.)
    path: string;          // Original pattern (/users/:id)
    handler: RouteHandler; // Function to call when matched
    regex: RegExp;
    paramNames: string[];
}

// ========================================
// EXTEND REQUEST TYPE
// ========================================

// Q: Why extend IncomingMessage?
// A: We want to add a 'params' property to store extracted route parameters

declare module 'http' {
    interface IncomingMessage {
        params?: Record<string, string>;  // { id: '123', postId: '456' }
    }
}

// ========================================
// ROUTER CLASS
// ========================================

export class Router {
    private routes: Route[] = [];

    // ========================================
    // PUBLIC API - Users call these methods
    // ========================================


    // Q: Why do all these methods call the same private method?
    get(path: string, handler: RouteHandler): void {
        this.addRoute('GET', path, handler);
    }
    post(path: string, handler: RouteHandler): void {
        this.addRoute('POST', path, handler);
    }

    put(path: string, handler: RouteHandler): void {
        this.addRoute('PUT', path, handler);
    }

    delete(path: string, handler: RouteHandler): void {
        this.addRoute('DELETE', path, handler);
    }

    // ========================================
    // HANDLE INCOMING REQUESTS
    // ========================================

    async handle(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
        // ========================================
        // EXTRACT METHOD AND PATH (Type-safe)
        // ========================================
        
        const method = req.method as HttpMethod;
        const url = req.url || '/';
        
        // Q: Why guard against undefined?
        // A: TypeScript doesn't know split()[0] always has a value
        const pathParts = url.split('?');
        const path = pathParts[0] || '/';  // ✅ Now path is always a string
        
        console.log(`\n🔍 Incoming: ${method} ${path}`);
        
        // ========================================
        // Find matching route
        // ========================================
        
        for (const route of this.routes) {
            if (route.method === method && route.regex.test(path)) {  // ✅ No error now
                console.log(`✅ Matched: ${route.method} ${route.path}`);
                
                // ========================================
                // EXTRACT PARAMETERS
                // ========================================
                
                const match = path.match(route.regex);  // ✅ No error now
                
                if (match) {
                    const params: Record<string, string> = {};
                    
                    route.paramNames.forEach((paramName, index) => {
                        const value = match[index + 1];
                        if (value) {
                            params[paramName] = value;
                        }
                    });
                    
                    req.params = params;
                    console.log(`   Params:`, params);
                }
                
                // ========================================
                // CALL HANDLER
                // ========================================
                
                await route.handler(req, res);
                return;
            }
        }
        
        // ========================================
        // No route matched - 404
        // ========================================
        
        console.log(`❌ No route matched`);
        
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            error: 'Not Found',
            message: `Cannot ${method} ${path}`
        }));
    }

    // ========================================
    // PRIVATE HELPER - Does the actual work
    // ========================================

    // Q: Why is this method private?
    private addRoute(method: HttpMethod, path: string, handler: RouteHandler): void {

        // ========================================
        // STEP 1: Find all parameter names
        // ========================================

        const paramNames: string[] = [];

        // matchAll returns an iterator of RegExpMatchArray
        const paramMatches = path.matchAll(/:(\w+)/g);

        for (const match of paramMatches) {
            // Q: Why check match[1]?
            // A: TypeScript knows match exists (we're iterating),
            //    but match[1] could be undefined if the regex has no capture group
            if (match[1]) {
                paramNames.push(match[1]);
            }
        }

        // ========================================
        // STEP 2: Convert path pattern to regex
        // ========================================

        // Replace :paramName with ([^/]+)
        let regexPattern = path.replace(/:(\w+)/g, '([^/]+)');
        
        // Add anchors
        regexPattern = `^${regexPattern}$`;
        
        // Create RegExp
        const regex = new RegExp(regexPattern);
        
        console.log(`📝 Registering ${method} ${path}`);
        console.log(`   Parameters: [${paramNames.join(', ') || 'none'}]`);
        console.log(`   Regex: ${regex}`);
        console.log('');

        // ========================================
        // STEP 3: Store the route
        // ========================================
        
        const route: Route = {
            method,
            path,
            handler,
            regex,
            paramNames
        };
        
        this.routes.push(route);
    }
}


