//-------------------------------------------------------------------------------------
//-------------------------------------JS Tweener--------------------------------------
//-------------------------------------------------------------------------------------
function Delegate(){}Delegate.create=function(e,t){var n=new Array;var r=arguments.length;for(var i=2;i<r;i++)n[i-2]=arguments[i];return function(){var r=[].concat(arguments,n);t.apply(e,r)}};Tween=function(e,t,n,r,i,s,o){this.init(e,t,n,r,i,s,o)};var t=Tween.prototype;t.obj=new Object;t.prop="";t.func=function(e,t,n,r){return n*e/r+t};t.begin=0;t.change=0;t.prevTime=0;t.prevPos=0;t.looping=false;t._duration=0;t._time=0;t._pos=0;t._position=0;t._startTime=0;t._finish=0;t.name="";t.suffixe="";t._listeners=new Array;t.setTime=function(e){this.prevTime=this._time;if(e>this.getDuration()){if(this.looping){this.rewind(e-this._duration);this.update();this.broadcastMessage("onMotionLooped",{target:this,type:"onMotionLooped"})}else{this._time=this._duration;this.update();this.stop();this.broadcastMessage("onMotionFinished",{target:this,type:"onMotionFinished"})}}else if(e<0){this.rewind();this.update()}else{this._time=e;this.update()}};t.getTime=function(){return this._time};t.setDuration=function(e){this._duration=e==null||e<=0?1e5:e};t.getDuration=function(){return this._duration};t.setPosition=function(e){this.prevPos=this._pos;var t=this.suffixe!=""?this.suffixe:"";this.obj[this.prop]=Math.round(e)+t;this._pos=e;this.broadcastMessage("onMotionChanged",{target:this,type:"onMotionChanged"})};t.getPosition=function(e){if(e==undefined)e=this._time;return this.func(e,this.begin,this.change,this._duration)};t.setFinish=function(e){this.change=e-this.begin};t.getFinish=function(){return this.begin+this.change};t.init=function(e,t,n,r,i,s,o){if(!arguments.length)return;this._listeners=new Array;this.addListener(this);if(o)this.suffixe=o;this.obj=e;this.prop=t;this.begin=r;this._pos=r;this.setDuration(s);if(n!=null&&n!=""){this.func=n}this.setFinish(i)};t.start=function(){this.rewind();this.startEnterFrame();this.broadcastMessage("onMotionStarted",{target:this,type:"onMotionStarted"})};t.rewind=function(e){this.stop();this._time=e==undefined?0:e;this.fixTime();this.update()};t.fforward=function(){this._time=this._duration;this.fixTime();this.update()};t.update=function(){this.setPosition(this.getPosition(this._time))};t.startEnterFrame=function(){this.stopEnterFrame();this.isPlaying=true;this.onEnterFrame()};t.onEnterFrame=function(){if(this.isPlaying){this.nextFrame();setTimeout(Delegate.create(this,this.onEnterFrame),0)}};t.nextFrame=function(){this.setTime((this.getTimer()-this._startTime)/1e3)};t.stop=function(){this.stopEnterFrame();this.broadcastMessage("onMotionStopped",{target:this,type:"onMotionStopped"})};t.stopEnterFrame=function(){this.isPlaying=false};t.continueTo=function(e,t){this.begin=this._pos;this.setFinish(e);if(this._duration!=undefined)this.setDuration(t);this.start()};t.resume=function(){this.fixTime();this.startEnterFrame();this.broadcastMessage("onMotionResumed",{target:this,type:"onMotionResumed"})};t.yoyo=function(){this.continueTo(this.begin,this._time)};t.addListener=function(e){this.removeListener(e);return this._listeners.push(e)};t.removeListener=function(e){var t=this._listeners;var n=t.length;while(n--){if(t[n]==e){t.splice(n,1);return true}}return false};t.broadcastMessage=function(){var e=new Array;for(var t=0;t<arguments.length;t++){e.push(arguments[t])}var n=e.shift();var r=this._listeners;var i=r.length;for(var t=0;t<i;t++){if(r[t][n])r[t][n].apply(r[t],e)}};t.fixTime=function(){this._startTime=this.getTimer()-this._time*1e3};t.getTimer=function(){return(new Date).getTime()-this._time};Tween.backEaseIn=function(e,t,n,r,i,s){if(o==undefined)var o=1.70158;return n*(e/=r)*e*((o+1)*e-o)+t};Tween.backEaseOut=function(e,t,n,r,i,s){if(o==undefined)var o=1.70158;return n*((e=e/r-1)*e*((o+1)*e+o)+1)+t};Tween.backEaseInOut=function(e,t,n,r,i,s){if(o==undefined)var o=1.70158;if((e/=r/2)<1)return n/2*e*e*(((o*=1.525)+1)*e-o)+t;return n/2*((e-=2)*e*(((o*=1.525)+1)*e+o)+2)+t};Tween.elasticEaseIn=function(e,t,n,r,i,s){if(e==0)return t;if((e/=r)==1)return t+n;if(!s)s=r*.3;if(!i||i<Math.abs(n)){i=n;var o=s/4}else var o=s/(2*Math.PI)*Math.asin(n/i);return-(i*Math.pow(2,10*(e-=1))*Math.sin((e*r-o)*2*Math.PI/s))+t};Tween.elasticEaseOut=function(e,t,n,r,i,s){if(e==0)return t;if((e/=r)==1)return t+n;if(!s)s=r*.3;if(!i||i<Math.abs(n)){i=n;var o=s/4}else var o=s/(2*Math.PI)*Math.asin(n/i);return i*Math.pow(2,-10*e)*Math.sin((e*r-o)*2*Math.PI/s)+n+t};Tween.elasticEaseInOut=function(e,t,n,r,i,s){if(e==0)return t;if((e/=r/2)==2)return t+n;if(!s)var s=r*.3*1.5;if(!i||i<Math.abs(n)){var i=n;var o=s/4}else var o=s/(2*Math.PI)*Math.asin(n/i);if(e<1)return-.5*i*Math.pow(2,10*(e-=1))*Math.sin((e*r-o)*2*Math.PI/s)+t;return i*Math.pow(2,-10*(e-=1))*Math.sin((e*r-o)*2*Math.PI/s)*.5+n+t};Tween.bounceEaseOut=function(e,t,n,r){if((e/=r)<1/2.75){return n*7.5625*e*e+t}else if(e<2/2.75){return n*(7.5625*(e-=1.5/2.75)*e+.75)+t}else if(e<2.5/2.75){return n*(7.5625*(e-=2.25/2.75)*e+.9375)+t}else{return n*(7.5625*(e-=2.625/2.75)*e+.984375)+t}};Tween.bounceEaseIn=function(e,t,n,r){return n-Tween.bounceEaseOut(r-e,0,n,r)+t};Tween.bounceEaseInOut=function(e,t,n,r){if(e<r/2)return Tween.bounceEaseIn(e*2,0,n,r)*.5+t;else return Tween.bounceEaseOut(e*2-r,0,n,r)*.5+n*.5+t};Tween.strongEaseInOut=function(e,t,n,r){return n*(e/=r)*e*e*e*e+t};Tween.regularEaseIn=function(e,t,n,r){return n*(e/=r)*e+t};Tween.regularEaseOut=function(e,t,n,r){return-n*(e/=r)*(e-2)+t};Tween.regularEaseInOut=function(e,t,n,r){if((e/=r/2)<1)return n/2*e*e+t;return-n/2*(--e*(e-2)-1)+t};Tween.strongEaseIn=function(e,t,n,r){return n*(e/=r)*e*e*e*e+t};Tween.strongEaseOut=function(e,t,n,r){return n*((e=e/r-1)*e*e*e*e+1)+t};Tween.strongEaseInOut=function(e,t,n,r){if((e/=r/2)<1)return n/2*e*e*e*e*e+t;return n/2*((e-=2)*e*e*e*e+2)+t};
function OpacityTween(e,t,n,r,i){this.targetObject=e;this.init(new Object,"x",t,n,r,i)}OpacityTween.prototype=new Tween;OpacityTween.prototype.constructor=Tween;OpacityTween.superclass=Tween.prototype;var o=OpacityTween.prototype;o.targetObject={};o.onMotionChanged=function(e){var t=e.target._pos;var n=this.targetObject;n.style["opacity"]=t/100;n.style["-moz-opacity"]=t/100;n.style.filter='progid:DXImageTransform.Microsoft.Alpha(Opacity='+t+')'};
//-------------------------------------------------------------------------------------
var fwDNKp;
var fwDNK = function(p,cb) {
	if(cb!=undefined)cb();
	window["dnk"]=$;
	this.objp=p;//selected object parameters
	//console.log(toString.call(p));
	if (toString.call(p) ==="[object NodeList]"){
		this.obj=p;
	}else if(toString.call(p) ==="[object HTMLSpanElement]" || toString.call(p) ==="[object HTMLDivElement]"){
		this.obj=[p];
	}else{
		this.obj=p!=undefined?this.sel(p):document;//selected object
	}
	this.setGlobalAnimate();
	this.serverPath="server.php";//global server path
	this.ver="1.000";
	this.buildDate="05.01.2014";
	this.about="JavaScript class with all the necessary components to create RIA";
	this.autor="Dusan Krstic";
};
fwDNK.prototype = {
	setGlobalAnimate:function(){
		var s=document.querySelector("[data-dnk-style]");
		if(s!=null){s.parentNode.removeChild(s);}		
		globalAnimate=document.createElement("style");
		globalAnimate.setAttribute("data-dnk-style","");
		globalAnimate.innerHTML="[dnk-animation]{-webkit-transition: all 0.2s ease;-moz-transition: all 0.2s ease;-o-transition: all 0.2s ease;-ms-transition: all 0.2s ease;transition: all 0.2s ease;}";
		document.body.appendChild(globalAnimate);
	},	
	swipedetect:function (callback){
		for (var i=0; i < this.obj.length; i++) {
		  this.swipedetectNode(this.obj[i],callback);
		};
	},
	swipedetectNode:function (el, callback){
		 var touchsurface = el,
		 swipedir,
		 startX,
		 startY,
		 distX,
		 distY,
		 threshold = 150, //required min distance traveled to be considered swipe
		 restraint = 100, // maximum distance allowed at the same time in perpendicular direction
		 allowedTime = 300, // maximum time allowed to travel that distance
		 elapsedTime,
		 startTime,
		 handleswipe = callback || function(swipedir){};
		
		 touchsurface.addEventListener('touchstart', function(e){
		  var touchobj = e.changedTouches[0];
		  swipedir = 'none';
		  dist = 0;
		  startX = touchobj.pageX;
		  startY = touchobj.pageY;
		  startTime = new Date().getTime(); // record time when finger first makes contact with surface
		  e.preventDefault();
		 }, false);
		
		 touchsurface.addEventListener('touchmove', function(e){
		  e.preventDefault(); // prevent scrolling when inside DIV
		 }, false);
		
		 touchsurface.addEventListener('touchend', function(e){
		  var touchobj = e.changedTouches[0];
		  distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
		  distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
		  elapsedTime = new Date().getTime() - startTime; // get time elapsed
		  if (elapsedTime <= allowedTime){ // first condition for awipe met
		   if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
		    swipedir = (distX < 0)? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
		   }else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
		    swipedir = (distY < 0)? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
		   };
		  };
		  handleswipe(swipedir);
		  e.preventDefault();
		 }, false);
	},
	sel:function(p){return !p.nodeType?document.querySelectorAll(p):p;},
	randomFromInterval:function(from,to){return Math.floor(Math.random()*(to-from+1)+from);},
	clone: function() {return this.obj[0].cloneNode(true);},
	remove:function(){if(this.obj==undefined){return false;};for (var i=0; i < this.obj.length; i++){if (this.obj[i].parentNode) {this.obj[i].parentNode.removeChild(this.obj[i]);}};},
	setStyle:function(spec){
		for (var i=0; i < this.obj.length; i++) {for(var n in spec) {this.obj[i].style[n] = spec[n];}};
		//ex fw(selector).setStyle({cssFloat : 'right', border : '2px solid black'});
	},
	bind:function (eventName,funct,multibind) {
	  var ele=this.obj;
	  multibind==undefined?this.unbind(ele,eventName):"";//remove all binds for specific event	  
	  for (var a=0; a < ele.length; a++) {
			var el=ele[a];
			if (el.attachEvent){
			    el[eventName+funct] = function(){funct(window.event);};el.attachEvent( 'on'+eventName, el[eventName+funct] );
			  } else {    
			    el.addEventListener(eventName, funct, false);
			  };
			  if(!el.eventHolder) el.eventHolder = [];
			  el.eventHolder[el.eventHolder.length] = new Array(eventName, funct);
		  };
	},
	removeEvent:function (obj, type, fn) {
	  if (obj.detachEvent) {
	    obj.detachEvent( 'on'+type, obj[type+fn] );obj[type+fn] = null;
	  } else {
	    obj.removeEventListener( type, fn, false );
	  };
	},
	unbind:function (ele, eventType) {
		for (var a=0; a < ele.length; a++) {
		    var el=ele[a];
			if (el.eventHolder) {  	
			    var removed = 0;
			    for (var i = 0; i < el.eventHolder.length; i++) {
			      if (el.eventHolder[i][0] == eventType) {                
			        this.removeEvent(el, eventType, el.eventHolder[i][1]);
			        el.eventHolder.splice(i, 1);
			        removed++;
			        i--;
			      };
			    };
			  };
		};
	},
	trigger:function(eventName) {for (var a=0; a < this.obj.length; a++) {this.triggerNode(this.obj[a], eventName);};},
	triggerNode:function(node, eventName) {
	  var doc;
	  if (node.ownerDocument) {
	    doc = node.ownerDocument;
	  } else if (node.nodeType == 9){
	    doc = node;
	  } else {
	    throw new Error("Invalid node passed to fireEvent: " + node.id);
	  }	
	  if (node.fireEvent) {
	    var event = doc.createEventObject();
	    event.synthetic = true; // allow detection of synthetic events
	    node.fireEvent("on" + eventName, event);
	  } else if (node.dispatchEvent) {
	    var eventClass = "";	
	    switch (eventName) {
	      case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
	      case "touchstart":
	      case "mousedown":
	      case "mouseup":
	        eventClass = "MouseEvents";
	        break;	
	      case "focus":
	      case "mouseout":
	      case "change":
	      case "keydown":
	      case "blur":
	      case "select":
	        eventClass = "HTMLEvents";
	        break;	
	      default:
	        throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
	        break;
	    };
	    var event = doc.createEvent(eventClass);
	    var bubbles = eventName == "change" ? false : true;  
	    event.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.	
	    event.synthetic = true; // allow detection of synthetic events
	    node.dispatchEvent(event);
	  };
	},
	json2send:function(p){//send JSON object 2 parameters
		var podaci=[];for (var i in p){podaci.push(i+"="+p[i]);};return podaci.join("&");
	},
	ajax:function(p,CallBack,errorCallBack){
		var obj=this;
		function ajaksKod(){
			p.Async = (p.Async == undefined ? true : p.Async);//ako nije definisan tip upita stavi na asinhrom
			p.Atype = (p.Atype == undefined ? "POST" : p.Atype);//ako nije definisan tip upita stavi na POST
			p.timeout = (p.timeout == undefined ? 30000: p.timeout);//ako nije definisan tip upita stavi na POST
			p.serverPath = (p.serverPath == undefined ? obj.serverPath: p.serverPath);//			
			var xmlhttp;
			if (window.XMLHttpRequest){// code za IE7+, Firefox, Chrome, Opera, Safari
				  xmlhttp=new XMLHttpRequest();
			}else{// code za IE6, IE5
				  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function(){
				  if(xmlhttp.readyState==4 && xmlhttp.status==200){
					CallBack(JSON.parse(xmlhttp.responseText));	 	
					return true;
				  }
				  obj.hideAjax();	 		  
			};
			var ts = "?"+Math.round((new Date()).getTime()/1000)+Math.floor(Math.random()*101);
			if(p.Atype=="GET"){
				xmlhttp.open(p.Atype,p.serverPath+"?"+obj.json2send(p),p.Async);
				xmlhttp.send();
			}else{
				xmlhttp.open(p.Atype,p.serverPath+ts,p.Async);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send(obj.json2send(p));
			}			
			var timeout = setTimeout( function () {  
	    		xmlhttp.abort(); // call error callback  
			}, p.timeout);
		}		
		if(p == undefined){return false;};		
		if(p.showLoading){
			obj.showAjax(p);setTimeout(function(){ajaksKod();},1000);
		}else{
			ajaksKod();
		}
		//ex $().ajax({serverPath:"server/server.php",sql:"SELECT * FROM nomenklatureZabrane ORDER BY id ASC",upit:"upit"},function(data){console.log(data)})	
	},
	loadJS:function(file,CallBack){
		if (window.XMLHttpRequest){// code za IE7+, Firefox, Chrome, Opera, Safari
			  var xmlhttp=new XMLHttpRequest();			  
		}else{// code za IE6, IE5
			  var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		};
		var ts = "?"+Math.round((new Date()).getTime()/1000);
		xmlhttp.open('GET', file+ts,true);
		xmlhttp.onload=function(){
			  if(xmlhttp.readyState==4 && xmlhttp.status==200){
					eval(xmlhttp.responseText);
					if(CallBack!=undefined)CallBack();			
			  };
		};
		xmlhttp.send();
		//ex $().loadJS("js/TweenMax.min.js",function(){console.log("Loaded")})
	},
	loadHTMLfile:function(file,CallBack){
		if (window.XMLHttpRequest){// code za IE7+, Firefox, Chrome, Opera, Safari
			  var xmlhttp=new XMLHttpRequest();			  
		}else{// code za IE6, IE5
			  var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		};
		var ts = "?"+Math.round((new Date()).getTime()/1000);
		xmlhttp.open('GET', file+ts,true);
		xmlhttp.onload=function(){
		  if(xmlhttp.readyState==4 && xmlhttp.status==200){
				CallBack(xmlhttp.responseText);			
		  };
		};
		xmlhttp.send();
		//ex $().loadHTMLfile("js/TweenMax.min.js",function(html){console.log("Loaded",html)})
	},
	hideAjax:function(){
		if(document.getElementById("ajaks")){
			document.getElementById("ajaks").style.visibility="hidden";
		}		
	},
	showAjax:function(p){
		var mess="Loading";
		var bkgr="#000";
		if(p!=undefined){
			bkgr=p.color==undefined?"#000":p.color;
			mess=p.mess==undefined?"Loading":p.mess;
		}
		if(document.getElementById("ajaks")==null){
			akaksStyle=document.createElement("style");			
			akaksStyle.innerHTML=".loader{text-align:center;position:fixed;top:25%;width:40%;left:30%;-webkit-transition:all .5s ease;-moz-transition:all .5s ease;-o-transition:all .5s ease;-ms-transition:all .5s ease;transition:all .5s ease}.loader b{position:absolute;top:0;left:0;width:100%;text-align:center;font-weight:bold;font-size:2em;color:white;text-shadow:0 5px 5px "+bkgr+";filter:dropshadow(color="+bkgr+",offx=0,offy=0)}.loader span{display:inline-block;vertical-align:middle;width:10px;height:10px;margin:50px auto;background:"+bkgr+";border-radius:50px;-webkit-animation:loader 1.2s infinite alternate;-moz-animation:loader 1.2s infinite alternate}.loader span:nth-of-type(2){-webkit-animation-delay:.3s;-moz-animation-delay:.3s}.loader span:nth-of-type(3){-webkit-animation-delay:.6s;-moz-animation-delay:.6s}.loader span:nth-of-type(4){-webkit-animation-delay:.9s;-moz-animation-delay:.9s}@-webkit-keyframes loader{0{width:10px;height:10px;opacity:.9;-webkit-transform:translateY(0)}100%{width:24px;height:24px;opacity:.1;-webkit-transform:translateY(-21px)}}@-moz-keyframes loader{0{width:10px;height:10px;opacity:.9;-moz-transform:translateY(0)}100%{width:24px;height:24px;opacity:.1;-moz-transform:translateY(-21px)}}.loader i{font-size:35px;display:inline-block;vertical-align:middle;-webkit-animation:hider .9s infinite alternate;-moz-animation:hider .9s infinite alternate}.loader i:nth-of-type(2){-webkit-animation-delay:.3s;-moz-animation-delay:.3s}.loader i:nth-of-type(3){-webkit-animation-delay:.6s;-moz-animation-delay:.6s}@-webkit-keyframes hider{0{opacity:.9}100%{opacity:.1}}@-moz-keyframes hider{0{opacity:.9}100%{opacity:.1}}";
			ajaks=document.createElement("div");
			ajaks.setAttribute("id","ajaks");
			ajaks.setAttribute("style","visibility:visible;");
			ajaks.innerHTML='<div class="loader"><span></span><span></span><span></span><span></span><b >'+mess+' <i class="tacka">.</i><i class="tacka">.</i><i class="tacka">.</i></b></div>';
			document.body.appendChild(akaksStyle);
			document.body.appendChild(ajaks);
		}else{
			document.getElementById("ajaks").style.visibility="visible";
		};
	},
	animateNode:function(obj,p){
		p.time=p.time+"s";		
		obj.style.webkitTransform="translate3d("+p.left+","+p.top+","+"0px"+")";
		obj.style.webkitTransition="all "+p.time+" ease";
		obj.style.MozTransform="translate3d("+p.left+","+p.top+","+"0px"+")";
		obj.style.MozTransition="all "+p.time+" ease";
		obj.style.OTransform="translate3d("+p.left+","+p.top+","+"0px"+")";
		obj.style.OTransition="all "+p.time+" ease";
		obj.style.msTransform="translate3d("+p.left+","+p.top+","+"0px"+")";
		obj.style.msTransition="all "+p.time+" ease";
	},
	animate:function(p){
		for (var a=0; a < this.obj.length;a++){
		  this.animateNode(this.obj[a],p);
		};
	},
	tween:function(p){
		if(p==undefined)return false;
		p.Ease=p.Ease==undefined?"regularEaseInOut":p.Ease;//regularEaseIn,regularEaseOut & regularEaseInOut
		p.param=p.param==undefined?"top":p.param;//top,left
		p.paramStart=p.paramStart==undefined?0:p.paramStart;//
		p.paramEnd=p.paramEnd==undefined?0:p.paramEnd;//
		p.duration=p.duration==undefined?1:p.duration;//
		p.paramUnit=p.paramUnit==undefined?"px":p.paramUnit;//px & %
		for (var i=0; i < this.obj.length; i++) {
		 var tw = new Tween(this.obj[i].style,p.param,Tween[p.Ease],p.paramStart,p.paramEnd,p.duration,p.paramUnit);
		 tw.start();
		};
		//ex $("div").tween({Ease:"regularEaseInOut",param:"top",paramStart:0,paramEnd:200})	
	},
	UNIXTime:function(){
		return Date.now();
	},
	rte:function(){
		for (var i=0; i < this.obj.length; i++) {
		  this.rteNode(this.obj[i]);
		};
	},
	rteNode:function(ele){
		obj=this;	
		id=ele.getAttribute("id")+"_"+this.UNIXTime();
		ph=ele.getAttribute("placeholder");
		w=ele.clientWidth;
		h=ele.clientHeight*1.5;
		ele.style.display='none';
		kom=document.createElement("div");
		kom.setAttribute("style","float:left;width:"+w+"px;height:23px;background:inherit;");
		ele.parentNode.appendChild(kom);
		k="<img style='float:left;' class=\"intLink\" title=\"Bold\" data-command='bold' src=\"data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAInhI+pa+H9mJy0LhdgtrxzDG5WGFVk6aXqyk6Y9kXvKKNuLbb6zgMFADs=\" />";
		k+="<img style='float:left;' class=\"intLink\" title=\"Italic\" data-command='italic' src=\"data:image/gif;base64,R0lGODlhFgAWAKEDAAAAAF9vj5WIbf///yH5BAEAAAMALAAAAAAWABYAAAIjnI+py+0Po5x0gXvruEKHrF2BB1YiCWgbMFIYpsbyTNd2UwAAOw==\" />";
		k+="<img style='float:left;' class=\"intLink\" title=\"Underline\" data-command='underline' src=\"data:image/gif;base64,R0lGODlhFgAWAKECAAAAAF9vj////////yH5BAEAAAIALAAAAAAWABYAAAIrlI+py+0Po5zUgAsEzvEeL4Ea15EiJJ5PSqJmuwKBEKgxVuXWtun+DwxCCgA7\" />";
		k+="<span class='fontDESC' style='font-size:small;margin-left:5px;font-weight:bold;cursor:pointer;'>A-</span><span class='fontASC' style='margin-left:5px;font-weight:bold;cursor:pointer;'>A+</span>";
		kom.innerHTML=k;
		dnk(kom.querySelectorAll("img")).bind("click",function(){
			pom=this.parentNode.parentNode.getElementsByTagName("textarea")[0].rte;
			pom.execCommand(this.getAttribute("data-command"),"","");
		});
		dnk(kom.querySelectorAll("span.fontDESC")[0]).bind("click",function(){
			pom=this.parentNode.parentNode.getElementsByTagName("textarea")[0].rte;
			if(pom.font==undefined){pom.font=2;}
			pom.font--;
			if(pom.font<1){pom.font=1;}
			pom.execCommand("fontsize","",pom.font);
		});
		dnk(kom.querySelectorAll("span.fontASC")[0]).bind("click",function(){
			pom=this.parentNode.parentNode.getElementsByTagName("textarea")[0].rte;
			if(pom.font==undefined){pom.font=2;}
			pom.font++;
			if(pom.font>10){pom.font=10;}
			pom.execCommand("fontsize","",pom.font);
		});
		iframe=document.createElement("iframe");	
		iframe.focus();
		ele.parentNode.appendChild(iframe);
		iframe.setAttribute("style","width:"+w+"px;height:"+h+"px;border:solid 1px silver;background:white;");		
		iframe.setAttribute("id",id);
		ele['rte'] = iframe.contentDocument || iframe.contentWindow.document;			
		var offset = document.body.scrollTop || 0;		
		ele.rte.designMode="on";		
		ele.rte.open();		
		ele.rte.write('<head><style type="text/css">body{ font-family:arial; font-size:13px;padding:2px;margin:0px; }</style> </head>');
		ele.rte.close();		
		if(document.location.toString().match(/#(top)?$/)) {//fix za scroll na hromu
		    iframe.contentWindow.document.body.scrollTop = 0;
		    document.body.scrollTop = offset;
		}			
		ele.rte.body.innerHTML=ph;		
		dnk.bind(ele.rte.body,"blur",function(){ele.value=ele.rte.body.innerHTML;});		
		ele.reload=function(){this.rte.body.innerHTML=this.value;};
		return true;		
	},
	rteEdit:function(textEditor,x,y){
   			textEditor.document.execCommand(x,"",y);
	},
	autoComplete:function(p){
		p.size=p.size==undefined?5:p.size;
		p.width=p.width==undefined?0:p.width;
		p.position=p.position==undefined?"bottom":p.position;
		var wrap=document.createElement("div");
		wrap.className="autoCompleteWrap";
		wrap.style=this.obj[0].style;
		wrap.style.width=this.obj[0].clientWidth+parseInt(this.obj[0].style.borderLeftWidth)+parseInt(this.obj[0].style.borderRightWidth)+"px";
		wrap.style.height=this.obj[0].clientHeight+parseInt(this.obj[0].style.borderTopWidth)+parseInt(this.obj[0].style.borderBottomWidth)+"px";
		wrap.style.cssFloat=this.obj[0].style.cssFloat;
		var cl=this.clone();
		wrap.appendChild(cl);
		var sel=document.createElement("select");
		sel.setAttribute("size",p.size);
		sel.style=this.obj[0].style;
		sel.style.width=p.width+this.obj[0].clientWidth+parseInt(this.obj[0].style.borderLeftWidth)+parseInt(this.obj[0].style.borderRightWidth)+"px";
		sel.style.height=p.size*(this.obj[0].clientHeight+parseInt(this.obj[0].style.borderTopWidth)+parseInt(this.obj[0].style.borderBottomWidth))+"px";
		sel.style.visibility="hidden";
		if(p.position=='top'){
			sel.style.marginTop=-1*((p.size+1)*(this.obj[0].clientHeight+parseInt(this.obj[0].style.borderTopWidth)+parseInt(this.obj[0].style.borderBottomWidth)))+"px";
		}
		wrap.appendChild(sel);
		this.obj[0].parentNode.replaceChild(wrap, this.obj[0]);		
		cl.onkeydown=function(e){
			if(e.keyCode==40 || e.keyCode==38){
				sel.focus();
				sel.querySelector("option").selected=true;				
			}else if(e.keyCode==13 || e.keyCode==9){
				p.callBack(this.value);
			}else{
				setTimeout(function(){
					sel.style.visibility="visible";
					searchByValue(sel,cl.value,p);
				},1);
			}			
		};		
		sel.onkeydown=function(e){
			setTimeout(function(){
				cl.value=sel.querySelector("option:checked").value;
				if(e.keyCode==13){
					sel.querySelector("option:checked").onclick();
				}
			},1);			
		};
			
		function searchByValue(sel,word,p){
			sel.innerHTML="";
			var associativeArray={};
			for (var i=0; i < p.data.length; i++) {
			  associativeArray[i]=p.data[i][p.val];
			};	
			var pod = Object.keys(associativeArray).filter(function(key) {
				if(associativeArray[key].toUpperCase().split(word.toUpperCase()).length>1){return associativeArray[key];};
			});
			for (var i=0; i < pod.length; i++) {
			  var op=document.createElement("option");
			  op.innerHTML=p.data[pod[i]][p.val];
			  op.setAttribute("value",p.data[pod[i]][p.val]);
			  op.setAttribute("data-id",p.data[pod[i]][p.key]);			  
			  sel.appendChild(op);
			  op.onclick=function(){
			  	cl.value=this.value;
			  	cl.setAttribute("data-id",this.getAttribute("data-id"));
			  	sel.style.visibility="hidden";
			  	cl.focus();
			  };
			};		
		}		
		//ex: $().ajax({serverPath:"server/server.php",sql:"SELECT * FROM nomenklatureZabrane ORDER BY id ASC",upit:"upit",showLoading:true,mess:"AHA2"},function(data){$("input#auto").autoComplete({data:data,key:"id",val:"dijagnoza",width:200,callBack:function(val){console.log(val)}})})
	},
	dialog:function(p){
		p        = p==undefined?{}:p;
		p.width  = p.width==undefined?"200px":p.width;
		p.height = p.height==undefined?"200px":p.height;
		p.title  = p.title==undefined?"title":title;
		p.content= p.content==undefined?"p.content":p.content;		
		p.timeout= p.timeout==undefined?2000:p.timeout;
		p.modal  = p.modal==undefined?false:p.modal;
		p.onStart= p.onStart==undefined?function(p){}:p.onStart;
		p.icon   = p.icon==undefined?"data:image/png;base64,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":p.icon;
		//console.log(p);
		var modal=document.createElement("div");
		document.body.appendChild(modal);
		modal.className="modal";
		dnk(modal).setStyle({
				width:window.innerWidth+"px",
				height:window.innerHeight+"px",
				top:"0px",
				left:"0px",
				position : 'fixed'
			});
		if(p.modal){						
			dnk(modal).setStyle({
				backgroundImage:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB90IAg4lFAC6D4sAAAANSURBVAjXY/j461cHAAkzA24onMlLAAAAAElFTkSuQmCC)'
			});			
		}
		var container=document.createElement("div");
		modal.appendChild(container);
		container.setAttribute('dnk-container');
		container.setAttribute("dnk-animation","true");		
		var tm=(window.innerHeight-parseInt(p.height)-2)/2;
		dnk(container).setStyle({
				width:p.width,
				height:p.height,
				margin:" 0 auto",
				marginTop:tm+"px",
				padding:"1px",
				position:"relative",
				transform:"scale(0,0)",
				msTransform:"scale(0,0)",
				webkitTransform:"scale(0,0)"
			});
		var title=document.createElement("div");
		title.setAttribute('dnk-title');
		title.setAttribute("style","float:left;width:100%;height:25px;");
		container.appendChild(title);
		var content=document.createElement("div");
		content.setAttribute("style","float:left;margin-top:1px;padding:5px; width:calc(100% - 10px);height:calc(100% - 35px);");
		content.setAttribute('dnk-content');
		p.content.nodeType?content.appendChild(p.content):content.innerHTML=p.content;	
		container.appendChild(content);
		var close=document.createElement("div");
		close.className="close";
		dnk(close).setStyle({
			width:"20px",
			height:"20px",
			cssFloat:"right",
			marginRight:"-10px",
			marginTop:"-10px",
			backgroundImage:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90JEA0fMjIoXPIAAAEFSURBVEjHvZbdDcMgDISvnYAR2MAdgQ0YgY6U0TpCOoHZwH0xCm0h5Ke1JT8EJXy6i8G+YHt4TafPGcCseTo8gEk3k07O+o4/AnD6sezMqVI8jBuAxwFIyYfuMYTkE5CSeQ3mTippKWvaOP0QUv+zr+rqfhBjFCL6WiciiTGOYH6TmpSSiIgw8xuMiISZRUQkpbRZ1dxTUkeB1ZASK8rmoW2tDZm5uday9tO+sOZxC7YTIsrAfVQ9PdhGiAAIVz1cJmFmnUkxXLX8ns0e4T2cW26RnDNCCAghIOfFceccvO92iWdd4mYH1uwKMrtUTduEWeMzbeWmw8lfxq3LgQGyKN41QL4AjW5/feOluPUAAAAASUVORK5CYII=)",
			backgroundSize:"cover"
		});
		var titleSpan=document.createElement("span");
		dnk(titleSpan).setStyle({
			width:"calc(100% - 37px)",
			cssFloat:"left",
			marginLeft:"5px",
			marginTop:"5px"
		});
		titleSpan.innerHTML=p.title;
		var icon=document.createElement("div");
		dnk(icon).setStyle({
			width:"15px",
			height:"15px",
			cssFloat:"left",
			marginTop:"5px",
			marginLeft:"5px",
			backgroundImage:"url("+p.icon+")",
			backgroundSize:"cover",
		});
		title.appendChild(icon);
		title.appendChild(titleSpan);
		title.appendChild(close);
		close.onclick=function(){dnk(this.parentNode.parentNode).dialogClose();};		
		setTimeout(function(){
			dnk(container).setStyle({
				transform:"scale(1,1)",
				msTransform:"scale(1,1)",
				webkitTransform:"scale(1,1)"
			});
		},50);
		
		if(p.buttons!=undefined){
			// example $().dialog({icon:"http://wardley.org/images/graphics/abwlogo/2kicons/blue/dot.png",buttons:{Naslov:{onmouseover:function(){console.log(this)},onclick:function(){alert('a')}},Odustajem:{onclick:function(){this.dialogClose()}}}})
			var hr=document.createElement("hr");
			hr.setAttribute("style","margin-bottom: 1px;");
			var wrap=document.createElement("div");
			wrap.setAttribute('dnk-wrap-button');
			wrap.setAttribute("style","width:98%;padding:1%;text-align:right;position:absolute;bottom:0px;");			
			dnk(content).setStyle({height:"calc(100% - 80px)"});		
			wrap.appendChild(hr);
			container.appendChild(wrap);
			var but=p.buttons;
			for(var key in but){
				var dug=document.createElement("button");				
				dug.setAttribute('dnk-button');
				dug.innerHTML=key;
				var param=but[key];
				for(var pkey in param){dug[pkey]=param[pkey];}
				wrap.appendChild(dug);
			}
		}
		return container;
	},
	dialogClose:function(){
		var o=this;
		var stil=o.obj[0].getAttribute("style");
		var time="0.3s";
		dnk(o.obj[0]).setStyle({
			transform:"scale(0,0)",
			msTransform:"scale(0,0)",
			webkitTransform:"scale(0,0)"
		});
		setTimeout(function(){
			dnk(o.obj[0].parentNode).remove();
		},305);		
	},
	dialogCloseAll:function(p){
		var d=document.querySelectorAll("div.dialog-container");
		for (var i=d.length-1; i >=0 ; i--) {
		  dnk(d[i]).dialogClose();
		};
	},
	// VALIDATORS
	onlyNumbersNode:function(ele,p){		
		p          = p==undefined?{}:p;
		p.l      = p.len==undefined?1000:p.len;
		p.callBack = p.callBack==undefined?function(){}:p.callBack;
		ele.onkeypress=function(evt) {
		    evt = (evt) ? evt : window.event;
		    var charCode = (evt.which) ? evt.which : evt.keyCode;
		    var t=this;
		    var v;
		    setTimeout(function(){
		    	v=t.value;v=v.length;
		    	vr=t.value;
		    	v>p.l?t.value=vr.substring(0, vr.length - 1):t.value=vr;
		    	v==p.l?p.callBack():true;
		    },1);		    
		    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode!=44 && charCode!=45) {		       
		        return false;
		    };
		    return true;
		};
	},
	onlyNumbers:function(p){//ex: $("input[type='text']").onlyNumbers({len:2,callBack:function(){console.log(this)}})
		for (var a=0; a < this.obj.length;a++){
		  dnk().onlyNumbersNode(this.obj[a],p);
		};
	},
	onlyLetterNode:function(ele,p){
		p          = p==undefined?{}:p;
		p.l      = p.len==undefined?1000:p.len;
		p.callBack = p.callBack==undefined?function(){}:p.callBack;
		
		ele.onkeypress=function(evt){
        	var keyCode = (evt.which) ? evt.which : evt.keyCode;
    		if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)return false;
            return true;
    	};
	},
	onlyLetter:function(p){//ex:
		for (var a=0; a < this.obj.length;a++){
		  dnk().onlyLetterNode(this.obj[a],p);
		};
	},
};
/*
 * 
 * 
 * 
 * 
 * 
 * 
 */
function cb(){};
HTMLElement.prototype.dialogClose = function(){dnk(this.parentNode.parentNode).dialogClose();};
HTMLElement.prototype.isVisible = function(){
	function getPositionTop(element){var offset = 0;while(element) {offset += element["offsetTop"];element = element.offsetParent;}return offset;}
    var posTop = getPositionTop(this);
    var posBottom = posTop + this.offsetHeight;
    var visibleTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var visibleBottom = visibleTop + document.documentElement.offsetHeight;
    return ((posBottom >= visibleTop) && (posTop <= visibleBottom));
};
$=function (p){return new fwDNK(p,cb);};
