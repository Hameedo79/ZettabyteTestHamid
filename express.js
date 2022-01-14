const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const MONGODB_URI = `mongodb+srv://hamid:hamid@cluster0.tveh4.mongodb.net/article?retryWrites=true&w=majority`;

const app = express();


app.use(bodyParser.json());



app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}));

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);

    })
    .catch(err => {
        console.log(err);
        throw err;
    });


