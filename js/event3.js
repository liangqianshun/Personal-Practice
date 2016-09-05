
function bind(ele,type,handler){
	if(ele.addEventListener){
		ele.addEventListener(type,handler,false);
	}else if(ele.attachEvent){
		var fnTemp=function(){handler.call(ele)}
		//ele.aEventclick
		if(!ele["aEvent"+type]){
			ele["aEvent"+type]=[];
		}
		
		var a=ele["aEvent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i].photo==handler){
				return;	
			}
		}
		a.push(fnTemp);
		fnTemp.photo=handler;		
		ele.attachEvent("on"+type,fnTemp);
	}
}
function unbind(ele,type,handler){
	if(ele.removeEventListener){
		ele.removeEventListener(type,handler,false);
	}else if(ele.detachEvent){
		var a=ele["aEvent"+type];
		
		if(a&&a.length)
			for(var i=0;i<a.length;i++){
				if(a[i].photo==handler){
					ele.detachEvent("on"+type,a[i]);
					a.splice(i,1);
					return;	
				}
			}
	}
}

function on(ele,type,fn){
	if(type.indexOf("拖拽")===0){
		if(!ele["selfEvent"+type]){
			ele["selfEvent"+type]=[];
		}
		var a=ele["selfEvent"+type];
		if(a&&a.length){
			for(var i=0;i<a.length;i++){
				if(a[i]==fn)return;	
			}
		}
		a.push(fn);
		
	}else{
		if(!ele["aDesc"+type]){
			ele["aDesc"+type]=[];	
		}
		var a=ele["aDesc"+type];
		if(a&&a.length){
			for(var i=0;i<a.length;i++){
				if(a[i]==fn)return;	
			}
		}
		a.push(fn);
		bind(ele,type,run);
	}
}
//夫祸患常积于忽微，而智勇多困于所溺
function run(e){
	e=e||window.event;
	if(!e.target){//解决IE的事件的浏览器兼容性问题
		e.target=e.srcElement;
		e.stopPropagation=function(){e.cancelBubble=true;}
		e.preventDefault=function(){e.returnValue=false;}
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
	}
	
	var a=this["aDesc"+e.type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function")
					a[i].call(this,e);	
		}
	}
	
}
function off(ele,type,fn){
	var a=ele["aDesc"+type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				return;
			}
		}
	}
}

function 通知(什么事,系统的事件){
	var a=this["selfEvent"+什么事]
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			a[i].call(this,系统的事件);
		}
	}
	//见诸相无相，即见如来
}