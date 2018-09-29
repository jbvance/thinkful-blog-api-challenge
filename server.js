const express = require('express');
const app = express();
const blogPostsRouter = require('./blogPostsRouter');
const {BlogPosts} = require('./models');

app.use('/blog-posts', blogPostsRouter);

// create some posts
BlogPosts.create('Javascript fundamentals', 'Javascript Fundamentals blog post content here', 'Jason Vance', Date.now());
BlogPosts.create('New Blog Post', 'new blog post content here', 'John Doe', Date.now());


app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});



