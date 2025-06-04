// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import postRoutes from './routes/posts.js';
// import PostMessage from './models/postMessage.js';
// const app = express();

// app.use(cors());
// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// app.use('/posts', postRoutes);
// const CONNECTION_URL =
//   'mongodb+srv://kiiriitoo129:aaavbb121213@cluster0.ypetl7o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// const PORT = process.env.PORT || 5000;
// mongoose
//   .connect(CONNECTION_URL)
//   .then(() => app.listen(PORT, console.log(`Server running on port: ${PORT}`)))
//   .catch((error) => console.log(error));
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require('./db/dbConnect');
const dbLoad = require('./db/dbLoad');
const UserRouter = require('./routes/UserRouter');
const PhotoRouter = require('./routes/PhotoRouter');
const AdminRouter = require('./routes/admin');
// const CommentRouter = require('./routes/CommentRouter');

dbConnect();
// dbLoad();
app.use(cors());
app.use(express.json());
app.use('/users', UserRouter);
app.use('/photos', PhotoRouter);
app.use('/admin', AdminRouter);

app.listen(8081, () => {
  console.log('server listening on port 8081');
});
