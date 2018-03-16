/*jQuery.fn.extend({
	changep:function(){

	}
})*/

$(document).ready(function(){
var index=0; 
var timer=null;
var audioSource=[
		{
			'src':'../mp3/Westlife - Beautiful World.mp3',
			'name':'Beautiful World',
			'songer':'queen',
			'times':'04:02',
		},
		{
			'src':'../mp3/Bandari - 安妮的仙境.mp3',
			'name':'安妮的仙境',
			'songer':'Bandari',
			'times':'03:28',
		},
		{
			'src':'../mp3/Bandari - 春野 - 乐团 Onedayinspring 班得瑞.mp3',
			'name':'Onedayinspring',
			'songer':'班得瑞',
			'times':'04:30',
		},
		{
			'src':'../mp3/Bandari - 童年 - 乐团 Childhoodmemory 班得瑞.mp3',
			'name':'Childhoodmemory',
			'songer':'班得瑞',
			'times':'03:15',
		},
		{
			'src':'../mp3/Black Eyed Peas - Boom Boom Pow.mp3',
			'name':'Boom Boom Pow',
			'songer':'Black Eyed Peas',
			'times':'04:06',
		},
		{
			'src':'../mp3/Boa - Every Breath You Take.mp3',
			'name':'Every Breath You Take',
			'songer':'Boa',
			'times':'04:55',
		},
		{
			'src':'../mp3/Bon Jovi - Because We Can.mp3',
			'name':'Because We Can',
			'songer':'Bon Jovi',
			'times':'04:00',
		},
		{
			'src':"../mp3/Bon Jovi - It's My Life.mp3",
			'name':'Its My Life',
			'songer':'Bon Jovi',
			'times':'03:44',
		},
		{
			'src':'../mp3/Coldplay - Yellow.mp3',
			'name':'Yellow',
			'songer':'Coldplay',
			'times':'04:30',
		},
		{
			'src':'../mp3/Nightwish - Eva.mp3',
			'name':'Eva',
			'songer':'Nightwish',
			'times':'04:24',
		},
		{
			'src':'../mp3/Nightwish - Moondance.mp3',
			'name':'Moondance',
			'songer':'Nightwish',
			'times':'03:31',
		}
];
var start = new Date().getTime();
var maxW=window.innerWidth>$(document).width()?window.innerWidth:$(document).width();
var maxH=window.innerHeight>$(document).height()?window.innerHeight:$(document).height()

// 页面数据初始化
audioSource.forEach(items=>{
	var $li=$('<li></li>');
	$li.addClass('songs_li');
	var i=0;
	while(i<3){
		$div=$('<div></div>');
		switch (i){
			case 0:
				$div.addClass('song_name');
				$a=$('<a class="song_title"></a>');
				$a.html(items.name);
				$ndiv=$('<div class="songs_btn"></div>');
				$ndiv.html('<i class="songs_icon detail_play"></i><i class="detail_down"></i>');
				$div.append($a);
				$div.append($ndiv);
				$li.append($div);
				break;
			case 1:
				$div.addClass('songs_songer').html(items.songer);
				$li.append($div)
				break;
			case 2:
				$div.addClass('songs_time').html(items.times);
				$li.append($div)
				break;
		}
		i++;	
	}
	$('#songs_detail').append($li);	
})
$('#songs_audio').prop("src",audioSource[index].src);

//播放状态改变
/*function changeP(){
	if($('#songs_audio')[0].paused){
		$('#songs_audio')[0].play();
		$('#control_play').removeClass('songs_play');
		$('#control_play').addClass('songs_pause');
		$('.songs_icon').eq(index).removeClass('detail_play');
		$('.songs_icon').eq(index).addClass('detail_pause');
		$('.songs_li').eq(index).addClass('songs_cont');
		namec()
	}else{
		$('#songs_audio')[0].pause()
		$('#control_play').removeClass('songs_pause')
		$('#control_play').addClass('songs_play')
		$('.songs_icon').eq(index).removeClass('detail_pause');
		$('.songs_icon').eq(index).addClass('detail_play');
		clearInterval(timer)
	}
	$('#control_alltime').html(gettimes($('#songs_audio')[0].duration))
}*/
//获取循环状态
function getloop(){
	if($('#control_loop').hasClass('songs_allloop')) return 'all';
	if($('#control_loop').hasClass('songs_onceloop')) return 'once';
	if($('#control_loop').hasClass('songs_randloop')) return 'rand';
}
//样式重置
function rset(){
	$('#songs_audio')[0].pause();
	$('#songs_audio')[0].currentTime=0.0;
	$('.songs_li').eq(index).removeClass('songs_cont');
	$('#control_play').removeClass('songs_pause').addClass('songs_play');
	$('.songs_icon').eq(index).removeClass('detail_pause').addClass('detail_play');
	clearInterval(timer);
}
//时间转换audio的duration及currentTime转为00:00形式
function gettimes(num){
	num=Math.round(num);
	var oM=num/60>=10?Math.floor(num/60):'0'+Math.floor(num/60);
	var oS=num%60>=10?Math.floor(num%60):'0'+Math.floor(num%60);
	return oM+':'+oS;
}
//控制中心改变
function namec(){
	$('#control_name').html(audioSource[index].name);
	$('#control_songer').html(audioSource[index].songer);
	$('#control_alltime').html($('#songs_audio')[0].duration)
	//定时器,audio currentTime时间更新
	timer=setInterval(function(){
		$('#control_currtime').html(gettimes($('#songs_audio')[0].currentTime));
		$('#control_btn').css({'left':function(){
			return ($('#songs_audio')[0].currentTime/$('#songs_audio')[0].duration)*300
		}
	})
	},500)
}
//下一首歌整体改变
function nexts(dire){
	rset()
	var loop=getloop();
	switch(loop){
		case 'all':
			if(dire=='pre'){
				if(index==0){
					index=$('.songs_li').length-1;
				}else{
					index--;
				}					
			}else{
				if(index==$('.songs_li').length-1){
					index=0;
				}else{
					index++;
					console.log('ne'+index)
				}				
			}
			console.log('all'+index)
		break;
		case 'once':
			rset();
		break;
		case 'rand':
			index=Math.floor(Math.random()*audioSource.length)
		break;
	}
	changeS();
}
//下一首歌index更新后操作
function changeS(){
	$('#songs_audio')[0].src=audioSource[index].src;
	//audio 资源变更后异步加载操作
	$('#songs_audio')[0].oncanplay=function(){
		$('.songs_li').eq(index).addClass('songs_cont');
		$('#control_alltime').html(gettimes($('#songs_audio')[0].duration))
	}
	$("#control_play").trigger('click');
}

//loop循环变化及相应audio的影响
$('#control_loop').click(function(){
	if($(this).hasClass('songs_allloop')){
		$(this).prop('class','icon songs_onceloop');
		$('#songs_audio')[0].loop='loop';
	}else if($(this).hasClass('songs_onceloop')){
		$(this).prop('class','icon songs_randloop');
		$('#songs_audio')[0].loop=null;
	}else if($(this).hasClass('songs_randloop')){
		$(this).prop('class','icon songs_allloop');
	}
})
//控制台播放暂停操作
$("#control_play").click(function(){
	if($('#songs_audio')[0].paused){
		$('#songs_audio')[0].play();
		$('#control_play').removeClass('songs_play').addClass('songs_pause');
		$('.songs_icon').eq(index).removeClass('detail_play').addClass('detail_pause');
		$('.songs_li').eq(index).addClass('songs_cont');
		namec()
	}else{
		$('#songs_audio')[0].pause()
		$('#control_play').removeClass('songs_pause').addClass('songs_play')
		$('.songs_icon').eq(index).removeClass('detail_pause').addClass('detail_play');
		clearInterval(timer)
	}
	$('#control_alltime').html(gettimes($('#songs_audio')[0].duration))
})
//控制台下一首歌曲
$('#control_next').click(function(){
	var dire='next';
	nexts(dire)
})
//歌曲播放完成后无干涉操作
$('#songs_audio')[0].onended=function(){
	var dire='next';
	nexts(dire)
}
//上一曲操作
$('#control_pre').click(function(){
	var dire='pre';
	nexts(dire)
})
//事件委托：歌名dblclick播放；播放暂停操作；歌曲点击下载操作
$('#songs_detail').on({
	'dblclick':function(ev){
		var ev=ev||window.event;
		var target=ev.target || ev.srcElement; 
		if($(target).hasClass('song_title')){
			rset()
			// index=$('#songs_detail a').index($(target));
			index=$.inArray(target,$('#songs_detail a'))	
			alert(index)
			changeS()
		}
	},'click':function(ev){
		var ev=ev||window.event;
		var target=ev.target || ev.srcElement; 
		if($(target).hasClass('detail_play')){
			if(index==$.inArray(target,$('#songs_detail .songs_icon'))){
				$("#control_play").trigger('click');
			}else{
				rset();
				// index=$('#songs_detail .songs_icon').index($(target));
				index=$.inArray(target,$('#songs_detail .songs_icon'))
				changeS();
			}
		}else if($(target).hasClass('detail_pause')){
			$("#control_play").trigger('click');
		}
		if($(target).hasClass('detail_down')){
			var numb=$.inArray(target,$('#songs_detail .detail_down'));
			$('#control_down').trigger('click',numb)
		}
	}
})
//歌曲声音大小点击调节操作
$('#voice_bar').on({'click':function(ev){
	var ev=ev || window.event;
	$('#songs_audio')[0].volume=(ev.clientX-$(this).offset().left)/$(this).width();
	$('#voice_btn').css('left',ev.clientX-$(this).offset().left+30);
	$('#control_voice').prop('class','icon songs_voice');
	$('#songs_audio')[0].muted=false;
	},
	'mouseover':function(ev){
		var ev=ev || window.event;
		$(this).prop('title',(ev.clientX-$(this).offset().left)/$(this).width())
	},
	'mousemove':function(ev){
		var ev=ev || window.event;
		$(this).prop('title',(ev.clientX-$(this).offset().left)/$(this).width())
}
})

//歌曲进度点击调整操作
$('#control_scroll').click(function(ev){
	var ev=ev ||window.event;
	var bl=(ev.clientX-$(this).offset().left)/$(this).width()
	$('#songs_audio')[0].currentTime=bl*$('#songs_audio')[0].duration;
	$('#control_btn').css('left',ev.clientX-$(this).offset().left);
})
//歌曲静音正常音量切换操作
$('#control_voice').click(function(){
	if($('#songs_audio')[0].muted){
		$('#songs_audio')[0].muted=false;
		$(this).prop('class','icon songs_voice')
	}else{
		$('#songs_audio')[0].muted=true;
		$(this).prop('class','icon songs_novoice')
	}		
})
//控制台下载当前音乐
$('#control_down').click(function(event,num){
	$('#down_opc').css({'width':maxW,'height':maxH}).show()
	// $('#down_opc').show();
	var num=num?num:index;
	var ow=(window.innerWidth-$('#songs_down').width())/2;
	var oh=(window.innerHeight-$('#songs_down').height())/2;
	$('#songs_down').css({'left':ow,'top':oh});
	$('#songs_down').show('fast',function(){
		$('#down_song').html('<h3>name:'+audioSource[num].name+'</h3><h3>songer:'+audioSource[num].songer+'</h3><h3>请选择下载类型</h3>')
	});
	$('#songs_down input[name=down_fl]').eq(0)[0].checked=true;
})
//下载页面弹出函数

//下载页面关闭操作：关闭按钮
$('#down_close').on('click',function(){
	$('#down_opc,#songs_down').hide();
	$('#down_song').html('')
})
//下载页面关闭操作：取消按钮
$('#down_cancel').on('click',function(){
	$('#down_close').trigger('click')
})
//选择下载类别下载，并关闭页面
$('#down_con').on('click',function(){
	alert($('#songs_down input:checked').val());
	$('#down_close').trigger('click')
})
//下载页面移动操作
$('#down_header').on('mousedown',function(ev){
	$(this).css('cursor','move');
	var ev=ev||window.event;
	var disx=ev.clientX-$('#songs_down').offset().left;
	var disy=ev.clientY-$('#songs_down').offset().top;
	
	$(document).on('mousemove',function(ev){
		var ev=ev||window.event;
		$('#songs_down').css({'left':ev.clientX-disx,'top':ev.clientY-disy});
		if(ev.clientX-disx<=0) $('#songs_down').css('left',0);
		if(ev.clientX-disx>=maxW-$('#songs_down').width()) $('#songs_down').css('left',maxW-$('#songs_down').width());
		if(ev.clientY-disy<=0) $('#songs_down').css('top',0);
		if(ev.clientY-disy>=maxH-$('#songs_down').height()) $('#songs_down').css('top',maxH-$('#songs_down').height());
	})
	//鼠标键弹起时关闭mousemove和mouseup功能
	$(document).on('mouseup',function(){
		$(document).off('mousemove','mouseup')
		// $(document).off('mouseup')
	})
})


$('input[type=text]').click(function(event,name){
		console.log(name)

})
// 
// $('input[type=text]').click(function(){
// 		$('input[type=text]').trigger('click',111)

// })
// $('#butt').click(function(){
// 	$('input[type=text]').trigger('click',222)
// })

var end=new Date().getTime();
	console.log(end-start)
}

)
