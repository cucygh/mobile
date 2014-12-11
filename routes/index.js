
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.section = function(req, res){
  res.render('section.html', { title: 'Express' });
};

