const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('.resolvers');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect('mongodb://localhost:27017/booksearch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
