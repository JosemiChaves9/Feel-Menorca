require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import { resolvers } from './gql/resolvers';
import { typeDefs } from './gql/typeDefs';
import { DbService } from './services/DbService';
import { tokenValidation } from './utils/tokenValidation';

(async () => {
  await DbService.connect().then(
    () => {
      const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
          const authHeader = req.headers.authorization || '';
          const token = authHeader.split(' ')[1];
          const validateToken = await tokenValidation(token);
          if (validateToken) {
            const user = await DbService.getUserFromToken(token);
            return { user };
          } else {
            return {};
          }
        },
      });
      server.listen({ port: process.env.PORT || 4000 }).then(
        ({ url }) => {
          console.log(`🚀  Server ready at ${url}`);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    (err) => {
      console.log(err);
    }
  );
})();
