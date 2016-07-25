
/* 
* @Author: 李光耀
* @Last Modified time: 2016-07-06 20:55:13
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

			footerFn:footerFn
		}
	}



	     
	function UE (window) {


	    var footerBoo = true;
	    // 屏幕滚动事件
		$(window).scroll(function(){
			//底部版权判断高度加载数据
			if (footerBoo && ($(window).height() + $(window).scrollTop()) >= footer.offsetTop) {
					ajax.footerFn();
					footerBoo = false;
			};
		})
		//顶部 全部商品 分类 滑过 向下展开
		$('.all').hover(function() {
			$('.t2h35 .biggest').stop().slideToggle();
		});
	}
	
});
