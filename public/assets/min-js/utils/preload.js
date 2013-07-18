define(["require","data/imageData","common"],function(e){function u(e){var t=[];for(var n=0;n<e.length;n++){var r=e[n],i=l(r.name,s+r.url);t.push(i)}return t}function a(e){var t=[],n=e.skipFrames?1+e.skipFrames:0;for(var r=0;r<e.numImages;r++)if(!n||r%n==0){var i="sequence"+r,s=f(e,r),o=l(i,s);t.push(o)}return t}function f(e,t){var n=e.onAWS?o:s,r=n+e.url,i=e.startNum?e.startNum:0,u=i+t,a=e.padding?UTILS.zeroPad(u,e.padding):u,f=r+a+"."+e.extension;return f}function l(e,t){var n={name:e,url:t};return n}function c(e,t,n){var r=new Image;for(key in t)r[key]=t[key];r.onload=function(){this.imgDim={w:this.width,h:this.height},n(this)},r.src=e}function h(e,t,n,r){function a(){n=="array"?u=[]:n=="object"&&(u={});for(var t=0;t<s;t++){var r=e[t],i=new Image,o={name:r.name,tag:t},a=r.url;c(a,o,f)}}function f(e){n=="array"?u[e.tag]=e:n=="object"&&(u[e.name]=e),o++,o>=s&&t(u)}var i=this,s=e.length,o=0,u=null;a()}var t=e("data/imageData"),n=e("common"),r={},i=[],s=null,o=null;return r.init=function(){return s=n.imagePath+"/",o=n.AWSPath+"/",r},r.loadSingleFromGroup=function(e,t,n){var r=imageGroups[e].data,i=null,o=null;if(typeof t=="string"){for(var u=0;u<r.length;u++)if(r[u].name==t){i=r[u];break}o=s+i.url}else i=f(r,t),o=i;c(o,null,n);var a=new Image},r.loadGroupWithID=function(e,t,n){console.log(e);if(e==undefined)return;var s=imageGroups[e],o=s.type,f=s.data,l=null;o=="list"?l=u(f):o=="sequence"&&(l=a(f)),console.log(l,t,n,r),i.push(new h(l,t,n,r))},r.init()});