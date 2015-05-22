(function(){
var p=P('np.c'),
__ud=window.UD||O;
p._$UD=__ud;
p._$ISLOGIN=!!__ud.isLogin;
p._$ISEDIT=!!__ud.editable;
p._$GROUP=U._$getGValue('GROUP');
})();
(function(){
J._$registXDomain('blog.163.com');
})();
P('EJ');
(function(){
var __pool={},
__timeout=60000;
var __clear=function(_sn){
var _req=__pool[_sn];
if(!_req)return;
delete __pool[_sn];
var _rpc=_req.rpc;
delete _req.rpc;
_req.timer=window.clearTimeout(_req.timer);
V._$clearEvent(_rpc);
E._$removeElement(_rpc);
};
var __onLoad=function(_sn){
if(!__pool[_sn])return;
var _load=__pool[_sn].onload;
__clear(_sn);_load();
};
var __onError=function(_sn,_message){
var _error=__pool[_sn].onerror;
__clear(_sn);_error(_message||'脚本加载出错！');
};
EJ._$loadScript=function(_url,_onload,_onerror,_charset){
var _sn=_url;
if(!__pool[_sn]){
var _script=document.cloneElement('script');
if(!!_charset)
_script.charset=_charset;
__pool[_sn]={
rpc:_script,
onload:_onload,
onerror:_onerror?_onerror:_onload,
timer:window.setTimeout(__onError._$bind(window,_sn,'请求超时！'),__timeout)
};
V._$addEvent(_script,'load',__onLoad._$bind(window,_sn));
V._$addEvent(_script,'error',__onError._$bind(window,_sn,'无法加载指定的脚本文件！'));
_script.src=_url;
document.head.appendChild(_script);
}
return __pool[_sn].rpc;
};
})();
(function(){
var c=P('U.cls');
c._$augment=function(_des,_src,_flag){
if(!c._$isClass(_des)||!c._$isClass(_src))
return;
var _key,_p,_pro=_src.prototype;
for(_key in _pro){
_p=_pro[_key];
if(U.fun._$isFunction(_p))
_des.prototype[_key]=_p;
}
_flag&&U.obj._$extend(_des,_src,U.fun._$isFunction);
};
c._$isClass=function(_obj){
return U.fun._$isFunction(_obj);
};
})();
(function(){
var o=P('U.obj');
o.__pool={};
o._$isObject=function(_obj){
return _obj&&/(?:\bobject\b|\bfunction\b)/i.test(typeof _obj);
};
o._$extend=function(_des,_src,_factor){
_des=_des||O;
if(_src)
for(var _p in _src)
if(!_factor||_factor&&_factor(_src[_p]))
_des[_p]=_src[_p];
return _des;
};
o._$clone=function(_obj){
var _f=function(){
};
_f.prototype=_obj;
return new _f();
};
o._$toArray=function(_obj){
if(U.arr._$isArray(_obj))
return _obj;
var _arr=[];
if(o._$isObject(_obj)){
var _p,_v;
for(_p in _obj){
_v=_obj[_p];
!U.fun._$isFunction(_v)&&_arr.push(_v);
}
}
return _arr;
};
o._$toArray2=function(_obj){
if(U.arr._$isArray(_obj)){
return _obj;
}
if(_obj&&'length'in _obj){
var _array=[];
for(var i=0,_size=_obj.length;i<_size;i++){
_obj[i]&&_array.push(_obj[i]);
}
return _array;
}
};
o._$delete=function(_obj,_pro){
if(!_obj||!_pro)
return;
try{
_obj[_pro]=undefined;
delete _obj[_pro];
}
catch(e){
_obj[_pro]=undefined;
}
};
o._$toHash=function(_obj){
var _str=U._$serialize(_obj);
_str=_str.replace(/:/g,'=').replace(/,/g,'&').replace(/\'/g,'');
if(_str)
_str=_str.replace(/^{/,'#').replace(/}$/,'');
return _str;
};
o._$isUndefined=function(_obj){
return typeof _obj==='undefined';
};
o._$setData=function(_key,_data){
this.__pool[_key]=_data;
};
o._$getData=function(_key){
return this.__pool[_key];
};
})();
(function(){
var a=P('U.arr');
a._$isArray=function(_obj){
return Object.prototype.toString.call(_obj)==='[object Array]';
};
a._$forEach=function(_arr,_fn){
if(!a._$isArray(_arr)||!U.fun._$isFunction(_fn))
return;
if(_arr.forEach)
_arr.forEach(_fn);
else
for(var i=0,_tmp;_tmp=_arr[i];i++)
_fn(_tmp,i);
};
a._$filter=function(_arr,_factor){
var _res=[];
if(!a._$isArray(_arr)||!U.fun._$isFunction(_factor))
return _res;
if(_arr.filter)
_res=_arr.filter(_factor);
else
for(var i=0,_tmp;_tmp=_arr[i];i++)
_factor(_tmp)&&_res.push(_tmp);
return _res;
};
a._$indexOf=function(_arr,_o,_flag){
if(U.arr._$isArray(_arr)){
if(_arr.indexOf&&(_flag||!U.fun._$isFunction(_o)))
return _arr.indexOf(_o);
else{
for(var i=0,_l=_arr.length,_a;i<_l;i++){
_a=_arr[i];
if(!_flag&&U.fun._$isFunction(_o)&&_o(_a))
return i;
else
if(_a==_o)
return i;
}
return-1;
}
}
};
a._$toObject=function(_arr,_attr,_cb){
var _obj={};
if(a._$isArray(_arr)&&_attr){
for(var i=0,_l=_arr.length,_tmp;i<_l;i++){
_tmp=_arr[i];
if(a._$isArray(_tmp))
_obj=U.obj._$extend(_obj,a._$toObject(_tmp,_attr));
else
if(U.obj._$isObject(_tmp)){
_cb&&_cb(_tmp,i);
_obj[_tmp[_attr]]=_tmp;
}
}
}
return _obj;
};
a._$every=function(_arr,_fun){
if(a._$isArray(_arr)&&U.fun._$isFunction(_fun)){
for(var i=0,_l=_arr.length;i<_l;i++){
if(!_fun(_arr[i]))
return false;
}
}
return true;
};
a._$erase=function(_arr,_item){
for(var i=_arr.length;i--;_arr[i]===_item&&_arr.splice(i,1))
;
return _arr;
};
a._$unique=function(_source,_fun){
var _len=_source.length,_result=_source.slice(0),i,_tmp;
if(!U.fun._$isFunction(_fun)){
_fun=function(itm0,itm1){
return itm0===itm1;
};
}
while(--_len>0){
_tmp=_result[_len];
i=_len;
while(i--){
if(_fun(_tmp,_result[i])){
_result.splice(_len,1);
break;
}
}
}
return _result;
};
})();
(function(){
var f=P('U.fun');
f._$isFunction=function(_obj){
return/\bfunction\b/i.test(Object.prototype.toString.call(_obj));
};
f._$getPassportUserImage=function(_name,_type){
return'http://os.blog.163.com/common/ava.s?passport='+_name+'&b='+(_type||0);
};
f._$getAvaImg=function(_userName,_type){
var _userName=!!_userName&&U.str._$trim(_userName.toString())||'',_str='http://r.ph.126.net/image/default/duser.png',_tag=1;
if(!!_userName){
if(_userName.indexOf('http://')===0){
return _userName;
}
else{
switch(_tag){
case 1:
_str='http://ava.ph.126.net/'+_userName+((_type===1)?'/140x140x0x85.jpg':'/60x60x0x85.jpg');
break;
case 2:
_userName=U._$getFullName(_userName);
_str='http://os.blog.163.com/common/ava.s?passport='+_userName+'&b='+(_type||0);
break;
default:
_userName=U._$getFullName(_userName);
_str='http://os.blog.163.com/common/ava.s?passport='+_userName+'&b='+(_type||0);
break;
};
}
}
!_str&&_type===1&&(_str='http://r.ph.126.net/image/default/duser140.png');
return _str;
};
f._$getHostDynamicUrl=function(_domainName,_userName){
if(_domainName)
return"http://"+_domainName+".pp.163.com";
else
return location.pr+"/"+_userName+"/home";
};
f._$getUserDynamicUrl=function(_userName,_domain,_domainBefore){
if(_domain&&_domain!=""){
if(_domainBefore){
return"http://"+_domain+".pp.163.com";
}
else{
return location.p+"/"+_domain;
}
}
else{
return location.r+"/"+_userName;
}
}
f._$getUserHomeUrl=function(_userName,_domain){
if(_domain&&_domain!=""){
return"http://"+_domain+".pp.163.com";
}
else{
return location.r+"/"+_userName+"/home";
}
}
f._$getShareSetUrl=function(_op){
var _url=location.p+'/pp/';
_op=_op||{};
_op.domainName=_op.domainName&&_op.domainName.toString()||'';
if((!_op.userName&&!_op.domainName)||!_op.setId){
return _url;
}
if(!!_op.domainName){
_url=location.p+'/'+_op.domainName+'/pp/'+_op.setId+'.html';
}else{
_url=location.r+'/'+_op.userName+'/pp/'+_op.setId+'.html';
}
return _url;
}
f._$getUserAlbumUrl=function(_userName,_domain){
return location.r+"/"+_userName;
}
f._$getShareSetPath=function(_postStyle,_setId){
return"pp/"+_setId+".html";
};
f._$getShareSetPicturePath=function(_postStyle,_setId,_pictureId){
_postStyle=_postStyle||0;
return"pp/"+_setId+".html#pid="+_pictureId;
};
f._$getCompressUrl=function(url,compressParam){
return"http://imgsize.ph.126.net/?imgurl="+url+"_"+compressParam+".jpg";
};
})();
(function(){
var s=P('U.str');
s._$isString=function(_obj){
return typeof _obj==='string';
};
s._$isUrl=function(_str){
if(!s._$isString(_str))
return false;
return U.reg._$getRegex('url').test(_str);
};
s._$getLength=function(_str){
_str=_str||'';
for(var i=0,_len=0,_l=_str.length;i<_l;i++)
_len+=_str.charCodeAt(i)>255?2:1;
return _len;
};
s._$truncate=function(_str,_length,_flag){
_str=_str||'';
if(_length==undefined){
return _str;
}
for(var i=0,_len=0,_l=_str.length;i<_l;i++){
_len+=_str.charCodeAt(i)>255?2:1;
if(_len>_length)
break;
}
var _ret=_str.slice(0,i);
return i<_str.length&&!_flag?_ret+'...':_ret;
};
s._$trim=function(_str){
_str=_str||'';
if(_str.trim)
return _str.trim();
return _str.replace(U.reg._$getRegex('REG_TRIM_SPACE'),'');
};
s._$trimsc=function(_str){
return this._$trim(_str).replace(U.reg._$getRegex('REG_TRIM_SEMICOLON'),'');
};
s._$toHash=function(_hashStr){
if(!s._$isString(_hashStr))
return{};
return s._$toHash2(_hashStr);
};
s._$toHash2=function(_str){
if(!_str){
return{};
}
var _obj={},_i=0;
_str.replace(/(\w+)(?:=+)([-\w,|]+)+&*/g,function($1,$2,$3){
if($2!==''){
if(!isNaN($3)){
$3=parseInt($3);
}
_obj[$2]=$3;
_i++;
}
});
if(_i>0){
return _obj
}else{
return{};
}
};
s._$include=function(_str,_pattern){
return _str.indexOf(_pattern)>-1;
};
s._$camelize=function(_str){
return _str.replace(/-([a-z])/ig,function(_all,_letter){
return _letter.toUpperCase();
});
};
s._$fixString=function(_elm,_str,_maxwidth,_suffix,_lines){
_elm=E._$getElement(_elm);
if(!_elm||!U._$trim(_str))
return;
var k=s._$calString(_elm,_str,_maxwidth,_suffix);
if(k!==-1)
_elm.innerText=_str.substring(0,k||0)+_suffix;
else
_elm.innerText=_str;
};
s._$calString=function(_elm,_str,_maxwidth,_suffix){
var _tmpArray=new Array(257);
_elm.innerText='中中中中中中中中中中';
_tmpArray[256]=_elm.offsetWidth/10;
for(var i=32;i<256;++i){
_elm.innerText='中'+String.fromCharCode(i)+'中';
_tmpArray[i]=_elm.offsetWidth-2*_tmpArray[256];
}
var k,_width=0,_suffixWidth;
_elm.innerText=_suffix||'';
_suffixWidth=_elm.offsetWidth;
for(var i=0,l=_str.length;i<l;++i){
var _code=_str.charCodeAt(i),_charWidth=(_code>255?_tmpArray[256]:_tmpArray[_code]||0);
if(k===undefined&&
_charWidth+_width+_suffixWidth>_maxwidth)
k=i;
_width+=_charWidth;
if(_width>_maxwidth)
break;
}
return _width>_maxwidth?k||0:-1;
};
})();
(function(){
var d=P('U.dom');
d._$isSupportTransition=('transition'in document.documentElement.style)
||('webkitTransition'in document.documentElement.style)
||('MozTransition'in document.documentElement.style)
||('MsTransition'in document.documentElement.style)
||('OTransition'in document.documentElement.style);
d._$getElement=function(_obj){
return(_obj&&_obj._$getBody&&_obj._$getBody())||E._$getElement(_obj);
};
d._$emptyElement=function(_elm){
_elm=E._$getElement(_elm);
var _nd;
while(_nd=_elm&&_elm.firstChild)
E._$removeElement(_nd);
};
d._$getValueOfRadio=function(_rds){
_rds=_rds.length?_rds:[_rds];
for(var i=0,_rd;_rd=_rds[i];i++)
if(_rd&&_rd.checked)
return _rd.value;
};
d._$getValueOfText=function(_txt,_hint){
_hint=_hint||'';
var _v=_txt&&_txt.value;
_v=_v||'';
return U._$trim(_v)==_hint?'':_v;
};
d._$isText=function(_elm){
return _elm&&(_elm.tagName.toLowerCase()=='textarea'||(_elm.type&&_elm.type.toLowerCase()=='text'||_elm.type.toLowerCase()=='password'));
};
d._$addTextHint=function(_txt,_hint){
var _arg0=_txt;
if(U.arr._$isArray(_arg0)){
for(var i=0,_a;_a=_arg0[i];i++)
d._$addTextHint(_a,_hint);
}
else
if(d._$isText(_txt)&&_hint){
_txt.value=_hint;
V._$addEvent(_txt,'focus',d.__onFocusText._$bind(d,_txt,_hint));
V._$addEvent(_txt,'blur',d.__onBlurText._$bind(d,_txt,_hint));
}
};
d.__onFocusText=function(_txt,_hint){
if(!_txt||!_hint)
return;
if(_txt.value==_hint)
_txt.value='';
};
d.__onBlurText=function(_txt,_hint){
if(!_txt||!_hint)
return;
if(_txt.value=='')
_txt.value=_hint;
};
d._$addTextChange=function(_txt,_handler){
if(d._$isText(_txt)&&U.fun._$isFunction(_handler)){
V._$addEvent(_txt,'propertychange',_handler);
if(B._$ISFF){
V._$addEvent(_txt,'paste',_handler);
V._$addEvent(_txt,'cut',_handler);
}
}
};
d._$textFocus=function(_txt){
if(d._$isText(_txt)){
_txt.focus();
if(B._$ISIE){
var _range=_txt.createTextRange();
_range.collapse(false);
_range.select();
}
}
};
d._$isAncestor=function(_p,_c){
var _p=E._$getElement(_p),_c=E._$getElement(_c),_result=false;
if((_p&&_c)&&(_p.nodeType&&_c.nodeType))
_result=_p.contains?_p.contains(_c):!!(_p.compareDocumentPosition(_c)&16);
return _result;
};
d._$getRelatedTarget=function(_event){
var _t=_event.relatedTarget;
if(!_t){
if(_event.type=="mouseout")
_t=_event.toElement;
else
if(_event.type=="mouseover")
_t=_event.fromElement;
}
return d.__resolveTextNode(_t);
};
d.__resolveTextNode=function(_elm){
try{
if(_elm&&3==_elm.nodeType)
return _elm.parentNode;
}
catch(e){
}
return _elm;
};
d._$scrollTo=function(_elm){
var _body=document.documentElement||document.body,
_filter=_elm==_body;
scrollTo(E._$offsetX(_elm,_filter)||0,E._$offsetY(_elm,_filter)||0);
};
d._$animateScrollTo=function(_elm){
var _filter=true;
_x=E._$offsetX(_elm||_filter)||0,_y=E._$offsetY(_elm||_filter)||0,_top=U.dom._$scrollTop();
this.__sitv=setInterval(function(){
if(_top>=_y){
_top-=20;
scrollTo(0,_top);
}
else
this.__sitv&&clearInterval(this.__sitv);
}
._$bind(this),10);
};
d._$initAnchor=function(_elm,_opt){
_elm=E._$getElement(_elm),_opt=_opt||O;
if(_elm){
var _tagName=_elm.tagName.toLowerCase();
if(_elm.getAttribute('needlogin')=='true'||_elm.getAttribute('data-needlogin')=='true')
V._$addEvent(_elm,'click',d.__onClickNeedLogin._$bind(d,_opt));
else{
var _as=_elm.getElementsByTagName('a');
for(var i=0,_a;_a=_as[i];i++)
if(_a.getAttribute('needlogin')=='true')
V._$addEvent(_a,'click',d.__onClickNeedLogin._$bind(d,_opt));
}
}
};
d.__onClickNeedLogin=function(_opt,_event){
V._$stopDefault(_event);
var _anchor=V._$getElement(_event),
_href=_anchor.getAttribute('data-href'),
_opt=_opt||O;
P.ui._$$QLogin._$getInstance({
classname:'lay-login'
})._$reset({
returnUrl:_href
})._$show()._$focus();
};
d._$setMaxLength=function(_txt){
if(!d._$isText(_txt))
return;
if(_txt.onpropertychange===undefined)
V._$addEvent(_txt,'input',d.__checkLength._$bind(d,_txt));
else
_txt.onpropertychange=d.__checkLength._$bind(d,_txt);
};
d.__checkLength=function(_txt){
var _maxLength=parseInt(_txt.getAttribute('maxlength'));
if(!_maxLength)
return;
if(_txt.value.length>_maxLength)
_txt.value=_txt.value.slice(0,_maxLength);
};
d._$hoverElement=function(_elm,_class){
if(!B._$ISOLDIE){
return;
}
_elm=E._$getElement(_elm);
if(!_elm){
return;
}
_class=_class||'js-hover';
_elm.fnMouseenter=E._$addClassName._$bind(E,_elm,_class);
_elm.fnMouseleave=E._$delClassName._$bind(E,_elm,_class);
V._$addEvent(_elm,'mouseenter',_elm.fnMouseenter);
V._$addEvent(_elm,'mouseleave',_elm.fnMouseleave);
};
d._$delHoverElement=function(_elm){
if(!B._$ISOLDIE){
return;
}
_elm=E._$getElement(_elm);
if(!_elm){
return;
}
_elm.fnMouseenter&&V._$delEvent(_elm,'mouseenter',_elm.fnMouseenter);
_elm.fnMouseleave&&V._$delEvent(_elm,'mouseleave',_elm.fnMouseleave);
_elm.fnMouseleave=_elm.fnMouseenter=null;
};
d._$clientWidth=function(){
return document.documentElement.clientWidth||document.body.clientWidth;
};
d._$clientHeight=function(){
return document.documentElement.clientHeight||document.body.clientHeight;
};
d._$scrollLeft=function(){
return document.documentElement.scrollLeft||document.body.scrollLeft;
};
d._$scrollTop=function(){
return document.documentElement.scrollTop||document.body.scrollTop;
};
d._$getStyle=function(_elm,_name){
_elm=E._$getElement(_elm);
if(!_elm)
return;
if(!!document.defaultView){
var _style=document.defaultView.getComputedStyle(_elm,null);
return _name in _style?_style[_name]:_style.getPropertyValue(_name);
}
else{
var _style=_elm.currentStyle;
if(_name=='opacity'){
if(/alpha\(opacity=(.*)\)/i.test(_style.filter)){
var _opacity=parseFloat(RegExp.$1);
return _opacity?_opacity/100:0;
}
return 1;
};
_name=='float'&&
(_name='styleFloat');
var _ret=_style[_name]||_style[U.str._$camelize(_name)];
if(!/^\-?\d+(px)?$/i.test(_ret)&&/^\-?\d/.test(_ret)){
var _style=_elm.style,_left=_style.left,_rsLeft=_elm.runtimeStyle.left;
_elm.runtimeStyle.left=_elm.currentStyle.left;
_style.left=_ret||0;
_ret=_style.pixelLeft+'px';
_style.left=_left;
_elm.runtimeStyle.left=_rsLeft;
}
return _ret;
}
};
d._$setStyle=function(_elm,_styles){
_elm=E._$getElement(_elm);
if(!_elm)
return;
var _style=_elm.style,match;
if(U.str._$isString(_styles)){
_elm.style.cssText+=';'+_styles;
return U.str._$include(_styles,'opacity')?d._$setOpacity(_elm,_styles.match(/opacity:\s*(\d?\.?\d*)/)[1]):_elm;
}
for(var _prop in _styles)
if(_prop=='opacity')
d._$setOpacity(_styles[_prop]);
else
_style[(_prop=='float'||_prop=='cssFloat')?(U.obj._$isUndefined(_style.styleFloat)?'cssFloat':'styleFloat'):_prop]=_styles[_prop];
return _elm;
};
d._$setOpacity=function(_elm,_value){
_elm=E._$getElement(_elm);
_elm.style.opacity=(_value==1||_value==='')?'':(_value<0.00001)?0:_value;
return _elm;
};
d._$setText=function(_elms,_value){
if(U.arr._$isArray(_elms)){
for(var i=0,_a;_a=_elms[i];i++)
d._$setText(_a,_value);
}
else
if(U.str._$isString(_value))
_elms.innerText=_value;
};
d._$toggle=function(_elm,_class){
E._$hasClassName(_elm,_class)?E._$delClassName(_elm,_class):E._$addClassName(_elm,_class);
};
d._$toggleBtn=function(_elm,_disabled,_class){
_elm.disabled=_disabled;
_disabled?E._$addClassName(_elm,_class):E._$delClassName(_elm,_class);
};
d._$enableBtn=function(_elm,_class){
_elm.disabled=false;
E._$delClassName(_elm,_class);
};
d._$disableBtn=function(_elm,_class){
_elm.disabled=true;
E._$addClassName(_elm,_class);
};
d._$onImgError=function(_event,_default){
var _element=V._$getElement(_event);
if(!_element||_element.tagName!='IMG'||
!_default||
_element.src==_default)
return;
_element.src=_default;
};
d._$showRank=(function(_data){
var __hasPushRankStyle=false
,_rankIntroURL='http://pp.163.com/pp/levelintro/'
,_fun;
_fun=function(_data){
var _get=E._$getElement
,_rankTemplate=E._$addHtmlTemplate('{if rankData.isVip || rankData.showRank}<span {if rankData.style}style="${rankData.style}"{/if}>{if rankData.showRank}<a href="${rankData.rankIntroURL}" title="${rankData.rank}级拍客" class="w-rankP w-rankP${rankData.rank}" target="_blank" hideFocus="hideFocus">${rankData.rank}级拍客</a>{/if}{if rankData.isVip && rankData.showVip}<a href="${rankData.rankIntroURL}" title="认证拍客" class="w-rankVip"{if rankData.showRank}style="margin-left:10px;{if rankData.vipStyle}${rankData.vipStyle}{/if}"{/if}  target="_blank" hideFocus="hideFocus">认证拍客</a>{/if}</span>{/if}')
,_html
,_ele
,_replace
,_rankD;
_data=_data||{};
_replace=_data.hasOwnProperty('replaceNode')?!!_data.replaceNode:true;
_showRank=_data.hasOwnProperty('showRank')?!!_data.showRank:true;
_showVip=_data.hasOwnProperty('showVip')?_data.showVip>0:true;
_ele=_get(_data.node)
if(!_showRank&&!_showVip){
return 0;
}
if(!__hasPushRankStyle){
__hasPushRankStyle=true;
E._$parseStyle('.w-rankVip,.w-rankP{\
     overflow:hidden;display:inline-block;*display:inline;zoom:1;letter-spacing:normal;word-spacing:normal;vertical-align:middle;line-height:0;\
     font-size:0;-webkit-text-size-adjust:none;\
     background:url(http://r1.ph.126.net/share/images/common/ico_rank_p32_d.png) no-repeat 0 0 scroll;\
     _background-image:url(http://r1.ph.126.net/share/images/common/ico_rank_p8_d.png);}\
     .w-rankVip{width:16px;height:12px;background-position:0 0;}\
     .w-rankP{width:27px;height:12px;}\
     .w-rankP0{background-position:0 -13px;}\
     .w-rankP1{background-position:0 -39px;}\
     .w-rankP2{background-position:0 -52px;}\
     .w-rankP3{background-position:0 -65px;}\
     .w-rankP4{background-position:0 -78px;}\
     .w-rankP5{background-position:0 -91px;}\
     .w-rankP6{background-position:0 -104px;}\
     .w-rankP7{background-position:0 -117px;}\
     .w-rankP8{background-position:0 -130px;}\
     .w-rankP9{background-position:0 -143px;}\
     .w-rankP10{background-position:0 -156px;}'
);
}
_rankD=parseInt(_data.rank,10);
_rankD=isNaN(_rankD)?0:_rankD;
_rankD=_rankD<0?0:_rankD;
if(_rankD<=10){
_rankD=0;
}else if(_rankD>10){
_rankD=_rankD-10;
}
_rankD=_rankD>10?10:_rankD;
_html=E._$getHtmlTemplate(_rankTemplate,{
rankData:{
isVip:_data.isVip>0
,showVip:_showVip
,showRank:_showRank
,rank:_rankD||0
,rankIntroURL:_rankIntroURL
,style:_data.style&&(';'+_data.style+';')
,vipStyle:_data.vipStyle&&(';'+_data.vipStyle+';')
}
});
_htmlNode=E._$parseElement(_html);
if(!!_htmlNode){
if(_ele){
if(_replace){
_ele.id&&(_htmlNode.id=_ele.id);
_ele.parentNode.replaceChild(_htmlNode,_ele);
}else{
_ele.appendChild(_htmlNode);
}
}
return!!_data.useHTMLSTR?_html:_htmlNode;
}
return 0;
};
return _fun;
})();
d._$show=function(_arg0){
if(U.arr._$isArray(_arg0)){
for(var i=0,_a;_a=_arg0[i];i++)
d._$show(_a);
}
else{
_arg0=E._$getElement(_arg0);
_arg0.style.display='';
}
};
d._$hide=function(_arg0){
if(U.arr._$isArray(_arg0)){
for(var i=0,_a;_a=_arg0[i];i++)
d._$hide(_a);
}
else{
_arg0=E._$getElement(_arg0);
_arg0.style.display='none';
}
};
d._$insertHTML=function(_elm,_xhtml,_flag){
_elm=E._$getElement(_elm);
if(!_elm||!_xhtml)
return;
var _temp=document.cloneElement('div'),_frag=document.createDocumentFragment();
_temp.innerHTML=_xhtml;
(function(){
if(_temp.firstChild){
_frag.appendChild(_temp.firstChild);
if(_flag)
setTimeout(arguments.callee,0);
else
arguments.callee();
}
else
_elm.appendChild(_frag);
})();
};
d._$getAttribute=function(_elm,_attr){
var _result;
if(d._$hasAttribute(_elm,_attr)){
_result=_elm.getAttribute(_attr);
_elm.removeAttribute(_attr);
}
return _result;
};
d._$hasAttribute=function(_elm,_attr){
return B._$ISIE&&(parseInt(B._$VERSION,10)<=8)?(_attr in _elm):_elm.hasAttribute(_attr);
};
})();
(function(){
var r=P('U.reg');
r._$getRegex=function(_type){
this.__regs=this.__regs||{};
if(U.str._$isString(_type)){
if(!this.__regs[_type]){
switch(_type){
case'email':
this.__regs[_type]=/\w[-.\w]*@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+/;
break;
case'url':
this.__regs[_type]=/(ftp|https?):\/\/[^\/:](?::\d+)?(\/.*)?/;
break;
case'REG_TRIM_SPACE':
this.__regs[_type]=/(?:^\s+)|(?:\s+$)/g;
break;
case'REG_TRIM_SEMICOLON':
this.__regs[_type]=/(?:^\;+)|(?:\;+$)/g;
break;
case'REG_URL_COMPLETE':
this.__regs[_type]=/^(.*?)\//;
break;
}
}
return this.__regs[_type];
}
};
})();
(function(){
var e=P('U.evt');
e._$fireEvent=function(_elm,_type){
if(U.obj._$isObject(_elm)&&U.str._$isString(_type)){
if(B._$ISIE)
_elm.fireEvent(typeof _elm[_type]!=='undefined'?_type:'onpropertychange');
if(document.createEvent){
var _evt=document.createEvent('Events');
_evt.initEvent(_type,true,true);
_elm.dispatchEvent(_evt);
}
}
};
})();
(function(){
var f=P('U.fls');
f._$hackHashFlash=function(){
if(!B._$ISIE)
return;
var _title='',_t=document.title;
setInterval(function(){
_title=document.title;
if(_title==_t)
return;
else
if(_title.indexOf('#')!=-1)
document.title=_t;
},10);
};
})();
(function(){
var u=P('U.utl');
u.__type=['','163.com','126.com','popo.163.com','188.com','vip.163.com','yeah.net','game.163.com'];
u._$getAutoLogin=function(){
var _info=U._$getCookie('NEPHOTO_LOGIN');
if(!_info)
return null;
_info=_info.split('|');
if(_info.length<3||_info[1]=='null'||_info[2]=='null')
return null;
_info[0]=_info[0]==1?2:_info[0]==2?1:_info[0];
return[_info[1].replace(/@126$/,'').replace(/@188$/,'').replace(/@yeah$/,'').replace(/.vip$/,'')+'@'+(u.__type[parseInt(_info[0])+1]||'163.com'),_info[2]];
};
})();
(function(){
var s=P('U.sys');
s.__param={};
s.__init=function(){
if(window.name!='_nephoto'){
var _name=window.name;
if(_name&&/^[\],:{}\s]*$/.test(_name.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@')
.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']')
.replace(/(?:^|:|,)(?:\s*\[)+/g,''))){
var _param=U._$deserialize(_name);
if(!!_param)
this.__param[_param.op]=_param;
}
}
window.name='_nephoto';
var _node=E._$getElement('photo-163-com-template');
if(!_node)
return;
var _ntmp=_node.getElementsByTagName('textarea');
if(!!_ntmp&&_ntmp.length>0)
for(var i=0,l=_ntmp.length,_type,_item;i<l;i++){
_item=_ntmp[i];
if(!_item.id)
continue;
_type=U._$trim(_item.name.toLowerCase());
if(_type=='jst'){
E._$addHtmlTemplate(_item);
continue;
}
if(_type=='txt'){
U.obj._$setData(_item.id,_item.value||'');
continue;
}
if(_type=='ntp'){
E._$addNodeTemplate(_item.value||'',_item.id);
continue;
}
}
E._$removeElement(_node);
};
s._$getXParam=function(_key){
return this.__param[_key]||null;
};
s._$setXParam=function(_key,_value){
this.__param[_key]=_value;
};
s._$getAllXParam=function(){
return this.__param||null;
};
s._$refresh=function(_url,_data){
if(!_url)
return;
if(!!_data&&!!_data.op)
window.name=U._$serialize(_data);
location.href=_url;
};
s.__init();
if(location.pageName!='trainPhoto'){
document.lbody=document.body.appendChild(E._$parseElement('<div class="g-lbody fixed" style="display:none;"></div>'));
}else{
window.onload=function(){
document.lbody=document.body.appendChild(E._$parseElement('<div class="g-lbody fixed" style="display:none;"></div>'));
}
}
})();

(function(){
var m=P('P.ut'),
__pro
m._$$EEvent=C();
__pro=m._$$EEvent.prototype;
__pro._$initialize=function(){
this.__events={};
};
__pro._$addEvent=function(_type,_handler){
if(U.str._$isString(_type)){
this.__events[_type]=this.__events[_type]||[];
var _id=U._$randNumberString();
this.__events[_id]=_handler;
this.__events[_type].push(_handler);
}
return _id;
};
__pro._$delEvent=function(_type,_id){
var _handler=this.__events[_id];
if(_handler){
var _event=this.__events[_type];
if(U.arr._$isArray(_event)){
var _index=U.arr._$indexOf(_event,_handler,true);
if(_index!=-1){
_event.splice(_index,1);
if(!_event.length)
delete this.__events[_type];
}
}
delete this.__events[_id];
}
};
__pro._$dispatchEvent=function(){
var _type=Array.prototype.shift.apply(arguments),_event=this.__events[_type];
if(U.arr._$isArray(_event)){
for(var i=0,_e;_e=_event[i];i++)
_e.apply(window,arguments);
}
};
})();
(function(){
var p=P('P.ut');
p._$$Callback=C();
p._$$Callback._$addCB=function(_fun){
this.__cbs=this.__cbs||[];
this.__cbs.push(_fun);
};
p._$$Callback._$fireCB=function(){
var _args=arguments;
U.arr._$forEach(this.__cbs,function(_cb){
try{
_cb.apply(window,_args);
}
catch(e){}
});
this.__cbs&&delete this.__cbs;
};
})();
(function(){
var p=P('P.ut');
p._$$Single=C();
p._$$Single._$getInstance=function(_opt){
this.__instance=this.__instance||new this(_opt);
return this.__instance;
};
})();

(function(){
var p=P('P.ut');
p._$$Reuse=C();
p._$$Reuse._$allocate=function(_datas,_cnode,_opt,_callback){
_opt=_opt||O;
var _arr=[]
,_insertBefore=!!_opt.insertBefore
,_ec=document.createDocumentFragment()
,_parent=E._$getElement(_cnode);
if(U.arr._$isArray(_datas)){
var that=this;
U.arr._$forEach(_datas,function(_data,_index){
var _reuse=that._$getInstance(_opt);
_reuse._$resetOptions&&_reuse._$resetOptions(_opt,_index);
_reuse._$reset&&_reuse._$reset(_data,_opt);
if(!_opt.batchInsert){
_reuse._$appendTo&&_reuse._$appendTo(_cnode,_insertBefore);
_callback&&_callback(_reuse,_index);
}else{
_parent=E._$getElement(_cnode);
if(_parent){
if(!_insertBefore||!_ec.insertBefore){
_ec.appendChild(_reuse.__body);
}else if(_insertBefore){
if(_ec.insertBefore&&_opt.insertBefore==='lastChild'){
_ec.appendChild(_reuse.__body);
}else{
_ec.insertBefore(_reuse.__body,_ec.firstChild||null);
}
}
_reuse.__pnode=_parent;
}
}
_arr.push(_reuse);
});
}
if(_opt.batchInsert){
if(!_insertBefore||!_parent.insertBefore){
_parent.appendChild(_ec);
}else if(_insertBefore){
if(_ec.insertBefore&&_opt.insertBefore==='lastChild'){
if(!!_opt.lastNode&&_opt.lastNode.parentNode==_parent){
_parent.insertBefore(_ec,_opt.lastNode);
}else{
_parent.appendChild(_ec);
}
}else{
_parent.insertBefore(_ec,_parent.firstChild||null);
}
}else{
_parent.appendChild(_ec);
}
_callback&&U.arr._$forEach(_arr,function(_el,_i){
_callback(_el,_i);
});
}
return _arr;
};
p._$$Reuse._$getInstance=function(_param){
var _reuse=(this.__pool&&this.__pool.length&&this.__pool.shift())||new this(_param);
return _reuse;
};
p._$$Reuse._$recycle=function(_reuse){
if(_reuse instanceof this){
E._$removeElementByEC(_reuse._$getBody&&_reuse._$getBody());
_reuse._$destroy&&_reuse._$destroy();
this.__pool=this.__pool||[];
this.__pool.push(_reuse);
}else if(U.arr._$isArray(_reuse))
for(var i=0,_r;_r=_reuse.pop();this._$recycle(_r));
};
p._$$Reuse._$clear=function(){
this.__pool=[];
};
})();
(function(){
var p=P('P.ut'),
__pro;
p._$$ECache=C();
__pro=p._$$ECache._$extend(P(N.ut)._$$Cache);
__pro.__getListDataInCache=function(_key,_offset,_limit){
if(_key==undefined||_offset==undefined||_limit==undefined)
return null;
var _list=this.__getDataInCache(_key);
if(U.arr._$isArray(_list)){
var _arr=_list.slice(_offset,_offset+_limit);
for(var i=0,_l=_arr.length;i<_l;i++)
if(_arr[i]==undefined)
return null;
}
return _arr;
};
__pro.__setListDataInCache=function(_key,_offset,_limit,_list){
if(_key==undefined||_offset==undefined||_limit==undefined||!U.arr._$isArray(_list))return;
var _data=this.__getDataInCache(_key);
if(U.arr._$isArray(_data)){
U.arr._$forEach(_list,function(_d,_index){
_data.splice(_offset+_index,1,_d);
});
this.__setDataInCache(_key,_data);
}
};
__pro.__setPicSetDataInCache=function(_key,_obj){
if(_key==undefined||_obj==undefined)return;
var _data=this.__getDataInCache(_key);
if(_data==undefined)
this.__setDataInCache(_key,_obj);
};
__pro.__getPicSetDataInCache=function(_key){
if(_key==undefined)return;
return this.__getDataInCache(_key);
};
})();

(function(){
var p=P('P.ut'),__proSTaber;
p._$$STaber=C();
__proSTaber=p._$$STaber.prototype;
__proSTaber._$initialize=function(_list,_options){
_options=_options||O;
this.__selected=_options.selected||'selected';
this.__onGetIndex=_options.ongetindex;
this._$setList(_list||[]);
};
__proSTaber._$setList=function(_list){
this.__list=_list||this.__list;
this.__map=undefined;
var _index;
for(var i=0,_item;_item=this.__list[i];i++){
if(_item._$getID){
this.__map=this.__map||
{};
this.__map[_item._$getID()]=_item;
}
E._$delClassName(U.dom._$getElement(_item),this.__selected);
}
_index=this.__index;
delete this.__index;
this._$setIndex(_index);
};
__proSTaber.__getList=function(){
return this.__list;
};
__proSTaber._$setIndex=function(_index,_callback){
if(!this.__list||this.__list.length<=0||_index==undefined||
this.__index==_index)
return;
var _data=this.__map||this.__list;
E._$delClassName(U.dom._$getElement(_data[this.__index]),this.__selected);
this.__index=_index;
var _elm=U.dom._$getElement(_data[this.__index]);
E._$addClassName(_elm,this.__selected);
_callback&&_callback(_elm);
};
})();
(function(){
var p=P('P.ut'),__proVTaber;
p._$$VTaber=C();
__proVTaber=p._$$VTaber._$extend(p._$$STaber);
__proVTaber._$initialize=function(_elm,_options){
var _list=E._$getChildElements(E._$getElement(_elm));
this._$super(_list,_options);
};
__proVTaber._$setIndex=function(_index){
this.constructor._$supro._$setIndex.call(this,_index);
_index=_index||0;
var _list=this.__getList();
if(!_list||!_list.length)
return;
for(var i=0,_elm;_elm=_list[i];i++){
_elm.style.display=_index==i?'':'none';
}
};
})();

(function(){
var p=P('np.w'),
__targets=[],
__pro;
p._$$ImageLazyLoad=C();
__pro=p._$$ImageLazyLoad._$extend(P(N.ut)._$$Singleton,true);
__pro.__initialize=function(){
this.__bindEvent();
};
__pro.__bindEvent=function(){
var _function=this.__beginLoad._$bind(this);
this._$addEvent('appear',_function);
V._$addEvent(window,'scroll',this.__delayLoad._$bind(this,_function));
V._$addEvent(window,'resize',this.__delayResize._$bind(this,_function));
};
__pro.__clearEvent=function(){
V._$delEvent(window,'scroll',this.__delayLoad._$bind(this));
V._$delEvent(window,'resize',this.__delayResize._$bind(this));
};
__pro._$resetOption=function(_options){
_options=_options||O;
this.__delay=_options.delay||0;
this.__threshold=_options.threshold||0;
this.__failureLimit=_options.failurelimit||0;
this.__container=_options.container||window;
var _tmp=U.obj._$toArray2(_options.targets||this.__container.getElementsByTagName('img'));
this.__imgs=this.__imgs&&this.__imgs.concat(_tmp)||_tmp;
this.__placeholder=_options.placeholder||{};
this.__attribute=_options.attribute||'data-lazyload-src';
this.__effect=_options.effect||'';
if(!!_options.onImgload){
this.__imgLoadCallback=_options.onImgload;
}
if(!!_options.onImgLoadError){
this.__onImgLoadErrorCallback=_options.onImgLoadError;
}
this._$batEvent({
onbeforedataload:_options.onbeforedataload||F
,onafterdataload:_options.onafterdataload||F
});
this.__setPlaceHolder();
this.__width=0;
this.__height=0;
this._$dispatchEvent('appear');
};
__pro.__setPlaceHolder=function(){
for(var i=0,j=this.__imgs.length,_img,_tmp=[];i<j;i++){
_img=this.__imgs[i];
_img.loaded=false;
if(this.__hasAttribute(_img)){
if(!this.__placeholder['disabled']&&_img.setup!='done'){
_img.src=this.__placeholder['src']||location.snf;
}
_tmp.push(_img);
_img.setup='done';
}
}
this.__imgs=_tmp;
};
__pro.__delayLoad=function(_function){
clearTimeout(this.__timer);
if(this.__pause||this.__isFinish())
return;
var _that=this;
if(this.__lock){
this.__timer=setTimeout(function(){_that.__delayLoad(_function);},this.__delay);
}
else{
this.__lock=true;
_function();
setTimeout(function(){_that.__lock=false;},this.__delay);
}
};
__pro.__beginLoad=function(){
for(var i=0,j=this.__imgs.length,_img;i<j;i++){
_img=this.__imgs[i];
if(this.__isInViewport(_img)){
this.__onLoadData(_img);
_img.loaded=true;
}
}
this.__imgs=U.arr._$filter(this.__imgs,function(_img){return!_img.loaded;});
};
__pro.__isInViewport=function(_element){
if(!_element)return;
return!this.__aboveTheTop(_element)&&!this.__belowTheBottom(_element);
};
__pro.__aboveTheTop=function(_element){
var _top=this.__getClient().top;
return _top>=this.__offset(_element).top+this.__offset(_element).height+this.__threshold;
};
__pro.__belowTheBottom=function(_element){
var _bottom=this.__getClient().bottom;
return _bottom<=this.__offset(_element).top+this.__offset(_element).height-this.__threshold;
};
__pro.__offset=function(_element){
var _left=0,_top=0,_width=_element.offsetWidth,_height=_element.offsetHeight;
while(_element.offsetParent){
_left+=_element.offsetLeft;
_top+=_element.offsetTop;
_element=_element.offsetParent;
}
return{
top:_top,
left:_left,
width:_width,
height:_height
};
};
__pro.__getClient=function(){
var _top=U.dom._$scrollTop(),
_height=U.dom._$clientHeight(),
_bottom=_top+_height,
_left=U.dom._$scrollLeft(),
_width=U.dom._$clientWidth();
return{
top:_top,left:_left,width:_width,height:_height,bottom:_bottom
};
};
__pro.__onLoadData=function(_img){
var _image
,_src;
if(this.__hasAttribute(_img)){
_src=_img.getAttribute(this.__attribute);
this._$dispatchEvent('onbeforedataload',_img);
if(this.__effect&&this.__effect=='show'){
_image=new Image(),that=this;
_image.onerror=function(){
_image.onerror=_image.onload=null;
that.__onImgLoadErrorCallback({tmpImg:_image,realImg:_img});
_img.onerror();
};
_image.onload=function(){
_image.onload=null;
_img.src=_image.src;
that.__imgLoadCallback&&that.__imgLoadCallback({tmpImg:_image,realImg:_img});
};
_image.src=_src;
}else{
_img.src=_src;
}
_img.removeAttribute(this.__attribute);
this._$dispatchEvent('onafterdataload',_img);
}
};
__pro.__hasAttribute=function(_img){
return B._$ISIE&&(parseInt(B._$VERSION,10)<=8)?(this.__attribute in _img):_img.hasAttribute(this.__attribute);
};
__pro.__delayResize=function(_function){
var _width=this.__getClient().width,
_height=this.__getClient().height;
if(_width!=this.__width||_height!=this.__height){
this.__width=_width;
this.__height=_height;
this.__delayLoad(_function);
}
};
__pro.__isFinish=function(){
if(!this.__imgs||!this.__imgs.length){
this.__destroy();
return true;
}
else
return false;
};
__pro.__destroy=function(_load){
clearTimeout(this.__timer);
if(_load&&this.__imgs){
U.arr._$forEach(this.__imgs,function(_img){
this.__onLoadData(_img);
}._$bind(this));
this.__imgs=null;
}
this.__clearEvent();
};
__pro._$reset=function(){
this.__destroy();
this.__pause=false;
this.__imgs=this.__container.getElementsByTagName('img');
this.__bindEvent();
this.__setPlaceHolder();
this._$dispatchEvent('appear');
};
__pro._$pauseLoad=function(){
this.__pause=true;
};
})();
(function(){
var p=P('P.ut'),
__ud=UD,
__proCache;
var __arraySortFunc=function(_filed,_flag,_data0,_data1){
var _result=0;
if(_data0[_filed]!=_data1[_filed])
_result=_data0[_filed]<_data1[_filed]?-1:1;
return _result*_flag;
};
var __arrayLocalSortFunc=function(_filed,_flag,_data0,_data1){
var _result=0;
if(_data0[_filed].localeCompare(_data1[_filed])!=0)
_result=_data0[_filed].localeCompare(_data1[_filed]);
return _result*_flag;
};
p._$$APCache=C();
__proCache=p._$$APCache._$extend(P(N.ut)._$$Cache);
U.cls._$augment(p._$$APCache,P.ut._$$Single,true);
__proCache.__completeURL=function(_data){
if(_data.s==undefined)
return _data;
var _tmp0=U.reg._$getRegex('REG_URL_COMPLETE'),_tmp1='http://img$1.'+(_data.s==3?'ph.126.net/':'bimg.126.net/');
if(_data.curl)
_data.curl=_data.curl.replace(_tmp0,_tmp1);
if(_data.murl)
_data.murl=_data.murl.replace(_tmp0,_tmp1);
if(_data.ourl)
_data.ourl=_data.ourl.replace(_tmp0,_tmp1);
if(_data.qurl)
_data.qurl=_data.qurl.replace(_tmp0,_tmp1);
if(_data.surl)
_data.surl=_data.surl.replace(_tmp0,_tmp1);
if(_data.turl)
_data.turl=_data.turl.replace(_tmp0,_tmp1);
if(_data.lurl)
_data.lurl=_data.lurl.replace(_tmp0,_tmp1);
if(_data.cvsurl)
_data.cvsurl=_data.cvsurl.replace(_tmp0,_tmp1);
if(_data.cvlurl)
_data.cvlurl=_data.cvlurl.replace(_tmp0,_tmp1);
if(_data.av)
_data.av=_data.av.replace(_tmp0,_tmp1);
U.obj._$delete(_data,'s');
return _data;
};
__proCache.__genHashFromList=function(_data){
delete _data.hash;
_data.hash={};
if(!_data.list||!_data.list.length)
return;
for(var i=0,l=_data.list.length,_item;i<l;_item=_data.list[i],_item.index=i,_data.hash[_item.id]=this.__completeURL(_item),i++)
;
};
__proCache.__getSortType=function(_type){
switch(_type){
case 2:
case 3:
return 1;
case 4:
case 5:
return 2;
case 6:
case 7:
return 3;
case 8:
return 4;
default:
return 0;
}
};
__proCache.__sortAlbumList=function(){
var _data=this._$getAlbumListInCache();
if(!_data||!_data.list)
return;
var _filed,_flag,_type=_data.sort;
switch(_type){
case 8:
this.__sortDataBySeqResetFlag(_data);
this.__sortDataBySeq(_data,_data.seq);
return;case 2:
case 3:
_filed='count';
_flag=2.5;
break;
case 4:
case 5:
_filed='name';
_flag=4.5;
break;
case 6:
case 7:
_filed='ut';
_flag=6.5;
break;
default:
_filed='t';
_flag=0.5;
break;
}
_flag=2*(_flag-_type);
_data.list.sort(function(_data0,_data1){
if(_filed=='name'){
return __arrayLocalSortFunc(_filed,_flag,_data0,_data1);
}
return __arraySortFunc(_filed,_flag,_data0,_data1);
});
this.__genHashFromList(_data);
};
__proCache.__sortDataBySeqResetFlag=function(_data){
for(var i=0,l=_data.list.length,_item;i<l;i++){
_item=_data.list[i];
if(!!_item)
_item.sflag=false;
}
};
__proCache.__sortDataBySeq=function(_data,_seq){
var _arr=_seq.split(';');
this.__genHashFromList(_data);
for(var i=0,j=0,l=_arr.length,_item,_tmp;i<=l;i++){
_item=_data.hash[_arr[i]];
if(!_item||!!_item.sflag)
continue;
_tmp=_data.list[j];
if(!!_tmp){
_tmp.index=_item.index;
_data.list[_item.index]=_tmp;
}
_item.sflag=true;
_item.index=j;
_data.list[j++]=_item;
}
};
__proCache._$genAlbumListString=function(_aid){
var _data=this._$getAlbumListInCache();
if(_data)
return this.__genAlbumListString(_data.list,_aid);
else
return[];
};
__proCache.__genAlbumListString=function(_data,_aid){
var __tem_arr=[],__selAlbumNum;
if(_data&&_data.length&&_data.length>0)
for(var i=0;i<_data.length;i++){
__tem_arr.push(this.__genAlbumString(_data[i]));
if(_data[i].id==_aid)
__selAlbumNum=i;
}
return[__tem_arr.join('&!&'),__selAlbumNum];
};
__proCache.__genAlbumString=function(_album){
var __tmp_arr=[];
__tmp_arr.push(_album.id);
__tmp_arr.push(_album.count);
__tmp_arr.push('['+_album.name+']');
__tmp_arr.push(_album.au);
return __tmp_arr.join('&!&')+'&!&#';
};
__proCache._$getAlbumListInCache=function(){
return this.__getDataInCache('album_list_'+__ud.hostId);
};
__proCache._$getAlbumList=function(_cb){
var _data=this._$getAlbumListInCache();
if(_data!=undefined){
_cb(_data);
return;
}
this.__getAlbumList._$addCB(_cb);
EJ._$loadScript(__ud.albumUrl,this.__getAlbumList._$bind(this));
};
__proCache.__getAlbumList=function(){
var _ud=__ud,_uid=_ud.hostId;
var _key='g_a$'+_uid+'d',_d=window[_key];
U.obj._$delete(window,_key);
if(_d){
var _data={
list:_d
};
this.__setDataInCache('album_list_'+_uid,_data);
_data.sort=_ud.albumSort;
_key='g_a$'+_uid+'s';
_data.seq=U.str._$trimsc(window[_key]||'');
U.obj._$delete(window,_key);
if(!_ud.editable)
this.__delPrivateAlbum();
this.__sortAlbumList();
}
this.__getAlbumList._$fireCB(this.__getDataInCache('album_list_'+_uid)||null);
};
U.obj._$extend(__proCache.__getAlbumList,P.ut._$$Callback);
__proCache._$getAlbumByIdInCache=function(_id){
var _data=this._$getAlbumListInCache();
return _data?(_data.hash[_id]):null;
};
__proCache._$getAlbumById=function(_id,_cb){
this.__getAlbumById._$addCB(_cb);
this._$getAlbumList(this.__getAlbumById._$bind(this,_id));
};
__proCache.__getAlbumById=function(_id,_data){
this.__getAlbumById._$fireCB(_id,_data?(_data.hash[_id]):null);
};
U.obj._$extend(__proCache.__getAlbumById,P.ut._$$Callback);
__proCache._$getAlbumListByUserId=function(){
var _data=this._$getAlbumListInCache();
if(_data!=undefined){
this._$dispatchEvent('onalbumlistByUserload',_data);
return;
}
J._$loadDataByDWR(location.pdwr,'AlbumBean','getAlbumListByUserId',__ud.hostId,this.__getAlbumListByUserId._$bind(this));
};
__proCache._$refreshPhotoListInCache=function(_aid){
var _album=this._$getAlbumByIdInCache(_aid);
this._$getAlbumByIdWithDWR(_aid,_album);
};
__proCache._$getAlbumByIdWithDWR=function(_aid,_album){
J._$loadDataByDWR(location.pdwr,'AlbumBean','getAlbumData',_aid,'','',U._$randNumberString(8),false,this.__getAlbumByIdWithDWR._$bind(this,_album));
};
__proCache.__getAlbumByIdWithDWR=function(_album,_url){
if(_album){
_album.purl=_url;
this.__delDataInCache('photo_list_'+__ud.hostId+'_'+_album.id);
}
this.__delDataInCache('album_list_'+__ud.hostId);
this._$getAlbumListByUserIdWithDWR();
};
__proCache._$getAlbumListByUserIdWithDWR=function(){
J._$loadDataByDWR(location.pdwr,'AlbumBean','getAlbumListByUserId',__ud.hostId,function(_data){
if(_data){
var _data={list:_data};
this.__setDataInCache('album_list_'+__ud.hostId,_data);
_data.sort=__ud.albumSort;
this.__sortAlbumList();
}
this._$dispatchEvent('onalbumlistbyuseridwithdwrget',_data);
}._$bind(this));
};
__proCache.__getAlbumListByUserId=function(_data){
if(!_data){
this._$dispatchEvent('onalbumlistByUserload',null);
return;
}
var _data={
list:_data
};
this._$dispatchEvent('onalbumlistByUserload',_data);
};
__proCache.__onquepwdGet=function(_data){
if(!_data){
this._$dispatchEvent('onquepwdget',null);
return;
}
this._$dispatchEvent('onquepwdget',_data);
};
__proCache.__onGetQuestion=function(_id,_data){
if(!_data){
this._$dispatchEvent('onGetQuestion',null);
return;
}
this._$dispatchEvent('onGetQuestion',_id,_data);
};
__proCache._$getAlbumQues=function(_id){
J._$loadDataByDWR(location.pdwr,'AlbumBean','getAlbumQuestion',_id,this.__onGetQuestion._$bind(this,_id));
};
__proCache._$getAlbumQuepwd=function(_id){
J._$loadDataByDWR(location.pdwr,'AlbumBean','getAlbumQuepwd',_id,this.__onquepwdGet._$bind(this));
};
__proCache._$getAlbumSortType=function(){
var _data=this._$getAlbumListInCache();
return this.__getSortType(_data.sort);
};
__proCache.__delPrivateAlbum=function(){
var _data=this._$getAlbumListInCache();
if(!_data||!_data.list||!_data.list.length)
return;
for(var _list=_data.list,_seq=';'+_data.seq,i=_list.length-1;i>=0;i--){
if(_list[i].au==2){
if(_data.sort==8)
_seq=_seq.replace(';'+_list[i].id+';',';');
_list.splice(i,1);
}
}
_data.seq=_seq.slice(1);
if(_data.list.length==0)
this._$all_album_is_private=true;
};
__proCache._$hasBlogFriAlbumInCache=function(){
return this.__getDataInCache('hasblogfrialbum');
};
__proCache._$hasBlogFriAlbum=function(_cb){
var _data=this._$hasBlogFriAlbumInCache();
if(_data!=undefined){
_cb(_data);
return;
}
this.__hasBlogFriAlbum._$addCB(_cb);
this._$getAlbumList(this.__hasBlogFriAlbum._$bind(this));
};
__proCache.__hasBlogFriAlbum=function(_data){
var _flag=false;
if(_data&&_data.list&&_data.list.length&&_data.list.length>0){
for(var i=0,_alist=_data.list,_ab;_ab=_alist[i];i++)
if(_ab.au&&_ab.au==4){
_flag=true;
break;
}
}
this.__hasBlogFriAlbum._$fireCB(_flag);
};
U.obj._$extend(__proCache.__hasBlogFriAlbum,P.ut._$$Callback);
__proCache._$createAlbum=function(_album){
J._$postDataByDWR(location.pdwr,'AlbumBean','createWithFolderId',_album.name,_album.desc,_album.au,_album.password||'',_album.question||'',_album.folderId||0,this.__createAlbum._$bind(this));
};
__proCache.__createAlbum=function(_album){
if(_album&&_album.errorType!=2)
var _list=this.__createAlbumInCache(_album);
this._$dispatchEvent('onalbumcreate',_album,_list);
};
__proCache.__createAlbumInCache=function(_album){
var _data=this._$getAlbumListInCache();
if(!_data)
return null;
if(!!_data.seq)
_data.seq=_album.id+";"+_data.seq;
_data.list.unshift(_album);
this.__sortAlbumList();
return _data.list;
};
__proCache._$updateAlbum=function(_album){
J._$postDataByDWR(location.pdwr,'AlbumBean','updateMetaWithFolderId',_album.id,_album.name,_album.desc,_album.au,_album.password||'',_album.question||'',_album.folderId||0,this.__updateAlbum._$bind(this));
};
__proCache.__updateAlbum=function(_album){
if(_album&&_album.errorType!=2){
var _type=this._$getAlbumSortType(),_noresort=_type!=2,_list=this.__updateAlbumInCache(_album,_noresort);
}
this._$dispatchEvent('onalbumupdate',_album);
};
__proCache.__updateAlbumInCache=function(_album,_noresort){
var _data=this._$getAlbumListInCache(),_data0=_data.hash[_album.id];
if(!_noresort){
_data.list[_data0.index]=_album;
this.__sortAlbumList();
return _data.list;
}
_album.index=_data0.index;
_album=this.__completeURL(_album);
_data.hash[_album.id]=_album;
_data.list[_data0.index]=_album;
return _album;
};
__proCache._$updateAlbumName=function(_id,_name){
J._$postDataByDWR(location.pdwr,'AlbumBean','updateName',_id,_name,this.__updateAlbumName._$bind(this));
};
__proCache.__updateAlbumName=function(_album){
if(_album&&_album.errorType!=2)
this.__updateAlbumInCache(_album,true);
this._$dispatchEvent('onalbumnameupdate',_album);
};
__proCache._$updateAlbumCover=function(_aid,_pid){
P.ui._$$Posting._$getInstance()._$reset({msg:'封面设置中...'})._$show();
J._$postDataByDWR(location.pdwr,'AlbumBean','updateCover',_aid,_pid,this.__updateAlbumCover._$bind(this,_pid));
};
__proCache.__updateAlbumCover=function(_id,_album){
P.ui._$$Posting._$getInstance()._$hide();
if(!_album){
this._$dispatchEvent('onalbumcoverupdate',_id,false);
return;
}
this.__updateAlbumInCache(_album,true);
this._$dispatchEvent('onalbumcoverupdate',_id,true);
};
__proCache._$updateAlbumDesc=function(_aid,_desc){
J._$postDataByDWR(location.pdwr,'AlbumBean','updateDesc',_aid,_desc,this.__updateAlbumDesc._$bind(this));
};
__proCache.__updateAlbumDesc=function(_album){
if(_album&&_album.errorType!=2)
this.__updateAlbumInCache(_album,true);
this._$dispatchEvent('onalbumdescupdate',_album);
};
__proCache._$deleteAlbum=function(_ids){
J._$postDataByDWR(location.pdwr,'AlbumBean','deleteAlbums',_ids,this.__deleteAlbum._$bind(this,_ids));
};
__proCache.__deleteAlbum=function(_ids,_suc){
if(!_suc){
this._$dispatchEvent('onalbumdelete',_ids,_suc);
return;
}
this.__deleteAlbumInCache(_ids);
this._$dispatchEvent('onalbumdelete',_ids,_suc);
};
__proCache.__deleteAlbumInCache=function(_ids){
var _data=this._$getAlbumListInCache();
for(var i=0,_id;_id=_ids[i];i++){
_data.list.splice(_data.hash[_id].index,1);
this.__genHashFromList(_data);
}
return _data.list;
};
__proCache._$changeAlbumSort=function(_type,_seq){
var _data=this._$getAlbumListInCache();
if((_type!=8&&_type==_data.sort)||
(_type==8&&_seq==_data.seq))
return;
J._$postDataByDWR(location.pdwr,'UserSpaceBean','updateSeq',_type,_seq||'',this.__changeAlbumSort._$bind(this,_type,_seq||''));
};
__proCache.__changeAlbumSort=function(_type,_seq,_suc){
if(!_suc){
this._$dispatchEvent('onalbumsortchange',false);
return;
}
var _data=this._$getAlbumListInCache();
np.c._$UD.albumSort=_data.sort=_type;
_data.seq=_seq;
this.__sortAlbumList();
this._$dispatchEvent('onalbumsortchange',true,_type);
};
__proCache._$checkAlbumPassword=function(_id,_password,_key,_visitorflag){
var _data=this._$getAlbumByIdInCache(_id);
if(_data.purl){
this.__checkAlbumPassword(_id,_data.purl);
return;
}
var _tmp=_data.dmt;
_data.dmt=U._$randNumberString(8);
if(!_visitorflag){
J._$loadDataByDWR(location.pdwr,'AlbumBean','getAlbumData',_id,_password||'',_key||'',_data.dmt,false,this.__checkAlbumPassword._$bind(this,_id));
}else{
J._$loadDataByDWR(location.pdwr,'AlbumBean','getAlbumDataByVisitorId',_id,_password||'',_key||'',_data.dmt,false,this.__checkAlbumPassword._$bind(this,_id));
}
};
__proCache.__checkAlbumPassword=function(_id,_url){
var _data=this._$getAlbumByIdInCache(_id);
_data.purl=_url;
this._$dispatchEvent('onalbumpasswordcheck',_id,_url?true:false);
};
__proCache._$checkAlbumBlogFriends=function(_id){
var _data=this._$getAlbumByIdInCache(_id);
if(_data.purl){
this.__checkAlbumBlogFriends(_id,_data.purl);
return;
}
var _tmp=_data.dmt;
_data.dmt=U._$randNumberString(8);
J._$loadDataByDWR(location.pdwr,'AlbumBean','getAlbumData',_id,'','',_data.dmt,false,this.__checkAlbumBlogFriends._$bind(this,_id));
};
__proCache.__checkAlbumBlogFriends=function(_id,_url){
var _data=this._$getAlbumByIdInCache(_id);
_data.purl=_url;
this._$dispatchEvent('onalbumblogfriendcheck',_id,_url?true:false);
};
__proCache._$getAlbumDataInSession=function(_id){
J._$loadDataByDWR(location.pdwr,'AlbumBean','getAlbumData',_id,'','fromblog',U._$randNumberString(8),false,this.__getAlbumDataInSession._$bind(this,_id));
};
__proCache.__getAlbumDataInSession=function(_id,_url){
if(!_id||!_url){
this._$dispatchEvent('ongetalbumdatainsession',_id,null);
return;
}
if(!U.arr._$isArray(window.auAids))
window.auAids=[];
var _index=U.arr._$indexOf(window.auAids,function(_aid){return _aid==_id});
if(_index==-1||_index==undefined)
window.auAids.push(_id);
var _url='http://'+_url,_type=0;
this._$dispatchEvent('onalbumdatainsessionsuc',_id);
J._$loadScript(_url,this.__getPhotoListByUrl._$bind(this,_id,_url,_type));
};
__proCache._$changePhotoSort=function(_id,_type,_seq){
var _data=this._$getPhotoListInCache(_id);
if((_type!=8&&_type==_data.sort)||(_type==8&&_seq==_data.seq))
return;
J._$postDataByDWR(location.pdwr,'AlbumBean','updateSeq',_id,_type,_seq||'',this.__changePhotoSort._$bind(this,_id,_type,_seq||''));
};
__proCache.__changePhotoSort=function(_id,_type,_seq,_suc){
if(!_suc){
this._$dispatchEvent('onphotosortchange',null);
return;
}
var _data=this._$getPhotoListInCache(_id);
_data.sort=_type;
_data.seq=_seq;
this.__sortPhotoList(_id);
this._$dispatchEvent('onphotosortchange',_data.list,_type);
};
__proCache.__sortPhotoList=function(_id){
var _data=this._$getPhotoListInCache(_id);
if(!_data||!_data.list)
return;
var _filed,_flag,_type=_data.sort;
switch(_type){
case 8:
this.__sortDataBySeqResetFlag(_data);
this.__sortDataBySeq(_data,_data.seq);
return;
case 4:
case 5:
_filed='desc';
_flag=4.5;
break;
case 9:
_flag='asc';
_filed='exif';
break
case 10:
_flag='desc';
_filed='exif';
break;
default:
_filed='t';
_flag=0.5;
break;
}
if(_filed==='exif'){
var _hasExifTimeArray=[],
_hasNoExifTimeArray=[];
U.arr._$forEach(_data.list,function(_el){
if(_el.hasOwnProperty('t1')&&_el['t1']&&!isNaN(parseInt(_el['t1'],10))){
_hasExifTimeArray.push(_el);
}else{
_hasNoExifTimeArray.push(_el);
}
});
_hasExifTimeArray.sort(function(a,b){
var _a=parseInt(a['t1'],10),
_b=parseInt(b['t1'],10);
return _a-_b;
});
_hasNoExifTimeArray.sort(function(a,b){
var _a=parseInt(a['t'],10),
_b=parseInt(b['t'],10);
return _a-_b;
});
if(_flag!=='asc'){
_hasExifTimeArray.reverse();
_hasNoExifTimeArray.reverse();
}
_data.list=_hasExifTimeArray.concat(_hasNoExifTimeArray);
}else{
_flag=2*(_flag-_type);
_data.list.sort(function(_data0,_data1){
if(_filed=='desc'){
return __arrayLocalSortFunc(_filed,_flag,_data0,_data1);
}
return __arraySortFunc(_filed,_flag,_data0,_data1);
});
}
this.__genHashFromList(_data);
};
__proCache._$getPhotoList=function(_id,_visitorflag){
var _data=this._$getPhotoListInCache(_id);
if(!!_data){
this._$dispatchEvent('onphotolistload',_id,_data);
return;
}
_data=this._$getAlbumByIdInCache(_id);
if(!_data){
this._$dispatchEvent('onphotolistload',_id,null);
return;
}
if(_data.purl){
this.__getPhotoList_0(_id,_data.purl);
return;
}
this.__tmp_callback=this._$getEvent('onalbumpasswordcheck');
this._$addEvent('onalbumpasswordcheck',this.__getPhotoList_0._$bind(this));
this._$checkAlbumPassword(_id,'','',_visitorflag);
};
__proCache.__getPhotoList_0=function(_id,_suc){
var _data=this._$getAlbumByIdInCache(_id);
var _url=_suc?_data.purl:'';
this._$addEvent('onalbumpasswordcheck',this.__tmp_callback);
delete this.__tmp_callback;
if(!_url){
this._$dispatchEvent('onphotolistload',_id,null);
return;
}
_url='http://'+_url;
J._$loadScript(_url,this.__getPhotoList_1._$bind(this,_id));
};
__proCache.__getPhotoList_1=function(_id){
var _key='g_p$'+_id+'d',_d=window[_key];
if(!_d){
var _album=this._$getAlbumByIdInCache(_id);
_album.purl='';
if(!!_album.try404Flag)
this._$dispatchEvent('onphotolistload',_id,null);
else{
_album.try404Flag=true;
this._$getPhotoList(_id);
}
return;
}
var _data={
list:_d
};
var _ud=__ud;
this.__setDataInCache('photo_list_'+_ud.hostId+'_'+_id,_data);
_data.sort=this._$getAlbumByIdInCache(_id).st;
_key='g_p$'+_id+'s';
_data.seq=U.str._$trimsc(window[_key]||'');
this.__sortPhotoList(_id);
this._$dispatchEvent('onphotolistload',_id,_data);
};
__proCache._$getPhotoListByUrl=function(_id,_url,_type){
_url='http://'+_url;
J._$loadScript(_url,this.__getPhotoListByUrl._$bind(this,_id,_url,_type));
};
__proCache.__getPhotoListByUrl=function(_id,_url,_type){
var _key=_type==1?'g_pic$'+_id:'g_p$'+_id+'d',_d=window[_key];
U.obj._$delete(window,_key);
if(!_d){
if(!!this.__getPhotoListByUrl.try404Flag)
this._$dispatchEvent('onphotolistload',_id,null);
else{
this.__getPhotoListByUrl.try404Flag=true;
this._$getPhotoList(_id,_url);
}
return;
}
var _data={
list:_d
};
var _ud=__ud;
this.__setDataInCache('photo_list_'+_ud.hostId+'_'+_id,_data);
this.__genHashFromList(_data);
if(_type==0){
_data.sort=this._$getAlbumByIdInCache(_id)&&this._$getAlbumByIdInCache(_id).st||_ud.albumSort;
_key='g_p$'+_id+'s';
_data.seq=U.str._$trimsc(window[_key]||'');
this.__sortPhotoList(_id);
}
this._$dispatchEvent('onphotolistload',_id,_data);
};
__proCache._$getPictureSetUrl=function(_sid){
J._$postDataByDWR(location.sdwr,'PictureSetBean','getPictureSetData',_sid,this.__getPictureSetUrl._$bind(this,_sid,1));
};
__proCache.__getPictureSetUrl=function(_id,_type,_url){
_url='http://'+_url;
J._$loadScript(_url,this.__getPhotoListByUrl._$bind(this,_id,_url,_type));
};
__proCache._$getPhotoExif=function(_pid,_cb){
var _data=this.__getDataInCache('photo_exif_'+'_'+_pid);
if(_data!=undefined){
_cb&&_cb(_pid,_data);
return;
}
this.__getPhotoExif._$addCB(_cb);
J._$postDataByDWRWithSync(location.pdwr,'PhotoBean','getPhotoExif',_pid,this.__getPhotoExif._$bind(this,_pid));
};
__proCache.__getPhotoExif=function(_pid,_exif){
_exif=_exif||'';
this.__setDataInCache('photo_exif_'+'_'+_pid,_exif);
this.__getPhotoExif._$fireCB(_pid,_exif);
};
U.obj._$extend(__proCache.__getPhotoExif,P.ut._$$Callback);
__proCache._$getPhotoListInCache=function(_id){
return this.__getDataInCache('photo_list_'+__ud.hostId+'_'+_id);
};
__proCache.__updatePhotoInCache=function(_id,_photo,_noresort){
var _data=this._$getPhotoListInCache(_id),_data0=_data.hash[_photo.id];
if(!_noresort){
_data.list[_data0.index]=_photo;
this.__sortPhotoList(_id);
return _data.list;
}
_photo.index=_data0.index;
_photo=this.__completeURL(_photo);
_data.hash[_photo.id]=_photo;
_data.list[_data0.index]=_photo;
return _photo;
};
__proCache._$getPhotoByIdInCache=function(_aid,_pid){
var _data=this._$getPhotoListInCache(_aid);
return _data?(_data.hash[_pid]||null):null;
};
__proCache._$getPhotoById=function(_aid,_pid){
var _data=this._$getPhotoByIdInCache(_aid,_pid);
if(_data!=undefined){
this._$dispatchEvent('onphotoload',null);
return;
}
J._$loadDataByDWR(location.pdwr,'PhotoBean','getPhotoById',_pid,this._$dispatchEvent._$bind(this,'onphotoload',_pid));
};
__proCache._$updatePhotoDesc=function(_pid,_aid,_desc){
J._$postDataByDWR(location.pdwr,'PhotoBean','updateDesc',_pid,_aid,_desc||'',this.__updatePhotoDesc._$bind(this,_aid));
};
__proCache.__updatePhotoDesc=function(_aid,_photo){
if(_photo&&_photo.errorType!=2)
this.__updatePhotoInCache(_aid,_photo,true);
this._$dispatchEvent('onphotodescupdate',_photo);
};
__proCache._$getUploadSetupedFlag=function(){
J._$loadDataByDWR(location.pdwr,'UploadSessionBean','getUploadSetupedFlag','',this.__getUploadSetupedFlag._$bind(this));
};
__proCache.__getUploadSetupedFlag=function(_ret){
if(_ret&&_ret==1){
this._$dispatchEvent('onuploadtoolwebsetup',_ret);
}
else{
this._$dispatchEvent('onuploadtoolwebsetup');
}
};
__proCache._$addDelOriginFile=function(_aids){
J._$postDataByDWR(location.pdwr,'AlbumBean','addDelOriginFile',_aids,this.__addDelOriginFile._$bind(this));
};
__proCache.__addDelOriginFile=function(_suc){
if(!_suc){
this._$dispatchEvent('onalbumcompress',null);
return;
}
this._$dispatchEvent('onalbumcompress',_suc);
};
__proCache._$getPlanDetail=function(){
J._$loadDataByDWR(location.pdwr,'AlbumBean','getPlanDetail',__ud.hostId,this.__getPlanDetail._$bind(this));
};
__proCache.__getPlanDetail=function(_data){
if(!_data){
this._$dispatchEvent('ongetplandetail',null);
return;
}
var _data={
list:_data
};
this._$dispatchEvent('ongetplandetail',_data);
};
__proCache._$pointExchange=function(_no){
J._$postDataByDWR(location.pdwr,'AlbumBean','pointExchange',_no,false,this.__pointExchange._$bind(this));
};
__proCache.__pointExchange=function(_suc){
this._$dispatchEvent('onpointexchanged',_suc);
};
__proCache._$deletePhotos=function(_aid,_pids,_coverID){
J._$postDataByDWR(location.pdwr,'PhotoBean','deleteNew',_pids,_aid,_coverID,this.__deletePhotos._$bind(this,_aid,_pids))
};
__proCache.__deletePhotos=function(_aid,_pids,_album){
if(!_album){
this._$dispatchEvent('onphotodelete',_pids,false);
return;
}
var _data=this._$getPhotoListInCache(_aid),_list=_data.list;
for(var i=_pids.length;i>0;i--)
_list.splice(_data.hash[_pids[i-1]].index,1);
this.__genHashFromList(_data);
var _nosort=this._$getAlbumSortType()!=1;
var _nalbum=this.__updateAlbumInCache(_album,_nosort);
this._$dispatchEvent('onphotodelete',_pids,true);
};
__proCache._$movePhotos=function(_pids,_sid,_did,_coverID){
J._$postDataByDWR(location.pdwr,'AlbumBean','movePhotosNew',_pids,_sid,_did,_coverID,this.__movePhotos._$bind(this,_pids,_sid,_did))
};
__proCache.__movePhotos=function(_pids,_sid,_did,_arr){
if(!_arr||!_arr.length){
this._$dispatchEvent('onphotomove',null);
return;
}
var _data0=this._$getPhotoListInCache(_sid),
_data1=this._$getPhotoListInCache(_did)||[],
_list0=_data0.list;
_data1.list=_data1.list||[];
for(var i=_pids.length,_obj;i>0;i--){
_obj=_list0.splice(_data0.hash[_pids[i-1]].index,1)[0];
_data1&&_data1.list.push(_obj);
}
this.__genHashFromList(_data0);
_data1&&this.__sortPhotoList(_did);
_data0=this._$getAlbumListInCache();
_data0.list[_data0.hash[_sid].index]=_arr[0];
_data0.list[_data0.hash[_did].index]=_arr[1];
this.__sortAlbumList();
this._$dispatchEvent('onphotomove',_arr);
};
__proCache._$updateAlbumType=function(_id,_type,_password,_question){
J._$postDataByDWR(location.pdwr,'AlbumBean','updateType',_id,_type,_password||'',_question||'',this.__updateAlbumType._$bind(this));
};
__proCache.__updateAlbumType=function(_album){
if(!_album){
alert('修改权限失败，请稍后再试!');
return;
}
this.__updateAlbumInCache(_album,true);
this._$dispatchEvent('onupdatealbumtype',_album,true);
setTimeout(function(){alert('设置成功！');},10);
};
__proCache._$rotateImage=function(_aid,_pid,_angle){
P.ui._$$Posting._$getInstance()._$reset({msg:'相片旋转中...'})._$show();
J._$postDataByDWR(location.pdwr,'PhotoBean','rotateImage',_pid,_angle,this.__rotateImage._$bind(this,_aid));
};
__proCache.__rotateImage=function(_aid,_photo){
P.ui._$$Posting._$getInstance()._$hide();
var _flag=false;
if(_aid&&U.obj._$isObject(_photo)){
this.__updatePhotoInCache(_aid,_photo);
_flag=true;
}
this._$dispatchEvent('onrotateimage',this.__completeURL(_photo));
};
__proCache._$setUploadSetupFlag=function(){
J._$postDataByDWR(location.pdwr,'UploadSessionBean','setUploadSetupedFlag',false);
};
__proCache._$clearUploadSetupFlag=function(){
J._$postDataByDWR(location.pdwr,'UploadSessionBean','clearUploadSetupedFlag',false);
};
__proCache._$getUploadSetupFlag=function(){
J._$postDataByDWR(location.pdwr,'UploadSessionBean','getUploadSetupedFlag',false,this.__getUploadSetupedFlag._$bind(this));
};
__proCache.__getUploadSetupedFlag=function(_flag){
this._$dispatchEvent('onGetUploadSetupedFlag',_flag);
};
__proCache._$onPageSettingUpdate=function(_itype,_stype){
J._$postDataByDWR(location.pdwr,'ProfileBean','updatePageSetting',_itype,_stype,this._$dispatchEvent._$bind(this,'onpagesettingupdate',_itype,_stype));
};
__proCache._$getLovePhotoExif=function(_uid,_pid,_cb){
var _data=this.__getDataInCache('photo_exif_'+'_'+_pid);
if(_data!=undefined){
_cb&&_cb(_pid,_data);
return;
}
this.__getPhotoExif._$addCB(_cb);
J._$postDataByDWR(location.pdwr,'PhotoBean','getPhotoExifByIdANDUserId',_pid,_uid,this.__getPhotoExif._$bind(this,_pid));
};
__proCache._$applyRecover=function(_uid){
J._$postDataByDWR(location.pdwr,'UserApplyBean','get30DaysRecovery',_uid,this._$dispatchEvent._$bind(this,'onalbumrecovery'));
};
__proCache._$getAlbumFolders=function(_asyn){
var _cache=this.__getDataInCache('folders'),
_dwrMethod;
if(_cache){
this._$dispatchEvent('onalbumfoldersget',_cache);
}else{
_dwrMethod=(!!_asyn)?J._$loadDataByDWR:J._$postDataByDWRWithSync;
_dwrMethod(
location.pdwr,
'AlbumFolderBean',
'getAlbumFolders',
function(_data){
if(!_data){
}else{
this.__setDataInCache('folders',_data);
}
this._$dispatchEvent('onalbumfoldersget',_data);
}._$bind(this)
);
}
};
__proCache._$getAlbumFolderItemById=function(_aid){
J._$postDataByDWRWithSync(location.pdwr,'AlbumFolderBean','getAlbumFolderItemById',_aid,__ud.hostId,this._$dispatchEvent._$bind(this,'onalbumfolderitemget'));
};
__proCache._$addAlbumFolder=function(_name){
J._$postDataByDWRWithSync(location.pdwr,'AlbumFolderBean','addAlbumFolder',_name,function(_folder){
if(_folder){
if(_folder.errorType==2){
alert('添加失败，分类名或描述中含有不恰当的词汇。');
return;
}
}
var _folders=this.__getDataInCache('folders');
_folders[_folders.length]=_folder;
this._$dispatchEvent('onalbumfolderadd',_folder);
}._$bind(this));
};
__proCache._$getAlbumItemsByFolderId=function(_folderId){
J._$postDataByDWRWithSync(location.pdwr,'AlbumFolderBean','getAlbumFolderItemsByFolderId',_folderId,1000,0,function(_list){
if(!!_list){
_list.sort(function(x,y){
var _result;
switch(np.c._$UD.albumSort){
case 0:
_result=x.albumCreateTime-y.albumCreateTime;
break;
case 1:
_result=y.albumCreateTime-x.albumCreateTime;
break;
case 4:
_result=x.albumName>y.albumName?1:-1;
break;
case 5:
_result=x.albumName>y.albumName?-1:1;
break;
case 6:
_result=x.lastUploadTime-y.lastUploadTime;
break;
case 7:
_result=y.lastUploadTime-x.lastUploadTime;
break;
default:
_result=0;
}
return _result;
});
}
this._$dispatchEvent('onalbumfolderitemsget',_list);
}._$bind(this));
};
__proCache._$delAlbumFoldersInCache=function(){
this.__delDataInCache('folders');
};
__proCache._$delAlbumsInCache=function(){
this.__delDataInCache('album_list_'+__ud.hostId);
};
__proCache._$getRecycleInfo=function(){
J._$postDataByDWRWithSync(location.pdwr,'UserApplyBean','getRecycleInfo',__ud.visitName,false,function(_totalCount){
this._$dispatchEvent('onRecycleInfoGet',_totalCount||0);
}._$bind(this));
};
__proCache._$getTotalRecoverPhotoCounts=function(){
J._$postDataByDWRWithSync(location.pdwr,'UserApplyBean','get30DaysRecovery',__ud.visitId,false,function(_totalCount){
this._$dispatchEvent('onphotobackupcountget',_totalCount||0);
}._$bind(this));
};
__proCache._$getCanRecoverPhotos=function(_pageNo){
J._$postDataByDWR(location.pdwr,'UserApplyBean','getPhotoBackupsByUserName',__ud.visitId,_pageNo,function(_list){
this._$dispatchEvent('onphotobackupsget',_list||[]);
}._$bind(this));
};
__proCache._$recoverPhotos=function(_photoIds){
J._$postDataByDWRWithSync(location.pdwr,'UserApplyBean','recoverPhotos',_photoIds,__ud.visitName,function(_flag){
this._$dispatchEvent('onphotobackupsrecover',_flag||[]);
}._$bind(this));
};
__proCache._$clearPhotos=function(_photoIds){
J._$postDataByDWRWithSync(location.pdwr,'UserApplyBean','updatePhotoBackupsByPids',__ud.visitId,_photoIds,function(_flag){
this._$dispatchEvent('onphotobackupsclear',_flag||[]);
}._$bind(this));
};
})();

(function(){
var p=P('P.ut'),
__maxCount=10000,
__pro,
__reg0=/^1#/,__reg1=/^中国#/,__reg2=/^(.*?)\//,__extraRecDir,__ud=window.UD;
var __preTreatRegions=function(_data){
if(!U.obj._$isObject(_data))
return;
var _obj;
for(var _p in _data){
_obj=_data[_p];
_obj.ids=_obj.ids.replace(__reg0,'');
_obj.nms=_obj.nms.replace(__reg1,'');
__preTreatRegions(_obj.son);
}
};
var __count=0;
var __createIndex=function(_data,_map){
if(!U.obj._$isObject(_data)||!U.obj._$isObject(_map))
return;
var _obj;
for(var _p in _data){
_obj=_data[_p];
_map[_obj.id]=_obj;
__createIndex(_obj.son,_map);
}
__count++;
};
var __completeURL=function(_data){
if(_data.s==undefined)
return _data;
var _tmp0=U.reg._$getRegex('REG_URL_COMPLETE'),_tmp1='http://img$1.'+(_data.s==3?'ph.126.net/':'bimg.126.net/');
if(_data.lurl)
_data.lurl=_data.lurl.replace(_tmp0,_tmp1);
if(_data.murl)
_data.murl=_data.murl.replace(_tmp0,_tmp1);
if(_data.surl)
_data.surl=_data.surl.replace(_tmp0,_tmp1);
if(_data.cvsurl)
_data.cvsurl=_data.cvsurl.replace(_tmp0,_tmp1);
if(_data.cvlurl)
_data.cvlurl=_data.cvlurl.replace(_tmp0,_tmp1);
if(_data.cv240url)
_data.cv240url=_data.cv240url.replace(_tmp0,_tmp1);
if(_data.cvmurl)
_data.cvmurl=_data.cvmurl.replace(_tmp0,_tmp1);
if(_data.cv750url)
_data.cv750url=_data.cv750url.replace(_tmp0,_tmp1);
U.obj._$delete(_data,'s');
return _data;
};
p._$$ShareCache=C();
__pro=p._$$ShareCache._$extend(P.ut._$$ECache);
P.ut._$$ShareCache._$filterHide=function(_obj,_flag){
if(!U.obj._$isObject(_obj))
return null;
if(_flag)
return U.obj._$extend({},_obj,function(_data){
return _data.s!=0;
});
else
return U.obj._$extend({},_obj,function(_data){
return _data.id!='37'&&_data.s!=0;
});
};
__pro._$getShareDir=function(_cb){
var _data=this.__getDataInCache('share_dir');
if(_data!=undefined){
_cb(_data);
return;
}
this.__getShareDir._$addCB(_cb);
EJ._$loadScript('http://photo.163.com/share/info/share_dir.json?t=20111001',this.__getShareDir._$bind(this));
};
__pro.__getShareDir=function(){
var _key='g_share_dir',_d=window[_key];
U.obj._$delete(window,_key);
if(_d){
var _map={};
__createIndex(_d,_map);
this.__setDataInCache('share_dir',_d);
this.__setDataInCache('share_dir_map',_map);
}
this.__getShareDir._$fireCB(this.__getDataInCache('share_dir')||null);
};
U.obj._$extend(__pro.__getShareDir,P.ut._$$Callback);
__pro._$getDirByIdInCache=function(_id){
var _map=this.__getDataInCache('share_dir_map');
return _map?_map[_id]:null;
};
__pro._$getDirById=function(_id,_cb){
this.__getDirById._$addCB(_cb);
this._$getShareDir(this.__getDirById._$bind(this,_id));
};
__pro.__getDirById=function(_id,_shareDir){
var _map=this.__getDataInCache('share_dir_map');
this.__getDirById._$fireCB(_id,U.obj._$isObject(_shareDir)?_map[_id]:null);
};
U.obj._$extend(__pro.__getDirById,P.ut._$$Callback);
__pro._$getDirHelps=function(_cb){
var _data=this.__getDataInCache('share_dir_help');
if(_data!=undefined){
_cb(_data);
return;
}
this.__getDirHelps._$addCB(_cb);
EJ._$loadScript('http://photo.163.com/share/info/share_dir_help.json',this.__getDirHelps._$bind(this));
};
__pro.__getDirHelps=function(){
var _key='g_share_dir_help',_d=window[_key];
U.obj._$delete(window,_key);
_d&&this.__setDataInCache('share_dir_help',_d);
this.__getDirHelps._$fireCB(this.__getDataInCache('share_dir_help')||null);
};
U.obj._$extend(__pro.__getDirHelps,P.ut._$$Callback);
__pro._$getDirHelpByIdInCache=function(_id){
var _map=this.__getDataInCache('share_dir_help');
return _map?_map[_id]:null;
};
__pro._$getDirCamerists=function(_cb){
var _data=this.__getDataInCache('share_dir_biz_user');
if(_data!=undefined){
_cb(_data);
return;
}
this.__getDirCamerists._$addCB(_cb);
EJ._$loadScript('http://photo.163.com/share/info/share_dir_biz_user.json',this.__getDirCamerists._$bind(this));
};
__pro.__getDirCamerists=function(){
var _key='g_share_dir_biz_user',_d=window[_key];
U.obj._$delete(window,_key);
_d&&this.__setDataInCache('share_dir_biz_user',_d);
this.__getDirCamerists._$fireCB(this.__getDataInCache('share_dir_biz_user')||null);
};
U.obj._$extend(__pro.__getDirCamerists,P.ut._$$Callback);
__pro._$getDirCameristById=function(_id,_cb){
this.__getDirCameristById._$addCB(_cb);
this._$getDirCamerists(this.__getDirCameristById._$bind(this,_id));
};
__pro.__getDirCameristById=function(_id,_camerists){
this.__getDirCameristById._$fireCB(_id,U.obj._$isObject(_camerists)?_camerists[_id]:null);
};
U.obj._$extend(__pro.__getDirCameristById,P.ut._$$Callback);
__pro._$getCityCamerists=function(_cb){
var _data=this.__getDataInCache('share_city_biz_user');
if(_data!=undefined){
_cb(_data);
return;
}
this.__getCityCamerists._$addCB(_cb);
EJ._$loadScript('http://photo.163.com/share/info/share_city_biz_user.json',this.__getCityCamerists._$bind(this));
};
__pro.__getCityCamerists=function(){
var _key='g_share_city_biz_user',_d=window[_key];
U.obj._$delete(window,_key);
_d&&this.__setDataInCache('share_city_biz_user',_d);
this.__getCityCamerists._$fireCB(this.__getDataInCache('share_city_biz_user')||null);
};
U.obj._$extend(__pro.__getCityCamerists,P.ut._$$Callback);
__pro._$getCityCameristById=function(_id,_cb){
this.__getCityCameristById._$addCB(_cb);
this._$getCityCamerists(this.__getCityCameristById._$bind(this,_id));
};
__pro.__getCityCameristById=function(_id,_camerists){
this.__getCityCameristById._$fireCB(_id,U.obj._$isObject(_camerists)?_camerists[_id]:null);
};
U.obj._$extend(__pro.__getCityCameristById,P.ut._$$Callback);
__pro._$getRegionsInCache=function(){
return this.__getDataInCache('regions');
};
__pro._$getRegions=function(_cb){
var _data=this._$getRegionsInCache();
if(_data!=undefined){
_cb(_data);
return;
}
this.__getRegions._$addCB(_cb);
EJ._$loadScript('http://photo.163.com/share/info/region.json',this.__getRegions._$bind(this));
};
__pro.__getRegions=function(){
var _key='g_region',_d=window[_key];
U.obj._$delete(window,_key);
if(_d){
__preTreatRegions(_d);
var _map={};
__createIndex(_d,_map);
this.__setDataInCache('regions',_d);
this.__setDataInCache('regions_map',_map);
}
this.__getRegions._$fireCB(this.__getDataInCache('regions')||null);
};
U.obj._$extend(__pro.__getRegions,P.ut._$$Callback);
__pro._$getRegionById=function(_id,_cb){
this.__getRegionById._$addCB(_cb);
this._$getRegions(this.__getRegionById._$bind(this,_id));
};
__pro.__getRegionById=function(_id,_region){
var _map=this.__getDataInCache('regions_map');
this.__getRegionById._$fireCB(_id,U.obj._$isObject(_region)?_map[_id]:null);
};
U.obj._$extend(__pro.__getRegionById,P.ut._$$Callback);
__pro._$getCameraInCache=function(){
return this.__getDataInCache('camera');
};
__pro._$getCamera=function(_cb){
var _data=this._$getCameraInCache();
if(_data!=undefined){
_cb(_data);
return;
}
this.__getCamera._$addCB(_cb);
EJ._$loadScript('http://photo.163.com/share/info/camera.json',this.__getCamera._$bind(this));
};
__pro.__getCamera=function(){
var _key='g_camera',_d=window[_key];
U.obj._$delete(window,_key);
if(_d){
var _map={};
__createIndex(_d,_map);
this.__setDataInCache('camera',_d);
this.__setDataInCache('camera_map',_map);
}
this.__getCamera._$fireCB(this.__getDataInCache('camera')||null);
};
U.obj._$extend(__pro.__getCamera,P.ut._$$Callback);
__pro._$getCameraById=function(_id,_cb){
this.__getCameraById._$addCB(_cb);
this._$getCamera(this.__getCameraById._$bind(this,_id));
};
__pro.__getCameraById=function(_id,_camera){
var _map=this.__getDataInCache('camera_map');
this.__getCameraById._$fireCB(_id,U.obj._$isObject(_camera)?_map[_id]:null);
};
U.obj._$extend(__pro.__getCameraById,P.ut._$$Callback);
__pro._$getCameraByStr=function(_make,_mode,_cansCB){
var _camera=this.__getDataInCache('camera')
,_mode2
,_reg
,_tmpData=null
,_tmp;
if(_mode){
if(!_camera){
this._$getCamera(this._$getCameraByStr._$bind(this,_make,_mode,_cansCB));
return;
}
_mode2=_mode.replace(_make,'').replace(/\s+|\[|\]/ig,'').replace(/(.)/ig,function($1){
if($1=='*'){
return'[*]';
}else{
return $1+"\\s*";
}
});
_reg=new RegExp(_mode2,'ig');
for(var _key in _camera){
_tmp=_camera[_key]
if(_tmp.son){
for(var _son in _tmp.son){
var _tmpItem=_tmp.son[_son];
if(_reg.test(_tmpItem.enm)&&_make.toLowerCase()==_tmp.enm.toLowerCase()){
_tmpData={
make:_make
,mode:_mode
,result:_tmpItem
,isCheck:true
};
break;
}
}
if(_tmpData){
break;
}
}
}
}
if(!_tmpData){
_tmpData={
make:_make
,mode:_mode
,result:null
,isCheck:true
};
}
_tmpData=_tmpData.result||{readData:[_make,_mode,'']};
_cansCB&&_cansCB(_tmpData.id||0,_tmpData);
};
__pro._$getLensInCache=function(){
return this.__getDataInCache('lens');
};
__pro._$getLens=function(_cb){
var _data=this._$getLensInCache();
if(_data!=undefined){
_cb(_data);
return;
}
this.__getLens._$addCB(_cb);
EJ._$loadScript('http://photo.163.com/share/info/lens.json',this.__getLens._$bind(this));
};
__pro.__getLens=function(){
var _key='g_lens',_d=window[_key];
U.obj._$delete(window,_key);
if(_d){
var _map={};
__createIndex(_d,_map);
this.__setDataInCache('lens',_d);
this.__setDataInCache('lens_map',_map);
}
this.__getLens._$fireCB(this.__getDataInCache('lens')||null);
};
U.obj._$extend(__pro.__getLens,P.ut._$$Callback);
__pro._$getLensById=function(_id,_cb){
this.__getLensById._$addCB(_cb);
this._$getLens(this.__getLensById._$bind(this,_id));
};
__pro.__getLensById=function(_id,_lens){
var _map=this.__getDataInCache('lens_map');
this.__getLensById._$fireCB(_id,U.obj._$isObject(_lens)?_map[_id]:null);
};
U.obj._$extend(__pro.__getLensById,P.ut._$$Callback);
__pro._$getLenByStr=function(_make,_lens,_lenCB){
var _lenVO=this.__getDataInCache('lens')
,_lens2
,_reg
,_tmpData
,_tmp;
if(_lens){
if(!_lenVO){
this._$getLens(this._$getLenByStr._$bind(this,_make,_lens,_lenCB));
return;
}
_lens2=_lens.replace(_make,'').replace(/\s+|\[|\]/ig,'').replace(/(.)/ig,function($1){
if($1=='*'){
return'[*]';
}else{
return $1+"\\s*";
}
});
_reg=new RegExp(_lens2,'ig');
for(var _key in _lenVO){
_tmp=_lenVO[_key]
if(_tmp.son){
for(var _son in _tmp.son){
var _tmpItem=_tmp.son[_son];
if(_reg.test(_tmpItem.enm)){
_tmpData={
make:_make
,len:_lens
,result:_tmpItem
,isCheck:true
};
break;
}
}
if(_tmpData){
break;
}
}
}
}
if(!_tmpData){
_tmpData={
make:_make
,len:_lens
,result:null
,isCheck:true
};
}
_tmpData=_tmpData.result||{customName:_lens};
_lenCB&&_lenCB(_tmpData.id||0,_tmpData);
};
__pro._$getExifByStr=function(_make,_mode,_lens,_cansCB,_lenCB){
this._$getCameraByStr(_make,_mode,_cansCB||F)
this._$getLenByStr(_make,_lens,_lenCB||F);
};
__pro._$getPictureSetCountByCity=function(_pid,_tid,_cid,_cb){
var _count=this.__getDataInCache('ps_city_count_'+_pid+'_'+_tid+'_'+_cid);
if(_count!=undefined){
_cb(_pid,_tid,_cid,_count);
return;
}
this.__getPictureSetCountByCity._$addCB(_cb);
J._$loadDataByDWR(location.sdwr,'PictureSetBean','getPictureSetCountByCity',_pid,_tid,_cid,this.__getPictureSetCountByCity._$bind(this,_pid,_tid,_cid));
};
__pro.__getPictureSetCountByCity=function(_pid,_tid,_cid,_count){
if(_count){
_count=Math.min(_count,__maxCount);
this.__setDataInCache('ps_city_count_'+_pid+'_'+_tid+'_'+_cid,_count);
this.__setDataInCache('ps_city_list_'+_pid+'_'+_tid+'_'+_cid,new Array(_count));
}
this.__getPictureSetCountByCity._$fireCB(_pid,_tid,_cid,_count);
};
U.obj._$extend(__pro.__getPictureSetCountByCity,P.ut._$$Callback);
__pro._$getPictureSetCountByDirId=function(_id,_cb){
var _count=this.__getDataInCache('ps_dir_count_'+_id);
if(_count!=undefined){
_cb(_id,_count);
return;
}
this.__getPictureSetCountByDirId._$addCB(_cb);
J._$loadDataByDWR(location.sdwr,'PictureSetBean','getPictureSetCountByDirId',_id,this.__getPictureSetCountByDirId._$bind(this,_id));
};
__pro.__getPictureSetCountByDirId=function(_id,_count){
if(_count){
_count=Math.min(_count,__maxCount);
this.__setDataInCache('ps_dir_count_'+_id,_count);
this.__setDataInCache('ps_dir_list_'+_id,new Array(_count));
}
this.__getPictureSetCountByDirId._$fireCB(_id,_count);
};
U.obj._$extend(__pro.__getPictureSetCountByDirId,P.ut._$$Callback);
__pro._$getPictureSetListByDirId=function(_id,_offset,_limit,_cb){
var _list=this.__getListDataInCache('ps_dir_list_'+_id,_offset,_limit);
if(_list!=undefined){
_cb&&_cb(_id,_list);
return;
}
this.__getPictureSetListByDirId._$addCB(_cb);
J._$loadDataByDWR(location.sdwr,'PictureSetBean','getPictureSetListByDirId',_id,_offset,_limit,this.__getPictureSetListByDirId._$bind(this,_id,_offset,_limit));
};
__pro.__getPictureSetListByDirId=function(_id,_offset,_limit,_list){
if(_list){
U.arr._$forEach(_list,function(_ps,_index){
__completeURL(_ps);
});
this.__setListDataInCache('ps_dir_list_'+_id,_offset,_limit,_list);
}
this.__getPictureSetListByDirId._$fireCB(_id,_list);
};
U.obj._$extend(__pro.__getPictureSetListByDirId,P.ut._$$Callback);
__pro._$getPictureSetNewCountByDirId=function(_id,_cb){
var _count=this.__getDataInCache('ps_dir_new_count_'+_id);
if(_count!=undefined){
_cb(_id,_count);
return;
}
this.__getPictureSetNewCountByDirId._$addCB(_cb);
J._$loadDataByDWR(location.sdwr,'PictureSetBean','getPictureSetNewCountByDirId',_id,this.__getPictureSetNewCountByDirId._$bind(this,_id));
};
__pro.__getPictureSetNewCountByDirId=function(_id,_count){
E._$hideHint();
if(_count){
_count=Math.min(_count,__maxCount);
this.__setDataInCache('ps_dir_new_count_'+_id,_count);
this.__setDataInCache('ps_dir_new_list_'+_id,new Array(_count));
}
this.__getPictureSetNewCountByDirId._$fireCB(_id,_count);
};
U.obj._$extend(__pro.__getPictureSetNewCountByDirId,P.ut._$$Callback);
__pro._$getPictureSetNewListByDirId=function(_id,_offset,_limit,_cb){
var _list=this.__getListDataInCache('ps_dir_new_list_'+_id,_offset,_limit);
if(_list!=undefined){
_cb&&_cb(_id,_list);
return;
}
this.__getPictureSetNewListByDirId._$addCB(_cb);
J._$loadDataByDWR(location.sdwr,'PictureSetBean','getPictureSetNewListByDirId',_id,_offset,_limit,this.__getPictureSetNewListByDirId._$bind(this,_id,_offset,_limit));
};
__pro.__getPictureSetNewListByDirId=function(_id,_offset,_limit,_list){
E._$hideHint();
if(_list){
U.arr._$forEach(_list,function(_ps,_index){
__completeURL(_ps);
});
this.__setListDataInCache('ps_dir_new_list_'+_id,_offset,_limit,_list);
}
this.__getPictureSetNewListByDirId._$fireCB(_id,_list);
};
U.obj._$extend(__pro.__getPictureSetNewListByDirId,P.ut._$$Callback);
__pro._$getPictureSetHotListByDirId=function(_id,_offset,_limit,_type,_level,_postType,_cb){
var _list=this.__getListDataInCache('ps_dir_hot_list_'+_id+_type+_level+_postType,_offset,_limit);
if(_list!=undefined){
_cb&&_cb(_id,_list);
return;
}
this.__getPictureSetHotListByDirId._$addCB(_cb);
J._$loadDataByDWR(location.sdwr,'PictureSetBean','getPictureSetHotListByDirId',_id,_offset,_limit,_type,_level,_postType,this.__getPictureSetHotListByDirId._$bind(this,_id,_offset,_limit,_type,_level,_postType));
};
__pro.__getPictureSetHotListByDirId=function(_id,_offset,_limit,_type,_level,_postType,_list){
E._$hideHint();
if(_list){
U.arr._$forEach(_list,function(_ps,_index){
__completeURL(_ps);
});
this.__setListDataInCache('ps_dir_hot_list_'+_id+_type+_level+_postType,_offset,_limit,_list);
}
this.__getPictureSetHotListByDirId._$fireCB(_id,_list);
};
U.obj._$extend(__pro.__getPictureSetHotListByDirId,P.ut._$$Callback);
__pro._$getPictureSetHotCountByDirId=function(_id,_type,_level,_postType,_cb){
var _count=this.__getDataInCache('ps_dir_hot_count_'+_id+"_"+_type+"_"+_level+"_"+_postType,_level);
if(_count!=undefined){
_cb(_id,_count);
return;
}
this.__getPictureSetHotCountByDirId._$addCB(_cb);
J._$loadDataByDWR(location.sdwr,'PictureSetBean','getPictureSetHotCountByDirId',_id,_type,_level,_postType,this.__getPictureSetHotCountByDirId._$bind(this,_id,_type,_level,_postType));
};
__pro.__getPictureSetHotCountByDirId=function(_id,_type,_level,_postType,_count){
E._$hideHint();
if(_count){
_count=Math.min(_count,__maxCount);
this.__setDataInCache('ps_dir_hot_count_'+_id+"_"+_type+"_"+_level+"_"+_postType,_count);
this.__setDataInCache('ps_dir_hot_list_'+_id+"_"+_type+"_"+_level+"_"+_postType,new Array(_count));
}
this.__getPictureSetHotCountByDirId._$fireCB(_id,_count);
};
U.obj._$extend(__pro.__getPictureSetHotCountByDirId,P.ut._$$Callback);
__pro._$getPictureSetRecommendCountByDirId=function(_id,_cb){
var _count=this.__getDataInCache('ps_dir_recom_count_'+_id);
if(_count!=undefined){
_cb(_id,_count);
return;
}
this.__getPictureSetRecommendCountByDirId._$addCB(_cb);
J._$loadDataByDWR(location.sdwr,'PictureSetBean','getPictureSetRecommendCountByDirId',_id,this.__getPictureSetRecommendCountByDirId._$bind(this,_id));
};
__pro.__getPictureSetRecommendCountByDirId=function(_id,_count){
E._$hideHint();
if(_count){
_count=Math.min(_count,__maxCount);
this.__setDataInCache('ps_dir_recom_count_'+_id,_count);
this.__setDataInCache('ps_dir_recom_list_'+_id,new Array(_count));
}
this.__getPictureSetRecommendCountByDirId._$fireCB(_id,_count);
};
U.obj._$extend(__pro.__getPictureSetRecommendCountByDirId,P.ut._$$Callback);
__pro._$getPictureSetRecommendListByDirId=function(_id,_offset,_limit,_cb){
var _list=this.__getListDataInCache('ps_dir_recom_list_'+_id,_offset,_limit);
if(_list!=undefined){
_cb&&_cb(_id,_list);
return;
}
this.__getPictureSetRecommendListByDirId._$addCB(_cb);
J._$loadDataByDWR(location.sdwr,'PictureSetBean','getPictureSetRecommendListByDirId',_id,_offset,_limit,this.__getPictureSetRecommendListByDirId._$bind(this,_id,_offset,_limit));
};
__pro.__getPictureSetRecommendListByDirId=function(_id,_offset,_limit,_list){
E._$hideHint();
if(_list){
U.arr._$forEach(_list,function(_ps,_index){
__completeURL(_ps);
});
this.__setListDataInCache('ps_dir_recom_list_'+_id,_offset,_limit,_list);
}
this.__getPictureSetRecommendListByDirId._$fireCB(_id,_list);
};
U.obj._$extend(__pro.__getPictureSetRecommendListByDirId,P.ut._$$Callback);
__pro._$getPictureSetListByCity=function(_pid,_tid,_cid,_offset,_limit,_cb){
var _list=this.__getListDataInCache('ps_city_list_'+_pid+'_'+_tid+'_'+_cid,_offset,_limit);
if(_list!=undefined){
_cb&&_cb(_pid,_tid,_cid,_list);
return;
}
this.__getPictureSetListByCity._$addCB(_cb);
J._$loadDataByDWR(location.sdwr,'PictureSetBean','getPictureSetListByCity',_pid,_tid,_cid,_offset,_limit,this.__getPictureSetListByCity._$bind(this,_pid,_tid,_cid,_offset,_limit));
};
__pro.__getPictureSetListByCity=function(_pid,_tid,_cid,_offset,_limit,_list){
U.arr._$forEach(_list,function(_ps,_index){
__completeURL(_ps);
});
this.__setListDataInCache('ps_city_list_'+_pid+'_'+_tid+'_'+_cid,_offset,_limit,_list);
this.__getPictureSetListByCity._$fireCB(_pid,_tid,_cid,_list);
};
U.obj._$extend(__pro.__getPictureSetListByCity,P.ut._$$Callback);
__pro._$createPicSet=function(_data){
J._$postDataByDWR(location.sdwr,'PictureSetBean','create',_data.name,_data.desc||'',_data.pids,_data.descs,_data.cvid,_data.littleCoverDocId,_data.provinceCode,_data.citeCode||0,_data.cameraBrand||0,_data.cameraType||0,_data.cameraLens||0,_data.dirNamePath,_data.idPath,_data.dirType,_data.customName||'',_data.ext||'',_data.from||'',U.obj._$getData('diycameras'),_data.thirdParts||[],false,this._$dispatchEvent._$bind(this,'oncreatepicset'));
};
__pro._$updateMeta=function(_data){
J._$postDataByDWR(location.sdwr,'PictureSetBean','updateMeta',_data.sid,_data.name,_data.desc||'',_data.pids,_data.descs,_data.cvid,_data.littleCoverDocId||0,_data.provinceCode,_data.citeCode||0,_data.cameraBrand||0,_data.cameraType||0,_data.cameraLens||0,_data.dirNamePath,_data.idPath,_data.dirType,_data.ext||'',U.obj._$getData('diycameras'),this._$dispatchEvent._$bind(this,'onupdatemeta'));
};
__pro._$deletePicSet=function(_id,_flag,_type,_cb){
this.__deletePicSet._$addCB(_cb);
J._$postDataByDWR(location.sdwr,'PictureSetBean','updateDeleteFlag',_id,_flag,this.__deletePicSet._$bind(this,_id,_type));
};
__pro.__deletePicSet=function(_id,_type,_suc){
if(_suc){
var _data=this.__getDataInCache('share_picture_set');
if(U.arr._$isArray(_data)){
for(var i=0,_set;_set=_data[i];i++)
if(_set.id===_id){
_data.splice(i,1);
break;
}
this.__setDataInCache('share_picture_set',_data);
}
this.__delDataInCache('picturesetcate'+__ud.hostId);
}
this.__deletePicSet._$fireCB(_suc);
};
U.obj._$extend(__pro.__deletePicSet,P.ut._$$Callback);
__pro._$getPictureSet=function(_cb){
var _data=this.__getDataInCache('share_picture_set');
if(_data!=undefined||!__ud.pictureSetUrl){
_cb(_data);
return;
}
this.__getPictureSet._$addCB(_cb);
EJ._$loadScript(__ud.pictureSetUrl,this.__getPictureSet._$bind(this));
};
__pro.__getPictureSet=function(){
var _key='g_set$'+__ud.hostId,_d=window[_key];
U.obj._$delete(window,_key);
U.arr._$forEach(_d,function(_ps){
__completeURL(_ps);
});
if(U.arr._$isArray(_d)){
_d.sort(function(_x,_y){
return _y.ctime-_x.ctime;
});
this.__setDataInCache('share_picture_set',_d);
}
this.__getPictureSet._$fireCB(this.__getDataInCache('share_picture_set')||null);
};
U.obj._$extend(__pro.__getPictureSet,P.ut._$$Callback);
__pro._$getPictureSetByID=function(_id,_cb){
this.__getPictureSetByID._$addCB(_cb);
J._$postDataByDWR(location.sdwr,'PictureSetBean','getPictureSetByPicSetId',_id,this.__getPictureSetByID._$bind(this,_id));
};
__pro.__getPictureSetByID=function(_id,_data){
this.__getPictureSetByID._$fireCB(_id,__completeURL(_data));
};
U.obj._$extend(__pro.__getPictureSetByID,P.ut._$$Callback);
__pro._$getPraiseCount=function(_uid,_cb){
var _data=this.__getDataInCache('picture_set_praise_'+_uid);
if(_data!=undefined){
_cb(_data);
return;
}
this.__getPraiseCount._$addCB(_cb);
J._$postDataByDWR(location.sdwr,'PicSetInteractionBean','getPraiseCount',_uid,this.__getPraiseCount._$bind(this,_uid));
};
__pro.__getPraiseCount=function(_uid,_num){
if(_num!=undefined)
this.__setDataInCache('picture_set_praise_'+_uid,_num);
this.__getPraiseCount._$fireCB(_num||0);
};
U.obj._$extend(__pro.__getPraiseCount,P.ut._$$Callback);
__pro._$getPersonalLikeViewCount=function(_id,_ids,_uid,_cb){
this.__getLikeViewCount._$addCB(_cb);
J._$postDataByDWR(location.sdwr,'PicSetInteractionBean','getPersonalLikeViewCount',_ids,_uid,this.__getLikeViewCount._$bind(this,_id,_ids));
};
__pro._$getLikeViewCount=function(_id,_ids,_uids,_cb){
this.__getLikeViewCount._$addCB(_cb);
J._$postDataByDWR(location.sdwr,'PicSetInteractionBean','getLikeViewCount',_ids,_uids,this.__getLikeViewCount._$bind(this,_id,_ids));
};
__pro.__getLikeViewCount=function(_id,_ids,_lvs){
if(_lvs&&!_id){
var _ps=this.__getDataInCache('share_picture_set');
if(U.arr._$isArray(_ps))
U.arr._$forEach(_lvs,function(_lv,_index){
var _obj=_ps[_index],_lv=_lv||{};
_obj.vcnt=_lv.vcnt;
_obj.lcnt=_lv.lcnt;
_obj.ccnt=_lv.ccnt;
_obj.build=true;
});
}
this.__getLikeViewCount._$fireCB(_ids,_lvs);
};
U.obj._$extend(__pro.__getLikeViewCount,P.ut._$$Callback);
__pro._$getPictureSetByPicSetIdStr=function(_ids,_id){
var _data=this.__getDataInCache('picture_set_photo_'+_id);
if(_data!=undefined){
this._$dispatchEvent('onpicturesetload',_id,_data);
return;
}
J._$postDataByDWR(location.sdwr,'PictureSetBean','getPictureSetByPicSetIdStr',_ids,this.__getPictureSetByPicSetIdStr._$bind(this,_id));
};
__pro.__getPictureSetByPicSetIdStr=function(_id,_ps){
_ps&&this.__setDataInCache('picture_set_photo_'+_id,_ps);
this._$dispatchEvent('onpicturesetload',_id,_ps||null);
};
__pro._$getPictureSets75PictureUrl=function(_offset,_limit,_cb){
this.__getPictureSets75PictureUrl._$addCB(_cb);
J._$postDataByDWR(location.sdwr,'PictureSetBean','getPictureSets75PictureUrl',_offset,_limit,this.__getPictureSets75PictureUrl._$bind(this));
};
__pro.__getPictureSets75PictureUrl=function(_data){
if(!_data){
this.__getPictureSets75PictureUrl._$fireCB(null);
return;
}
U.arr._$forEach(_data,function(_ps){
__completeURL(_ps);
});
if(U.arr._$isArray(_data)){
_data.sort(function(_x,_y){
return _y.ctime-_x.ctime;
});
}
this.__getPictureSets75PictureUrl._$fireCB(_data);
};
U.obj._$extend(__pro.__getPictureSets75PictureUrl,P.ut._$$Callback);
__pro._$getPictureSetsWithCover=function(_offset,_limit,_isFor240,_cb){
this.__getPictureSetsWithCover._$addCB(_cb);
J._$loadDataByDWR(location.sdwr,'PictureSetBean','getPictureSetsWithCover',_offset,_limit,_isFor240,this.__getPictureSetsWithCover._$bind(this));
};
__pro.__getPictureSetsWithCover=function(_data){
if(!_data){
this.__getPictureSetsWithCover._$fireCB(null);
return;
}
U.arr._$forEach(_data,function(_ps){
__completeURL(_ps);
});
this.__getPictureSetsWithCover._$fireCB(_data);
};
U.obj._$extend(__pro.__getPictureSetsWithCover,P.ut._$$Callback);
__pro._$getPictureSetCate=function(){
var _data=this.__getDataInCache('picturesetcate'+__ud.hostId);
if(_data)
this._$dispatchEvent('onpicturesetcateload',_data);
else
J._$postDataByDWR(location.sdwr,'PictureSetBean','getPictureSetCate',this.__getPictureSetCate._$bind(this));
};
__pro.__getPictureSetCate=function(_data){
if(!_data){
this._$dispatchEvent('onpicturesetcateload',null);
return;
}
this.__setDataInCache('picturesetcate'+__ud.hostId,_data);
this._$dispatchEvent('onpicturesetcateload',_data);
};
__pro._$getLovePhotoFolderList=function(_uid){
var _data=this.__getLovePhotoFolderListInCache(_uid);
if(_data!=undefined){
this._$dispatchEvent('onlovephotofolderlistget',_data);
return;
}
J._$postDataByDWR(location.sdwr,'LovePhotoFolderBean','getLovePhotoFolderListByUserIdOrderByCreateTimeDESC',_uid,0,1000,this.__getLovePhotoFolderList._$bind(this,_uid));
};
__pro.__getLovePhotoFolderList=function(_uid,_data){
if(!_data){
this._$dispatchEvent('onlovephotofolderlistget',null);
return;
}
if(_data!=undefined){
var _filed='lastFavTime';
_data.sort(function(_data0,_data1){
return __arraySortFunc(_filed,-1,_data0,_data1);
});
}
this.__addLovePhotoFolderListInCache(_uid,_data);
this._$dispatchEvent('onlovephotofolderlistget',_data);
};
__pro._$getLovePhotoFolderListForIndex=function(_uid){
var _data=this.__getLovePhotoFolderListInCache(_uid);
if(_data!=undefined){
this._$dispatchEvent('onlovephotofolderlistget',_data);
return;
}
J._$postDataByDWR(location.sdwr,'LovePhotoFolderBean','getLovePhotoFolderListByUserIdOrderByCreateTimeDESC',_uid,0,1000,this.__getLovePhotoFolderListForIndex._$bind(this,_uid));
};
__pro.__getLovePhotoFolderListForIndex=function(_uid,_data){
if(!_data){
this._$dispatchEvent('onlovephotofolderlistget',null);
return;
}
var favsort=this.__getDataInCache('love_photo_folder_list_favsort'+_uid);
if(favsort==undefined)
favsort=__ud.favSort;
this.__addLovePhotoFolderListInCache(_uid,_data);
_data=this.__sortLovePhotoFolderList(favsort);
this._$dispatchEvent('onlovephotofolderlistget',_data);
};
__pro.__addLovePhotoFolderListInCache=function(_uid,_data){
this.__setDataInCache('love_photo_folder_list'+_uid,_data);
};
__pro.__getLovePhotoFolderListInCache=function(_uid){
return this.__getDataInCache('love_photo_folder_list'+_uid);
};
__pro._$addLovePhotoFolder=function(_uid,_title){
J._$postDataByDWR(location.sdwr,'LovePhotoFolderBean','addLovePhotoFolder',_title,this.__addLovePhotoFolder._$bind(this,_uid));
};
__pro.__addLovePhotoFolder=function(_uid,_folder){
if(_folder){
if(_folder.errorType==-1){
alert('最多只能创建1000个收藏夹。');
return;
}
else
if(_folder.errorType==2)
alert('创建失败。收藏夹名或描述中含有不恰当的词汇。');
else{
var _data=this.__getLovePhotoFolderListInCache(_uid);
_data.unshift(_folder);
}
}
this._$dispatchEvent('onlovephotofolderadd',_data||null,_folder||null);
};
__pro.__addLovePhotoFolderInCache=function(_uid,_folder){
var _data=this.__getLovePhotoFolderListInCache(_uid);
_data.unshift(_folder);
var _sortType=this.__getDataInCache('love_photo_folder_list_favsort'+_uid);
if(_sortType==undefined)
_sortType=__ud.favSort;
_data=this.__sortLovePhotoFolderList(_sortType);
return _data;
};
__pro._$updateLovePhotoFolder=function(_uid,_id,_title){
J._$postDataByDWR(location.sdwr,'LovePhotoFolderBean','updateLovePhotoFolder',_id,_title,this.__updateLovePhotoFolder._$bind(this,_uid,_id,_title));
};
__pro.__updateLovePhotoFolder=function(_uid,_id,_title,_folder){
if(_folder&&_folder.errorType!=2)
this.__updateLovePhotoFolderInCache(_uid,_id,_title);
this._$dispatchEvent('onupdatelovephotofolder',_folder);
};
__pro.__updateLovePhotoFolderInCache=function(_uid,_id,_title){
var _data=this.__getLovePhotoFolderListInCache(_uid)||'',_folder;
if(!_data)
return null;
if(U.arr._$isArray(_data)){
for(var i=0,_folder;_folder=_data[i];i++)
if(_folder.id===_id){
_data[i].title=_title;
_folder=_data[i];
break;
}
this.__setDataInCache('love_photo_folder_list'+_uid,_data);
}
return _folder;
};
__pro._$deleteLovePhotoFolder=function(_id){
J._$postDataByDWR(location.sdwr,'LovePhotoFolderBean','deleteLovePhotoFolder',_id,this.__deleteLovePhotoFolder._$bind(this,_id));
};
__pro.__deleteLovePhotoFolder=function(_id,_suc){
if(_suc)
this.__deleteLovePhotoFolderInCache(_id);
this._$dispatchEvent('onlovephotofolderdelete',_suc||false);
};
__pro.__deleteLovePhotoFolderInCache=function(_id){
var _data=this.__getLovePhotoFolderListInCache(__ud.hostId);
if(U.arr._$isArray(_data)){
for(var i=0,_folder;_folder=_data[i];i++)
if(_folder.id===_id){
_data.splice(i,1);
break;
}
this.__setDataInCache('love_photo_folder_list'+__ud.hostId,_data);
}
};
__pro._$addLovePhotoUserItem=function(_folderId,_photoId,_setId,_picId,_authorId,_cmt,_send2NeWeibo,_event){
_authorId=_authorId==0?__ud.hostId:_authorId;
var _data=this.__getLovePhotoFolderListInCache(__ud.visitId);
if(_data!=undefined){
if(U.arr._$isArray(_data)){
for(var i=0,_item;_item=_data[i];i++)
if(_item.id==_folderId){
_data.splice(i,1);
_data.unshift(_item);
break;
}
}
this.__setDataInCache('love_photo_folder_list'+__ud.visitId,_data);
}
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','addLovePhotoUserItem',_folderId,_photoId,_setId,_picId,_authorId,_cmt||'',_event||false,_send2NeWeibo||false,false,this.__addLovePhotoUserItem._$bind(this));
};
__pro.__addLovePhotoUserItem=function(_photo){
if(!_photo){
alert('收藏相片失败，请稍后再试!');
return;
}
switch(_photo.errorType){
case-1:
alert('一个收藏夹最多存放1000张相片。请选择其他收藏夹或创建新收藏夹。');
break;
case 1:
alert('相片被作者设置访问权限，不能被收藏。');
break;
case 2:
alert('评论失败，评论中含有不恰当的词汇。');
break;
}
this._$dispatchEvent('onlovephotouseritemadd',_photo);
};
__pro._$sortLovePhotoFolderList=function(_uid,_type){
var _data=this.__getLovePhotoFolderListInCache(_uid);
J._$postDataByDWR(location.sdwr,'LovePhotoFolderBean','updateFavSeq',_type,this.__changeLovePhotoFolderSort._$bind(this,_type));
};
__pro.__changeLovePhotoFolderSort=function(_type,_suc){
if(!_suc){
this._$dispatchEvent('onlovephotofoldersortchange',false);
return;
}
var _data=this.__sortLovePhotoFolderList(_type);
if(_data!=undefined)
this.__setDataInCache('love_photo_folder_list'+__ud.hostId,_data);
this.__setDataInCache('love_photo_folder_list_favsort'+__ud.hostId,_type);
this._$dispatchEvent('onlovephotofoldersortchange',true,_type);
};
__pro.__sortLovePhotoFolderList=function(_type){
var _data=this.__getLovePhotoFolderListInCache(__ud.hostId);
if(!_data)
return;
var _filed,_flag;
switch(_type){
case 0:
case 1:
_filed='createTime';
_flag=0.5;
break;
case 2:
case 3:
_filed='lastFavTime';
_flag=2.5;
break;
case 4:
case 5:
_filed='title';
_flag=4.5;
break;
default:
_filed='createTime';
_flag=0.5;
break;
}
_flag=2*(_flag-_type);
_data.sort(function(_data0,_data1){
if(_filed=='title')
return __arrayLocalSortFunc(_filed,_flag,_data0,_data1);
return __arraySortFunc(_filed,_flag,_data0,_data1);
});
return _data;
};
var __arrayLocalSortFunc=function(_filed,_flag,_data0,_data1){
var _result=0;
if(_data0[_filed].localeCompare(_data1[_filed])!=0)
_result=_data0[_filed].localeCompare(_data1[_filed]);
return _result*_flag;
};
var __arraySortFunc=function(_filed,_flag,_data0,_data1){
var _result=0;
if(_filed=='lastFavTime'){
if(_data0[_filed]==0)
_data0[_filed]=_data0['updateTime'];
if(_data1[_filed]==0)
_data1[_filed]=_data0['updateTime'];
}
if(_data0[_filed]!=_data1[_filed])
_result=_data0[_filed]<_data1[_filed]?-1:1;
return _result*_flag;
};
__pro._$getLovePhotoUserItemList=function(_uid,_fid,_offset,_limit){
if(_offset==0&&_limit==1000){
var _data=this.__getDataInCache('love_photo_list'+_fid);
if(_data!=undefined){
this._$dispatchEvent('onlovephotouseritemlistget',_data||[]);
return;
}
}
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','getLovePhotoUserItemListByFolderId',_fid,_offset,_limit,this.__getLovePhotoUserItemList._$bind(this,_fid));
};
__pro.__getLovePhotoUserItemList=function(_fid,_data){
var _tmp1=[],_tmp2=[];
if(_data){
U.arr._$forEach(_data,function(_d){
_d.s=_d.imgStorageType;
_d.lurl=_d.imageUrl;
_d.murl=_d.imageLUrl;
if(_d.lurl=='noauth'){
_d.lurl=location.na130;
_d.murl=location.na250;
}
else
if(_d.lurl=='deled'){
_d.lurl=location.del130;
_d.murl=location.del250;
}
else
__completeURL(_d);
if(__ud.visitId!=""){
if(''+_d.hostid==__ud.visitId){
_tmp1.push(_d);
}
else
_tmp2.push(_d);
}
});
_tmp2=__ud.visitId!=""?_tmp1.concat(_tmp2):_data;
this.__setDataInCache('love_photo_list'+_fid,_tmp2);
}
this._$dispatchEvent('onlovephotouseritemlistget',_tmp2||[]);
};
__pro._$getLovePhotoFolder=function(_fid,_uid){
J._$postDataByDWR(location.sdwr,'LovePhotoFolderBean','getLovePhotoFolderById',_fid,_uid,this._$dispatchEvent._$bind(this,'onlovephotofolderget'));
};
__pro._$getTop5UserOfMaxLovedPhoto=function(_uid,_fid){
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','getTop5UserOfMaxLovedPhoto',_uid,_fid,this._$dispatchEvent._$bind(this,'ontop5userofmaxlovedphotoget'));
};
__pro._$getLovePhotoUserItem=function(_pid,_uid){
var _data=this.__getDataInCache('love_photo_'+_uid+'_'+_pid);
if(_data!=undefined){
this._$dispatchEvent('onlovephotoitemget',_data);
return;
}
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','getLovePhotoUserItemByPidAndUserId',_pid,_uid,this.__getLovePhotoItem._$bind(this,_uid,_pid));
};
__pro.__getLovePhotoItem=function(_uid,_pid,_data){
if(_data)
this.__setDataInCache('love_photo_'+_uid+'_'+_pid,_data);
this._$dispatchEvent('onlovephotoitemget',_data);
};
__pro._$favriteLovePhotoUserItemList=function(_ids,_fid,_event){
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','addLovePhotoUserItemList',_ids,_fid,'',_event||false,false,this.__favriteLovePhotoUserItemList._$bind(this,_ids.split(',').length));
};
__pro.__favriteLovePhotoUserItemList=function(_ocount,_fcount){
if(_fcount==-1){
alert('一个收藏夹最多存放1000张相片。请选择其他收藏夹或创建新收藏夹。');
return;
}
var _delta=_ocount-_fcount;
!!_delta?alert('收藏本页成功！其中'+_delta+'张相片已在你的收藏夹中，不能被重复收藏。'):alert('收藏本页成功！');
this._$dispatchEvent('onfavritelovephotouseritemlistadd');
};
__pro._$addLovePhotoFolderFavorite=function(_fid,_uid,_content){
J._$postDataByDWR(location.sdwr,'LovePhotoFolderFavoriteBean','addLovePhotoFolderFavorite',_fid,_uid,_content,this._$dispatchEvent._$bind(this,'onlovephotofolderfavoriteadd'));
};
__pro._$getLovePhotoFolderFavriteCount=function(_fid){
J._$postDataByDWR(location.sdwr,'LovePhotoFolderFavoriteBean','getLovePhotoFolderFavriteCountByLovePhotoFolderId',_fid,this._$dispatchEvent._$bind(this,'onlovephotofolderfavritecountget'));
};
__pro._$checkLovePhotoFolderFavorite=function(_fid){
J._$postDataByDWR(location.sdwr,'LovePhotoFolderFavoriteBean','isLovePhotoFolderFavoriteByUserIdAndFolderId',_fid,this._$dispatchEvent._$bind(this,'onlovephotofolderfavoritecheck'));
};
__pro._$isLovePhotoUserItem=function(_pid,_uid){
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','isLovePhotoUserItem',_pid,_uid,this._$dispatchEvent._$bind(this,'onislovephotouseritemget'));
};
__pro._$getLovePhotoUserItemTopUser20ByPhotoId=function(_pid){
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','getLovePhotoUserItemTopUser20ByPhotoId',_pid,this._$dispatchEvent._$bind(this,'onlovephotouseritemtopuserget'));
};
__pro._$getPictureSetBySetIdAndUId=function(_ids,_id,_uid){
var _data=this.__getDataInCache('picture_set_photo_'+_id);
if(_data!=undefined){
this._$dispatchEvent('onpicturesetload',_id,_data);
return;
}
J._$postDataByDWR(location.sdwr,'PictureSetBean','getPictureSetBySetIdAndUId',_ids,_uid,this.__getPictureSetBySidAndUid._$bind(this,_id));
};
__pro.__getPictureSetBySidAndUid=function(_id,_ps){
_ps&&this.__setDataInCache('picture_set_photo_'+_id,_ps);
if(_ps)
__completeURL(_ps);
this._$dispatchEvent('onpicturesetload',_id,_ps||null);
};
__pro._$getLovePhotoHostItemListBySetId=function(_sid,_uid,_offset,_limit,_cb){
this.__getLovePhotoHostItemListBySetId._$addCB(_cb);
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','getLovePhotoHostItemListBySetId',_sid,_uid,_offset,_limit,this.__getLovePhotoHostItemListBySetId._$bind(this,_sid,_offset,_limit));
};
__pro.__getLovePhotoHostItemListBySetId=function(_sid,_offset,_limit,_list){
this.__getLovePhotoHostItemListBySetId._$fireCB(_list);
};
U.obj._$extend(__pro.__getLovePhotoHostItemListBySetId,P.ut._$$Callback);
__pro._$getLovePhotoHostItemListByPhotoId=function(_pid,_uid,_offset,_limit,_cb){
var _list=this.__getListDataInCache('lp_list_'+_pid,_offset,_limit);
if(_list!=undefined){
_cb&&_cb(_list);
return;
}
this.__getLovePhotoHostItemListByPhotoId._$addCB(_cb);
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','getLovePhotoHostItemListByPhotoId',_pid,_uid,_offset,_limit,this.__getLovePhotoHostItemListByPhotoId._$bind(this,_pid,_offset,_limit));
};
__pro.__getLovePhotoHostItemListByPhotoId=function(_pid,_offset,_limit,_list){
if(_list)
this.__setListDataInCache('lp_list_'+_pid,_offset,_limit,_list);
this.__getLovePhotoHostItemListByPhotoId._$fireCB(_list);
};
U.obj._$extend(__pro.__getLovePhotoHostItemListByPhotoId,P.ut._$$Callback);
__pro._$getLovePhotoHostItemCountByPhotoId=function(_id,_uid){
J._$loadDataByDWRWithSync(location.sdwr,'LovePhotoItemBean','getLovePhotoHostItemCountByPhotoId',_id,_uid,this._$dispatchEvent._$bind(this,'onlovephotohostitemcountbyphotoidget'));
};
__pro._$getLovePhotoHostItemCountBySetId=function(_id,_uid){
J._$loadDataByDWRWithSync(location.sdwr,'LovePhotoItemBean','getLovePhotoHostItemCountBySetId',_id,_uid,this._$dispatchEvent._$bind(this,'onlovephotohostitemcountbysetidget'));
};
__pro._$deleteLovePhotoUserItem=function(_fid,_id,_uid){
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','deleteLovePhotoUserItem',_fid,_id,_uid,this.__deleteLovePhotoUserItem._$bind(this,_fid,_id));
};
__pro.__deleteLovePhotoUserItem=function(_fid,_id,_suc){
var _data=this.__getLovePhotoFolderListInCache(__ud.hostId);
if(_data!=undefined){
if(U.arr._$isArray(_data)){
for(var i=0,_folder;_folder=_data[i];i++){
if(_folder.id==_fid){
_data[i].count=_data[i].count-1;
break;
}
}
this.__setDataInCache('love_photo_folder_list'+__ud.hostId,_data);
}
}
var _data2=this.__getDataInCache('love_photo_list'+_fid);
if(_data2!=undefined){
if(U.arr._$isArray(_data2)){
for(var i=0,_item;_item=_data2[i];i++)
if(_item.photoId===_id){
_data2.splice(i,1);
break;
}
this.__setDataInCache('love_photo_list'+_fid,_data2);
}
}
this._$dispatchEvent('onlovephotouseritemdelete',_suc);
};
__pro._$movePhoto=function(_uid,_pid,_sid,_did){
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','moveLovePhoto',_uid,_pid,_sid,_did,this.__movePhoto._$bind(this,_sid,_did,_pid));
};
__pro.__movePhoto=function(_sid,_did,_pid,_suc){
var _data=this.__getLovePhotoFolderListInCache(__ud.hostId);
var _j=0;
if(U.arr._$isArray(_data)){
for(var i=0;i<_data.length;i++){
if(_data[i].id==_sid){
_data[i].count=_data[i].count-1;
_j=_j+1;
}
if(_data[i].id==_did){
_data[i].count=_data[i].count+1;
_j=_j+1;
}
if(_j>=2)
break;
}
this.__setDataInCache('love_photo_folder_list'+__ud.hostId,_data);
}
var _data2=this.__getDataInCache('love_photo_list'+_sid);
if(U.arr._$isArray(_data2)){
for(var i=0,_item;_item=_data2[i];i++)
if(_item.photoId===_pid){
_data2.splice(i,1);
break;
}
this.__setDataInCache('love_photo_list'+_sid,_data2);
}
this._$dispatchEvent('onphotomove',_suc);
};
__pro._$moveLovePhotos=function(_pids,_hids,_sid,_did){
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','batchmoveLovePhotos',_pids,_hids,_sid,_did,this.__moveLovePhotos._$bind(this,_sid,_did));
};
__pro.__moveLovePhotos=function(_sid,_did,_count){
var _data=this.__getLovePhotoFolderListInCache(__ud.hostId);
var _j=0;
if(U.arr._$isArray(_data)){
for(var i=0;i<_data.length;i++){
if(_data[i].id===_sid){
_data[i].count=_data[i].count-_count;
_j=_j+1;
}
if(_data[i].id==_did){
_data[i].count=_data[i].count+_count;
_j=_j+1;
}
if(_j>=2)
break;
}
this.__setDataInCache('love_photo_folder_list'+__ud.hostId,_data);
}
this._$dispatchEvent('onlovephotobatchmoves',_count);
};
__pro._$getPhotoByPhotoId=function(_pid,_uid){
J._$loadDataByDWR(location.sdwr,'LovePhotoItemBean','getPhotoByPhotoId',_pid,_uid,this._$dispatchEvent._$bind(this,'onphotoget'));
};
__pro._$getPhotoBySetId=function(_sid,_uid){
J._$loadDataByDWR(location.sdwr,'LovePhotoItemBean','getPhotoBySetId',_sid,_uid,this._$dispatchEvent._$bind(this,'onphotoget'));
};
__pro._$getPicSetLovePhotoBySetId=function(_sid){
J._$loadDataByDWR(location.sdwr,'LovePhotoItemBean','getPicSetLovePhotoBySetId',_sid,__ud.hostId,this._$dispatchEvent._$bind(this,'onpicsetlovephotoget'));
};
__pro._$getAuthorPraiseCount=function(_uid,_cb){
this.__getAuthorPraiseCount._$addCB(_cb);
J._$postDataByDWR(location.sdwr,'PicSetInteractionBean','getPraiseCount',_uid,this.__getAuthorPraiseCount._$bind(this,_uid));
};
__pro.__getAuthorPraiseCount=function(_uid,_num){
this.__getAuthorPraiseCount._$fireCB(_num||0);
};
U.obj._$extend(__pro.__getAuthorPraiseCount,P.ut._$$Callback);
__pro._$clickPraise=function(_hostid,_visitid){
J._$postDataByDWR(location.sdwr,'PicSetInteractionBean','clickPraise',_hostid,_visitid,this.__clickPraise._$bind(this,_hostid));
};
__pro.__clickPraise=function(_hostid,_num){
if(_num!=null)
this.__setDataInCache('picture_set_praise_'+_hostid,_num);
this._$dispatchEvent('onpraiseclick',_num);
};
__pro._$getLovePhotoUserItemCount=function(){
J._$loadDataByDWR(location.sdwr,'LovePhotoItemBean','getLovePhotoUserItemCountByUserId',__ud.hostId,this._$dispatchEvent._$bind(this,'onlovephotouseritemcountget'));
};
__pro._$deleteLovePhotos=function(_fid,_pids,_hids){
J._$postDataByDWR(location.sdwr,'LovePhotoItemBean','deleteLovePhotos',_fid,_pids,_hids,this.__deleteLovePhotos._$bind(this,_fid));
};
__pro.__deleteLovePhotos=function(_fid,_count){
var _data=this.__getLovePhotoFolderListInCache(__ud.hostId);
if(_data!=undefined){
if(U.arr._$isArray(_data)){
for(var i=0;i<_data.length;i++){
if(_data[i].id==_fid){
_data[i].count=_data[i].count-_count;
break;
}
}
this.__setDataInCache('love_photo_folder_list'+__ud.hostId,_data);
}
}
this._$dispatchEvent('onlovephotouseritembatchdelete',_count);
};
__pro._$getHuoDongPictureSetByPicSetIdStr=function(_ids){
J._$loadDataByDWR(location.hdwr,'HuoDongBean','getLastHuoDongByPicSetIds',_ids,this._$dispatchEvent._$bind(this,'onhuodongpicsetget'));
};
})();

(function(){
var p=P('P.ut'),
__proCache,
__ud=window.UD;
p._$$TrackCache=C();
__proCache=p._$$TrackCache._$extend(P.ut._$$ECache);
__proCache.__addUserFollowInCache=function(_follow){
if(!U.obj._$isObject(_follow))return;
var _pid=_follow.parentID,_cid=_follow.ChildID;
var _count=this.__getDataInCache('following_count_'+_pid),_list;
if(_count>0){
this.__setDataInCache('following_count_'+_pid,_count+1);
_list=this.__getDataInCache('following_list_'+_pid);
if(U.arr._$isArray(_list)){
_list.unshift(_follow);
this.__setDataInCache('following_list_'+_pid,_list);
}
}
_count=this.__getDataInCache('followed_count_'+_cid);
if(_count>0){
this.__setDataInCache('followed_count_'+_cid,_count+1);
_list=this.__getDataInCache('followed_list_'+_cid);
if(U.arr._$isArray(_list)){
_list.unshift(_follow);
this.__setDataInCache('followed_list_'+_cid,_list);
}
}
};
__proCache.__clearUserFollowInCache=function(){
this.__delDataInCache('following_count_'+__ud.hostId);
this.__delDataInCache('following_list_'+__ud.hostId);
}
__proCache.__deleteUserFollowInCache=function(_follow){
if(!U.obj._$isObject(_follow))return;
var _pid=_follow.parentID,_cid=_follow.ChildID;
var _count=this.__getDataInCache('following_count_'+_pid),_list;
if(_count>0){
this.__setDataInCache('following_count_'+_pid,_count-1);
_list=this.__getDataInCache('following_list_'+_pid);
if(U.arr._$isArray(_list)){
for(var i=0,_f;_f=_list[i];i++){
if(_f.id==_follow.id){
_list.splice(i,1);
break;
}
}
this.__setDataInCache('following_list_'+_pid,_list);
}
}
_count=this.__getDataInCache('followed_count_'+_cid);
if(_count>0){
this.__setDataInCache('followed_count_'+_cid,_count-1);
_list=this.__getDataInCache('followed_list_'+_cid);
if(U.arr._$isArray(_list)){
for(var i=0,_f;_f=_list[i];i++){
if(_f.id==_follow.id){
_list.splice(i,1);
break;
}
}
this.__setDataInCache('followed_list_'+_cid,_list);
}
}
};
__proCache._$addUserFollowing=function(_id){
J._$postDataByDWR(location.sdwr,'UserFollowerBean','addUserFollowing',_id,this.__addUserFollowing._$bind(this));
};
__proCache.__addUserFollowing=function(_follow){
_follow&&this.__addUserFollowInCache(_follow);
this._$dispatchEvent('onadduserfollowing',_follow?true:false);
};
__proCache._$deleteUserFollowing=function(_userId){
J._$postDataByDWR(location.sdwr,'UserFollowerBean','deleteUserFollowing',_userId,this.__deleteUserFollowing._$bind(this));
};
__proCache.__deleteUserFollowing=function(_follow){
_follow&&this.__deleteUserFollowInCache(_follow);
this._$dispatchEvent('ondeleteuserfollowing',_follow?true:false);
};
__proCache._$followUserForPhoto=function(_vc){
J._$postDataByDWR(location.bdwrnew,'UserFollowBeanNew','followUserForPhoto',_vc,false,this.__followUserForPhoto._$bind(this));
};
__proCache.__followUserForPhoto=function(_follow){
if(_follow=="valCode")UD.showCaptcha=true;
this._$dispatchEvent('onadduserfollowing',_follow);
};
__proCache._$cancelFollowUserForPhoto=function(_username){
if(_username==undefined||_username==""){
J._$postDataByDWR(location.bdwrnew,'UserFollowBeanNew','cancelFollowUserForPhoto',this.__cancelFollowUserForPhoto._$bind(this));
}else{
var dwrurl=location.bar+"/"+_username+"/dwr";
J._$postDataByDWR(dwrurl,'UserFollowBeanNew','cancelFollowUserForPhoto',this.__cancelFollowUserForPhoto._$bind(this));
}
};
__proCache.__cancelFollowUserForPhoto=function(_follow){
if(_follow){
this.__clearUserFollowInCache();
}
this._$dispatchEvent('ondeleteuserfollowing',_follow?true:false);
};
__proCache._$getUserFollowingCountByUserId=function(_id,_cb){
var _count=this.__getDataInCache('following_count_'+_id);
if(_count!=undefined){
_cb(_id,_count);
return;
}
this.__getUserFollowingCountByUserId._$addCB(_cb);
J._$loadDataByDWRWithSync(location.sdwr,'UserFollowerBean','getUserFollowingCountByUserId',_id,this.__getUserFollowingCountByUserId._$bind(this,_id));
};
__proCache.__getUserFollowingCountByUserId=function(_id,_count){
if(_count){
this.__setDataInCache('following_count_'+_id,_count);
this.__setDataInCache('following_list_'+_id,new Array(Number(_count)));
}
this.__getUserFollowingCountByUserId._$fireCB(_id,_count||0);
};
U.obj._$extend(__proCache.__getUserFollowingCountByUserId,P.ut._$$Callback);
__proCache._$getUserFollowingList=function(_id,_limit,_offset,_countcb,_listcb){
this.__getUserFollowingCountByUserId._$addCB(_countcb);
this.__getUserFollowingList._$addCB(_listcb);
var _needCount=false,_count=this.__getDataInCache('following_count_'+_id);
if(_count==undefined){
_needCount=true;
}
this._$getUserFollowingCountByUserId(_id,F);
var _list=this.__getListDataInCache('following_list_'+_id,_offset,_limit);
if(_list!=undefined&&_list.length>0){
_listcb(_id,_list);
return;
}
J._$loadDataByDWR(location.sdwr,'UserFollowerBean','getUserFollowingList',_id,_limit,_offset,this.__getUserFollowingList._$bind(this,_id,_offset,_limit,_needCount));
};
__proCache.__getUserFollowingList=function(_id,_offset,_limit,_needCount,_list){
if(_needCount){
var _count=_list.length;
this.__getUserFollowingCountByUserId(_id,_count);
}
this.__setListDataInCache('following_list_'+_id,_offset,_limit,_list);
this.__getUserFollowingList._$fireCB(_id,_list);
};
U.obj._$extend(__proCache.__getUserFollowingList,P.ut._$$Callback);
__proCache._$getUserFollowedCountByUserId=function(_id,_cb){
var _count=this.__getDataInCache('followed_count_'+_id);
if(_count!=undefined){
_cb(_id,_count);
return;
}
this.__getUserFollowedCountByUserId._$addCB(_cb);
J._$loadDataByDWRWithSync(location.sdwr,'UserFollowerBean','getUserFollowedCountByUserId',_id,this.__getUserFollowedCountByUserId._$bind(this,_id));
};
__proCache.__getUserFollowedCountByUserId=function(_id,_count){
if(_count){
this.__setDataInCache('followed_count_'+_id,_count);
this.__setDataInCache('followed_list_'+_id,new Array(Number(_count)));
}
this.__getUserFollowedCountByUserId._$fireCB(_id,_count);
};
U.obj._$extend(__proCache.__getUserFollowedCountByUserId,P.ut._$$Callback);
__proCache._$getUserFollowedList=function(_id,_limit,_offset,_coutcb,_listcb){
this.__getUserFollowedCountByUserId._$addCB(_coutcb);
this.__getUserFollowedList._$addCB(_listcb);
var _needCount=false,_count=this.__getDataInCache('followed_count_'+_id);
if(_count==undefined){
_needCount=true;
}
this._$getUserFollowedCountByUserId(_id,F);
var _list=this.__getListDataInCache('followed_list_'+_id,_offset,_limit);
if(_list!=undefined&&_list.length>0){
_listcb(_id,_list);
return;
}
J._$loadDataByDWR(location.sdwr,'UserFollowerBean','getUserFollowedList',_id,_limit,_offset,this.__getUserFollowedList._$bind(this,_id,_offset,_limit,_needCount));
};
__proCache.__getUserFollowedList=function(_id,_offset,_limit,_needCount,_list){
if(_needCount){
var _count=_list.length;
this.__getUserFollowedCountByUserId(_id,_count);
}
this.__setListDataInCache('followed_list_'+_id,_offset,_limit,_list);
this.__getUserFollowedList._$fireCB(_id,_list);
};
U.obj._$extend(__proCache.__getUserFollowedList,P.ut._$$Callback);
__proCache._$getRecommendUser=function(_cb){
var _data=this.__getDataInCache('recommend_user');
if(_data!=undefined){
_cb(_data);
return;
}
this.__getRecommendUser._$addCB(_cb);
J._$loadDataByDWR(location.sdwr,'UserFollowerBean','getRecommendUser',this.__getRecommendUser._$bind(this));
};
__proCache.__getRecommendUser=function(_data){
if(_data)
this.__setDataInCache('recommend_user',_data);
this.__getRecommendUser._$fireCB(_data);
};
U.obj._$extend(__proCache.__getRecommendUser,P.ut._$$Callback);
__proCache._$getFollowEventCount=function(_id,_cb){
var _count=this.__getDataInCache('follow_event_count_'+_id);
if(_count!=undefined){
_cb(_id,_count);
return;
}
this.__getFollowEventCount._$addCB(_cb);
J._$loadDataByDWR(location.pdwr,'UserFollowerBean','getFollowEventCount',_id,this.__getFollowEventCount._$bind(this,_id));
};
__proCache.__getFollowEventCount=function(_id,_count){
if(_count){
this.__setDataInCache('follow_event_count_'+_id,_count);
this.__setDataInCache('follow_event_list_'+_id,new Array(_count));
}
this.__getFollowEventCount._$fireCB(_id,_count);
};
U.obj._$extend(__proCache.__getFollowEventCount,P.ut._$$Callback);
__proCache._$getFollowEventList=function(_id,_offset,_limit,_cb){
var _list=this.__getListDataInCache('follow_event_list_'+_id,_offset,_limit);
if(_list!=undefined){
_cb(_id,_list);
return;
}
this.__getFollowEventList._$addCB(_cb);
J._$loadDataByDWR(location.pdwr,'UserFollowerBean','getFollowEventList',_id,_offset,_limit,this.__getFollowEventList._$bind(this,_id,_offset,_limit));
};
__proCache.__getFollowEventList=function(_id,_offset,_limit,_list){
this.__setListDataInCache('follow_event_list_'+_id,_offset,_limit,_list);
this.__getFollowEventList._$fireCB(_id,_list);
};
U.obj._$extend(__proCache.__getFollowEventList,P.ut._$$Callback);
__proCache._$getUserRecvMsgCount=function(){
var _data=this.__getDataInCache('user_recv_count_'+__ud.hostId);
if(_data!=undefined){
this._$dispatchEvent('getuserrecvmsgcount',_data);
return;
}
J._$postDataByDWR(location.mdwr,'MessageBean','getUserRecvMsgCount',this.__getUserRecvMsgCount._$bind(this));
};
__proCache.__getUserRecvMsgCount=function(_count){
if(!_count){
this._$dispatchEvent('getuserrecvmsgcount',0);
return;
}
this.__setDataInCache('user_recv_count_'+__ud.hostId,_count);
this._$dispatchEvent('getuserrecvmsgcount',_count);
};
__proCache._$getUserSentMsgCount=function(){
var _data=this.__getDataInCache('user_sent_count_'+__ud.hostId);
if(_data!=undefined){
if(_data==this.__data){
this._$dispatchEvent('getusersentmsgcount',_data,false);
return;
}
}
J._$postDataByDWR(location.mdwr,'MessageBean','getUserSentMsgCount',this.__getUserSentMsgCount._$bind(this));
};
__proCache.__getUserSentMsgCount=function(_count){
if(!_count){
if(_count==0){
this.__data=0;
this.__setDataInCache('user_sent_count_'+__ud.hostId,0);
}
this._$dispatchEvent('getusersentmsgcount',0,false);
return;
}
this.__data=_count;
this.__setDataInCache('user_sent_count_'+__ud.hostId,_count);
this._$dispatchEvent('getusersentmsgcount',_count,true);
};
__proCache._$getMsgHistoryCount=function(_name){
var _data=this.__getDataInCache('msg_his_count_'+_name);
if(_data!=undefined){
this._$dispatchEvent('getmsghistorycount',_name,_data);
return;
}
J._$postDataByDWR(location.mdwr,'AlbumMsgBean','getMsgHistoryCountByAlbum',_name,this.__getMsgHistoryCount._$bind(this,_name));
};
__proCache.__getMsgHistoryCount=function(_name,_count){
if(!_count){
this._$dispatchEvent('getmsghistorycount',_name,0);
return;
}
this.__setDataInCache('msg_his_count_'+_name,_count);
this._$dispatchEvent('getmsghistorycount',_name,_count);
};
__proCache._$setLatestMSGCount=function(_count){
J._$postDataByDWR(location.pdwr,'IndexSessionBean','setLatestMSGCount',false,_count);
};
__proCache._$getLatestMSGCount=function(){
J._$postDataByDWR(location.pdwr,'IndexSessionBean','getLatestMSGCount',false,this.__getLatestMSGCount._$bind(this));
};
__proCache.__getLatestMSGCount=function(_count){
this._$dispatchEvent('onGetLatestMSGCount',_count);
};
__proCache._$getNewMsgCount=function(_id,_name,_cb){
var _data=this.__getDataInCache('new_msg_count_'+Math.abs(_id));
if(_data!=undefined){
_cb(_data);
return;
}
this.__getNewMsgCount._$addCB(_cb);
J._$postDataByDWR(location.mdwr,'PollingBean','pollingNewMsgByAlbum',_name,this.__getNewMsgCount._$bind(this,Math.abs(_id)));
};
__proCache.__getNewMsgCount=function(_id,_data){
if(_data)
this.__setDataInCache('new_msg_count_'+_id,_data);
this.__getNewMsgCount._$fireCB(_data);
};
U.obj._$extend(__proCache.__getNewMsgCount,P.ut._$$Callback);
__proCache.__setNewMsgCount=function(_key0,_key1,_value){
var _data=this.__getDataInCache(_key0);
_data[_key1]=_value;
};
})();

(function(){
var s=P('P.s'),
__pro;
s._$$Module=C();
U.cls._$augment(s._$$Module,P.ut._$$Single,true);
__pro=s._$$Module.prototype;
__pro._$initialize=function(_options){
_options=_options||{};
this.id=_options.id;
this.__children__=[];
this.__event=new ntes.util._$$Event();
this.__body=this.__getXNode();
this.__initialize(_options);
};
__pro.__initialize=F;
__pro._$getBody=function(){
return this.__body;
};
__pro._$getID=function(){
return this.id;
};
__pro._$reset=function(){
var _event=U.str._$toHash(location.hash);
this.__reset(_event);
if(!this.__build){
var _c;
for(var _p in this.register){
_c=this.register[_p];
!U.fun._$isFunction(_c)&&this._$appendChild(this._$getChild(_c.id),_c.pnode);
}
delete this.register;
this.__build=true;
}
for(var i=0,_m;_m=this.__children__[i];i++){
_m._$reset();
}
};
__pro.__reset=F;
__pro.__getXNode=function(){
var _node=document.cloneElement('div');
_node.innerHTML='<span>test</span>';
return _node;
};
__pro._$registerChild=function(_cfg){
if(U.arr._$isArray(_cfg)){
for(var i=0,_c;_c=_cfg[i];i++){
this._$registerChild(_c);
}
}
else{
if(U.obj._$isObject(_cfg)){
this.register=this.register||{};
_cfg.id=_cfg.id||U._$randNumberString();
this.register[_cfg.id]=_cfg;
}
}
};
__pro._$getChild=function(_id){
if(_id==undefined)return null;
var _arr=U.arr._$filter(this.__children__,function(_c){
return _c.id==_id;
});
var _mdl=_arr[0];
if(!_mdl){
var _c=this.register&&this.register[_id];
if(!_c)return null;
_mdl=_c.cls._$getInstance({id:_id});
}
return _mdl;
};
__pro._$setParent=function(_parent){
this.parent=_parent;
};
__pro._$getParent=function(){
return this.parent;
};
__pro._$appendChild=function(_child,_pnode){
if(U.obj._$isObject(_child)){
_child._$setParent(this);
this.__children__.push(_child);
}
_pnode=E._$getElement(_pnode);
var _body=_child._$getBody();
if(_pnode&&_body&&_pnode!=_body.parentNode)
_pnode.appendChild(_child._$getBody());
_pnode&&(_pnode.style.display='');
return this;
};
__pro._$addEvent=function(_type,_handler){
this.__event._$addEvent(_type,_handler);
};
__pro._$dispatchEvent=function(){
this.__event._$dispatchEvent.apply(this.__event,arguments);
var _parent=this._$getParent();
_parent&&_parent._$dispatchEvent.apply(_parent,arguments);
};
__pro._$show=function(){
this.__body.style.display='';
};
__pro._$hide=function(){
this.__body.style.display='none';
};
})();

(function(){
var s=P('P.s'),
__pro,
__supro;
s._$$CnModule=C();
__pro=s._$$CnModule._$extend(s._$$Module,true);
__supro=s._$$Module.prototype;
__pro._$reset=function(){
var _event=U.str._$toHash(location.hash);
var _cid=this.__getCID(_event);
if(_cid==undefined)return;
var _child=this._$getChild(_cid);
if(_cid!=this.__getCurCID()){
this._$removeChild(this._$getChild(this.__getCurCID()));
this._$appendChild(_child);
}
_child._$show();
_child._$reset();
this.__curCID=_cid;
};
__pro._$appendChild=function(_child){
__supro._$appendChild.call(this,_child,this._$getBody());
};
__pro.__getCID=F;
__pro.__getCurCID=function(){
return this.__curCID;
};
__pro._$removeChild=function(_child,_hook){
if(_child&&(_child.parent==this)){
_child._$getBody().style.display='none';
delete _child.parent;
var _index=U.arr._$indexOf(this.__children__,_child);
if(_index!=-1)
this.__children__.splice(_index,1);
}
return this;
};
})();

(function(){
var s=P('P.s'),
__pro;
s._$$SModule=C();
__pro=s._$$SModule._$extend(P(N.ut)._$$Event);
U.cls._$augment(s._$$SModule,P.ut._$$Single,true);
__pro._$initialize=function(_options){
this._$super();
_options=_options||{};
this.__body=this.__getXNode(_options.node);
this.__initialize(_options);
};
__pro._$reset=F;
__pro.__initialize=F;
__pro.__getXNode=F;
__pro._$setParent=function(_parent){
this.parent=_parent;
};
__pro._$appendTo=function(_parent,_where){
_parent=E._$getElement(_parent);
_parent&&_parent.insertAdjacentElement(_where,this.__body);
};
__pro._$getBody=function(){
return this.__body;
};
__pro._$show=function(){
this.__body.style.display='';
};
__pro._$hide=function(){
this.__body.style.display='none';
};
})();

(function(){
var p=P('np.w'),
__proModule;
p._$$Module=C();
__proModule=p._$$Module._$extend(P(N.ut)._$$Event);
__proModule._$initialize=function(_node){
this._$super();
this.__body=E._$getElement(_node);
var _ntmp=E._$getElementsByClassName(this.__body,'np-jsc');
this.__case=_ntmp[0];
var _node=E._$getChildElements(this.__case,'np-init');
this.__initFrame(_node&&_node[0]||null);
};
__proModule._$getId=function(){
return this.__body.id;
};
__proModule._$getBody=function(){
return this.__body;
};
__proModule._$getContainer=function(){
return this.__case;
};
__proModule._$setContent=function(_content){
this.__case.innerHTML=_content||'&nbsp;';
};
__proModule.__initFrame=function(_node){
var _html,_script;
if(!!_node){
var _ntmp=_node.getElementsByTagName('textarea')||[];
for(var i=_ntmp.length-1,_type,_item;i>=0;i--){
_item=_ntmp[i];
_type=U._$trim(_item.name.toLowerCase());
if(_type=='js'){
_script=_item.value||'';
continue;
}
if(_type=='html'){
_html=_item.value||'';
continue;
}
if(!_item.id)
continue;
if(_type=='jst'){
E._$addHtmlTemplate(_item);
continue;
}
if(_type=='txt'){
U.obj._$setData(_item.id,_item.value||'');
continue;
}
if(_type=='ntp'){
E._$addNodeTemplate(_item.value||'',_item.id);
continue;
}
}
E._$removeElement(_node);
}
this.__execScript(_script);
if(!!_html)
this._$setContent(_html);
};
__proModule.__execScript=function(_source){
_source=U._$trim(_source||'');
if(!!_source){
try{
new Function(_source).call(this);
}
catch(e){}
}
};
})();

(function(){
var p=P('P.ui');
p._$$UIBase=C();
var __pro=p._$$UIBase.prototype;
__pro._$initialize=function(_param){
this.__body=this.__getXNode();
this.__initialize(_param);
};
__pro.__initialize=F;
__pro.__getXNode=F;
__pro._$getBody=function(){
return this.__body;
};
__pro._$show=function(){
this.__body&&(this.__body.style.display='');
this.__visible=true;
return this;
};
__pro._$hide=function(){
this.__body&&(this.__body.style.display='none');
this.__visible=false;
return this;
};
__pro._$visible=function(){
return this.__visible;
};
__pro._$toggle=function(){
this.__visible?this._$hide():this._$show();
};
__pro._$appendTo=function(_parent,_before){
_parent=E._$getElement(_parent);
if(_parent)
!_before?_parent.appendChild(this.__body):_parent.insertAdjacentElement('afterBegin',this.__body);
this.__pnode=_parent;
return this;
};
})();

(function(){
var p=P('P.ui'),
__pro;
p._$$UILoading=C();
__pro=p._$$UILoading._$extend(p._$$UIBase);
__pro._$initialize=function(_elem){
this.__body=E._$getElement(_elem)||E._$parseElement(_elem);
};
__pro._$remove=function(){
E._$removeElementByEC(this.__body);
};
})();

(function(){
var p=P('P.ui'),
__xhtml='<div class="w-cxt-input"><input name="username" type="text" class="w-txt txt js-txt fc1 name-hint js-init" autocomplete="off" value="如 name@example.com"/><div style="display: none;" class="w-cxt-input-layer js-layer js-con-im bdc6 bgc99"></div></div>',
__reg=/(\w[-.\w]*)@([-a-z0-9]+)(\.[-a-z0-9]+)*\.[a-z]+/,
__posts=['@163.com','@126.com','@yeah.net','@vip.163.com','@vip.126.com','@popo.163.com','@188.com','@qq.com','@yahoo.com','@yahoo.com.cn','@sina.com'];
var __getList=function(_value){
var _list=[];
if(_value){
var _arr=/([^@]*)(.*)/.exec(_value);
var _pre=_arr[1],_post=_arr[2];
U.arr._$forEach(__posts,function(_pt){
if(_pt.indexOf(_post)!=-1){
_list.push(_pre+_pt);
}
});
if(!_list.length){
_list.push(_value);
}
}
return _list;
};
var __getUserName=function(_email){
if(!_email)return;
return _email.replace(__reg,function(){
var _arr=[].slice.call(arguments);
__account=_arr[1]
var _type=_arr[2];
var _dom=_arr[3];
switch(_type){
case'163':
return __account;
break;
case'popo':
case'vip':
if(_dom=='.163')
return __account+'.'+_type;
else if(_dom=='.126')
return __account+'@vip.126.com';
break;
case'188':
case'126':
case'yeah':
return __account+'@'+_type;
default:
return _email;
}
});
};
p._$$UNInput=C();
var __pro=p._$$UNInput._$extend(p._$$UIBase);
__pro.__initialize=function(_param){
_param=_param||{};
this._$appendTo(_param.parent);
E._$addClassName(this.__body,_param.classname);
this.__onSuccess=_param.onsuccess;
this.__onFocus=_param.onfocus;
this.__onBlur=_param.onblur;
V._$addEvent(this.__txt,'input',this.__onChange._$bind(this));
V._$addEvent(document,'click',this.__onClick._$bind(this));
V._$addEvent(this.__txt,'click',function(_event){
V._$stopBubble(_event);
});
V._$addEvent(this.__txt,'keydown',this.__onKeyDown._$bind(this));
V._$addEvent(this.__txt,'keypress',this.__onKeyPress._$bind(this));
V._$addEvent(this.__txt,'focus',this.__onFocusText._$bind(this));
V._$addEvent(this.__txt,'blur',this.__onBlurText._$bind(this));
};
__pro.__resetList=function(_list){
if(!_list||!_list.length)
_list=[];
this.__list=_list;
for(var i=0,_cs=this.__context.childNodes,len=_cs.length;i<len;i++)
this.__context.removeChild(this.__context.firstChild);
var _frag=document.createDocumentFragment(),_tpl=document.createElement('div'),_div;
_div=_tpl.cloneNode(false);
_div.className='hint';
_div.innerText='请选择或继续输入...';
_div.onclick=this.__select._$bind(this,this.__context.__curIndex);
_frag.appendChild(_div);
for(var i=0,l=_list.length;i<l;i++){
_div=_tpl.cloneNode(false);
_div.innerText=_list[i];
if(i==0){
E._$addClassName(_div,'js-cur');
this.__context.__curIndex=i;
}
_div.onmouseover=this.__onMouseOver._$bind(this,i);
_frag.appendChild(_div);
}
this.__count=0;
this.__context.appendChild(_frag);
};
__pro.__onMouseOver=function(_index){
if(!this.__count++)
return;
E._$delClassName(this.__context.getElementsByTagName('div')[this.__context.__curIndex+1],'js-cur');
this.__context.__curIndex=_index;
E._$addClassName(this.__context.getElementsByTagName('div')[this.__context.__curIndex+1],'js-cur');
};
__pro.__onClick=function(){
if(this.__context.__curIndex!=undefined&&this.__context.style.display!='none')
this.__select(this.__context.__curIndex);
};
__pro.__onFocusText=function(){
if(this.__txt.value=='如 name@example.com'){
this.__txt.value='';
E._$delClassName(this.__txt,'js-init');
E._$delClassName(this.__txt,'name-hint');
}
E._$addClassName(this.__txt,'js-focus');
this.__onFocus&&this.__onFocus();
};
__pro.__onBlurText=function(){
if(this.__txt.value==''){
E._$addClassName(this.__txt,'js-init');
this.__txt.value='如 name@example.com';
E._$addClassName(this.__txt,'name-hint');
}
E._$delClassName(this.__txt,'js-focus');
this.__onBlur&&this.__onBlur();
};
__pro.__select=function(_index){
if(_index==undefined||this.__context.style.display=='none')
return;
this.__txt.value=this.__list[_index];
this.__context.style.display='none';
this.__onSuccess&&this.__onSuccess();
};
__pro.__onChange=function(){
this.__onChange.__oldValue=this.__onChange.__oldValue||'如 name@example.com';
var _value=this.__txt.value;
if(_value==this.__onChange.__oldValue)return;
this.__onChange.__oldValue=_value;
if(_value==''){
this.__context.style.display='none';
return;
}
this.__onListChange(__getList(this.__txt.value));
};
__pro.__onKeyDown=function(_event){
switch(_event.keyCode){
case 9:
this.__select(this.__context.__curIndex);
V._$stop(_event);
break;
case 38:
if(this.__context.__curIndex>0){
E._$delClassName(this.__context.getElementsByTagName('div')[this.__context.__curIndex+1],'js-cur');
this.__context.__curIndex--;
E._$addClassName(this.__context.getElementsByTagName('div')[this.__context.__curIndex+1],'js-cur');
}
break;
case 40:
if(!this.__list||!this.__list.length)return;
if(this.__context.__curIndex<this.__list.length-1){
E._$delClassName(this.__context.getElementsByTagName('div')[this.__context.__curIndex+1],'js-cur');
this.__context.__curIndex++;
E._$addClassName(this.__context.getElementsByTagName('div')[this.__context.__curIndex+1],'js-cur');
}
break;
}
};
__pro.__onKeyPress=function(_event){
switch(_event.keyCode){
case 13:
this.__select(this.__context.__curIndex);
break;
}
};
__pro.__onListChange=function(_list){
if(!_list||!_list.length)
return;
this.__resetList(_list);
this.__context.style.display='';
};
__pro._$getAccount=function(){
return __getUserName(this.__txt.value);
};
__pro._$getValue=function(){
return this.__txt.value;
};
__pro._$setValue=function(_value){
this.__txt.value=_value||'';
this.__select(this.__context.__curIndex);
};
__pro._$focus=function(){
};
__pro._$addTextChange=function(_fun){
U.dom._$addTextChange(this,__txt,_fun);
};
__pro.__getXNode=function(){
var _nd=E._$parseElement(__xhtml);
this.__txt=E._$getElementsByClassName(_nd,'js-txt')[0];
this.__context=E._$getElementsByClassName(_nd,'js-layer')[0];
return _nd;
};
})();

(function(){
var p=P('P.ui'),
__pro,
__supro,
__xhtml='<span class="w-posting iblock"><img src="http://r.ph.126.net/photo/image/acting.gif"/><span class="fc2 fs0"></span></span>';
p._$$Posting=C();
__pro=p._$$Posting._$extend(p._$$UIBase);
__supro=p._$$UIBase.prototype;
U.cls._$augment(p._$$Posting,P.ut._$$Single,true);
__pro._$reset=function(_opt){
_opt=_opt||{};
this.__emsg.innerText=_opt.msg||'';
this.__nocover=_opt.nocover;
var _pnode=_opt.pnode;
this.__body.style.left=_pnode?'':document.documentElement.scrollLeft+(document.body.offsetWidth-100)/2+'px';
this.__body.style.top=_pnode?'':document.documentElement.scrollTop+180+'px';
_pnode=_pnode||document.body;
this._$appendTo(_pnode);
return this;
};
__pro._$show=function(){
!this.__nocover&&E._$showCover();
__supro._$show.call(this);
return this;
};
__pro._$hide=function(){
__supro._$hide.call(this);
!this.__nocover&&E._$hideCover();
return this;
};
__pro.__getXNode=function(){
var _nd=E._$parseElement(__xhtml);
this.__emsg=_nd.getElementsByTagName('span')[0];
return _nd;
};
})();
(function(){
var p=P('P.ui'),
__pro,
__xhtml='<div class="p-lay">\
       <div class="lay-wrap bdc6 bgc99">\
      <div class="ttl"><a href="javascript:;" class="close js-close icn0 icn0-10"></a><div class="fc2 js-cttl"></div></div>\
      <div class="content js-cnt"></div>\
       </div>\
      </div>';
p._$$WBase=C();
__pro=p._$$WBase._$extend(p._$$UIBase);
U.cls._$augment(p._$$WBase,P.ut._$$Single,true);
__pro._$initialize=function(_param){
_param=_param||
{};
this.__body=this.__getXNode();
E._$addClassName(this.__body,_param.classname);
V._$addEvent(this.__eclose,'click',this.__onClickClose._$bind(this));
var _nd=this.__getContent();
this.__ecnt.appendChild(_nd);
this.__content=_nd;
this._$show();
this.__initialize(_param);
};
__pro.__initialize=F;
__pro.__onClickClose=function(){
this._$hide();
this.__onCancel&&this.__onCancel();
};
__pro._$show=function(){
if(this.__body){
E._$showCover();
this._$appendTo(document.lbody);
document.lbody.style.display='';
if(B._$ISOLDIE){
var _scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
this.__body.style.marginTop=_scrollTop+150+'px';
}
this.__body.style.display=''
}
return this;
};
__pro._$hide=function(){
if(this.__body){
E._$hideCover();
document.lbody.removeChild(this.__body);
document.lbody.style.display='none';
this.__body.style.display='none';
}
return this;
};
__pro._$setTitle=function(_title){
if(U.str._$isString(_title))
this.__ecttl.innerHTML=_title;
};
__pro.__getContent=F;
__pro.__getXNode=function(){
var _nd=E._$parseElement(__xhtml);
this.__eclose=E._$getElementsByClassName(_nd,'js-close')[0];
this.__ecttl=E._$getElementsByClassName(_nd,'js-cttl')[0];
this.__ecnt=E._$getElementsByClassName(_nd,'js-cnt')[0];
return _nd;
};
})();

(function(){
var p=P('P.ui'),
__pro,
__id='p_lay_login_cb'+U._$randNumberString(),
__account,
__domain=location.hostname.indexOf('pp')>=0?'pp':'photo',
__URSRegUrl='http://reg.163.com/reg/reg.jsp?product='+__domain+'&url=http://'+__domain+'.163.com/&loginurl=http://'+__domain+'.163.com/',
__xhtml='<form onsubmit="return false;" method="post">\
     <table>\
      <tr><th class="fc5">帐　号</th><td class="js-uname-cnt"></td></tr>\
      <tr><th class="fc5">密　码</th><td><input type="password" class="txt w-txt" name="password"/></td></tr>\
      <tr><th> </th><td><input type="checkbox" id="'+__id+'" class="autoc hand" name="autologin"/><label for="'+__id+'" class="autol fc2 js-autologin-text hand">自动登录</label><a class="forget" href="http://reg.163.com/RecoverPassword.shtml" target="_blank">忘记密码？</a></td></tr>\
      <tr class="btns"><th> </th><td><input class="login ui-btn ui-btn-sub0 fc5" name="login" type="button" value="登录"/><a class="reg" href="'+__URSRegUrl+'" target="_blank">注册网易通行证>></a></td></tr>\
     </table>\
     <div class="login-tiparea js-tiparea" style="display:none;">\
      <div class="login-tiparea-top icn0 icn0-65"></div>\
      <span id="autologin_close" class="login-tiparea-close icn0 icn0-64 js-tiparea-close">&nbsp;</span>\
      <p class="fc01">为了你的帐号安全，请不要在网吧或公用电脑上使用此功能！ </p>\
      <input type="hidden" name="username"/>\
      <input type="hidden" name="product" value="photo"/>\
      <input type="hidden" name="type" value=""/>\
      <input type="hidden" name="url" value=""/>\
      <input type="hidden" name="savelogin" value="0"/>\
     </div>\
    </form>';
p._$$QLogin=C();
__pro=p._$$QLogin._$extend(p._$$WBase,true);
__pro.__initialize=function(_param){
this.__posting=false;
this._$setTitle("登录网易通行证");
this.__name=new P.ui._$$UNInput({
parent:this.__ename,
className:'w-cxt-input',
onsuccess:this.__cbSuccess._$bind(this)
});
this.__addFormChangeEvent();
V._$addEvent(this.__ename,'keypress',this.__onKeyPress._$bind(this));
V._$addEvent(this.__eautoLogin,'keypress',this.__onKeyPress._$bind(this));
V._$addEvent(this.__btnLogin,'click',this.__onClickLogin._$bind(this));
V._$addEvent(this.__epwd,'focus',function(){
this.__epwd.select();
}._$bind(this));
V._$addEvent(this.__epwd,'keypress',this.__onKeyPress._$bind(this));
V._$addEvent(this.__etipareaclose,'click',this.__closeLoginTipArea._$bind(this));
V._$addEvent(this.__eautologintext,'mouseover',this.__showLoginTipArea._$bind(this));
V._$addEvent(this.__eautologintext,'mouseout',this.__closeLoginTipArea._$bind(this));
V._$addEvent(this.__eautoLogin,'mouseover',this.__showLoginTipArea._$bind(this));
V._$addEvent(this.__eautoLogin,'mouseout',this.__closeLoginTipArea._$bind(this));
};
__pro._$reset=function(_opt){
_opt=_opt||{};
this.__returnUrl=_opt.returnUrl;
this.__form.reset();
var _al=U.utl._$getAutoLogin();
window.setTimeout(function(){
this.__eautoLogin.checked=!!_al;
}._$bind(this),0);
if(_al){
this.__name._$setValue(_al[0]);
this.__epwd.value=this.__autoPwd=_al[1];
}
return this;
};
__pro.__showLoginTipArea=function(){
this.__etiparea.style.display='block';
};
__pro.__closeLoginTipArea=function(){
this.__etiparea.style.display='none';
};
__pro._$focus=function(){
this.__name&&this.__name._$focus();
};
__pro.__cbSuccess=function(){
U.dom._$textFocus(this.__epwd);
};
__pro.__addFormChangeEvent=function(){
var _inputs=this.__form.getElementsByTagName('input');
};
__pro.__onFormChange=function(){
this.__disable(!this.__suffice());
};
__pro.__suffice=function(){
return this.__name._$getValue()&&this.__epwd.value;
};
__pro.__disable=function(_flag){
_flag=!!_flag;
this.__btnLogin.disabled=_flag;
_flag?E._$addClassName(this.__btnLogin,'ui-btn-sub0-disabled'):E._$delClassName(this.__btnLogin,'ui-btn-sub0-disabled');
};
__pro.__getContent=function(){
var _form=E._$parseElement(__xhtml);
this.__ename=E._$getElementsByClassName(_form,'js-uname-cnt')[0];
this.__eautologintext=E._$getElementsByClassName(_form,'js-autologin-text')[0];
this.__etiparea=E._$getElementsByClassName(_form,'js-tiparea')[0];
this.__etipareaclose=E._$getElementsByClassName(_form,'js-tiparea-close')[0];
this.__epwd=_form['password'];
this.__eautoLogin=_form['autologin'];
this.__btnLogin=_form['login'];
this.__form=_form;
return _form;
};
__pro.__onClickLogin=function(_e){
if(!this.__suffice())
return;
this.__disable(true);
var _account=this.__name._$getAccount(),_pwd=this.__epwd.value,that=this;
if(that.__posting){
return;
}
if(!this.__autoPwd||this.__autoPwd!=_pwd){
if(/@126$/.test(_account)||/@yeah$/.test(_account)||/@188$/.test(_account)){
this.__form.type.value=1;
}
else{
this.__form.type.value=0;
_pwd=U._$md5(_pwd);
}
}
this.__form.action='https://reg.163.com/logins.jsp';
this.__form.username.value=_account;
var _returnUrl=this.__returnUrl||location.href;
_returnUrl=_returnUrl.replace(/\{username\}/g,_account);
_returnUrl=encodeURIComponent(_returnUrl);
if(this.__isPPDomain()){
this.__form.url.value="http://photo.163.com/loginGatePP?dest="+_returnUrl;
}
else{
this.__form.url.value="http://photo.163.com/loginGate?dest="+_returnUrl;
}
this.__form.password.value=_pwd;
if(!!(this.__eautoLogin.checked)){
this.__form.savelogin.value=1;
}
else{
this.__form.savelogin.value=0;
}
that.__posting=true;
this.__form.submit();
};
__pro.__isPPDomain=function(){
var _str=location.href,_str1='pp.163.com',_str2='photo.163.com/pp';
if(_str.indexOf(_str1)>-1||_str.indexOf(_str2)>-1){
return true;
}
return false;
};
__pro.__onKeyPress=function(_event){
if(_event.keyCode==13&&!this.__btnLogin.disabled)
this.__onClickLogin(_event);
};
})();

(function(){
var p=P('np.l'),
__proCard,
__proWindow;
var __initialize=function(_parent,_options){
_options=_options||O;
_options['class']=_options['class']||'npw-win zbwin';
this._$super(_parent||document.body,_options);
};
p._$$Window=C();
__proWindow=p._$$Window._$extend(P(N.ui)._$$WindowWrapper,true);
__proWindow._$initialize=__initialize;
p._$$Card=C();
__proCard=p._$$Card._$extend(P(N.ui)._$$CardWrapper,true);
__proCard._$initialize=__initialize;
})();

(function(){
var p=P('np.w'),
__proModule,
__proCache,
__uispace='ui-'+U._$randNumberString(),
__xhtml='\
    <div>\
     <div class="main bds2 bdc3">\
      <b class="a-img bds0 bdc2 bdwa"><img class="0 t ava" style="visibility:hidden;"></b>\
      <div class="alert">\
       <p class="y tt fw1 fc2">是否将<span class="0 z"></span>加为关注？</p>\
       <p class="n tt fw1 fc2">是否取消对<span class="1 z"></span>的关注？</p>\
       <div class="clearfix">\
        <input type="button" value="确定" class="1 t ui-btn ui-btn-sub0 mr10"/>\
        <input type="button" value="取消" class="2 t ui-btn ui-btn-ccl0"/>\
       </div>\
      </div>\
     </div>\
     <div class="des bgc7 fc1">\
      <p class="y">关注后你就能在新鲜事接受他(她)的最新动态</p>\
      <p class="n">取消关注后新鲜事不会有他(她)的最新动态</p>\
     </div>\
    </div>';
P(N.ui)._$pushStyle('\
  #<uispace>{width:314px;}\
  #<uispace> .y,#<uispace> .n{display:none;}\
  #<uispace> .follow .y,\
  #<uispace> .unfollow .n{display:block;}\
  #<uispace> .zcnt{padding:0;}\
  #<uispace> .main{padding:25px 40px;border-width:0 0 1px;}\
  #<uispace> .a-img {position:absolute;padding-bottom:3px;padding-left:3px;padding-right:3px;display:block;padding-top:3px;}\
  #<uispace> .ava{width:60px;height:60px;}\
  #<uispace> .alert{text-align:center;margin-left:75px;zoom:1;}\
  #<uispace> .alert input{float:left;display:inline;}\
  #<uispace> .alert .tt{line-height:22px;padding:10px 0;text-align: left;}\
  #<uispace> .des{padding-bottom:10px;line-height:1.75;padding-left:10px;padding-right:10px;padding-top:10px;}\
  ',__uispace);
p._$$FollowModule=C();
__proModule=p._$$FollowModule._$extend(np.l._$$Window,true);
__proModule._$initialize=function(_parent,_options){
_options=_options||O;
this._$super(_parent,_options);
};
__proModule.__getSpace=function(){
return __uispace;
};
__proModule.__getXhtml=function(){
return __xhtml;
};
__proModule.__intXnode=function(){
var _ntmp=E._$getElementsByClassName(this.__body,'t'),
that=this;
this.__eimg=_ntmp[0];
this.__esubmit=_ntmp[1];
this.__ecancel=_ntmp[2];
this.__enames=E._$getElementsByClassName(this.__body,'z');
this.__cache=new p._$$FollowCache({follow:this.__cbFollow._$bind(this),unfollow:this.__cbUnfollow._$bind(this)});
V._$addEvent(this.__ecancel,'click',this._$hide._$bind(this));
V._$addEvent(this.__eimg,'error',U.dom._$onImgError._$bind2(U.dom,location.f60));
V._$addEvent(this.__esubmit,'click',this.__followAction._$bind(this));
};
__proModule._$resetOption=function(_options){
p._$$FollowModule._$supro._$resetOption.call(this,_options);
this._$addEvent('onfollow',_options.onfollow||F);
this._$addEvent('onunfollow',_options.onunfollow||F);
this.__layer._$setTitle(_options.title);
this.__follow=_options.follow||false;
this.__profile=_options.profile;
var _tmp=this.__profile.nickname||this.__profile.name,
that=this;
setTimeout(function(){
that.__eimg.src=U.fun._$getAvaImg(that.__profile.name||'',0);
},0);
V._$addEvent(this.__eimg,'load',function(_e){
that.__eimg.style.visibility='';
});
U.dom._$setText(this.__enames,U.str._$truncate(_tmp,16));
this.__eimg.alt=this.__eimg.title=_tmp;
this.__esubmit.focus();
this.__body.className=this.__follow?'follow':'unfollow';
};
__proModule.__followAction=function(){
if(this.__follow)
this.__cache._$follow(this.__profile.id);
else
this.__cache._$unfollow(this.__profile.id);
this._$hide();
};
__proModule.__cbFollow=function(_result){
if(_result&&_result.childID)
_result=true;
this._$dispatchEvent('onfollow',_result);
};
__proModule.__cbUnfollow=function(_result){
if(_result&&_result.childID)
_result=true;
this._$dispatchEvent('onunfollow',_result);
};
p._$$FollowCache=C();
__proCache=p._$$FollowCache._$extend(P(N.ut)._$$Cache);
__proCache._$follow=function(_userId){
J._$postDataByDWR(location.sdwr,'UserFollowerBean','addUserFollowing',_userId,this._$dispatchEvent._$bind(this,'follow'));
};
__proCache._$unfollow=function(_userId){
J._$postDataByDWR(location.sdwr,'UserFollowerBean','deleteUserFollowing',_userId,this._$dispatchEvent._$bind(this,'unfollow'));
};
})();

(function(){
var p=P('P.ui'),
__pro,
__tkey=E._$addNodeTemplate('<button type="button" hidefocus="true"></button>');
p._$$Button=C();
__pro=p._$$Button._$extend(P(N.ut)._$$Item,true);
__pro._$initialize=function(){
this._$super(__tkey);
V._$addEvent(this.__body,'click',this.__onClick._$bind(this));
};
__pro._$destroy=function(){
if(this.__data.c)
E._$delClassName(this.__body,this.__data.c);
p._$$Button._$supro._$destroy.call(this);
};
__pro._$reset=function(_options){
_options=_options||O;
this._$addEvent('onclick',_options.callback||F);
};
__pro._$setData=function(_data){
this.__data=_data||O;
this.__body.innerText=this.__data.t;
if(this.__data.c)
E._$addClassName(this.__body,this.__data.c);
};
__pro._$getData=function(){
return this.__data;
};
__pro.__onClick=function(){
this._$dispatchEvent('onclick',this.__data);
};
})();
(function(){
var p=P('P.ui'),
__pro,
__xhtml='<div class="lay-ct"><div class="lay-cncase"></div><div class="lay-btn"></div></div>';
p._$$MessageBox=C();
__pro=p._$$MessageBox._$extend(P(N.ui)._$$WindowWrapper,true);
__pro._$initialize=function(_parent,_options){
this.__bopt={callback:this.__onButtonClick._$bind(this)};
this._$super(_parent,_options);
};
__pro.__getXhtml=function(){
return __xhtml;
};
__pro.__intXnode=function(){
var _ntmp=E._$getChildElements(this.__body);
_ntmp=E._$getChildElements(_ntmp[0]);
this.__cntCase=_ntmp[0];
this.__btnCase=_ntmp[1];
};
__pro._$resetOption=function(_options){
_options=_options||O;
p._$$MessageBox._$supro._$resetOption.call(this,_options);
this.__callback=_options.callback||F;
this.__layer._$setTitle(_options.title);
this._$setMessage(_options.message);
this._$setButtons(_options.buttons);
};
__pro._$destroy=function(){
if(this.__buttons)
this.__buttons=p._$$Button._$recycle(this.__buttons);
p._$$MessageBox_$supro._$destroy.call(this);
};
__pro.__onButtonClick=function(_data){
var _result;
if(!!_data.fn)
_result=_data.fn.call(_data,_data.v);
else
_result=this.__callback(_data.v);
if(_result==-1)
return;
this._$hide();
};
__pro._$setMessage=function(_cnt){
_cnt=_cnt||'';
this.__cntCase.innerHTML='';
typeof(_cnt)=='string'?this.__cntCase.innerHTML=_cnt:this.__cntCase.appendChild(_cnt);
};
__pro._$setButtons=function(_btns){
this.__buttons=p._$$Button._$recycle(this.__buttons);
this.__buttons=p._$$Button._$allocate(_btns,this.__btnCase,this.__bopt);
};
E._$alert=function(_title,_msg,_fn,_btnText){
P('P.ui')._$$MessageBox._$show({
parent:document.body,
nohack:false,
iframe:true,
'class':'win0',
title:_title||'',
message:_msg||'',
buttons:[{t:_btnText||'确 定',c:'ui-btn ui-btn-sub0',fn:_fn||F}]
});
};
E._$confirm=function(_title,_msg,_fnok,_fncc,_btnOK,_btnCC){
P('P.ui')._$$MessageBox._$show({
parent:document.body,
nohack:false,
iframe:true,
'class':'win0',
title:_title||'',
message:_msg||'',
buttons:[{t:_btnOK||'确 定',c:'ui-btn ui-btn-sub0',fn:_fnok||F},
{t:_btnCC||'取 消',c:'ui-btn ui-btn-ccl0',fn:_fncc||F}]
});
};
E._$close=function(){
P('P.ui')._$$MessageBox._$hide();
};
})();
(function(E,V){
var p=P('WIN'),
__pro;
p._$$DialogBox=C();
__pro=p._$$DialogBox._$extend(P(N.ui)._$$WindowWrapper,true);
__supro=p._$$DialogBox._$supro;
__pro._$initialize=function(_parent,_options){
this._$super(_parent,_options);
this._$setContent();
this.__intOption(_options);
this.__intContentNode(this.__content);
V._$addEvent(this.__submit,'click',this.__onSubmit._$bind(this));
V._$addEvent(this.__cancel,'click',this.__onCancel._$bind(this));
};
__pro.__getXhtml=function(){
return'<div class="dialog z-tag"></div>\
    <div class="btncase">\
     <a href="javascript:;" class="z-tag"></a>\
     <a href="javascript:;" class="z-tag"></a>\
    </div>';
};
__pro.__intXnode=function(){
var _ntmp=E._$getElementsByClassName(this.__body,'z-tag');
this.__content=_ntmp[0];
this.__submit=_ntmp[1];
this.__cancel=_ntmp[2];
};
__pro.__intOption=function(_options){
var _btnOpt=_options.button,
_btnOptOK=_btnOpt[0],
_btnOptCC=_btnOpt[1],
_submit=this.__submit,
_cancel=this.__cancel;
_submit.innerText=_btnOptOK&&_btnOptOK.name||'确 定';
_cancel.innerText=_btnOptCC&&_btnOptCC.name||'取 消';
E._$addClassName(_submit,_btnOptOK['class']);
E._$addClassName(_cancel,_btnOptCC['class']);
};
__pro._$resetOption=F;
__pro._$setContent=function(_content){
_content=_content||　this.__getContent();
typeof _content=='string'?this.__content.innerHTML=_content
:this.__content.appendChild(_content);
};
__pro.__getContent=F;
__pro.__intContentNode=F;
__pro.__onSubmit=F;
__pro.__onCancel=F;
})(E,V);

(function(){
var p=P('P.ui'),
__pro,
__supro,
__xhtml='<div class="w-hint"><div class="w-hint-head"><span class="icn0 icn0-49"> </span></div><div class="w-hint-body bdwa bds0 bdc23 bgc7 fc2"><b>：)</b> <div class="msg js-msg"></div></div></div></div>';
p._$$NHint=C();
__pro=p._$$NHint._$extend(p._$$UIBase);
__supro=p._$$UIBase.prototype;
U.cls._$augment(p._$$NHint,P.ut._$$Single,true);
__pro.__initialize=function(_pnode){
_pnode=E._$getElement(_pnode);
if(_pnode&&_pnode.nodeType){
this._$hide();
this._$appendTo(_pnode);
}
};
__pro._$reset=function(_opt){
_opt=_opt||{};
this.__body.style.display='none';
this._$appendTo(_opt.pnode);
return this;
};
__pro._$show=function(_msg){
this.__emsg.innerHTML=_msg||'';
__supro._$show.call(this);
return this;
};
__pro._$hide=function(){
__supro._$hide.call(this);
this.__emsg.innerHTML='';
return this;
};
__pro.__getXNode=function(){
var _nd=E._$parseElement(__xhtml);
this.__emsg=E._$getElementsByClassName(_nd,'js-msg')[0];
return _nd;
};
})();
(function(){
var p=P('P.ui'),
__pro,
__xhtml='<div class="w-select"><div class="w-select-face js-face bdc6"></div><div class="w-select-layer js-layer bdc6 bgc99" style="display:none;"></div></div>';
p._$$Select=C();
__pro=p._$$Select._$extend(p._$$UIBase);
__pro.__initialize=function(_param){
V._$addEvent(this.__face,'click',this.__toggleLayer._$bind(this));
V._$addEvent(document,'click',this.__hideLayer._$bind(this));
this._$appendTo(_param.parent);
E._$addClassName(this.__body,_param.classname);
this.__onChange=_param.onchange;
this.__setList(_param.list);
this.__select(this.__list[_param.index||0]);
};
__pro.__setList=function(_list){
if(!U.arr._$isArray(_list)){
this.__list=[];
return;
}
if(this.__list==_list)return;
this.__itms&&p._$$SelectItem._$recycle(this.__itms);
this.__itms=p._$$SelectItem._$allocate(_list,this.__layer,{
onselect:this.__select._$bind(this)
});
this.__list=_list;
};
__pro.__select=function(_data){
if(this.__curData==_data)
return;
this.__face.innerText=_data;
this.__curData=_data;
this.__hideLayer();
this.__onChange&&this.__onChange(_data);
};
__pro.__hideLayer=function(_event){
this.__layer.style.display='none';
};
__pro.__showLayer=function(){
this.__layer.style.display='';
};
__pro.__toggleLayer=function(_event){
this.__layer.style.display=this.__layer.style.display=='none'?'':'none';
V._$stopBubble(_event);
};
__pro.__getXNode=function(){
var _nd=E._$parseElement(__xhtml);
this.__face=E._$getElementsByClassName(_nd,'js-face')[0];
this.__layer=E._$getElementsByClassName(_nd,'js-layer')[0];
return _nd;
};
})();
(function(){
var p=P('P.ui'),__xhtml='<a href="javascript:void(0);" hidefocus="true" class="h-fc99 h-bgc3 noul"></a>';
p._$$SelectItem=C();
var __proItem=p._$$SelectItem._$extend(P.ui._$$UIBase);
U.cls._$augment(p._$$SelectItem,P.ut._$$Reuse,true);
__proItem.__initialize=function(_param){
_param=_param||{};
this.__onSelect=_param.onselect;
V._$addEvent(this.__body,'click',this.__onClickSelect._$bind(this));
};
__proItem._$reset=function(_data){
this.__data=_data;
this.__body.innerText=this.__data;
};
__proItem.__onClickSelect=function(){
this.__onSelect(this.__data);
};
__proItem.__getXNode=function(){
return E._$parseElement(__xhtml);
};
})();

(function(){
var p=P('np.w'),__pro;
var __hovered='';
p._$$SearchTopSuggestOption=C();
__pro=p._$$SearchTopSuggestOption._$extend(P(N.ui)._$$ZOption,true);
__pro._$setData=function(_value){
this.__value=_value||'';
this.__body.title=this.__value.title;
this.__body.innerHTML=this.__value.html;
};
})();
(function(){
var p=P('np.w'),__pro;
p._$$SearchTopSuggest=C();
__pro=p._$$SearchTopSuggest._$extend(P(N.ut)._$$Event);
__pro._$initialize=function(_opt){
this._$super();
this.__suggest=P(N.ui)._$$Suggest._$allocate(_opt.parent,{
'class':'searchTopInput',
option:np.w._$$SearchTopSuggestOption,
onselect:this.__onSuggestSelect._$bind(this),
onchange:this.__onSuggestChange._$bind(this),
onblur:this.__onBlur._$bind(this),
onfocus:this.__onFocus._$bind(this),
before:true,
maxLength:_opt.maxLength
});
this.__placeHolder=_opt.placeHolder||"";
this._$addEvent('onselect',_opt.onselect||F);
this._$addEvent('onchange',_opt.onchange||F);
this._$addEvent('onblur',_opt.onblur||F);
this._$addEvent('onfocus',_opt.onfocus||F);
if(this.__placeHolder){
this._$setInputText(this.__placeHolder);
}
};
__pro.__onSuggestSelect=function(_value){
if(!!_value){
this._$dispatchEvent('onselect',_value);
}
}
__pro.__onSuggestChange=function(_value){
this._$dispatchEvent('onchange',_value);
if(_value==this.__placeHolder){
return;
}
if(_value.length<1){
return;
}
var _list=[];
_list.push({
title:'搜"'+_value+'"相关的作品',
html:'搜<span>"'+_value+'"</span>相关的作品',
searchType:'zuoping',
sortType:'',
value:_value
});
_list.push({
title:'搜"'+_value+'"相关的拍客',
html:'搜<span>"'+_value+'"</span>相关的拍客',
searchType:'paike',
sortType:'',
value:_value
});
this.__suggest._$resetList(_list);
}
__pro._$setInputText=function(_v){
return this.__suggest._$setValue(_v);
};
__pro._$getInputText=function(){
return this.__suggest._$getValue();
};
__pro.__onBlur=function(){
var _in=this._$getInputText();
if(U._$trim(_in)==''){
this._$setInputText(this.__placeHolder);
this._$dispatchEvent('onchange',this.__placeHolder);
}
this._$dispatchEvent('onblur');
};
__pro.__onFocus=function(){
var _in=this._$getInputText();
if(_in==this.__placeHolder){
this._$setInputText('');
this._$dispatchEvent('onchange','');
}
this._$dispatchEvent('onfocus');
};
})();

(function(){
var p=P('np.m'),
__proCache;
p._$$TopCache=C();
__proCache=p._$$TopCache._$extend(P(N.ut)._$$Cache);
U.cls._$augment(p._$$TopCache,P.ut._$$Single,true);
__proCache._$checkFolStatusFromBlog=function(){
J._$loadDataByDWR(location.bdwrnew,'UserFollowBeanNew','isFollowedForPhoto',this._$dispatchEvent._$bind(this,'onfolstatuscheck'));
};
__proCache._$checkFolStatusFromPhoto=function(_parentId,_childId){
J._$loadDataByDWR(location.sdwr,'UserFollowerBean','isUserFollowed',_parentId,_childId,this._$dispatchEvent._$bind(this,'onfolstatuscheck'));
};
__proCache._$follow=function(_userId){
J._$loadDataByDWR(location.sdwr,'UserFollowerBean','addUserFollowing',_userId,this._$dispatchEvent._$bind(this,'onfollow'));
};
__proCache._$logout=function(){
U._$setCookie('NEPHOTO_LOGIN','','163.com',0,'/');
var _url=(window.logoutTarget)?window.logoutTarget:location.href;
location.href='http://reg.163.com/Logout.jsp?username='+window.UD.visitFullName+'&url='+encodeURIComponent(_url);
};
__proCache._$checkMessage=function(_name){
J._$loadDataByTAG(location.sdwr,'ShareMessageBean','getShareMessageCount',this._$dispatchEvent._$bind(this,'onmessagecheck'));
};
})();

(function(){
var p=P('np.m'),
__proModule;
p._$$TopLoginModule=C();
__proModule=p._$$TopLoginModule._$extend(P(N.ut)._$$Singleton,true);
__proModule.__initialize=function(){
this.__intXnode();
this.__intCache();
};
__proModule.__intXnode=function(){
var _ntmp,_enav=E._$getElement('np_top_nav');
if(!_enav)return;
_ntmp=E._$getElementsByClassName(_enav,'j');
for(var i=0,l=_ntmp.length;i<l;i++)
U.dom._$hoverElement(_ntmp[i]);
if(np.c._$ISLOGIN){
V._$addEvent('np_top_logout','click',this.__logout._$bind(this));
_ntmp=E._$getElementsByClassName(_enav,'b');
for(var i=0,l=_ntmp.length;i<l;i++)
V._$addEvent(_ntmp[i],'click',this.__hidePopupLayer._$bind(this));
}
else{
U.dom._$initAnchor('np_top_login');
_ntmp=E._$getElementsByClassName(_enav,'a');
for(var i=0,l=_ntmp.length;i<l;i++)
V._$addEvent(_ntmp[i],'click',this.__loginBeforeRedirect._$bind(this,_ntmp[i].href));
}
};
__proModule.__intCache=function(){
this.__cache=new p._$$TopCache();
};
__proModule.__loginBeforeRedirect=function(_link,_event){
V._$stop(_event);
if(!U.str._$isUrl(_link))
return;
P.ui._$$QLogin._$getInstance({
classname:'lay-login'
})._$reset({
onsuccess:function(_name){
_link=_link.replace(location.r,location.r+'/'+_name);
if(_link!=location.href)
location=_link;
else
location.reload();
}
})._$show()._$focus();
};
__proModule.__logout=function(){
this.__cache._$logout();
};
__proModule.__hidePopupLayer=function(_event){
var _target=V._$getElement(_event);
_target.blur();
while(_target.tagName.toLowerCase()!='div')
_target=_target.parentNode;
if(_target){
_target.style.display='none';
setTimeout(function(){_target.style.cssText='';_target.removeAttribute('style');},0);
}
};
new p._$$TopLoginModule();
var __dhOther=E._$getElement('J-more');
if(__dhOther){
V._$addEvent(__dhOther,'mouseover',function(e){
E._$addClassName(__dhOther,'j-hover');
});
V._$addEvent(__dhOther,'mouseout',function(e){
E._$delClassName(__dhOther,'j-hover');
});
}
var _bindSinaFromNav=E._$getElement('J-bind-sina');
if(_bindSinaFromNav){
_bindSinaFromNav.style.display='none';
if(UD&&(UD.visitIsPhotoUser)){
var _sdwr=(UD.visitName)?('http://photo.163.com/share/'+UD.visitName+'/dwr'):location.sdwr;
J._$loadDataByDWR(
_sdwr,
'ThirdPartyOpenAccountBean',
'isBindThirdPartyOpenAccountWithoutAuth',
0,
function(_su){
if(_su){
E._$addClassName(_bindSinaFromNav,'hide');
_bindSinaFromNav.style.display='none';
}else{
E._$delClassName(_bindSinaFromNav,'hide');
_bindSinaFromNav.style.display='';
}
},
function(){
E._$delClassName(_bindSinaFromNav.parentNode,'hide');
_bindSinaFromNav.style.display='';
}
);
}else{
E._$delClassName(_bindSinaFromNav,'hide');
_bindSinaFromNav.style.display='';
V._$addEvent(_bindSinaFromNav,'click',function(e){
V._$stop(e);
E._$alert('信息提示','<p style="text-align:left;">抱歉，绑定新浪微博的服务只提供于开通了摄影空间的摄影爱好者。</p>');
});
}
};
p._$$shareWeibo=C();
p._$$shareWeibo.prototype._$initialize=function(){
var that=this;
this.__weiboMoudle=E._$getElement('J-shareWeibo');
if(!this.__weiboMoudle){
return;
};
this.__title=this.__common='';
};
p._$$shareWeibo.prototype._$reset=function(_bol,_ob){
var that=this;
if(!this.__weiboMoudle){
return;
};
V._$clearEvent(this.__weiboMoudle);
if(_bol){
that.__weiboMoudle.style.display='';
E._$delClassName(that.__weiboMoudle,'hide');
E._$delClassName(that.__weiboMoudle,'f-hide');
}else{
return that.__weiboMoudle.style.display='none';
}
V._$addEvent(that.__weiboMoudle,'click',function(_e){
var _node=V._$getElement(_e),
_weiboName=(_node&&_node.getAttribute('data-weiboname'))||'';
V._$stop(_e);
if(_weiboName!==''){
that._$onShareWeibo(_weiboName);
}
return;
});
if(_ob){
this.__title=_ob.name;
this.__common=_ob.desc;
this.__shareRefImg=_ob.img;
}else{
this.__shareRefImg=this.__title=this.__common='';
}
};
p._$$shareWeibo.prototype._$joinParams=function(_url,_obj){
if(!_url){
return'';
}
var _s=[],
_url=_url||{};
for(var i in _obj){
if(_obj.hasOwnProperty(i)){
_obj[i]&&_s.push(i.toString()+'='+encodeURIComponent(_obj[i].toString()||''));
}
}
window.open(_url+_s.join('&'));
delete _s;
return;
};
p._$$shareWeibo.prototype._$onShareWeibo=function(_weibo){
var __link=window.location.href,
__title='来自网易相册，分享给大家。',
__common="",
__imgs='';
if(location.pageName==='photo'){
__title='“'+this.__title+'”'+'\t - '+__title;
__common=this.__common;
}
switch(_weibo){
case'weibo163':
if(this.__shareRefImg&&U.arr._$isArray(this.__shareRefImg)){
__imgs=this.__shareRefImg.join(',');
}else{
this.__shareRefImg&&(__imgs=this.__shareRefImg);
}
var __url='http://t.163.com/article/user/checkLogin.do?',
__p={
link:__link,
source:'网易相册',
info:__title+'\t\r\n'+__link,
images:__imgs,
togImg:'true'
};
break;
case'weiboSina':
if(this.__shareRefImg&&U.arr._$isArray(this.__shareRefImg)){
__imgs=this.__shareRefImg[0];
}else{
this.__shareRefImg&&(__imgs=this.__shareRefImg);
}
var __url='http://v.t.sina.com.cn/share/share.php?',
__p={
type:'3',
appkey:'3784306895',
title:__title+'\r\n'+__link,
pic:__imgs
};
break;
case'weiboQQ':
if(this.__shareRefImg&&U.arr._$isArray(this.__shareRefImg)){
__imgs=this.__shareRefImg.join('|');
}else{
this.__shareRefImg&&(__imgs=this.__shareRefImg);
}
var __url='http://v.t.qq.com/share/share.php?',
__p={
url:__link,
desc:__common,
summary:__common||'　',
title:__title,
site:'网易相册',
pic:__imgs
};
break;
case'weiboQzone':
if(this.__shareRefImg&&U.arr._$isArray(this.__shareRefImg)){
__imgs=this.__shareRefImg[0];
}else{
this.__shareRefImg&&(__imgs=this.__shareRefImg);
}
var __url='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',
__p={
url:__link,
desc:'　',
summary:__common||'　',
title:__title,
site:'网易相册',
pics:__imgs
};
break;
case'weiboDouban':
var __url='http://www.douban.com/recommend/?',
__p={
'url':__link,
'title':__title,
'comment':__common
};
break;
case'weiboRenren':
if(this.__shareRefImg&&U.arr._$isArray(this.__shareRefImg)){
__imgs=this.__shareRefImg[0];
}else{
this.__shareRefImg&&(__imgs=this.__shareRefImg);
}
var __url='http://share.renren.com/share/buttonshare/post/1004?',
__p={
title:__title,
content:__common,
pic:__imgs,
url:__link
};
break;
default:
return;
break;
};
this._$joinParams(__url,__p);
__link&&delete __link;
__url&&delete __url;
p&&delete p;
__imgs&&delete __imgs;
};
})();
(function(){
var p=P('np.m'),
__proBanner,
__suproBanner,
__uispace='ui-'+U._$randNumberString();
p._$$TopHomeBanner=C();
__proBanner=p._$$TopHomeBanner._$extend(np.l._$$Window,true);
__suproBanner=np.l._$$Window.prototype;
P(N.ui)._$pushStyle('\
     #<uispace>{width:704px;}\
     #<uispace> .zcnt{}\
     #<uispace> .zcnt .ht0{line-height:30px;}\
     #<uispace> .zcnt .ht1{padding-top:70px;}\
     #<uispace> .zcnt .ht3{padding-top:70px;background:url("http://r.ph.126.net/photo/image/default/loading2.gif") no-repeat 265px bottom;}\
     #<uispace> .zcnt .ht2{font-size:20px;margin-top:10px;}\
     #<uispace> .zcnt .h-t{height:20px;line-height:20px;position:relative;width:238px;}\
     #<uispace> .zcnt .h-b{position:relative;width:61px;height:25px;line-height:25px;}\
     #<uispace> .zcnt .file{position:absolute;left:20px;width:305px;height:25px;filter:alpha(opacity=0);opacity:0;}\
     #<uispace> .zcnt .submit{}\
     #<uispace> .zcnt .hint{text-align:center;height:200px;margin-top:10px;}\
     #<uispace> .zcnt .hint img{width:660px;height:200px;margin:0 auto;}\
     #<uispace> .zcnt .act{text-align:center;padding-top:30px;}\
     #<uispace> .zcnt .act input{margin-right:20px;}\
     #<uispace> .w-hint .w-hint-body{width:400px;}\
     ',__uispace);
__proBanner._$initialize=function(_parent,_options){
_options=_options||O;
this._$super(_parent,_options);
this._$addEvent('onok',_options.onok);
};
__proBanner.__getSpace=function(){
return __uispace;
};
__proBanner.__getXhtml=function(){
return'\
     <div>\
     <form class="0 t" enctype="multipart/form-data" method="post" target="uploadFrame" action="http://upload.photo.163.com/anony/web/upload/userdefinesize?sitefrom=test&responsetype=js&saveorigin=true&userdefinesize=980x300x0">\
      <input class="1 t h-t" type="text">\
      <input class="2 t h-b btn btn3" type="button" value="浏览..." name="ok" hidefocus="true">\
      <input class="3 t file" type="file" value="浏览..." name="Filedata" size="37">\
      <input class="4 t submit btn btn3 hide" type="button" value="开始上传" name="ok">\
     </form>\
     <p class="ht0">建议上传尺寸为980像素*300像素，或大于此尺寸同比例的图片。支持jpg\\jpeg\\gif\\png\\bmp格式。最大5M。</p>\
     <div class="5 t hint bgc5">\
      <div>\
       <p class="ht1">小屋顶部添加的图片显示效果为</p><p class="ht2">980像素 X 300像素</p>\
      </div>\
      <div style="display:none;">\
       <p class="ht3">正在上传...请稍后</p>\
      </div>\
      <div style="display:none;"><img class="6 t"></div>\
     </div>\
     <iframe class="7 t" src="http://photo.163.com/photo/html/crossdomain.html?t=20100205" name="uploadFrame" style="display:none;"></iframe>\
     <div class="act"><input type="button" class="8 t btn btn3" value="确定"><input type="button" class="9 t btn btn3" value="取消"></div>\
    </div>';
};
__proBanner._$resetOption=function(_options){
this.__reset();
__suproBanner._$resetOption.call(this,_options);
};
__proBanner.__intXnode=function(){
var _ntmp=E._$getElementsByClassName(this.__body,'t'),_i=0;
this.__eform=_ntmp[_i++];
this.__etext=_ntmp[_i++];
this.__ebrowse=_ntmp[_i++];
this.__efile=_ntmp[_i++];
this.__eupload=_ntmp[_i++];
this.__econ=_ntmp[_i++];
this.__eimg=_ntmp[_i++];
this.__eiframe=_ntmp[_i++];
this.__eok=_ntmp[_i++];
this.__ecancel=_ntmp[_i++];
g_UploaderWebJsCallback=this.__uploadCallBack._$bind(this);
V._$addEvent(this.__efile,'change',this.__onFileChange._$bind(this));
V._$addEvent(this.__eok,'click',this.__onOk._$bind(this));
V._$addEvent(this.__ecancel,'click',this.__onCancel._$bind(this));
this.__taber=new P.ut._$$VTaber(this.__econ);
this.__taber._$setIndex(0);
};
__proBanner.__reset=function(){
this.__eform.reset();
this.__taber._$setIndex(0);
this.__eimg.src=location.snf;
U.dom._$enableBtn(this.__eok,'btn3-disabled');
U.dom._$enableBtn(this.__ebrowse,'btn3-disabled');
};
__proBanner.__onFileChange=function(){
this.__disableBtn();
this.__etext.value=this.__efile.value;
this.__eform.submit();
this.__taber._$setIndex(1);
this.__eimg.src=location.snf;
};
__proBanner.__uploadCallBack=function(_data){
this.__reset();
if(!_data)
alert('网络错误，请稍后再试');
var _code=_data.resultcode;
if(_code===999){
this.__data=_data;
this.__eimg.src=_data.userDef1Url;
this.__taber._$setIndex(2);
}
else{
switch(_code){
case 0:
alert('图片过大');
break;
case 12:
alert('文件格式错误');
break;
default:
alert('网络错误，请稍候再试');
break;
}
this.__taber._$setIndex(0);
}
};
__proBanner.__onOk=function(){
this.__disableBtn();
if(!this.__data)
this._$hide();
else{
var _data={ourl:this.__data.ourl,userDef1Url:this.__data.userDef1Url,imgStorageType:this.__data.imgStorageType};
J._$loadDataByDWR(location.pdwr,'PhotoBean','copy',[_data],this.__cbCopy._$bind(this,_data));
}
};
__proBanner.__cbCopy=function(_data,_suc){
var _func=function(){
alert('网络错误，请稍候再试');
this.__reset();
}._$bind(this);
if(_suc)
J._$loadDataByDWR(location.sdwr,'PhotoBlogBean','addPhotoHeadPic',_data.userDef1Url,_data.imgStorageType,function(_suc){
if(_suc){
this.__reset();
this._$hide();
this._$dispatchEvent('onok',_data);
}
else
_func();
}._$bind(this));
else
_func();
};
__proBanner.__onCancel=function(){
this._$hide();
};
__proBanner.__disableBtn=function(){
U.dom._$disableBtn(this.__eok,'btn3-disabled');
U.dom._$disableBtn(this.__ebrowse,'btn3-disabled');
};
})();
(function($){
var p=P('np.m'),
__proModule,
__proHomeModule;
p._$$TopModule=C();
__proModule=p._$$TopModule._$extend(P(N.ut)._$$Singleton,true);
__proModule.__initialize=function(_options){
this._$super(_options);
this.__intXnode();
this.__intCache();
this.__intModule();
};
__proModule.__intXnode=function(){
this.__enav=E._$getElement('np_top_nav');
this.__emitm=E._$getElementsByClassName(this.__enav,'x');
};
__proModule.__intCache=function(){
this.__cache=new p._$$TopCache({
onmessagecheck:this.__cbCheckMessage._$bind(this)
});
};
__proModule.__intModule=function(){
if(np.c._$ISLOGIN&&!!this.__emitm&&!!this.__emitm.length){
this.__onCheckMessage();
}
};
__proModule.__logout=function(){
this.__cache._$logout();
};
__proModule.__onCheckMessage=function(){
setTimeout(this.__onCheckMessage._$bind(this),60000);
this.__cache._$checkMessage(np.c._$UD.visitName);
};
__proModule.__cbCheckMessage=function(_message){
if(!_message||(this.__emitm&&!this.__emitm.length)){
return;
}
var _total=0,_tag=['inboxCount','commentCount','replyCount','guestbookCount','alertCount','noticeCount'];
for(var i=_tag.length-1,_count;i>=0;i--){
_count=_message[_tag[i]]||0;
this.__emitm[i+1].innerText=_count;
_total+=_count;
}
if(_total>0){
this.__emitm[0].innerText=_total;
E._$replaceClassName(this.__emitm[0],'off','on');
}
};
p._$$TopHomeModule=C();
__proHomeModule=p._$$TopHomeModule._$extend(p._$$TopModule,true);
__proHomeModule.__intXnode=function(){
__proModule.__intXnode.call(this);
this.__erank=$('np_home_host_rank');
this.__erank=U.dom._$showRank({
node:this.__erank
,isVip:np.c._$UD.hostIsVip
,rank:np.c._$UD.hostShareGrade
,style:'margin-left:10px;vertical-align: baseline;'
});
};
__proHomeModule.__intModule=function(){
__proModule.__intModule.call(this);
if(np.c._$ISLOGIN){
if(!np.c._$ISEDIT){
this.__intXParam();
}
}
};
__proHomeModule.__intXParam=function(){
var _xparam=U.sys._$getAllXParam();
_xparam=U.obj._$toArray(_xparam)
if(_xparam&&_xparam.length){
switch(_xparam[0].op){
case'msg':
break;
case'rec':
break;
case'cmt':
break;
}
}
};
if(np.c._$UD.index||np.c._$UD.blog2_0)
return;
if(np.c._$UD.photo2_0_com)
new p._$$TopModule();
else
if(np.c._$UD.photo2_0)
new p._$$TopHomeModule();
})(E._$getElement);
(function(){
var p=P('np.m'),__pro,__ud=UD;
p._$$Nav=C();
__pro=p._$$Nav.prototype;
__pro._$initialize=function(){
this.__initialize();
this.__hackHover();
this.__intSearch();
this.__intLogin();
this.__intLogout();
};
__pro.__hackHover=function(){
if(!B._$ISOLDIE)
return;
var _list=E._$getChildElements('ui-nav-list'),_face=E._$getElement('ui-nav-face'),_factory,_drop,undrop;
_factory=function(_navitem){
_navitem.onmouseenter=_drop;
_navitem.onmouseleave=_undrop;
};
_drop=function(){
E._$addClassName(this,'nav-item-hover');
};
_undrop=function(){
E._$delClassName(this,'nav-item-hover');
};
if(_list){
for(var i=_list.length-1;i>=0;i--){
_factory(_list[i]);
}
}
if(_face){
_face.onmouseenter=function(){
E._$addClassName(this,'nav-item-hover face-hover');
};
_face.onmouseleave=function(){
E._$delClassName(this,'nav-item-hover face-hover');
};
}
};
__pro.__intSearch=function(){
this.__searchForm=E._$getElement('np_top_search_form');
this.__searchInput=E._$getElement('top_searchInput');
this.__searchPlaceHolder="请输入关键字";
if(!this.__searchForm){
return;
}
V._$addEvent(this.__searchForm,'submit',this.__onFormSubmit._$bind(this));
this.__suggest=new np.w._$$SearchTopSuggest({
parent:this.__searchForm,
onselect:this.__onSuggestSelect._$bind(this),
onchange:this.__onSuggestChange._$bind(this),
onblur:this.__onSearchBlur._$bind(this),
onfocus:this.__onSearchFocus._$bind(this),
maxLength:20,
placeHolder:this.__searchPlaceHolder
});
};
__pro.__onSearchBlur=function(){
E._$delClassName(this.__searchForm,'search-focus');
if(this.__suggest._$getInputText()==this.__searchPlaceHolder){
E._$addClassName(this.__searchForm,'searchtip');
}
}
__pro.__onSearchFocus=function(){
E._$delClassName(this.__searchForm,'searchtip');
E._$addClassName(this.__searchForm,'search-focus');
}
__pro.__onSuggestSelect=function(_v){
this.__searchInput.value=_v.value;
switch(_v.searchType){
case'zuoping':
this.__searchForm.action='http://pp.163.com/pp/searchpic/';
break;
case'paike':
this.__searchForm.action='http://pp.163.com/pp/searchuser/';
break;
default:
this.__searchForm.action='http://pp.163.com/pp/searchpic/';
break;
}
this.__searchForm.submit();
}
__pro.__onSuggestChange=function(_v){
this.__searchInput.value=_v;
}
__pro.__onFormSubmit=function(e){
if(U._$trim(this.__searchInput.value)==""||this.__searchInput.value==this.__searchPlaceHolder){
return false;
}else{
this.__searchForm.submit();
}
}
__pro.__intLogin=function(){
var _btn=E._$getElement('ui-nav-login');
if(!_btn)
return;
var _win=P.ui._$$QLogin,_onsuccess=this.__getProfileByUserName._$bind(this);
_btn.onclick=function(_e){
var _ud=UD;
if(_ud.isLogin){
window.location.replace('http://pp.163.com/upgrade/');
}else{
V._$stop(_e||window.event);
_win._$getInstance({
classname:'lay-login'
})._$reset({
onsuccess:_onsuccess
})._$show()._$focus();
}
};
};
__pro.__getProfileByUserName=function(_username){
J._$postDataByDWR(location.sdwr,'CustomDomainNameBean','getProfile',_username,this.__cbGetProfileByUserName
._$bind(this))
};
__pro.__cbGetProfileByUserName=function(_profile){
if(_profile.pageSetting.photoBlogState===0){
window.location.replace('http://pp.163.com/upgrade/');
}else{
location.reload();
}
};
__pro.__intLogout=function(){
if(__ud.isLogin){
V._$addEvent('ui-nav-logout','click',this.__cache._$logout._$bind(this.__cache));
return;
}
};
__pro.__initialize=function(){
if(__ud.isLogin){
this.__cache=p._$$TopCache._$getInstance();
new p._$$NavMsg();
}
};
})();
(function(){
var p=P('np.m'),__pro,__html='<p>msgcount个msgtxt,<a href="msglink" class="see">查看&gt;&gt;</a></p>',__map={
inboxCount:'私信',
commentCount:'评论',
replyCount:'回复',
guestbookCount:'留言',
alertCount:'提醒',
noticeCount:'通知',
thirdPartyCount:'你有绑定过期了, 请再次绑定'
};
var COOKIE_KEY='MSGBOX_'+UD.visitName;
p._$$NavMsg=C();
__pro=p._$$NavMsg.prototype;
__pro._$initialize=function(){
this.__emsg=E._$getElement('ui-nav-msg');
if(!this.__emsg)
return;
this.__emsgbox=E._$getElement('ui-nav-msgbox');
var _nds=E._$getElementsByClassName(this.__emsgbox,'z-tag');
this.__emsgclose=_nds[0];
this.__emsgdetail=_nds[1];
this.__emsgclose.onclick=this.__closeMsg._$bind(this);
this.__cache=p._$$TopCache._$getInstance();
this.__cache._$addEvent('onmessagecheck',this.__cbCheckMsg._$bind(this));
this.__checkMsg();
};
__pro.__checkMsg=function(){
setTimeout(this.__checkMsg._$bind(this),60000);
this.__cache._$checkMessage(UD.visitName);
};
__pro.__cbCheckMsg=function(_msg){
if(!_msg||!this.__emsg)
return;
var _key=['inboxCount','commentCount','replyCount','guestbookCount','alertCount','noticeCount','thirdPartyCount'],_total=_msg.count,_arr=[],_html,_msgBoxHref;
_msgBoxHref=this.__emsg.href.replace(/m=\d&/i,'');
var _setHref='http://'+UD.visitUserDomainName+'.pp.163.com/setting/#p=4&m=4&page=1';
for(var i=0,l=_key.length;i<l;i++){
if(_msg[_key[i]]!==0){
if((_key[i]=='thirdPartyCount'))
_html=__html.replace('msgcount个','').replace('msgtxt',__map[_key[i]])
.replace('msglink',_setHref);
else _html=__html.replace('msgcount',_msg[_key[i]]).replace('msgtxt',__map[_key[i]])
.replace('msglink',_msgBoxHref+'&m='+i);
_arr.push(_html);
}
}
if(_total>99){
_total='99';
}
this.__emsg.innerText=_total;
if(_total===0){
E._$delClassName(this.__emsg,'msg-active');
this.__emsgbox.style.display='none';
}else{
E._$addClassName(this.__emsg,'msg-active');
if(!U._$getCookie(COOKIE_KEY)){
this.__emsgbox.style.display='';
this.__emsgdetail.innerHTML=_arr.join('');
}
}
};
__pro.__closeMsg=function(){
this.__emsgbox.style.display='none';
U._$setCookie(COOKIE_KEY,1,'','','/');
};
})();
(function(){
E._$hoverElement('J-createSethead','m-createSetheadHover',true);
})();
(function(){
var AD_COOKIE_KEY='AD_SHARETOP';
var _topAd=E._$getElement('j-shareTopAd');
var _close=E._$getElement('j-closeTopAd');
var cookieMd5=U._$getCookie(AD_COOKIE_KEY);
var nowMd5='';
var _closeFunction=function(){
U._$setCookie(AD_COOKIE_KEY,nowMd5,'pp.163.com',30,'/');
_topAd.style.alpha='0';
setTimeout(function(){
_topAd.style.display='none';
},1000);
};
if(_topAd){
nowMd5=_topAd.getAttribute('data-md5');
V._$addEvent(_close,'click',_closeFunction);
if(cookieMd5){
if(cookieMd5!=nowMd5){
_topAd.style.display='block';
}
}else{
_topAd.style.display='block';
}
}
})();
new np.m._$$Nav();

(function(){
var p=P('P.ui'),
__xhtml='<form method="post" name="msgForm" onsubmit="return false;">\
           <div class="sendto">发送给：<span class="js-name"></span></div>\
           <textarea class="w-txt" name="content"></textarea>\
           <div class="vcd hide"><label>验证码：</label><input class="w-txt txt" type="text" name="code"/><img alt="验证码" class="js-img"/><a class="ul js-change" onclick="return false;" href="javascript:void(0);">换一张</a></div>\
           <div class="btns"><input type="button" value="确定" class="ui-btn ui-btn-sub0" name="submit"/><input type="button" value="取消" class="ui-btn ui-btn-ccl0 ml10" name="cancel"/>\
           </div>\
         </form>';
p._$$WMsg=C();
var __pro=p._$$WMsg._$extend(p._$$WBase,true);
__pro.__initialize=function(_param){
this.__disable(true);
this._$setTitle("发私信");
this.__addFormChangeEvent();
V._$addEvent(this.__btnSubmit,'click',this.__onClickSubmit._$bind(this));
V._$addEvent(this.__btnCC,'click',this._$hide._$bind(this));
};
__pro._$reset=function(_options){
this.__form.reset();
_options=_options||{};
this.__to=_options.to||{};
this.__ename.innerText=this.__to.nname||'';
return this;
};
__pro._$focus=function(){
U.dom._$textFocus(this.__econtent);
};
__pro.__addFormChangeEvent=function(){
U.dom._$addTextChange(this.__econtent,U.evt._$fireEvent._$bind(window,this.__form,'formchange'));
V._$addEvent(this.__form,B._$ISIE?'propertychange':'formchange',this.__onFormChange._$bind(this));
};
__pro.__onFormChange=function(){
this.__disable(!this.__suffice());
};
__pro.__suffice=function(){
return this.__econtent.value
};
__pro.__disable=function(_flag){
_flag=!!_flag;
this.__btnSubmit.disabled=_flag;
_flag?E._$addClassName(this.__btnSubmit,'ui-btn-sub0-dis'):E._$delClassName(this.__btnSubmit,'ui-btn-sub0-dis');
};
__pro.__onKeyPress=function(_event){
if(_event.keyCode==13&&!this.__btnSubmit.disabled)
this.__onClickSubmit(_event);
};
__pro.__onClickSubmit=function(){
this.__disable(true);
var _msg=this.__econtent.value
if(_msg.length>1000){
alert('输入内容超过长度[1000个字符]限制！');
return;
}
J._$postDataByDWR(location.sdwr,'ShareMessageBean','addShareMessage',this.__to.id,0,this.__econtent.value,this.__cbSubmit._$bind(this));
};
__pro.__cbSubmit=function(_data){
if(_data&&_data.id){
this._$hide();
E._$showHint('私信发送成功！',true);
}
else{
alert('暂时无法发送，请稍候再试！');
}
};
__pro.__getContent=function(){
var _form=E._$parseElement(__xhtml);
this.__ename=E._$getElementsByClassName(_form,'js-name')[0];
this.__econtent=_form['content'];
this.__echange=E._$getElementsByClassName(_form,'js-change')[0];
this.__btnSubmit=_form['submit'];
this.__btnCC=_form['cancel'];
this.__form=_form;
return _form;
};
})();

var ZeroClipboard={
version:"1.0.7",
clients:{},
moviePath:'http://r.ph.126.net/src/flash/ZeroClipboard.swf',
nextId:1,
get:function(thingy){
if(typeof(thingy)=='string')thingy=document.getElementById(thingy);
if(thingy&&!thingy.addClass){
thingy.hide=function(){this.style.display='none';};
thingy.show=function(){this.style.display='';};
thingy.addClass=function(name){this.removeClass(name);this.className+=' '+name;};
thingy.removeClass=function(name){
var classes=this.className.split(/\s+/);
var idx=-1;
for(var k=0;k<classes.length;k++){
if(classes[k]==name){idx=k;k=classes.length;}
}
if(idx>-1){
classes.splice(idx,1);
this.className=classes.join(' ');
}
return this;
};
thingy.hasClass=function(name){
return!!this.className.match(new RegExp("\\s*"+name+"\\s*"));
};
}
return thingy;
},
setMoviePath:function(path){
this.moviePath=path;
},
dispatch:function(id,eventName,args){
var client=this.clients[id];
if(client){
client.receiveEvent(eventName,args);
}
},
register:function(id,client){
this.clients[id]=client;
},
getDOMObjectPosition:function(obj,stopObj){
var info={
left:0,
top:0,
width:obj.width?obj.width:obj.offsetWidth,
height:obj.height?obj.height:obj.offsetHeight
};
while(obj&&(obj!=stopObj)){
info.left+=obj.offsetLeft;
info.top+=obj.offsetTop;
obj=obj.offsetParent;
}
return info;
},
Client:function(elem){
this.handlers={};
this.id=ZeroClipboard.nextId++;
this.movieId='ZeroClipboardMovie_'+this.id;
ZeroClipboard.register(this.id,this);
if(elem)this.glue(elem);
}
};
ZeroClipboard.Client.prototype={
id:0,
ready:false,
movie:null,
clipText:'',
handCursorEnabled:true,
cssEffects:true,
handlers:null,
glue:function(elem,appendElem,stylesToAdd){
this.domElement=ZeroClipboard.get(elem);
if(!this.domElement)return;
var zIndex=11000;
if(this.domElement.style.zIndex){
zIndex=parseInt(this.domElement.style.zIndex,10)+1;
}
if(typeof(appendElem)=='string'){
appendElem=ZeroClipboard.get(appendElem);
}
else if(typeof(appendElem)=='undefined'){
appendElem=document.getElementsByTagName('body')[0];
}
var box=ZeroClipboard.getDOMObjectPosition(this.domElement,appendElem);
this.div=document.createElement('div');
var style=this.div.style;
style.position='absolute';
style.left=''+box.left+'px';
style.left=''+box.left+'px';
style.top=''+box.top+'px';
style.width=''+box.width+'px';
style.height=''+box.height+'px';
style.lineHeight='1';
style.zIndex=zIndex;
if(typeof(stylesToAdd)=='object'){
for(addedStyle in stylesToAdd){
style[addedStyle]=stylesToAdd[addedStyle];
}
}
appendElem.appendChild(this.div);
this.div.innerHTML=this.getHTML(box.width,box.height);
},
getHTML:function(width,height){
var html='';
var flashvars='id='+this.id+
'&width='+width+
'&height='+height;
if(navigator.userAgent.match(/MSIE/)){
var protocol=location.href.match(/^https/i)?'https://':'http://';
html+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+protocol+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+width+'" height="'+height+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+ZeroClipboard.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+flashvars+'"/><param name="wmode" value="transparent"/></object>';
}
else{
html+='<embed id="'+this.movieId+'" src="'+ZeroClipboard.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+width+'" height="'+height+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" wmode="transparent" />';
}
return html;
},
hide:function(){
if(this.div){
this.div.style.left='-2000px';
}
},
show:function(){
this.reposition();
},
destroy:function(){
if(this.domElement&&this.div){
this.hide();
this.div.innerHTML='';
var body=document.getElementsByTagName('body')[0];
try{body.removeChild(this.div);}catch(e){;}
this.domElement=null;
this.div=null;
}
},
reposition:function(elem){
if(elem){
this.domElement=ZeroClipboard.get(elem);
if(!this.domElement)this.hide();
}
if(this.domElement&&this.div){
var box=ZeroClipboard.getDOMObjectPosition(this.domElement);
var style=this.div.style;
style.left=''+box.left+'px';
style.top=''+box.top+'px';
}
},
setText:function(newText){
this.clipText=newText;
if(this.ready)this.movie.setText(newText);
},
addEventListener:function(eventName,func){
eventName=eventName.toString().toLowerCase().replace(/^on/,'');
if(!this.handlers[eventName])this.handlers[eventName]=[];
this.handlers[eventName].push(func);
},
setHandCursor:function(enabled){
this.handCursorEnabled=enabled;
if(this.ready)this.movie.setHandCursor(enabled);
},
setCSSEffects:function(enabled){
this.cssEffects=!!enabled;
},
receiveEvent:function(eventName,args){
eventName=eventName.toString().toLowerCase().replace(/^on/,'');
switch(eventName){
case'load':
this.movie=document.getElementById(this.movieId);
if(!this.movie){
var self=this;
setTimeout(function(){self.receiveEvent('load',null);},1);
return;
}
if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/)){
var self=this;
setTimeout(function(){self.receiveEvent('load',null);},100);
this.ready=true;
return;
}
this.ready=true;
this.movie.setText(this.clipText);
this.movie.setHandCursor(this.handCursorEnabled);
break;
case'mouseover':
if(this.domElement&&this.cssEffects){
this.domElement.addClass('hover');
if(this.recoverActive)this.domElement.addClass('active');
}
break;
case'mouseout':
if(this.domElement&&this.cssEffects){
this.recoverActive=false;
if(this.domElement.hasClass('active')){
this.domElement.removeClass('active');
this.recoverActive=true;
}
this.domElement.removeClass('hover');
}
break;
case'mousedown':
if(this.domElement&&this.cssEffects){
this.domElement.addClass('active');
}
break;
case'mouseup':
if(this.domElement&&this.cssEffects){
this.domElement.removeClass('active');
this.recoverActive=false;
}
break;
}
if(this.handlers[eventName]){
for(var idx=0,len=this.handlers[eventName].length;idx<len;idx++){
var func=this.handlers[eventName][idx];
if(typeof(func)=='function'){
func(this,args);
}
else if((typeof(func)=='object')&&(func.length==2)){
func[0][func[1]](this,args);
}
else if(typeof(func)=='string'){
window[func](this,args);
}
}
}
}
};

(function(p){
var __pro;
p._$$WindowManage=C();
__pro=p._$$WindowManage.prototype;
U.cls._$augment(p._$$WindowManage,P.ut._$$Single,true);
__pro._$initialize=function(_options){
this.__windows=[];
};
__pro._$addWindow=function(_window){
if(U.arr._$indexOf(this.__windows,_window,true)<0){
this.__windows.push(_window);
}
}
__pro._$hideAll=function(){
for(var i=this.__windows.length-1;i>=0;i--){
this.__windows[i]._$hide();
}
}
})(P('P.w'));

(function(p){
var __pro;
p._$$PluginManage=C();
__pro=p._$$PluginManage.prototype;
p._$$PluginManage._$addPlugin=function(_name,_class){
if(!this.__pluginsClass){
this.__pluginsClass={};
}
this.__pluginsClass[_name]=_class;
}
p._$$PluginManage._$getAllPlugins=function(){
if(!this.__pluginsClass){
this.__pluginsClass={};
}
return this.__pluginsClass;
}
p._$$PluginManage._$getPluginsByNameArray=function(_pnameArray){
var _pc=this._$getAllPlugins();
var _result=[];
if(!!_pnameArray&&_pnameArray.length>0){
for(var i=0;i<_pnameArray.length;i++){
if(!!_pc[_pnameArray[i]]){
_result.push(_pc[_pnameArray[i]]);
}
}
}
return _result;
}
p._$$PluginManage._$getPluginsByName=function(_pname){
var _pc=this._$getAllPlugins();
var _result=[];
return _pc[_pname];
}
})(P('P.w'));

(function(){
var p=P('P.w'),__pro;
p._$$PluginContainer=C();
__pro=p._$$PluginContainer.prototype;
__pro.__recyclePlugins=function(){
if(!!this.__plugins){
for(var i=this.__plugins.length-1;i>=0;i--){
this.__plugins[i]._$destroy();
}
}
this.__plugins=[];
}
__pro.__addPluginByClassName=function(_className,_op){
var _class=P.w._$$PluginManage._$getPluginsByName(_className);
this.__addPluginByClass(_class,_op);
}
__pro.__addPluginByClass=function(_class,_op){
if(_class&&_class._$allocate&&_op.parent){
_op.group=_op.group||String(this.constructor);
var _ins=_class._$allocate(_op.parent,_op);
this.__plugins=this.__plugins||[];
this.__plugins.push(_ins);
}
}
__pro.__initPlugins=function(_defaultParent,_op){
if(_op.plugins&&_op.plugins.length>0){
for(var i=0;i<_op.plugins.length;i++){
var _pop=_op.plugins[i];
_pop.parent=_pop.parent||_defaultParent;
if(_pop.pluginName){
this.__addPluginByClassName(_pop.pluginName,_pop)
continue;
}
if(_pop.pluginClass){
this.__addPluginByClass(_pop.pluginClass,_pop)
continue;
}
}
}
}
__pro._$getAllPlugins=function(){
this.__plugins=this.__plugins||[];
return this.__plugins;
}
__pro._$getPlugin=function(_index){
var _plugins=this._$getAllPlugins();
if(_index>=_plugins.length){
return null;
}
else{
return _plugins[_index];
}
}
})();

(function(p){
var __pro;
p._$$GroupUserPlugin=C();
__pro=p._$$GroupUserPlugin._$extend(P(N.ui)._$$UIAbstract,true);
__pro._$initialize=function(_parent,_options){
this.__ud=np.c._$UD;
this.__kickUserFunction=this.__kickUser._$bind(this);
this._$super(_parent,_options);
}
__pro.__getSpace=function(){
return'w-plugin-groupuser clearfix';
}
__pro.__getXhtml=function(){
return'<a class="js-tag" href="javascript:void(0);">踢出小镇</a><span class="blank">|</span><label for="countSelect">推送张数</label><select id="countSelect" class="js-tag" title="调整该成员每天可推送作品数量">\
   <option value="1">1</option>\
   <option value="3">3</option>\
   <option value="5">5</option>\
   <option value="7">7</option>\
   <option value="9">9</option></select><img src="'+location.sr+'/image/default/loading2.gif" class="js-tag" width="16" height="16" style="display:none;"></img><span class="js-tag"></span>';
}
__pro._$resetOption=function(_options){
_options=_options||{};
p._$$GroupUserPlugin._$supro._$resetOption.call(this,_options);
this.__group=np.c._$GROUP||window.GROUP;
if(this.__ud.isLogin&&this.__group.isGroupAdmin==1){
if(_options&&_options.userName){
if(this.__userName!=_options.userName){
this.__userName=_options.userName;
this.__showLoading();
J._$loadDataByDWR(location.sdwr,'GroupUserBean','getGroupUser',this.__group.id,this.__userName,this.__cbGroupUserCheck._$bind(this,this.__userName));
}
}
}
else{
this.__hideKick();
}
this.__tips.innerHTML="";
}
__pro.__cbGroupUserCheck=function(_userName,_groupUser){
this.__hideLoading();
if(_userName==this.__userName){
if(_groupUser&&_groupUser.userRole==2){
this.__showKick();
this.__countSelect.value=_groupUser.recommendCount;
}
else{
this.__hideKick();
}
}
else{
this.__hideKick();
}
}
__pro.__intXnode=function(){
var _ntmp=E._$getElementsByClassName(this.__body,'js-tag');
this.__kickBtn=_ntmp[0];
this.__countSelect=_ntmp[1];
this.__loading=_ntmp[2];
this.__tips=_ntmp[3];
this.__showKick();
V._$addEvent(this.__kickBtn,'click',this.__kickUserFunction);
V._$addEvent(this.__countSelect,'change',this.__changeRecommendCount._$bind(this));
};
__pro.__kickUser=function(){
var _profile=P.w._$$UserProfileCache._$getInstance()._$getProfileInCache(this.__userName);
if(_profile){
this.__showLoading();
this.__tips.innerHTML="";
V._$clearEvent(this.__kickBtn,'click',this.__kickUserFunction);
J._$loadDataByDWR(location.sdwr,'GroupUserBean','updateGroupUserRoleOfGroupUserByIdAndUserId',this.__group.id,_profile.userId,'Follower',this.__cbKickUser._$bind(this));
}
}
__pro.__cbKickUser=function(){
this.__hideLoading();
V._$addEvent(this.__kickBtn,'click',this.__kickUserFunction);
this.__hideKick();
}
__pro.__changeRecommendCount=function(){
var _profile=P.w._$$UserProfileCache._$getInstance()._$getProfileInCache(this.__userName);
if(_profile){
this.__countSelect.disabled=true;
this.__showLoading();
J._$postDataByDWR(location.sdwr,'GroupUserBean','updateRecommendCount',this.__group.id,_profile.userId,this.__countSelect.value,this.__cbUpdateRecommendCount._$bind(this),(function(){
this.__countSelect.disabled=false;
this.__hideLoading();
})._$bind(this));
}
}
__pro.__cbUpdateRecommendCount=function(_data){
this.__countSelect.disabled=false;
this.__hideLoading();
if(!_data){
this.__tips.innerHTML='修改用户的推荐个数失败';
}
else{
this.__tips.innerHTML='修改用户的推荐个数成功';
}
}
__pro.__showKick=function(){
this._$getBody().style.display="block";
}
__pro.__hideKick=function(){
this._$getBody().style.display="none";
}
__pro.__showLoading=function(){
this.__loading.style.display="inline";
}
__pro.__hideLoading=function(){
this.__loading.style.display="none";
}
P.w._$$PluginManage._$addPlugin('GroupUserPlugin',p._$$GroupUserPlugin);
})(P('P.w.p'));

(function(p){
var __pro;
p._$$UserFollowPlugin=C();
__pro=p._$$UserFollowPlugin._$extend(P(N.ui)._$$UIAbstract,true);
__pro._$initialize=function(_parent,_options){
this.__ud=np.c._$UD||window.UD;
this._$super(_parent,_options);
}
__pro.__getSpace=function(){
return'w-plugin-userfollow clearfix';
}
__pro.__getXhtml=function(){
return'<div class="left"><a href="javascript:void(0);" class="icn1 icn1-16 ztag" hidefocus="true" >发私信</a></div>\
    <div class="right js-fol foa"><a hidefocus="true" class="js-follow fi0 recombg fi0-3 fc99 unfollow ztag" href="javascript:void(0);" needlogin="true">关注他</a><b class="recombg fc1 js-followed followed iblock ztag" >已关注<a hidefocus="true" class="js-unfollow ztag" href="javascript:void(0);">取消关注</a></b><img src="'+location.sr+'/image/default/loading3.gif" style="display:none;"></img></div>';
}
__pro._$resetOption=function(_options){
_options=_options||{};
p._$$UserFollowPlugin._$supro._$resetOption.call(this,_options);
if(this.__ud.isLogin&&this.__ud.visitIsPhotoUser==true){
if(_options&&_options.userName){
if(this.__userName!=_options.userName){
this.__userName=_options.userName;
if(this.__userName==this.__ud.visitName){
this.__hide();
}
else{
this.__show();
J._$loadDataByDWR(location.sdwr,'UserFollowerBean','isUserFollowedByName',this.__userName,this.__ud.visitId,this.__cbFolStatusCheck._$bind(this,this.__userName));
}
}
}
}
else{
this.__hide();
}
}
__pro.__followAction=function(_type){
var _profile=P.w._$$UserProfileCache._$getInstance()._$getProfileInCache(this.__userName);
if(_profile){
if(_type){
J._$postDataByDWR(location.sdwr,'UserFollowerBean','addUserFollowing',_profile.userId,F);
this.__showUnFollow();
}
else{
J._$postDataByDWR(location.sdwr,'UserFollowerBean','deleteUserFollowing',_profile.userId,F);
this.__showFollow();
}
}
}
__pro.__onClickMsg=function(){
P.w._$$WindowManage._$getInstance()._$hideAll();
var _profile=P.w._$$UserProfileCache._$getInstance()._$getProfileInCache(this.__userName);
if(_profile){
P.ui._$$WMsg._$getInstance({
classname:'lay-msg'
})._$reset({
to:{
id:_profile.userId,
name:_profile.userName,
nname:_profile.nickName
}
})._$show()._$focus();
}
};
__pro.__intXnode=function(){
var _ntmp=E._$getElementsByClassName(this.__body,'ztag');
this.__message=_ntmp[0];
this.__follow=_ntmp[1];
this.__unfollow=_ntmp[2];
this.__unfollowbtn=_ntmp[3];
if(this.__ud.isLogin){
V._$addEvent(this.__follow,'click',this.__followAction._$bind(this,true));
V._$addEvent(this.__unfollowbtn,'click',this.__followAction._$bind(this,false));
V._$addEvent(this.__message,'click',this.__onClickMsg._$bind(this));
}
else{
this.__showFollow();
U.dom._$initAnchor(this.__message,{});
U.dom._$initAnchor(this.__follow,{});
}
};
__pro.__cbFolStatusCheck=function(_userName,_result){
if(this.__userName!=_userName){
return;
}
if(_result){
this.__showUnFollow();
}
else{
this.__showFollow();
}
};
__pro.__showFollow=function(){
this.__follow.style.display='';
this.__unfollow.style.display='none';
}
__pro.__showUnFollow=function(){
this.__unfollow.style.display='';
this.__follow.style.display='none';
}
__pro.__hide=function(){
this.__body.style.display='none';
}
__pro.__show=function(){
this.__body.style.display='block';
}
P.w._$$PluginManage._$addPlugin('UserFollowPlugin',p._$$UserFollowPlugin);
})(P('P.w.p'));

(function(p){
var __proCache;
p._$$UserProfileCache=C();
__proCache=p._$$UserProfileCache._$extend(P(N.ut)._$$Cache);
U.cls._$augment(p._$$UserProfileCache,P.ut._$$Single,true);
__proCache._$getProfile=function(_userName,_cb){
if(!_userName&&!_cb){
return;
}
var _profile=this.__getDataInCache(new String(_userName));
if(_profile){
_cb(_userName,_profile);
}
else{
J._$postDataByDWR(location.sdwr,'CustomDomainNameBean','getProfile',_userName,this.__getProfileSuccessCB._$bind(this,_userName,_cb),this.__getProfileFailCB._$bind(this,_userName,_cb));
}
}
__proCache._$getProfileInCache=function(_userName){
return this.__getDataInCache(new String(_userName));
}
__proCache.__getProfileSuccessCB=function(_userName,_cb,_profile){
if(_profile){
this.__setDataInCache(new String(_userName),_profile);
_cb(_userName,_profile);
}
}
__proCache.__getProfileFailCB=function(_userName,_cb,_data){
_cb(_userName,null);
}
})(P('P.w'));

(function(p){
var __pro;
var _userInfoHtml=E._$addHtmlTemplate('<dl class="profile clearfix">\
        <dt><a href="${U.fun._$getUserHomeUrl(userName,domainName)}" target="blank"><img width="50" height="50" src="${U.fun._$getAvaImg(userName,0)}" onerror="this.src='+"'http://r.ph.126.net/image/default/duser.png'"+'" alt="${nickName|escape}" title="${nickName|escape}" ></img></a></dt>\
        <dd>\
         <p><a href="${U.fun._$getUserHomeUrl(userName,domainName)}" target="blank" title="${nickName|escape} 的小屋" >${nickName|escape}</a><span id="g_profile_card_rank" class="rank"></span></p>\
         <p class="otherinfo"><span>${province|escape}</span>{if userInfoVO.age != -1}<span>${userInfoVO.age}岁</span>{/if}</p>\
         <ul class="statistics clearfix"><li>作品<a href="${U.fun._$getUserHomeUrl(userName,domainName)}" target="blank">${userInfoVO.setCount}</a></li><li class="blank">|</li><li>喜欢<a href="${U.fun._$getUserDynamicUrl(userName,domainName,true)}/likelist/?t=0" target="blank">${userInfoVO.lovePhotoCount}</a></li><li class="blank">|</li><li>被喜欢<a href="${U.fun._$getUserDynamicUrl(userName,domainName,true)}/likelist/?t=1" target="blank">${userInfoVO.lovedPhotoCount}</a></li></ul>\
        </dd>\
       </dl>\
       <dl class="userDes clearfix"{if pageSetting.photoBlogState== 0} style="display:none;"{/if}>\
        <dt>相机：</dt>\
        <dd>{if userInfoVO.cameraList.length > 0}{list userInfoVO.cameraList as x}${x|escape}  {/list}{else}&nbsp;&nbsp;{/if}</dd>\
        {if userInfoVO.lensList.length > 0}<dt class="f-mt12">镜头：</dt>\
        <dd class="f-mt12">{list userInfoVO.lensList as x}${x|escape}  {/list}</dd>{/if}\
        {if defined("about") && about.length > 0}<dt class="f-mt12">签名：</dt>\
        <dd class="f-mt12">${about|escape|default:"&nbsp;&nbsp;"}</dd>{/if}\
       </dl>');
var _timer=0;
var _bind=function(e){
e=e||window.event;
var _t=V._$getElement(e);
if(!_t){
return;
}
var _uc=_t.getAttribute("usercard");
if(_uc&&_uc!=''){
V._$addEvent(_t,'mouseout',_onMouseOutTarget,false);
var _op=_parseOp(_uc);
_timer=setTimeout(function(){
V._$delEvent(_t,'mouseout',_onMouseOutTarget);
var _plugins=[];
if(_op.plugin){
var _namearray=_op.plugin.split(",");
for(var i=0;i<_namearray.length;i++){
_plugins.push({
pluginName:_namearray[i],
userName:_op.name,
group:"userProfileCard"
});
}
}
if(!_op.noDefault){
_plugins.push({
pluginName:'UserFollowPlugin',
userName:_op.name,
group:"userProfileCard"
});
}
p._$$UserProfileCard._$show({
userId:_op.id,
userName:_op.name,
plugins:_plugins,
domTarget:_t
});
},500);
}
};
var _onMouseOutTarget=function(e){
e=e||window.event;
var _t=V._$getElement(e);
clearTimeout(_timer);
V._$delEvent(_t,'mouseout',_onMouseOutTarget);
}
var _parseOp=function(_uc){
var arrays=_uc.replace(/&/g,"=").split("=");
var _op={};
for(var i=0;i<arrays.length;i+=2){
_op[arrays[i]]=arrays[i+1];
}
return _op;
}
document.onmouseover=_bind;
p._$$UserProfileCard=C();
__pro=p._$$UserProfileCard._$extend(P(N.ui)._$$CardWrapper,true);
U.cls._$augment(p._$$UserProfileCard,P.w._$$PluginContainer,true);
p._$$UserProfileCard._$show=function(_options){
P(N.ui)._$$CardWrapper._$show.call(this,_options);
p._$$WindowManage._$getInstance()._$addWindow(this.__instance);
}
__pro._$show=function(){
p._$$UserProfileCard._$supro._$show.call(this);
this._$showLayer();
}
__pro._$hide=function(){
p._$$UserProfileCard._$supro._$hide.call(this);
this._$hideLayer();
}
__pro._$initialize=function(_parent,_options){
this.__profileCache=p._$$UserProfileCache._$getInstance();
_options.hack=true;
_options.onshow=this.__resetPosition._$bind(this);
this.__hider=this._$hideLayer._$bind(this);
_options.onclose=this.__hider;
this._$super(document.body,_options);
};
__pro._$resetOption=function(_options){
_options=_options||{};
p._$$UserProfileCard._$supro._$resetOption.call(this,_options);
if(_options&&_options.userName){
if(this.__userName!=_options.userName){
this.__userName=_options.userName;
this._$showLoading();
this.__profileCache._$getProfile(this.__userName,this._$setUserPorfile._$bind(this));
this.__resetPlugins(_options);
}
}
if(this.__domTarget!=_options.domTarget){
this.__clearTargetEvent();
this.__domTarget=_options.domTarget;
this.__addTargetEvent();
}
}
__pro.__clearTargetEvent=function(){
V._$delEvent(this.__domTarget,'mouseout',this.__hider);
}
__pro.__addTargetEvent=function(){
V._$addEvent(this.__domTarget,'mouseout',this.__hider);
}
__pro.__resetPosition=function(){
var _offsetX=E._$offsetX(this.__domTarget);
var _offsetY=E._$offsetY(this.__domTarget);
var x=_offsetX+this.__domTarget.offsetWidth/2;
var y=_offsetY+this.__domTarget.offsetHeight/2;
var _scrollTop=U.dom._$scrollTop();
var _scrollLeft=U.dom._$scrollLeft();
var _clientWidth=U.dom._$clientWidth();
var _clientHeight=U.dom._$clientHeight();
var _arrorClass=[];
var _left=0;
var _top=0;
if(x<=(_scrollLeft+_clientWidth)/2){
_left=_offsetX-25;
_arrorClass.push("arrowleft");
}
else{
_left=_offsetX+25+this.__domTarget.offsetWidth-this.__layer._$getBody().offsetWidth;
_arrorClass.push("arrowright");
}
if(y<=_scrollTop+_clientHeight/2){
if(y-_scrollTop>400){
_arrorClass.push("arrowbottom");
_top=_offsetY-this.__layer._$getBody().offsetHeight-10;
}
else{
_arrorClass.push("arrowtop");
_top=_offsetY+this.__domTarget.offsetHeight+10;
}
}
else{
_arrorClass.push("arrowbottom");
_top=_offsetY-this.__layer._$getBody().offsetHeight-10;
}
this.__layer._$setPosition(_left,_top);
this.__arrow.className="arrow ztag "+_arrorClass.join(" ");
this.__arrow.style.width=this.__domTarget.offsetWidth+20+"px";
}
__pro.__resetPlugins=function(_options){
this.__recyclePlugins();
this.__initPlugins(this.__pluginsDiv,_options);
}
__pro._$setUserPorfile=function(_userName,_profile){
if(_profile&&this.__userName==_userName){
this.__userInfo.innerHTML=E._$getHtmlTemplate(_userInfoHtml,_profile);
this.__erank=E._$getElementsByClassName(this.__userInfo,'rank')[0];
U.dom._$showRank({
node:this.__erank
,rank:_profile.shareGrade
,isVip:_profile.whiteList
,style:'margin-left:5px;'
});
this._$showProfile();
}
this.__resetPosition();
}
__pro.__getSpace=function(){
return'm-user-card';
};
__pro.__getXhtml=function(){
return'<div class="content ztag">\
      <div class="cardloading ztag"><img src="'+location.sr+'/image/default/loading3.gif"></img>正在加载请稍后...</div>\
      <div class="userInfo ztag">\
      </div>\
      <div class="plugins ztag"></div>\
    </div>\
    <div class="arrow ztag"></div>';
};
__pro.__intXnode=function(){
var _ntmp=E._$getElementsByClassName(this.__body,'ztag');
this.__content=_ntmp[0];
this.__loading=_ntmp[1];
this.__userInfo=_ntmp[2];
this.__pluginsDiv=_ntmp[3];
this.__arrow=_ntmp[4];
V._$addEvent(this.__layer._$getBody(),'mouseover',(function(){
this._$showLayer();
})._$bind(this),true);
V._$addEvent(this.__arrow,'mouseover',(function(){
this._$showLayer();
})._$bind(this),false);
V._$addEvent(this.__layer._$getBody(),'mouseout',(function(e){
this._$hideLayer();
})._$bind(this),false);
this._$showLoading();
};
__pro._$showLayer=function(){
if(this.__hideTimeOut!=null){
clearTimeout(this.__hideTimeOut);
this.__hideTimeOut=null;
}
this.__layer._$getBody().style.display="block";
this.__resetPosition();
document.onmouseover=F;
}
__pro._$hideLayer=function(e){
if(this.__hideTimeOut==null||!this.__hideTimeOut){
this.__hideTimeOut=setTimeout((function(){
this.__layer._$getBody().style.display="none";
})._$bind(this),500);
}
document.onmouseover=_bind;
}
__pro._$showProfile=function(){
this.__loading.style.display="none";
this.__userInfo.style.display="block";
this.__pluginsDiv.style.display="block";
}
__pro._$showLoading=function(){
this.__loading.style.display="block";
this.__userInfo.style.display="none";
this.__pluginsDiv.style.display="none";
}
})(P('P.w'));

;var BaseTopBar=(function(){
var uniqueInstance;
function constructor(){
var UD=window.UD;
var ISOLDIE=B._$ISOLDIE;
var __userFullName=UD.visitFullName;
var __userName=UD.visitName;
var __nickName=UD.visitNickName;
var __isLogin=UD.isLogin;
var __myAlbum=E._$getElement('myAlbum');
var __myAlbumWrap=E._$getElement('myAlbumWrap');
var __myAlbumBox=E._$getElement('myAlbumBox');
var __myMessage=E._$getElement('myMessage');
var __myMessageWrap=E._$getElement('myMessageWrap');
var __myMessageBox=E._$getElement('myMessageBox');
var __myNetease=E._$getElement('myNetease');
var __myNeteaseWrap=E._$getElement('myNeteaseWrap');
var __myNeteaseBox=E._$getElement('myNeteaseBox');
var __myPP=E._$getElement('myPP');
var __myPPWrap=E._$getElement('myPPWrap');
var __myPPBox=E._$getElement('myPPBox');
var CURRENTCLASS='on';
var JSHIDE='js-hide';
var CACHEMSG={};
var MSGDWR='http://api.blog.163.com/msg/dwr';
var __messageCount=E._$getElement('JS-MessageCount');
var __myMailLogin=E._$getElement('myMailLogin');
var __msgConfig=[
{
'name':'短消息',
'msg':'userMsgNewCount',
'url':E._$getElement('JS-UserMsgNewCountUrl'),
'num':E._$getElement('JS-UserMsgNewCount')
},
{
'name':'评论',
'msg':'comMsgNewCount',
'type':'?type=com',
'url':E._$getElement('JS-ComMsgNewCountUrl'),
'num':E._$getElement('JS-ComMsgNewCount')
},
{
'name':'评论回复',
'msg':'comReplyMsgNewCount',
'type':'?type=comReply',
'url':E._$getElement('JS-ComReplyMsgNewCountUrl'),
'num':E._$getElement('JS-ComReplyMsgNewCount')
},
{
'name':'留言',
'msg':'noteMsgNewCount',
'type':'?type=note',
'url':E._$getElement('JS-NoteMsgNewCountUrl'),
'num':E._$getElement('JS-NoteMsgNewCount')
},
{
'name':'通知',
'msg':'alertMsgNewCount',
'type':'?type=alert',
'url':E._$getElement('JS-AlertMsgNewCountUrl'),
'num':E._$getElement('JS-AlertMsgNewCount')
}
];
var __myMailUrlWrap=E._$getElement('myMailUrlWrap');
var __myMailUrl=E._$getElement('myMailUrl');
var __myMail=E._$getElement('myMail');
var MAILICONB='mail-icon-B';
var NETEASEMAIL=['@126.com','@yeah.net','@163.com','@188.com','@vip.163.com','@vip.126.com'];
var __headerLogin=E._$getElement('headerLogin');
var __headerLogout=E._$getElement('headerLogout');
function __getUserUrl(_username){
_username=__parseEmail(_username);
return!_username&&'http://blog.163.com/'||('http://blog.163.com/u/'+_username+'/');
};
function __parseEmail(_userName){
if(!!_userName){
var _indexAt=_userName.indexOf('@');
if(_userName.substr(_indexAt,4)==="@126")
return _userName.replace("@126","@126.com");
else if(_userName.substr(_indexAt,4)==="@188")
return _userName.replace("@188","@188.com");
else if(_userName.substr(_indexAt,5)==="@popo")
return _userName.replace(".popo","@popo.163.com");
else if(_userName.substr(_indexAt,4)===".vip")
return _userName.replace(".vip","@vip.163.com");
else if(_userName.substr(_indexAt,5)==="@yeah")
return _userName.replace("@yeah","@yeah.net");
else if(_userName.substr(_indexAt,5)==="@game")
return _userName;
else if(_userName.indexOf('@')>=0)
return _userName;
else
return _userName+"@163.com";
}
};
function isNetEaseMail(){
var _mail=false;
for(var i=0,l=NETEASEMAIL.length;i<l;i++){
if(__userFullName.indexOf(NETEASEMAIL[i])>-1){
_mail=true;
break;
}
}
return _mail;
};
return{
_$init:function(){
this.__on();
if(__isLogin){
this.__myAlbum();
}else{
if(!__headerLogin)return;
U.dom._$initAnchor('headerLogin');
}
},
__on:function(){
V._$addEvent(__headerLogout,'click',this.__onLogout._$bind(this));
V._$addEvent(__myAlbumWrap,'mouseover',this.__show._$bind(this,__myAlbumWrap,__myAlbumBox));
V._$addEvent(__myAlbumWrap,'mouseout',this.__hide._$bind(this,__myAlbumWrap));
V._$addEvent(__myMessageWrap,'mouseover',this.__show._$bind(this,__myMessageWrap,__myMessageBox));
V._$addEvent(__myMessageWrap,'mouseout',this.__hide._$bind(this,__myMessageWrap));
V._$addEvent(__myNeteaseWrap,'mouseover',this.__show._$bind(this,__myNeteaseWrap,__myNeteaseBox));
V._$addEvent(__myNeteaseWrap,'mouseout',this.__hide._$bind(this,__myNeteaseWrap));
V._$addEvent(__myPPWrap,'mouseover',this.__show._$bind(this,__myPPWrap,__myPPBox));
V._$addEvent(__myPPWrap,'mouseout',this.__hide._$bind(this,__myPPWrap));
},
_$getMailAndMessage:function(){
__myMessageWrap&&this.__getMessage();
__myMailUrlWrap&&this.__getNewMail();
},
__showAlbum:function(e){
V._$stop(e);
E._$addClassName(__myAlbumWrap,CURRENTCLASS);
this.__delVipLayer();
ISOLDIE&&this.__showIframe(__myAlbumBox);
},
__hideAlbum:function(e){
V._$stop(e);
E._$delClassName(__myAlbumWrap,CURRENTCLASS);
ISOLDIE&&this.__hideIframe();
},
__showMessage:function(e){
V._$stop(e);
E._$addClassName(__myMessageWrap,CURRENTCLASS);
this.__delVipLayer();
ISOLDIE&&this.__showIframe(__myMessageBox);
},
__hideMessage:function(e){
V._$stop(e);
E._$delClassName(__myMessageWrap,CURRENTCLASS);
ISOLDIE&&this.__hideIframe();
},
__show:function(_wrap,_box,e){
V._$stop(e);
E._$addClassName(_wrap,CURRENTCLASS);
this.__delVipLayer();
ISOLDIE&&this.__showIframe(_box);
},
__hide:function(_wrap,e){
V._$stop(e);
E._$delClassName(_wrap,CURRENTCLASS);
ISOLDIE&&this.__hideIframe();
},
__delVipLayer:function(){
E._$delClassName('J-photoIndexVipWrap','header-vip-checked');
},
__showIframe:function(_el){
var _xy=this.__getElementXY(_el),_iframe;
this.__iframe=E._$getElement('iframeTemp');
_iframe=this.__iframe;
if(_iframe){
_iframe.style.left=_xy[0];
_iframe.style.top=_xy[1];
_iframe.style.width=_xy[2];
_iframe.style.height=_xy[3];
_iframe.style.display='block';
}else{
_iframe=document.createElement('iframe');
_iframe.id='iframeTemp';
_iframe.style.position='absolute';
document.body.style.position='relative';
_iframe.setAttribute("frameborder","0",0);
_iframe.style.left=_xy[0];
_iframe.style.top=_xy[1];
_iframe.style.width=_xy[2];
_iframe.style.height=_xy[3];
_iframe.style.zIndex=8;
document.body.appendChild(_iframe);
}
},
__hideIframe:function(){
var _iframe=this.__iframe?this.__iframe:E._$getElement('iframeTemp');
_iframe.style.display='none';
},
__getElementXY:function(_element){
var _left=E._$offsetX(_element)+'px';
var _top=E._$offsetY(_element)+'px';
var _width=(_element.clientWidth+2)+'px';
var _height=(_element.clientHeight+2)+'px';
return[_left,_top,_width,_height];
},
__handleAlbum:function(e){
V._$stop(e);
E._$delClassName(__myMessageWrap,CURRENTCLASS);
if(E._$hasClassName(__myAlbumWrap,CURRENTCLASS)){
E._$delClassName(__myAlbumWrap,CURRENTCLASS);
}else{
E._$addClassName(__myAlbumWrap,CURRENTCLASS);
}
},
__handleMessage:function(e){
V._$stop(e);
E._$delClassName(__myAlbumWrap,CURRENTCLASS);
if(E._$hasClassName(__myMessageWrap,CURRENTCLASS)){
E._$delClassName(__myMessageWrap,CURRENTCLASS);
}else{
E._$addClassName(__myMessageWrap,CURRENTCLASS);
}
},
__hideLayer:function(){
E._$delClassName(__myAlbumWrap,CURRENTCLASS);
E._$delClassName(__myMessageWrap,CURRENTCLASS);
},
__isHostHasBlog:function(_name){
if('isVisitHasBlog'in np.c._$UD){
this.__getMessage(np.c._$UD.isVisitHasBlog);
return;
}
J._$postDataByDWR(
location.pdwr
,'AlbumBean'
,'isBlogUserExist'
,_name||np.c._$UD.visitName
,this.__getMessage._$bind(this)
,this.__getMessage._$bind(this,false)
);
},
__getMessage:function(_tag){
if(CACHEMSG.userId){
this.__cbGetMessage(CACHEMSG);
return;
}
J._$loadDataByTAG(MSGDWR,'PollingBean','pollingNewMsgByPassport',__userFullName,this.__cbGetMessage._$bind(this),this.__getMessage._$bind(this,false));
},
__cbGetMessage:function(_message){
if(!_message)return;
if(!CACHEMSG.userId){
CACHEMSG=_message;
}
var self=this;
var l=__msgConfig.length,_total=0,_count=0,_num=[];
for(var i=0;i<l;i++){
_count=_message[__msgConfig[i].msg];
_num.push(_count);
_total=_total+_count;
}
if(_total>0){
E._$delClassName(__myMessageWrap,JSHIDE);
for(var m=0;m<l;m++){
(function(i){
__msgConfig[m].num.innerHTML=_num[m];
__msgConfig[m].url.href=self.__getHref(__msgConfig[m]);
__myMessage.href=self.__getHref(__msgConfig[0]);
})(m);
}
__messageCount.innerHTML=_total>99?'99+':_total;
}
},
__getHref:function(_msgConfig){
var _type=_msgConfig.type?_msgConfig.type:'';
var _href=__getUserUrl(__userName)+'message/'+_type;
return _href;
},
__getNewMail:function(){
if(!isNetEaseMail())return;
var _domain="163.com";
for(var i=0,l=NETEASEMAIL.length;i<l;i++){
if(__userFullName.indexOf(NETEASEMAIL[i])>-1){
_domain=NETEASEMAIL[i].substring(1);
break;
}
}
var _host=this.__isVipCount(__userFullName)?'http://msg.':'http://msg.mail.';
var iframeUrl=_host+_domain+"/cgi/mc?funcid=getusrnewmsgcnt&fid=1&addSubFdrs=1"
+"&language=0&style=0&template=newmsgres_forblog.htm&username="+__userFullName+'&r='+U._$randNumberString(8);
if(!this.__miframe){
this.__miframe=document.cloneElement('iframe','hide');
V._$addEvent(this.__miframe,'load',this.__cbLoadMailCount._$bind(this));
document.body.appendChild(this.__miframe);
}
this.__miframe.src=iframeUrl;
},
__isVipCount:function(__userFullName){
var _flag=false;
var __filterMail=['@vip.126.com','@vip.163.com','@vip.188.com'];
for(var i=0,l=__filterMail.length;i<l;i++){
if(__userFullName.indexOf(__filterMail[i])>-1){
_flag=true;
}else{
continue;
}
}
return _flag;
},
__cbLoadMailCount:function(){
try{
this.__cbCheckMail(parseInt(this.__miframe.contentWindow.name)||0);
}catch(e){}
},
__cbCheckMail:function(_count){
var _count=_count<=0?0:_count;
_count?E._$delClassName(__myMail,MAILICONB):E._$addClassName(__myMail,MAILICONB);
__myMail.innerHTML=_count>99?'99+':_count;
__myMailUrl.title='未读邮件'+_count+'封';
__myMailUrl.href='http://photo.163.com/'+__userName+'/mail/';
E._$delClassName(__myMailUrlWrap,JSHIDE);
},
__myAlbum:function(){
if(isNetEaseMail()){
E._$delClassName(__myMailLogin,JSHIDE);
}
},
__onLogout:function(){
U._$setCookie('NEPHOTO_LOGIN','','163.com',0,'/');
var _url=(window.logoutTarget)?window.logoutTarget:location.href;
location.href='http://reg.163.com/Logout.jsp?username='+__userFullName+'&url='+encodeURIComponent(_url);
}
}
};
return{
getInstance:function(){
if(!uniqueInstance){
uniqueInstance=constructor();
}
return uniqueInstance;
}
};
})();
BaseTopBar.getInstance()._$init();

(function(){
var p=P('P.ui'),
__xhtml='<form method="post" name="msgForm" onsubmit="return false;">\
           <div class="sendto">发送给：<span class="js-name"></span></div>\
           <textarea class="w-txt" name="content"></textarea>\
           <div class="vcd"><label>验证码：</label><input class="w-txt txt" type="text" name="code"/><img alt="验证码" class="js-img"/><a class="ul js-change" onclick="return false;" href="javascript:void(0);">换一张</a></div>\
           <div class="btns"><input type="button" value="确定" class="ui-btn ui-btn-sub0 mr10" name="submit"/><input type="button" value="取消" class="ui-btn ui-btn-ccl0" name="cancel"/>\
           </div>\
         </form>';
p._$$BaseMsg=C();
var __pro=p._$$BaseMsg._$extend(p._$$WBase,true);
__pro.__initialize=function(_param){
this.__disable(true);
this._$setTitle("发消息");
this.__addFormChangeEvent();
V._$addEvent(this.__echange,'click',this._$setCaptcha._$bind(this));
V._$addEvent(this.__btnSubmit,'click',this.__onClickSubmit._$bind(this));
V._$addEvent(this.__btnCC,'click',this._$hide._$bind(this));
V._$addEvent(this.__ecode,'keypress',this.__onKeyPress._$bind(this));
};
__pro._$reset=function(_options){
this.__form.reset();
_options=_options||{};
this.__to=_options.to||{};
this.__ename.innerText=this.__to.nname||'';
this._$setCaptcha();
return this;
};
__pro._$setCaptcha=function(){
this.__eimg.src='http://api.blog.163.com/cap/captcha.jpgx?parentId='+this.__to.name+'&r='+U._$randNumberString();
};
__pro._$focus=function(){
U.dom._$textFocus(this.__econtent);
};
__pro.__addFormChangeEvent=function(){
U.dom._$addTextChange(this.__econtent,U.evt._$fireEvent._$bind(window,this.__form,'formchange'));
U.dom._$addTextChange(this.__ecode,U.evt._$fireEvent._$bind(window,this.__form,'formchange'));
V._$addEvent(this.__form,B._$ISIE?'propertychange':'formchange',this.__onFormChange._$bind(this));
};
__pro.__onFormChange=function(){
this.__disable(!this.__suffice());
};
__pro.__suffice=function(){
return this.__econtent.value&&this.__ecode.value;
};
__pro.__disable=function(_flag){
_flag=!!_flag;
this.__btnSubmit.disabled=_flag;
_flag?E._$addClassName(this.__btnSubmit,'ui-btn-sub0-dis'):E._$delClassName(this.__btnSubmit,'ui-btn-sub0-dis');
};
__pro.__onKeyPress=function(_event){
if(_event.keyCode==13&&!this.__btnSubmit.disabled)
this.__onClickSubmit(_event);
};
__pro.__onClickSubmit=function(){
this.__disable(true);
var _msg=this.__econtent.value,_code=this.__ecode.value;
if(_msg.length>1000){
alert('输入内容超过长度[1000个字符]限制！');
this.__disable(false);
return;
}
if(!U._$trim(_code)){
alert('请输入验证码！');
this.__disable(false);
return;
}
location.bdwrnew='http://blog.163.com/u/'+this.__to.fullName+'/dwr';
J._$postDataByDWR(location.bdwrnew,'RemindBean','sendUserMsgWithValcodeForPhoto',this.__to.id,this.__to.name,this.__econtent.value,this.__ecode.value,false,this.__cbSubmit._$bind(this),this.__onError._$bind(this));
};
__pro.__cbSubmit=function(_data){
if(!!_data){
if(_data>0&&_data!=null){
this._$hide();
E._$showHint('消息发送成功',true);
}
else{
alert('发送失败！');
this._$setCaptcha();
}
}
};
__pro.__onError=function(_data){
if(!!_data){
if(_data.type==="CaptchaException"){
alert('验证码错误，请重新输入');
this._$setCaptcha();
this.__ecode.value='';
}else{
alert('发送失败！');
}
}else{
alert('发送失败！');
}
};
__pro.__getContent=function(){
var _form=E._$parseElement(__xhtml);
this.__ename=E._$getElementsByClassName(_form,'js-name')[0];
this.__econtent=_form['content'];
this.__ecode=_form['code'];
this.__eimg=E._$getElementsByClassName(_form,'js-img')[0];
this.__echange=E._$getElementsByClassName(_form,'js-change')[0];
this.__btnSubmit=_form['submit'];
this.__btnCC=_form['cancel'];
this.__form=_form;
return _form;
};
})();

;(function(){
var __pro={};
__pro._$init=function(){
if(UD.editable)return;
this.__storage=P(N.ut)._$$SESStorage;
this.__efollow=E._$getElement('J-photoIndexFollow');
this.__emsg=E._$getElement('J-photoIndexMessage');
if(!this.__efollow||!this.__emsg){
return;
}
this.__efollowtxt=this.__efollow.getElementsByTagName('span')[0];
this.__pronoun=UD.hostPronoun;
if(UD.isLogin){
if(this.__storage._$get('messaging')){
this.__onClickMsg();
this.__storage._$clear();
}
V._$addEvent(this.__efollow,'click',this.__followAction._$bind(this,false));
V._$addEvent(this.__efollow,'mouseover',this.__showUnfollow._$bind(this));
V._$addEvent(this.__efollow,'mouseout',this.__hideUnfollow._$bind(this));
V._$addEvent(this.__emsg,'click',this.__onClickMsg._$bind(this));
}
else{
U.dom._$initAnchor(this.__efollow,{
onbeforereload:this.__storage._$set._$bind(this,'following',1)
});
U.dom._$initAnchor(this.__emsg,{
onbeforereload:this.__storage._$set._$bind(this,'messaging',1)
});
}
};
__pro.__showUnfollow=function(e){
if(E._$hasClassName(this.__efollow,'js-checked')){
E._$delClassName(this.__efollow,'base-button-checked');
E._$addClassName(this.__efollow,'base-button-hover');
E._$replaceClassName(this.__efollowtxt,'checked','minus');
this.__efollowtxt.innerHTML='取消关注';
}else{
E._$addClassName(this.__efollow,'base-button-hover');
}
};
__pro.__hideUnfollow=function(e){
if(E._$hasClassName(this.__efollow,'js-checked')){
E._$addClassName(this.__efollow,'base-button-checked');
E._$delClassName(this.__efollow,'base-button-hover');
E._$replaceClassName(this.__efollowtxt,'minus','checked');
this.__efollowtxt.innerHTML='已关注';
}else{
E._$delClassName(this.__efollow,'base-button-hover');
}
};
__pro.__addHover=function(e){
V._$stop(e);
E._$addClassName(this.__emsg,'base-button-hover');
};
__pro.__delHover=function(e){
V._$stop(e);
E._$delClassName(this.__emsg,'base-button-hover');
};
__pro.__followAction=function(_follow,e){
V._$stop(e);
var _isFollow=E._$hasClassName(this.__efollow,'js-checked');
var _follow=_follow?_follow:!_isFollow;
np.w._$$FollowModule._$show({
title:_follow?'关注':'取消关注',
follow:_follow,
profile:{
id:UD.hostId,
name:UD.hostName,
nickname:UD.hostNickName
},
onfollow:this.__cbFollow._$bind(this),
onunfollow:this.__cbUnfollow._$bind(this)
});
};
__pro.__cbFollow=function(_result){
if(_result){
this.__followed();
}else{
E._$showHint('关注失败，请稍候再试！',true);
}
};
__pro.__cbUnfollow=function(_result){
if(_result){
this.__unFollowed();
}
else{
E._$showHint('取消关注失败，请稍候再试！',true);
}
};
__pro.__onClickMsg=function(e){
V._$stop(e);
P.ui._$$BaseMsg._$getInstance({
classname:'lay-msg'
})._$reset({
to:{
id:UD.hostId,
name:UD.hostName,
nname:UD.hostNickName,
fullName:UD.hostFullName
}
})._$show()._$focus();
};
__pro.__checkFolStatusFromPhoto=function(_parentId,_childId){
J._$loadDataByDWR(location.sdwr,'UserFollowerBean','isUserFollowed',
_parentId,_childId,this.__cbCheckFolStatusFromPhoto._$bind(this));
};
__pro.__cbCheckFolStatusFromPhoto=function(_result){
if(_result){
this.__followed();
}
else{
this.__unFollowed();
}
};
__pro.__followed=function(){
E._$addClassName(this.__efollow,'base-button-checked js-checked');
E._$replaceClassName(this.__efollowtxt,'plus','checked');
this.__efollowtxt.innerHTML='已关注';
};
__pro.__unFollowed=function(){
E._$delClassName(this.__efollow,'base-button-checked js-checked');
E._$replaceClassName(this.__efollowtxt,'checked','plus');
this.__efollowtxt.innerHTML='关注'+UD.hostPronoun;
};
return __pro;
})()._$init();
;(function(){
window.imgoutCompressSize=0;
var p=P('P.m'),__sizeWindow;
p._$$DefautlSizeWindow=C();
__sizeWindow=p._$$DefautlSizeWindow._$extend(np.l._$$Window,true);
__sizeWindow._$initialize=function(_parent,_options){
this._$super(_parent,_options);
};
__sizeWindow.__getSpace=function(){
return'default-imgout-size';
};
__sizeWindow.__getXhtml=function(){
return[
'<div>请选择默认外链图片尺寸：</div>',
'<ul class="clearfix">',
'<li class="itm clearfix"><span class="item ztag"><input class="radi ztag" name="defaultPhotoSize" type="radio" id="defaultSize1" value="1" /></span><label class="lab" for="defaultSize1">等比750px尺寸(适用于博客/论坛用户，节省外链流量)</label></li>',
'<li class="itm clearfix"><span class="item ztag"><input class="radi ztag" name="defaultPhotoSize" type="radio" id="defaultSize2" value="2" /></span><label class="lab" for="defaultSize2">原图(适用于网店卖家)</label></li>',
'</ul>',
'<div class="mt10"><a href="javascript:void(0);" class="base-button base-button-skinA base-button-S ztag">保 存</a></div>',
'<div class="msg ztag"></div>'
].join('');
};
__sizeWindow.__intXnode=function(){
var _ntmp=E._$getElementsByClassName(this.__body,'ztag');
this.__d1wrap=_ntmp[0];
this.__d1=_ntmp[1];
this.__d2wrap=_ntmp[2];
this.__d2=_ntmp[3];
this.__eok=_ntmp[4];
this.__emsg=_ntmp[4];
V._$addEvent(this.__eok,'click',this.__setSize._$bind(this));
};
__sizeWindow.__setSize=function(e){
V._$stop(e);
var _val,_d1=E._$getElement('defaultSize1'),_d2=E._$getElement('defaultSize2');
_val=(_d1.checked?_d1.value:_d2.value)-0;
if(_val==imgoutCompressSize){
this._$hide();
return;
}else{
J._$postDataByDWR(location.pdwr,'ImgoutCommonBean','updateImgoutCompressSize',_val,this.__cbSetSize._$bind(this,_val));
}
};
__sizeWindow.__cbSetSize=function(_val,bool){
imgoutCompressSize=_val;
if(!!bool){
this._$hide();
}else{
this.__emsg.innerHTML='设置失败！';
}
};
__sizeWindow._$resetOption=function(){
var _imgoutCompressSize=!!imgoutCompressSize?imgoutCompressSize:UD.imgoutCompressSize,
_d1wrap=this.__d1wrap,_d2wrap=this.__d2wrap;
if(_imgoutCompressSize==1||_imgoutCompressSize==0){
_d1wrap.innerHTML='<input class="radi ztag" name="defaultPhotoSize" type="radio" id="defaultSize1" value="1" checked="checked" />';
_d2wrap.innerHTML='<input class="radi ztag" name="defaultPhotoSize" type="radio" id="defaultSize2" value="2" />';
}else{
_d1wrap.innerHTML='<input class="radi ztag" name="defaultPhotoSize" type="radio" id="defaultSize1" value="1" />';
_d2wrap.innerHTML='<input class="radi ztag" name="defaultPhotoSize" type="radio" id="defaultSize2" value="2" checked="checked" />';
}
};
return __sizeWindow;
})();
;(function(){
var ISOLDIE=B._$ISOLDIE,
_checkClass='header-vip-checked',
_btnCheckClass='base-btn-checked',
_ewrap=E._$getElement('J-photoIndexVipWrap'),
_evip=E._$getElement('J-photoIndexVip'),
_eout=E._$getElement('J-photoIndexVipOut'),
_ebox=E._$getElement('J-photoIndexVipBox'),
_esize=E._$getElement('J-photoIndexDefaultSize');
return{
_$init:function(){
if(_evip){
V._$addEvent(_evip,'click',this.__handleVip._$bind(this));
V._$addEvent(document,'click',this.__hideLayer._$bind(this));
}
if(_esize){
V._$addEvent(_esize,'click',this.__setDefaultSize._$bind(this));
}
if(_eout){
this._eouttxt=_eout.getElementsByTagName('span')[0];
V._$addEvent(_eout,'mouseover',this.__handleVipOutOver._$bind(this));
V._$addEvent(_eout,'mouseout',this.__handleVipOut._$bind(this));
}
},
__setDefaultSize:function(e){
V._$stop(e);
P.m._$$DefautlSizeWindow._$show({
title:'默认外链图片尺寸设置'
});
},
__handleVip:function(e){
V._$stop(e);
if(E._$hasClassName(_ewrap,_checkClass)){
E._$delClassName(_ewrap,_checkClass);
ISOLDIE&&this.__hideIframe();
}else{
E._$addClassName(_ewrap,_checkClass);
ISOLDIE&&this.__showIframe(_ebox);
}
},
__hideLayer:function(e){
E._$delClassName(_ewrap,_checkClass);
ISOLDIE&&this.__hideIframe();
},
__showIframe:function(_el){
var _xy=this.__getElementXY(_el),_iframe;
this.__iframe=E._$getElement('iframeTemp');
_iframe=this.__iframe;
if(_iframe){
_iframe.style.left=_xy[0];
_iframe.style.top=_xy[1];
_iframe.style.width=_xy[2];
_iframe.style.height=_xy[3];
_iframe.style.display='block';
}else{
_iframe=document.createElement('iframe');
_iframe.id='iframeTemp';
_iframe.style.position='absolute';
document.body.style.position='relative';
_iframe.setAttribute("frameborder","0",0);
_iframe.style.left=_xy[0];
_iframe.style.top=_xy[1];
_iframe.style.width=_xy[2];
_iframe.style.height=_xy[3];
_iframe.style.zIndex=8;
document.body.appendChild(_iframe);
}
},
__hideIframe:function(){
var _iframe=this.__iframe?this.__iframe:E._$getElement('iframeTemp');
if(_iframe){
_iframe.style.display='none';
}
},
__getElementXY:function(_element){
var _left=E._$offsetX(_element)+'px';
var _top=E._$offsetY(_element)+'px';
var _width=(_element.clientWidth+2)+'px';
var _height=(_element.clientHeight+2)+'px';
return[_left,_top,_width,_height];
},
__handleVipOutOver:function(){
E._$delClassName(_eout,_btnCheckClass);
E._$replaceClassName(this._eouttxt,'out','up');
this._eouttxt.innerHTML='重新升级';
},
__handleVipOut:function(){
E._$addClassName(_eout,_btnCheckClass);
E._$replaceClassName(this._eouttxt,'up','out');
this._eouttxt.innerHTML='VIP已过期';
}
};
})()._$init();
(function(){
var _t163Address=E._$getElement('t163Address'),_opener=null;
_t163Address&&(_t163Address._clickInit=0);
return{
_$init:function(){
if(_t163Address){
this.__on();
}
},
__on:function(){
V._$addEvent(_t163Address,'click',this.__getT163UserName._$bind(this));
},
__getT163UserName:function(e){
var _email=U._$getFullName(np.c._$UD.hostName)||'';
if(_email=='')return;
var _option={};
_t163Address._clickInit++;
_option.onload=this.__cbT163UserNameGet._$bind(this);
J._$request("http://t.163.com/service/getScreenName?email="+_email,_option);
},
__cbT163UserNameGet:function(_retultCode){
var _link="http://t.163.com/";
if(!!_retultCode){
var _index=_retultCode.indexOf("=");
var _code="";
if(!(_index==0||_index==_retultCode.length-1)){
_code=_retultCode.substr(_index+1,_retultCode.length-_index);
_link=_link+_code+"?f=myphototop";
}
_t163Address.href=_link;
_t163Address.target="_blank";
V._$clearEvent(_t163Address,'click');
_t163Address._clickInit>0&&!_opener&&(_opener=window.open(_link));
_t163Address._clickInit=null;
}
}
}
})()._$init();
(function(){
var __element=E._$getElement('J-headBanner');
var __close=E._$getElement('J-headBannerClose');
var __cookie=U._$getCookie('album-head-ad');
return{
_$init:function(){
if(__cookie&&!__element){return;}
this.__onClose();
},
__onClose:function(){
V._$addEvent(__close,'click',function(){
E._$removeElement(__element);
U._$setCookie('album-head-ad',true);
});
}
}
})()._$init();
