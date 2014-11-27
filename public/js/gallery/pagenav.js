/**
 * @ignore  =====================================================================================
 * @fileoverview 分页扩展
 * @author  yinguohui@360.cn
 * @version 1.0.0
 * @ignore  created in 2014-11-21
 * @ignore  depend Library Zepto
 * @ignore  =====================================================================================
 */

(function (window, undefined) {
	var $ = window.Zepto,
	Q = window.Q || {};

	/**
	 * 扩展分页插件
	 * @param num {Number} 		当前页
	 * @param max {Number}		总页数
	 * @param w   {Number}		页面左右宽度，如w=5，则最多显示10条页码
	 * @param callback   {Function}		回调函数
	 * @ignore created
	 * @return result {Array}
	 */
	$.extend($.fn, {
		pagenav : function (num, max, w, callback, tpl) {
			var s = [],
			num = num * 1,
			w = w * 1,
			max = max * 1,
			up,
			down;
			up = Math.min(max - num, w) + num;
			down = Math.max(num - w, 1);
			for (var i = down; i <= up; i++) {
				s.push(i);
			}
			/*补全长度*/
			if (s.length < w * 2 + 1) {
				if (down == 1) {
					for (var i = up + 1, j = 1; j <= Math.min(w - num + 1, max - up); j++, i++) {
						s.push(i);
					}
				} else {
					for (var i = down - 1, j = 1; j <= Math.min(w - max + num, num - w - 1); j++, i--) {
						s.unshift(i);
					}
				}
			}
			/*上一页，下一页生成函数*/
			if (num - 1 >= 1) {
				s.unshift('«');
			}
			if (num + 1 <= max) {
				s.push('»');
			}
			/*页码的二次处理,一般都是模板处理*/
			if (typeof callback == "function") {
				callback.call(this, s);
				return s.join(''); //如果有模板处理，返回html
			}
			return s; //如果没有模板处理，返回页码数组
		}
	});
})(window);
