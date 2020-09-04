require('dotenv').config()
const mongoose = require('mongoose')
const authenticate = require('@middleware/authenticate');
const cleanCache = require('@middleware/clearCache')
const Blog = mongoose.model('Blog')

module.exports = app => {
  app.get('/api/blogs/:id', authenticate, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    })
    res.send(blog)
  })

  app.get('/api/blogs', authenticate, async (req, res) => {
    //checks if we have cached data in redis related to the query
    // const cachedBlogs = await client.get(req.user.id)
    // console.log('cachedBlogs', cachedBlogs)

    //if cachedblog contians a list of blog then:

    // if (cachedBlogs) {
    //   console.log('req.user.id', req.user.id)
    //   console.log('SERVING FROM CACHE', JSON.parse(cachedBlogs))
    //   return res.send(JSON.parse(cachedBlogs))
    // }

    // if we do not have any cached blog
    const blogs = await Blog.find({ _user: req.user.id })
      .cache({
        key: req.user.id
      })

    // console.log('SERVING FROM MONGODB', cachedBlogs)
    res.send(blogs)

    // saves blog to cache
    // const savedToCache = client.set(req.user.id, JSON.stringify(blogs))
    // console.log('savedToCache', savedToCache)
  })

  app.post('/api/blogs', authenticate, cleanCache, async (req, res) => {
    const { title, content } = req.body

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    })
    try {
      await blog.save()
      res.send(blog)
    } catch (err) {
      res.send(400, err)
    }
  })
}

/*
to store data in redis you have to store as either number or 'string'. we cann't store plain javascript object.
for us to be able to store a plain javascript object we have to json.stringify it before been able to store it and
then json.parse it to get the object
*/
