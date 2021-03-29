const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const cors = require ('cors')

const mongoose = require('mongoose');

const Funder = require('./models/funder')
const Deal = require('./models/deal')



app.use(cors())

mongoose.connect("mongodb://localhost:27017/web-db-v3", {
    "auth": { "authSource": "admin" },
    "user": "mca-platform-user",
    "pass": "sqjQrcuSGf59vhHS"
}, function(err, client) {
    if(err) {
        console.log(err)
    }

    // client.db.listCollections().toArray(function(err, collections) {
    //     collections.forEach(function (collection){
    //         console.log(collection);
    //     })
    //
    // });

    // console.log(client.db.listCollections("Funders"))


});


mongoose.connection.once('open', () => {
    console.log('conneсted to database');
});



//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 
app.use('/graphql', graphqlHTTP({
    //Directing express-graphql to use this schema to map out the graph 
    schema,
    //Directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql:true
}));

app.get('/', async (req, res) => {

    Funder.find({}, function(err, users) {

        res.send(users);
    });
});

app.get('/deals', async (req, res) => {

    Deal.find({}, function(err, users) {

        res.send(users);
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
}); 