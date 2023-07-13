const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db.js');
const port = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes.js');
const path = require('path');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Server is ready'));
}

// implementation of custom error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}`));
