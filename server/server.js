const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// import user defined files
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// set up express server
const PORT = process.env.PORT || 3001;
const app = express();

// create a new instance of Apollo server and pass in our schema data and context
async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware // Ensure that your authentication middleware is correctly defined
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Serve static assets from the client build folder
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Ensure that all requests not handled by Express return the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

  // Start the server
  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on port ${PORT}`));
  });
}

startApolloServer(typeDefs, resolvers);