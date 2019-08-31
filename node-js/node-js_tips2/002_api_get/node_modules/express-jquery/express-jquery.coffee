
module.exports = (url = '/jquery.js')->
  (req, res, next)->
    if req.url is url
      res.sendfile __dirname + '/vendor/jquery-1.8.3.min.js'
    else
      next()
