(function(){
var getById=E._$getElement;
var elCamera=getById('kitCamera'),
elLens=getById('kitCameraLens'),
elRegion=getById('travelRegion');
var cameraJsonUrl='http://r.ph.126.net/share/info/camera.json',
lensJsonUrl='http://r.ph.126.net/share/info/lens.json';
if(elCamera){
J._$loadScript(cameraJsonUrl,function(){
if(!g_camera){
return;
}
var cameraIdStr=elCamera.getAttribute('data-camera'),
cameraIdArr=cameraIdStr.split('-');
var cameraBrand=g_camera[cameraIdArr[0]],cameraType;
var url='';
if(cameraBrand){
url+=cameraBrand.enm+'/';
if(cameraBrand.son){
if(cameraType=cameraBrand.son[cameraIdArr[1]]){
url+=formatType(cameraType.enm)
}
}
}
elCamera.href+=url+'?searchType=0';
g_camera=null;
});
}
if(elLens){
J._$loadScript(lensJsonUrl,function(){
if(!g_lens){
return;
}
var lensId=elLens.getAttribute('data-lens');
var lensBrand,lensType;
var url='';
for(var p in g_lens){
lensType=g_lens[p]['son'][lensId];
if(lensType){
lensBrand=g_lens[p].enm;
break;
}
}
if(lensType){
url+=formatType(lensBrand)+'/'+formatType(lensType.enm);
}
elLens.href+=url+'?searchType=1';
g_lens=null;
});
}
if(elRegion){
var dirStr=elRegion.getAttribute('data-dir'),
dirArr=dirStr.split('-');
var dirId;
var i=1,l=dirArr.length;
for(;i<l;i++){
if(dirArr[i]!=0){
dirId=dirArr[i];
}
}
elRegion.href+=dirId||'';
}
function formatType(str){
if(str){
return str.replace(/α/g,'a').replace(/μ/g,'u')
.replace(/\s+/g,'_').replace(/\/+/g,'__');
}
return'';
}
})();
