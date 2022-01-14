const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Comment {
        _id: ID!
        text: String!
        createdAt: String!
        updatedAt: String!
    }

    type Article {
        _id: ID!
        title: String!
        text: String!
        createdAt: String!
        updatedAt: String!
        comments: [Comment!]!
    }

    
    input ArticleInputData {
        title: String!
        text: String!
    }

    input CommentInputData {
        articleId: String!
        text: String!
    }
    
    input CommentDeleteData {
        articleId: String!
    }

    type ArticleData {
        articles : [Article!]!
        totalArticles: Int!
    }

    type RootQuery{
        hello: String
        articles(page: Int): ArticleData!
    }

    type RootMutation {
        createArticle(articleInput: ArticleInputData): Article!
        updateArticle(id: ID!, articleInput: ArticleInputData): Article!
        deleteArticle(id: ID!): Boolean
        createComment(commentInput: CommentInputData): Comment!
        updateComment(id: ID!, commentInput: CommentInputData): Boolean
        deleteComment(id: ID!,commentInput:CommentDeleteData): Boolean
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);