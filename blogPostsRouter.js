const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const { BlogPosts } = require('./models');

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const { title, content, author, publishDate } = req.body;
    const item = BlogPosts.create(title, content, author, publishDate);
    return res.status(201).json(item);
});

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = (
            `Request path id (${req.params.id}) and request body id `
                `(${req.body.id}) must match`);
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating blog post with id \`${req.params.id}\``);
    const { id, title, content, author, publishDate } = req.body;   
    const updatedItem = BlogPosts.update({
        id,
        title,
        content,
        author,
        publishDate
    });
    res.status(204).end();
})

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
})

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post with id of ${req.params.id}`);
    res.status(204).end();
})

module.exports = router;