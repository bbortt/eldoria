(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[745],{8840:function(e,t,n){Promise.resolve().then(n.bind(n,9275)),Promise.resolve().then(n.bind(n,6037)),Promise.resolve().then(n.bind(n,5608))},9275:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b},game:function(){return w}});var r=n(3102),i=n(244),s=n(1527),o=n(6678),a=n(1557),l=n(7922);let u=(e,t,n)=>{let r=e.x-Math.floor(t/2),i=e.x+Math.ceil(t/2),s=e.y-Math.floor(t/2),o=e.y+Math.ceil(t/2);return r<0&&(i-=r,r=0),i>n&&(r-=i-n,i=n),s<0&&(o-=s,s=0),o>n&&(s-=o-n,o=n),{startX:r,endX:i,startY:s,endY:o}},c=(e,t,n,r,i,s)=>{if(e.ctrlKey){e.preventDefault();let o=Math.min(Math.max(t+(e.deltaY>0?1:-1),i),s);if(o===t)return;let a=document.getElementById(p);if(!a)return;let l=a.getBoundingClientRect(),u=(e.clientX-l.left)/l.width,c=(e.clientY-l.top)/l.height,d=n.startX+Math.floor(u*t),f=n.startY+Math.floor(c*t),h=Math.round(d-(u-.5)*o),m=Math.round(f-(c-.5)*o);return h=Math.min(Math.max(Math.floor(o/2),h),r-Math.ceil(o/2)),m=Math.min(Math.max(Math.floor(o/2),m),r-Math.ceil(o/2)),{newGridSize:o,newCenterX:h,newCenterY:m}}},d=e=>{e.preventDefault()},f=e=>"(".concat(e.x,",").concat(e.y,")"),h=(e,t)=>{let{startX:n,endX:r,startY:s,endY:o}=e,a=t.cells.length,l=[];for(let e=s;e<o;e++)for(let s=n;s<r;s++)if(s>=0&&s<a&&e>=0&&e<a){let n=t.cells[e][s];l.push((0,i.jsx)("div",{style:{border:"1px solid",display:"flex",alignItems:"center",justifyContent:"center"},children:f(n)},"".concat(n.x,",").concat(n.y)))}return l};var m=n(7958),g=n.n(m);let p="game-grid",x=e=>{let{grid:t}=e,n=t.cells.length,[r,o]=(0,s.useState)({x:32,y:32}),[a,l]=(0,s.useState)(10),[f,m]=(0,s.useState)({startX:0,endX:10,startY:0,endY:10}),[x]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{var e;return null===(e=document.getElementById(p))||void 0===e||e.addEventListener("wheel",d,{passive:!1}),()=>{var e;null===(e=document.getElementById(p))||void 0===e||e.removeEventListener("wheel",d)}},[d]),(0,s.useEffect)(()=>m(u(r,a,n)),[r,a]),(0,i.jsx)("div",{className:g().gameGridContainer,children:(0,i.jsx)("div",{id:p,className:"".concat(g().gameGrid," ").concat(x?"cursor-grabbing":"cursor-grab"),onWheel:e=>{let t=c(e,a,f,n,4,12);t&&(l(t.newGridSize),o({x:t.newCenterX,y:t.newCenterY}))},style:{display:"grid",gridTemplateColumns:"repeat(".concat(a,", 1fr)")},children:h(f,t)})})};var y=n(4216),M=n.n(y);let w=(0,r.KU)({game:r.o2,board:e=>{let{ctx:t,G:n,moves:r}=e,[u,c]=(0,s.useState)(null);return((0,s.useEffect)(()=>{c((0,a.kI)())},[]),(0,s.useEffect)(()=>{u&&r.initGame&&r.initGame(u)},[u]),(0,s.useEffect)(()=>{t.phase&&t.phase!==l.q&&(0,a.W2)()},[t.phase]),t.phase&&t.phase!==l.q)?(0,i.jsx)("div",{children:(0,i.jsx)(x,{grid:n.grid})}):(0,i.jsxs)("div",{className:M().main,children:[(0,i.jsx)(o.$jN,{color:"secondary"}),(0,i.jsx)("p",{className:"ml-2",children:"Game is Loading, hang on a second..."})]})}});var b=w},1557:function(e,t,n){"use strict";n.d(t,{W2:function(){return o},kI:function(){return s},vr:function(){return i}});let r=Object.freeze("eldoria-configuration"),i=e=>{localStorage.setItem(r,JSON.stringify(e))},s=()=>{let e=localStorage.getItem(r);if(e)try{return JSON.parse(e)}catch(e){console.error("Failed to parse stored configuration:",e)}return null},o=()=>{localStorage.removeItem(r)}},6037:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return i}});let r=n(468);function i(e){let{reason:t,children:n}=e;if("undefined"==typeof window)throw new r.BailoutToCSRError(t);return n}},5608:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadCss",{enumerable:!0,get:function(){return s}});let r=n(244),i=n(8515);function s(e){let{moduleIds:t}=e;if("undefined"!=typeof window)return null;let n=(0,i.getExpectedRequestStore)("next/dynamic css"),s=[];if(n.reactLoadableManifest&&t){let e=n.reactLoadableManifest;for(let n of t){if(!e[n])continue;let t=e[n].files.filter(e=>e.endsWith(".css"));s.push(...t)}}return 0===s.length?null:(0,r.jsx)(r.Fragment,{children:s.map(e=>(0,r.jsx)("link",{precedence:"dynamic",rel:"stylesheet",href:n.assetPrefix+"/_next/"+encodeURI(e),as:"style"},e))})}},3102:function(e,t,n){"use strict";n.d(t,{gY:function(){return f},zk:function(){return o},KU:function(){return m.K},gV:function(){return d},o2:function(){return s},e9:function(){return r},VH:function(){return c},mX:function(){return a},ue:function(){return h},_J:function(){return l},XG:function(){return u}});let r=6,i=()=>{let e=[];for(let t=0;t<64;t++){let n=[];for(let e=0;e<64;e++)n[e]={x:e,y:t};e.push(Object.freeze(n))}return{cells:Object.freeze(e)}},s={name:"fantasy-board-game",minPlayers:1,maxPlayers:1,setup:()=>({username:"",team:[],grid:i()}),validateSetupData:e=>{if(1!==e)return"Multiplayer is currently not supported!"},moves:{},turn:{minMoves:1,maxMoves:1},phases:{[n(7922).q]:{moves:{initGame:(e,t)=>{let{G:n}=e,{username:r,team:i}=t;n.username=r,n.team=i}},next:"phaseB",endIf:e=>{let{G:t}=e;return!!t.username},start:!0},phaseB:{}}};class o{constructor(e,t,n){this.name=e,this.race=t,this.specialization=n,this.strength=t.baseStrength+n.strengthMod,this.dexterity=t.baseDexterity+n.dexterityMod,this.constitution=t.baseConstitution+n.constitutionMod,this.intelligence=t.baseIntelligence+n.intelligenceMod,this.wisdom=t.baseWisdom+n.wisdomMod,this.charisma=t.baseCharisma+n.charismaMod,this.maxHP=100+n.hpBonus+5*this.constitution,this.ac=10+Math.floor(this.dexterity/2)-5+n.acBonus}}class a{constructor(e,t,n,r,i,s,o){this.label=e,this.baseStrength=t,this.baseDexterity=n,this.baseConstitution=r,this.baseIntelligence=i,this.baseWisdom=s,this.baseCharisma=o}}a.HUMAN=new a("Human",10,10,10,10,10,10),a.DWARF=new a("Dwarf",12,8,13,10,11,9),a.ELF=new a("Elf",8,12,9,12,11,11),a.HALFLING=new a("Halfling",8,13,10,10,11,12),a.GIANT=new a("Giant",14,6,13,7,10,8);class l{constructor(e,t,n,r,i,s,o,a,l){this.label=e,this.hpBonus=t,this.acBonus=n,this.strengthMod=r,this.dexterityMod=i,this.constitutionMod=s,this.intelligenceMod=o,this.wisdomMod=a,this.charismaMod=l}}l.TANK=new l("Tank",50,3,2,0,3,-1,1,0),l.WARRIOR=new l("Warrior",30,1,3,1,1,0,0,0),l.ASSASSIN=new l("Assassin",10,1,1,4,0,1,1,0),l.ARCHER=new l("Archer",20,0,1,3,0,1,2,0),l.MAGE=new l("Mage",0,0,-1,1,0,4,2,1),l.HEALER=new l("Healer",20,0,0,0,1,1,4,1),l.BUFFER=new l("Buffer",10,0,0,1,1,2,2,2);let u=new o("Thane",a.DWARF,l.TANK),c=new o("Nyssa",a.HUMAN,l.ASSASSIN),d=new o("Elyndor",a.DWARF,l.MAGE),f=new o("Brom",a.GIANT,l.WARRIOR),h=new o("Selene",a.ELF,l.HEALER);var m=n(458)},7922:function(e,t,n){"use strict";n.d(t,{q:function(){return r}});let r="init"},5038:function(e,t,n){"use strict";n.d(t,{a:function(){return o}});var r=n(244),i=n(1527),s=n(637);let o=(0,i.forwardRef)((e,t)=>{let{children:n,color:i="primary",type:o="button",...a}=e;return(0,r.jsx)(s.A,{color:i,ref:t,type:o,...a,children:n})});t.Z=o},4524:function(e,t,n){"use strict";n.d(t,{am:function(){return r.a},wQ:function(){return d}});var r=n(5038),i=n(244),s=n(5160),o=n(3158),a=n(6018),l=n(6523),u=n(6325),c=n.n(u);let d=e=>{let{ariaLabel:t,items:n,label:u,onSelectionChange:d}=e;return(0,i.jsxs)(s.F,{className:c().dropdown,children:[(0,i.jsx)(o.S,{children:(0,i.jsx)(r.Z,{className:"transition-transform",color:"secondary",children:u})}),(0,i.jsx)(a.a,{"aria-label":t,variant:"flat",disallowEmptySelection:!0,items:n,onSelectionChange:d,selectionMode:"single",children:e=>(0,i.jsx)(l.W,{color:"default",children:e.label},e.label)})]})}},6678:function(e,t,n){"use strict";n.d(t,{hE2:function(){return r.hE2},IIB:function(){return r.IIB},$jN:function(){return r.$jN}}),n(4524),n(3216),n(7160);var r=n(4992)},3216:function(e,t,n){"use strict";n.d(t,{M_:function(){return r.M_},u_:function(){return i.R},fe:function(){return s.I},hz:function(){return o.A},EA:function(){return r.EA}});var r=n(4211);n(4832);var i=n(7164),s=n(8651),o=n(413)},7160:function(e,t,n){"use strict";n.r(t),n.d(t,{AppUIProvider:function(){return o},NextThemeProvider:function(){return a}});var r=n(244),i=n(6380),s=n(4832);let o=e=>{let{children:t}=e;return(0,r.jsx)(i.w,{children:t})},a=e=>{let{children:t,themeProps:n}=e;return(0,r.jsx)(s.f,{defaultTheme:"system",themes:["light","dark","system"],forcedTheme:"light",...n,children:t})}},4216:function(e){e.exports={main:"board_main__092fm"}},7958:function(e){e.exports={gameGridContainer:"infinite-grid_gameGridContainer__Dw42M",gameGrid:"infinite-grid_gameGrid__OWNqN"}},6325:function(e){e.exports={dropdown:"dropdown-for-list-items_dropdown__grQjg"}}},function(e){e.O(0,[438,113,601,14,762,860,744],function(){return e(e.s=8840)}),_N_E=e.O()}]);