(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{51471:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,23945,23)),Promise.resolve().then(r.bind(r,67248))},28042:(e,t,r)=>{"use strict";r.d(t,{r:()=>n});let n=Object.freeze({initial:{height:0,opacity:0,y:50},animate:{height:"auto",opacity:1,y:0},exit:{height:0,opacity:0,y:-50}})},67248:(e,t,r)=>{"use strict";r.d(t,{default:()=>f});var n=r(5082),o=r(42772),i=r(2779),a=r(50240),l=r.n(a),u=r(55634),s=r(28042);let c=Object.freeze({initial:{opacity:0},animate:{opacity:1},exit:{opacity:0}}),f=()=>{let[e,t]=(0,u.useState)(!1);return(0,n.jsx)(i.Ny,{mode:"wait",children:e?(0,n.jsxs)(i.PY.div,{initial:"initial",animate:"animate",exit:"exit",className:"flex flex-col gap-y-2 items-center",transition:{duration:.3},variants:c,children:[(0,n.jsx)(i.PY.div,{transition:{delay:.1},variants:s.r,children:(0,n.jsx)(l(),{href:"/tutorial",children:(0,n.jsx)(o.Y0,{color:"secondary",children:"Start Tutorial"})})}),(0,n.jsx)(i.PY.div,{transition:{delay:.2},variants:s.r,children:(0,n.jsx)(l(),{href:"/configuration",children:(0,n.jsx)(o.Y0,{color:"secondary",children:"Configure Game"})})}),(0,n.jsx)(i.PY.div,{transition:{delay:.3},variants:s.r,children:(0,n.jsx)(o.Y0,{color:"warning",onPress:()=>t(!1),children:"Cancel"})})]},"start-game-options"):(0,n.jsxs)(i.PY.div,{initial:"initial",animate:"animate",exit:"exit",className:"flex flex-col gap-y-2 items-center",transition:{duration:.3},variants:c,children:[(0,n.jsx)(i.PY.div,{transition:{delay:.1},variants:s.r,children:(0,n.jsx)(o.Y0,{color:"secondary",onPress:()=>t(!0),children:"Start Game"})}),(0,n.jsx)(i.PY.div,{transition:{delay:.2},variants:s.r,children:(0,n.jsx)(o.Y0,{color:"secondary",children:"Load Game"})})]},"main-options")})}},50240:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return y}});let n=r(76639),o=r(5082),i=n._(r(55634)),a=r(11863),l=r(75801),u=r(71345),s=r(95964),c=r(22992),f=r(32381),d=r(55227);function p(e,t,r){"undefined"!=typeof window&&(async()=>e.prefetch(t,r))().catch(e=>{})}function h(e){return"string"==typeof e?e:(0,a.formatUrl)(e)}r(94384);let y=i.default.forwardRef(function(e,t){let r,n;let{href:a,as:y,children:m,prefetch:g=null,passHref:b,replace:j,shallow:v,scroll:x,onClick:_,onMouseEnter:P,onTouchStart:E,legacyBehavior:O=!1,...w}=e;r=m,O&&("string"==typeof r||"number"==typeof r)&&(r=(0,o.jsx)("a",{children:r}));let C=i.default.useContext(l.AppRouterContext),M=!1!==g,k=null===g?s.PrefetchKind.AUTO:s.PrefetchKind.FULL,{href:N,as:S}=i.default.useMemo(()=>{let e=h(a);return{href:e,as:y?h(y):e}},[a,y]),I=i.default.useRef(N),T=i.default.useRef(S);O&&(n=i.default.Children.only(r));let R=O?n&&"object"==typeof n&&n.ref:t,[A,Y,U]=(0,u.useIntersection)({rootMargin:"200px"}),F=i.default.useCallback(e=>{(T.current!==S||I.current!==N)&&(U(),T.current=S,I.current=N),A(e)},[S,N,U,A]),L=(0,c.useMergedRef)(F,R);i.default.useEffect(()=>{C&&Y&&M&&p(C,N,{kind:k})},[S,N,Y,M,C,k]);let q={ref:L,onClick(e){O||"function"!=typeof _||_(e),O&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),C&&!e.defaultPrevented&&function(e,t,r,n,o,a,l){let{nodeName:u}=e.currentTarget;"A"===u.toUpperCase()&&function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||(e.preventDefault(),i.default.startTransition(()=>{let e=null==l||l;"beforePopState"in t?t[o?"replace":"push"](r,n,{shallow:a,scroll:e}):t[o?"replace":"push"](n||r,{scroll:e})}))}(e,C,N,S,j,v,x)},onMouseEnter(e){O||"function"!=typeof P||P(e),O&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),C&&M&&p(C,N,{kind:k})},onTouchStart:function(e){O||"function"!=typeof E||E(e),O&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),C&&M&&p(C,N,{kind:k})}};return(0,f.isAbsoluteUrl)(S)?q.href=S:O&&!b&&("a"!==n.type||"href"in n.props)||(q.href=(0,d.addBasePath)(S)),O?i.default.cloneElement(n,q):(0,o.jsx)("a",{...w,...q,children:r})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},71480:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{cancelIdleCallback:function(){return n},requestIdleCallback:function(){return r}});let r="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},n="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},71345:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return u}});let n=r(55634),o=r(71480),i="function"==typeof IntersectionObserver,a=new Map,l=[];function u(e){let{rootRef:t,rootMargin:r,disabled:u}=e,s=u||!i,[c,f]=(0,n.useState)(!1),d=(0,n.useRef)(null),p=(0,n.useCallback)(e=>{d.current=e},[]);return(0,n.useEffect)(()=>{if(i){if(s||c)return;let e=d.current;if(e&&e.tagName)return function(e,t,r){let{id:n,observer:o,elements:i}=function(e){let t;let r={root:e.root||null,margin:e.rootMargin||""},n=l.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=a.get(n)))return t;let o=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:o},l.push(r),a.set(r,t),t}(r);return i.set(e,t),o.observe(e),function(){if(i.delete(e),o.unobserve(e),0===i.size){o.disconnect(),a.delete(n);let e=l.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&l.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:r})}else if(!c){let e=(0,o.requestIdleCallback)(()=>f(!0));return()=>(0,o.cancelIdleCallback)(e)}},[s,r,t,c,d.current]),[p,c,(0,n.useCallback)(()=>{f(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},22992:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=r(55634);function o(e,t){let r=(0,n.useRef)(()=>{}),o=(0,n.useRef)(()=>{});return(0,n.useMemo)(()=>e&&t?n=>{null===n?(r.current(),o.current()):(r.current=i(e,n),o.current=i(t,n))}:e||t,[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},11863:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{formatUrl:function(){return i},formatWithValidation:function(){return l},urlObjectKeys:function(){return a}});let n=r(96284)._(r(19893)),o=/https?|ftp|gopher|file/;function i(e){let{auth:t,hostname:r}=e,i=e.protocol||"",a=e.pathname||"",l=e.hash||"",u=e.query||"",s=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?s=t+e.host:r&&(s=t+(~r.indexOf(":")?"["+r+"]":r),e.port&&(s+=":"+e.port)),u&&"object"==typeof u&&(u=String(n.urlQueryToSearchParams(u)));let c=e.search||u&&"?"+u||"";return i&&!i.endsWith(":")&&(i+=":"),e.slashes||(!i||o.test(i))&&!1!==s?(s="//"+(s||""),a&&"/"!==a[0]&&(a="/"+a)):s||(s=""),l&&"#"!==l[0]&&(l="#"+l),c&&"?"!==c[0]&&(c="?"+c),""+i+s+(a=a.replace(/[?#]/g,encodeURIComponent))+(c=c.replace("#","%23"))+l}let a=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function l(e){return i(e)}},19893:(e,t)=>{"use strict";function r(e){let t={};return e.forEach((e,r)=>{void 0===t[r]?t[r]=e:Array.isArray(t[r])?t[r].push(e):t[r]=[t[r],e]}),t}function n(e){return"string"!=typeof e&&("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function o(e){let t=new URLSearchParams;return Object.entries(e).forEach(e=>{let[r,o]=e;Array.isArray(o)?o.forEach(e=>t.append(r,n(e))):t.set(r,n(o))}),t}function i(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return r.forEach(t=>{Array.from(t.keys()).forEach(t=>e.delete(t)),t.forEach((t,r)=>e.append(r,t))}),e}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{assign:function(){return i},searchParamsToUrlQuery:function(){return r},urlQueryToSearchParams:function(){return o}})},32381:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{DecodeError:function(){return h},MiddlewareNotFoundError:function(){return b},MissingStaticPage:function(){return g},NormalizeError:function(){return y},PageNotFoundError:function(){return m},SP:function(){return d},ST:function(){return p},WEB_VITALS:function(){return r},execOnce:function(){return n},getDisplayName:function(){return u},getLocationOrigin:function(){return a},getURL:function(){return l},isAbsoluteUrl:function(){return i},isResSent:function(){return s},loadGetInitialProps:function(){return f},normalizeRepeatedSlashes:function(){return c},stringifyError:function(){return j}});let r=["CLS","FCP","FID","INP","LCP","TTFB"];function n(e){let t,r=!1;return function(){for(var n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];return r||(r=!0,t=e(...o)),t}}let o=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,i=e=>o.test(e);function a(){let{protocol:e,hostname:t,port:r}=window.location;return e+"//"+t+(r?":"+r:"")}function l(){let{href:e}=window.location,t=a();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function s(e){return e.finished||e.headersSent}function c(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?"?"+t.slice(1).join("?"):"")}async function f(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await f(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&s(r))return n;if(!n)throw Error('"'+u(e)+'.getInitialProps()" should resolve to an object. But found "'+n+'" instead.');return n}let d="undefined"!=typeof performance,p=d&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class h extends Error{}class y extends Error{}class m extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message="Cannot find module for page: "+e}}class g extends Error{constructor(e,t){super(),this.message="Failed to load static file for page: "+e+" "+t}}class b extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function j(e){return JSON.stringify({message:e.message,stack:e.stack})}},42772:(e,t,r)=>{"use strict";r.d(t,{Y0:()=>i,o3:()=>d});var n=r(5082),o=r(46397);let i=(0,r(55634).forwardRef)((e,t)=>{let{children:r,color:i="primary",type:a="button",...l}=e;return(0,n.jsx)(o.T,{color:i,ref:t,type:a,...l,children:r})});i.displayName="DefaultButton";var a=r(26561),l=r(4833),u=r(87064),s=r(6785),c=r(3902),f=r.n(c);let d=e=>{let{ariaLabel:t,items:r,label:o,onSelectionChange:c}=e;return(0,n.jsxs)(a.A,{className:f().dropdown,children:[(0,n.jsx)(l.b,{children:(0,n.jsx)(i,{className:"transition-transform",color:"secondary",children:o})}),(0,n.jsx)(u.y,{"aria-label":t,variant:"flat",disallowEmptySelection:!0,items:r,onSelectionChange:c,selectionMode:"single",children:e=>(0,n.jsx)(s.Y,{color:"default",children:e.label},e.label)})]})}},2779:(e,t,r)=>{"use strict";r.d(t,{Ny:()=>n.Ny,PY:()=>n.PY});var n=r(3710);r(67846)},23945:e=>{e.exports={container:"page_container__jZF7q",header:"page_header__oRW75",title:"page_title__po7na",main:"page_main__nw1Wk"}},3902:e=>{e.exports={dropdown:"dropdown-for-list-items_dropdown__grQjg"}}},e=>{var t=t=>e(e.s=t);e.O(0,[276,355,790,486,923,358],()=>t(51471)),_N_E=e.O()}]);