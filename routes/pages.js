
/*
 * GET views tpl html.
 */

exports.ssq = function(req, res){
  res.render('pages/ssq.html', { title: 'ssq' });
};

exports.pay = function(req, res){
  res.render('pages/pay.html', { title: 'pay' });
};

