"use strict";(self.webpackChunksocial_network=self.webpackChunksocial_network||[]).push([[209],{2209:function(n,e,r){r.r(e),r.d(e,{default:function(){return w}});var s=r(9439),t=r(168),a=r(2791),i=r(9434),o=r(6444),l=r(3181);var d,c,x,u,p,h,g,f=r.p+"static/media/send.d78ac548aada037be4bb7e6fafa300f7.svg",m=r(184),v=o.ZP.div(d||(d=(0,t.Z)(["\n   margin: 10px;\n"]))),j=o.ZP.h1(c||(c=(0,t.Z)(["\n   font-size: 32px;\n   color: #886DF5;\n   font-weight: 600;\n   text-align: center;\n   margin-bottom: 20px;\n"]))),b=o.ZP.div(x||(x=(0,t.Z)(["\n   padding: 30px;\n   border: 5px solid #B7A8F5;\n   box-shadow: 0px 0px 24px 4px #B7A8F5;\n   border-radius: 33px;\n"]))),w=function(){return(0,m.jsxs)(v,{children:[(0,m.jsx)(j,{children:"ChatPage"}),(0,m.jsx)(b,{children:(0,m.jsx)(Z,{})})]})},Z=function(){var n=(0,i.I0)(),e=(0,i.v9)((function(n){return n.chat.status}));return(0,a.useEffect)((function(){return n((0,l.WE)()),function(){n((0,l.R7)())}}),[]),(0,m.jsxs)("div",{children:["error"===e&&(0,m.jsx)("div",{children:"Some errror occured. Please, refresh the page"}),(0,m.jsx)(F,{}),(0,m.jsx)(y,{})]})},k=o.ZP.div(u||(u=(0,t.Z)(["\n   height: 400px;\n   overflow: auto;\n"]))),F=function(){var n=(0,i.v9)((function(n){return n.chat.messages})),e=(0,a.useRef)(null),r=(0,a.useState)(!0),t=(0,s.Z)(r,2),o=t[0],l=t[1];return(0,a.useEffect)((function(){var n;o&&(null===(n=e.current)||void 0===n||n.scrollIntoView({behavior:"smooth"}))}),[n,o]),(0,m.jsxs)(k,{onScroll:function(n){var e=n.currentTarget;Math.abs(e.scrollHeight-e.scrollTop-e.clientHeight)<300?!o&&l(!0):o&&l(!1)},children:[n.map((function(n,e){return(0,m.jsx)(N,{message:n},e)})),(0,m.jsx)("div",{ref:e})]})},A=o.ZP.div(p||(p=(0,t.Z)(["\n   display: flex;\n   justify-content: ",";\n   gap: 20px;\n   background-color: #B7A8F5;\n   border-radius: 30px;\n   padding: 10px 20px;\n   overflow: scroll;\n   &:not(:last-child){\n      margin-bottom: 10px;\n   }\n   .message-image{\n      width: 50px;\n      border-radius: 50%;\n   }\n   .fullName{\n      font-size: 18px;\n      font-weight: 700;\n      margin-bottom: 5px;\n   }\n"])),(function(n){return n.messageAlign})),N=function(n){var e=n.message,r=(0,i.v9)((function(n){return n.auth.userId}));return(0,m.jsx)(A,{messageAlign:e.userId===r?"flex-end":"flex-start",children:e.userId!==r?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{children:(0,m.jsx)("img",{src:e.photo||"https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png",alt:"",className:"message-image"})}),(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{className:"fullName",style:{textAlign:"left"},children:e.userName}),(0,m.jsx)("div",{children:e.message})]})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{className:"fullName",style:{textAlign:"right"},children:e.userName}),(0,m.jsx)("div",{children:e.message})]}),(0,m.jsx)("div",{children:(0,m.jsx)("img",{src:e.photo||"https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png",alt:"",className:"message-image"})})]})})},E=o.ZP.div(h||(h=(0,t.Z)(["\n   .sendMessage-textarea{\n      display: block;\n      min-height: 80px;\n      padding: 15px 130px 15px 15px;\n      color: #E3E3E3;\n      font-weight: 600;\n      width: 100%;\n      font-size: 20px;\n      resize: vertical;\n      background-color:#8000FF;\n      border-radius: 0px 30px 30px 30px;\n      margin-bottom: 10px;\n   }\n   .sendMessage-textarea::placeholder {\n      color: #E3E3E3;\n   }\n   .sendMessage-textarea:focus {\n      border: 1px solid #B7A8F5;\n   }\n"]))),P=o.ZP.button(g||(g=(0,t.Z)(["\n   position: absolute;\n   right: 10px;\n   top: 10px;\n   background-color: #B7A8F5;\n   border-radius: 30px;\n   color: #fff;\n   font-size: 20px;\n   font-weight: 500;\n   padding: 5px 15px;\n   transition: all 0.3s linear;\n   &:hover{\n      box-shadow: 0px 0px 24px 4px #B7A8F5;\n   }\n"]))),y=function(){var n=(0,a.useState)(""),e=(0,s.Z)(n,2),r=e[0],t=e[1],o=(0,i.I0)(),d=(0,i.v9)((function(n){return n.chat.status}));return(0,m.jsx)(E,{children:(0,m.jsxs)("div",{style:{position:"relative",width:"30vw"},children:[(0,m.jsx)("textarea",{onChange:function(n){return t(n.currentTarget.value)},value:r,className:"sendMessage-textarea",placeholder:"Send message . . ."}),(0,m.jsx)(P,{type:"submit",disabled:"ready"!==d,onClick:function(){r&&(o((0,l.bG)(r)),t(""))},children:(0,m.jsx)("img",{src:f,alt:""})})]})})}}}]);
//# sourceMappingURL=209.0ecea31c.chunk.js.map