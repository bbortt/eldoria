(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[745],{7110:function(e,t,n){Promise.resolve().then(n.bind(n,2376)),Promise.resolve().then(n.bind(n,5528)),Promise.resolve().then(n.bind(n,7578))},2376:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c},game:function(){return u}});var i=n(5412),r=n(3942),s=n(1322),o=n(3106),a=n(8420);let u=(0,i.KU)({game:i.o2,board:e=>{let{ctx:t,moves:n}=e,[i,u]=(0,s.useState)(null);return(0,s.useEffect)(()=>{u((0,o.kI)())},[]),(0,s.useEffect)(()=>{i&&n.initGame&&n.initGame(i)},[i]),(0,s.useEffect)(()=>{t.phase&&t.phase!==a.q&&(0,o.W2)()},[t.phase]),(0,r.jsx)(r.Fragment,{})}});var c=u},3106:function(e,t,n){"use strict";n.d(t,{W2:function(){return o},kI:function(){return s},vr:function(){return r}});let i=Object.freeze("eldoria-configuration"),r=e=>{localStorage.setItem(i,JSON.stringify(e))},s=()=>{let e=localStorage.getItem(i);if(e)try{return JSON.parse(e)}catch(e){console.error("Failed to parse stored configuration:",e)}return null},o=()=>{localStorage.removeItem(i)}},5528:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return r}});let i=n(3132);function r(e){let{reason:t,children:n}=e;if("undefined"==typeof window)throw new i.BailoutToCSRError(t);return n}},7578:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadCss",{enumerable:!0,get:function(){return s}});let i=n(3942),r=n(2116);function s(e){let{moduleIds:t}=e;if("undefined"!=typeof window)return null;let n=(0,r.getExpectedRequestStore)("next/dynamic css"),s=[];if(n.reactLoadableManifest&&t){let e=n.reactLoadableManifest;for(let n of t){if(!e[n])continue;let t=e[n].files.filter(e=>e.endsWith(".css"));s.push(...t)}}return 0===s.length?null:(0,i.jsx)(i.Fragment,{children:s.map(e=>(0,i.jsx)("link",{precedence:"dynamic",rel:"stylesheet",href:n.assetPrefix+"/_next/"+encodeURI(e),as:"style"},e))})}},5412:function(e,t,n){"use strict";n.d(t,{gY:function(){return l},zk:function(){return r},KU:function(){return h.K},gV:function(){return c},o2:function(){return i},VH:function(){return u},mX:function(){return s},ue:function(){return f},_J:function(){return o},XG:function(){return a}});let i={name:"fantasy-board-game",minPlayers:1,maxPlayers:1,setup:e=>({username:"",team:[]}),validateSetupData:e=>{if(1!==e)return"Mulitplayer is currently not supported!"},moves:{},turn:{minMoves:1,maxMoves:1},phases:{[n(8420).q]:{moves:{initGame:(e,t)=>{let{G:n}=e,{username:i,team:r}=t;n.username=i,n.team=r}},next:"phaseB",endIf:e=>{let{G:t}=e;return!!t.username},start:!0},phaseB:{}}};class r{constructor(e,t,n){this.name=e,this.race=t,this.specialization=n,this.strength=t.baseStrength+n.strengthMod,this.dexterity=t.baseDexterity+n.dexterityMod,this.constitution=t.baseConstitution+n.constitutionMod,this.intelligence=t.baseIntelligence+n.intelligenceMod,this.wisdom=t.baseWisdom+n.wisdomMod,this.charisma=t.baseCharisma+n.charismaMod,this.maxHP=100+n.hpBonus+5*this.constitution,this.ac=10+Math.floor(this.dexterity/2)-5+n.acBonus}}class s{constructor(e,t,n,i,r,s,o){this.label=e,this.baseStrength=t,this.baseDexterity=n,this.baseConstitution=i,this.baseIntelligence=r,this.baseWisdom=s,this.baseCharisma=o}}s.HUMAN=new s("Human",10,10,10,10,10,10),s.DWARF=new s("Dwarf",12,8,13,10,11,9),s.ELF=new s("Elf",8,12,9,12,11,11),s.HALFLING=new s("Halfling",8,13,10,10,11,12),s.GIANT=new s("Giant",14,6,13,7,10,8);class o{constructor(e,t,n,i,r,s,o,a,u){this.label=e,this.hpBonus=t,this.acBonus=n,this.strengthMod=i,this.dexterityMod=r,this.constitutionMod=s,this.intelligenceMod=o,this.wisdomMod=a,this.charismaMod=u}}o.TANK=new o("Tank",50,3,2,0,3,-1,1,0),o.WARRIOR=new o("Warrior",30,1,3,1,1,0,0,0),o.ASSASSIN=new o("Assassin",10,1,1,4,0,1,1,0),o.ARCHER=new o("Archer",20,0,1,3,0,1,2,0),o.MAGE=new o("Mage",0,0,-1,1,0,4,2,1),o.HEALER=new o("Healer",20,0,0,0,1,1,4,1),o.BUFFER=new o("Buffer",10,0,0,1,1,2,2,2);let a=new r("Thane",s.DWARF,o.TANK),u=new r("Nyssa",s.HUMAN,o.ASSASSIN),c=new r("Elyndor",s.DWARF,o.MAGE),l=new r("Brom",s.GIANT,o.WARRIOR),f=new r("Selene",s.ELF,o.HEALER);var h=n(5558)},8420:function(e,t,n){"use strict";n.d(t,{q:function(){return i}});let i="init"}},function(e){e.O(0,[558,645,73,744],function(){return e(e.s=7110)}),_N_E=e.O()}]);