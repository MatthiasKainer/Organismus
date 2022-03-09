/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,t=Symbol(),o=new Map;class n{constructor(e,o){if(this._$cssResult$=!0,o!==t)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let t=o.get(this.cssText);return e&&void 0===t&&(o.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const i=(e,...o)=>{const i=1===e.length?e[0]:o.reduce(((t,o,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[n+1]),e[0]);return new n(i,t)},r=e?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let o="";for(const t of e.cssRules)o+=t.cssText;return(e=>new n("string"==typeof e?e:e+"",t))(o)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var s;const l=window.trustedTypes,a=l?l.emptyScript:"",c=window.reactiveElementPolyfillSupport,u={toAttribute(e,t){switch(t){case Boolean:e=e?a:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},d=(e,t)=>t!==e&&(t==t||e==e),h={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:d};class f extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;null!==(t=this.l)&&void 0!==t||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,o)=>{const n=this._$Eh(o,t);void 0!==n&&(this._$Eu.set(n,o),e.push(n))})),e}static createProperty(e,t=h){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const o="symbol"==typeof e?Symbol():"__"+e,n=this.getPropertyDescriptor(e,o,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,o){return{get(){return this[t]},set(n){const i=this[e];this[t]=n,this.requestUpdate(e,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||h}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const o of t)this.createProperty(o,e[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eh(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(e=this.constructor.l)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,o;(null!==(t=this._$Eg)&&void 0!==t?t:this._$Eg=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(o=e.hostConnected)||void 0===o||o.call(e))}removeController(e){var t;null===(t=this._$Eg)||void 0===t||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])}))}createRenderRoot(){var t;const o=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{e?t.adoptedStyleSheets=o.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):o.forEach((e=>{const o=document.createElement("style"),n=window.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,t.appendChild(o)}))})(o,this.constructor.elementStyles),o}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ES(e,t,o=h){var n,i;const r=this.constructor._$Eh(e,o);if(void 0!==r&&!0===o.reflect){const s=(null!==(i=null===(n=o.converter)||void 0===n?void 0:n.toAttribute)&&void 0!==i?i:u.toAttribute)(t,o.type);this._$Ei=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Ei=null}}_$AK(e,t){var o,n,i;const r=this.constructor,s=r._$Eu.get(e);if(void 0!==s&&this._$Ei!==s){const e=r.getPropertyOptions(s),l=e.converter,a=null!==(i=null!==(n=null===(o=l)||void 0===o?void 0:o.fromAttribute)&&void 0!==n?n:"function"==typeof l?l:null)&&void 0!==i?i:u.fromAttribute;this._$Ei=s,this[s]=a(t,e.type),this._$Ei=null}}requestUpdate(e,t,o){let n=!0;void 0!==e&&(((o=o||this.constructor.getPropertyOptions(e)).hasChanged||d)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===o.reflect&&this._$Ei!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,o))):n=!1),!this.isUpdatePending&&n&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((e,t)=>this[t]=e)),this._$Et=void 0);let t=!1;const o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(o)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(o)}willUpdate(e){}_$AE(e){var t;null===(t=this._$Eg)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$ES(t,this[t],e))),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var v;f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:f}),(null!==(s=globalThis.reactiveElementVersions)&&void 0!==s?s:globalThis.reactiveElementVersions=[]).push("1.3.0");const p=globalThis.trustedTypes,m=p?p.createPolicy("lit-html",{createHTML:e=>e}):void 0,b=`lit$${(Math.random()+"").slice(9)}$`,g="?"+b,y=`<${g}>`,w=document,$=(e="")=>w.createComment(e),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,j=Array.isArray,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,_=/>/g,x=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,E=/'/g,A=/"/g,C=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...o)=>({_$litType$:e,strings:t,values:o}))(1),T=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),R=new WeakMap,H=w.createTreeWalker(w,129,null,!1);class M{constructor({strings:e,_$litType$:t},o){let n;this.parts=[];let i=0,r=0;const s=e.length-1,l=this.parts,[a,c]=((e,t)=>{const o=e.length-1,n=[];let i,r=2===t?"<svg>":"",s=S;for(let t=0;t<o;t++){const o=e[t];let l,a,c=-1,u=0;for(;u<o.length&&(s.lastIndex=u,a=s.exec(o),null!==a);)u=s.lastIndex,s===S?"!--"===a[1]?s=k:void 0!==a[1]?s=_:void 0!==a[2]?(C.test(a[2])&&(i=RegExp("</"+a[2],"g")),s=x):void 0!==a[3]&&(s=x):s===x?">"===a[0]?(s=null!=i?i:S,c=-1):void 0===a[1]?c=-2:(c=s.lastIndex-a[2].length,l=a[1],s=void 0===a[3]?x:'"'===a[3]?A:E):s===A||s===E?s=x:s===k||s===_?s=S:(s=x,i=void 0);const d=s===x&&e[t+1].startsWith("/>")?" ":"";r+=s===S?o+y:c>=0?(n.push(l),o.slice(0,c)+"$lit$"+o.slice(c)+b+d):o+b+(-2===c?(n.push(void 0),t):d)}const l=r+(e[o]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==m?m.createHTML(l):l,n]})(e,t);if(this.el=M.createElement(a,o),H.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(n=H.nextNode())&&l.length<s;){if(1===n.nodeType){if(n.hasAttributes()){const e=[];for(const t of n.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(b)){const o=c[r++];if(e.push(t),void 0!==o){const e=n.getAttribute(o.toLowerCase()+"$lit$").split(b),t=/([.?@])?(.*)/.exec(o);l.push({type:1,index:i,name:t[2],strings:e,ctor:"."===t[1]?D:"?"===t[1]?L:"@"===t[1]?J:V})}else l.push({type:6,index:i})}for(const t of e)n.removeAttribute(t)}if(C.test(n.tagName)){const e=n.textContent.split(b),t=e.length-1;if(t>0){n.textContent=p?p.emptyScript:"";for(let o=0;o<t;o++)n.append(e[o],$()),H.nextNode(),l.push({type:2,index:++i});n.append(e[t],$())}}}else if(8===n.nodeType)if(n.data===g)l.push({type:2,index:i});else{let e=-1;for(;-1!==(e=n.data.indexOf(b,e+1));)l.push({type:7,index:i}),e+=b.length-1}i++}}static createElement(e,t){const o=w.createElement("template");return o.innerHTML=e,o}}function I(e,t,o=e,n){var i,r,s,l;if(t===T)return t;let a=void 0!==n?null===(i=o._$Cl)||void 0===i?void 0:i[n]:o._$Cu;const c=O(t)?void 0:t._$litDirective$;return(null==a?void 0:a.constructor)!==c&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===c?a=void 0:(a=new c(e),a._$AT(e,o,n)),void 0!==n?(null!==(s=(l=o)._$Cl)&&void 0!==s?s:l._$Cl=[])[n]=a:o._$Cu=a),void 0!==a&&(t=I(e,a._$AS(e,t.values),a,n)),t}class U{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:o},parts:n}=this._$AD,i=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:w).importNode(o,!0);H.currentNode=i;let r=H.nextNode(),s=0,l=0,a=n[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new P(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new W(r,this,e)),this.v.push(t),a=n[++l]}s!==(null==a?void 0:a.index)&&(r=H.nextNode(),s++)}return i}m(e){let t=0;for(const o of this.v)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class P{constructor(e,t,o,n){var i;this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=n,this._$Cg=null===(i=null==n?void 0:n.isConnected)||void 0===i||i}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),O(e)?e===N||null==e||""===e?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==T&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.k(e):(e=>{var t;return j(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])})(e)?this.S(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==N&&O(this._$AH)?this._$AA.nextSibling.data=e:this.k(w.createTextNode(e)),this._$AH=e}T(e){var t;const{values:o,_$litType$:n}=e,i="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=M.createElement(n.h,this.options)),n);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===i)this._$AH.m(o);else{const e=new U(i,this),t=e.p(this.options);e.m(o),this.k(t),this._$AH=e}}_$AC(e){let t=R.get(e.strings);return void 0===t&&R.set(e.strings,t=new M(e)),t}S(e){j(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,n=0;for(const i of e)n===t.length?t.push(o=new P(this.A($()),this.A($()),this,this.options)):o=t[n],o._$AI(i),n++;n<t.length&&(this._$AR(o&&o._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var o;for(null===(o=this._$AP)||void 0===o||o.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cg=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class V{constructor(e,t,o,n,i){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=N}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,o,n){const i=this.strings;let r=!1;if(void 0===i)e=I(this,e,t,0),r=!O(e)||e!==this._$AH&&e!==T,r&&(this._$AH=e);else{const n=e;let s,l;for(e=i[0],s=0;s<i.length-1;s++)l=I(this,n[o+s],t,s),l===T&&(l=this._$AH[s]),r||(r=!O(l)||l!==this._$AH[s]),l===N?e=N:e!==N&&(e+=(null!=l?l:"")+i[s+1]),this._$AH[s]=l}r&&!n&&this.C(e)}C(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class D extends V{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===N?void 0:e}}const B=p?p.emptyScript:"";class L extends V{constructor(){super(...arguments),this.type=4}C(e){e&&e!==N?this.element.setAttribute(this.name,B):this.element.removeAttribute(this.name)}}class J extends V{constructor(e,t,o,n,i){super(e,t,o,n,i),this.type=5}_$AI(e,t=this){var o;if((e=null!==(o=I(this,e,t,0))&&void 0!==o?o:N)===T)return;const n=this._$AH,i=e===N&&n!==N||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==N&&(n===N||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,o;"function"==typeof this._$AH?this._$AH.call(null!==(o=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==o?o:this.element,e):this._$AH.handleEvent(e)}}class W{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}}const F=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var z,Z;null==F||F(M,P),(null!==(v=globalThis.litHtmlVersions)&&void 0!==v?v:globalThis.litHtmlVersions=[]).push("2.2.0");class G extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const o=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=o.firstChild),o}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=((e,t,o)=>{var n,i;const r=null!==(n=null==o?void 0:o.renderBefore)&&void 0!==n?n:t;let s=r._$litPart$;if(void 0===s){const e=null!==(i=null==o?void 0:o.renderBefore)&&void 0!==i?i:null;r._$litPart$=s=new P(t.insertBefore($(),e),e,void 0,null!=o?o:{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!1)}render(){return T}}G.finalized=!0,G._$litElement$=!0,null===(z=globalThis.litElementHydrateSupport)||void 0===z||z.call(globalThis,{LitElement:G});const K=globalThis.litElementPolyfillSupport;function Y(e,[t,o]){return t.toLowerCase()!==t?e[t]=Object.assign(Object.assign({},o),{attribute:t.replace(/[A-Z]/g,"-$&").toLowerCase()}):e[t]=o,e}function Q(e){return"boolean"==typeof e?{type:Boolean}:Array.isArray(e)?{type:Array}:"object"==typeof e?{type:Object}:{}}null==K||K({LitElement:G}),(null!==(Z=globalThis.litElementVersions)&&void 0!==Z?Z:globalThis.litElementVersions=[]).push("3.2.0");const X=e=>(e=>void 0!==e&&void 0!==e.props)(e)?(e.props||[]).reduce(((e,t)=>(Object.entries(t).forEach((t=>e=Y(e,t))),e)),{}):(e=>{return t=e||{},Object.entries(t).reduce(((e,[t,o])=>Y(e,[t,Q(o)])),{});var t})(null==e?void 0:e.defaults),ee={},te=(e,t,o)=>{if(ee[e])return ee[e];customElements.define(e,class extends G{constructor(){super(),this.content=q``,(e=>void 0!==e&&void 0!==e.defaults)(o)&&Object.entries(o.defaults).forEach((([e,t])=>{this[e]=t}))}static get properties(){return X(o)}static get styles(){return null==o?void 0:o.styles}async performUpdate(){return this.content=await Promise.resolve(t(this)).catch((e=>q`<slot name="error">${e}</slot>`)),super.performUpdate()}render(){return this.content}});const n=document.createElement(e);return ee[e]=n,n};var oe="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},ne={},ie={},re={};Object.defineProperty(re,"t",{value:!0}),re.shallowClone=void 0,re.shallowClone=function(e){return"object"!=typeof e||!e||e instanceof Date||e instanceof RegExp?e:Array.isArray(e)?[...e]:Object.assign({},e)};var se={};function le(e){if(!e.dispatchEvent||!e.requestUpdate)throw new Error("Element missing required functions (dispatchEvent/requestUpdate)");return e}Object.defineProperty(se,"t",{value:!0}),se.withWorkflow=se.withReducer=se.withState=se.decorate=se.asUpdateableLitElement=void 0,se.asUpdateableLitElement=le;const ae="__registered_states";function ce(e){const t=e;if(t[ae])return t;const o=le(e),n=o.updated;return t[ae]={index:0,count:0,states:[],reducers:[],workflows:[]},o.updated=e=>(t[ae].index=0,n(e)),t}se.decorate=ce,se.withState=function(e,t,o={}){const n=ce(e),{index:i,count:r}=n[ae];return i===r?(n[ae].index++,n[ae].count++,n[ae].states.push(t),t):(n[ae].index++,o.updateDefault&&n[ae].states[i].inject(t.get()),n[ae].states[i])},se.withReducer=function(e,t){const o=ce(e),{index:n,count:i,reducers:r}=o[ae];return n!==i||r[n-1]?o[ae].reducers[n-1]:(o[ae].reducers[n-1]=t,t)},se.withWorkflow=function(e,t){const o=ce(e),{index:n,count:i,workflows:r}=o[ae];return n!==i||r[n-1]?o[ae].workflows[n-1]:(o[ae].workflows[n-1]=t,t)};var ue=oe&&oe.o||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function s(e){try{a(n.next(e))}catch(e){r(e)}}function l(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(ie,"t",{value:!0}),ie.useState=void 0;const de=re,he=se;ie.useState=(e,t,o={})=>{let n=(0,de.shallowClone)(t);const i=[()=>ue(void 0,void 0,void 0,(function*(){return e.requestUpdate(),yield e.updateComplete}))],r=e=>ue(void 0,void 0,void 0,(function*(){n!==e&&(n=(0,de.shallowClone)(e),yield Promise.all(i.map((e=>e(n)))))}));return(0,he.withState)(e,new class{set value(e){r(e)}get value(){return n}publish(e){r(e)}set(e){return ue(this,void 0,void 0,(function*(){yield r(e)}))}subscribe(e){i.push(e)}inject(e){n=e}get(){return n}getState(){return n}},o)};var fe={},ve=oe&&oe.o||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function s(e){try{a(n.next(e))}catch(e){r(e)}}function l(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(fe,"t",{value:!0}),fe.useReducer=void 0;const pe=ie,me=se;fe.useReducer=(e,t,o,n={})=>{const{get:i,set:r}=(0,pe.useState)(e,o,n),s=[],l=(o,l)=>ve(void 0,void 0,void 0,(function*(){const a=t(i());return a[o]&&(yield r(yield a[o](l)),s.forEach((e=>e(o,i()))),n.dispatchEvent&&e.dispatchEvent(new CustomEvent(o,{detail:i()}))),i()}));return(0,me.withReducer)(e,{get:i,subscribe:e=>s.push(e),when:(e,t)=>s.push(((o,n)=>o===e&&t(n))),set:l,dispatch:l})};var be={},ge=oe&&oe.o||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function s(e){try{a(n.next(e))}catch(e){r(e)}}function l(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(be,"t",{value:!0}),be.useWorkflow=void 0;const ye=ne,we=se;be.useWorkflow=(e,t)=>{const o=Object.entries(t).reduce(((t,[o,{reducer:n,initialState:i}])=>(t[o]=(0,ye.useReducer)(e,n,i),t)),{}),n={},i={},r=[],s=e=>(r.push({type:"projections",args:[e]}),o[e]?o[e].get():void 0);return(0,we.withWorkflow)(e,{addActivity:(e,t)=>ge(void 0,void 0,void 0,(function*(){var i,s;r.push({type:"addActivity",args:[e,t]}),yield Promise.all(null!==(s=null===(i=n[e])||void 0===i?void 0:i.map((e=>e(t))))&&void 0!==s?s:[]);for(const n of Object.values(o))yield n.dispatch(e,t)})),addSideeffect:(e,t)=>{r.push({type:"addSideeffect",args:[e,t]}),n[e]=[...n[e]||[],t]},projections:s,addCompensation:(e,t)=>{r.push({type:"addCompensation",args:[e,t]}),i[e]=[...i[e]||[],t]},compensate:()=>ge(void 0,void 0,void 0,(function*(){r.push({type:"compensate",args:[]});for(const[e,t]of Object.entries(i))for(const n of t)for(const t of Object.values(o))yield t.dispatch(e,n)})),after:(e,t,o)=>{r.push({type:"after",args:[e,t,o]});const n=()=>ge(void 0,void 0,void 0,(function*(){r.some((e=>((e,t)=>{if(e.type!==t.type)return!1;for(let o=0;o<t.args.length;o++)if(e.args[o]!==t.args[o])return!1;return!0})(e,t)))||(new Date(Date.now())>e?yield o():setTimeout(n,100))}));n()},plan:e=>ge(void 0,void 0,void 0,(function*(){for(const[o,n]of Object.entries(e))if(t[o]&&JSON.stringify(s(o))===JSON.stringify(t[o].initialState))return yield n();return e[""]?yield e[""]():Promise.resolve(null)})),history:()=>[...r]})},function(e){Object.defineProperty(e,"t",{value:!0}),e.useWorkflow=e.useReducer=e.useState=void 0;var t=ie;Object.defineProperty(e,"useState",{enumerable:!0,get:function(){return t.useState}});var o=fe;Object.defineProperty(e,"useReducer",{enumerable:!0,get:function(){return o.useReducer}});var n=be;Object.defineProperty(e,"useWorkflow",{enumerable:!0,get:function(){return n.useWorkflow}})}(ne);var $e={},Oe={},je={};function Se(e){if(!e.dispatchEvent||!e.requestUpdate)throw new Error("Element missing required functions (dispatchEvent/requestUpdate)");return e}Object.defineProperty(je,"t",{value:!0}),je.withEffect=je.decorate=je.asUpdateableLitElement=void 0,je.asUpdateableLitElement=Se;const ke="__registered_effects";function _e(e){const t=e;if(t[ke])return t;const o=Se(e),n=o.updated;return t[ke]={index:0,count:0,effects:[]},o.updated=e=>(t[ke].index=0,n(e)),t}je.decorate=_e,je.withEffect=function(e,t){const o=_e(e),{index:n,count:i}=o[ke];return n===i?(o[ke].index++,o[ke].count++,o[ke].effects.push(t),t):(o[ke].index++,o[ke].effects[n])},Object.defineProperty(Oe,"t",{value:!0}),Oe.useOnce=Oe.useEffect=void 0;const xe=je;function Ee(e,t,o){const n=(0,xe.withEffect)(e,{on:t,observe:["__initial__dirty"]});n.observe.some(((e,t)=>o[t]!==e))&&n.on(),n.observe=o}Oe.useEffect=Ee,Oe.useOnce=(e,t)=>Ee(e,t,[]),function(e){Object.defineProperty(e,"t",{value:!0}),e.useOnce=e.useEffect=void 0;var t=Oe;Object.defineProperty(e,"useEffect",{enumerable:!0,get:function(){return t.useEffect}}),Object.defineProperty(e,"useOnce",{enumerable:!0,get:function(){return t.useOnce}})}($e);const Ae={};var Ce;!function(e){e[e.SILENT=0]="SILENT",e[e.ERROR=1]="ERROR",e[e.INFO=80]="INFO",e[e.DEBUG=90]="DEBUG",e[e.TRACE=100]="TRACE"}(Ce||(Ce={}));let qe=Ce.SILENT;let Te=[];const Ne=(e,t,...o)=>{Te.forEach((n=>n(Ce.ERROR,e,t,...o))),qe>=Ce.ERROR&&console.error(t,e,...o)},Re=(e,t,...o)=>{if(Te.forEach((n=>n(Ce.INFO,e,t,...o))),qe>=Ce.INFO){(qe===Ce.TRACE?console.trace:console.log)(t,e,...o)}},He=(e,t,...o)=>{if(Te.forEach((n=>n(Ce.DEBUG,e,t,...o))),qe>=Ce.DEBUG){(qe===Ce.TRACE?console.trace:console.log)(t,e,...o)}},Me={queue:{},list:{}};function Ie(e){return e.reduce(((e,t)=>`${e};${t.name};`),"")}const Ue=new class{constructor(){this.actionDictionary={}}on(e,t){if(Array.isArray(e)){const o=Ie(e);if(Me.list[o])throw Ne("Hypothalamus.on",new Error("Cannot register the same list of hormones twice"),o),new Error("Cannot register the same list of hormones twice");Re("[Hypothalamus.on] Adding new action when all in a list of hormones are released",o,e),Me.list[o]={hormones:[...e],callback:t}}else Re("Hypothalamus.on","Adding new action when a hormone is released",e.name),this.actionDictionary[e.name]=this.actionDictionary[e.name]||[],this.actionDictionary[e.name].push(t)}drop(e){Array.isArray(e)?(He("Hypothalamus.drop","Dropping a list of hormones",Ie(e),e),delete Me.queue[Ie(e)],delete Me.list[Ie(e)]):(He("Hypothalamus.drop","Dropping a hormone",e.name),this.actionDictionary[e.name]=[])}dropAll(){He("Hypothalamus.dropAll","Dropping all hormones"),this.actionDictionary={},Me.queue={},Me.list={}}collect(e,t,o){const n=`collect;;${e.name};${t.name};`;if(Me.list[n])throw Ne("Hypothalamus.collect",new Error("Cannot register the same list of hormones twice"),n),new Error("Cannot register the same list of hormones twice");Re("[Hypothalamus.collect] Adding new action when collected hormones are released",n,e,t),Me.list[n]={hormones:[t],callback:o}}orchestrate(e,t){this.actionDictionary[e.name]&&this.actionDictionary[e.name].forEach((e=>e(t)));const o=Object.keys(Me.queue).filter((t=>t.includes(`;${e.name};`))),n=Object.keys(Me.list).filter((t=>t.indexOf(`;${e.name};`)>-1&&o.every((e=>e!==t))));n.forEach((e=>{Me.queue[e]={hormones:[...Me.list[e].hormones],values:{},callback:Me.list[e].callback}}));const i=[...new Set([...o,...n])];for(let o=0;o<i.length;o++){const n=i[o];if(n.startsWith("collect;;")){const[o]=n.replace("collect;;","").split(";");e.name===o?Me.queue[n].values[e.name]=[...Me.queue[n].values[e.name]||[],t]:(Me.queue[n].values[e.name]=t,Me.queue[n].callback(Me.queue[n].values),delete Me.queue[n])}else Me.queue[n].hormones=Me.queue[n].hormones.filter((t=>t.name!==e.name)),Me.queue[n].values[e.name]=t,Me.queue[n].hormones.length<1&&(Me.queue[n].callback(Me.queue[n].values),delete Me.queue[n])}}};function Pe(e,t={}){return De(e,Object.assign(Object.assign({},t),{readOnce:!0}))}function Ve(e,t={}){return Be(Ae)(e,Object.assign(Object.assign({},t),{loadIfExists:!0}))}function De(e,t={}){return Be(Ae)(e,t)}const Be=e=>(t,o={})=>{if(e[t]&&!o.loadIfExists)throw Ne("hormone.defineHormone",new Error("Hormone already created"),t),new Error("Hormone already created");if(e[t]&&o.loadIfExists)return He("hormone.defineHormone","Hormone already created, reusing existing",t),{name:t};const{defaultValue:n,transformation:i,readOnce:r}=o;return e[t]={name:t,value:n,defaultValue:n,transformation:i,receptors:[],readOnce:null!=r&&r},{name:t}};async function Le(e,t){return Je(Ae)(e,t)}const Je=e=>async(t,o)=>{if(!t)throw Ne("hormone.releaseHormone",new Error("Hormone cannot be undefined")),new Error("Hormone cannot be undefined");const{name:n}=t;if(!e[n])throw Ne("hormone.releaseHormone",new Error("Hormone does not exist"),n),new Error("Hormone does not exist");var i;i=o,e[n].value=(void 0===i||i instanceof Function)&&o?o(e[n].value):o,Re("hormone.releaseHormone","Releasing passed hormone",n,e[n].value);const{receptors:r,transformation:s}=e[n];s&&s(e[n].value);const l=e[n].value;return Ue.orchestrate({name:n},l),await Promise.all(r.filter((e=>{const t=void 0===e.onlyIf||e.onlyIf(l);return He("hormone.releaseHormone",t?"Keeping receptor because condition matched or no condition":"Filtered receptor from the triggers because condition not matched",e),t})).map((e=>(null==e?void 0:e.onTriggered)?null==e?void 0:e.onTriggered(l):l))),e[n].readOnce&&(He("hormone.releaseHormone","Resetting hormone because it is readOnce",n),e[n].value=e[n].defaultValue),Object.assign({},e[n])};function We(e,{name:t},o,n){return Fe(Ae)(e,{name:t},o,n)}const Fe=e=>(t,{name:o},n,i)=>{const r=null!=i?i:n,s=i?n:void 0;if(!e[o])throw Ne("receptor.useReceptor",new Error("Hormone is not defined"),o),new Error(`Hormone "${o}" is not defined`);((e,t,o,n)=>{const i=(null==n?void 0:n.toString())||o;return!e[o].receptors.some((e=>e.parent===t&&e.key===i))})(e,t,o,s)?(Re("receptor.useReceptor","Pushing new receptor to hormone",o,{parent:t}),e[o].receptors.push({key:(null==s?void 0:s.toString())||o,parent:t,onlyIf:s,onTriggered:r}),void 0!==e[o].value?r(e[o].value):void 0!==e[o].defaultValue&&r(e[o].defaultValue)):((e,t,...o)=>{Te.forEach((n=>n(Ce.TRACE,e,t,...o))),qe===Ce.TRACE&&console.trace(t,e,...o)})("receptor.useReceptor","Receptor not pushed because already subscribed",o,{parent:t})};var ze="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function Ze(e,t,o){return e(o={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&o.path)}},o.exports),o.exports}var Ge=Ze((function(e,t){Object.defineProperty(t,"i",{value:!0}),t.shallowClone=void 0,t.shallowClone=function(e){return"object"!=typeof e||!e||e instanceof Date||e instanceof RegExp?e:Array.isArray(e)?[...e]:Object.assign({},e)}})),Ke=Ze((function(e,t){function o(e){if(!e.dispatchEvent||!e.requestUpdate)throw new Error("Element missing required functions (dispatchEvent/requestUpdate)");return e}Object.defineProperty(t,"i",{value:!0}),t.withWorkflow=t.withReducer=t.withState=t.decorate=t.asUpdateableLitElement=void 0,t.asUpdateableLitElement=o;const n="__registered_states";function i(e){const t=e;if(t[n])return t;const i=o(e),r=i.updated;return t[n]={index:0,count:0,states:[],reducers:[],workflows:[]},i.updated=e=>(t[n].index=0,r(e)),t}t.decorate=i,t.withState=function(e,t,o={}){const r=i(e),{index:s,count:l}=r[n];return s===l?(r[n].index++,r[n].count++,r[n].states.push(t),t):(r[n].index++,o.updateDefault&&r[n].states[s].inject(t.get()),r[n].states[s])},t.withReducer=function(e,t){const o=i(e),{index:r,count:s,reducers:l}=o[n];return r!==s||l[r-1]?o[n].reducers[r-1]:(o[n].reducers[r-1]=t,t)},t.withWorkflow=function(e,t){const o=i(e),{index:r,count:s,workflows:l}=o[n];return r!==s||l[r-1]?o[n].workflows[r-1]:(o[n].workflows[r-1]=t,t)}})),Ye=Ze((function(e,t){var o=ze&&ze.u||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function s(e){try{a(n.next(e))}catch(e){r(e)}}function l(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"i",{value:!0}),t.useState=void 0;t.useState=(e,t,n={})=>{let i=(0,Ge.shallowClone)(t);const r=[()=>o(void 0,void 0,void 0,(function*(){return e.requestUpdate(),yield e.updateComplete}))],s=e=>o(void 0,void 0,void 0,(function*(){i!==e&&(i=(0,Ge.shallowClone)(e),yield Promise.all(r.map((e=>e(i)))))}));return(0,Ke.withState)(e,new class{set value(e){s(e)}get value(){return i}publish(e){s(e)}set(e){return o(this,void 0,void 0,(function*(){yield s(e)}))}subscribe(e){r.push(e)}inject(e){i=e}get(){return i}getState(){return i}},n)}})),Qe=Ze((function(e,t){var o=ze&&ze.u||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function s(e){try{a(n.next(e))}catch(e){r(e)}}function l(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"i",{value:!0}),t.useReducer=void 0;t.useReducer=(e,t,n,i={})=>{const{get:r,set:s}=(0,Ye.useState)(e,n,i),l=[],a=(n,a)=>o(void 0,void 0,void 0,(function*(){const o=t(r());return o[n]&&(yield s(yield o[n](a)),l.forEach((e=>e(n,r()))),i.dispatchEvent&&e.dispatchEvent(new CustomEvent(n,{detail:r()}))),r()}));return(0,Ke.withReducer)(e,{get:r,subscribe:e=>l.push(e),when:(e,t)=>l.push(((o,n)=>o===e&&t(n))),set:a,dispatch:a})}})),Xe=tt,et=Ze((function(e,t){var o=ze&&ze.u||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function s(e){try{a(n.next(e))}catch(e){r(e)}}function l(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"i",{value:!0}),t.useWorkflow=void 0;t.useWorkflow=(e,t)=>{const n=Object.entries(t).reduce(((t,[o,{reducer:n,initialState:i}])=>(t[o]=(0,Xe.useReducer)(e,n,i),t)),{}),i={},r={},s=[],l=e=>(s.push({type:"projections",args:[e]}),n[e]?n[e].get():void 0);return(0,Ke.withWorkflow)(e,{addActivity:(e,t)=>o(void 0,void 0,void 0,(function*(){var o,r;s.push({type:"addActivity",args:[e,t]}),yield Promise.all(null!==(r=null===(o=i[e])||void 0===o?void 0:o.map((e=>e(t))))&&void 0!==r?r:[]);for(const o of Object.values(n))yield o.dispatch(e,t)})),addSideeffect:(e,t)=>{s.push({type:"addSideeffect",args:[e,t]}),i[e]=[...i[e]||[],t]},projections:l,addCompensation:(e,t)=>{s.push({type:"addCompensation",args:[e,t]}),r[e]=[...r[e]||[],t]},compensate:()=>o(void 0,void 0,void 0,(function*(){s.push({type:"compensate",args:[]});for(const[e,t]of Object.entries(r))for(const o of t)for(const t of Object.values(n))yield t.dispatch(e,o)})),after:(e,t,n)=>{s.push({type:"after",args:[e,t,n]});const i=()=>o(void 0,void 0,void 0,(function*(){s.some((e=>((e,t)=>{if(e.type!==t.type)return!1;for(let o=0;o<t.args.length;o++)if(e.args[o]!==t.args[o])return!1;return!0})(e,t)))||(new Date(Date.now())>e?yield n():setTimeout(i,100))}));i()},plan:e=>o(void 0,void 0,void 0,(function*(){for(const[o,n]of Object.entries(e))if(t[o]&&JSON.stringify(l(o))===JSON.stringify(t[o].initialState))return yield n();return e[""]?yield e[""]():Promise.resolve(null)})),history:()=>[...s]})}})),tt=Ze((function(e,t){Object.defineProperty(t,"i",{value:!0}),t.useWorkflow=t.useReducer=t.useState=void 0,Object.defineProperty(t,"useState",{enumerable:!0,get:function(){return Ye.useState}}),Object.defineProperty(t,"useReducer",{enumerable:!0,get:function(){return Qe.useReducer}}),Object.defineProperty(t,"useWorkflow",{enumerable:!0,get:function(){return et.useWorkflow}})}));const ot=i`
input, select, textarea, button{font-family:inherit;font-size: 1em;} button {cursor: pointer;}`,nt=De("simple-app/input-received");te("simple-app",(e=>{const t=tt.useState(e,"");return We(e,nt,(async e=>t.publish(e))),q` <div>
      <input
        type="text"
        @input="${e=>{var t;const o=null===(t=e.target)||void 0===t?void 0:t.value;Le(nt,o)}}"
        placeholder="Insert something"
      />
    </div>
    Receptor received: ${t.getState()}`}),{styles:ot});const it=De("two-form-app/input-received");te("two-form-app",(e=>{const t=tt.useState(e,void 0),o=tt.useState(e,void 0),n=tt.useState(e,void 0);return We(e,it,(e=>"form-1"===(null==e?void 0:e.form)),(async e=>t.publish(e))),We(e,it,(e=>"form-2"===(null==e?void 0:e.form)),(async e=>o.publish(e))),We(e,it,(async e=>n.publish(e))),q` <div>
      <input
        type="text"
        @input="${e=>{var t;const o=null===(t=e.target)||void 0===t?void 0:t.value;Le(it,{form:"form-1",value:o})}}"
        placeholder="Insert something"
      />
      Receptor form-1 received: ${JSON.stringify(t.getState())}
    </div>
    <div>
    <input
        type="text"
        @input="${e=>{var t;const o=null===(t=e.target)||void 0===t?void 0:t.value;Le(it,{form:"form-2",value:o})}}"
        placeholder="Insert something"
      />
      Receptor form-2 received: ${JSON.stringify(o.getState())}
    </div>
    Global receptor received: ${JSON.stringify(n.getState())}`}),{styles:ot}),De("atoms/form/submit",{defaultValue:"",readOnce:!0}),te("component-atom-buttom",(e=>q`<button @onclick=${()=>Le(e.release)}>
      <slot></slot>
    </button>`),{styles:ot}),te("component-button-list",(e=>{const t=tt.useState(e,"");return We(e,e.release,(async e=>t.publish(e))),q`<div>
      ${e.items.map((o=>q`<button
          class="${o===t.getState()?"active":""}"
          @click=${()=>Le(e.release,o)}
        >
          ${o}
        </button>`))}
    </div>`}),{defaults:{level:1,items:[],release:Ve("atoms/button-list/release")},styles:[ot,i`.active { background-color:var(--highlight-color); }`]});var rt=Ze((function(e,t){function o(e){if(!e.dispatchEvent||!e.requestUpdate)throw new Error("Element missing required functions (dispatchEvent/requestUpdate)");return e}Object.defineProperty(t,"i",{value:!0}),t.withEffect=t.decorate=t.asUpdateableLitElement=void 0,t.asUpdateableLitElement=o;const n="__registered_effects";function i(e){const t=e;if(t[n])return t;const i=o(e),r=i.updated;return t[n]={index:0,count:0,effects:[]},i.updated=e=>(t[n].index=0,r(e)),t}t.decorate=i,t.withEffect=function(e,t){const o=i(e),{index:r,count:s}=o[n];return r===s?(o[n].index++,o[n].count++,o[n].effects.push(t),t):(o[n].index++,o[n].effects[r])}})),st=Ze((function(e,t){function o(e,t,o){const n=(0,rt.withEffect)(e,{on:t,observe:["__initial__dirty"]});n.observe.some(((e,t)=>o[t]!==e))&&n.on(),n.observe=o}Object.defineProperty(t,"i",{value:!0}),t.useOnce=t.useEffect=void 0,t.useEffect=o;t.useOnce=(e,t)=>o(e,t,[])})),lt=Ze((function(e,t){Object.defineProperty(t,"i",{value:!0}),t.useOnce=t.useEffect=void 0,Object.defineProperty(t,"useEffect",{enumerable:!0,get:function(){return st.useEffect}}),Object.defineProperty(t,"useOnce",{enumerable:!0,get:function(){return st.useOnce}})}));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ct extends class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}{constructor(e){if(super(e),this.it=N,e.type!==at)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===N||null==e)return this.ft=void 0,this.it=e;if(e===T)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this.ft;this.it=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}ct.directiveName="unsafeHTML",ct.resultType=1;const ut=(e=>(...t)=>({_$litDirective$:e,values:t}))(ct);var dt;te("html-view",(e=>{const{getState:t,publish:o}=tt.useState(e,"");return lt.useOnce(e,(()=>{fetch(`${e.file}.html`).then((e=>e.text())).then((e=>o(e)))})),q`${ut(t())}`}),{defaults:{file:""},styles:i`
      :host {
        display: block;
        width: 100%;
      }
    `}),te("code-view",(e=>{const{getState:t,publish:o}=tt.useState(e,"");return lt.useOnce(e,(()=>{fetch(`${e.file}.html`).then((e=>e.text())).then((e=>o(e)))})),q`<pre>${e.file}</pre>
    ${ut(t())}`}),{defaults:{file:""},styles:i`
      :host {
        display: block;
        width: 100%;
      }
    `}),te("component-headline",(e=>{switch(e.level){case"1":return q`<h1><slot></slot></h1>`;case"2":return q`<h2><slot></slot></h2>`;case"3":return q`<h3><slot></slot></h3>`;case"4":return q`<h4><slot></slot></h4>`;default:return q`<h5><slot></slot></h5>`}}),{defaults:{level:"2"}}),function(e){e[e.OnType=0]="OnType",e[e.OnSubmit=1]="OnSubmit",e[e.OnEnter=2]="OnEnter",e[e.OnBlur=3]="OnBlur"}(dt||(dt={}));const ht=Ve("atoms/input/release"),ft=Ve("atoms/input/receptor"),vt=(e,t)=>Array.isArray(e)&&e.some((e=>e===t));async function pt(e,t){e.clear&&t("")}te("component-atom-input",(e=>{const t=tt.useState(e,"");!function(e,t){var o,n;if(!e.receptor)return;const i=null!==(o=e.form)&&void 0!==o?o:"",r=null!==(n=e.name)&&void 0!==n?n:"";We(e,e.receptor,(t=>(null==t?void 0:t.form)===e.form),(async()=>{vt(e.triggers,dt.OnSubmit)&&(Le(e.release,{name:r,value:t.getState(),form:i}),pt(e,t.publish))}))}(e,t);const{publish:o,getState:n}=t;return q`
      <input
        type="text"
        class="${e.isValid?"":"invalid"}"
        name="${e.name||"item"}"
        aria-label=${e.label}
        .value="${t.getState()}"
        @input="${t=>{var n;const i=null===(n=t.target)||void 0===n?void 0:n.value;o(i),vt(e.triggers,dt.OnType)&&Le(e.release,{name:e.name,value:i,form:e.form})}}"
        @keypress=${t=>{vt(e.triggers,dt.OnEnter)&&"Enter"===t.key&&(Le(e.release,{name:e.name,value:n(),form:e.form}),pt(e,o))}}
        placeholder="${e.placeholder||e.label}"
      />
    `}),{defaults:{name:"input",label:"input",placeholder:"insert value",clear:!1,isValid:!0,triggers:[dt.OnSubmit],form:void 0,release:ht,receptor:ft},styles:[ot,i`
    .invalid {
      border-color: var(--alert-color);
    }`]}),te("component-list",(e=>{var t;const o=tt.useState(e,{items:[]});return We(e,e.receptor,(t=>(null==t?void 0:t.form)===e.form),(async e=>o.publish(e))),q`<ul>
      ${null===(t=o.getState())||void 0===t?void 0:t.items.map((e=>q`<li>${e}</li>`))}
    </ul>`}),{defaults:{form:"",receptor:Ve("list")}}),te("component-toggle-panel",(e=>{const t=tt.useState(e,"");return We(e,e.receptor,(async e=>t.publish(e))),e.name===t.getState()?q`<slot></slot>`:q``}),{defaults:{name:"",receptor:Ve("panel")},styles:i`
        slot {
          display:block;
          padding-top: 4rem;
        }`});const mt=De("molecules/InputWithButton/submit",{readOnce:!0}),bt=De("molecules/InputWithButton/changed");te("molecule-input-with-button",(e=>{const{name:t,label:o,placeholder:n,clear:i,form:r}=e;return We(e,bt,(e=>r===e.form),(async t=>Le(e.release,t))),q`
      <component-atom-input
        name="${t}"
        label="${o}"
        placeholder="${n}"
        form="${null!=r?r:"form"}"
        .triggers=${[dt.OnEnter,dt.OnSubmit]}
        .clear=${i}
        .release=${bt}
        .receptor=${mt}
      ></component-atom-input>
      <button 
        form=${null!=r?r:"form"} 
        @click=${()=>Le(mt,{form:r})}>
        <slot></slot>
      </button>
    `}),{defaults:{name:"input",label:"input",placeholder:"insert value",clear:!1,form:"",triggers:[dt.OnSubmit],release:Ve("molecules/InputWithButton/release")},styles:ot}),te("molecule-input-with-label-and-validation",(e=>{const t=e.form||"form";return q`
      <label class="${e.isValid?"":"invalid"}">
        <div>${e.label}</div>
        <div>
          <component-atom-input
            form=${t}
            name="${e.name}"
            label="${e.label}"
            placeholder="${e.placeholder}"
            .triggers=${[dt.OnEnter,dt.OnType,dt.OnSubmit]}
            .isValid=${e.isValid}
            .clear=${e.clear}
            .release=${e.release}
            .receptor=${e.receptor}
          ></component-atom-input>
        </div>
      </label>
    `}),{styles:i`
      label {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      .invalid {
        color: var(--alert-color);
      }
    `,defaults:{name:"input",label:"input",placeholder:"insert value",clear:!1,isValid:!0,form:void 0,release:Ve("molecules/InputWithLabelAndValidation/release"),receptor:Ve("molecules/InputWithLabelAndValidation/receptor"),triggers:[dt.OnEnter,dt.OnType,dt.OnSubmit]}});const gt=De("todo/list",{defaultValue:{items:[]}}),yt=De("todo/add");Ue.on(yt,(e=>Le(gt,(t=>({items:[...t.items,e.value],form:e.form}))))),te("todo-app",(()=>q`
    <component-headline level="1">Your todo list</component-headline>
    <div>
      <molecule-input-with-button
        clear
        form="todo-list"
        label="add todo"
        placeholder="insert todo"
        .release=${yt}
      >
        Add todo
      </molecule-input-with-button>
    </div>
    <component-headline level="2">Your todos</component-headline>
    <div>
      <component-list form="todo-list" .receptor=${gt}></component-list>
    </div>
  `));const wt=De("search/query",{defaultValue:{value:"",form:void 0}}),$t=Pe("search/filtered",{defaultValue:{items:[]}}),Ot=(e,t)=>Object.entries(e).filter((([e])=>{var o;return e.toLowerCase().indexOf(null!==(o=null==t?void 0:t.toLowerCase())&&void 0!==o?o:"_")>-1})).map((([e,t])=>`${e}: ${t}`));Ue.on(wt,(({value:e,form:t})=>{fetch("colors.json").then((e=>e.json())).then((o=>Le($t,{items:Ot(o,e),form:t})))})),te("search-app",(()=>q`
    <component-headline level="1">Search for a color</component-headline>
    <div>
      <molecule-input-with-button
        form="search-colors"
        .release=${wt}
        label="search"
        placeholder="insert a color name"
      >
        Search
      </molecule-input-with-button>
    </div>
    <component-headline level="2">Results</component-headline>
    <div>
      <component-list
        form="search-colors"
        .receptor=${$t}
      ></component-list>
    </div>
  `));const jt=e=>!!e&&""!==e,St=Pe("form/requestSubmit"),kt=Pe("form/submit"),_t=Pe("form/abort"),xt={firstName:{rules:[jt],onChanged:De("form/field/firstName"),onValidate:De("form/validator/firstName")},lastName:{rules:[jt],onChanged:De("form/field/lastName"),onValidate:De("form/validator/lastName")}},Et=Object.values(xt).map((({onChanged:e})=>e)),At=Object.values(xt).map((({onValidate:e})=>e)),Ct=(e,t)=>xt[e].rules.reduce(((e,o)=>e?o(t):e),!0);var qt;function Tt(e){const t=e&&""!==e?e.toString():"0";return parseInt(t,10)}function Nt(e){if(!Ht(e))throw new Error("Not a formula");let t=qt.COLUMN,o=[],n={};return[...e.substr(1)].forEach((e=>{if(" "!==e)switch(t){case qt.COLUMN:n.column=e,t=qt.ROW;break;case qt.ROW:const i=Tt(e);isNaN(i)?(o.push(Object.assign({},n)),o.push(e),n={},t=qt.COLUMN):n.row=n.row?Tt(`${n.row}${i}`):i}})),o.push(Object.assign({},n)),o}Ue.on(Et,(e=>{Object.values(e).forEach((({name:e,value:t,form:o})=>{Le(xt[e].onValidate,{value:t,name:e,form:o,valid:Ct(e,t)})}))})),Ue.on([St,...At],(e=>{const{form:t}=e["form/requestSubmit"];delete e["form/requestSubmit"];const o=Object.values(e);if(o.every((e=>e.valid)))return Le(kt,{form:t});const n=o.filter((e=>!e.valid));return Le(_t,{form:t,errors:n.map((e=>`Field ${e.name} is not valid`))})})),te("form-textbox",(e=>{var t;const o=tt.useState(e,!0);return We(e,xt[e.name].onChanged,(t=>t.form===e.form),(async e=>{o.publish(Ct(e.name,e.value))})),q`<molecule-input-with-label-and-validation
      form=${e.form}
      name=${e.name}
      label=${null!==(t=e.label)&&void 0!==t?t:e.name}
      placeholder=${e.placeholder}
      .isValid=${o.getState()}
      .receptor=${St}
      .release=${xt[e.name].onChanged}
    ></molecule-input-with-label-and-validation>`}),{defaults:{name:"",form:"",label:"",rules:[],placeholder:"Insert value"}}),te("form-app",(e=>{const t="form-app",o=tt.useState(e,(()=>q`<p>Waiting for form to submit</p>`));return We(e,kt,(e=>t===e.form),(async e=>o.publish((()=>q`Form "${e.form}" submitted successfully`)))),We(e,_t,(e=>t===e.form),(async e=>o.publish((()=>q`Form "${e.form}" not submitted:
            <ul>
              ${e.errors.map((e=>q`<li>${e}</li>`))}
            </ul>`)))),q`<form name="${t}">
      <form-textbox
        form=${t}
        name="firstName"
        label="First Name"
        placeholder="insert first name..."
      ></form-textbox>
      <form-textbox
        form=${t}
        name="lastName"
        label="Last Name"
        placeholder="insert last name..."
      ></form-textbox>
      <button
        form=${t}
        @click=${()=>Le(St,{form:t})}
      >
        Submit
      </button>
      <p>${o.getState()()}</p>
    </form> `}),{styles:[ot,i`
        :host {
          display: block;
          width: 80%;
          margin: 0 auto;
        }
        molecule-input-with-label-and-validation {
          display: block;
          margin: 0.5rem auto;
        }
      `]}),function(e){e[e.COLUMN=0]="COLUMN",e[e.ROW=1]="ROW"}(qt||(qt={}));const Rt=(e,t)=>e&&e.column?!(!t||!t.column)&&(e.column.toUpperCase()===t.column.toUpperCase()&&Tt(e.row)===Tt(t.row)):!t||!t.column,Ht=e=>0===e.indexOf("="),Mt=e=>"string"==typeof e||e instanceof String,It=(e,t)=>{let o="+";return Nt(e).map((e=>{var o,n;return Mt(e)?e:Tt(null!==(n=null===(o=null==t?void 0:t.find((t=>Rt(t,e))))||void 0===o?void 0:o.value)&&void 0!==n?n:e)})).reduce(((e,t)=>Mt(t)?(o=t,e):((e,t)=>{if(Number.isInteger(t))switch(o){case"+":return e+t;case"-":return e-t}return Number.NaN})(e,t)),0)},Ut="ABCDEFGHIJKLMNOPQRSTUVXYZ",Pt=De("cell/set",{defaultValue:{row:-1,column:"",value:""}}),Vt=De("cell/changed",{defaultValue:{row:-1,column:"",value:""}}),Dt=De("cell/request"),Bt=e=>{var t;return null===(t=e.target)||void 0===t?void 0:t.value};te("cell-element",(e=>{const{row:t,column:o}=e,{getState:n,publish:i}=tt.useState(e,""),{getState:r,publish:s}=tt.useState(e,!1),l=tt.useState(e,[]),a=()=>Ht(n())?It(n(),l.getState()):n(),c=async e=>{if(i(e),Ht(e))for(const t of Nt(e).filter((e=>!Mt(e)))){const e=l.getState().find((e=>Rt(e,t)));(null==e?void 0:e.value)&&!Number.isNaN(e.value)||(l.publish([...l.getState().filter((e=>!Rt(e,t))),Object.assign({},t)]),await Le(Dt,t))}d()};let u;const d=()=>(u&&clearTimeout(u),u=setTimeout((()=>Le(Vt,{value:a(),row:t,column:o})),5));return We(e,Pt,(t=>Rt(t,e)),(async e=>c(e.value))),We(e,Dt,(t=>Rt(t,e)),(async()=>d())),We(e,Vt,(({row:e,column:t})=>Ht(n())&&((e,{row:t,column:o})=>-1!==e.indexOf(`${o}${t}`))(n(),{row:e,column:t})),(async e=>{l.getState().every((t=>((e,t)=>Rt(e,t)&&e.value===t.value)(t,e)))||(l.publish([...l.getState().filter((t=>!Rt(t,e))),Object.assign({},e)]),d())})),q`<input
      type="text"
      class="${Ht(n())?"formula":""}"
      @focus=${()=>s(!0)}
      @blur=${()=>s(!1)}
      @input=${e=>{i(Bt(e)),Ht(Bt(e))||d()}}
      @change=${async e=>{c(Bt(e))}}
      .value=${r()?n():a()}
    />`}),{defaults:{row:0,column:"A",value:""},styles:[ot,i`
        .formula {
          background-color: var(--highlight-color);
          border: none;
        }
      `]}),te("spreadsheet-app",(e=>{const{getState:t,publish:o}=tt.useState(e,0);return We(e,Pt,(async()=>o(t()+1))),We(e,Dt,(async()=>o(t()+1))),We(e,Vt,(async()=>o(t()+1))),q`
      <button @click=${()=>o(0)}>Reset counter</button>
      <pre>Hormones released: ${t()}</pre>
      <button @click=${()=>Lt()}>Init Example</button>
      <table>
        <tr>
          <th>&nbsp;</th>
          ${[...Ut].map((e=>q`<th>${e}</th>`))}
        </tr>
        ${[...new Array(10)].map(((e,t)=>q`<tr>
              <th>${t}</th>
              ${[...Ut].map((e=>q`<td>
                    <cell-element .row=${t} column="${e}"></cell-element>
                  </td>`))}
            </tr>`))}
      </table>
    `}),{styles:[ot,i`
        td {
          padding: 0;
          margin: 0;
        }
      `]});const Lt=async()=>{const e=[...new Array(10)].map(((e,t)=>t)),t=[...Ut].filter((e=>!["B","C","D"].includes(e)));Le(Pt,{column:"C",row:4,value:"=B0+B1-C0"+e.reduce(((e,o,n)=>`${e}${t.reduce(((e,t,o)=>o%2==0?`${e}+${t}${n}`:`${e}-${t}${n}`),"")}`),"")}),Le(Pt,{column:"D",row:4,value:"=C4-C0"});for(const o of e)t.forEach((e=>Le(Pt,{column:e,row:o,value:Math.round(1e3*Math.random()).toString()})));Le(Pt,{column:"B",row:0,value:"0"}),Le(Pt,{column:"B",row:1,value:"123"}),Le(Pt,{column:"C",row:0,value:"23134"})};var Jt;Jt=(()=>{switch(((e,t="")=>{const{hash:o}=document.location;if(o.length<1||o.indexOf(e)<0)return t;const n=o.substr(1).split("&").map((e=>e.split("="))).find((([t])=>t===e));if(!n)return t;const[,i]=n;return i})("loglevel","error").toLowerCase()){case"info":return Ce.INFO;case"debug":return Ce.DEBUG;case"trace":return Ce.TRACE}return Ce.ERROR})(),qe=Jt;const Wt=De("app/panel",{defaultValue:"readme"}),Ft=De("app/panel/form",{defaultValue:"logic"});var zt=te("example-app",(()=>q`
      <header>
        <component-button-list
          .items=${["readme","simple","two-receptors","todo","search","form","spreadsheet"]}
          .release=${Wt}
        >
        </component-button-list>
      </header>
      <component-toggle-panel name="readme" .receptor=${Wt}>
        <html-view file="readme"></html-view>
      </component-toggle-panel>
      <component-toggle-panel name="simple" .receptor=${Wt}>
        <blockquote>
          A receptor does not return a global state, but what has been returned.
        </blockquote>
        <div>
          <div>
            <simple-app></simple-app>
          </div>
          <div>
            <code-view file="simple.ts"></code-view>
          </div>
        </div>
      </component-toggle-panel>

      <component-toggle-panel name="two-receptors" .receptor=${Wt}>
        <blockquote>
          A receptor does not return a global state, but what has been released
          last. That might be counterintuitive if you compare it to state hooks
          like
          <code>useState</code>, but the reason is that a receptor really is the
          result of a hormone that was released. If you want to maintain the
          state, you will have to maintain it inside the component.
        </blockquote>
        <blockquote>
          A receptor that is explicitly filtered for a released hormone will
          always return undefined. In case you want to maintain your own state
          use this to know when the state changes.
        </blockquote>
        <div>
          <div>
            <two-form-app></two-form-app>
          </div>
          <div>
            <code-view file="twoForms.ts"></code-view>
          </div>
        </div>
      </component-toggle-panel>
      <component-toggle-panel name="todo" .receptor=${Wt}>
        <blockquote>
          A simple todo app, that adds new items to a list. Unlike the first
          examples, this one uses a component library that is setup to work out
          of the box with hormones.
        </blockquote>
        <div>
          <div>
            <todo-app></todo-app>
          </div>
          <div>
            <code-view file="todo.ts"></code-view>
          </div>
        </div>
      </component-toggle-panel>
      <component-toggle-panel name="search" .receptor=${Wt}>
        <blockquote>
          A search app, that loads a json result, filters it in the frontend and
          displays the result.
        </blockquote>
        <blockquote>
          This example is aiming to show how you can completely separate
          specific parts of your logic without any connection to the display or
          the rendering of the application.
        </blockquote>
        <div>
          <div>
            <search-app></search-app>
          </div>
          <div>
            <code-view file="search.ts"></code-view>
          </div>
        </div>
      </component-toggle-panel>
      <component-toggle-panel name="form" .receptor=${Wt}>
        <blockquote>
          This example contains form that can be submitted at the end.
        </blockquote>
        <blockquote>
          <code>Organismus</code> was not designed to solve forms, however there
          are multiple ways to solve form handling with it. This is one example,
          which is using the hypothalamus for collecting the form data and to
          orchestrate the validation and finally the submit.
        </blockquote>
        <div>
          <div>
            <form-app></form-app>
          </div>
          <div>
            <component-button-list
              .items=${["logic","ui"]}
              .release=${Ft}
            >
            </component-button-list>

            <component-toggle-panel name="logic" .receptor=${Ft}>
              <code-view file="form/form.logic.ts"></code-view>
            </component-toggle-panel>
            <component-toggle-panel name="ui" .receptor=${Ft}>
              <code-view file="form/form.ui.ts"></code-view>
            </component-toggle-panel>
          </div>
        </div>
      </component-toggle-panel>
      <component-toggle-panel name="spreadsheet" .receptor=${Wt}>
        <blockquote>
          Good results can be achieved with applications that have a lot of
          decoupled elements that might be related. A typical use case is a
          spreadsheet. It's still limited due to the fact that javascript is 
          a single thread language, yet working nice enough to display its 
          features.
        </blockquote>
        <blockquote>
          This spreadsheet shows a multiway communication:
          <ol>
            <li>
              Every cell releases a <code>cellChanged</code> hormone if changed.
              A cell with a formula listens to those events, and if one of the
              referenced cells is changed, it updates itself
            </li>
            <li>
              Every cell with a formula releases a
              <code>cellRequest</code> hormone for all cells with values it
              needs, triggering a <code>cellChanged</code> event for the
              affected cells, and read from 1.
            </li>
            <li>
              Every cell listens to a <code>cellSet</code> event, which allows
              setting events from the outside (by clicking the init button)
            </li>
          </ol>
        </blockquote>
        <blockquote>
          This is a very simple implementation, and formula's (which start with
          <code>=</code>) only support selecting single columns (no numerics or
          ranges) and <code>+</code> & <code>-</code> operators (ie
          <code>=A1+A2</code>).
        </blockquote>
        <blockquote>
          In this example, field <code>C4</code> is using a few hundred
          fields (all values in <code>A</code>, and <code>E</code> to
          <code>Z</code>, plus the ones in <code>B0</code>, <code>B1</code> and
          <code>C0</code>), and the field <code>D4</code> is using <code>C4</code>
          and <code>C0</code>. Change the fields to see how the calculated fields
          are recalculated, and reset the counter to see how few cells needs 
          updating on every change.
        </blockquote>
        <div>
          <div>
            <spreadsheet-app></spreadsheet-app>
          </div>
          <div>
            <code-view file="spreadsheet.ts"></code-view>
          </div>
        </div>
      </component-toggle-panel>
    `),{styles:[i`
        header {
          position: fixed;
        }
        component-toggle-panel div {
          display: flex;
          flex-wrap: wrap;
        }
        div div {
          flex: 1;
        }
      `]});export{zt as default};
//# sourceMappingURL=index.js.map
