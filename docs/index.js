/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,o=null)=>{for(;e!==o;){const o=e.nextSibling;t.removeChild(e),e=o}},o=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${o}--\x3e`,i=new RegExp(`${o}|${n}`);class s{constructor(t,e){this.parts=[],this.element=e;const n=[],s=[],l=document.createTreeWalker(e.content,133,null,!1);let u=0,h=-1,d=0;const{strings:p,values:{length:m}}=t;for(;d<m;){const t=l.nextNode();if(null!==t){if(h++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:o}=e;let n=0;for(let t=0;t<o;t++)r(e[t].name,"$lit$")&&n++;for(;n-- >0;){const e=p[d],o=c.exec(e)[2],n=o.toLowerCase()+"$lit$",s=t.getAttribute(n);t.removeAttribute(n);const r=s.split(i);this.parts.push({type:"attribute",index:h,name:o,strings:r}),d+=r.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),l.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(o)>=0){const o=t.parentNode,s=e.split(i),l=s.length-1;for(let e=0;e<l;e++){let n,i=s[e];if(""===i)n=a();else{const t=c.exec(i);null!==t&&r(t[2],"$lit$")&&(i=i.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),n=document.createTextNode(i)}o.insertBefore(n,t),this.parts.push({type:"node",index:++h})}""===s[l]?(o.insertBefore(a(),t),n.push(t)):t.data=s[l],d+=l}}else if(8===t.nodeType)if(t.data===o){const e=t.parentNode;null!==t.previousSibling&&h!==u||(h++,e.insertBefore(a(),t)),u=h,this.parts.push({type:"node",index:h}),null===t.nextSibling?t.data="":(n.push(t),h--),d++}else{let e=-1;for(;-1!==(e=t.data.indexOf(o,e+1));)this.parts.push({type:"node",index:-1}),d++}}else l.currentNode=s.pop()}for(const t of n)t.parentNode.removeChild(t)}}const r=(t,e)=>{const o=t.length-e.length;return o>=0&&t.slice(o)===e},l=t=>-1!==t.index,a=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(t,e){const{element:{content:o},parts:n}=t,i=document.createTreeWalker(o,133,null,!1);let s=d(n),r=n[s],l=-1,a=0;const c=[];let u=null;for(;i.nextNode();){l++;const t=i.currentNode;for(t.previousSibling===u&&(u=null),e.has(t)&&(c.push(t),null===u&&(u=t)),null!==u&&a++;void 0!==r&&r.index===l;)r.index=null!==u?-1:r.index-a,s=d(n,s),r=n[s]}c.forEach(t=>t.parentNode.removeChild(t))}const h=t=>{let e=11===t.nodeType?0:1;const o=document.createTreeWalker(t,133,null,!1);for(;o.nextNode();)e++;return e},d=(t,e=-1)=>{for(let o=e+1;o<t.length;o++){const e=t[o];if(l(e))return o}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const p=new WeakMap,m=t=>"function"==typeof t&&p.has(t),f={},v={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class w{constructor(t,e,o){this.t=[],this.template=t,this.processor=e,this.options=o}update(t){let e=0;for(const o of this.t)void 0!==o&&o.setValue(t[e]),e++;for(const t of this.t)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),o=[],n=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let s,r=0,a=0,c=i.nextNode();for(;r<n.length;)if(s=n[r],l(s)){for(;a<s.index;)a++,"TEMPLATE"===c.nodeName&&(o.push(c),i.currentNode=c.content),null===(c=i.nextNode())&&(i.currentNode=o.pop(),c=i.nextNode());if("node"===s.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.t.push(t)}else this.t.push(...this.processor.handleAttributeExpressions(c,s.name,s.strings,this.options));r++}else this.t.push(void 0),r++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const b=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),y=` ${o} `;class g{constructor(t,e,o,n){this.strings=t,this.values=e,this.type=o,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let s=0;s<t;s++){const t=this.strings[s],r=t.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===t.indexOf("--\x3e",r+1);const l=c.exec(t);e+=null===l?t+(i?y:n):t.substr(0,l.index)+l[1]+l[2]+"$lit$"+l[3]+o}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==b&&(e=b.createHTML(e)),t.innerHTML=e,t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const $=t=>null===t||!("object"==typeof t||"function"==typeof t),x=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class S{constructor(t,e,o){this.dirty=!0,this.element=t,this.name=e,this.strings=o,this.parts=[];for(let t=0;t<o.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new O(this)}_getValue(){const t=this.strings,e=t.length-1,o=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=o[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!x(t))return t}let n="";for(let i=0;i<e;i++){n+=t[i];const e=o[i];if(void 0!==e){const t=e.value;if($(t)||!x(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class O{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===f||$(t)&&t===this.value||(this.value=t,m(t)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const t=this.value;this.value=f,t(this)}this.value!==f&&this.committer.commit()}}class k{constructor(t){this.value=void 0,this.o=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(a()),this.endNode=t.appendChild(a())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.i(this.startNode=a()),t.i(this.endNode=a())}insertAfterPart(t){t.i(this.startNode=a()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.o=t}commit(){if(null===this.startNode.parentNode)return;for(;m(this.o);){const t=this.o;this.o=f,t(this)}const t=this.o;t!==f&&($(t)?t!==this.value&&this.l(t):t instanceof g?this.u(t):t instanceof Node?this.h(t):x(t)?this.p(t):t===v?(this.value=v,this.clear()):this.l(t))}i(t){this.endNode.parentNode.insertBefore(t,this.endNode)}h(t){this.value!==t&&(this.clear(),this.i(t),this.value=t)}l(t){const e=this.startNode.nextSibling,o="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=o:this.h(document.createTextNode(o)),this.value=t}u(t){const e=this.options.templateFactory(t);if(this.value instanceof w&&this.value.template===e)this.value.update(t.values);else{const o=new w(e,t.processor,this.options),n=o._clone();o.update(t.values),this.h(n),this.value=o}}p(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let o,n=0;for(const i of t)o=e[n],void 0===o&&(o=new k(this.options),e.push(o),0===n?o.appendIntoPart(this):o.insertAfterPart(e[n-1])),o.setValue(i),o.commit(),n++;n<e.length&&(e.length=n,this.clear(o&&o.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class _{constructor(t,e,o){if(this.value=void 0,this.o=void 0,2!==o.length||""!==o[0]||""!==o[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=o}setValue(t){this.o=t}commit(){for(;m(this.o);){const t=this.o;this.o=f,t(this)}if(this.o===f)return;const t=!!this.o;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.o=f}}class j extends S{constructor(t,e,o){super(t,e,o),this.single=2===o.length&&""===o[0]&&""===o[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends O{}let A=!1;(()=>{try{const t={get capture(){return A=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class q{constructor(t,e,o){this.value=void 0,this.o=void 0,this.element=t,this.eventName=e,this.eventContext=o,this.m=t=>this.handleEvent(t)}setValue(t){this.o=t}commit(){for(;m(this.o);){const t=this.o;this.o=f,t(this)}if(this.o===f)return;const t=this.o,e=this.value,o=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||o);o&&this.element.removeEventListener(this.eventName,this.m,this.v),n&&(this.v=C(t),this.element.addEventListener(this.eventName,this.m,this.v)),this.value=t,this.o=f}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const C=t=>t&&(A?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function N(t){let e=M.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},M.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const i=t.strings.join(o);return n=e.keyString.get(i),void 0===n&&(n=new s(t,t.getTemplateElement()),e.keyString.set(i,n)),e.stringsArray.set(t.strings,n),n}const M=new Map,T=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const H=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,e,o,n){const i=e[0];if("."===i){return new j(t,e.slice(1),o).parts}if("@"===i)return[new q(t,e.slice(1),n.eventContext)];if("?"===i)return[new _(t,e.slice(1),o)];return new S(t,e,o).parts}handleTextExpression(t){return new k(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const V=(t,...e)=>new g(t,e,"html",H)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,I=(t,e)=>`${t}--${e}`;let R=!0;void 0===window.ShadyCSS?R=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),R=!1);const P=t=>e=>{const n=I(e.type,t);let i=M.get(n);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},M.set(n,i));let r=i.stringsArray.get(e.strings);if(void 0!==r)return r;const l=e.strings.join(o);if(r=i.keyString.get(l),void 0===r){const o=e.getTemplateElement();R&&window.ShadyCSS.prepareTemplateDom(o,t),r=new s(e,o),i.keyString.set(l,r)}return i.stringsArray.set(e.strings,r),r},U=["html","svg"],F=new Set,B=(t,e,o)=>{F.add(t);const n=o?o.element:document.createElement("template"),i=e.querySelectorAll("style"),{length:s}=i;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(n,t);const r=document.createElement("style");for(let t=0;t<s;t++){const e=i[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{U.forEach(e=>{const o=M.get(I(e,t));void 0!==o&&o.keyString.forEach(t=>{const{element:{content:e}}=t,o=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{o.add(t)}),u(t,o)})})})(t);const l=n.content;o?function(t,e,o=null){const{element:{content:n},parts:i}=t;if(null==o)return void n.appendChild(e);const s=document.createTreeWalker(n,133,null,!1);let r=d(i),l=0,a=-1;for(;s.nextNode();)for(a++,s.currentNode===o&&(l=h(e),o.parentNode.insertBefore(e,o));-1!==r&&i[r].index===a;){if(l>0){for(;-1!==r;)i[r].index+=l,r=d(i,r);return}r=d(i,r)}}(o,r,l.firstChild):l.insertBefore(r,l.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const a=l.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==a)e.insertBefore(a.cloneNode(!0),e.firstChild);else if(o){l.insertBefore(r,l.firstChild);const t=new Set;t.add(r),u(o,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const D={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},L=(t,e)=>e!==t&&(e==e||t==t),J={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:L};class W extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,o)=>{const n=this._attributeNameForProperty(o,e);void 0!==n&&(this._attributeToPropertyMap.set(n,o),t.push(n))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=J){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const o="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,o,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(n){const i=this[t];this[e]=n,this.requestUpdateInternal(t,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||J}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const o of e)this.createProperty(o,t[o])}}static _attributeNameForProperty(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,o=L){return o(t,e)}static _propertyValueFromAttribute(t,e){const o=e.type,n=e.converter||D,i="function"==typeof n?n:n.fromAttribute;return i?i(t,o):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const o=e.type,n=e.converter;return(n&&n.toAttribute||D.toAttribute)(t,o)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,o){e!==o&&this._attributeToProperty(t,o)}_propertyToAttribute(t,e,o=J){const n=this.constructor,i=n._attributeNameForProperty(t,o);if(void 0!==i){const t=n._propertyValueToAttribute(e,o);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(i):this.setAttribute(i,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const o=this.constructor,n=o._attributeToPropertyMap.get(t);if(void 0!==n){const t=o.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=o._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,o){let n=!0;if(void 0!==t){const i=this.constructor;o=o||i.getPropertyOptions(t),i._valueHasChanged(this[t],e,o.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==o.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,o))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}W.finalized=!0;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const z=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol();class Y{constructor(t,e){if(e!==G)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(z?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const K=(t,...e)=>{const o=e.reduce((e,o,n)=>e+(t=>{if(t instanceof Y)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(o)+t[n+1],t[0]);return new Y(o,G)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Q={};class X extends W{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,o)=>t.reduceRight((t,o)=>Array.isArray(o)?e(o,t):(t.add(o),t),o),o=e(t,new Set),n=[];o.forEach(t=>n.unshift(t)),this._styles=n}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!z){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new Y(String(e),G)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?z?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==Q&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return Q}}X.finalized=!0,X.render=(t,o,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const i=n.scopeName,s=T.has(o),r=R&&11===o.nodeType&&!!o.host,l=r&&!F.has(i),a=l?document.createDocumentFragment():o;if(((t,o,n)=>{let i=T.get(o);void 0===i&&(e(o,o.firstChild),T.set(o,i=new k(Object.assign({templateFactory:N},n))),i.appendInto(o)),i.setValue(t),i.commit()})(t,a,Object.assign({templateFactory:P(i)},n)),l){const t=T.get(a);T.delete(a);const n=t.value instanceof w?t.value.template:void 0;B(i,a,n),e(o,o.firstChild),o.appendChild(a),T.set(o,t)}!s&&r&&window.ShadyCSS.styleElement(o.host)};const Z=t=>Object.entries(t).reduce((t,[e,o])=>(t[e]=function(t){return"boolean"==typeof t?{type:Boolean}:Array.isArray(t)?{type:Array}:"object"==typeof t?{type:Object}:{}}(o),t),{}),tt=t=>{return(t=>void 0!==t&&void 0!==t.props)(t)?(t.props||[]).reduce((t,e)=>(Object.entries(e).forEach(([e,o])=>t[e]=o),t),{}):(e=null==t?void 0:t.defaults,Z(e||{}));var e},et={},ot=(t,e,o)=>{if(et[t])return et[t];customElements.define(t,class extends X{static get properties(){return tt(o)}static get styles(){return null==o?void 0:o.styles}constructor(){super(),(t=>void 0!==t&&void 0!==t.defaults)(o)&&Object.entries(o.defaults).forEach(([t,e])=>{this[t]=e})}render(){return e(this)}});const n=document.createElement(t);return et[t]=n,n},nt={};var it;!function(t){t[t.SILENT=0]="SILENT",t[t.ERROR=1]="ERROR",t[t.INFO=80]="INFO",t[t.DEBUG=90]="DEBUG",t[t.TRACE=100]="TRACE"}(it||(it={}));let st=it.SILENT;let rt=[];const lt=(t,e,...o)=>{rt.forEach(n=>n(it.ERROR,t,e,...o)),st>=it.ERROR&&console.error(e,t,...o)},at=(t,e,...o)=>{if(rt.forEach(n=>n(it.INFO,t,e,...o)),st>=it.INFO){(st===it.TRACE?console.trace:console.log)(e,t,...o)}},ct=(t,e,...o)=>{if(rt.forEach(n=>n(it.DEBUG,t,e,...o)),st>=it.DEBUG){(st===it.TRACE?console.trace:console.log)(e,t,...o)}},ut={queue:{},list:{}};function ht(t){return t.reduce((t,e)=>`${t};${e.name};`,"")}const dt=new class{constructor(){this.actionDictionary={}}on(t,e){if(Array.isArray(t)){const o=ht(t);if(ut.list[o])throw lt("Hypothalamus.on",new Error("Cannot register the same list of hormones twice"),o),new Error("Cannot register the same list of hormones twice");at("[Hypothalamus.on] Adding new action when all in a list of hormones are released",o,t),ut.list[o]={hormones:[...t],callback:e}}else at("Hypothalamus.on","Adding new action when a hormone is released",t.name),this.actionDictionary[t.name]=this.actionDictionary[t.name]||[],this.actionDictionary[t.name].push(e)}drop(t){Array.isArray(t)?(ct("Hypothalamus.drop","Dropping a list of hormones",ht(t),t),delete ut.queue[ht(t)],delete ut.list[ht(t)]):(ct("Hypothalamus.drop","Dropping a hormone",t.name),this.actionDictionary[t.name]=[])}dropAll(){ct("Hypothalamus.dropAll","Dropping all hormones"),this.actionDictionary={},ut.queue={},ut.list={}}orchestrate(t,e){this.actionDictionary[t.name]&&this.actionDictionary[t.name].forEach(t=>t(e));const o=Object.keys(ut.queue).filter(e=>e.indexOf(`;${t.name};`)>-1),n=Object.keys(ut.list).filter(e=>e.indexOf(`;${t.name};`)>-1&&o.every(t=>t!==e));n.forEach(t=>{ut.queue[t]={hormones:[...ut.list[t].hormones],values:{},callback:ut.list[t].callback}});const i=[...new Set([...o,...n])];for(let o=0;o<i.length;o++){const n=i[o];ut.queue[n].hormones=ut.queue[n].hormones.filter(e=>e.name!==t.name),ut.queue[n].values[t.name]=e,ut.queue[n].hormones.length<1&&(ut.queue[n].callback(ut.queue[n].values),delete ut.queue[n])}}};function pt(t,e={}){return mt(t,Object.assign(Object.assign({},e),{readOnce:!0}))}function mt(t,e={}){if(nt[t]&&!e.loadIfExists)throw lt("hormone.defineHormone",new Error("Hormone already created"),t),new Error("Hormone already created");if(nt[t]&&e.loadIfExists)return ct("hormone.defineHormone","Hormone already created, reusing existing",t),{name:t};const{defaultValue:o,transformation:n,readOnce:i}=e;return nt[t]={name:t,value:o,defaultValue:o,transformation:n,receptors:[],readOnce:null!=i&&i},{name:t}}async function ft(t,e){if(!t)throw lt("hormone.releaseHormone",new Error("Hormone cannot be undefined")),new Error("Hormone cannot be undefined");const{name:o}=t;if(!nt[o])throw lt("hormone.releaseHormone",new Error("Hormone does not exist"),o),new Error("Hormone does not exist");var n;n=e,nt[o].value=(void 0===n||n instanceof Function)&&e?e(nt[o].value):e,at("hormone.releaseHormone","Releasing passed hormone",o,nt[o].value);const{receptors:i,transformation:s}=nt[o];return s&&s(nt[o].value),dt.orchestrate({name:o},nt[o].value),await Promise.all(i.filter(t=>{const e=void 0===t.onlyIf||t.onlyIf(nt[o].value);return ct("hormone.releaseHormone",e?"Keeping receptor because condition matched or no condition":"Filtered receptor from the triggers because condition not matched",t),e}).map(t=>null==t?void 0:t.onTriggered(nt[o].value))),nt[o].readOnce&&(ct("hormone.releaseHormone","Resetting hormone because it is readOnce",o),nt[o].value=nt[o].defaultValue),Object.assign({},nt[o])}function vt(t,{name:e},o,n){const i=null!=n?n:o,s=n?o:void 0;if(!nt[e])throw lt("receptor.useReceptor",new Error("Hormone is not defined"),e),new Error(`Hormone "${e}" is not defined`);((t,e,o)=>!nt[e].receptors.some(e=>{var n;return e.parent===t&&(null===(n=e.onlyIf)||void 0===n?void 0:n.toString())===(null==o?void 0:o.toString())}))(t,e,s)?(at("receptor.useReceptor","Pushing new receptor to hormone",e,{parent:t}),nt[e].receptors.push({parent:t,onlyIf:s,onTriggered:i}),void 0!==nt[e].value?i(nt[e].value):void 0!==nt[e].defaultValue&&i(nt[e].defaultValue)):((t,e,...o)=>{rt.forEach(n=>n(it.TRACE,t,e,...o)),st===it.TRACE&&console.trace(e,t,...o)})("receptor.useReceptor","Receptor not pushed because already subscribed",e,{parent:t})}var wt="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function bt(t,e,o){return t(o={path:e,exports:{},require:function(t,e){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==e&&o.path)}},o.exports),o.exports}var yt=bt((function(t,e){Object.defineProperty(e,"g",{value:!0}),e.shallowClone=void 0,e.shallowClone=function(t){return"object"!=typeof t||!t||t instanceof Date||t instanceof RegExp?t:Array.isArray(t)?[...t]:Object.assign({},t)}})),gt=bt((function(t,e){function o(t){if(!t.dispatchEvent||!t.requestUpdate)throw new Error("Element missing required functions (dispatchEvent/requestUpdate)");return t}function n(t){const e=t;if(e.$)return e;const n=o(t),i=n.updated;return e.$={index:0,count:0,states:[],reducers:[]},n.updated=t=>(e.$.index=0,i(t)),e}Object.defineProperty(e,"g",{value:!0}),e.withReducer=e.withState=e.decorate=e.asUpdateableLitElement=void 0,e.asUpdateableLitElement=o,e.decorate=n,e.withState=function(t,e,o={}){const i=n(t),{index:s,count:r}=i.$;return s===r?(i.$.index++,i.$.count++,i.$.states.push(e),e):(i.$.index++,o.updateDefault&&i.$.states[s].inject(e.getState()),i.$.states[s])},e.withReducer=function(t,e){const o=n(t),{index:i,count:s,reducers:r}=o.$;return i!==s||r[i-1]?o.$.reducers[i-1]:(o.$.reducers[i-1]=e,e)}})),$t=bt((function(t,e){var o=wt&&wt.S||function(t,e,o,n){return new(o||(o=Promise))((function(i,s){function r(t){try{a(n.next(t))}catch(t){s(t)}}function l(t){try{a(n.throw(t))}catch(t){s(t)}}function a(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(r,l)}a((n=n.apply(t,e||[])).next())}))};Object.defineProperty(e,"g",{value:!0}),e.useState=void 0,e.useState=(t,e,n={})=>{let i=yt.shallowClone(e);const s=[()=>t.requestUpdate()];return gt.withState(t,{publish:t=>o(void 0,void 0,void 0,(function*(){i!==t&&(i=yt.shallowClone(t),s.forEach(t=>t(i)))})),subscribe:t=>s.push(t),getState:()=>i,inject:t=>{i=t}},n)}})),xt=bt((function(t,e){Object.defineProperty(e,"g",{value:!0}),e.useReducer=void 0,e.useReducer=(t,e,o,n={})=>{const{getState:i,publish:s}=$t.useState(t,o,n),r=[];return gt.withReducer(t,{getState:i,subscribe:t=>r.push(t),when:(t,e)=>r.push((o,n)=>o===t&&e(n)),publish:(o,l)=>{const a=e(i());a[o]&&(s(a[o](l)),r.forEach(t=>t(o,i())),n.dispatchEvent&&t.dispatchEvent(new CustomEvent(o,{detail:i()})))}})}})),St=bt((function(t,e){Object.defineProperty(e,"g",{value:!0}),Object.defineProperty(e,"useState",{enumerable:!0,get:function(){return $t.useState}}),Object.defineProperty(e,"useReducer",{enumerable:!0,get:function(){return xt.useReducer}})}));const Ot=K`
input, select, textarea, button{font-family:inherit;font-size: 1em;} button {cursor: pointer;}`,kt=mt("simple-app/input-received");ot("simple-app",t=>{const e=St.useState(t,"");return vt(t,kt,async t=>e.publish(t)),V` <div>
      <input
        type="text"
        @input="${t=>{var e;const o=null===(e=t.target)||void 0===e?void 0:e.value;ft(kt,o)}}"
        placeholder="Insert something"
      />
    </div>
    Receptor received: ${e.getState()}`},{styles:Ot});const _t=mt("two-form-app/input-received");ot("two-form-app",t=>{const e=St.useState(t,void 0),o=St.useState(t,void 0),n=St.useState(t,void 0);return vt(t,_t,t=>"form-1"===(null==t?void 0:t.form),async t=>e.publish(t)),vt(t,_t,t=>"form-2"===(null==t?void 0:t.form),async t=>o.publish(t)),vt(t,_t,async t=>n.publish(t)),V` <div>
      <input
        type="text"
        @input="${t=>{var e;const o=null===(e=t.target)||void 0===e?void 0:e.value;ft(_t,{form:"form-1",value:o})}}"
        placeholder="Insert something"
      />
      Receptor form-1 received: ${JSON.stringify(e.getState())}
    </div>
    <div>
    <input
        type="text"
        @input="${t=>{var e;const o=null===(e=t.target)||void 0===e?void 0:e.value;ft(_t,{form:"form-2",value:o})}}"
        placeholder="Insert something"
      />
      Receptor form-2 received: ${JSON.stringify(o.getState())}
    </div>
    Global receptor received: ${JSON.stringify(n.getState())}`},{styles:Ot});mt("atoms/form/submit",{defaultValue:"",readOnce:!0}),ot("component-atom-buttom",t=>V`<button @onclick=${()=>ft(t.release)}>
      <slot></slot>
    </button>`,{styles:Ot}),ot("component-button-list",t=>{const e=St.useState(t,"");return vt(t,t.release,async t=>e.publish(t)),V`<div>
      ${t.items.map(o=>V`<button
          class="${o===e.getState()?"active":""}"
          @click=${()=>ft(t.release,o)}
        >
          ${o}
        </button>`)}
    </div>`},{defaults:{level:1},styles:[Ot,K`.active { background-color:var(--highlight-color); }`]});var jt=bt((function(t,e){function o(t){if(!t.dispatchEvent||!t.requestUpdate)throw new Error("Element missing required functions (dispatchEvent/requestUpdate)");return t}function n(t){const e=t;if(e.O)return e;const n=o(t),i=n.updated;return e.O={index:0,count:0,effects:[]},n.updated=t=>(e.O.index=0,i(t)),e}Object.defineProperty(e,"g",{value:!0}),e.withEffect=e.decorate=e.asUpdateableLitElement=void 0,e.asUpdateableLitElement=o,e.decorate=n,e.withEffect=function(t,e){const o=n(t),{index:i,count:s}=o.O;return i===s?(o.O.index++,o.O.count++,o.O.effects.push(e),e):(o.O.index++,o.O.effects[i])}})),Et=bt((function(t,e){function o(t,e,o){const n=jt.withEffect(t,{on:e,observe:["__initial__dirty"]});n.observe.some((t,e)=>o[e]!==t)&&n.on(),n.observe=o}Object.defineProperty(e,"g",{value:!0}),e.useOnce=e.useEffect=void 0,e.useEffect=o,e.useOnce=(t,e)=>o(t,e,[])})),At=bt((function(t,e){Object.defineProperty(e,"g",{value:!0}),Object.defineProperty(e,"useEffect",{enumerable:!0,get:function(){return Et.useEffect}}),Object.defineProperty(e,"useOnce",{enumerable:!0,get:function(){return Et.useOnce}})}));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const qt=new WeakMap,Ct=(Nt=t=>e=>{if(!(e instanceof k))throw new Error("unsafeHTML can only be used in text bindings");const o=qt.get(e);if(void 0!==o&&$(t)&&t===o.value&&e.value===o.fragment)return;const n=document.createElement("template");n.innerHTML=t;const i=document.importNode(n.content,!0);e.setValue(i),qt.set(e,{value:t,fragment:i})},(...t)=>{const e=Nt(...t);return p.set(e,!0),e});var Nt;ot("html-view",t=>{const{getState:e,publish:o}=St.useState(t,"");return At.useOnce(t,()=>{fetch(t.file+".html").then(t=>t.text()).then(t=>o(t))}),V`${Ct(e())}`},{defaults:{file:""},styles:K`
      :host {
        display: block;
        width: 100%;
      }
    `}),ot("code-view",t=>{const{getState:e,publish:o}=St.useState(t,"");return At.useOnce(t,()=>{fetch(t.file+".html").then(t=>t.text()).then(t=>o(t))}),V`<pre>${t.file}</pre>
    ${Ct(e())}`},{defaults:{file:""},styles:K`
      :host {
        display: block;
        width: 100%;
      }
    `}),ot("component-headline",t=>{switch(t.level){case"1":return V`<h1><slot></slot></h1>`;case"2":return V`<h2><slot></slot></h2>`;case"3":return V`<h3><slot></slot></h3>`;case"4":return V`<h4><slot></slot></h4>`;case"5":default:return V`<h5><slot></slot></h5>`}},{defaults:{level:"2"}});var Mt;!function(t){t[t.OnType=0]="OnType",t[t.OnSubmit=1]="OnSubmit",t[t.OnEnter=2]="OnEnter",t[t.OnBlur=3]="OnBlur"}(Mt||(Mt={}));const Tt=(t,e)=>Array.isArray(t)&&t.some(t=>t===e);ot("component-atom-input",t=>{const e=St.useState(t,"");!function(t,e){var o,n;if(!t.receptor)return;const i=null!==(o=t.form)&&void 0!==o?o:"",s=null!==(n=t.name)&&void 0!==n?n:"";vt(t,t.receptor,e=>(null==e?void 0:e.form)===t.form,async()=>{Tt(t.triggers,Mt.OnSubmit)&&(ft(t.release,{name:s,value:e.getState(),form:i}),Ht(t,e.publish))})}(t,e);const{publish:o,getState:n}=e;return V`
      <input
        type="text"
        class="${t.isValid?"":"invalid"}"
        name="${t.name||"item"}"
        aria-label=${t.label}
        .value="${e.getState()}"
        @input="${e=>{var n;const i=null===(n=e.target)||void 0===n?void 0:n.value;o(i),Tt(t.triggers,Mt.OnType)&&ft(t.release,{name:t.name,value:i,form:t.form})}}"
        @keypress=${e=>{Tt(t.triggers,Mt.OnEnter)&&"Enter"===e.key&&(ft(t.release,{name:t.name,value:n(),form:t.form}),Ht(t,o))}}
        placeholder="${t.placeholder||t.label}"
      />
    `},{defaults:{name:"input",label:"input",placeholder:"insert value",clear:!1,isValid:!0,triggers:[Mt.OnSubmit],form:void 0,release:void 0,receptor:void 0},styles:[Ot,K`
    .invalid {
      border-color: var(--alert-color);
    }`]});async function Ht(t,e){t.clear&&e("")}ot("component-list",t=>{var e;const o=St.useState(t,{items:[]});return vt(t,t.receptor,e=>(null==e?void 0:e.form)===t.form,async t=>o.publish(t)),V`<ul>
      ${null===(e=o.getState())||void 0===e?void 0:e.items.map(t=>V`<li>${t}</li>`)}
    </ul>`},{defaults:{form:""}}),ot("component-toggle-panel",t=>{const e=St.useState(t,"");return vt(t,t.receptor,async t=>e.publish(t)),t.name===e.getState()?V`<slot></slot>`:V``},{defaults:{name:""},styles:K`
        slot {
          display:block;
          padding-top: 4rem;
        }`});const Vt=mt("molecules/InputWithButton/submit",{readOnce:!0}),It=mt("molecules/InputWithButton/changed"),Rt=(ot("molecule-input-with-button",t=>{const{name:e,label:o,placeholder:n,clear:i,form:s}=t;return vt(t,It,t=>s===t.form,async e=>ft(t.release,e)),V`
      <component-atom-input
        name="${e}"
        label="${o}"
        placeholder="${n}"
        form="${s}"
        .triggers=${[Mt.OnEnter,Mt.OnSubmit]}
        .clear=${i}
        .release=${It}
        .receptor=${Vt}
      ></component-atom-input>
      <button 
        form=${s} 
        @click=${()=>ft(Vt,{form:s})}>
        <slot></slot>
      </button>
    `},{defaults:{name:"input",label:"input",placeholder:"insert value",clear:!1,form:""},styles:Ot}),ot("molecule-input-with-label-and-validation",t=>{const e=t.form||"form";return V`
      <label class="${t.isValid?"":"invalid"}">
        <div>${t.label}</div>
        <div>
          <component-atom-input
            form=${e}
            name="${t.name}"
            label="${t.label}"
            placeholder="${t.placeholder}"
            .triggers=${[Mt.OnEnter,Mt.OnType,Mt.OnSubmit]}
            .isValid=${t.isValid}
            .clear=${t.clear}
            .release=${t.release}
            .receptor=${t.receptor}
          ></component-atom-input>
        </div>
      </label>
    `},{styles:K`
      label {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      .invalid {
        color: var(--alert-color);
      }
    `,defaults:{name:"input",label:"input",placeholder:"insert value",clear:!1,isValid:!0,form:void 0,release:void 0,receptor:void 0}}),mt("todo/list",{defaultValue:{items:[]}})),Pt=mt("todo/add");dt.on(Pt,t=>ft(Rt,e=>({items:[...e.items,t.value],form:t.form}))),ot("todo-app",()=>V`
    <component-headline level="1">Your todo list</component-headline>
    <div>
      <molecule-input-with-button
        clear
        form="todo-list"
        label="add todo"
        placeholder="insert todo"
        .release=${Pt}
      >
        Add todo
      </molecule-input-with-button>
    </div>
    <component-headline level="2">Your todos</component-headline>
    <div>
      <component-list form="todo-list" .receptor=${Rt}></component-list>
    </div>
  `);const Ut=mt("search/query",{defaultValue:{value:"",form:void 0}}),Ft=pt("search/filtered",{defaultValue:{items:[]}}),Bt=(t,e)=>Object.entries(t).filter(([t])=>{var o;return t.toLowerCase().indexOf(null!==(o=null==e?void 0:e.toLowerCase())&&void 0!==o?o:"_")>-1}).map(([t,e])=>`${t}: ${e}`);dt.on(Ut,({value:t,form:e})=>{fetch("colors.json").then(t=>t.json()).then(o=>ft(Ft,{items:Bt(o,t),form:e}))}),ot("search-app",()=>V`
    <component-headline level="1">Search for a color</component-headline>
    <div>
      <molecule-input-with-button
        form="search-colors"
        .release=${Ut}
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
        .receptor=${Ft}
      ></component-list>
    </div>
  `);const Dt=t=>!!t&&""!==t,Lt=pt("form/requestSubmit"),Jt=pt("form/submit"),Wt=pt("form/abort"),zt={firstName:{rules:[Dt],onChanged:mt("form/field/firstName"),onValidate:mt("form/validator/firstName")},lastName:{rules:[Dt],onChanged:mt("form/field/lastName"),onValidate:mt("form/validator/lastName")}},Gt=Object.values(zt).map(({onChanged:t})=>t),Yt=Object.values(zt).map(({onValidate:t})=>t),Kt=(t,e)=>zt[t].rules.reduce((t,o)=>t?o(e):t,!0);var Qt;function Xt(t){if(!te(t))throw new Error("Not a formula");let e=Qt.COLUMN,o=[],n={};return[...t.substr(1)].forEach(t=>{if(" "!==t)switch(e){case Qt.COLUMN:n.column=t,e=Qt.ROW;break;case Qt.ROW:const i=parseInt(t,10);isNaN(i)?(o.push(Object.assign({},n)),o.push(t),n={},e=Qt.COLUMN):n.row=n.row?parseInt(`${n.row}${i}`,10):i}}),o.push(Object.assign({},n)),o}dt.on(Gt,t=>{Object.values(t).forEach(({name:t,value:e,form:o})=>{ft(zt[t].onValidate,{value:e,name:t,form:o,valid:Kt(t,e)})})}),dt.on([Lt,...Yt],t=>{const{form:e}=t["form/requestSubmit"];delete t["form/requestSubmit"];const o=Object.values(t);if(o.every(t=>t.valid))return ft(Jt,{form:e});const n=o.filter(t=>!t.valid);return ft(Wt,{form:e,errors:n.map(t=>`Field ${t.name} is not valid`)})}),ot("form-textbox",t=>{var e;const o=St.useState(t,!0);return vt(t,zt[t.name].onChanged,e=>e.form===t.form,async t=>{o.publish(Kt(t.name,t.value))}),V`<molecule-input-with-label-and-validation
      form=${t.form}
      name=${t.name}
      label=${null!==(e=t.label)&&void 0!==e?e:t.name}
      placeholder=${t.placeholder}
      .isValid=${o.getState()}
      .receptor=${Lt}
      .release=${zt[t.name].onChanged}
    ></molecule-input-with-label-and-validation>`},{defaults:{name:"",form:"",label:void 0,placeholder:"Insert value"}}),ot("form-app",t=>{const e="form-app",o=St.useState(t,()=>V`<p>Waiting for form to submit</p>`);return vt(t,Jt,t=>e===t.form,async t=>o.publish(()=>V`Form "${t.form}" submitted successfully`)),vt(t,Wt,t=>e===t.form,async t=>o.publish(()=>V`Form "${t.form}" not submitted:
            <ul>
              ${t.errors.map(t=>V`<li>${t}</li>`)}
            </ul>`)),V`<form name="${e}">
      <form-textbox
        form=${e}
        name="firstName"
        label="First Name"
        placeholder="insert first name..."
      ></form-textbox>
      <form-textbox
        form=${e}
        name="lastName"
        label="Last Name"
        placeholder="insert last name..."
      ></form-textbox>
      <button
        form=${e}
        @click=${()=>ft(Lt,{form:e})}
      >
        Submit
      </button>
      <p>${o.getState()()}</p>
    </form> `},{styles:[Ot,K`
        :host {
          display: block;
          width: 80%;
          margin: 0 auto;
        }
        molecule-input-with-label-and-validation {
          display: block;
          margin: 0.5rem auto;
        }
      `]}),function(t){t[t.COLUMN=0]="COLUMN",t[t.ROW=1]="ROW"}(Qt||(Qt={}));const Zt=(t,e)=>t&&t.column?!(!e||!e.column)&&(t.column.toUpperCase()===e.column.toUpperCase()&&parseInt(t.row.toString(),10)===parseInt(e.row.toString(),10)):!e||!e.column,te=t=>0===t.indexOf("="),ee=t=>"string"==typeof t||t instanceof String,oe=(t,e)=>{let o="+";return Xt(t).map(t=>{var o,n;return ee(t)?t:parseInt(null!==(n=null===(o=null==e?void 0:e.find(e=>Zt(e,t)))||void 0===o?void 0:o.value)&&void 0!==n?n:"NaN",10)}).reduce((t,e)=>ee(e)?(o=e,t):((t,e)=>{if(Number.isInteger(e))switch(o){case"+":return t+e;case"-":return t-e}return Number.NaN})(t,e),0)},ne=pt("cell/set",{defaultValue:{row:-1,column:"",value:""}}),ie=pt("cell/changed",{defaultValue:{row:-1,column:"",value:""}}),se=pt("cell/request"),re=t=>{var e;return null===(e=t.target)||void 0===e?void 0:e.value};ot("cell-element",t=>{const{row:e,column:o}=t,{getState:n,publish:i}=St.useState(t,""),{getState:s,publish:r}=St.useState(t,!1),l=St.useState(t,[]),a=()=>te(n())?oe(n(),l.getState()):n(),c=()=>ft(ie,{value:a(),row:e,column:o});return vt(t,ne,e=>Zt(e,{column:t.column,row:t.row,value:""}),async t=>(i(t.value),c())),vt(t,se,e=>Zt(e,{column:t.column,row:t.row,value:""}),async()=>c()),vt(t,ie,({row:t,column:e})=>te(n())&&((t,{row:e,column:o})=>-1!==t.indexOf(`${o}${e}`))(n(),{row:t,column:e}),async t=>{var e;(null===(e=l.getState().find(e=>Zt(e,t)))||void 0===e?void 0:e.value)!==t.value&&(l.publish([...l.getState().filter(e=>!Zt(e,t)),Object.assign({},t)]),c())}),V`<input
      type="text"
      class="${te(n())?"formula":""}"
      @focus=${()=>r(!0)}
      @blur=${()=>r(!1)}
      @input=${t=>{i(re(t)),te(re(t))||c()}}
      @change=${async t=>{const e=re(t);if(te(e)){const t=Xt(e).filter(t=>!ee(t));for(const e of t)await ft(se,e);c()}}}
      .value=${s()?n():a()}
    />`},{defaults:{row:0,column:"A",value:""},styles:[Ot,K`
        .formula {
          background-color: var(--highlight-color);
          border: none;
        }
      `]}),ot("spreadsheet-app",()=>{const t="ABCDEFGHIJKLMNOPQRSTUVXYZ";return V`
      <button @click=${()=>le()}>Init Example</button>
      <table>
        <tr>
          <th>&nbsp;</th>
          ${[...t].map(t=>V`<th>${t}</th>`)}
        </tr>
        ${[...new Array(99)].map((e,o)=>V`<tr>
              <th>${o}</th>
              ${[...t].map(t=>V`<td>
                    <cell-element .row=${o} column="${t}"></cell-element>
                  </td>`)}
            </tr>`)}
      </table>
    `},{styles:[Ot,K`
        td {
          padding: 0;
          margin: 0;
        }
      `]});const le=async()=>{const t=[...new Array(99)].map((t,e)=>e);await ft(ne,{column:"D",row:4,value:"=C4"}),await ft(ne,{column:"C",row:4,value:"=B0+B1-C0"+t.reduce((t,e,o)=>`${t}+A${o}`,"")});for(const e of t)await ft(ne,{column:"A",row:e,value:Math.round(1e3*Math.random()).toString()});await ft(ne,{column:"B",row:0,value:"324"}),await ft(ne,{column:"B",row:1,value:"123"}),await ft(ne,{column:"C",row:0,value:"23134"})};var ae;ae=(()=>{switch(((t,e="")=>{const{hash:o}=document.location;if(o.length<1||o.indexOf(t)<0)return e;const n=o.substr(1).split("&").map(t=>t.split("=")).find(([e])=>e===t);if(!n)return e;const[,i]=n;return i})("loglevel","error").toLowerCase()){case"info":return it.INFO;case"debug":return it.DEBUG;case"trace":return it.TRACE}return it.ERROR})(),st=ae;const ce=mt("app/panel",{defaultValue:"readme"}),ue=mt("app/panel/form",{defaultValue:"logic"});var he=ot("example-app",()=>V`
      <header>
        <component-button-list
          .items=${["readme","simple","two-receptors","todo","search","form","spreadsheet"]}
          .release=${ce}
        >
        </component-button-list>
      </header>
      <component-toggle-panel name="readme" .receptor=${ce}>
        <html-view file="readme"></html-view>
      </component-toggle-panel>
      <component-toggle-panel name="simple" .receptor=${ce}>
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

      <component-toggle-panel name="two-receptors" .receptor=${ce}>
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
      <component-toggle-panel name="todo" .receptor=${ce}>
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
      <component-toggle-panel name="search" .receptor=${ce}>
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
      <component-toggle-panel name="form" .receptor=${ce}>
        <blockquote>
          This example contains form that can be submitted at the end.
        </blockquote>
        <blockquote>
          <code>Organismus</code> was not designed to solve forms, however
          there are multiple ways to solve form handling with it. This is one
          example, which is using the hypothalamus for collecting the form data
          and to orchestrate the validation and finally the submit.
        </blockquote>
        <div>
          <div>
            <form-app></form-app>
          </div>
          <div>
            <component-button-list
              .items=${["logic","ui"]}
              .release=${ue}
            >
            </component-button-list>

            <component-toggle-panel name="logic" .receptor=${ue}>
              <code-view file="form/form.logic.ts"></code-view>
            </component-toggle-panel>
            <component-toggle-panel name="ui" .receptor=${ue}>
              <code-view file="form/form.ui.ts"></code-view>
            </component-toggle-panel>
          </div>
        </div>
      </component-toggle-panel>
      <component-toggle-panel name="spreadsheet" .receptor=${ce}>
        <blockquote>
          The best results can be achieved with applications that have a lot of
          decoupled elements that might be related. A typical use case is a
          spreadsheet.
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
          <code>=A1+A2</code>). Click <em>Init example</em> for an example where
          2 fields listen to changes in over a hundred different fields.
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
    `,{styles:[K`
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
      `]});export default he;
//# sourceMappingURL=index.js.map
