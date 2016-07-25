
/* 
* @Author: 李光耀
* @Last Modified time: 2016-07-06 15:43:46
*/

$(function(){

	AJAX() //请求并处理ajax数据
    UE(window); // 交互


	function AJAX(){

		/**
		 * [GetAjaxAndFn description]
		 * @param {[type]}   target 	[请求部位]
		 * @param {[type]}   url    	[请求地址]
		 * @param {Function} callback   [处理函数]
		 */
	    function GetAjaxAndFn(url,callback){
	        this.url = url;
	        var xhr = new XMLHttpRequest;  
	        xhr.open('get', this.url);
	        xhr.send(null);            
	        xhr.onreadystatechange = function () {
	            if(xhr.readyState == 4 && xhr.status == 200) {
	                // 将服务端返回的JSON数据解析
	                var data = JSON.parse(xhr.responseText);
	                callback(data);
	                     
	            }
	        }
	    }
 
	    //主banner   立即 执行
	    var bannerFn = new GetAjaxAndFn('json/indexJson/banner.json',function(data){
	    	var str = '<ul class="banner">'
	    	for (var i = 0; i < data.length; i++) {
	    		str += "<li color=" + data[i].color + ">" +
			    			"<a href=" + data[i].href + ">" +
			    				"<img src=" + data[i].src + " alt=" + data[i].alt + " />" +
							"</a>" +
						"</li>"
	    	};
	    	str += "</ul>"

	        var ol = '<ol class="bannerIndex"><li class="current">1</li>';
	        for (var i = 1; i < data.length; i++) {
	        	ol += '<li>' + (i + 1) + '</li>'
	        };
	        ol += '</ol>';

	        $('.bannerarea').html(str + ol)
	        ue.banner()
	    });	

	    //输入框底部热词获取
	    var searchBottomFn = new GetAjaxAndFn('json/indexJson/searchBottom.json',function(data){
	    	     
	    	var str = ''
	    	for (var i = 0; i < data.length; i++) {
	    		if (!!data[i].class) {
	    			str += '<li><a href="' + data[i].href + '" class="' + data[i].class + '">' + data[i].text + '</a></li>'
	    		} else{
	    			str += '<li><a href="' + data[i].href + '">' + data[i].text + '</a></li>'
	    		};
	    	};
	        $('.searchBottom').html(str)

	    })

	    //顶部 全部商品分类 biggest
	    $(".all").on("mouseenter",allAjax)
    	function allAjax(){
		    var bannerFn = new GetAjaxAndFn('json/indexJson/biggest.json',function(data){
		    	var str = '';
		    	for (var i = 0; i < data.length - 1; i++) {
					if ((i + 1) % 4 != 0) {
		    			str += 
							"<dl>" +
								"<dt><a href=" + data[i][0].href + ">" + data[i][0].text + "</a><span></span></dt>";
					} else {
		    			str += 
							"<dl class='dl4 dl3'>" +
								"<dt><a href=" + data[i][0].href + ">" + data[i][0].text + "</a><span></span></dt>";
					};	    		

		    		for (var j = 1; j < data[i].length; j++) {
		    			if (j % 4 != 0) {
			    			str +=
								"<dd>" +
									"<a href=" + data[i][j].href + ">" + data[i][j].text + "</a>" +
								"</dd>"
		    			} else{
			    			str +=
								"<dd>" +
									"<a href=" + data[i][j].href + " class='no4'>" + data[i][j].text + "</a>" +
								"</dd>"
		    			};
		    		};
		    		str += "</dl>"
				};
				str += "<dl class='last dl4'>"
				for (var i = 0; i < data[data.length - 1].length; i++) {
					str +=
						'<dd>' +
							'<a href=' + data[data.length - 1][i].href + '>' +
								'<img src=' + data[data.length - 1][i].src + ' alt=' + data[data.length - 1][i].text + '/>' +
								'<p>' + data[data.length - 1][i].text + '</p>' +
							'</a>' +
						'</dd>'			
				};
				str += "</dl>"
		        $('.biggest').html(str);
		    });	

		    $(".all").off("mouseenter",allAjax)
	    }



		//电梯导航请求函数
		function eleNavAjax() {
			var eleNav = new GetAjaxAndFn("json/indexJson/eleNav.json",function(data){
				var str = '<ul class="elevatorNav">'
				for (var i = 0; i < data.length ; i++) {
					str += 
						'<li floor>' + (i + 1) + 'F <span style="background-color:' + data[i].color + '">' + data[i].floor + '</span></li>'
				};
				str += '<li class="toTop"></li></ul>'
				$("body").append(str);
				// eleNav();
			})
		};
		//左侧导航请求ajax
		var leftNav = function(leftNavIndex) {
			var leftNavAjax = new GetAjaxAndFn("json/indexJson/leftNav" + leftNavIndex + ".json",function(data){

				var str = '<div class="typeTop"><ul>';
				//顶部左侧
				for (var href in data[0][0]) {
					str += 
						 '<li><a href="' + href + '">' + data[0][0][href] + '</a></li>'
                        
				};
				//顶部右侧
				for (var href in data[0][1]) {
					str += '<li class="more"><a href="' + href + '">' + data[0][1][href] + '<span></span></a></li></ul></div>'
				};
				//内容函数
				var typeContent = function (lr, index) {
					str += '<div class=' + lr + '>';

					for (var i = 0; i < data[index].length; i++) {
						str += '<dl class="dlArea">';
						var firstDt = true;
						for (var href in data[index][i]){
							if (firstDt) {
								str += 
									'<dt class="title"><span></span><a href="' + href + '">' + data[index][i][href] + '</a></dt>';
								firstDt = false;
							} else {
								str += '<dd><a href="' + href + '">' + data[index][i][href] + '</a></dd>'
							};
						}
						
						str += '</dl>';
					};
					str += '</div>';
				};
				//左侧内容
				typeContent('typeLeft', 1);
				//右侧内容
				typeContent('typeRight', 2);
				//加入页面
				     
				$('.type').eq(leftNavIndex - 1).html(str);
			})
		}
		//侧导航底部滚动商品 
		var navBottom = new GetAjaxAndFn("json/indexJson/navBottom.json",function(data){

			var str = '<div class="h43"><a href="javascript:;">低价来袭</a><a href="javascript:;">新品上市</a><span class="current"></span></div><div class="h240"><ul>';
            for (var i = 0; i < data.length; i++) {
            	if ((i + 1) === 4) {
            		str += '<li class="noBorder">'
            	} else{
            		str += '<li>'
            	}
	            str += '<a href="' + data[i].href + '"><img src="' + data[i].img + '"/><dl><dt><span></span><h6>' + data[i].text + '</h6></dt><dd>￥<h5>' + data[i].sale + '</h5><p>￥' + data[i].price + '</p><h3></h3><h4>' + data[i].dot + '折</h4></dd></dl></a></li>';
            }

            str += '</ul></div></div>';
			$(".navMiddle").html(str);
			ue.navBotFn();
		});
		//深红 导航 最后两个选项
		var navLast = function(last) {
			var navLastAjax = new GetAjaxAndFn("json/indexJson/" + last + ".json",function(data){
				var str = '<a href="' + data[0].href + '">' + data[0].text + '<span></span></a><div class="' + data[0].class + '"><ul>'
					for (var i = 1; i < data.length; i++) {
						str += '<li><a href="' + data[i].href + '"><img src="' + data[i].img + '" alt="" /><h6>' + data[i].title + '</h6><p>' + data[i].text + '</p></a></li>';
					};
				str += '</ul></div>';
				$("#" + last).html(str);
				$("#" + last).find($("div")).show();
			})
		};
		// 三分栏函数
		function banner3GetData(){
			 var banner3Ajax = new GetAjaxAndFn("json/indexJson/banner3.json",function(data){
			 	var str = "";
			 	for (var i = 0; i < 3; i++) {
			 		str += '<li><a href="' + data[i].href + '"><img src="' + data[i].src + '" alt="" /></a></li>';
			 	};
			 	$('.navBottom').html(str);
			 	ue.banner3Fn();
			 })
		};
		//楼层获取数据
		var f1FnBoo = true;
		var floorFn = function(floorIndex){
			// ==========    0顶部 1左侧 2中上 3中下 4右侧    ==============
			var floorAjax = new GetAjaxAndFn("json/indexJson/floor" + floorIndex + ".json",function(data){
				//楼层头部
				var str = '<div class="h50"><h2><p>' + data[0][0].title + '<span></span></p></h2><ul class="h50r">';
				for (var text in data[0][1]) {
					str += '<li><a href="' + data[0][1].text + '">' + text + '</a></li>';
					
				};
				str += '<li><a href="#" class="more"></a></li></ul></div>'
				//楼层内容 判断填充格式
				switch(floorIndex){
					case 1:
						str += '<div class="h388">';
						//侧边
						str += '<a href="' + data[1].href + '" class="' + data[1].class + '"><img src="' + data[1].src + '"/></a>';
						//内容 
						str += '<div class="h372">';
							//中部
							str += '<div class="s25">';
								str += '<ul class="s25T">';
								for (var i = 0; i < data[2].length; i++) {
									str += '<li><a href="' + data[2][i].href + '"><img src="' + data[2][i].src + '" /></a></li>';
								};
								str += '</ul>';
								str += '<ul class="s25B">';
								for (var i = 0; i < data[3].length; i++) {
									str += '<li><a href="' + data[3][i].href + '"><img src="' + data[3][i].src + '" alt="" /></a><p>' + data[3][i].text + '</p><span>' + data[3][i].price + '</span></li>'
								};
								str += '</ul>';
							str += '</div>';
							//右侧
							str += '<div class="sR3">';
								str += '<ul class="w220">';
									for (var i = 0; i < data[4].length; i++) {
										str += '<li><a href="' + data[4][i].href + '">' + data[4][i].text + '</a><img src="' + data[4][i].src + '" alt="" /><h4>' + data[4][i].sale + '</h4><p>' + data[4][i].price + '</p></li>'
									};
								str += '</ul>';
							str += '</div>';
						str += '</div></div>';
						break;
					case 2:
					case 3:
					case 8:
						str += '<div class="h432">';
						//侧边
							str += '<a href="' + data[1].href + '" class="' + data[1].class + '"><img src="' + data[1].src + '"/></a>';
							//内容 
							str += '<div class="h417">';
								//中部
								str += '<div class="s44">';
								for(var j = 0; j < 2;j++){
									str += '<div class="s44T">';
									for (var i = 0; i < data[2].length; i++) {
										str +='<a href="' + data[2 + j][i].href + '"><img src="' + data[2 + j][i].src + '" alt="" /><p>' + data[2 + j][i].title + '</p><h3>' + data[2 + j][i].sale + '<span>' + data[2 + j][i].price + '</span></h3><h4>' + data[2 + j][i].text + '</h4></a>';
									};
									str += '</div>';
								}
								str += '</div>';
								//右侧
								str += '<div class="sR5">';
									str += '<dl><dt><h3>' + data[4][0].title + '</h3></dt>';
									for (var i = 1; i < data[4].length; i++) {
										str += '<dd><a href="' + data[4][i].href + '"><span>' + i + '</span><h6>' + data[4][i].text + '<p>' + data[4][i].price + '</p></h6><img src="' + data[4][i].src + '" /></a></dd>'
									};
								str += '</dl>';
							str += '</div>';
						str += '</div></div>';					
						break;					
					case 4:
					case 5:
					case 6:
					case 7:
						str += '<div class="h458">';
							//侧边
							str += '<a href="' + data[1].href + '" class="' + data[1].class + '"><img src="' + data[1].src + '"/></a>';
							//内容 
							str += '<div class="s34">';
								//中部
								str += '<ul class="s34T">';
								for (var i = 0; i < data[2].length; i++) {
									str += '<li class="' + data[2][i].class + '"><a href="' + data[2][i].href + '"><img src="' + data[2][i].src + '"   /></a></li>'
								};
								str += '</ul>';

								str += '<div class="s44T">';
								for (var i = 0; i < data[3].length; i++) {
									str += '<a href="' + data[3][i].href + '"><img src="' + data[3][i].src + '" /><p>' + data[3][i].title + '</p><h3>' + data[3][i].sale + '<span>' + data[3][i].price + '</span></h3><h4>' + data[3][i].text + '</h4></a>'
								};
								str += '</div>';
							str += '</div>';
							//右侧
							if (floorIndex === 4 || floorIndex === 7) {
								     
								str += '<div class="sR136">';
									str += '<div class="sR136T">';
										str += '<div class="h160">'
											str += '<ul class="big">';
												for (var i = 0; i < data[4][0].length; i++) {
													str += '<li><span></span><h3>' + data[4][0][i].title + '</h3><p>' + data[4][0][i].text + '</p><a href="' + data[4][0][i].href + '"><img src="' + data[4][0][i].src + '" height="140" width="140" alt="" /></a></li>'
												};
											str += '</ul>';
										str += '</div>';
										str += '<ul class="little">'
											for (var i = 0; i < data[4][0].length; i++) {
												str += '<li class="' + data[4][0][i].class + '"><a href="' + data[4][0][i].href + '"><img src="' + data[4][0][i].src + '" alt="" />'
											};
										str += '</ul>'
										str += '<div class="bH180">'
											str += '<ul>'
												for (var i = 0; i < data[4][1].length; i++) {
													str += '<li><a href="' + data[4][1][i].href + '"><img src="' + data[4][1][i].src + '"alt="" /><span>' + data[4][1][i].text + '</span></a><a href="' + data[4][1][i].href2 + '"><img src="' + data[4][1][i].src2 + '"alt="" /><span>' + data[4][1][i].text2 + '</span></a></li>'
													
												};
											str += '</ul>'
										str += '</div>';
									str += '</div>';
								str += '</div>';									
							} else {
								     
								str += '<div class="sR36">';
									str += '<div class="sR36T">';
										str += '<dl>'
											str += '<dt>' + data[4][0][0].dt + '</dt>';
											for (var i = 1; i < data[4][0].length; i++) {
												str += '<dd class="' + data[4][0][i].class + '"><a href="' + data[4][0][i].href + '"><img src="' + data[4][0][i].src + '" alt="" /><p>' + data[4][0][i].text + '</p><h3>' + data[4][0][i].price + '</h3></a></dd>'
											};
										str += '</dl>';
									str += '</div>';
									str += '<div class="bH180">'
										str += '<ul>'
											for (var i = 0; i < data[4][1].length; i++) {
												str += '<li><a href="' + data[4][1][i].href + '"><img src="' + data[4][1][i].src + '"alt="" /><span>' + data[4][1][i].text + '</span></a><a href="' + data[4][1][i].href2 + '"><img src="' + data[4][1][i].src2 + '"alt="" /><span>' + data[4][1][i].text2 + '</span></a></li>'
												
											};
										str += '</ul>'
									str += '</div>';
								str += '</div>';								
							};
						str += '</div>';									
						break;					
					case 9:
					case 10:
					case 11:
						str += '<div class="h288">';
							//侧边
							str += '<a href="' + data[1].href + '" class="' + data[1].class + '"><img src="' + data[1].src + '"/></a>';
							//内容 
							str += '<div class="s4">';
								//中部
								str += '<ul>';
								for (var i = 0; i < data[2].length; i++) {
									str += '<li><a href="' + data[2][i].href + '"><img src="' + data[2][i].src + '"  /><p>' + data[2][i].text + '</p><h3>' + data[2][i].sale + '<span>' + data[2][i].price + '</span></h3></a></li>'
								};
								str += '</ul>';
							str += "</div>"

							//右侧
							str += '<div class="sR2">';
								str += '<ul>';
									for (var i = 0; i < data[3].length; i++) {
										str += '<li><a href="' + data[3][i].href + '"><img src="' + data[3][i].src + '"  /><h2>' + data[3][i].text + '</h2><h3>' + data[3][i].sale + '</h3><p>' + data[3][i].price + '</p></a></li>'
									};
								str += '</ul>';
							str += '</div>';
						str += '</div>';						
						break;
					default:
						str += '';
				}

				$(".f" + floorIndex).html(str);


				ue.floorUe();
				if (f1FnBoo) {
					ue.f1TopFn()
					f1FnBoo = false;
				};


			})
		}
		//img4s 的ajax 函数
		var img4Fn = function(imgN){
			var img4Ajax = new GetAjaxAndFn("json/indexJson/img4-" + imgN + ".json",function(data){
				var str = '<a href="' + data.href + '"><img src="' + data.src + '" alt="" /></a>';
				$(".img4").eq(imgN - 1).html(str);
			})
		}

		//底部版权
		var footerFn = function(){
			var footerAjax = new GetAjaxAndFn("json/indexJson/footer.json",function(data){
				var str = data[0].str;
				str += '<li class="h285">'
				for (var i = 0; i < data[1].length; i++) {
					if (i === data[1].length - 1) {
						str += '<dl class="nMr">'
					} else {
						str += '<dl>'
					};
					str += '<dt>' + data[1][i][0].dt + '</dt>'
					for(var dd in data[1][i][1]){
						str += '<dd><a href="' + data[1][i][1].dd + '">' + dd + '</a></dd>'
					}
					str += '</dl>'
				};
				str += '</li>';
				str += data[2].str;
				$(".footer").html(str);
			})
		}

		return window.ajax = {
			eleNavAjax : eleNavAjax,
			banner3GetData : banner3GetData,
			navLast : navLast,
			leftNav : leftNav,
			floorFn : floorFn,
			img4Fn	: img4Fn,
			footerFn:footerFn
		}
	}



	     
	function UE (window) {

	    var eleNavBoo = true;
	    var floors = document.querySelectorAll('.floor')

	    var floorArr = [];	    
	    var img4s = document.querySelectorAll('.img4')
	    var img4Arr = [];
	    var footerBoo = true;
	    var footer = document.querySelector('.footer')
	    // 屏幕滚动事件
		$(window).scroll(function(){
		    //电梯导航 请求
			if ($(window).scrollTop() > $(window).height() - 100) {
				if (eleNavBoo === true) {
					ajax.eleNavAjax();
					eleNavBoo = false;
				};
				$('.elevatorNav').show();
				eleNav();
				scrollFloor();

			} else{
				$('.elevatorNav').hide();
			};
			//三分栏 如果没有数据 且 进入页面 则请求数据
			if (($(window).height() + $(window).scrollTop()) >= $('.navBottom').offset().top && banner3Data) {
				ajax.banner3GetData();
				banner3Data = false;
			};


			//楼层 达到 高度时 请求数据
			for (var i = 0; i < floors.length; i++) {
				//滚动距离 + 视口高度 > 目标高度 且 不在数组中
				if (floorArr.indexOf(i + 1) < 0 && ($(window).height() + $(window).scrollTop()) >= floors[i].offsetTop) {

					ajax.floorFn(i + 1);
					floorArr.push(i + 1);
				};
				
			};	
			//穿插 四个 横banner 达到高度时 请求数据		
			for (var i = 0; i < img4s.length; i++) {
				//滚动距离 + 视口高度 > 目标高度 且 不在数组中
				if (img4Arr.indexOf(i + 1) < 0 && ($(window).height() + $(window).scrollTop()) >= img4s[i].offsetTop) {

					ajax.img4Fn(i + 1);
					img4Arr.push(i + 1);
				};
				
			};
			//底部版权判断高度加载数据
			if (footerBoo && ($(window).height() + $(window).scrollTop()) >= footer.offsetTop) {
					ajax.footerFn();
					footerBoo = false;
			};

		})
		
		function eleNav(){

			//右下
			//角 火箭 点击 返回顶部
			$('.toTop').click(function(){
				$('html,body').animate({'scrollTop':'0'}, 500);
			});
			//鼠标滑过 楼层编号 时 出现文字
			$('.elevatorNav li').hover(function() {
				$(this).children('span').show();
			},function(){
				$(this).children('span').hide();
				scrollFloor();
			});
			//电梯导航 点击时 去 对应楼层
			$('.elevatorNav li').click(function() {
				var moveTo = $('.floor').eq($(this).index()).offset().top - 100;
				$('html,body').stop().animate({'scrollTop':moveTo}, 500);
			});

			//定义 滚动时 判断 切换 相应楼层 显示文字
			function scrollFloor(){
				for (var i = $('.floor').length; i--;) {
					$('.elevatorNav li span').hide();
					if ($(window).scrollTop() >= $('.floor').eq(i).offset().top - 200) {
						$('.elevatorNav li span').eq(i).show();
						return;
					}
				};
			};
			window.scrollFloor = scrollFloor;
		}
		//顶部 全部商品 分类 滑过 向下展开
		$('.all').hover(function() {
			$('.t2h35 .biggest').stop().slideToggle();
		});
		//三分栏 如果可视加载ajax数据
		var banner3Data = true;
		if ($('.navBottom').offset().top < $(window).height() && banner3Data) {
			ajax.banner3GetData();
			banner3Data = false;
		};
		//侧导航 下方 三分栏 滑过 向上突出
		function banner3Fn(){
			$('.navBottom li').hover(function() {
				$(this).stop().animate({'margin-top':'-10px'},400)
			}, function() {
				$(this).stop().animate({'margin-top':'0px'},400)
			});
			
		}
		//侧导航 中部 滑过 上下滚动 切换商品
		function navBotFn(){

			$('.navMiddle .h43 a').eq(0).mouseover(function(){
				$(this).parent().find('.current').stop().animate({'left': 0 }, 200)
				$(this).parent().next().find('ul').stop().animate({'top': '10px'}, 200)
			})
			$('.navMiddle .h43 a').eq(1).mouseover(function(){
				$(this).parent().find('.current').stop().animate({'left':'230px'}, 200)
				$(this).parent().next().find('ul').stop().animate({'top': '-220px'}, 200)
			})
		}
		//深红 主分类 最后两项
		!function navLast2(index) {
			var last1Boo = true;
			var last2Boo = true;

			$(".navBg > ul > li").eq(8).hover(function() {
				if (last1Boo) {
					ajax.navLast("last1");
					last1Boo = false;
				} else {
					$(this).find($("div")).show();
				};
			}, function() {
				$(this).find($("div")).hide();
			});
			$(".navBg > ul > li").eq(9).hover(function() {
				if (last2Boo) {
					ajax.navLast("last2");
					last2Boo = false;
				} else {
					$(this).find($("div")).show();
				};
			}, function() {
				$(this).find($("div")).hide();
			});
		}()
		//左侧导航 延时 滑过 向右 展开详情
		var leftNavTimer = null;
		var leftNavData = [18];
		$('.Yldd').hover(function(){
			var leftNavDd = $(this);
			leftNavTimer = setTimeout(function(){
				leftNavDd.find('.type').show();
				leftNavDd.addClass('ylddhover');
				var leftNavIndex = leftNavDd.index();

				if (leftNavData.indexOf(leftNavIndex) < 0) {
					ajax.leftNav(leftNavIndex);
					leftNavData.push(leftNavIndex)
				};
			},200)
		},function(){
			$(this).removeClass('ylddhover');
			$(this).find('.type').hide();
			clearInterval(leftNavTimer)
		})
		//主banner 函数
		function banner(){
			//banner 设置 定时轮播
			$('.bannerBg').css({'background-color':$(".banner li").eq(0).attr("color")});
			var mainTimer = null;
			var mainN = 0;
			var arrN = $(".banner li").length - 1;
			     
			var mainBanner = function(){
				mainN++;
				if (mainN > arrN) {
					mainN = 0;
				};
				$('.bannerarea ol li').eq(mainN).addClass('current').siblings().removeClass('current');
				$('.bannerarea .banner li').eq(mainN).show().siblings().hide();
				$('.bannerBg').css({'background-color':$(".banner li").eq(mainN).attr("color")});
				     
			};
			mainTimer = setInterval(mainBanner,3000);
			//banner 角标 点击 更换角标颜色 主图
			$('.bannerarea').on('click','li',function(){
				     
				$(this).addClass('current').siblings().removeClass('current');
				$(this).parent().prev().children().eq($(this).index()).stop().show().siblings().stop().hide();
				mainN = $(this).index();
				$('.bannerBg').css({"backgroundColor":$('.banner li').eq($(this).index()).attr("color")})

			})
			//banner 移入停止 移出轮播
			$('.bannerBg .bannerarea').hover(function() {
				clearInterval(mainTimer);
			}, function() {
				mainTimer = setInterval(mainBanner,3000);
			});
		}
		//设置 左侧导航 小图标
		var iconLeftVal = 0;
		$('.navYicon').each(function(index, el) {
			iconLeftVal = index * -16;
			$(el).css('background-position',iconLeftVal + 'px'+' 0px')
		});
		// 左侧导航 设置 定位
		var typesPosition = ['-52px', '-85px', '-118px', '-151px', '-184px', '-217px', '-250px', '-283px', '-316px', '-340px', '-382px', '-215px', '-300px', '-200px', '-200px', '-400px', '-100px']
		$('.type').each( function(index, val) {
			 $(val).css({'top':typesPosition[index]})
		});
		//右侧导航 顶部滑过 延时 上下切换
		var RtHeadTimer = null;
		$('.RtHead li').eq(0).hover(function() {
			var liThis = $(this)
			RtHeadTimer = setTimeout(function(){
				liThis.next().stop().animate({'left': '0' }, 200)
				liThis.parent().next().children().stop().animate({'top': '10px' }, 200)
			},300)
		}, function() {
			clearInterval(RtHeadTimer)
		});
		$('.RtHead li').eq(2).hover(function() {
			var liThis = $(this)
			RtHeadTimer = setTimeout(function(){
				liThis.prev().stop().animate({'left': '110px' }, 200)
				liThis.parent().next().children().stop().animate({'top': '-124px' }, 200)
			},300)
		}, function() {
			clearInterval(RtHeadTimer)
		});
		// 右侧 小banner 轮播
		!function littleBanner(){
			//右侧 小banner 设置 定时轮播
			var littleTimer = null;
			var littleN = 0;
			var littleLeftVal = littleN * -220;
			var littleBanner = function(){
				littleN++;
				if (littleN > 3) {
					littleN = 0;
				};
				var littleLeftVal = littleN * -220;
				$('.litBanFooter li').eq(littleN).addClass('current').siblings().removeClass('current');
				$('.litBan').animate({'left': littleLeftVal +'px'}, 200);
			};
			littleTimer = setInterval(littleBanner,2000);
			//右侧 小banner 角标 滑过 变换角标颜色 主图
			$('.litBanFooter li').hover(function(){
				var littleLeftVal = $(this).index() * -220;
				$(this).addClass('current').siblings().removeClass('current');
				$('.litBan').stop().animate({'left': littleLeftVal +'px'}, 200);
				littleN = $(this).index();
			})
			//右侧 小banner 移入停止 移出轮播
			$('.litBanArea').hover(function() {
				clearInterval(littleTimer);
			}, function() {
				littleTimer = setInterval(littleBanner,2000);
			});
		}()
		//手机充值 点击 改变时 改变 右侧价格
		$('.val select').change(function() {
			var fn = $(this).val();
			if (fn == '20元'){
				$('.change h6 p').html('20.5');
			}else if(fn == '50元'){
				$('.change h6 p').html('49.8');
			}else if(fn == '30元'){
				$('.change h6 p').html('30');
			}else {
				$('.change h6 p').html('99.5');
			}
		});
		//f1 中顶 滑过 当前 左移 其他 变暗
		function f1TopFn(){
			$('.s25T li').hover(function() {
				$(this).stop().animate({'margin-left': '-10px'}, 500)
				$(this).siblings().find('img').stop().animate({'opacity':'0.5'}, 200)
			}, function() {
				$(this).stop().animate({'margin-left': '0px'}, 500)
				$(this).siblings().find('img').stop().animate({'opacity':'1'}, 200)
			});
		}
		function floorUe(){
			//设置floor 楼层标识
			var floorVal = 0;
			$('.h50 h2').each(function(index, el) {
				floorVal = index * -50;
				$(el).css('background-position','0px ' + floorVal + 'px')
			});
			//依次 设置 .sR5 span 角旗 背景图位置 
			var sR5Left = 0;
			$('.sR5').each(function(index, val) {
				$(val).find('span').each(function(index, val) {
					index == 4?index = 3:index = index;
				 	sR5Left = -48 - index * 18;
				 	$(val).css('background-position',sR5Left +'px -52px')
				});
			});
			//设置 s34 格式 顶部 商品 滑过 左凸出 其他变暗
			$('.s34T li').hover(function() {
				$(this).stop().animate({'margin-left': '-5px'}, 500)
				$(this).siblings().find('img').stop().animate({'opacity':'0.5'}, 200)
			}, function() {
				$(this).stop().animate({'margin-left': '0px'}, 500)
				$(this).siblings().find('img').stop().animate({'opacity':'1'}, 200)
			});
			// sR136 模块 小图滑过 大图滑动展示
			$('.little li').hover(function(){
				var bigLeft = $(this).index() * -240;
				$(this).parent().prev().find('ul').stop().animate({'left': bigLeft + 'px'}, 300)
			});
		}

		return window.ue = {
			banner 		: banner,
			eleNav 		: eleNav,
			navBotFn	: navBotFn,
			banner3Fn	: banner3Fn,
			f1TopFn		: f1TopFn,
			floorUe		: floorUe
		}
	}
	
});
