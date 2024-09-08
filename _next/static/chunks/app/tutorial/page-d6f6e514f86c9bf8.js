(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[105],{4651:function(e,t,n){Promise.resolve().then(n.bind(n,4453))},4453:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var a=n(6007),o=n(9256);class s{constructor(e,t,n){this.name=e,this.race=t,this.specialization=n,this.strength=t.baseStrength+n.strengthMod,this.dexterity=t.baseDexterity+n.dexterityMod,this.constitution=t.baseConstitution+n.constitutionMod,this.intelligence=t.baseIntelligence+n.intelligenceMod,this.wisdom=t.baseWisdom+n.wisdomMod,this.charisma=t.baseCharisma+n.charismaMod,this.maxHP=100+n.hpBonus+5*this.constitution,this.ac=10+Math.floor(this.dexterity/2)-5+n.acBonus}}class i{constructor(e,t,n,a,o,s){this.baseStrength=e,this.baseDexterity=t,this.baseConstitution=n,this.baseIntelligence=a,this.baseWisdom=o,this.baseCharisma=s}}i.HUMAN=new i(10,10,10,10,10,10),i.DWARF=new i(12,8,13,10,11,9),i.ELF=new i(8,12,9,12,11,11),i.HALFLING=new i(8,13,10,10,11,12),i.GIANT=new i(14,6,13,7,10,8);class r{constructor(e,t,n,a,o,s,i,r){this.hpBonus=e,this.acBonus=t,this.strengthMod=n,this.dexterityMod=a,this.constitutionMod=o,this.intelligenceMod=s,this.wisdomMod=i,this.charismaMod=r}}r.TANK=new r(50,3,2,0,3,-1,1,0),r.WARRIOR=new r(30,1,3,1,1,0,0,0),r.ASSASSIN=new r(10,1,1,4,0,1,1,0),r.ARCHER=new r(20,0,1,3,0,1,2,0),r.MAGE=new r(0,0,-1,1,0,4,2,1),r.HEALER=new r(20,0,0,0,1,1,4,1),r.BUFFER=new r(10,0,0,1,1,2,2,2);let h=new s("Thane",i.DWARF,r.TANK),l=new s("Nyssa",i.HUMAN,r.ASSASSIN);new s("Elyndor",i.DWARF,r.MAGE),new s("Brom",i.HUMAN,r.WARRIOR),new s("Selene",i.ELF,r.HEALER);var u=n(6209),c=n(9992),d=n(4311),f=n.n(d);let g={0:{text:"Beneath the cloak of predawn's embrace, a figure moves with the quiet promise of youth, skirting the edges of Eldoria's grandeur.\n    The city, a tapestry of towering aspirations and hushed marketplaces, slumbers under a shroud of uneasy silence, its heartbeats muffled by whispers of shadows yet unseen.",backgroundImage:"/tutorial/1.png"},1:{text:"This is your story, etched in the fervor of dreams too vast for the confines of cobblestone realities.\n    Armed with naught but the raw edge of daring and a spark of cunning, you stand at the precipice of fate, drawn inexorably to the one haven where chaos births legends: the veiled sanctum of the Thieves' Guild of Eldoria.",backgroundImage:"/tutorial/2.png"},2:{text:"Yet, the Guild's embrace is not for the faint of heart, for its thresholds are guarded by riddles and trials, known only to those whose courage outshines the glint of steel in the moonlight.\n    A trial awaits in the arena, an ancient dance of destiny where the threads of future are woven or severed.",backgroundImage:"/tutorial/3.png"},3:{text:'With dawn\'s first whisper, the city\'s ancient bones are cast in a tapestry of shadows, and it is here you find yourself, before a gateway shrouded in secrecy, its whispers laden with promise and peril alike.\n    Your heart, a drum of war and wonder, echoes the tumultuous cadence of the coming storm.\n    "Step forth, child of the shadows," intones a voice, as ethereal as the morning mist, "for the fate of Eldoria is a tapestry in flux, and you seek to claim your thread amongst its hues.\n    Prove your mettle, let the Guild be your crucible, your sanctuary, your kin. Falter, and fade into the annals of the forgotten, another wraith in the city\'s endless lament."\n    Drawing a breath that tastes of destiny, you cross the threshold, the gates behind you whispering tales of those who walked this path before.\n    Herein lies your odyssey, in the heart of Eldoria, where shadows sing secrets and every choice forges the path of your legacy.',backgroundImage:"/tutorial/4.png"},4:{text:'"What name shall the echoes of these halls whisper, young aspirant?" the shadows inquire, a prelude to the saga awaiting your breath.'},5:{text:"So be it, {0}. The crucible of your tale ignites this very moment. May your wit be as swift as the wind, your resolve as steadfast as the deep roots of Eldoria.\n    With the resolve of a thousand whispered vows, you step forth into the arena, its gates sealing with the finality of fate's own decree...\n    It stretches before you, an expanse of dust and echoes, bound by ancient stone and the weight of countless stories.\n    Torches flicker in their sconces, casting a wavering glow upon the figures gathered within, each a potential ally or adversary in the crucible that awaits.\n    You know that you must prove your worth to the Guild by facing different encounters in the future. Each figure you meet can become a valuable ally, or a fierce opponent.\n    The more allies you gather, the easier your journey will be after this trial. However, you may choose to walk this path alone, should you seek the challenge.",backgroundImage:"/tutorial/5.png"},6:{text:'Unexpectedly, a figure steps forward and the firelight dances across a weathered face, etched with lines deeper than any canyon.\n    A shock of beard, the color of storm clouds, frames eyes that gleam like molten gold.\n    Though his stature is impressive, a hint of something low-slung lurks beneath his heavy cloak.\n    "They call me Thane," his voice rumbles, a tremor in the earth itself.\n    "Will you stand with me, or will we test the weight of each other\'s steel?"',backgroundImage:"/characters/encounter-0.png",character:h},7:{text:'Without warning, a shadow detaches itself from the periphery, coalescing into a lithe, hooded form.\n    "Call me Nyssa," she whispers, a dagger spinning lazily in her fingers.\n    "The shadows are my domain. Together, we could dance through danger unseen. What say you?"',backgroundImage:"/characters/encounter-1.png",character:l},8:{text:'In a small a bulge to the side, you find an elder man in the shadows, draped in flowing robes that seem to swallow the faint light.\n    No weapon hangs at his hip, no glint of steel betrays his purpose.\n    Yet, his eyes burn with an intensity that speaks of power beyond the physical realm.\n    "I am Elyndor," his voice a smooth caress that sends shivers down your spine.\n    "Ally with me, and the very elements shall bow to our will. Or shall I test your resistance to the unknown?"',backgroundImage:"/characters/encounter-2.png"},9:{text:'Suddenly, a warrior encased in gleaming armor strides forward, his broad shoulders filling the space with an air of restrained power.\n    A dark hood obscures his features entirely, leaving only the glint of steel from his visor visible.\n    "They call me Brom," his voice booms, a low rumble that vibrates through the ground.\n    "Together, we could topple fortresses. But make no mistake, my kindness has limits. Choose your path wisely."',backgroundImage:"/characters/encounter-3.png"},10:{text:'As you step further into the arena, a woman of otherworldly grace emerges.\n    Her form, clad in light armor that seems almost an extension of nature itself, moves with a dancer\'s ease.\n    Pointed ears peek through her flowing hair, a whisper of ancient lineage.\n    "I am Selene," her voice lilts like a gentle breeze.\n    "Walk with me, and I can guide you through darkness and light. Or will you succumb to the shadows that cling to us all?"',backgroundImage:"/characters/encounter-4.png"},11:{text:"Congratulations, fledgling band of shadows.\n    You've weathered the whispers of doubt and forged a fragile pact beneath the watchful gaze of the Guild.\n    Remember, the path ahead is a tangled skein, woven with the threads of both triumph and tribulation.\n    Let your camaraderie be a shield against the coming storms, and may your cunning and courage illuminate the shadows that lurk in every corner.\n    This is your odyssey, etched in the annals of legend. Go forth, and claim your destiny with the unwavering spirit of Eldoria's heroes.",backgroundImage:"/characters/encounter-4.png"}};var m=()=>{let[e,t]=(0,o.useState)(0),[n,s]=(0,o.useState)(""),[i,r]=(0,o.useState)([]);if((0,o.useEffect)(()=>{n&&t(e=>e+1)},[n,i]),!Object.hasOwn(g,e))return null;let{text:h,backgroundImage:l,character:d}=g[e],m=()=>t(e=>e+1);return(0,a.jsx)(c.M_,{mode:"wait",children:(0,a.jsx)(c.EA.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},className:f().container,style:{backgroundImage:l?"url(".concat(l,")"):void 0},children:e<=3?(0,a.jsx)(u.yd,{continueFunction:m,text:h}):4===e?(0,a.jsx)(u.Qz,{continueFunction:s,text:h}):5===e?(0,a.jsx)(u.yd,{continueFunction:m,text:h.replace("{0}",n)}):e>=6&&e<=10?(0,a.jsx)(u.fe,{acceptFunction:()=>r([...i,d]),refuseFunction:m,text:h}):11===e?(0,a.jsx)(u.yd,{continueFunction:m,text:h}):null},e)})}},6209:function(e,t,n){"use strict";n.d(t,{am:function(){return h},fe:function(){return l},yd:function(){return u},Qz:function(){return g}});var a=n(6007),o=n(3822),s=n(9461),i=n.n(s),r=n(6990);let h=e=>{let{children:t,color:n="secondary",type:o="button",...s}=e;return(0,a.jsx)(r.A,{color:n,className:"text-primary",type:o,...s,children:t})},l=e=>{let{acceptFunction:t,refuseFunction:n,text:s}=e;return(0,a.jsxs)("footer",{className:i().footer,children:[(0,a.jsx)("p",{children:s}),(0,a.jsxs)(o.g,{children:[(0,a.jsx)(h,{onClick:t,children:"Accept"}),(0,a.jsx)(h,{onClick:n,color:"warning",children:"Refuse"})]})]})},u=e=>{let{continueFunction:t,text:n}=e;return(0,a.jsxs)("footer",{className:i().footer,children:[(0,a.jsx)("p",{children:n}),(0,a.jsx)("div",{children:(0,a.jsx)(h,{onClick:t,children:"Continue"})})]})};var c=n(9256),d=n(9115),f=n.n(d);let g=e=>{let{continueFunction:t,text:n}=e,[o,s]=(0,c.useState)(""),i=e=>{e.preventDefault(),t(o)};return(0,a.jsx)("div",{className:f().main,children:(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{children:(0,a.jsx)("p",{children:n})}),(0,a.jsx)("div",{className:f().flexBoxCenter,children:(0,a.jsx)("form",{onSubmit:e=>i(e),children:(0,a.jsxs)("div",{className:f().inputContainer,children:[(0,a.jsx)("input",{type:"text",placeholder:"Username","aria-label":"Username",value:o,onChange:e=>s(e.target.value)}),(0,a.jsx)(h,{type:"submit",children:"Continue"})]})})})]})})}},9992:function(e,t,n){"use strict";n.d(t,{M_:function(){return a.M_},EA:function(){return a.EA}});var a=n(1757);n(255)},4311:function(e){e.exports={container:"page_container__2P6f1"}},9115:function(e){e.exports={main:"text-with-input-and-confirm-button_main__N0qdC",flexBoxCenter:"text-with-input-and-confirm-button_flexBoxCenter__nRnWW",inputContainer:"text-with-input-and-confirm-button_inputContainer__O8_aR"}},9461:function(e){e.exports={footer:"tutorial_footer__knC_H"}}},function(e){e.O(0,[171,719,390,851,373,744],function(){return e(e.s=4651)}),_N_E=e.O()}]);