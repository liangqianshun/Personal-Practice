var zhufengEffect = {
	//当前时间*变化量/持续时间+初始值
	zfLinear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {//二次方的缓动（t^2）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {//三次方的缓动（t^3）
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {//四次方的缓动（t^4）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {//5次方的缓动（t^5）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {//正弦曲线的缓动（sin(t)）
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {//指数曲线的缓动（2^t）；
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {//指数衰减的正弦曲线缓动；
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	
	Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	zfBounce: {//指数衰减的反弹缓动。
		easeIn: function(t,b,c,d){
			return c - zhufengEffect.zfBounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return zhufengEffect.zfBounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return zhufengEffect.zfBounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
}


function getCss(ele,attr){
	if(typeof getComputedStyle=="function"){
		return parseFloat(getComputedStyle(ele,null)[attr]);
	}else{
		if(attr=="opacity"){
			var val=ele.currentStyle.filter;
			var reg=/alpha\(opacity=(\d+(?:\.\d+)?)\)/;
			if(reg.test(val)){
				return parseFloat(RegExp.$1)/100;	
			}else{
				return 1;
			}
		}else{
			return parseFloat(ele.currentStyle[attr]);
		}
	}
}

function setCss(ele,attr,val){
	switch(attr){
		case "opacity":
			ele.style.opacity=val;
			ele.style.filter="alpha(opacity="+val*100+")";
			break;
		case "top":
		case "left":
		case "width":
		case "height":
			ele.style[attr]=val+"px";
			break;
		case "float":
			ele.style.cssFloat=val;
			ele.style.styleFloat=val;
			break;
		default:
			ele.style[attr]=val;		
	}
}
Array.prototype.toString=function(){
	return this.join("+");
	//其实这个是覆盖，因为Array类上已经重写了toString方法，这儿又定义了一次，相当于把Array类上的toString方法给覆盖了。但原来的Array类上实现的toString方法可以叫重写
};
HTMLDivElement.prototype.toString=function(){
	return "我是个div";	//重写了toString方法
};
function animate(ele,obj,duration,effect,fnCallback){
	//什么叫方法重载：一个方法有多个参数形态，通过不同的参数来实现不同的功能
	//什么叫方法重写：子类上重新实现的父类上的方法。比如Array的toString方法就是重写了Object类上的toString方法
	//
	var fnEffect=zhufengEffect.Expo.easeOut;//以减速的为默认效果
	if(typeof effect =="number"){
		switch(effect){
			case 1:
				fnEffect=zhufengEffect.zfLinear;
			break;
			case 2:
				fnEffect=zhufengEffect.Back.easeOut;
				break;
			case 3:
				fnEffect=zhufengEffect.Elastic.easeOut;//弹性
				break;
			case 4:
				fnEffect=zhufengEffect.zfBounce.easeOut;//返弹
			
		}
	}else if(typeof effect=="function"){
		fnCallback=effect;
	}else if(typeof effect =="object"&& effect instanceof Array){
		//如果给effect传一个数组，数组的格式应该是
		//[动画类型,缓动类型]
		//比如说effect的值是['Expo','easeOut']
		//则相当于下面这两种情况
		//zhufengEffect['Expo']['easeOut']
		//zhufengEffect.Expo.easeOut
		fnEffect=zhufengEffect[effect[0]][effect[1]]
		//animate(ele,{left:600},1500,['Expo','easeOut'],callback)
	}
	var oBegin={};//保存各方向的起始值
	var oChange={};//保存各方向的运动距离
	var flag=0;
	for(var attr in obj){//循环分解各方向的起始值和运动距离
		var target=obj[attr];
		var begin=getCss(ele,attr);
		var change=target-begin;
		if(change){//避免起点和终点相同。
			oBegin[attr]=begin;
			oChange[attr]=change;
			flag++;
		}
	}
	if(flag===0)return;
	
	var interval=13;
	var times=0;
	clearInterval(ele.timer);
	function step(){
		times+=interval;
		if(times>=duration){
			for(var attr in obj){
				var target=obj[attr];
				setCss(ele,attr,target);				
			}
			clearInterval(ele.timer);//停止动画
			ele.timer=null;//并且把标识清除
			if(typeof fnCallback=="function"){
				fnCallback.call(ele);
			}
		}else{
			for(var attr in oChange){
				var change=oChange[attr];
				var begin=oBegin[attr];
				var val=fnEffect(times,begin,change,duration);//times/duration*change+begin;
				setCss(ele,attr,val);	
			}
		}
	}
	ele.timer=window.setInterval(step,interval);
}