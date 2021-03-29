const graphql = require('graphql');
const Funder = require('../models/funder')
const Deal = require('../models/deal')

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and describes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data

const FunderType = new GraphQLObjectType({
    name: 'Funders',
    //We are wrapping fields in the function as we dont want to execute this ultil
    //everything is inilized. For example below code will throw error AuthorType not
    //found if not wrapped in a function
    fields: () => ({
        _id: { type: GraphQLID  },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        repName: { type: GraphQLString },
        groupId: { type: GraphQLString }
    })
});

const DealType = new GraphQLObjectType({
    name: 'Deals',
    //We are wrapping fields in the function as we dont want to execute this ultil
    //everything is inilized. For example below code will throw error AuthorType not
    //found if not wrapped in a function
    fields: () => ({
        _id: { type: GraphQLID  },
        userName: { type: GraphQLString },
        stage: { type: GraphQLString },
    })
});
//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular 
//book or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // funder: {
        //     type: FunderType,
        //     //argument passed by the user while making the query
        //     args: { _id: { type: GraphQLID } },
        //     resolve(parent, args) {
        //         //Here we define how to get data from database source
        //
        //         //this will return the book with id passed in argument
        //         //by the user
        //         return Funder.findById(args._id);
        //     }
        // },
        // funders:{
        //     type: new GraphQLList(FunderType),
        //     resolve(parent, args) {
        //         return Funder.find({});
        //     }
        // },
        deal: {
            type: DealType,
            //argument passed by the user while making the query
            args: { _id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument
                //by the user
                return Deal.findById(args._id);
            }
        },
        deals: {
            type: new GraphQLList(DealType),
            resolve(parent, args) {
                return Deal.find({});
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery
});