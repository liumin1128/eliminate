(this.webpackJsonpanimal=this.webpackJsonpanimal||[]).push([[0],{164:function(t,e,n){},165:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n(4),s=n.n(r),i=n(54),c=n.n(i),u=(n(65),n(66),n(1)),o=n.n(u),h=n(2),d=n(8),l=n(3),m=n.n(l),f=n(5),p=n.n(f),v=n(28),x=n.n(v),b=n(29),j=n.n(b),g=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,e="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",n=e.length,a="",r=0;r<t;r+=1)a+=e.charAt(Math.floor(Math.random()*n));return a},y=function(t){return new Promise((function(e,n){return setTimeout(e,t)}))};function O(){var t=["chicken","frog","sea-lion","bear","dog"];return t[Math.floor(Math.random()*t.length)]}function k(t){return w.apply(this,arguments)}function w(){return(w=Object(h.a)(o.a.mark((function t(e){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",p.a.Leaderboard.updateStatistics(p.a.User.current(),{Eliminate:e}).catch(console.error));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function S(){return I.apply(this,arguments)}function I(){return(I=Object(h.a)(o.a.mark((function t(){var e;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=p.a.Leaderboard.createWithoutData("Eliminate"),t.abrupt("return",e.getResults({limit:p.a.User.current()?3:999,skip:0,selectUserKeys:["nickname","username"]}).catch(console.error));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function C(){return N.apply(this,arguments)}function N(){return(N=Object(h.a)(o.a.mark((function t(){var e;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=p.a.Leaderboard.createWithoutData("Eliminate"),t.abrupt("return",e.getResultsAroundUser({limit:13,selectUserKeys:["nickname","username"]}).catch(console.error));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}p.a.init({appId:"GmXQQSUuhWfw5bhp0cfmOzkY-gzGzoHsz",appKey:"YEXH3kL8fo6DW4ORrYptEMTu",serverURL:"https://gmxqqsuu.lc-cn-n1-shared.com"});n(98);var T=function(){var t=Object(r.useState)([]),e=Object(d.a)(t,2),n=e[0],s=e[1],i=Object(r.useState)([]),c=Object(d.a)(i,2),u=c[0],l=c[1],f=p.a.User.current();return Object(r.useEffect)(Object(h.a)(o.a.mark((function t(){var e,n,a,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([S(),C()]);case 2:e=t.sent,n=Object(d.a)(e,2),a=n[0],r=n[1],s(a),l(r||[]);case 8:case"end":return t.stop()}}),t)}))),[]),Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("h3",{className:"title",children:"\u6392\u884c\u699c\uff1a"}),Object(a.jsxs)("ul",{className:"ul",children:[n.map((function(t){return Object(a.jsxs)("li",{className:"li",children:[Object(a.jsxs)("span",{className:"rank",children:["\u7b2c",t.rank+1,"\u540d",m()(f,"id")===m()(t,"user.id")?"(\u4f60)":""]}),Object(a.jsx)("span",{className:"name",children:m()(t,"user.attributes.nickname")}),Object(a.jsx)("span",{className:"value",children:t.value})]},m()(t,"user.id"))})),Object(a.jsxs)("li",{className:"li",children:[Object(a.jsx)("span",{className:"rank",children:"..."}),Object(a.jsx)("span",{className:"name"}),Object(a.jsx)("span",{className:"value"})]}),u.filter((function(t){var e=m()(t,"user.id");return-1===n.findIndex((function(t){return m()(t,"user.id")===e}))})).map((function(t){return Object(a.jsxs)("li",{className:"li",children:[Object(a.jsxs)("span",{className:"rank",children:["\u7b2c",t.rank+1,"\u540d",m()(f,"id")===m()(t,"user.id")?"(\u4f60)":""]}),Object(a.jsx)("span",{className:"name",children:m()(t,"user.attributes.nickname")}),Object(a.jsx)("span",{className:"value",children:t.value})]},m()(t,"user.id"))}))]})]})},L=n(55),R=n(56),D=n(57),U=n.n(D),M=n(58),E=n.n(M),Y=n(59),X=n(30),A=function(){function t(e,n){var a=this;Object(L.a)(this,t),this.init=function(t){var e=t.onDataChange,n=t.onScoreChange,r=t.onTimeChange,s=t.onGameOver;X.Howler.volume(.5),a.sound={},["d1","d2","keyboard"].map((function(t){a.sound[t]=new X.Howl({src:["./audios/"+t+".mp3"],onplayerror:function(t){this.sound.once("unlock",(function(){this.sound.play()}))},volume:.5,onend:function(){}})})),a.onDataChange=e,a.onScoreChange=n,a.onTimeChange=r,a.onGameOver=s,a.start()},this.timeLoop=function(){a.time>0?(a.time=a.time-1e3,a.onTimeChange(a.time),setTimeout((function(){a.timeLoop()}),1e3)):(a.status="end",a.onGameOver(a.score))},this.getData=function(){return a.data},this.update=function(){a.onDataChange(a.data)},this.click=function(){var t=Object(h.a)(o.a.mark((function t(e){var n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("this.status: ",a.status),"playing"===a.status){t.next=3;break}return t.abrupt("return");case 3:a.sound.keyboard.play(),n=a.data.findIndex((function(t){return t.select})),r=a.data.findIndex((function(t){return t.x===e.x&&t.y===e.y})),-1!=n?n===r?a.data=a.data.setIn([r,"select"],!1):(a.a2b(n,r),a.data=a.data.setIn([n,"select"],!1)):a.data=a.data.setIn([r,"select"],!0),a.update();case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),this.touchMove=function(){var t=Object(h.a)(o.a.mark((function t(e,n,r,s){var i,c;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("this.status: ",a.status),"playing"===a.status){t.next=3;break}return t.abrupt("return");case 3:i=a.data.findIndex((function(t){return t.x===e&&t.y===n})),c=a.data.findIndex((function(t){return t.x===r&&t.y===s})),a.a2b(i,c),a.update();case 7:case"end":return t.stop()}}),t)})));return function(e,n,a,r){return t.apply(this,arguments)}}(),this.maxX=e,this.maxY=n}return Object(R.a)(t,[{key:"start",value:function(){this.status="playing",this.score=0,this.combo=1,this.time=3e6,this.data=Object(Y.a)(function(t,e){for(var n=[],a=0;a<t;a++)for(var r=0;r<e;r++){var s=O();n.push({id:g(),x:a,y:r,animal:s,select:!1})}return n}(this.maxX,this.maxY)),this.onDataChange(this.data),this.onScoreChange(this.score),this.onTimeChange(this.time),this.checkStatus(),this.timeLoop()}},{key:"getRemoveList",value:function(t){var e={x:"y",y:"x"},n={x:this.maxX,y:this.maxY};function a(t,a,r){var s,i=0,c=0,u=[];function o(e){var n,s,i;return"x"===r&&(n=e,s=a),"y"===r&&(n=a,s=e),i=t.findIndex((function(t){return t.x===n&&t.y===s})),{x:n,y:s,idx:i}}return function h(){var d=function(n){return t.find((function(t){return t[r]===n&&t[e[r]]===a}))}(c);if(d){if(s||(s=d),m()(s,"animal")!==m()(d,"animal")){if(c-1-i>1)for(var l=i;l<=c-1;l++)u.push(o(l));i=c}if(c!==n[r]-1)return c<n[r]-1?(c+=1,s=d,void h()):void 0;if(c-i>1)for(var f=i;f<=c;f++)u.push(o(f))}else s=null}(),u}for(var r=[],s=0;s<this.maxY;s++)r.push(a(t,s,"x"));for(var i=0;i<this.maxX;i++)r.push(a(t,i,"y"));var c=U()(r);return r=E()(c,(function(t){return t.idx}))}},{key:"setRemoveStatus",value:function(t,e){var n=this.data;return t.map((function(t){var a=t.idx;n=n.setIn([a,"status"],e)})),n}},{key:"setRemovePosition",value:function(t){var e=this.data,n={};return t.map((function(t){var a=t.idx,r=t.x;t.y;void 0===n[r]?n[r]=-1:n[r]=n[r]-1,e=e.setIn([a,"y"],n[r]).setIn([a,"animal"],O())})),e}},{key:"getDownList",value:function(){for(var t=this,e=this.data,n=function(n){for(var a=0,r=function(r){var s=t.data.findIndex((function(t){return t.x===n&&t.y===r}));-1!==s&&(e=e.setIn([s,"y"],a),a++)},s=-t.maxY;s<t.maxY;s++)r(s)},a=0;a<this.maxX;a++)n(a);this.data=e}},{key:"a2b",value:function(t,e){var n=this.data.getIn([t,"x"]),a=this.data.getIn([t,"y"]),r=this.data.getIn([e,"x"]),s=this.data.getIn([e,"y"]);if(Math.abs(n-r)+Math.abs(a-s)==1){var i=this.data.setIn([t,"x"],r).setIn([t,"y"],s).setIn([e,"x"],n).setIn([e,"y"],a),c=this.getRemoveList(i);c.length>0&&(this.data=i,this.remove(c))}}},{key:"remove",value:function(){var t=Object(h.a)(o.a.mark((function t(e){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.sound.d1.play(),this.score=this.score+e.length*this.combo*100,this.onScoreChange(this.score),this.time=this.time+2e3,this.time>3e4&&(this.time=3e4),this.onTimeChange(this.time),this.data=this.setRemoveStatus(e,"removing"),this.update(),t.next=10,y(1e3);case 10:return this.data=this.setRemoveStatus(e,"removed"),this.update(),t.next=14,y(30);case 14:return this.data=this.setRemovePosition(e),this.update(),t.next=18,y(30);case 18:return this.data=this.setRemoveStatus(e,"ok"),this.update(),t.next=22,y(30);case 22:return this.getDownList(),this.update(),t.next=26,y(300);case 26:this.checkStatus();case 27:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"checkStatus",value:function(){var t=Object(h.a)(o.a.mark((function t(){var e;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("end"!==this.status){t.next=2;break}return t.abrupt("return");case 2:if(0!==(e=this.getRemoveList(this.data)).length){t.next=7;break}return this.combo=1,this.status="playing",t.abrupt("return");case 7:return this.status="moving",this.combo=this.combo+1,t.next=11,this.remove(e);case 11:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),t}(),B=(n(163),n(164),new A(9,9)),G=function(){var t=Object(r.useState)(null),e=Object(d.a)(t,2),n=e[0],s=e[1],i=Object(r.useState)(0),c=Object(d.a)(i,2),u=c[0],l=c[1],m=Object(r.useState)(0),f=Object(d.a)(m,2),v=f[0],b=f[1],g=Object(r.useState)(0),y=Object(d.a)(g,2),O=y[0],w=y[1];function S(t){return j.a.fire({title:"Submit Your \nScore:  "+t,input:"text",imageUrl:"./images/cat.svg",imageWidth:120,imageHeight:120,inputAttributes:{autocapitalize:"off",placeholder:"nickname",required:!0},showCancelButton:!0,confirmButtonText:"\u63d0\u4ea4",cancelButtonText:"\u5c31\u4e0d",showLoaderOnConfirm:!0})}function I(t){return C.apply(this,arguments)}function C(){return(C=Object(h.a)(o.a.mark((function t(e){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k(e);case 2:j.a.fire({title:"Game Over\uff01\nScore: "+e,imageUrl:"./images/cat.svg",imageWidth:120,imageHeight:120,confirmButtonText:"\u597d\u7684!"});case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function N(){return L.apply(this,arguments)}function L(){return(L=Object(h.a)(o.a.mark((function t(){var e,n,a,r,i=arguments;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=i.length>0&&void 0!==i[0]?i[0]:0,t.prev=1,n=p.a.User.current()){t.next=19;break}return t.next=6,S(e);case 6:if(a=t.sent,r=a.value,!a.isConfirmed){t.next=19;break}return n=new p.a.User,t.next=13,n.setUsername(r);case 13:return t.next=15,n.setPassword("test123");case 15:return t.next=17,n.set("nickname",r);case 17:return t.next=19,n.signUp();case 19:return t.next=21,I(e);case 21:s(null),t.next=27;break;case 24:t.prev=24,t.t0=t.catch(1),console.log("err:",t.t0);case 27:return t.abrupt("return");case 28:case"end":return t.stop()}}),t,null,[[1,24]])})))).apply(this,arguments)}return Object(r.useEffect)((function(){function t(t){t.preventDefault()}return w(document.querySelector(".root").offsetWidth/9),document.body.addEventListener("touchmove",t,!1),document.body.style.position="fixed",document.body.style.width="100%",function(){document.body.removeEventListener("touchmove",t,{passive:!1}),document.body.style.position="initial",document.body.style.width="auto"}}),[]),Object(a.jsx)("div",{className:"root",children:n?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"header",children:[Object(a.jsxs)("h1",{children:["Score: ",u]}),Object(a.jsxs)("h1",{children:["Time: ",v/1e3]})]}),Object(a.jsx)("div",{className:"list",onTouchEnd:function(t){t.preventDefault(),console.log(t);var e=t.changedTouches[0].target,n=parseInt(e.getAttribute("data-x"),0),a=parseInt(e.getAttribute("data-y"),0),r=t.changedTouches[0].pageX,s=t.changedTouches[0].pageY,i=document.querySelector(".list").getBoundingClientRect(),c=i.x,u=i.y,o=Math.floor((r-c)/O),h=Math.floor((s-u)/O);function d(t,e){return t>e?e+1:t<e?e-1:e}B.touchMove(n,a,d(o,n),d(h,a))},style:{paddingTop:"100%"},children:n.map((function(t){return Object(a.jsx)("div",{onClick:function(){var e;e=t,B.click(e)},className:x()(["item",{select:t.select,removed:"removed"===t.status,removing:"removing"===t.status}]),style:{width:O,height:O,transform:"translate3d("+t.x*O+"px,"+t.y*O+"px,0)"},children:Object(a.jsx)("div",{"data-x":t.x,"data-y":t.y,className:x()(["icon","animate__animated",{animate__tada:"removing"===t.status}]),style:{width:O-6,height:O-6,backgroundImage:"url(./images/"+t.animal+".svg)"}},t.id)},t.id)}))})]}):Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{children:Object(a.jsx)(T,{})}),Object(a.jsx)("div",{className:"start",onClick:function(){B.init({onDataChange:s,onScoreChange:l,onTimeChange:b,onGameOver:N})},children:"START"})]})})};var P=function(){return Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(G,{})}),Object(a.jsx)("div",{})]})},W=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,166)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,s=e.getLCP,i=e.getTTFB;n(t),a(t),r(t),s(t),i(t)}))};c.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(P,{})}),document.getElementById("root")),W()},65:function(t,e,n){},66:function(t,e,n){},98:function(t,e,n){}},[[165,1,2]]]);
//# sourceMappingURL=main.9d08f601.chunk.js.map