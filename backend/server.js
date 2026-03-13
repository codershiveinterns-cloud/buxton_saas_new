require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');

const app = express();

// Connect Database
connectDB();

const path = require('path');

// Init Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Enable CORS
app.use(cors({
    origin: "https://buxton-saas-new.vercel.app",
    credentials: true
}));
// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000, // Limit each IP to 10000 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api/', limiter);

// Define Routes
app.get('/', (req, res) => {
    res.send('BUXTON Backend API Running');
});
app.get('/api/health', (req, res) => {
    res.json({ status: "Backend connected successfully" });
});
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/statsRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/tasks', require('./routes/taskMessageRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('---');
    console.log('Server running successfully');
    console.log(`Backend API: http://localhost:${PORT}`);
    console.log('Frontend App: http://localhost:5173');
});
