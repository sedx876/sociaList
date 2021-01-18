

exports.getPosts = (req, res) => {
	res.json({
    post: [
      {title: 'First Post'},
      {title: 'Second Post'}
    ]
  })
}