import http from 'http';
import { Router } from './Router';

// ========================================
// CREATE ROUTER INSTANCE
// ========================================

const router = new Router();

// ========================================
// REGISTER ROUTES
// ========================================

console.log('🚀 Registering routes...\n');

router.get('/users', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
        message: 'Get all users',
        params: req.params || {}
    }));
});

router.post('/users', (req, res) => {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
        message: 'Create user',
        params: req.params || {}
    }));
});

router.get('/users/:id', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
        message: `Get user ${req.params?.id}`,
        params: req.params || {}
    }));
});

router.get('/products/:productId/reviews/:reviewId', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
        message: 'Get review',
        params: req.params || {}
    }));
});

console.log('\n✅ All routes registered!\n');

// ========================================
// CREATE HTTP SERVER
// ========================================

const server = http.createServer(async (req, res) => {
    // Q: What happens here?
    // A: Every request goes through the router
    await router.handle(req, res);
});

// ========================================
// START SERVER
// ========================================

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`\nTry these requests:`);
    console.log(`  GET  http://localhost:${PORT}/users`);
    console.log(`  GET  http://localhost:${PORT}/users/123`);
    console.log(`  GET  http://localhost:${PORT}/products/abc/reviews/xyz`);
    console.log(`  GET  http://localhost:${PORT}/invalid (404 test)\n`);
});