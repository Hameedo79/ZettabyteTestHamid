const Article = require('../models/article');
const Comment = require('../models/comment');
const validator = require('validator');

module.exports = {
    createArticle: async function ({ articleInput }, req) {
        const existingArticle = await Article.findOne({ title: articleInput.title });
        
        if (existingArticle) {
            const error = new Error('Article already exists');
            throw error;
        }

        const article = new Article({
            title: articleInput.title,
            text: articleInput.text
        });

        const createdArticle = await article.save();

        return { ...createdArticle._doc, _id: createdArticle._id.toString(), createdAt: createdArticle.createdAt.toISOString(), updatedAt: createdArticle.updatedAt.toISOString() };
    },

    articles: async function ({ page }, req) {
        if (!page) {
            page = 1;
        }

        const perPage = 2;
        const totalArticles = Article.find().countDocuments();
        const articles = await Article.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        return {
            articles: articles.map(p => {
                return { ...p._doc, _id: p._id.toString() }
            }), totalArticles: totalArticles
        };
    },
    updateArticle: async function ({ id, articleInput }, req) {
        const article = await Article.findById(id);

        if (!article) {
            const error = new Error('No article found');
            error.code = 404;
            throw error;
        }

        article.title = articleInput.title;
        article.text = articleInput.text;

        const updatedArticle = await article.save();
        return { ...updatedArticle._doc, _id: updatedArticle._id.toString(), createdAt: updatedArticle.createdAt.toISOString(), updatedAt: updatedArticle.updatedAt.toISOString() };
    },
    deleteArticle: async function ({ id }, req) {
        const article = await Article.findById(id);

        if (!article) {
            const error = new Error("No article found");
            error.code = 404;
            throw error;
        }

        await Article.findByIdAndRemove(id);
        return true
    },
    createComment: async function ({ commentInput }, req) {

        
        if (validator.isEmpty(commentInput.text)) {
            throw new Error('Comment cannot be empty');
        }

        const article = await Article.findById(commentInput.articleId);
        
        if(!article) {
            throw new Error('Article not found');
        }

        const comment = new Comment({
            articleId: commentInput.articleId,
            text: commentInput.text
        });

        const createdComment = await comment.save();

        article.comments.push(createdComment);
        await article.save();

        return { ...createdComment._doc, _id: createdComment._id.toString(), createdAt: createdComment.createdAt.toISOString(), updatedAt: createdComment.updatedAt.toISOString() };
    },
    updateComment: async function ({ id, commentInput }, req) {
        const comment = await Comment.findById(id);
        const errors = [];
        if (!comment) {
            const error = new Error('No comment found');
            error.code = 404;
            throw error;
        }

        if (validator.isEmpty(commentInput.text)) {
            errors.push('Comment cannot be empty');
        }

        if (errors.length > 0) {
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        comment.text = commentInput.text;

        const updatedComment = await comment.save();
        return true;
    },
    deleteComment: async function ({ id,commentInput }, req) {
        const comment = await Comment.findById(id);

        if (!comment) {
            const error = new Error("No comment found");
            error.code = 404;
            throw error;
        }

        const article = await Article.findById(commentInput.articleId);
        
        if(!article) {
            throw new Error('Article not found');
        }

        await Comment.findByIdAndRemove(id);
        article.comments.pull(id);
        await article.save();


        return true
    },
}