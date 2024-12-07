import express from 'express';  
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from '@apollo/server';
const port = Number(process.env.PORT) || 8000;

const app = express();


async function init(){
  app.use(express.json());


  //create graphql server
  const gqlServer= new ApolloServer({
    typeDefs:  `
    type Query {
      hello: String
      say(name: String): String
    }
    `, 
    resolvers: {   //query and motation resolver 
      Query: {
        hello: () => ` Hey there, I am a graphql server`,
        say: (_, {name}: {name: string }) => `Hello ${name} , How are you dear?`
      }
    }   
  })

  await gqlServer.start();



  app.get("/", (req, res) => {
    res.json({ message: "api is wroking..." });
  });

  app.use("/graphql", expressMiddleware(gqlServer))
}


init();






app.listen(port,()=>{
    console.log(`server is listening this port ${port}`)
})