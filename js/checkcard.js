!function(a){var b="undefined"!=typeof window,c=b?window:this,d=function(){return a(b,c)};"undefined"!=typeof define&&define.amd?define("IDValidator",[],d):"function"==typeof define&&define.cmd?define(function(d,e,f){f.exports=a(b,c)}):"undefined"!=typeof module&&module.exports?module.exports=a(b,c):c.IDValidator=a(b,c)}(function(a,b){var c={error:{longNumber:"长数字存在精度问题，请使用字符串传值！ Long number is not allowed, because the precision of the Number In JavaScript."}},d={checkArg:function(a){var b=typeof a;switch(b){case"number":if(a=a.toString(),a.length>15)return this.error(c.error.longNumber),!1;break;case"string":break;default:return!1}a=a.toUpperCase();var d=null;if(18===a.length)d={body:a.slice(0,17),checkBit:a.slice(-1),type:18};else{if(15!==a.length)return!1;d={body:a,type:15}}return d},checkAddr:function(a,b){var c=this.getAddrInfo(a,b);return c!==!1},getAddrInfo:function(a,b){if(b=b||null,null===b)return a;if(b.hasOwnProperty(a))return b[a];var c;return c=a.slice(0,4)+"00",b.hasOwnProperty(c)?b[c]+"未知地区":(c=a.slice(0,2)+"0000",b.hasOwnProperty(c)?b[c]+"未知地区":!1)},checkBirth:function(a){var b,c,d;if(8==a.length)b=parseInt(a.slice(0,4),10),c=parseInt(a.slice(4,6),10),d=parseInt(a.slice(-2),10);else{if(6!=a.length)return!1;b=parseInt("19"+a.slice(0,2),10),c=parseInt(a.slice(2,4),10),d=parseInt(a.slice(-2),10)}return!(c>12||0===c||d>31||0===d)},checkOrder:function(a){return!0},weight:function(a){return Math.pow(2,a-1)%11},rand:function(a,b){return b=b||1,Math.round(Math.random()*(a-b))+b},str_pad:function(a,b,c,d){if(a=a.toString(),b=b||2,c=c||"0",d=d||!1,a.length>=b)return a;for(var e=0,f=b-a.length;f>e;e++)d?a+=c:a=c+a;return a},error:function(a){var b=new Error;throw b.message="IDValidator: "+a,b}},e=function(a){"undefined"!=typeof a&&(this.GB2260=a),this.cache={}};return e.prototype={isValid:function(a){var b=this.GB2260||null,c=d.checkArg(a);if(c===!1)return!1;if(this.cache.hasOwnProperty(a)&&"undefined"!=typeof this.cache[a].valid)return this.cache[a].valid;this.cache.hasOwnProperty(a)||(this.cache[a]={});var e=c.body.slice(0,6),f=18===c.type?c.body.slice(6,14):c.body.slice(6,12),g=c.body.slice(-3);if(!(d.checkAddr(e,b)&&d.checkBirth(f)&&d.checkOrder(g)))return this.cache[a].valid=!1,!1;if(15===c.type)return this.cache[a].valid=!0,!0;for(var h=[],i=18;i>1;i--){var j=d.weight(i);h[i]=j}for(var k=0,l=c.body.split(""),m=0;m<l.length;m++)k+=parseInt(l[m],10)*h[18-m];var n=12-k%11;return 10==n?n="X":n>10&&(n%=11),n="number"==typeof n?n.toString():n,n!==c.checkBit?(this.cache[a].valid=!1,!1):(this.cache[a].valid=!0,!0)},getInfo:function(a){var b=this.GB2260||null;if(this.isValid(a)===!1)return!1;var c=d.checkArg(a);if("undefined"!=typeof this.cache[a].info)return this.cache[a].info;var e=c.body.slice(0,6),f=18===c.type?c.body.slice(6,14):c.body.slice(6,12),g=c.body.slice(-3),h={};return h.addrCode=e,null!==b&&(h.addr=d.getAddrInfo(e,b)),h.birth=18===c.type?[f.slice(0,4),f.slice(4,6),f.slice(-2)].join("-"):["19"+f.slice(0,2),f.slice(2,4),f.slice(-2)].join("-"),h.sex=g%2===0?0:1,h.length=c.type,18===c.type&&(h.checkBit=c.checkBit),this.cache[a].info=h,h},makeID:function(a){var b=this.GB2260||null,c=null;if(null!==b)for(var e=0;null===c;){if(e>10){c=110101;break}var f=d.str_pad(d.rand(50),2,"0"),g=d.str_pad(d.rand(20),2,"0"),h=d.str_pad(d.rand(20),2,"0"),i=[f,g,h].join("");if(b[i]){c=i;break}}else c=110101;var j=d.str_pad(d.rand(99,50),2,"0"),k=d.str_pad(d.rand(12,1),2,"0"),l=d.str_pad(d.rand(28,1),2,"0");if(a)return c+j+k+l+d.str_pad(d.rand(999,1),3,"1");j="19"+j;for(var m=c+j+k+l+d.str_pad(d.rand(999,1),3,"1"),n=[],o=18;o>1;o--){var p=d.weight(o);n[o]=p}for(var q=0,r=m.split(""),s=0;s<r.length;s++)q+=parseInt(r[s],10)*n[18-s];var t=12-q%11;return 10==t?t="X":t>10&&(t%=11),t="number"==typeof t?t.toString():t,m+t}},e});