$(document).ready(
	function()
	{
		//showLoginOnly(false);
		hide_cate();
		auto_show_adminBar();
		showUserMenu();
		show_img_title();
		resize_filter_panel();//过滤面板“类型”项的宽度自适应
		add_post_title_hover();//酷站欣赏文章页面，推荐文章的标题
		add_book_list_hover();
		tag_submit();
		auto_select_tag();//当前选中Tag样式
		ini_login_panel();//登录面板
		slider_action();//幻灯片
		
		setInterval('auto_scroll("#msg_scroll")',5000);//垂直滚动文字
	}

)


$(window).scroll(
	function() 
	{
		if($(".cate_form").css("display")=="block")
		{
			$(".cate_form").css("position","static");
			$("#container").css("margin-top","0");
		}
		minTop=$(document).scrollTop();
		
		if($(".cate_form").css("display")=="block")
			minTop-=72;
			
		if($("#wpadminbar").length>0)
			minTop-=28;
		
		/*筛选面板控制*/
		if($(".filter_content").length>0)
		{
			var filter_panel_height=104;//筛选面板高度
			if(minTop>filter_panel_height)
			{
				$("#filter_panel_fixed").css("left","-242px")
				//$("#filter_panel_fixed").animate({left:"-242px"},"fast");	
			}
			else
			{
				//$("#filter_panel_fixed").animate({left:"-274px"},"fast");	
				$("#filter_panel_fixed").css("left","-274px");	
			}
		}

		/*正文右侧边栏自动悬浮广告*/
		if($("#auto_fload_ad").length>0)
		{
			if(minTop>380)
			{
				$("#auto_fload_ad").css("position","fixed");
				//$("#auto_fload_ad").css("background-color","#4ba6e5");
				
				if($("#wpadminbar").length>0)
					$("#auto_fload_ad").css("top","80px");
				else
					$("#auto_fload_ad").css("top","52px");
			}
			else
			{
				$("#auto_fload_ad").css("position","static");
				//$("#auto_fload_ad").css("background-color","transparent");
			}
		}
		
		/*正文右侧边栏自动悬浮广告
		if($("#post-msg2").length>0)
		{
			if(minTop>380)
			{
				$("#post-msg2").css("position","fixed");
				//$("#auto_fload_ad").css("background-color","#4ba6e5");
				
				if($("#wpadminbar").length>0)
					$("#post-msg2").css("top","80px");
				else
					$("#post-msg2").css("top","52px");
			}
			else
			{
				$("#post-msg2").css("position","static");
				//$("#auto_fload_ad").css("background-color","transparent");
			}
		}*/
	}
)


//滚动悬浮
function position_fixed(_fixedID)
{
	if($("#"+_fixedID).length>0)
	{
		obj_header=document.getElementById("header");
		var minTop=obj_header.offsetTop+obj_header.offsetHeight+10;
		
		var $offset = $('#'+_fixedID).offset();
		//alert($(document).scrollTop()+"_"+$offset.top);
		if($(document).scrollTop()+40>($offset.top)) 
		{
			$('#'+_fixedID).first().css({'position':'fixed','top':minTop+'px','left':$offset.left+'px','z-index':'100'});
		}
		else 
		{
			$('#'+_fixedID).first().css({'position':'relative','top':'0','left':'0'});
		}
	}
}

//同一IP 12小时只显示一次
function showLoginOnly(isClose)
{　
	var isLoginS=$('.login_panel').attr("isLogin");
	var cookieString = new String(document.cookie);
	var cookieHeader = 'boxui_com_login_panel='; 
	var beginPosition = cookieString.indexOf(cookieHeader);
	if(isLoginS=="1" || isClose)
	{
			$(".login_panel").css("display","none");
			var refrushTime = new Date();
		　 　refrushTime.setTime(refrushTime.getTime() + 24*60*60*1000 ) //同一ip设置过期时间，即多长间隔跳出一次
		　  document.cookie = 'boxui_com_login_panel=yes;expires='+ refrushTime.toGMTString();
	}
	else if(isLoginS=="" && beginPosition<0)
		$(".login_panel").css("display","block");
}

function hide_cate()
{
	/*
	if($("#show_status").attr("className")=="show_status_down")
		$("#wrap").css("padding-top","55px");*/
	$("#show_status").click
	(
		function()
		{
			if($("#show_status").attr("className")=="show_status_up")
			{
				$(".cate_form").slideUp(300);
				$("#show_status").attr("className","show_status_down");
				//$("#wrap").css("padding-top","55px");
			}
			else{
					$(".cate_form").slideDown(300);
					minTop_right=$(document).scrollTop();
					if(minTop_right>70) 
					{
						$(".cate_form").css("position","fixed");
					}
					else 
					{
						$(".cate_form").css("position","static");
						//$("#wrap").css("padding-top","15px");
					}
					
						
					$("#show_status").attr("className","show_status_up");
			}
		}
	)
}

function auto_show_adminBar()
{
	/*Add by dream 2013-3-19  解决登录后顶部管理栏挡住网站头部*/
  var adminbar=$($("#wpadminbar"));
  if(adminbar && ($("#wpadminbar").css("display")=="block"))
  {
  	$("#header").css({top:28});
  }
  else
  {
	 $("#header").css({top:0});
  }	
}


function words_deal(_objID,_length) 
{ 
	var _obj=$("#"+_objID);
	var curLength=_obj.val().length; 
	if(curLength>_length) 
	{ 
		var num=_obj.val().substr(0,_length); 
		_obj.val(num); 
		alert("超过最大"+_length+"个字限制，多出的字将被截断！" ); 
	}
	/* 
	else 
	{ 
		var txt_num_id=_objID+"_textNum"
		if(_objID.length>0)
			$("#"+txt_num_id).text(_length-_obj.val().length); 
	} 
	*/
} 

// 获取地址栏的参数数组
function getUrlParams()
{
    var search = window.location.search ; 
    // 写入数据字典
    var tmparray = search.substr(1,search.length).split("&");
    var paramsArray = new Array; 
    if( tmparray != null)
    {
        for(var i = 0;i<tmparray.length;i++)
        {
            var reg = /[=|^==]/;    // 用=进行拆分，但不包括==
            var set1 = tmparray[i].replace(reg,'&');
            var tmpStr2 = set1.split('&');
            var array = new Array ; 
            array[tmpStr2[0]] = tmpStr2[1] ; 
            paramsArray.push(array);
        }
    }
    // 将参数数组进行返回
    return paramsArray ;     
}

// 根据地址栏参数名称获取参数值
function getParamValue(name)
{
    var paramsArray = getUrlParams();
    if(paramsArray != null)
    {
        for(var i = 0 ; i < paramsArray.length ; i ++ )
        {
            for(var  j in paramsArray[i] )
            {
                if( j == name )
                {
                    return paramsArray[i][j] ; 
                }
            }
        }
    }
    return null ; 
}

function showUserMenu()
{
	$('.userNav').children("li:has(ul)").hover(
	function()
	{
		$(this).children("ul").show();
		$('.userNav').css("background-color","#29929");
		$('.userNav li').css("color","#fff");
	},
	function()
	{
		$(this).children("ul").hide();
		$('.userNav').css("background-color","transparent");
		$('.userNav li').css("color","#ccc");
	}
);
}

function show_img_title()
{
	if($(".post-thumbnail .img_title").length>0)
	{
		$(".post-thumbnail").hover(
			function()		
			{
				$(this).children(".img_title").slideDown('fast');
			},
			function()
			{
				$(this).children(".img_title").slideUp();
			}
		);
		/*
		$(".post-thumbnail .img_title").click(
			function()
			{
				window.open($(this).parent("div").children("a").attr("href"),"_blank");
			}
		)*/	
	}
}

function add_post_title_hover()
{
	$(".same_cat_posts_img").hover(
		function()
		{
			$(this).find('.title').slideDown('fast');
		},
		function()
		{
			$(this).find('.title').slideUp('fast');
		}
	
	)
}

function auto_select_tag()
{
	var urlarg=new getarg();
	$(".filter_content li").each
	(
		function()
		{
			var cls=$(this).attr("class");
			var cls_p=cls.indexOf("_");
			var cls_id;
			if(cls_p>=0)	cls_id=cls.substr(cls_p+1);
			
			if(cls_id==urlarg.type || cls_id==urlarg.color ||cls_id==urlarg.style)
				$(this).addClass('selected');
			else
				$(this).removeClass("selected");
				
			if(!urlarg.type && cls_id=="all-t")
				$(this).addClass('selected');
				
			if(!urlarg.style && cls_id=="all-s")
				$(this).addClass('selected');
				
			if(!urlarg.color && cls_id=="all-c")
				$(this).addClass('selected');
		}
	)	
}

function getarg()
{
	var url = unescape(window.location.href);
	var allargs = url.split("?")[1];
	if(allargs)
	{
		var args = allargs.split("&");
		for(var i=0; i<args.length; i++)
		{
			var arg = args[i].split("=");
			eval('this.'+arg[0]+'="'+arg[1]+'";');
		}
	}
} 


/*悬浮筛选面板*/
function show_filter_panel()
{
	
	if($("#filter_panel_fixed").css("left")=="-242px")
	{
		$("#filter_panel_fixed").animate({left:"0"},"fast");
		$("#filter_panel_fixed .filter_btn").html("&lt;<br />筛选");	
	}	
	else
	{
		$("#filter_panel_fixed").animate({left:"-242px"},"fast");	
		$("#filter_panel_fixed .filter_btn").html("&gt;<br />筛选");	
	}
}

function tag_submit()
{
	$('.filter_content ul').children("li").click
	(
		function()
		{		
			var tag_id=$(this).attr("class");
			
			if(tag_id.indexOf("selected") >= 0 )
				return;
				
			var default_url=location.href;
			

			if(tag_id.indexOf("type") >= 0 )
			{
				tag_id=tag_id.substr(5);
				if(default_url.indexOf("type") >= 0 )
				{
					default_url=replaceParamVal("type",tag_id);
				}
				else
				{
					if(default_url.indexOf("?") >= 0 )
						default_url+='&type='+tag_id;
					else
						default_url+='?type='+tag_id;
				}
			}
			else if(tag_id.indexOf("style") >= 0 )
			{
				tag_id=tag_id.substr(6);
				if(default_url.indexOf("style") >= 0 )
				{
					default_url=replaceParamVal("style",tag_id);
				}
				else
				{
					if(default_url.indexOf("?") >= 0 )
						default_url+='&style='+tag_id;
					else
						default_url+='?style='+tag_id;
				}
					
			}
			else if(tag_id.indexOf("color") >= 0 )
			{
				tag_id=tag_id.substr(6);
				
				if(default_url.indexOf("color") >= 0 )
				{
					default_url=replaceParamVal("color",tag_id);
				}
				else
				{
					if(default_url.indexOf("?") >= 0 )
						default_url+='&color='+tag_id;
					else
						default_url+='?color='+tag_id;
				}
					
			}
			
			location.href=default_url;
		}
	
	)
}

//替换指定传入参数的值,paramName为参数,replaceWith为新值
function replaceParamVal(paramName,replaceWith) 
{
     var oUrl = this.location.href.toString();
     var re=eval('/('+ paramName+'=)([^&]*)/gi');
     var nUrl = oUrl.replace(re,paramName+'='+replaceWith);
     return nUrl;
}

//幻灯片
function slider_action()
{
	if( $('.banner').length>0)
	{
		var unslider = $('.banner').unslider
		({
			speed: 500,               //  滚动速度
			delay: 5000,              //  动画延迟
			complete: function() {$('.banner_info').animate({top:"400px"},"fast");},  //  动画完成的回调函数
			keys: true,               //  启动键盘导航
			dots: false,               //  显示点导航
			fluid: true              //  支持响应式设计
		});
		$('.unslider-arrow').click(function() 
		{
			var fn = this.className.split(' ')[1];
			//  Either do unslider.data('unslider').next() or .prev() depending on the className
			$('.banner_info').animate({top:"400px"},"fast",function(){unslider.data('unslider')[fn]();});
		});
		
		$('.banner').hover
		(
			function()
			{
				$('.unslider-arrow').css("display","block");	
				$('.banner_info').animate({top:"320px"},"fast");
			},
			function()
			{
				$('.unslider-arrow').css("display","none");	
				$('.banner_info').animate({top:"400px"},"fast");
			}
		)	
	}
}


//垂直滚动文字
function auto_scroll(obj)
{ 
	if($(obj).length>0)
	{
		$(obj).find("ul:first").animate({ 
		marginTop:"-25px" 
		},"slow",function(){ 
		$(this).css({marginTop:"0px"}).find("li:first").appendTo(this); 
		}); 
	}
} 

//过滤面板“类型”项的宽度自适应
function resize_filter_panel()
{
	if($("#filter_panel").length>0)
	{
		var other_width=652;//“颜色”，“类别”项的宽度
		$("#filter_panel .type").width($("#filter_panel .filter_content").width()-other_width);
	}
}

//书本页面
function add_book_list_hover()
{
	$(".book_single").hover(
	function()
	{
		$(this).css("width","380px");
		var currentHover=$(this);
		$(this).siblings().each(function() {
			if($(this).index()!=currentHover.index())
				$(this).css("width","180px");
		});
	}
	)
}


//登录面板
function ini_login_panel()
{
	var hideLoginPopup = function() {
        if (!$("#login-content").is(".hidden")) {
            $("#login-trigger").removeClass("active");
            $("#login-content").addClass("hidden")
        }
    };
    var hideRegPopup = function() {
        if ($("#index_register").is(".unfold")) {
            $("#index_register").removeClass("unfold").addClass("fold")
        }
    };
    $("#login-trigger").click(function() {
        $("#login-trigger").toggleClass("active");
        if ($("#login-content").hasClass("hidden")) {
            $("#login-content").removeClass("hidden");
            $("#log").focus()
        } else {
            $("#login-content").addClass("hidden");
            $("#log").blur()
        };
        return false;
    });
    $("body").click(function() {
        hideLoginPopup()
    });
    $('#login-content,#login-content input').click(function(e) {
        e.stopPropagation()
    })	
}
