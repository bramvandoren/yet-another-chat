var e,t,n,s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i=e={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(e){t=r}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(e){n=o}}();var c,u=[],l=!1,h=-1;function d(){l&&c&&(l=!1,c.length?u=c.concat(u):h=-1,u.length&&f())}function f(){if(!l){var e=a(d);l=!0;for(var t=u.length;t;){for(c=u,u=[];++h<t;)c&&c[h].run();h=-1,t=u.length}c=null,l=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new p(e,t)),1!==u.length||l||a(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const g=function(e){const t=[];let n=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&s+1<e.length&&56320==(64512&e.charCodeAt(s+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++s)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},y={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let t=0;t<e.length;t+=3){const i=e[t],r=t+1<e.length,o=r?e[t+1]:0,a=t+2<e.length,c=a?e[t+2]:0,u=i>>2,l=(3&i)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,r||(h=64)),s.push(n[u],n[l],n[h],n[d])}return s.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(g(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,s=0;for(;n<e.length;){const i=e[n++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=e[n++];t[s++]=String.fromCharCode((31&i)<<6|63&r)}else if(i>239&&i<365){const r=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[s++]=String.fromCharCode(55296+(r>>10)),t[s++]=String.fromCharCode(56320+(1023&r))}else{const r=e[n++],o=e[n++];t[s++]=String.fromCharCode((15&i)<<12|(63&r)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let t=0;t<e.length;){const i=n[e.charAt(t++)],r=t<e.length?n[e.charAt(t)]:0;++t;const o=t<e.length?n[e.charAt(t)]:64;++t;const a=t<e.length?n[e.charAt(t)]:64;if(++t,null==i||null==r||null==o||null==a)throw Error();const c=i<<2|r>>4;if(s.push(c),64!==o){const e=r<<4&240|o>>2;if(s.push(e),64!==a){const e=o<<6&192|a;s.push(e)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},v=function(e){return function(e){const t=g(e);return y.encodeByteArray(t,!0)}(e).replace(/\./g,"")},w=function(e){try{return y.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function E(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function I(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function T(){const e=E();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function _(){return"object"==typeof indexedDB}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const b=()=>function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==s)return s;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,S=()=>{try{return b()||(()=>{if(void 0===e||void 0===e.env)return})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&w(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},A=e=>{var t,n;return null===(n=null===(t=S())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]},k=e=>{const t=A(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const s=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),s]:[t.substring(0,n),s]},C=e=>{var t;return null===(t=S())||void 0===t?void 0:t[`_${e}`]};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class N{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",s=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const r=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[v(JSON.stringify({alg:"none",type:"JWT"})),v(JSON.stringify(r)),""].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,R.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,O.prototype.create)}}class O{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],r=i?function(e,t){return e.replace(L,((e,n)=>{const s=t[n];return null!=s?String(s):`<${n}?>`}))}(i,n):"Error",o=`${this.serviceName}: ${r} (${s}).`;return new R(s,o,n)}}const L=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function P(e,t){if(e===t)return!0;const n=Object.keys(e),s=Object.keys(t);for(const i of n){if(!s.includes(i))return!1;const n=e[i],r=t[i];if(U(n)&&U(r)){if(!P(n,r))return!1}else if(n!==r)return!1}for(const e of s)if(!n.includes(e))return!1;return!0}function U(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function x(e){const t=[];for(const[n,s]of Object.entries(e))Array.isArray(s)?s.forEach((e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})):t.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return t.length?"&"+t.join("&"):""}function V(e){const t={};return e.replace(/^\?/,"").split("&").forEach((e=>{if(e){const[n,s]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(s)}})),t}function F(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(e,t){const n=new q(e,t);return n.subscribe.bind(n)}class q{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((()=>{e(this)})).catch((e=>{this.error(e)}))}next(e){this.forEachObserver((t=>{t.next(e)}))}error(e){this.forEachObserver((t=>{t.error(e)})),this.close(e)}complete(){this.forEachObserver((e=>{e.complete()})),this.close()}subscribe(e,t,n){let s;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");s=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===s.next&&(s.next=j),void 0===s.error&&(s.error=j),void 0===s.complete&&(s.complete=j);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch(e){}})),this.observers.push(s),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then((()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}}))}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((()=>{this.observers=void 0,this.onNoObservers=void 0})))}}function j(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function H(e){return e&&e._delegate?e._delegate:e}class K{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class G{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new N;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),s=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(s)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(s)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:"[DEFAULT]"})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e="[DEFAULT]"){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e="[DEFAULT]"){return this.instances.has(e)}getOptions(e="[DEFAULT]"){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(e)&&t.resolve(s)}return s}onInit(e,t){var n;const s=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(s))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(s=e,"[DEFAULT]"===s?void 0:s),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}var s;return n||null}normalizeInstanceIdentifier(e="[DEFAULT]"){return this.component?this.component.multipleInstances?e:"[DEFAULT]":e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class z{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new G(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $=[];var W,Q;(Q=W||(W={}))[Q.DEBUG=0]="DEBUG",Q[Q.VERBOSE=1]="VERBOSE",Q[Q.INFO=2]="INFO",Q[Q.WARN=3]="WARN",Q[Q.ERROR=4]="ERROR",Q[Q.SILENT=5]="SILENT";const X={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},Y=W.INFO,J={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},Z=(e,t,...n)=>{if(t<e.logLevel)return;const s=(new Date).toISOString(),i=J[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${s}]  ${e.name}:`,...n)};class ee{constructor(e){this.name=e,this._logLevel=Y,this._logHandler=Z,this._userLogHandler=null,$.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?X[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}}let te,ne;const se=new WeakMap,ie=new WeakMap,re=new WeakMap,oe=new WeakMap,ae=new WeakMap;let ce={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return ie.get(e);if("objectStoreNames"===t)return e.objectStoreNames||re.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return he(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function ue(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(ne||(ne=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(de(this),t),he(se.get(this))}:function(...t){return he(e.apply(de(this),t))}:function(t,...n){const s=e.call(de(this),t,...n);return re.set(s,t.sort?t.sort():[t]),he(s)}}function le(e){return"function"==typeof e?ue(e):(e instanceof IDBTransaction&&function(e){if(ie.has(e))return;const t=new Promise(((t,n)=>{const s=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",r),e.removeEventListener("abort",r)},i=()=>{t(),s()},r=()=>{n(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",i),e.addEventListener("error",r),e.addEventListener("abort",r)}));ie.set(e,t)}(e),t=e,(te||(te=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,ce):e);var t}function he(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const s=()=>{e.removeEventListener("success",i),e.removeEventListener("error",r)},i=()=>{t(he(e.result)),s()},r=()=>{n(e.error),s()};e.addEventListener("success",i),e.addEventListener("error",r)}));return t.then((t=>{t instanceof IDBCursor&&se.set(t,e)})).catch((()=>{})),ae.set(t,e),t}(e);if(oe.has(e))return oe.get(e);const t=le(e);return t!==e&&(oe.set(e,t),ae.set(t,e)),t}const de=e=>ae.get(e);function fe(e,t,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(e,t),a=he(o);return s&&o.addEventListener("upgradeneeded",(e=>{s(he(o.result),e.oldVersion,e.newVersion,he(o.transaction))})),n&&o.addEventListener("blocked",(()=>n())),a.then((e=>{r&&e.addEventListener("close",(()=>r())),i&&e.addEventListener("versionchange",(()=>i()))})).catch((()=>{})),a}const pe=["get","getKey","getAll","getAllKeys","count"],me=["put","add","delete","clear"],ge=new Map;function ye(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(ge.get(t))return ge.get(t);const n=t.replace(/FromIndex$/,""),s=t!==n,i=me.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!i&&!pe.includes(n))return;const r=async function(e,...t){const r=this.transaction(e,i?"readwrite":"readonly");let o=r.store;return s&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&r.done]))[0]};return ge.set(t,r),r}ce=(e=>({...e,get:(t,n,s)=>ye(t,n)||e.get(t,n,s),has:(t,n)=>!!ye(t,n)||e.has(t,n)}))(ce);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ve{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const we=new ee("@firebase/app"),Ee={"@firebase/app":"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},Ie=new Map,Te=new Map;function _e(e,t){try{e.container.addComponent(t)}catch(n){we.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function be(e){const t=e.name;if(Te.has(t))return we.debug(`There were multiple attempts to register component ${t}.`),!1;Te.set(t,e);for(const t of Ie.values())_e(t,e);return!0}function Se(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ae=new O("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ke{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new K("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ae.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const s=Object.assign({name:"[DEFAULT]",automaticDataCollectionEnabled:!1},t),i=s.name;if("string"!=typeof i||!i)throw Ae.create("bad-app-name",{appName:String(i)});var r;if(n||(n=null===(r=S())||void 0===r?void 0:r.config),!n)throw Ae.create("no-options");const o=Ie.get(i);if(o){if(P(n,o.options)&&P(s,o.config))return o;throw Ae.create("duplicate-app",{appName:i})}const a=new z(i);for(const e of Te.values())a.addComponent(e);const c=new ke(n,s,a);return Ie.set(i,c),c}function Ne(e="[DEFAULT]"){const t=Ie.get(e);if(!t&&"[DEFAULT]"===e)return Ce();if(!t)throw Ae.create("no-app",{appName:e});return t}function De(e,t,n){var s;let i=null!==(s=Ee[e])&&void 0!==s?s:e;n&&(i+=`-${n}`);const r=i.match(/\s|\//),o=t.match(/\s|\//);if(r||o){const e=[`Unable to register library "${i}" with version "${t}":`];return r&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void we.warn(e.join(" "))}be(new K(`${i}-version`,(()=>({library:i,version:t})),"VERSION"))}let Re=null;function Oe(){return Re||(Re=fe("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore("firebase-heartbeat-store")}}).catch((e=>{throw Ae.create("idb-open",{originalErrorMessage:e.message})}))),Re}async function Le(e,t){var n;try{const n=(await Oe()).transaction("firebase-heartbeat-store","readwrite"),s=n.objectStore("firebase-heartbeat-store");return await s.put(t,Me(e)),n.done}catch(e){if(e instanceof R)we.warn(e.message);else{const t=Ae.create("idb-set",{originalErrorMessage:null===(n=e)||void 0===n?void 0:n.message});we.warn(t.message)}}}function Me(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new xe(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}async triggerHeartbeat(){const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=Ue();if(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate!==t&&!this._heartbeatsCache.heartbeats.some((e=>e.date===t)))return this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6})),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";const e=Ue(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){const n=[];let s=e.slice();for(const i of e){const e=n.find((e=>e.agent===i.agent));if(e){if(e.dates.push(i.date),Ve(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ve(n)>t){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}(this._heartbeatsCache.heartbeats),s=v(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}}function Ue(){return(new Date).toISOString().substring(0,10)}class xe{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!_()&&new Promise(((e,t)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})).then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){return await async function(e){var t;try{return(await Oe()).transaction("firebase-heartbeat-store").objectStore("firebase-heartbeat-store").get(Me(e))}catch(e){if(e instanceof R)we.warn(e.message);else{const n=Ae.create("idb-get",{originalErrorMessage:null===(t=e)||void 0===t?void 0:t.message});we.warn(n.message)}}}(this.app)||{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return Le(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return Le(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function Ve(e){return v(JSON.stringify({version:2,heartbeats:e})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fe;Fe="",be(new K("platform-logger",(e=>new ve(e)),"PRIVATE")),be(new K("heartbeat",(e=>new Pe(e)),"PRIVATE")),De("@firebase/app","0.8.3",Fe),De("@firebase/app","0.8.3","esm2017"),De("fire-js","");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
De("firebase","9.13.0","app");var Be,qe="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==s?s:"undefined"!=typeof self?self:{},je={},He=He||{},Ke=qe||self;function Ge(){}function ze(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function $e(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}var We="closure_uid_"+(1e9*Math.random()>>>0),Qe=0;function Xe(e,t,n){return e.call.apply(e.bind,arguments)}function Ye(e,t,n){if(!e)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,s),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function Je(e,t,n){return(Je=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Xe:Ye).apply(null,arguments)}function Ze(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function et(e,t){function n(){}n.prototype=t.prototype,e.X=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Wb=function(e,n,s){for(var i=Array(arguments.length-2),r=2;r<arguments.length;r++)i[r-2]=arguments[r];return t.prototype[n].apply(e,i)}}function tt(){this.s=this.s,this.o=this.o}tt.prototype.s=!1,tt.prototype.na=function(){var e;!this.s&&(this.s=!0,this.M(),0)&&(e=this,Object.prototype.hasOwnProperty.call(e,We)&&e[We]||(e[We]=++Qe))},tt.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const nt=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if("string"==typeof e)return"string"!=typeof t||1!=t.length?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return-1};function st(e){const t=e.length;if(0<t){const n=Array(t);for(let s=0;s<t;s++)n[s]=e[s];return n}return[]}function it(e,t){for(let t=1;t<arguments.length;t++){const n=arguments[t];if(ze(n)){const t=e.length||0,s=n.length||0;e.length=t+s;for(let i=0;i<s;i++)e[t+i]=n[i]}else e.push(n)}}function rt(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}rt.prototype.h=function(){this.defaultPrevented=!0};var ot=function(){if(!Ke.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{Ke.addEventListener("test",Ge,t),Ke.removeEventListener("test",Ge,t)}catch(e){}return e}();function at(e){return/^[\s\xa0]*$/.test(e)}var ct=String.prototype.trim?function(e){return e.trim()}:function(e){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1]};function ut(e,t){return e<t?-1:e>t?1:0}function lt(){var e=Ke.navigator;return e&&(e=e.userAgent)?e:""}function ht(e){return-1!=lt().indexOf(e)}function dt(e){return dt[" "](e),e}dt[" "]=Ge;var ft,pt,mt=ht("Opera"),gt=ht("Trident")||ht("MSIE"),yt=ht("Edge"),vt=yt||gt,wt=ht("Gecko")&&!(-1!=lt().toLowerCase().indexOf("webkit")&&!ht("Edge"))&&!(ht("Trident")||ht("MSIE"))&&!ht("Edge"),Et=-1!=lt().toLowerCase().indexOf("webkit")&&!ht("Edge");function It(){var e=Ke.document;return e?e.documentMode:void 0}e:{var Tt="",_t=(pt=lt(),wt?/rv:([^\);]+)(\)|;)/.exec(pt):yt?/Edge\/([\d\.]+)/.exec(pt):gt?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(pt):Et?/WebKit\/(\S+)/.exec(pt):mt?/(?:Version)[ \/]?(\S+)/.exec(pt):void 0);if(_t&&(Tt=_t?_t[1]:""),gt){var bt=It();if(null!=bt&&bt>parseFloat(Tt)){ft=String(bt);break e}}ft=Tt}var St,At={};function kt(){return function(e){var t=At;return Object.prototype.hasOwnProperty.call(t,9)?t[9]:t[9]=e(9)}((function(){let e=0;const t=ct(String(ft)).split("."),n=ct("9").split("."),s=Math.max(t.length,n.length);for(let o=0;0==e&&o<s;o++){var i=t[o]||"",r=n[o]||"";do{if(i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],r=/(\d*)(\D*)(.*)/.exec(r)||["","","",""],0==i[0].length&&0==r[0].length)break;e=ut(0==i[1].length?0:parseInt(i[1],10),0==r[1].length?0:parseInt(r[1],10))||ut(0==i[2].length,0==r[2].length)||ut(i[2],r[2]),i=i[3],r=r[3]}while(0==e)}return 0<=e}))}if(Ke.document&&gt){var Ct=It();St=Ct||(parseInt(ft,10)||void 0)}else St=void 0;var Nt=St;function Dt(e,t){if(rt.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,s=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(wt){e:{try{dt(t.nodeName);var i=!0;break e}catch(e){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,s?(this.clientX=void 0!==s.clientX?s.clientX:s.pageX,this.clientY=void 0!==s.clientY?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:Rt[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&Dt.X.h.call(this)}}et(Dt,rt);var Rt={2:"touch",3:"pen",4:"mouse"};Dt.prototype.h=function(){Dt.X.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var Ot="closure_listenable_"+(1e6*Math.random()|0),Lt=0;function Mt(e,t,n,s,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!s,this.ha=i,this.key=++Lt,this.ba=this.ea=!1}function Pt(e){e.ba=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function Ut(e,t,n){for(const s in e)t.call(n,e[s],s,e)}function xt(e){const t={};for(const n in e)t[n]=e[n];return t}const Vt="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ft(e,t){let n,s;for(let t=1;t<arguments.length;t++){for(n in s=arguments[t],s)e[n]=s[n];for(let t=0;t<Vt.length;t++)n=Vt[t],Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}}function Bt(e){this.src=e,this.g={},this.h=0}function qt(e,t){var n=t.type;if(n in e.g){var s,i=e.g[n],r=nt(i,t);(s=0<=r)&&Array.prototype.splice.call(i,r,1),s&&(Pt(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function jt(e,t,n,s){for(var i=0;i<e.length;++i){var r=e[i];if(!r.ba&&r.listener==t&&r.capture==!!n&&r.ha==s)return i}return-1}Bt.prototype.add=function(e,t,n,s,i){var r=e.toString();(e=this.g[r])||(e=this.g[r]=[],this.h++);var o=jt(e,t,s,i);return-1<o?(t=e[o],n||(t.ea=!1)):((t=new Mt(t,this.src,r,!!s,i)).ea=n,e.push(t)),t};var Ht="closure_lm_"+(1e6*Math.random()|0),Kt={};function Gt(e,t,n,s,i){if(s&&s.once)return $t(e,t,n,s,i);if(Array.isArray(t)){for(var r=0;r<t.length;r++)Gt(e,t[r],n,s,i);return null}return n=en(n),e&&e[Ot]?e.N(t,n,$e(s)?!!s.capture:!!s,i):zt(e,t,n,!1,s,i)}function zt(e,t,n,s,i,r){if(!t)throw Error("Invalid event type");var o=$e(i)?!!i.capture:!!i,a=Jt(e);if(a||(e[Ht]=a=new Bt(e)),(n=a.add(t,n,s,o,r)).proxy)return n;if(s=function(){function e(n){return t.call(e.src,e.listener,n)}const t=Yt;return e}(),n.proxy=s,s.src=e,s.listener=n,e.addEventListener)ot||(i=o),void 0===i&&(i=!1),e.addEventListener(t.toString(),s,i);else if(e.attachEvent)e.attachEvent(Xt(t.toString()),s);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(s)}return n}function $t(e,t,n,s,i){if(Array.isArray(t)){for(var r=0;r<t.length;r++)$t(e,t[r],n,s,i);return null}return n=en(n),e&&e[Ot]?e.O(t,n,$e(s)?!!s.capture:!!s,i):zt(e,t,n,!0,s,i)}function Wt(e,t,n,s,i){if(Array.isArray(t))for(var r=0;r<t.length;r++)Wt(e,t[r],n,s,i);else s=$e(s)?!!s.capture:!!s,n=en(n),e&&e[Ot]?(e=e.i,(t=String(t).toString())in e.g&&(-1<(n=jt(r=e.g[t],n,s,i))&&(Pt(r[n]),Array.prototype.splice.call(r,n,1),0==r.length&&(delete e.g[t],e.h--)))):e&&(e=Jt(e))&&(t=e.g[t.toString()],e=-1,t&&(e=jt(t,n,s,i)),(n=-1<e?t[e]:null)&&Qt(n))}function Qt(e){if("number"!=typeof e&&e&&!e.ba){var t=e.src;if(t&&t[Ot])qt(t.i,e);else{var n=e.type,s=e.proxy;t.removeEventListener?t.removeEventListener(n,s,e.capture):t.detachEvent?t.detachEvent(Xt(n),s):t.addListener&&t.removeListener&&t.removeListener(s),(n=Jt(t))?(qt(n,e),0==n.h&&(n.src=null,t[Ht]=null)):Pt(e)}}}function Xt(e){return e in Kt?Kt[e]:Kt[e]="on"+e}function Yt(e,t){if(e.ba)e=!0;else{t=new Dt(t,this);var n=e.listener,s=e.ha||e.src;e.ea&&Qt(e),e=n.call(s,t)}return e}function Jt(e){return(e=e[Ht])instanceof Bt?e:null}var Zt="__closure_events_fn_"+(1e9*Math.random()>>>0);function en(e){return"function"==typeof e?e:(e[Zt]||(e[Zt]=function(t){return e.handleEvent(t)}),e[Zt])}function tn(){tt.call(this),this.i=new Bt(this),this.P=this,this.I=null}function nn(e,t){var n,s=e.I;if(s)for(n=[];s;s=s.I)n.push(s);if(e=e.P,s=t.type||t,"string"==typeof t)t=new rt(t,e);else if(t instanceof rt)t.target=t.target||e;else{var i=t;Ft(t=new rt(s,e),i)}if(i=!0,n)for(var r=n.length-1;0<=r;r--){var o=t.g=n[r];i=sn(o,s,!0,t)&&i}if(i=sn(o=t.g=e,s,!0,t)&&i,i=sn(o,s,!1,t)&&i,n)for(r=0;r<n.length;r++)i=sn(o=t.g=n[r],s,!1,t)&&i}function sn(e,t,n,s){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var i=!0,r=0;r<t.length;++r){var o=t[r];if(o&&!o.ba&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.ea&&qt(e.i,o),i=!1!==a.call(c,s)&&i}}return i&&!s.defaultPrevented}et(tn,tt),tn.prototype[Ot]=!0,tn.prototype.removeEventListener=function(e,t,n,s){Wt(this,e,t,n,s)},tn.prototype.M=function(){if(tn.X.M.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],s=0;s<n.length;s++)Pt(n[s]);delete t.g[e],t.h--}}this.I=null},tn.prototype.N=function(e,t,n,s){return this.i.add(String(e),t,!1,n,s)},tn.prototype.O=function(e,t,n,s){return this.i.add(String(e),t,!0,n,s)};var rn=Ke.JSON.stringify;function on(){var e=fn;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var an,cn=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}((()=>new un),(e=>e.reset()));class un{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}function ln(e){Ke.setTimeout((()=>{throw e}),0)}function hn(e,t){an||function(){var e=Ke.Promise.resolve(void 0);an=function(){e.then(pn)}}(),dn||(an(),dn=!0),fn.add(e,t)}var dn=!1,fn=new class{constructor(){this.h=this.g=null}add(e,t){const n=cn.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}};function pn(){for(var e;e=on();){try{e.h.call(e.g)}catch(e){ln(e)}var t=cn;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}dn=!1}function mn(e,t){tn.call(this),this.h=e||1,this.g=t||Ke,this.j=Je(this.lb,this),this.l=Date.now()}function gn(e){e.ca=!1,e.R&&(e.g.clearTimeout(e.R),e.R=null)}function yn(e,t,n){if("function"==typeof e)n&&(e=Je(e,n));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=Je(e.handleEvent,e)}return 2147483647<Number(t)?-1:Ke.setTimeout(e,t||0)}function vn(e){e.g=yn((()=>{e.g=null,e.i&&(e.i=!1,vn(e))}),e.j);const t=e.h;e.h=null,e.m.apply(null,t)}et(mn,tn),(Be=mn.prototype).ca=!1,Be.R=null,Be.lb=function(){if(this.ca){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.R=this.g.setTimeout(this.j,this.h-e):(this.R&&(this.g.clearTimeout(this.R),this.R=null),nn(this,"tick"),this.ca&&(gn(this),this.start()))}},Be.start=function(){this.ca=!0,this.R||(this.R=this.g.setTimeout(this.j,this.h),this.l=Date.now())},Be.M=function(){mn.X.M.call(this),gn(this),delete this.g};class wn extends tt{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:vn(this)}M(){super.M(),this.g&&(Ke.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function En(e){tt.call(this),this.h=e,this.g={}}et(En,tt);var In=[];function Tn(e,t,n,s){Array.isArray(n)||(n&&(In[0]=n.toString()),n=In);for(var i=0;i<n.length;i++){var r=Gt(t,n[i],s||e.handleEvent,!1,e.h||e);if(!r)break;e.g[r.key]=r}}function _n(e){Ut(e.g,(function(e,t){this.g.hasOwnProperty(t)&&Qt(e)}),e),e.g={}}function bn(){this.g=!0}function Sn(e,t,n,s){e.info((function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n)for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var s=n[e];if(!(2>s.length)){var i=s[1];if(Array.isArray(i)&&!(1>i.length)){var r=i[0];if("noop"!=r&&"stop"!=r&&"close"!=r)for(var o=1;o<i.length;o++)i[o]=""}}}return rn(n)}catch(e){return t}}(e,n)+(s?" "+s:"")}))}En.prototype.M=function(){En.X.M.call(this),_n(this)},En.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},bn.prototype.Aa=function(){this.g=!1},bn.prototype.info=function(){};var An={},kn=null;function Cn(){return kn=kn||new tn}function Nn(e){rt.call(this,An.Pa,e)}function Dn(e){const t=Cn();nn(t,new Nn(t))}function Rn(e,t){rt.call(this,An.STAT_EVENT,e),this.stat=t}function On(e){const t=Cn();nn(t,new Rn(t,e))}function Ln(e,t){rt.call(this,An.Qa,e),this.size=t}function Mn(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return Ke.setTimeout((function(){e()}),t)}An.Pa="serverreachability",et(Nn,rt),An.STAT_EVENT="statevent",et(Rn,rt),An.Qa="timingevent",et(Ln,rt);var Pn={NO_ERROR:0,mb:1,zb:2,yb:3,tb:4,xb:5,Ab:6,Ma:7,TIMEOUT:8,Db:9},Un={rb:"complete",Nb:"success",Na:"error",Ma:"abort",Fb:"ready",Gb:"readystatechange",TIMEOUT:"timeout",Bb:"incrementaldata",Eb:"progress",ub:"downloadprogress",Vb:"uploadprogress"};function xn(){}function Vn(e){return e.h||(e.h=e.i())}function Fn(){}xn.prototype.h=null;var Bn,qn={OPEN:"a",qb:"b",Na:"c",Cb:"d"};function jn(){rt.call(this,"d")}function Hn(){rt.call(this,"c")}function Kn(){}function Gn(e,t,n,s){this.l=e,this.j=t,this.m=n,this.U=s||1,this.S=new En(this),this.O=$n,e=vt?125:void 0,this.T=new mn(e),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.V=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.Y=-1,this.I=!1,this.N=0,this.L=null,this.$=this.J=this.Z=this.P=!1,this.h=new zn}function zn(){this.i=null,this.g="",this.h=!1}et(jn,rt),et(Hn,rt),et(Kn,xn),Kn.prototype.g=function(){return new XMLHttpRequest},Kn.prototype.i=function(){return{}},Bn=new Kn;var $n=45e3,Wn={},Qn={};function Xn(e,t,n){e.K=1,e.v=ms(ls(t)),e.s=n,e.P=!0,Yn(e,null)}function Yn(e,t){e.F=Date.now(),ts(e),e.A=ls(e.v);var n=e.A,s=e.U;Array.isArray(s)||(s=[String(s)]),Cs(n.i,"t",s),e.C=0,n=e.l.H,e.h=new zn,e.g=ki(e.l,n?t:null,!e.s),0<e.N&&(e.L=new wn(Je(e.La,e,e.g),e.N)),Tn(e.S,e.g,"readystatechange",e.ib),t=e.H?xt(e.H):{},e.s?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.da(e.A,e.u,e.s,t)):(e.u="GET",e.g.da(e.A,e.u,null,t)),Dn(),function(e,t,n,s,i,r){e.info((function(){if(e.g)if(r)for(var o="",a=r.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var l=u[0];u=u[1];var h=l.split("_");o=2<=h.length&&"type"==h[1]?o+(l+"=")+u+"&":o+(l+"=redacted&")}}else o=null;else o=r;return"XMLHTTP REQ ("+s+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o}))}(e.j,e.u,e.A,e.m,e.U,e.s)}function Jn(e){return!!e.g&&("GET"==e.u&&2!=e.K&&e.l.Da)}function Zn(e,t,n){let s,i=!0;for(;!e.I&&e.C<n.length;){if(s=es(e,n),s==Qn){4==t&&(e.o=4,On(14),i=!1),Sn(e.j,e.m,null,"[Incomplete Response]");break}if(s==Wn){e.o=4,On(15),Sn(e.j,e.m,n,"[Invalid Chunk]"),i=!1;break}Sn(e.j,e.m,s,null),os(e,s)}Jn(e)&&s!=Qn&&s!=Wn&&(e.h.g="",e.C=0),4!=t||0!=n.length||e.h.h||(e.o=1,On(16),i=!1),e.i=e.i&&i,i?0<n.length&&!e.$&&(e.$=!0,(t=e.l).g==e&&t.$&&!t.K&&(t.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),wi(t),t.K=!0,On(11))):(Sn(e.j,e.m,n,"[Invalid Chunked Response]"),rs(e),is(e))}function es(e,t){var n=e.C,s=t.indexOf("\n",n);return-1==s?Qn:(n=Number(t.substring(n,s)),isNaN(n)?Wn:(s+=1)+n>t.length?Qn:(t=t.substr(s,n),e.C=s+n,t))}function ts(e){e.V=Date.now()+e.O,ns(e,e.O)}function ns(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=Mn(Je(e.gb,e),t)}function ss(e){e.B&&(Ke.clearTimeout(e.B),e.B=null)}function is(e){0==e.l.G||e.I||Ti(e.l,e)}function rs(e){ss(e);var t=e.L;t&&"function"==typeof t.na&&t.na(),e.L=null,gn(e.T),_n(e.S),e.g&&(t=e.g,e.g=null,t.abort(),t.na())}function os(e,t){try{var n=e.l;if(0!=n.G&&(n.g==e||Ms(n.h,e)))if(!e.J&&Ms(n.h,e)&&3==n.G){try{var s=n.Fa.g.parse(t)}catch(e){s=null}if(Array.isArray(s)&&3==s.length){var i=s;if(0==i[0]){e:if(!n.u){if(n.g){if(!(n.g.F+3e3<e.F))break e;Ii(n),hi(n)}vi(n),On(18)}}else n.Ba=i[1],0<n.Ba-n.T&&37500>i[2]&&n.L&&0==n.A&&!n.v&&(n.v=Mn(Je(n.cb,n),6e3));if(1>=Ls(n.h)&&n.ja){try{n.ja()}catch(e){}n.ja=void 0}}else bi(n,11)}else if((e.J||n.g==e)&&Ii(n),!at(t))for(i=n.Fa.g.parse(t),t=0;t<i.length;t++){let u=i[t];if(n.T=u[0],u=u[1],2==n.G)if("c"==u[0]){n.I=u[1],n.ka=u[2];const t=u[3];null!=t&&(n.ma=t,n.j.info("VER="+n.ma));const i=u[4];null!=i&&(n.Ca=i,n.j.info("SVER="+n.Ca));const l=u[5];null!=l&&"number"==typeof l&&0<l&&(s=1.5*l,n.J=s,n.j.info("backChannelRequestTimeoutMs_="+s)),s=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var r=s.h;r.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(r.j=r.l,r.g=new Set,r.h&&(Ps(r,r.h),r.h=null))}if(s.D){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(s.za=e,ps(s.F,s.D,e))}}n.G=3,n.l&&n.l.xa(),n.$&&(n.P=Date.now()-e.F,n.j.info("Handshake RTT: "+n.P+"ms"));var o=e;if((s=n).sa=Ai(s,s.H?s.ka:null,s.V),o.J){Us(s.h,o);var a=o,c=s.J;c&&a.setTimeout(c),a.B&&(ss(a),ts(a)),s.g=o}else yi(s);0<n.i.length&&fi(n)}else"stop"!=u[0]&&"close"!=u[0]||bi(n,7);else 3==n.G&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?bi(n,7):li(n):"noop"!=u[0]&&n.l&&n.l.wa(u),n.A=0)}Dn()}catch(e){}}function as(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(ze(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=function(e){if(e.oa&&"function"==typeof e.oa)return e.oa();if(!e.W||"function"!=typeof e.W){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(ze(e)||"string"==typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}t=[],n=0;for(const s in e)t[n++]=s;return t}}}(e),s=function(e){if(e.W&&"function"==typeof e.W)return e.W();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(ze(e)){for(var t=[],n=e.length,s=0;s<n;s++)t.push(e[s]);return t}for(s in t=[],n=0,e)t[n++]=e[s];return t}(e),i=s.length,r=0;r<i;r++)t.call(void 0,s[r],n&&n[r],e)}(Be=Gn.prototype).setTimeout=function(e){this.O=e},Be.ib=function(e){e=e.target;const t=this.L;t&&3==ii(e)?t.l():this.La(e)},Be.La=function(e){try{if(e==this.g)e:{const l=ii(this.g);var t=this.g.Ea();this.g.aa();if(!(3>l)&&(3!=l||vt||this.g&&(this.h.h||this.g.fa()||ri(this.g)))){this.I||4!=l||7==t||Dn(),ss(this);var n=this.g.aa();this.Y=n;t:if(Jn(this)){var s=ri(this.g);e="";var i=s.length,r=4==ii(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){rs(this),is(this);var o="";break t}this.h.i=new Ke.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(s[t],{stream:r&&t==i-1});s.splice(0,i),this.h.g+=e,this.C=0,o=this.h.g}else o=this.g.fa();if(this.i=200==n,function(e,t,n,s,i,r,o){e.info((function(){return"XMLHTTP RESP ("+s+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+r+" "+o}))}(this.j,this.u,this.A,this.m,this.U,l,n),this.i){if(this.Z&&!this.J){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!at(a)){var u=a;break t}}u=null}if(!(n=u)){this.i=!1,this.o=3,On(12),rs(this),is(this);break e}Sn(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,os(this,n)}this.P?(Zn(this,l,o),vt&&this.i&&3==l&&(Tn(this.S,this.T,"tick",this.hb),this.T.start())):(Sn(this.j,this.m,o,null),os(this,o)),4==l&&rs(this),this.i&&!this.I&&(4==l?Ti(this.l,this):(this.i=!1,ts(this)))}else 400==n&&0<o.indexOf("Unknown SID")?(this.o=3,On(12)):(this.o=0,On(13)),rs(this),is(this)}}}catch(e){}},Be.hb=function(){if(this.g){var e=ii(this.g),t=this.g.fa();this.C<t.length&&(ss(this),Zn(this,e,t),this.i&&4!=e&&ts(this))}},Be.cancel=function(){this.I=!0,rs(this)},Be.gb=function(){this.B=null;const e=Date.now();0<=e-this.V?(function(e,t){e.info((function(){return"TIMEOUT: "+t}))}(this.j,this.A),2!=this.K&&(Dn(),On(17)),rs(this),this.o=2,is(this)):ns(this,this.V-e)};var cs=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function us(e,t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,e instanceof us){this.h=void 0!==t?t:e.h,hs(this,e.j),this.s=e.s,this.g=e.g,ds(this,e.m),this.l=e.l,t=e.i;var n=new bs;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),fs(this,n),this.o=e.o}else e&&(n=String(e).match(cs))?(this.h=!!t,hs(this,n[1]||"",!0),this.s=gs(n[2]||""),this.g=gs(n[3]||"",!0),ds(this,n[4]),this.l=gs(n[5]||"",!0),fs(this,n[6]||"",!0),this.o=gs(n[7]||"")):(this.h=!!t,this.i=new bs(null,this.h))}function ls(e){return new us(e)}function hs(e,t,n){e.j=n?gs(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function ds(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function fs(e,t,n){t instanceof bs?(e.i=t,function(e,t){t&&!e.j&&(Ss(e),e.i=null,e.g.forEach((function(e,t){var n=t.toLowerCase();t!=n&&(As(this,t),Cs(this,n,e))}),e)),e.j=t}(e.i,e.h)):(n||(t=ys(t,Ts)),e.i=new bs(t,e.h))}function ps(e,t,n){e.i.set(t,n)}function ms(e){return ps(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function gs(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function ys(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,vs),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function vs(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}us.prototype.toString=function(){var e=[],t=this.j;t&&e.push(ys(t,ws,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.s)&&e.push(ys(t,ws,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.m)&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(ys(n,"/"==n.charAt(0)?Is:Es,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.o)&&e.push("#",ys(n,_s)),e.join("")};var ws=/[#\/\?@]/g,Es=/[#\?:]/g,Is=/[#\?]/g,Ts=/[#\?@]/g,_s=/#/g;function bs(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function Ss(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var s=e[n].indexOf("="),i=null;if(0<=s){var r=e[n].substring(0,s);i=e[n].substring(s+1)}else r=e[n];t(r,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,(function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)})))}function As(e,t){Ss(e),t=Ns(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function ks(e,t){return Ss(e),t=Ns(e,t),e.g.has(t)}function Cs(e,t,n){As(e,t),0<n.length&&(e.i=null,e.g.set(Ns(e,t),st(n)),e.h+=n.length)}function Ns(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}(Be=bs.prototype).add=function(e,t){Ss(this),this.i=null,e=Ns(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},Be.forEach=function(e,t){Ss(this),this.g.forEach((function(n,s){n.forEach((function(n){e.call(t,n,s,this)}),this)}),this)},Be.oa=function(){Ss(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let s=0;s<t.length;s++){const i=e[s];for(let e=0;e<i.length;e++)n.push(t[s])}return n},Be.W=function(e){Ss(this);let t=[];if("string"==typeof e)ks(this,e)&&(t=t.concat(this.g.get(Ns(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},Be.set=function(e,t){return Ss(this),this.i=null,ks(this,e=Ns(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},Be.get=function(e,t){return e&&0<(e=this.W(e)).length?String(e[0]):t},Be.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var s=t[n];const r=encodeURIComponent(String(s)),o=this.W(s);for(s=0;s<o.length;s++){var i=r;""!==o[s]&&(i+="="+encodeURIComponent(String(o[s]))),e.push(i)}}return this.i=e.join("&")};function Ds(e){this.l=e||Rs,Ke.PerformanceNavigationTiming?e=0<(e=Ke.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(Ke.g&&Ke.g.Ga&&Ke.g.Ga()&&Ke.g.Ga().$b),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Rs=10;function Os(e){return!!e.h||!!e.g&&e.g.size>=e.j}function Ls(e){return e.h?1:e.g?e.g.size:0}function Ms(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function Ps(e,t){e.g?e.g.add(t):e.h=t}function Us(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function xs(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return st(e.i)}function Vs(){}function Fs(){this.g=new Vs}function Bs(e,t,n){const s=n||"";try{as(e,(function(e,n){let i=e;$e(e)&&(i=rn(e)),t.push(s+n+"="+encodeURIComponent(i))}))}catch(e){throw t.push(s+"type="+encodeURIComponent("_badmap")),e}}function qs(e,t,n,s,i){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,i(s)}catch(e){}}function js(e){this.l=e.ac||null,this.j=e.jb||!1}function Hs(e,t){tn.call(this),this.D=e,this.u=t,this.m=void 0,this.readyState=Ks,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}Ds.prototype.cancel=function(){if(this.i=xs(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}},Vs.prototype.stringify=function(e){return Ke.JSON.stringify(e,void 0)},Vs.prototype.parse=function(e){return Ke.JSON.parse(e,void 0)},et(js,xn),js.prototype.g=function(){return new Hs(this.l,this.j)},js.prototype.i=function(e){return function(){return e}}({}),et(Hs,tn);var Ks=0;function Gs(e){e.j.read().then(e.Ta.bind(e)).catch(e.ga.bind(e))}function zs(e){e.readyState=4,e.l=null,e.j=null,e.A=null,$s(e)}function $s(e){e.onreadystatechange&&e.onreadystatechange.call(e)}(Be=Hs.prototype).open=function(e,t){if(this.readyState!=Ks)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,$s(this)},Be.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||Ke).fetch(new Request(this.B,t)).then(this.Wa.bind(this),this.ga.bind(this))},Be.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch((()=>{})),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,zs(this)),this.readyState=Ks},Be.Wa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,$s(this)),this.g&&(this.readyState=3,$s(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Ua.bind(this),this.ga.bind(this));else if(void 0!==Ke.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Gs(this)}else e.text().then(this.Va.bind(this),this.ga.bind(this))},Be.Ta=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?zs(this):$s(this),3==this.readyState&&Gs(this)}},Be.Va=function(e){this.g&&(this.response=this.responseText=e,zs(this))},Be.Ua=function(e){this.g&&(this.response=e,zs(this))},Be.ga=function(){this.g&&zs(this)},Be.setRequestHeader=function(e,t){this.v.append(e,t)},Be.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},Be.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(Hs.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}});var Ws=Ke.JSON.parse;function Qs(e){tn.call(this),this.headers=new Map,this.u=e||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=Xs,this.K=this.L=!1}et(Qs,tn);var Xs="",Ys=/^https?$/i,Js=["POST","PUT"];function Zs(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,ei(e),ni(e)}function ei(e){e.D||(e.D=!0,nn(e,"complete"),nn(e,"error"))}function ti(e){if(e.h&&void 0!==He&&(!e.C[1]||4!=ii(e)||2!=e.aa()))if(e.v&&4==ii(e))yn(e.Ha,0,e);else if(nn(e,"readystatechange"),4==ii(e)){e.h=!1;try{const a=e.aa();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var s;if(s=0===a){var i=String(e.H).match(cs)[1]||null;if(!i&&Ke.self&&Ke.self.location){var r=Ke.self.location.protocol;i=r.substr(0,r.length-1)}s=!Ys.test(i?i.toLowerCase():"")}n=s}if(n)nn(e,"complete"),nn(e,"success");else{e.m=6;try{var o=2<ii(e)?e.g.statusText:""}catch(e){o=""}e.j=o+" ["+e.aa()+"]",ei(e)}}finally{ni(e)}}}function ni(e,t){if(e.g){si(e);const n=e.g,s=e.C[0]?Ge:null;e.g=null,e.C=null,t||nn(e,"ready");try{n.onreadystatechange=s}catch(e){}}}function si(e){e.g&&e.K&&(e.g.ontimeout=null),e.A&&(Ke.clearTimeout(e.A),e.A=null)}function ii(e){return e.g?e.g.readyState:0}function ri(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.J){case Xs:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function oi(e){let t="";return Ut(e,(function(e,n){t+=n,t+=":",t+=e,t+="\r\n"})),t}function ai(e,t,n){e:{for(s in n){var s=!1;break e}s=!0}s||(n=oi(n),"string"==typeof e?null!=n&&encodeURIComponent(String(n)):ps(e,t,n))}function ci(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function ui(e){this.Ca=0,this.i=[],this.j=new bn,this.ka=this.sa=this.F=this.V=this.g=this.za=this.D=this.ia=this.o=this.S=this.s=null,this.ab=this.U=0,this.Za=ci("failFast",!1,e),this.L=this.v=this.u=this.m=this.l=null,this.Y=!0,this.pa=this.Ba=this.T=-1,this.Z=this.A=this.C=0,this.Xa=ci("baseRetryDelayMs",5e3,e),this.bb=ci("retryDelaySeedMs",1e4,e),this.$a=ci("forwardChannelMaxRetries",2,e),this.ta=ci("forwardChannelRequestTimeoutMs",2e4,e),this.ra=e&&e.xmlHttpFactory||void 0,this.Da=e&&e.Zb||!1,this.J=void 0,this.H=e&&e.supportsCrossDomainXhr||!1,this.I="",this.h=new Ds(e&&e.concurrentRequestLimit),this.Fa=new Fs,this.O=e&&e.fastHandshake||!1,this.N=e&&e.encodeInitMessageHeaders||!1,this.O&&this.N&&(this.N=!1),this.Ya=e&&e.Xb||!1,e&&e.Aa&&this.j.Aa(),e&&e.forceLongPolling&&(this.Y=!1),this.$=!this.O&&this.Y&&e&&e.detectBufferingProxy||!1,this.ja=void 0,this.P=0,this.K=!1,this.la=this.B=null}function li(e){if(di(e),3==e.G){var t=e.U++,n=ls(e.F);ps(n,"SID",e.I),ps(n,"RID",t),ps(n,"TYPE","terminate"),mi(e,n),(t=new Gn(e,e.j,t,void 0)).K=2,t.v=ms(ls(n)),n=!1,Ke.navigator&&Ke.navigator.sendBeacon&&(n=Ke.navigator.sendBeacon(t.v.toString(),"")),!n&&Ke.Image&&((new Image).src=t.v,n=!0),n||(t.g=ki(t.l,null),t.g.da(t.v)),t.F=Date.now(),ts(t)}Si(e)}function hi(e){e.g&&(wi(e),e.g.cancel(),e.g=null)}function di(e){hi(e),e.u&&(Ke.clearTimeout(e.u),e.u=null),Ii(e),e.h.cancel(),e.m&&("number"==typeof e.m&&Ke.clearTimeout(e.m),e.m=null)}function fi(e){Os(e.h)||e.m||(e.m=!0,hn(e.Ja,e),e.C=0)}function pi(e,t){var n;n=t?t.m:e.U++;const s=ls(e.F);ps(s,"SID",e.I),ps(s,"RID",n),ps(s,"AID",e.T),mi(e,s),e.o&&e.s&&ai(s,e.o,e.s),n=new Gn(e,e.j,n,e.C+1),null===e.o&&(n.H=e.s),t&&(e.i=t.D.concat(e.i)),t=gi(e,n,1e3),n.setTimeout(Math.round(.5*e.ta)+Math.round(.5*e.ta*Math.random())),Ps(e.h,n),Xn(n,s,t)}function mi(e,t){e.ia&&Ut(e.ia,(function(e,n){ps(t,n,e)})),e.l&&as({},(function(e,n){ps(t,n,e)}))}function gi(e,t,n){n=Math.min(e.i.length,n);var s=e.l?Je(e.l.Ra,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?0<n?(t=i[0].h,e.push("ofs="+t)):t=0:e.push("ofs="+t);let r=!0;for(let o=0;o<n;o++){let n=i[o].h;const a=i[o].g;if(n-=t,0>n)t=Math.max(0,i[o].h-100),r=!1;else try{Bs(a,e,"req"+n+"_")}catch(e){s&&s(a)}}if(r){s=e.join("&");break e}}}return e=e.i.splice(0,n),t.D=e,s}function yi(e){e.g||e.u||(e.Z=1,hn(e.Ia,e),e.A=0)}function vi(e){return!(e.g||e.u||3<=e.A)&&(e.Z++,e.u=Mn(Je(e.Ia,e),_i(e,e.A)),e.A++,!0)}function wi(e){null!=e.B&&(Ke.clearTimeout(e.B),e.B=null)}function Ei(e){e.g=new Gn(e,e.j,"rpc",e.Z),null===e.o&&(e.g.H=e.s),e.g.N=0;var t=ls(e.sa);ps(t,"RID","rpc"),ps(t,"SID",e.I),ps(t,"CI",e.L?"0":"1"),ps(t,"AID",e.T),ps(t,"TYPE","xmlhttp"),mi(e,t),e.o&&e.s&&ai(t,e.o,e.s),e.J&&e.g.setTimeout(e.J);var n=e.g;e=e.ka,n.K=1,n.v=ms(ls(t)),n.s=null,n.P=!0,Yn(n,e)}function Ii(e){null!=e.v&&(Ke.clearTimeout(e.v),e.v=null)}function Ti(e,t){var n=null;if(e.g==t){Ii(e),wi(e),e.g=null;var s=2}else{if(!Ms(e.h,t))return;n=t.D,Us(e.h,t),s=1}if(0!=e.G)if(e.pa=t.Y,t.i)if(1==s){n=t.s?t.s.length:0,t=Date.now()-t.F;var i=e.C;nn(s=Cn(),new Ln(s,n)),fi(e)}else yi(e);else if(3==(i=t.o)||0==i&&0<e.pa||!(1==s&&function(e,t){return!(Ls(e.h)>=e.h.j-(e.m?1:0)||(e.m?(e.i=t.D.concat(e.i),0):1==e.G||2==e.G||e.C>=(e.Za?0:e.$a)||(e.m=Mn(Je(e.Ja,e,t),_i(e,e.C)),e.C++,0)))}(e,t)||2==s&&vi(e)))switch(n&&0<n.length&&(t=e.h,t.i=t.i.concat(n)),i){case 1:bi(e,5);break;case 4:bi(e,10);break;case 3:bi(e,6);break;default:bi(e,2)}}function _i(e,t){let n=e.Xa+Math.floor(Math.random()*e.bb);return e.l||(n*=2),n*t}function bi(e,t){if(e.j.info("Error code "+t),2==t){var n=null;e.l&&(n=null);var s=Je(e.kb,e);n||(n=new us("//www.google.com/images/cleardot.gif"),Ke.location&&"http"==Ke.location.protocol||hs(n,"https"),ms(n)),function(e,t){const n=new bn;if(Ke.Image){const s=new Image;s.onload=Ze(qs,n,s,"TestLoadImage: loaded",!0,t),s.onerror=Ze(qs,n,s,"TestLoadImage: error",!1,t),s.onabort=Ze(qs,n,s,"TestLoadImage: abort",!1,t),s.ontimeout=Ze(qs,n,s,"TestLoadImage: timeout",!1,t),Ke.setTimeout((function(){s.ontimeout&&s.ontimeout()}),1e4),s.src=e}else t(!1)}(n.toString(),s)}else On(2);e.G=0,e.l&&e.l.va(t),Si(e),di(e)}function Si(e){if(e.G=0,e.la=[],e.l){const t=xs(e.h);0==t.length&&0==e.i.length||(it(e.la,t),it(e.la,e.i),e.h.i.length=0,st(e.i),e.i.length=0),e.l.ua()}}function Ai(e,t,n){var s=n instanceof us?ls(n):new us(n,void 0);if(""!=s.g)t&&(s.g=t+"."+s.g),ds(s,s.m);else{var i=Ke.location;s=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var r=new us(null,void 0);s&&hs(r,s),t&&(r.g=t),i&&ds(r,i),n&&(r.l=n),s=r}return n=e.D,t=e.za,n&&t&&ps(s,n,t),ps(s,"VER",e.ma),mi(e,s),s}function ki(e,t,n){if(t&&!e.H)throw Error("Can't create secondary domain capable XhrIo object.");return(t=n&&e.Da&&!e.ra?new Qs(new js({jb:!0})):new Qs(e.ra)).Ka(e.H),t}function Ci(){}function Ni(){if(gt&&!(10<=Number(Nt)))throw Error("Environmental error: no available transport.")}function Di(e,t){tn.call(this),this.g=new ui(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.ya&&(e?e["X-WebChannel-Client-Profile"]=t.ya:e={"X-WebChannel-Client-Profile":t.ya}),this.g.S=e,(e=t&&t.Yb)&&!at(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!at(t)&&(this.g.D=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new Li(this)}function Ri(e){jn.call(this);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function Oi(){Hn.call(this),this.status=1}function Li(e){this.g=e}(Be=Qs.prototype).Ka=function(e){this.L=e},Be.da=function(e,t,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+e);t=t?t.toUpperCase():"GET",this.H=e,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():Bn.g(),this.C=this.u?Vn(this.u):Vn(Bn),this.g.onreadystatechange=Je(this.Ha,this);try{this.F=!0,this.g.open(t,String(e),!0),this.F=!1}catch(e){return void Zs(this,e)}if(e=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var i in s)n.set(i,s[i]);else{if("function"!=typeof s.keys||"function"!=typeof s.get)throw Error("Unknown input type for opt_headers: "+String(s));for(const e of s.keys())n.set(e,s.get(e))}s=Array.from(n.keys()).find((e=>"content-type"==e.toLowerCase())),i=Ke.FormData&&e instanceof Ke.FormData,!(0<=nt(Js,t))||s||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[e,t]of n)this.g.setRequestHeader(e,t);this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{si(this),0<this.B&&((this.K=function(e){return gt&&kt()&&"number"==typeof e.timeout&&void 0!==e.ontimeout}(this.g))?(this.g.timeout=this.B,this.g.ontimeout=Je(this.qa,this)):this.A=yn(this.qa,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(e){Zs(this,e)}},Be.qa=function(){void 0!==He&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,nn(this,"timeout"),this.abort(8))},Be.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,nn(this,"complete"),nn(this,"abort"),ni(this))},Be.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),ni(this,!0)),Qs.X.M.call(this)},Be.Ha=function(){this.s||(this.F||this.v||this.l?ti(this):this.fb())},Be.fb=function(){ti(this)},Be.aa=function(){try{return 2<ii(this)?this.g.status:-1}catch(e){return-1}},Be.fa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},Be.Sa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),Ws(t)}},Be.Ea=function(){return this.m},Be.Oa=function(){return"string"==typeof this.j?this.j:String(this.j)},(Be=ui.prototype).ma=8,Be.G=1,Be.Ja=function(e){if(this.m)if(this.m=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;const i=new Gn(this,this.j,e,void 0);let r=this.s;if(this.S&&(r?(r=xt(r),Ft(r,this.S)):r=this.S),null!==this.o||this.N||(i.H=r,r=null),this.O)e:{for(var t=0,n=0;n<this.i.length;n++){var s=this.i[n];if(void 0===(s="__data__"in s.g&&"string"==typeof(s=s.g.__data__)?s.length:void 0))break;if(4096<(t+=s)){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=gi(this,i,t),ps(n=ls(this.F),"RID",e),ps(n,"CVER",22),this.D&&ps(n,"X-HTTP-Session-Id",this.D),mi(this,n),r&&(this.N?t="headers="+encodeURIComponent(String(oi(r)))+"&"+t:this.o&&ai(n,this.o,r)),Ps(this.h,i),this.Ya&&ps(n,"TYPE","init"),this.O?(ps(n,"$req",t),ps(n,"SID","null"),i.Z=!0,Xn(i,n,null)):Xn(i,n,t),this.G=2}}else 3==this.G&&(e?pi(this,e):0==this.i.length||Os(this.h)||pi(this))},Be.Ia=function(){if(this.u=null,Ei(this),this.$&&!(this.K||null==this.g||0>=this.P)){var e=2*this.P;this.j.info("BP detection timer enabled: "+e),this.B=Mn(Je(this.eb,this),e)}},Be.eb=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.L=!1,this.K=!0,On(10),hi(this),Ei(this))},Be.cb=function(){null!=this.v&&(this.v=null,hi(this),vi(this),On(19))},Be.kb=function(e){e?(this.j.info("Successfully pinged google.com"),On(2)):(this.j.info("Failed to ping google.com"),On(1))},(Be=Ci.prototype).xa=function(){},Be.wa=function(){},Be.va=function(){},Be.ua=function(){},Be.Ra=function(){},Ni.prototype.g=function(e,t){return new Di(e,t)},et(Di,tn),Di.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.H=!0);var e=this.g,t=this.l,n=this.h||void 0;On(0),e.V=t,e.ia=n||{},e.L=e.Y,e.F=Ai(e,null,e.V),fi(e)},Di.prototype.close=function(){li(this.g)},Di.prototype.u=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=rn(e),e=n);t.i.push(new class{constructor(e,t){this.h=e,this.g=t}}(t.ab++,e)),3==t.G&&fi(t)},Di.prototype.M=function(){this.g.l=null,delete this.j,li(this.g),delete this.g,Di.X.M.call(this)},et(Ri,jn),et(Oi,Hn),et(Li,Ci),Li.prototype.xa=function(){nn(this.g,"a")},Li.prototype.wa=function(e){nn(this.g,new Ri(e))},Li.prototype.va=function(e){nn(this.g,new Oi)},Li.prototype.ua=function(){nn(this.g,"b")},Ni.prototype.createWebChannel=Ni.prototype.g,Di.prototype.send=Di.prototype.u,Di.prototype.open=Di.prototype.m,Di.prototype.close=Di.prototype.close,Pn.NO_ERROR=0,Pn.TIMEOUT=8,Pn.HTTP_ERROR=6,Un.COMPLETE="complete",Fn.EventType=qn,qn.OPEN="a",qn.CLOSE="b",qn.ERROR="c",qn.MESSAGE="d",tn.prototype.listen=tn.prototype.N,Qs.prototype.listenOnce=Qs.prototype.O,Qs.prototype.getLastError=Qs.prototype.Oa,Qs.prototype.getLastErrorCode=Qs.prototype.Ea,Qs.prototype.getStatus=Qs.prototype.aa,Qs.prototype.getResponseJson=Qs.prototype.Sa,Qs.prototype.getResponseText=Qs.prototype.fa,Qs.prototype.send=Qs.prototype.da,Qs.prototype.setWithCredentials=Qs.prototype.Ka;var Mi=je.createWebChannelTransport=function(){return new Ni},Pi=je.getStatEventTarget=function(){return Cn()},Ui=je.ErrorCode=Pn,xi=je.EventType=Un,Vi=je.Event=An,Fi=je.Stat={sb:0,vb:1,wb:2,Pb:3,Ub:4,Rb:5,Sb:6,Qb:7,Ob:8,Tb:9,PROXY:10,NOPROXY:11,Mb:12,Ib:13,Jb:14,Hb:15,Kb:16,Lb:17,ob:18,nb:19,pb:20},Bi=je.FetchXmlHttpFactory=js,qi=je.WebChannel=Fn,ji=je.XhrIo=Qs;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Hi{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Hi.UNAUTHENTICATED=new Hi(null),Hi.GOOGLE_CREDENTIALS=new Hi("google-credentials-uid"),Hi.FIRST_PARTY=new Hi("first-party-uid"),Hi.MOCK_USER=new Hi("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Ki="9.13.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi=new ee("@firebase/firestore");function zi(){return Gi.logLevel}function $i(e,...t){if(Gi.logLevel<=W.DEBUG){const n=t.map(Xi);Gi.debug(`Firestore (${Ki}): ${e}`,...n)}}function Wi(e,...t){if(Gi.logLevel<=W.ERROR){const n=t.map(Xi);Gi.error(`Firestore (${Ki}): ${e}`,...n)}}function Qi(e,...t){if(Gi.logLevel<=W.WARN){const n=t.map(Xi);Gi.warn(`Firestore (${Ki}): ${e}`,...n)}}function Xi(e){if("string"==typeof e)return e;try{return t=e,JSON.stringify(t)}catch(t){return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yi(e="Unexpected state"){const t=`FIRESTORE (${Ki}) INTERNAL ASSERTION FAILED: `+e;throw Wi(t),new Error(t)}function Ji(e,t){e||Yi()}function Zi(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class tr extends R{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ir{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Hi.UNAUTHENTICATED)))}shutdown(){}}class rr{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class or{constructor(e){this.t=e,this.currentUser=Hi.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let n=this.i;const s=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new nr;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new nr,e.enqueueRetryable((()=>s(this.currentUser)))};const r=()=>{const t=i;e.enqueueRetryable((async()=>{await t.promise,await s(this.currentUser)}))},o=e=>{$i("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),r()};this.t.onInit((e=>o(e))),setTimeout((()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):($i("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new nr)}}),0),r()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((t=>this.i!==e?($i("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(Ji("string"==typeof t.accessToken),new sr(t.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return Ji(null===e||"string"==typeof e),new Hi(e)}}class ar{constructor(e,t,n,s){this.h=e,this.l=t,this.m=n,this.g=s,this.type="FirstParty",this.user=Hi.FIRST_PARTY,this.p=new Map}I(){return this.g?this.g():(Ji(!("object"!=typeof this.h||null===this.h||!this.h.auth||!this.h.auth.getAuthHeaderValueForFirstParty)),this.h.auth.getAuthHeaderValueForFirstParty([]))}get headers(){this.p.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.p.set("Authorization",e),this.m&&this.p.set("X-Goog-Iam-Authorization-Token",this.m),this.p}}class cr{constructor(e,t,n,s){this.h=e,this.l=t,this.m=n,this.g=s}getToken(){return Promise.resolve(new ar(this.h,this.l,this.m,this.g))}start(e,t){e.enqueueRetryable((()=>t(Hi.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class ur{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class lr{constructor(e){this.T=e,this.forceRefresh=!1,this.appCheck=null,this.A=null}start(e,t){const n=e=>{null!=e.error&&$i("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.A;return this.A=e.token,$i("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable((()=>n(t)))};const s=e=>{$i("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.T.onInit((e=>s(e))),setTimeout((()=>{if(!this.appCheck){const e=this.T.getImmediate({optional:!0});e?s(e):$i("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((e=>e?(Ji("string"==typeof e.token),this.A=e.token,new ur(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function hr(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{static R(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const s=hr(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%e.length))}return n}}function fr(e,t){return e<t?-1:e>t?1:0}function pr(e,t,n){return e.length===t.length&&e.every(((e,s)=>n(e,t[s])))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mr{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new tr(er.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new tr(er.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new tr(er.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new tr(er.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return mr.fromMillis(Date.now())}static fromDate(e){return mr.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new mr(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?fr(this.nanoseconds,e.nanoseconds):fr(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e){this.timestamp=e}static fromTimestamp(e){return new gr(e)}static min(){return new gr(new mr(0,0))}static max(){return new gr(new mr(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(e,t,n){void 0===t?t=0:t>e.length&&Yi(),void 0===n?n=e.length-t:n>e.length-t&&Yi(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===yr.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof yr?e.forEach((e=>{t.push(e)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const n=e.get(s),i=t.get(s);if(n<i)return-1;if(n>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class vr extends yr{construct(e,t,n){return new vr(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new tr(er.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((e=>e.length>0)))}return new vr(t)}static emptyPath(){return new vr([])}}const wr=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Er extends yr{construct(e,t,n){return new Er(e,t,n)}static isValidIdentifier(e){return wr.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Er.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new Er(["__name__"])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(0===n.length)throw new tr(er.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let r=!1;for(;s<e.length;){const t=e[s];if("\\"===t){if(s+1===e.length)throw new tr(er.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[s+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new tr(er.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,s+=2}else"`"===t?(r=!r,s++):"."!==t||r?(n+=t,s++):(i(),s++)}if(i(),r)throw new tr(er.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Er(t)}static emptyPath(){return new Er([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(e){this.path=e}static fromPath(e){return new Ir(vr.fromString(e))}static fromName(e){return new Ir(vr.fromString(e).popFirst(5))}static empty(){return new Ir(vr.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===vr.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return vr.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Ir(new vr(e.slice()))}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}Tr.UNKNOWN_ID=-1;function _r(e,t){const n=e.toTimestamp().seconds,s=e.toTimestamp().nanoseconds+1,i=gr.fromTimestamp(1e9===s?new mr(n+1,0):new mr(n,s));return new Sr(i,Ir.empty(),t)}function br(e){return new Sr(e.readTime,e.key,-1)}class Sr{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Sr(gr.min(),Ir.empty(),-1)}static max(){return new Sr(gr.max(),Ir.empty(),-1)}}function Ar(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=Ir.comparator(e.documentKey,t.documentKey),0!==n?n:fr(e.largestBatchId,t.largestBatchId))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kr="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Cr{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nr(e){if(e.code!==er.FAILED_PRECONDITION||e.message!==kr)throw e;$i("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Yi(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new Dr(((n,s)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,s)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof Dr?t:Dr.resolve(t)}catch(e){return Dr.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):Dr.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):Dr.reject(t)}static resolve(e){return new Dr(((t,n)=>{t(e)}))}static reject(e){return new Dr(((t,n)=>{n(e)}))}static waitFor(e){return new Dr(((t,n)=>{let s=0,i=0,r=!1;e.forEach((e=>{++s,e.next((()=>{++i,r&&i===s&&t()}),(e=>n(e)))})),r=!0,i===s&&t()}))}static or(e){let t=Dr.resolve(!1);for(const n of e)t=t.next((e=>e?Dr.resolve(e):n()));return t}static forEach(e,t){const n=[];return e.forEach(((e,s)=>{n.push(t.call(this,e,s))})),this.waitFor(n)}static mapArray(e,t){return new Dr(((n,s)=>{const i=e.length,r=new Array(i);let o=0;for(let a=0;a<i;a++){const c=a;t(e[c]).next((e=>{r[c]=e,++o,o===i&&n(r)}),(e=>s(e)))}}))}static doWhile(e,t){return new Dr(((n,s)=>{const i=()=>{!0===e()?t().next((()=>{i()}),s):n()};i()}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rr(e){return"IndexedDbTransactionError"===e.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Or{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ut(e),this.ct=e=>t.writeSequenceNumber(e))}ut(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ct&&this.ct(e),e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lr(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function Mr(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function Pr(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Or.at=-1;class Ur{constructor(e,t){this.comparator=e,this.root=t||Vr.EMPTY}insert(e,t){return new Ur(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Vr.BLACK,null,null))}remove(e){return new Ur(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Vr.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(0===s)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new xr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new xr(this.root,e,this.comparator,!1)}getReverseIterator(){return new xr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new xr(this.root,e,this.comparator,!0)}}class xr{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Vr{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=null!=n?n:Vr.RED,this.left=null!=s?s:Vr.EMPTY,this.right=null!=i?i:Vr.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new Vr(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=s?s:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):0===i?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Vr.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),0===t(e,s.key)){if(s.right.isEmpty())return Vr.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Vr.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Vr.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Yi();if(this.right.isRed())throw Yi();const e=this.left.check();if(e!==this.right.check())throw Yi();return e+(this.isRed()?0:1)}}Vr.EMPTY=null,Vr.RED=!0,Vr.BLACK=!1,Vr.EMPTY=new class{constructor(){this.size=0}get key(){throw Yi()}get value(){throw Yi()}get color(){throw Yi()}get left(){throw Yi()}get right(){throw Yi()}copy(e,t,n,s,i){return this}insert(e,t,n){return new Vr(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fr{constructor(e){this.comparator=e,this.data=new Ur(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Br(this.data.getIterator())}getIteratorFrom(e){return new Br(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((e=>{t=t.add(e)})),t}isEqual(e){if(!(e instanceof Fr))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,s=n.getNext().key;if(0!==this.comparator(e,s))return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Fr(this.comparator);return t.data=e,t}}class Br{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qr{constructor(e){this.fields=e,e.sort(Er.comparator)}static empty(){return new qr([])}unionWith(e){let t=new Fr(Er.comparator);for(const e of this.fields)t=t.add(e);for(const n of e)t=t.add(n);return new qr(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return pr(this.fields,e.fields,((e,t)=>e.isEqual(t)))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jr{constructor(e){this.binaryString=e}static fromBase64String(e){const t=atob(e);return new jr(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new jr(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){var e;return e=this.binaryString,btoa(e)}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return fr(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}jr.EMPTY_BYTE_STRING=new jr("");const Hr=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Kr(e){if(Ji(!!e),"string"==typeof e){let t=0;const n=Hr.exec(e);if(Ji(!!n),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const s=new Date(e);return{seconds:Math.floor(s.getTime()/1e3),nanos:t}}return{seconds:Gr(e.seconds),nanos:Gr(e.nanos)}}function Gr(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function zr(e){return"string"==typeof e?jr.fromBase64String(e):jr.fromUint8Array(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $r(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function Wr(e){const t=e.mapValue.fields.__previous_value__;return $r(t)?Wr(t):t}function Qr(e){const t=Kr(e.mapValue.fields.__local_write_time__.timestampValue);return new mr(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(e,t,n,s,i,r,o,a){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=r,this.autoDetectLongPolling=o,this.useFetchStreams=a}}class Yr{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Yr("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof Yr&&e.projectId===this.projectId&&e.database===this.database}}function Jr(e){return null==e}function Zr(e){return 0===e&&1/e==-1/0}function eo(e){return"number"==typeof e&&Number.isInteger(e)&&!Zr(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function no(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?$r(e)?4:go(e)?9007199254740991:10:Yi()}function so(e,t){if(e===t)return!0;const n=no(e);if(n!==no(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Qr(e).isEqual(Qr(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=Kr(e.timestampValue),s=Kr(t.timestampValue);return n.seconds===s.seconds&&n.nanos===s.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return zr(e.bytesValue).isEqual(zr(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Gr(e.geoPointValue.latitude)===Gr(t.geoPointValue.latitude)&&Gr(e.geoPointValue.longitude)===Gr(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Gr(e.integerValue)===Gr(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Gr(e.doubleValue),s=Gr(t.doubleValue);return n===s?Zr(n)===Zr(s):isNaN(n)&&isNaN(s)}return!1}(e,t);case 9:return pr(e.arrayValue.values||[],t.arrayValue.values||[],so);case 10:return function(e,t){const n=e.mapValue.fields||{},s=t.mapValue.fields||{};if(Lr(n)!==Lr(s))return!1;for(const e in n)if(n.hasOwnProperty(e)&&(void 0===s[e]||!so(n[e],s[e])))return!1;return!0}(e,t);default:return Yi()}}function io(e,t){return void 0!==(e.values||[]).find((e=>so(e,t)))}function ro(e,t){if(e===t)return 0;const n=no(e),s=no(t);if(n!==s)return fr(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return fr(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Gr(e.integerValue||e.doubleValue),s=Gr(t.integerValue||t.doubleValue);return n<s?-1:n>s?1:n===s?0:isNaN(n)?isNaN(s)?0:-1:1}(e,t);case 3:return oo(e.timestampValue,t.timestampValue);case 4:return oo(Qr(e),Qr(t));case 5:return fr(e.stringValue,t.stringValue);case 6:return function(e,t){const n=zr(e),s=zr(t);return n.compareTo(s)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),s=t.split("/");for(let e=0;e<n.length&&e<s.length;e++){const t=fr(n[e],s[e]);if(0!==t)return t}return fr(n.length,s.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=fr(Gr(e.latitude),Gr(t.latitude));return 0!==n?n:fr(Gr(e.longitude),Gr(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){const n=e.values||[],s=t.values||[];for(let e=0;e<n.length&&e<s.length;++e){const t=ro(n[e],s[e]);if(t)return t}return fr(n.length,s.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===to.mapValue&&t===to.mapValue)return 0;if(e===to.mapValue)return 1;if(t===to.mapValue)return-1;const n=e.fields||{},s=Object.keys(n),i=t.fields||{},r=Object.keys(i);s.sort(),r.sort();for(let e=0;e<s.length&&e<r.length;++e){const t=fr(s[e],r[e]);if(0!==t)return t;const o=ro(n[s[e]],i[r[e]]);if(0!==o)return o}return fr(s.length,r.length)}(e.mapValue,t.mapValue);default:throw Yi()}}function oo(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return fr(e,t);const n=Kr(e),s=Kr(t),i=fr(n.seconds,s.seconds);return 0!==i?i:fr(n.nanos,s.nanos)}function ao(e){return co(e)}function co(e){var t,n;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=Kr(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?zr(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,Ir.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",n=!0;for(const s of e.values||[])n?n=!1:t+=",",t+=co(s);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",s=!0;for(const i of t)s?s=!1:n+=",",n+=`${i}:${co(e.fields[i])}`;return n+"}"}(e.mapValue):Yi()}function uo(e){return!!e&&"integerValue"in e}function lo(e){return!!e&&"arrayValue"in e}function ho(e){return!!e&&"nullValue"in e}function fo(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function po(e){return!!e&&"mapValue"in e}function mo(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return Mr(e.mapValue.fields,((e,n)=>t.mapValue.fields[e]=mo(n))),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=mo(e.arrayValue.values[n]);return t}return Object.assign({},e)}function go(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class yo{constructor(e){this.value=e}static empty(){return new yo({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!po(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=mo(t)}setAll(e){let t=Er.emptyPath(),n={},s=[];e.forEach(((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,s),n={},s=[],t=i.popLast()}e?n[i.lastSegment()]=mo(e):s.push(i.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());po(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return so(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];po(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){Mr(t,((t,n)=>e[t]=n));for(const t of n)delete e[t]}clone(){return new yo(mo(this.value))}}function vo(e){const t=[];return Mr(e.fields,((e,n)=>{const s=new Er([e]);if(po(n)){const e=vo(n.mapValue).fields;if(0===e.length)t.push(s);else for(const n of e)t.push(s.child(n))}else t.push(s)})),new qr(t)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class wo{constructor(e,t,n,s,i,r){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.data=i,this.documentState=r}static newInvalidDocument(e){return new wo(e,0,gr.min(),gr.min(),yo.empty(),0)}static newFoundDocument(e,t,n){return new wo(e,1,t,gr.min(),n,0)}static newNoDocument(e,t){return new wo(e,2,t,gr.min(),yo.empty(),0)}static newUnknownDocument(e,t){return new wo(e,3,t,gr.min(),yo.empty(),2)}convertToFoundDocument(e,t){return this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=yo.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=yo.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=gr.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof wo&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new wo(this.key,this.documentType,this.version,this.readTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,t=null,n=[],s=[],i=null,r=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=r,this.endAt=o,this.ht=null}}function Io(e,t=null,n=[],s=[],i=null,r=null,o=null){return new Eo(e,t,n,s,i,r,o)}function To(e){const t=Zi(e);if(null===t.ht){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((e=>{var t;return(t=e).field.canonicalString()+t.op.toString()+ao(t.value)})).join(","),e+="|ob:",e+=t.orderBy.map((e=>function(e){return e.field.canonicalString()+e.dir}(e))).join(","),Jr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((e=>ao(e))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((e=>ao(e))).join(",")),t.ht=e}return t.ht}function _o(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!Uo(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let i=0;i<e.filters.length;i++)if(n=e.filters[i],s=t.filters[i],n.op!==s.op||!n.field.isEqual(s.field)||!so(n.value,s.value))return!1;var n,s;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Vo(e.startAt,t.startAt)&&Vo(e.endAt,t.endAt)}function bo(e){return Ir.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}class So extends class{}{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.lt(e,t,n):new Ao(e,t,n):"array-contains"===t?new Do(e,n):"in"===t?new Ro(e,n):"not-in"===t?new Oo(e,n):"array-contains-any"===t?new Lo(e,n):new So(e,t,n)}static lt(e,t,n){return"in"===t?new ko(e,n):new Co(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&this.ft(ro(t,this.value)):null!==t&&no(this.value)===no(t)&&this.ft(ro(t,this.value))}ft(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return Yi()}}dt(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class Ao extends So{constructor(e,t,n){super(e,t,n),this.key=Ir.fromName(n.referenceValue)}matches(e){const t=Ir.comparator(e.key,this.key);return this.ft(t)}}class ko extends So{constructor(e,t){super(e,"in",t),this.keys=No("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Co extends So{constructor(e,t){super(e,"not-in",t),this.keys=No("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function No(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map((e=>Ir.fromName(e.referenceValue)))}class Do extends So{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return lo(t)&&io(t.arrayValue,this.value)}}class Ro extends So{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&io(this.value.arrayValue,t)}}class Oo extends So{constructor(e,t){super(e,"not-in",t)}matches(e){if(io(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&!io(this.value.arrayValue,t)}}class Lo extends So{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!lo(t)||!t.arrayValue.values)&&t.arrayValue.values.some((e=>io(this.value.arrayValue,e)))}}class Mo{constructor(e,t){this.position=e,this.inclusive=t}}class Po{constructor(e,t="asc"){this.field=e,this.dir=t}}function Uo(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}function xo(e,t,n){let s=0;for(let i=0;i<e.position.length;i++){const r=t[i],o=e.position[i];if(s=r.field.isKeyField()?Ir.comparator(Ir.fromName(o.referenceValue),n.key):ro(o,n.data.field(r.field)),"desc"===r.dir&&(s*=-1),0!==s)break}return s}function Vo(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!so(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{constructor(e,t=null,n=[],s=[],i=null,r="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=r,this.startAt=o,this.endAt=a,this._t=null,this.wt=null,this.startAt,this.endAt}}function Bo(e,t,n,s,i,r,o,a){return new Fo(e,t,n,s,i,r,o,a)}function qo(e){return new Fo(e)}function jo(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function Ho(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function Ko(e){for(const t of e.filters)if(t.dt())return t.field;return null}function Go(e){return null!==e.collectionGroup}function zo(e){const t=Zi(e);if(null===t._t){t._t=[];const e=Ko(t),n=Ho(t);if(null!==e&&null===n)e.isKeyField()||t._t.push(new Po(e)),t._t.push(new Po(Er.keyField(),"asc"));else{let e=!1;for(const n of t.explicitOrderBy)t._t.push(n),n.field.isKeyField()&&(e=!0);if(!e){const e=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";t._t.push(new Po(Er.keyField(),e))}}}return t._t}function $o(e){const t=Zi(e);if(!t.wt)if("F"===t.limitType)t.wt=Io(t.path,t.collectionGroup,zo(t),t.filters,t.limit,t.startAt,t.endAt);else{const e=[];for(const n of zo(t)){const t="desc"===n.dir?"asc":"desc";e.push(new Po(n.field,t))}const n=t.endAt?new Mo(t.endAt.position,t.endAt.inclusive):null,s=t.startAt?new Mo(t.startAt.position,t.startAt.inclusive):null;t.wt=Io(t.path,t.collectionGroup,e,t.filters,t.limit,n,s)}return t.wt}function Wo(e,t,n){return new Fo(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Qo(e,t){return _o($o(e),$o(t))&&e.limitType===t.limitType}function Xo(e){return`${To($o(e))}|lt:${e.limitType}`}function Yo(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map((e=>{var t;return`${(t=e).field.canonicalString()} ${t.op} ${ao(t.value)}`})).join(", ")}]`),Jr(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map((e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e))).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((e=>ao(e))).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((e=>ao(e))).join(",")),`Target(${t})`}($o(e))}; limitType=${e.limitType})`}function Jo(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):Ir.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of e.explicitOrderBy)if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const s=xo(e,t,n);return e.inclusive?s<=0:s<0}(e.startAt,zo(e),t))&&!(e.endAt&&!function(e,t,n){const s=xo(e,t,n);return e.inclusive?s>=0:s>0}(e.endAt,zo(e),t))}(e,t)}function Zo(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function ea(e){return(t,n)=>{let s=!1;for(const i of zo(e)){const e=ta(i,t,n);if(0!==e)return e;s=s||i.field.isKeyField()}return 0}}function ta(e,t,n){const s=e.field.isKeyField()?Ir.comparator(t.key,n.key):function(e,t,n){const s=t.data.field(e),i=n.data.field(e);return null!==s&&null!==i?ro(s,i):Yi()}(e.field,t,n);switch(e.dir){case"asc":return s;case"desc":return-1*s;default:return Yi()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function na(e,t){if(e.gt){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Zr(t)?"-0":t}}function sa(e){return{integerValue:""+e}}function ia(e,t){return eo(t)?sa(t):na(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(){this._=void 0}}function oa(e,t,n){return e instanceof ua?function(e,t){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&(n.fields.__previous_value__=t),{mapValue:n}}(n,t):e instanceof la?ha(e,t):e instanceof da?fa(e,t):function(e,t){const n=ca(e,t),s=ma(n)+ma(e.yt);return uo(n)&&uo(e.yt)?sa(s):na(e.It,s)}(e,t)}function aa(e,t,n){return e instanceof la?ha(e,t):e instanceof da?fa(e,t):n}function ca(e,t){var n;return e instanceof pa?uo(n=t)||function(e){return!!e&&"doubleValue"in e}(n)?t:{integerValue:0}:null}class ua extends ra{}class la extends ra{constructor(e){super(),this.elements=e}}function ha(e,t){const n=ga(t);for(const t of e.elements)n.some((e=>so(e,t)))||n.push(t);return{arrayValue:{values:n}}}class da extends ra{constructor(e){super(),this.elements=e}}function fa(e,t){let n=ga(t);for(const t of e.elements)n=n.filter((e=>!so(e,t)));return{arrayValue:{values:n}}}class pa extends ra{constructor(e,t){super(),this.It=e,this.yt=t}}function ma(e){return Gr(e.integerValue||e.doubleValue)}function ga(e){return lo(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya{constructor(e,t){this.version=e,this.transformResults=t}}class va{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new va}static exists(e){return new va(void 0,e)}static updateTime(e){return new va(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function wa(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Ea{}function Ia(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new Ra(e.key,va.none()):new Aa(e.key,e.data,va.none());{const n=e.data,s=yo.empty();let i=new Fr(Er.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?s.delete(e):s.set(e,t),i=i.add(e)}return new ka(e.key,s,new qr(i.toArray()),va.none())}}function Ta(e,t,n){e instanceof Aa?function(e,t,n){const s=e.value.clone(),i=Na(e.fieldTransforms,t,n.transformResults);s.setAll(i),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(e,t,n):e instanceof ka?function(e,t,n){if(!wa(e.precondition,t))return void t.convertToUnknownDocument(n.version);const s=Na(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(Ca(e)),i.setAll(s),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function _a(e,t,n,s){return e instanceof Aa?function(e,t,n,s){if(!wa(e.precondition,t))return n;const i=e.value.clone(),r=Da(e.fieldTransforms,s,t);return i.setAll(r),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,s):e instanceof ka?function(e,t,n,s){if(!wa(e.precondition,t))return n;const i=Da(e.fieldTransforms,s,t),r=t.data;return r.setAll(Ca(e)),r.setAll(i),t.convertToFoundDocument(t.version,r).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map((e=>e.field)))}(e,t,n,s):function(e,t,n){return wa(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function ba(e,t){let n=null;for(const s of e.fieldTransforms){const e=t.data.field(s.field),i=ca(s.transform,e||null);null!=i&&(null===n&&(n=yo.empty()),n.set(s.field,i))}return n||null}function Sa(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&pr(e,t,((e,t)=>function(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof la&&t instanceof la||e instanceof da&&t instanceof da?pr(e.elements,t.elements,so):e instanceof pa&&t instanceof pa?so(e.yt,t.yt):e instanceof ua&&t instanceof ua}(e.transform,t.transform)}(e,t)))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Aa extends Ea{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ka extends Ea{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Ca(e){const t=new Map;return e.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const s=e.data.field(n);t.set(n,s)}})),t}function Na(e,t,n){const s=new Map;Ji(e.length===n.length);for(let i=0;i<n.length;i++){const r=e[i],o=r.transform,a=t.data.field(r.field);s.set(r.field,aa(o,a,n[i]))}return s}function Da(e,t,n){const s=new Map;for(const i of e){const e=i.transform,r=n.data.field(i.field);s.set(i.field,oa(e,r,t))}return s}class Ra extends Ea{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Oa extends Ea{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(e){this.count=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ma,Pa;function Ua(e){switch(e){default:return Yi();case er.CANCELLED:case er.UNKNOWN:case er.DEADLINE_EXCEEDED:case er.RESOURCE_EXHAUSTED:case er.INTERNAL:case er.UNAVAILABLE:case er.UNAUTHENTICATED:return!1;case er.INVALID_ARGUMENT:case er.NOT_FOUND:case er.ALREADY_EXISTS:case er.PERMISSION_DENIED:case er.FAILED_PRECONDITION:case er.ABORTED:case er.OUT_OF_RANGE:case er.UNIMPLEMENTED:case er.DATA_LOSS:return!0}}function xa(e){if(void 0===e)return Wi("GRPC error has no .code"),er.UNKNOWN;switch(e){case Ma.OK:return er.OK;case Ma.CANCELLED:return er.CANCELLED;case Ma.UNKNOWN:return er.UNKNOWN;case Ma.DEADLINE_EXCEEDED:return er.DEADLINE_EXCEEDED;case Ma.RESOURCE_EXHAUSTED:return er.RESOURCE_EXHAUSTED;case Ma.INTERNAL:return er.INTERNAL;case Ma.UNAVAILABLE:return er.UNAVAILABLE;case Ma.UNAUTHENTICATED:return er.UNAUTHENTICATED;case Ma.INVALID_ARGUMENT:return er.INVALID_ARGUMENT;case Ma.NOT_FOUND:return er.NOT_FOUND;case Ma.ALREADY_EXISTS:return er.ALREADY_EXISTS;case Ma.PERMISSION_DENIED:return er.PERMISSION_DENIED;case Ma.FAILED_PRECONDITION:return er.FAILED_PRECONDITION;case Ma.ABORTED:return er.ABORTED;case Ma.OUT_OF_RANGE:return er.OUT_OF_RANGE;case Ma.UNIMPLEMENTED:return er.UNIMPLEMENTED;case Ma.DATA_LOSS:return er.DATA_LOSS;default:return Yi()}}(Pa=Ma||(Ma={}))[Pa.OK=0]="OK",Pa[Pa.CANCELLED=1]="CANCELLED",Pa[Pa.UNKNOWN=2]="UNKNOWN",Pa[Pa.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Pa[Pa.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Pa[Pa.NOT_FOUND=5]="NOT_FOUND",Pa[Pa.ALREADY_EXISTS=6]="ALREADY_EXISTS",Pa[Pa.PERMISSION_DENIED=7]="PERMISSION_DENIED",Pa[Pa.UNAUTHENTICATED=16]="UNAUTHENTICATED",Pa[Pa.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Pa[Pa.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Pa[Pa.ABORTED=10]="ABORTED",Pa[Pa.OUT_OF_RANGE=11]="OUT_OF_RANGE",Pa[Pa.UNIMPLEMENTED=12]="UNIMPLEMENTED",Pa[Pa.INTERNAL=13]="INTERNAL",Pa[Pa.UNAVAILABLE=14]="UNAVAILABLE",Pa[Pa.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Va{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[t,s]of n)if(this.equalsFn(t,e))return s}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(void 0===s)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<s.length;n++)if(this.equalsFn(s[n][0],e))return void(s[n]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return 1===n.length?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Mr(this.inner,((t,n)=>{for(const[t,s]of n)e(t,s)}))}isEmpty(){return Pr(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fa=new Ur(Ir.comparator);function Ba(){return Fa}const qa=new Ur(Ir.comparator);function ja(...e){let t=qa;for(const n of e)t=t.insert(n.key,n);return t}function Ha(e){let t=qa;return e.forEach(((e,n)=>t=t.insert(e,n.overlayedDocument))),t}function Ka(){return za()}function Ga(){return za()}function za(){return new Va((e=>e.toString()),((e,t)=>e.isEqual(t)))}const $a=new Ur(Ir.comparator),Wa=new Fr(Ir.comparator);function Qa(...e){let t=Wa;for(const n of e)t=t.add(n);return t}const Xa=new Fr(fr);function Ya(){return Xa}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Za.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Ja(gr.min(),s,Ya(),Ba(),Qa())}}class Za{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Za(n,t,Qa(),Qa(),Qa())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e,t,n,s){this.Tt=e,this.removedTargetIds=t,this.key=n,this.Et=s}}class tc{constructor(e,t){this.targetId=e,this.At=t}}class nc{constructor(e,t,n=jr.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class sc{constructor(){this.Rt=0,this.bt=oc(),this.Pt=jr.EMPTY_BYTE_STRING,this.vt=!1,this.Vt=!0}get current(){return this.vt}get resumeToken(){return this.Pt}get St(){return 0!==this.Rt}get Dt(){return this.Vt}Ct(e){e.approximateByteSize()>0&&(this.Vt=!0,this.Pt=e)}xt(){let e=Qa(),t=Qa(),n=Qa();return this.bt.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:Yi()}})),new Za(this.Pt,this.vt,e,t,n)}Nt(){this.Vt=!1,this.bt=oc()}kt(e,t){this.Vt=!0,this.bt=this.bt.insert(e,t)}Ot(e){this.Vt=!0,this.bt=this.bt.remove(e)}Mt(){this.Rt+=1}Ft(){this.Rt-=1}$t(){this.Vt=!0,this.vt=!0}}class ic{constructor(e){this.Bt=e,this.Lt=new Map,this.Ut=Ba(),this.qt=rc(),this.Kt=new Fr(fr)}Gt(e){for(const t of e.Tt)e.Et&&e.Et.isFoundDocument()?this.Qt(t,e.Et):this.jt(t,e.key,e.Et);for(const t of e.removedTargetIds)this.jt(t,e.key,e.Et)}Wt(e){this.forEachTarget(e,(t=>{const n=this.zt(t);switch(e.state){case 0:this.Ht(t)&&n.Ct(e.resumeToken);break;case 1:n.Ft(),n.St||n.Nt(),n.Ct(e.resumeToken);break;case 2:n.Ft(),n.St||this.removeTarget(t);break;case 3:this.Ht(t)&&(n.$t(),n.Ct(e.resumeToken));break;case 4:this.Ht(t)&&(this.Jt(t),n.Ct(e.resumeToken));break;default:Yi()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Lt.forEach(((e,n)=>{this.Ht(n)&&t(n)}))}Yt(e){const t=e.targetId,n=e.At.count,s=this.Xt(t);if(s){const e=s.target;if(bo(e))if(0===n){const n=new Ir(e.path);this.jt(t,n,wo.newNoDocument(n,gr.min()))}else Ji(1===n);else this.Zt(t)!==n&&(this.Jt(t),this.Kt=this.Kt.add(t))}}te(e){const t=new Map;this.Lt.forEach(((n,s)=>{const i=this.Xt(s);if(i){if(n.current&&bo(i.target)){const t=new Ir(i.target.path);null!==this.Ut.get(t)||this.ee(s,t)||this.jt(s,t,wo.newNoDocument(t,e))}n.Dt&&(t.set(s,n.xt()),n.Nt())}}));let n=Qa();this.qt.forEach(((e,t)=>{let s=!0;t.forEachWhile((e=>{const t=this.Xt(e);return!t||2===t.purpose||(s=!1,!1)})),s&&(n=n.add(e))})),this.Ut.forEach(((t,n)=>n.setReadTime(e)));const s=new Ja(e,t,this.Kt,this.Ut,n);return this.Ut=Ba(),this.qt=rc(),this.Kt=new Fr(fr),s}Qt(e,t){if(!this.Ht(e))return;const n=this.ee(e,t.key)?2:0;this.zt(e).kt(t.key,n),this.Ut=this.Ut.insert(t.key,t),this.qt=this.qt.insert(t.key,this.ne(t.key).add(e))}jt(e,t,n){if(!this.Ht(e))return;const s=this.zt(e);this.ee(e,t)?s.kt(t,1):s.Ot(t),this.qt=this.qt.insert(t,this.ne(t).delete(e)),n&&(this.Ut=this.Ut.insert(t,n))}removeTarget(e){this.Lt.delete(e)}Zt(e){const t=this.zt(e).xt();return this.Bt.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Mt(e){this.zt(e).Mt()}zt(e){let t=this.Lt.get(e);return t||(t=new sc,this.Lt.set(e,t)),t}ne(e){let t=this.qt.get(e);return t||(t=new Fr(fr),this.qt=this.qt.insert(e,t)),t}Ht(e){const t=null!==this.Xt(e);return t||$i("WatchChangeAggregator","Detected inactive target",e),t}Xt(e){const t=this.Lt.get(e);return t&&t.St?null:this.Bt.se(e)}Jt(e){this.Lt.set(e,new sc),this.Bt.getRemoteKeysForTarget(e).forEach((t=>{this.jt(e,t,null)}))}ee(e,t){return this.Bt.getRemoteKeysForTarget(e).has(t)}}function rc(){return new Ur(Ir.comparator)}function oc(){return new Ur(Ir.comparator)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac={asc:"ASCENDING",desc:"DESCENDING"},cc={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class uc{constructor(e,t){this.databaseId=e,this.gt=t}}function lc(e,t){return e.gt?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function hc(e,t){return e.gt?t.toBase64():t.toUint8Array()}function dc(e,t){return lc(e,t.toTimestamp())}function fc(e){return Ji(!!e),gr.fromTimestamp(function(e){const t=Kr(e);return new mr(t.seconds,t.nanos)}(e))}function pc(e,t){return function(e){return new vr(["projects",e.projectId,"databases",e.database])}(e).child("documents").child(t).canonicalString()}function mc(e){const t=vr.fromString(e);return Ji(Pc(t)),t}function gc(e,t){return pc(e.databaseId,t.path)}function yc(e,t){const n=mc(t);if(n.get(1)!==e.databaseId.projectId)throw new tr(er.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new tr(er.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new Ir(Ic(n))}function vc(e,t){return pc(e.databaseId,t)}function wc(e){const t=mc(e);return 4===t.length?vr.emptyPath():Ic(t)}function Ec(e){return new vr(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function Ic(e){return Ji(e.length>4&&"documents"===e.get(4)),e.popFirst(5)}function Tc(e,t,n){return{name:gc(e,t),fields:n.value.mapValue.fields}}function _c(e,t){let n;if(t instanceof Aa)n={update:Tc(e,t.key,t.value)};else if(t instanceof Ra)n={delete:gc(e,t.key)};else if(t instanceof ka)n={update:Tc(e,t.key,t.data),updateMask:Mc(t.fieldMask)};else{if(!(t instanceof Oa))return Yi();n={verify:gc(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map((e=>function(e,t){const n=t.transform;if(n instanceof ua)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof la)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof da)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof pa)return{fieldPath:t.field.canonicalString(),increment:n.yt};throw Yi()}(0,e)))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:dc(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:Yi()}(e,t.precondition)),n}function bc(e,t){return{documents:[vc(e,t.path)]}}function Sc(e,t){const n={structuredQuery:{}},s=t.path;null!==t.collectionGroup?(n.parent=vc(e,s),n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(n.parent=vc(e,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);const i=function(e){if(0===e.length)return;const t=e.map((e=>function(e){if("=="===e.op){if(fo(e.value))return{unaryFilter:{field:Dc(e.field),op:"IS_NAN"}};if(ho(e.value))return{unaryFilter:{field:Dc(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(fo(e.value))return{unaryFilter:{field:Dc(e.field),op:"IS_NOT_NAN"}};if(ho(e.value))return{unaryFilter:{field:Dc(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Dc(e.field),op:Nc(e.op),value:e.value}}}(e)));return 1===t.length?t[0]:{compositeFilter:{op:"AND",filters:t}}}(t.filters);i&&(n.structuredQuery.where=i);const r=function(e){if(0!==e.length)return e.map((e=>function(e){return{field:Dc(e.field),direction:Cc(e.dir)}}(e)))}(t.orderBy);r&&(n.structuredQuery.orderBy=r);const o=function(e,t){return e.gt||Jr(t)?t:{value:t}}(e,t.limit);var a;return null!==o&&(n.structuredQuery.limit=o),t.startAt&&(n.structuredQuery.startAt={before:(a=t.startAt).inclusive,values:a.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),n}function Ac(e){let t=wc(e.parent);const n=e.structuredQuery,s=n.from?n.from.length:0;let i=null;if(s>0){Ji(1===s);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let r=[];n.where&&(r=kc(n.where));let o=[];n.orderBy&&(o=n.orderBy.map((e=>function(e){return new Po(Rc(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e))));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,Jr(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new Mo(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new Mo(n,t)}(n.endAt)),Bo(t,i,o,r,a,"F",c,u)}function kc(e){return e?void 0!==e.unaryFilter?[Lc(e)]:void 0!==e.fieldFilter?[Oc(e)]:void 0!==e.compositeFilter?e.compositeFilter.filters.map((e=>kc(e))).reduce(((e,t)=>e.concat(t))):Yi():[]}function Cc(e){return ac[e]}function Nc(e){return cc[e]}function Dc(e){return{fieldPath:e.canonicalString()}}function Rc(e){return Er.fromServerFormat(e.fieldPath)}function Oc(e){return So.create(Rc(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Yi()}}(e.fieldFilter.op),e.fieldFilter.value)}function Lc(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Rc(e.unaryFilter.field);return So.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=Rc(e.unaryFilter.field);return So.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Rc(e.unaryFilter.field);return So.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Rc(e.unaryFilter.field);return So.create(i,"!=",{nullValue:"NULL_VALUE"});default:return Yi()}}function Mc(e){const t=[];return e.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Pc(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],xc=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Vc=xc;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fc{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){const s=this.mutations[t];s.key.isEqual(e.key)&&Ta(s,e,n[t])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=_a(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=_a(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Ga();return this.mutations.forEach((s=>{const i=e.get(s.key),r=i.overlayedDocument;let o=this.applyToLocalView(r,i.mutatedFields);o=t.has(s.key)?null:o;const a=Ia(r,o);null!==a&&n.set(s.key,a),r.isValidDocument()||r.convertToNoDocument(gr.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Qa())}isEqual(e){return this.batchId===e.batchId&&pr(this.mutations,e.mutations,((e,t)=>Sa(e,t)))&&pr(this.baseMutations,e.baseMutations,((e,t)=>Sa(e,t)))}}class Bc{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){Ji(e.mutations.length===n.length);let s=$a;const i=e.mutations;for(let e=0;e<i.length;e++)s=s.insert(i[e].key,n[e].version);return new Bc(e,t,n,s)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(e,t,n,s,i=gr.min(),r=gr.min(),o=jr.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=r,this.resumeToken=o}withSequenceNumber(e){return new jc(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new jc(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new jc(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e){this.re=e}}function Kc(e){const t=Ac({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Wo(t,t.limit,"L"):t}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{constructor(){}ce(e,t){this.ae(e,t),t.he()}ae(e,t){if("nullValue"in e)this.le(t,5);else if("booleanValue"in e)this.le(t,10),t.fe(e.booleanValue?1:0);else if("integerValue"in e)this.le(t,15),t.fe(Gr(e.integerValue));else if("doubleValue"in e){const n=Gr(e.doubleValue);isNaN(n)?this.le(t,13):(this.le(t,15),Zr(n)?t.fe(0):t.fe(n))}else if("timestampValue"in e){const n=e.timestampValue;this.le(t,20),"string"==typeof n?t.de(n):(t.de(`${n.seconds||""}`),t.fe(n.nanos||0))}else if("stringValue"in e)this._e(e.stringValue,t),this.we(t);else if("bytesValue"in e)this.le(t,30),t.me(zr(e.bytesValue)),this.we(t);else if("referenceValue"in e)this.ge(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.le(t,45),t.fe(n.latitude||0),t.fe(n.longitude||0)}else"mapValue"in e?go(e)?this.le(t,Number.MAX_SAFE_INTEGER):(this.ye(e.mapValue,t),this.we(t)):"arrayValue"in e?(this.pe(e.arrayValue,t),this.we(t)):Yi()}_e(e,t){this.le(t,25),this.Ie(e,t)}Ie(e,t){t.de(e)}ye(e,t){const n=e.fields||{};this.le(t,55);for(const e of Object.keys(n))this._e(e,t),this.ae(n[e],t)}pe(e,t){const n=e.values||[];this.le(t,50);for(const e of n)this.ae(e,t)}ge(e,t){this.le(t,37),Ir.fromName(e).path.forEach((e=>{this.le(t,60),this.Ie(e,t)}))}le(e,t){e.fe(t)}we(e){e.fe(2)}}Gc.Te=new Gc;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zc{constructor(){this.Ye=new $c}addToCollectionParentIndex(e,t){return this.Ye.add(t),Dr.resolve()}getCollectionParents(e,t){return Dr.resolve(this.Ye.getEntries(t))}addFieldIndex(e,t){return Dr.resolve()}deleteFieldIndex(e,t){return Dr.resolve()}getDocumentsMatchingTarget(e,t){return Dr.resolve(null)}getIndexType(e,t){return Dr.resolve(0)}getFieldIndexes(e,t){return Dr.resolve([])}getNextCollectionGroupToUpdate(e){return Dr.resolve(null)}getMinOffset(e,t){return Dr.resolve(Sr.min())}getMinOffsetFromCollectionGroup(e,t){return Dr.resolve(Sr.min())}updateCollectionGroup(e,t,n){return Dr.resolve()}updateIndexEntries(e,t){return Dr.resolve()}}class $c{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new Fr(vr.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new Fr(vr.comparator)).toArray()}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Uint8Array(0);class Wc{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new Wc(e,Wc.DEFAULT_COLLECTION_PERCENTILE,Wc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Wc.DEFAULT_COLLECTION_PERCENTILE=10,Wc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Wc.DEFAULT=new Wc(41943040,Wc.DEFAULT_COLLECTION_PERCENTILE,Wc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Wc.DISABLED=new Wc(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Qc{constructor(e){this.bn=e}next(){return this.bn+=2,this.bn}static Pn(){return new Qc(0)}static vn(){return new Qc(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xc{constructor(){this.changes=new Va((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,wo.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?Dr.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Yc{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.getBaseDocument(e,t,n)))).next((e=>(null!==n&&_a(n.mutation,e,qr.empty(),mr.now()),e)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((t=>this.getLocalViewOfDocuments(e,t,Qa()).next((()=>t))))}getLocalViewOfDocuments(e,t,n=Qa()){const s=Ka();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((e=>{let t=ja();return e.forEach(((e,n)=>{t=t.insert(e,n.overlayedDocument)})),t}))))}getOverlayedDocuments(e,t){const n=Ka();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,Qa())))}populateOverlays(e,t,n){const s=[];return n.forEach((e=>{t.has(e)||s.push(e)})),this.documentOverlayCache.getOverlays(e,s).next((e=>{e.forEach(((e,n)=>{t.set(e,n)}))}))}computeViews(e,t,n,s){let i=Ba();const r=za(),o=za();return t.forEach(((e,t)=>{const o=n.get(t.key);s.has(t.key)&&(void 0===o||o.mutation instanceof ka)?i=i.insert(t.key,t):void 0!==o&&(r.set(t.key,o.mutation.getFieldMask()),_a(o.mutation,t,o.mutation.getFieldMask(),mr.now()))})),this.recalculateAndSaveOverlays(e,i).next((e=>(e.forEach(((e,t)=>r.set(e,t))),t.forEach(((e,t)=>{var n;return o.set(e,new Yc(t,null!==(n=r.get(e))&&void 0!==n?n:null))})),o)))}recalculateAndSaveOverlays(e,t){const n=za();let s=new Ur(((e,t)=>e-t)),i=Qa();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((e=>{for(const i of e)i.keys().forEach((e=>{const r=t.get(e);if(null===r)return;let o=n.get(e)||qr.empty();o=i.applyToLocalView(r,o),n.set(e,o);const a=(s.get(i.batchId)||Qa()).add(e);s=s.insert(i.batchId,a)}))})).next((()=>{const r=[],o=s.getReverseIterator();for(;o.hasNext();){const s=o.getNext(),a=s.key,c=s.value,u=Ga();c.forEach((e=>{if(!i.has(e)){const s=Ia(t.get(e),n.get(e));null!==s&&u.set(e,s),i=i.add(e)}})),r.push(this.documentOverlayCache.saveOverlays(e,a,u))}return Dr.waitFor(r)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((t=>this.recalculateAndSaveOverlays(e,t)))}getDocumentsMatchingQuery(e,t,n){return function(e){return Ir.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Go(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n):this.getDocumentsMatchingCollectionQuery(e,t,n)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{const r=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):Dr.resolve(Ka());let o=-1,a=i;return r.next((t=>Dr.forEach(t,((t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?Dr.resolve():this.getBaseDocument(e,t,n).next((e=>{a=a.insert(t,e)}))))).next((()=>this.populateOverlays(e,t,i))).next((()=>this.computeViews(e,a,t,Qa()))).next((e=>({batchId:o,changes:Ha(e)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Ir(t)).next((e=>{let t=ja();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t}))}getDocumentsMatchingCollectionGroupQuery(e,t,n){const s=t.collectionGroup;let i=ja();return this.indexManager.getCollectionParents(e,s).next((r=>Dr.forEach(r,(r=>{const o=function(e,t){return new Fo(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,r.child(s));return this.getDocumentsMatchingCollectionQuery(e,o,n).next((e=>{e.forEach(((e,t)=>{i=i.insert(e,t)}))}))})).next((()=>i))))}getDocumentsMatchingCollectionQuery(e,t,n){let s;return this.remoteDocumentCache.getAllFromCollection(e,t.path,n).next((i=>(s=i,this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId)))).next((e=>{e.forEach(((e,t)=>{const n=t.getKey();null===s.get(n)&&(s=s.insert(n,wo.newInvalidDocument(n)))}));let n=ja();return s.forEach(((s,i)=>{const r=e.get(s);void 0!==r&&_a(r.mutation,i,qr.empty(),mr.now()),Jo(t,i)&&(n=n.insert(s,i))})),n}))}getBaseDocument(e,t,n){return null===n||1===n.mutation.type?this.remoteDocumentCache.getEntry(e,t):Dr.resolve(wo.newInvalidDocument(t))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(e){this.It=e,this.Zn=new Map,this.ts=new Map}getBundleMetadata(e,t){return Dr.resolve(this.Zn.get(t))}saveBundleMetadata(e,t){var n;return this.Zn.set(t.id,{id:(n=t).id,version:n.version,createTime:fc(n.createTime)}),Dr.resolve()}getNamedQuery(e,t){return Dr.resolve(this.ts.get(t))}saveNamedQuery(e,t){return this.ts.set(t.name,function(e){return{name:e.name,query:Kc(e.bundledQuery),readTime:fc(e.readTime)}}(t)),Dr.resolve()}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(){this.overlays=new Ur(Ir.comparator),this.es=new Map}getOverlay(e,t){return Dr.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Ka();return Dr.forEach(t,(t=>this.getOverlay(e,t).next((e=>{null!==e&&n.set(t,e)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((n,s)=>{this.ue(e,t,s)})),Dr.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.es.get(n);return void 0!==s&&(s.forEach((e=>this.overlays=this.overlays.remove(e))),this.es.delete(n)),Dr.resolve()}getOverlaysForCollection(e,t,n){const s=Ka(),i=t.length+1,r=new Ir(t.child("")),o=this.overlays.getIteratorFrom(r);for(;o.hasNext();){const e=o.getNext().value,r=e.getKey();if(!t.isPrefixOf(r.path))break;r.path.length===i&&e.largestBatchId>n&&s.set(e.getKey(),e)}return Dr.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new Ur(((e,t)=>e-t));const r=this.overlays.getIterator();for(;r.hasNext();){const e=r.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=Ka(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=Ka(),a=i.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach(((e,t)=>o.set(e,t))),!(o.size()>=s)););return Dr.resolve(o)}ue(e,t,n){const s=this.overlays.get(n.key);if(null!==s){const e=this.es.get(s.largestBatchId).delete(n.key);this.es.set(s.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new qc(t,n));let i=this.es.get(t);void 0===i&&(i=Qa(),this.es.set(t,i)),this.es.set(t,i.add(n.key))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(){this.ns=new Fr(nu.ss),this.rs=new Fr(nu.os)}isEmpty(){return this.ns.isEmpty()}addReference(e,t){const n=new nu(e,t);this.ns=this.ns.add(n),this.rs=this.rs.add(n)}us(e,t){e.forEach((e=>this.addReference(e,t)))}removeReference(e,t){this.cs(new nu(e,t))}hs(e,t){e.forEach((e=>this.removeReference(e,t)))}ls(e){const t=new Ir(new vr([])),n=new nu(t,e),s=new nu(t,e+1),i=[];return this.rs.forEachInRange([n,s],(e=>{this.cs(e),i.push(e.key)})),i}fs(){this.ns.forEach((e=>this.cs(e)))}cs(e){this.ns=this.ns.delete(e),this.rs=this.rs.delete(e)}ds(e){const t=new Ir(new vr([])),n=new nu(t,e),s=new nu(t,e+1);let i=Qa();return this.rs.forEachInRange([n,s],(e=>{i=i.add(e.key)})),i}containsKey(e){const t=new nu(e,0),n=this.ns.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class nu{constructor(e,t){this.key=e,this._s=t}static ss(e,t){return Ir.comparator(e.key,t.key)||fr(e._s,t._s)}static os(e,t){return fr(e._s,t._s)||Ir.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.ws=1,this.gs=new Fr(nu.ss)}checkEmpty(e){return Dr.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,s){const i=this.ws;this.ws++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const r=new Fc(i,t,n,s);this.mutationQueue.push(r);for(const t of s)this.gs=this.gs.add(new nu(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return Dr.resolve(r)}lookupMutationBatch(e,t){return Dr.resolve(this.ys(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.ps(n),i=s<0?0:s;return Dr.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return Dr.resolve(0===this.mutationQueue.length?-1:this.ws-1)}getAllMutationBatches(e){return Dr.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new nu(t,0),s=new nu(t,Number.POSITIVE_INFINITY),i=[];return this.gs.forEachInRange([n,s],(e=>{const t=this.ys(e._s);i.push(t)})),Dr.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Fr(fr);return t.forEach((e=>{const t=new nu(e,0),s=new nu(e,Number.POSITIVE_INFINITY);this.gs.forEachInRange([t,s],(e=>{n=n.add(e._s)}))})),Dr.resolve(this.Is(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;Ir.isDocumentKey(i)||(i=i.child(""));const r=new nu(new Ir(i),0);let o=new Fr(fr);return this.gs.forEachWhile((e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===s&&(o=o.add(e._s)),!0)}),r),Dr.resolve(this.Is(o))}Is(e){const t=[];return e.forEach((e=>{const n=this.ys(e);null!==n&&t.push(n)})),t}removeMutationBatch(e,t){Ji(0===this.Ts(t.batchId,"removed")),this.mutationQueue.shift();let n=this.gs;return Dr.forEach(t.mutations,(s=>{const i=new nu(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.gs=n}))}An(e){}containsKey(e,t){const n=new nu(t,0),s=this.gs.firstAfterOrEqual(n);return Dr.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,Dr.resolve()}Ts(e,t){return this.ps(e)}ps(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}ys(e){const t=this.ps(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(e){this.Es=e,this.docs=new Ur(Ir.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,r=this.Es(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:r}),this.size+=r-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return Dr.resolve(n?n.document.mutableCopy():wo.newInvalidDocument(t))}getEntries(e,t){let n=Ba();return t.forEach((e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():wo.newInvalidDocument(e))})),Dr.resolve(n)}getAllFromCollection(e,t,n){let s=Ba();const i=new Ir(t.child("")),r=this.docs.getIteratorFrom(i);for(;r.hasNext();){const{key:e,value:{document:i}}=r.getNext();if(!t.isPrefixOf(e.path))break;e.path.length>t.length+1||Ar(br(i),n)<=0||(s=s.insert(i.key,i.mutableCopy()))}return Dr.resolve(s)}getAllFromCollectionGroup(e,t,n,s){Yi()}As(e,t){return Dr.forEach(this.docs,(e=>t(e)))}newChangeBuffer(e){return new ru(this)}getSize(e){return Dr.resolve(this.size)}}class ru extends Xc{constructor(e){super(),this.Yn=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.Yn.addEntry(e,s)):this.Yn.removeEntry(n)})),Dr.waitFor(t)}getFromCache(e,t){return this.Yn.getEntry(e,t)}getAllFromCache(e,t){return this.Yn.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(e){this.persistence=e,this.Rs=new Va((e=>To(e)),_o),this.lastRemoteSnapshotVersion=gr.min(),this.highestTargetId=0,this.bs=0,this.Ps=new tu,this.targetCount=0,this.vs=Qc.Pn()}forEachTarget(e,t){return this.Rs.forEach(((e,n)=>t(n))),Dr.resolve()}getLastRemoteSnapshotVersion(e){return Dr.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return Dr.resolve(this.bs)}allocateTargetId(e){return this.highestTargetId=this.vs.next(),Dr.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.bs&&(this.bs=t),Dr.resolve()}Dn(e){this.Rs.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.vs=new Qc(t),this.highestTargetId=t),e.sequenceNumber>this.bs&&(this.bs=e.sequenceNumber)}addTargetData(e,t){return this.Dn(t),this.targetCount+=1,Dr.resolve()}updateTargetData(e,t){return this.Dn(t),Dr.resolve()}removeTargetData(e,t){return this.Rs.delete(t.target),this.Ps.ls(t.targetId),this.targetCount-=1,Dr.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.Rs.forEach(((r,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.Rs.delete(r),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),s++)})),Dr.waitFor(i).next((()=>s))}getTargetCount(e){return Dr.resolve(this.targetCount)}getTargetData(e,t){const n=this.Rs.get(t)||null;return Dr.resolve(n)}addMatchingKeys(e,t,n){return this.Ps.us(t,n),Dr.resolve()}removeMatchingKeys(e,t,n){this.Ps.hs(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((t=>{i.push(s.markPotentiallyOrphaned(e,t))})),Dr.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ps.ls(t),Dr.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Ps.ds(t);return Dr.resolve(n)}containsKey(e,t){return Dr.resolve(this.Ps.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(e,t){this.Vs={},this.overlays={},this.Ss=new Or(0),this.Ds=!1,this.Ds=!0,this.referenceDelegate=e(this),this.Cs=new ou(this),this.indexManager=new zc,this.remoteDocumentCache=function(e){return new iu(e)}((e=>this.referenceDelegate.xs(e))),this.It=new Hc(t),this.Ns=new Zc(this.It)}start(){return Promise.resolve()}shutdown(){return this.Ds=!1,Promise.resolve()}get started(){return this.Ds}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new eu,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.Vs[e.toKey()];return n||(n=new su(t,this.referenceDelegate),this.Vs[e.toKey()]=n),n}getTargetCache(){return this.Cs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ns}runTransaction(e,t,n){$i("MemoryPersistence","Starting transaction:",e);const s=new cu(this.Ss.next());return this.referenceDelegate.ks(),n(s).next((e=>this.referenceDelegate.Os(s).next((()=>e)))).toPromise().then((e=>(s.raiseOnCommittedEvent(),e)))}Ms(e,t){return Dr.or(Object.values(this.Vs).map((n=>()=>n.containsKey(e,t))))}}class cu extends Cr{constructor(e){super(),this.currentSequenceNumber=e}}class uu{constructor(e){this.persistence=e,this.Fs=new tu,this.$s=null}static Bs(e){return new uu(e)}get Ls(){if(this.$s)return this.$s;throw Yi()}addReference(e,t,n){return this.Fs.addReference(n,t),this.Ls.delete(n.toString()),Dr.resolve()}removeReference(e,t,n){return this.Fs.removeReference(n,t),this.Ls.add(n.toString()),Dr.resolve()}markPotentiallyOrphaned(e,t){return this.Ls.add(t.toString()),Dr.resolve()}removeTarget(e,t){this.Fs.ls(t.targetId).forEach((e=>this.Ls.add(e.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((e=>{e.forEach((e=>this.Ls.add(e.toString())))})).next((()=>n.removeTargetData(e,t)))}ks(){this.$s=new Set}Os(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Dr.forEach(this.Ls,(n=>{const s=Ir.fromPath(n);return this.Us(e,s).next((e=>{e||t.removeEntry(s,gr.min())}))})).next((()=>(this.$s=null,t.apply(e))))}updateLimboDocument(e,t){return this.Us(e,t).next((e=>{e?this.Ls.delete(t.toString()):this.Ls.add(t.toString())}))}xs(e){return 0}Us(e,t){return Dr.or([()=>Dr.resolve(this.Fs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ms(e,t)])}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class lu{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Si=n,this.Di=s}static Ci(e,t){let n=Qa(),s=Qa();for(const e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:s=s.add(e.doc.key)}return new lu(e,t.fromCache,n,s)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(){this.xi=!1}initialize(e,t){this.Ni=e,this.indexManager=t,this.xi=!0}getDocumentsMatchingQuery(e,t,n,s){return this.ki(e,t).next((i=>i||this.Oi(e,t,s,n))).next((n=>n||this.Mi(e,t)))}ki(e,t){if(jo(t))return Dr.resolve(null);let n=$o(t);return this.indexManager.getIndexType(e,n).next((s=>0===s?null:(null!==t.limit&&1===s&&(t=Wo(t,null,"F"),n=$o(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((s=>{const i=Qa(...s);return this.Ni.getDocuments(e,i).next((s=>this.indexManager.getMinOffset(e,n).next((n=>{const r=this.Fi(t,s);return this.$i(t,r,i,n.readTime)?this.ki(e,Wo(t,null,"F")):this.Bi(e,r,t,n)}))))})))))}Oi(e,t,n,s){return jo(t)||s.isEqual(gr.min())?this.Mi(e,t):this.Ni.getDocuments(e,n).next((i=>{const r=this.Fi(t,i);return this.$i(t,r,n,s)?this.Mi(e,t):(zi()<=W.DEBUG&&$i("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Yo(t)),this.Bi(e,r,t,_r(s,-1)))}))}Fi(e,t){let n=new Fr(ea(e));return t.forEach(((t,s)=>{Jo(e,s)&&(n=n.add(s))})),n}$i(e,t,n,s){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Mi(e,t){return zi()<=W.DEBUG&&$i("QueryEngine","Using full collection scan to execute query:",Yo(t)),this.Ni.getDocumentsMatchingQuery(e,t,Sr.min())}Bi(e,t,n,s){return this.Ni.getDocumentsMatchingQuery(e,n,s).next((e=>(t.forEach((t=>{e=e.insert(t.key,t)})),e)))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(e,t,n,s){this.persistence=e,this.Li=t,this.It=s,this.Ui=new Ur(fr),this.qi=new Va((e=>To(e)),_o),this.Ki=new Map,this.Gi=e.getRemoteDocumentCache(),this.Cs=e.getTargetCache(),this.Ns=e.getBundleCache(),this.Qi(n)}Qi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Jc(this.Gi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Gi.setIndexManager(this.indexManager),this.Li.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Ui)))}}function fu(e,t,n,s){return new du(e,t,n,s)}async function pu(e,t){const n=Zi(e);return await n.persistence.runTransaction("Handle user change","readonly",(e=>{let s;return n.mutationQueue.getAllMutationBatches(e).next((i=>(s=i,n.Qi(t),n.mutationQueue.getAllMutationBatches(e)))).next((t=>{const i=[],r=[];let o=Qa();for(const e of s){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){r.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next((e=>({ji:e,removedBatchIds:i,addedBatchIds:r})))}))}))}function mu(e){const t=Zi(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Cs.getLastRemoteSnapshotVersion(e)))}function gu(e,t,n){let s=Qa(),i=Qa();return n.forEach((e=>s=s.add(e))),t.getEntries(e,s).next((e=>{let s=Ba();return n.forEach(((n,r)=>{const o=e.get(n);r.isFoundDocument()!==o.isFoundDocument()&&(i=i.add(n)),r.isNoDocument()&&r.version.isEqual(gr.min())?(t.removeEntry(n,r.readTime),s=s.insert(n,r)):!o.isValidDocument()||r.version.compareTo(o.version)>0||0===r.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(r),s=s.insert(n,r)):$i("LocalStore","Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",r.version)})),{Wi:s,zi:i}}))}function yu(e,t){const n=Zi(e);return n.persistence.runTransaction("Get next mutation batch","readonly",(e=>(void 0===t&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t))))}function vu(e,t){const n=Zi(e);return n.persistence.runTransaction("Allocate target","readwrite",(e=>{let s;return n.Cs.getTargetData(e,t).next((i=>i?(s=i,Dr.resolve(s)):n.Cs.allocateTargetId(e).next((i=>(s=new jc(t,i,0,e.currentSequenceNumber),n.Cs.addTargetData(e,s).next((()=>s)))))))})).then((e=>{const s=n.Ui.get(e.targetId);return(null===s||e.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ui=n.Ui.insert(e.targetId,e),n.qi.set(t,e.targetId)),e}))}async function wu(e,t,n){const s=Zi(e),i=s.Ui.get(t),r=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",r,(e=>s.persistence.referenceDelegate.removeTarget(e,i)))}catch(e){if(!Rr(e))throw e;$i("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}s.Ui=s.Ui.remove(t),s.qi.delete(i.target)}function Eu(e,t,n){const s=Zi(e);let i=gr.min(),r=Qa();return s.persistence.runTransaction("Execute query","readonly",(e=>function(e,t,n){const s=Zi(e),i=s.qi.get(n);return void 0!==i?Dr.resolve(s.Ui.get(i)):s.Cs.getTargetData(t,n)}(s,e,$o(t)).next((t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,s.Cs.getMatchingKeysForTargetId(e,t.targetId).next((e=>{r=e}))})).next((()=>s.Li.getDocumentsMatchingQuery(e,t,n?i:gr.min(),n?r:Qa()))).next((e=>(Iu(s,Zo(t),e),{documents:e,Hi:r})))))}function Iu(e,t,n){let s=e.Ki.get(t)||gr.min();n.forEach(((e,t)=>{t.readTime.compareTo(s)>0&&(s=t.readTime)})),e.Ki.set(t,s)}class Tu{constructor(){this.activeTargetIds=Ya()}er(e){this.activeTargetIds=this.activeTargetIds.add(e)}nr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class _u{constructor(){this.Lr=new Tu,this.Ur={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e){return this.Lr.er(e),this.Ur[e]||"not-current"}updateQueryState(e,t,n){this.Ur[e]=t}removeLocalQueryTarget(e){this.Lr.nr(e)}isLocalQueryTarget(e){return this.Lr.activeTargetIds.has(e)}clearQueryState(e){delete this.Ur[e]}getAllActiveQueryTargets(){return this.Lr.activeTargetIds}isActiveQueryTarget(e){return this.Lr.activeTargetIds.has(e)}start(){return this.Lr=new Tu,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{qr(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(){this.Kr=()=>this.Gr(),this.Qr=()=>this.jr(),this.Wr=[],this.zr()}qr(e){this.Wr.push(e)}shutdown(){window.removeEventListener("online",this.Kr),window.removeEventListener("offline",this.Qr)}zr(){window.addEventListener("online",this.Kr),window.addEventListener("offline",this.Qr)}Gr(){$i("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.Wr)e(0)}jr(){$i("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.Wr)e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Au={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(e){this.Hr=e.Hr,this.Jr=e.Jr}Yr(e){this.Xr=e}Zr(e){this.eo=e}onMessage(e){this.no=e}close(){this.Jr()}send(e){this.Hr(e)}so(){this.Xr()}io(e){this.eo(e)}ro(e){this.no(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http";this.oo=t+"://"+e.host,this.uo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get co(){return!1}ao(e,t,n,s,i){const r=this.ho(e,t);$i("RestConnection","Sending: ",r,n);const o={};return this.lo(o,s,i),this.fo(e,r,o,n).then((e=>($i("RestConnection","Received: ",e),e)),(t=>{throw Qi("RestConnection",`${e} failed with error: `,t,"url: ",r,"request:",n),t}))}_o(e,t,n,s,i,r){return this.ao(e,t,n,s,i)}lo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+Ki,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((t,n)=>e[n]=t)),n&&n.headers.forEach(((t,n)=>e[n]=t))}ho(e,t){const n=Au[e];return`${this.oo}/v1/${t}:${n}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}fo(e,t,n,s){return new Promise(((i,r)=>{const o=new ji;o.setWithCredentials(!0),o.listenOnce(xi.COMPLETE,(()=>{try{switch(o.getLastErrorCode()){case Ui.NO_ERROR:const t=o.getResponseJson();$i("Connection","XHR received:",JSON.stringify(t)),i(t);break;case Ui.TIMEOUT:$i("Connection",'RPC "'+e+'" timed out'),r(new tr(er.DEADLINE_EXCEEDED,"Request time out"));break;case Ui.HTTP_ERROR:const n=o.getStatus();if($i("Connection",'RPC "'+e+'" failed with status:',n,"response text:",o.getResponseText()),n>0){const e=o.getResponseJson().error;if(e&&e.status&&e.message){const t=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(er).indexOf(t)>=0?t:er.UNKNOWN}(e.status);r(new tr(t,e.message))}else r(new tr(er.UNKNOWN,"Server responded with status "+o.getStatus()))}else r(new tr(er.UNAVAILABLE,"Connection failed."));break;default:Yi()}}finally{$i("Connection",'RPC "'+e+'" completed.')}}));const a=JSON.stringify(s);o.send(t,"POST",a,n,15)}))}wo(e,t,n){const s=[this.oo,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=Mi(),r=Pi(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(o.xmlHttpFactory=new Bi({})),this.lo(o.initMessageHeaders,t,n),o.encodeInitMessageHeaders=!0;const a=s.join("");$i("Connection","Creating WebChannel: "+a,o);const c=i.createWebChannel(a,o);let u=!1,l=!1;const h=new ku({Hr:e=>{l?$i("Connection","Not sending because WebChannel is closed:",e):(u||($i("Connection","Opening WebChannel transport."),c.open(),u=!0),$i("Connection","WebChannel sending:",e),c.send(e))},Jr:()=>c.close()}),d=(e,t,n)=>{e.listen(t,(e=>{try{n(e)}catch(e){setTimeout((()=>{throw e}),0)}}))};return d(c,qi.EventType.OPEN,(()=>{l||$i("Connection","WebChannel transport opened.")})),d(c,qi.EventType.CLOSE,(()=>{l||(l=!0,$i("Connection","WebChannel transport closed"),h.io())})),d(c,qi.EventType.ERROR,(e=>{l||(l=!0,Qi("Connection","WebChannel transport errored:",e),h.io(new tr(er.UNAVAILABLE,"The operation could not be completed")))})),d(c,qi.EventType.MESSAGE,(e=>{var t;if(!l){const n=e.data[0];Ji(!!n);const s=n,i=s.error||(null===(t=s[0])||void 0===t?void 0:t.error);if(i){$i("Connection","WebChannel received error:",i);const e=i.status;let t=function(e){const t=Ma[e];if(void 0!==t)return xa(t)}(e),n=i.message;void 0===t&&(t=er.INTERNAL,n="Unknown error status: "+e+" with message "+i.message),l=!0,h.io(new tr(t,n)),c.close()}else $i("Connection","WebChannel received:",n),h.ro(n)}})),d(r,Vi.STAT_EVENT,(e=>{e.stat===Fi.PROXY?$i("Connection","Detected buffering proxy"):e.stat===Fi.NOPROXY&&$i("Connection","Detected no buffering proxy")})),setTimeout((()=>{h.so()}),0),h}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nu(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Du(e){return new uc(e,!0)}class Ru{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Hs=e,this.timerId=t,this.mo=n,this.yo=s,this.po=i,this.Io=0,this.To=null,this.Eo=Date.now(),this.reset()}reset(){this.Io=0}Ao(){this.Io=this.po}Ro(e){this.cancel();const t=Math.floor(this.Io+this.bo()),n=Math.max(0,Date.now()-this.Eo),s=Math.max(0,t-n);s>0&&$i("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Io} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.To=this.Hs.enqueueAfterDelay(this.timerId,s,(()=>(this.Eo=Date.now(),e()))),this.Io*=this.yo,this.Io<this.mo&&(this.Io=this.mo),this.Io>this.po&&(this.Io=this.po)}Po(){null!==this.To&&(this.To.skipDelay(),this.To=null)}cancel(){null!==this.To&&(this.To.cancel(),this.To=null)}bo(){return(Math.random()-.5)*this.Io}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(e,t,n,s,i,r,o,a){this.Hs=e,this.vo=n,this.Vo=s,this.connection=i,this.authCredentialsProvider=r,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.So=0,this.Do=null,this.Co=null,this.stream=null,this.xo=new Ru(e,t)}No(){return 1===this.state||5===this.state||this.ko()}ko(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.Oo()}async stop(){this.No()&&await this.close(0)}Mo(){this.state=0,this.xo.reset()}Fo(){this.ko()&&null===this.Do&&(this.Do=this.Hs.enqueueAfterDelay(this.vo,6e4,(()=>this.$o())))}Bo(e){this.Lo(),this.stream.send(e)}async $o(){if(this.ko())return this.close(0)}Lo(){this.Do&&(this.Do.cancel(),this.Do=null)}Uo(){this.Co&&(this.Co.cancel(),this.Co=null)}async close(e,t){this.Lo(),this.Uo(),this.xo.cancel(),this.So++,4!==e?this.xo.reset():t&&t.code===er.RESOURCE_EXHAUSTED?(Wi(t.toString()),Wi("Using maximum backoff delay to prevent overloading the backend."),this.xo.Ao()):t&&t.code===er.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.qo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zr(t)}qo(){}auth(){this.state=1;const e=this.Ko(this.So),t=this.So;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([e,n])=>{this.So===t&&this.Go(e,n)}),(t=>{e((()=>{const e=new tr(er.UNKNOWN,"Fetching auth token failed: "+t.message);return this.Qo(e)}))}))}Go(e,t){const n=this.Ko(this.So);this.stream=this.jo(e,t),this.stream.Yr((()=>{n((()=>(this.state=2,this.Co=this.Hs.enqueueAfterDelay(this.Vo,1e4,(()=>(this.ko()&&(this.state=3),Promise.resolve()))),this.listener.Yr())))})),this.stream.Zr((e=>{n((()=>this.Qo(e)))})),this.stream.onMessage((e=>{n((()=>this.onMessage(e)))}))}Oo(){this.state=5,this.xo.Ro((async()=>{this.state=0,this.start()}))}Qo(e){return $i("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Ko(e){return t=>{this.Hs.enqueueAndForget((()=>this.So===e?t():($i("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Lu extends Ou{constructor(e,t,n,s,i,r){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,r),this.It=i}jo(e,t){return this.connection.wo("Listen",e,t)}onMessage(e){this.xo.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const s=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:Yi()}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],r=function(e,t){return e.gt?(Ji(void 0===t||"string"==typeof t),jr.fromBase64String(t||"")):(Ji(void 0===t||t instanceof Uint8Array),jr.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(e){const t=void 0===e.code?er.UNKNOWN:xa(e.code);return new tr(t,e.message||"")}(o);n=new nc(s,i,r,a||null)}else if("documentChange"in t){t.documentChange;const s=t.documentChange;s.document,s.document.name,s.document.updateTime;const i=yc(e,s.document.name),r=fc(s.document.updateTime),o=new yo({mapValue:{fields:s.document.fields}}),a=wo.newFoundDocument(i,r,o),c=s.targetIds||[],u=s.removedTargetIds||[];n=new ec(c,u,a.key,a)}else if("documentDelete"in t){t.documentDelete;const s=t.documentDelete;s.document;const i=yc(e,s.document),r=s.readTime?fc(s.readTime):gr.min(),o=wo.newNoDocument(i,r),a=s.removedTargetIds||[];n=new ec([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const s=t.documentRemove;s.document;const i=yc(e,s.document),r=s.removedTargetIds||[];n=new ec([],r,i,null)}else{if(!("filter"in t))return Yi();{t.filter;const e=t.filter;e.targetId;const s=e.count||0,i=new La(s),r=e.targetId;n=new tc(r,i)}}return n}(this.It,e),n=function(e){if(!("targetChange"in e))return gr.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?gr.min():t.readTime?fc(t.readTime):gr.min()}(e);return this.listener.Wo(t,n)}zo(e){const t={};t.database=Ec(this.It),t.addTarget=function(e,t){let n;const s=t.target;return n=bo(s)?{documents:bc(e,s)}:{query:Sc(e,s)},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0?n.resumeToken=hc(e,t.resumeToken):t.snapshotVersion.compareTo(gr.min())>0&&(n.readTime=lc(e,t.snapshotVersion.toTimestamp())),n}(this.It,e);const n=function(e,t){const n=function(e,t){switch(t){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return Yi()}}(0,t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.It,e);n&&(t.labels=n),this.Bo(t)}Ho(e){const t={};t.database=Ec(this.It),t.removeTarget=e,this.Bo(t)}}class Mu extends Ou{constructor(e,t,n,s,i,r){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,r),this.It=i,this.Jo=!1}get Yo(){return this.Jo}start(){this.Jo=!1,this.lastStreamToken=void 0,super.start()}qo(){this.Jo&&this.Xo([])}jo(e,t){return this.connection.wo("Write",e,t)}onMessage(e){if(Ji(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Jo){this.xo.reset();const t=function(e,t){return e&&e.length>0?(Ji(void 0!==t),e.map((e=>function(e,t){let n=e.updateTime?fc(e.updateTime):fc(t);return n.isEqual(gr.min())&&(n=fc(t)),new ya(n,e.transformResults||[])}(e,t)))):[]}(e.writeResults,e.commitTime),n=fc(e.commitTime);return this.listener.Zo(n,t)}return Ji(!e.writeResults||0===e.writeResults.length),this.Jo=!0,this.listener.tu()}eu(){const e={};e.database=Ec(this.It),this.Bo(e)}Xo(e){const t={streamToken:this.lastStreamToken,writes:e.map((e=>_c(this.It,e)))};this.Bo(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu extends class{}{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.It=s,this.nu=!1}su(){if(this.nu)throw new tr(er.FAILED_PRECONDITION,"The client has already been terminated.")}ao(e,t,n){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,i])=>this.connection.ao(e,t,n,s,i))).catch((e=>{throw"FirebaseError"===e.name?(e.code===er.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new tr(er.UNKNOWN,e.toString())}))}_o(e,t,n,s){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,r])=>this.connection._o(e,t,n,i,r,s))).catch((e=>{throw"FirebaseError"===e.name?(e.code===er.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new tr(er.UNKNOWN,e.toString())}))}terminate(){this.nu=!0}}class Uu{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.iu=0,this.ru=null,this.ou=!0}uu(){0===this.iu&&(this.cu("Unknown"),this.ru=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.ru=null,this.au("Backend didn't respond within 10 seconds."),this.cu("Offline"),Promise.resolve()))))}hu(e){"Online"===this.state?this.cu("Unknown"):(this.iu++,this.iu>=1&&(this.lu(),this.au(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.cu("Offline")))}set(e){this.lu(),this.iu=0,"Online"===e&&(this.ou=!1),this.cu(e)}cu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}au(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ou?(Wi(t),this.ou=!1):$i("OnlineStateTracker",t)}lu(){null!==this.ru&&(this.ru.cancel(),this.ru=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.fu=[],this.du=new Map,this._u=new Set,this.wu=[],this.mu=i,this.mu.qr((e=>{n.enqueueAndForget((async()=>{zu(this)&&($i("RemoteStore","Restarting streams for network reachability change."),await async function(e){const t=Zi(e);t._u.add(4),await Fu(t),t.gu.set("Unknown"),t._u.delete(4),await Vu(t)}(this))}))})),this.gu=new Uu(n,s)}}async function Vu(e){if(zu(e))for(const t of e.wu)await t(!0)}async function Fu(e){for(const t of e.wu)await t(!1)}function Bu(e,t){const n=Zi(e);n.du.has(t.targetId)||(n.du.set(t.targetId,t),Gu(n)?Ku(n):ll(n).ko()&&ju(n,t))}function qu(e,t){const n=Zi(e),s=ll(n);n.du.delete(t),s.ko()&&Hu(n,t),0===n.du.size&&(s.ko()?s.Fo():zu(n)&&n.gu.set("Unknown"))}function ju(e,t){e.yu.Mt(t.targetId),ll(e).zo(t)}function Hu(e,t){e.yu.Mt(t),ll(e).Ho(t)}function Ku(e){e.yu=new ic({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),se:t=>e.du.get(t)||null}),ll(e).start(),e.gu.uu()}function Gu(e){return zu(e)&&!ll(e).No()&&e.du.size>0}function zu(e){return 0===Zi(e)._u.size}function $u(e){e.yu=void 0}async function Wu(e){e.du.forEach(((t,n)=>{ju(e,t)}))}async function Qu(e,t){$u(e),Gu(e)?(e.gu.hu(t),Ku(e)):e.gu.set("Unknown")}async function Xu(e,t,n){if(e.gu.set("Online"),t instanceof nc&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const s of t.targetIds)e.du.has(s)&&(await e.remoteSyncer.rejectListen(s,n),e.du.delete(s),e.yu.removeTarget(s))}(e,t)}catch(n){$i("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await Yu(e,n)}else if(t instanceof ec?e.yu.Gt(t):t instanceof tc?e.yu.Yt(t):e.yu.Wt(t),!n.isEqual(gr.min()))try{const t=await mu(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.yu.te(t);return n.targetChanges.forEach(((n,s)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.du.get(s);i&&e.du.set(s,i.withResumeToken(n.resumeToken,t))}})),n.targetMismatches.forEach((t=>{const n=e.du.get(t);if(!n)return;e.du.set(t,n.withResumeToken(jr.EMPTY_BYTE_STRING,n.snapshotVersion)),Hu(e,t);const s=new jc(n.target,t,1,n.sequenceNumber);ju(e,s)})),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){$i("RemoteStore","Failed to raise snapshot:",t),await Yu(e,t)}}async function Yu(e,t,n){if(!Rr(t))throw t;e._u.add(1),await Fu(e),e.gu.set("Offline"),n||(n=()=>mu(e.localStore)),e.asyncQueue.enqueueRetryable((async()=>{$i("RemoteStore","Retrying IndexedDB access"),await n(),e._u.delete(1),await Vu(e)}))}function Ju(e,t){return t().catch((n=>Yu(e,n,t)))}async function Zu(e){const t=Zi(e),n=hl(t);let s=t.fu.length>0?t.fu[t.fu.length-1].batchId:-1;for(;el(t);)try{const e=await yu(t.localStore,s);if(null===e){0===t.fu.length&&n.Fo();break}s=e.batchId,tl(t,e)}catch(e){await Yu(t,e)}nl(t)&&sl(t)}function el(e){return zu(e)&&e.fu.length<10}function tl(e,t){e.fu.push(t);const n=hl(e);n.ko()&&n.Yo&&n.Xo(t.mutations)}function nl(e){return zu(e)&&!hl(e).No()&&e.fu.length>0}function sl(e){hl(e).start()}async function il(e){hl(e).eu()}async function rl(e){const t=hl(e);for(const n of e.fu)t.Xo(n.mutations)}async function ol(e,t,n){const s=e.fu.shift(),i=Bc.from(s,t,n);await Ju(e,(()=>e.remoteSyncer.applySuccessfulWrite(i))),await Zu(e)}async function al(e,t){t&&hl(e).Yo&&await async function(e,t){if(Ua(n=t.code)&&n!==er.ABORTED){const n=e.fu.shift();hl(e).Mo(),await Ju(e,(()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t))),await Zu(e)}var n}(e,t),nl(e)&&sl(e)}async function cl(e,t){const n=Zi(e);n.asyncQueue.verifyOperationInProgress(),$i("RemoteStore","RemoteStore received new credentials");const s=zu(n);n._u.add(3),await Fu(n),s&&n.gu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n._u.delete(3),await Vu(n)}async function ul(e,t){const n=Zi(e);t?(n._u.delete(2),await Vu(n)):t||(n._u.add(2),await Fu(n),n.gu.set("Unknown"))}function ll(e){return e.pu||(e.pu=function(e,t,n){const s=Zi(e);return s.su(),new Lu(t,s.connection,s.authCredentials,s.appCheckCredentials,s.It,n)}(e.datastore,e.asyncQueue,{Yr:Wu.bind(null,e),Zr:Qu.bind(null,e),Wo:Xu.bind(null,e)}),e.wu.push((async t=>{t?(e.pu.Mo(),Gu(e)?Ku(e):e.gu.set("Unknown")):(await e.pu.stop(),$u(e))}))),e.pu}function hl(e){return e.Iu||(e.Iu=function(e,t,n){const s=Zi(e);return s.su(),new Mu(t,s.connection,s.authCredentials,s.appCheckCredentials,s.It,n)}(e.datastore,e.asyncQueue,{Yr:il.bind(null,e),Zr:al.bind(null,e),tu:rl.bind(null,e),Zo:ol.bind(null,e)}),e.wu.push((async t=>{t?(e.Iu.Mo(),await Zu(e)):(await e.Iu.stop(),e.fu.length>0&&($i("RemoteStore",`Stopping write stream with ${e.fu.length} pending writes`),e.fu=[]))}))),e.Iu
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class dl{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new nr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((e=>{}))}static createAndSchedule(e,t,n,s,i){const r=Date.now()+n,o=new dl(e,t,r,s,i);return o.start(n),o}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new tr(er.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function fl(e,t){if(Wi("AsyncQueue",`${t}: ${e}`),Rr(e))return new tr(er.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(e){this.comparator=e?(t,n)=>e(t,n)||Ir.comparator(t.key,n.key):(e,t)=>Ir.comparator(e.key,t.key),this.keyedMap=ja(),this.sortedSet=new Ur(this.comparator)}static emptySet(e){return new pl(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof pl))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,s=n.getNext().key;if(!e.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new pl;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(){this.Tu=new Ur(Ir.comparator)}track(e){const t=e.doc.key,n=this.Tu.get(t);n?0!==e.type&&3===n.type?this.Tu=this.Tu.insert(t,e):3===e.type&&1!==n.type?this.Tu=this.Tu.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.Tu=this.Tu.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.Tu=this.Tu.remove(t):1===e.type&&2===n.type?this.Tu=this.Tu.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):Yi():this.Tu=this.Tu.insert(t,e)}Eu(){const e=[];return this.Tu.inorderTraversal(((t,n)=>{e.push(n)})),e}}class gl{constructor(e,t,n,s,i,r,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=r,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,s,i){const r=[];return t.forEach((e=>{r.push({type:0,doc:e})})),new gl(e,t,pl.emptySet(t),r,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Qo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(){this.Au=void 0,this.listeners=[]}}class vl{constructor(){this.queries=new Va((e=>Xo(e)),Qo),this.onlineState="Unknown",this.Ru=new Set}}async function wl(e,t){const n=Zi(e),s=t.query;let i=!1,r=n.queries.get(s);if(r||(i=!0,r=new yl),i)try{r.Au=await n.onListen(s)}catch(e){const n=fl(e,`Initialization of query '${Yo(t.query)}' failed`);return void t.onError(n)}n.queries.set(s,r),r.listeners.push(t),t.bu(n.onlineState),r.Au&&t.Pu(r.Au)&&_l(n)}async function El(e,t){const n=Zi(e),s=t.query;let i=!1;const r=n.queries.get(s);if(r){const e=r.listeners.indexOf(t);e>=0&&(r.listeners.splice(e,1),i=0===r.listeners.length)}if(i)return n.queries.delete(s),n.onUnlisten(s)}function Il(e,t){const n=Zi(e);let s=!1;for(const e of t){const t=e.query,i=n.queries.get(t);if(i){for(const t of i.listeners)t.Pu(e)&&(s=!0);i.Au=e}}s&&_l(n)}function Tl(e,t,n){const s=Zi(e),i=s.queries.get(t);if(i)for(const e of i.listeners)e.onError(n);s.queries.delete(t)}function _l(e){e.Ru.forEach((e=>{e.next()}))}class bl{constructor(e,t,n){this.query=e,this.vu=t,this.Vu=!1,this.Su=null,this.onlineState="Unknown",this.options=n||{}}Pu(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new gl(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.Du(e)&&(this.vu.next(e),t=!0):this.Cu(e,this.onlineState)&&(this.xu(e),t=!0),this.Su=e,t}onError(e){this.vu.error(e)}bu(e){this.onlineState=e;let t=!1;return this.Su&&!this.Vu&&this.Cu(this.Su,e)&&(this.xu(this.Su),t=!0),t}Cu(e,t){if(!e.fromCache)return!0;const n="Offline"!==t;return(!this.options.Nu||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Du(e){if(e.docChanges.length>0)return!0;const t=this.Su&&this.Su.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}xu(e){e=gl.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.vu.next(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Sl{constructor(e){this.key=e}}class Al{constructor(e){this.key=e}}class kl{constructor(e,t){this.query=e,this.Uu=t,this.qu=null,this.hasCachedResults=!1,this.current=!1,this.Ku=Qa(),this.mutatedKeys=Qa(),this.Gu=ea(e),this.Qu=new pl(this.Gu)}get ju(){return this.Uu}Wu(e,t){const n=t?t.zu:new ml,s=t?t.Qu:this.Qu;let i=t?t.mutatedKeys:this.mutatedKeys,r=s,o=!1;const a="F"===this.query.limitType&&s.size===this.query.limit?s.last():null,c="L"===this.query.limitType&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((e,t)=>{const u=s.get(e),l=Jo(this.query,t)?t:null,h=!!u&&this.mutatedKeys.has(u.key),d=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let f=!1;u&&l?u.data.isEqual(l.data)?h!==d&&(n.track({type:3,doc:l}),f=!0):this.Hu(u,l)||(n.track({type:2,doc:l}),f=!0,(a&&this.Gu(l,a)>0||c&&this.Gu(l,c)<0)&&(o=!0)):!u&&l?(n.track({type:0,doc:l}),f=!0):u&&!l&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(l?(r=r.add(l),i=d?i.add(e):i.delete(e)):(r=r.delete(e),i=i.delete(e)))})),null!==this.query.limit)for(;r.size>this.query.limit;){const e="F"===this.query.limitType?r.last():r.first();r=r.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{Qu:r,zu:n,$i:o,mutatedKeys:i}}Hu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n){const s=this.Qu;this.Qu=e.Qu,this.mutatedKeys=e.mutatedKeys;const i=e.zu.Eu();i.sort(((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Yi()}};return n(e)-n(t)}(e.type,t.type)||this.Gu(e.doc,t.doc))),this.Ju(n);const r=t?this.Yu():[],o=0===this.Ku.size&&this.current?1:0,a=o!==this.qu;return this.qu=o,0!==i.length||a?{snapshot:new gl(this.query,e.Qu,s,i,e.mutatedKeys,0===o,a,!1,!!n&&n.resumeToken.approximateByteSize()>0),Xu:r}:{Xu:r}}bu(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Qu:this.Qu,zu:new ml,mutatedKeys:this.mutatedKeys,$i:!1},!1)):{Xu:[]}}Zu(e){return!this.Uu.has(e)&&!!this.Qu.has(e)&&!this.Qu.get(e).hasLocalMutations}Ju(e){e&&(e.addedDocuments.forEach((e=>this.Uu=this.Uu.add(e))),e.modifiedDocuments.forEach((e=>{})),e.removedDocuments.forEach((e=>this.Uu=this.Uu.delete(e))),this.current=e.current)}Yu(){if(!this.current)return[];const e=this.Ku;this.Ku=Qa(),this.Qu.forEach((e=>{this.Zu(e.key)&&(this.Ku=this.Ku.add(e.key))}));const t=[];return e.forEach((e=>{this.Ku.has(e)||t.push(new Al(e))})),this.Ku.forEach((n=>{e.has(n)||t.push(new Sl(n))})),t}tc(e){this.Uu=e.Hi,this.Ku=Qa();const t=this.Wu(e.documents);return this.applyChanges(t,!0)}ec(){return gl.fromInitialDocuments(this.query,this.Qu,this.mutatedKeys,0===this.qu,this.hasCachedResults)}}class Cl{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Nl{constructor(e){this.key=e,this.nc=!1}}class Dl{constructor(e,t,n,s,i,r){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=r,this.sc={},this.ic=new Va((e=>Xo(e)),Qo),this.rc=new Map,this.oc=new Set,this.uc=new Ur(Ir.comparator),this.cc=new Map,this.ac=new tu,this.hc={},this.lc=new Map,this.fc=Qc.vn(),this.onlineState="Unknown",this.dc=void 0}get isPrimaryClient(){return!0===this.dc}}async function Rl(e,t){const n=Ql(e);let s,i;const r=n.ic.get(t);if(r)s=r.targetId,n.sharedClientState.addLocalQueryTarget(s),i=r.view.ec();else{const e=await vu(n.localStore,$o(t));n.isPrimaryClient&&Bu(n.remoteStore,e);const r=n.sharedClientState.addLocalQueryTarget(e.targetId);s=e.targetId,i=await Ol(n,t,s,"current"===r,e.resumeToken)}return i}async function Ol(e,t,n,s,i){e._c=(t,n,s)=>async function(e,t,n,s){let i=t.view.Wu(n);i.$i&&(i=await Eu(e.localStore,t.query,!1).then((({documents:e})=>t.view.Wu(e,i))));const r=s&&s.targetChanges.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,r);return Hl(e,t.targetId,o.Xu),o.snapshot}(e,t,n,s);const r=await Eu(e.localStore,t,!0),o=new kl(t,r.Hi),a=o.Wu(r.documents),c=Za.createSynthesizedTargetChangeForCurrentChange(n,s&&"Offline"!==e.onlineState,i),u=o.applyChanges(a,e.isPrimaryClient,c);Hl(e,n,u.Xu);const l=new Cl(t,n,o);return e.ic.set(t,l),e.rc.has(n)?e.rc.get(n).push(t):e.rc.set(n,[t]),u.snapshot}async function Ll(e,t){const n=Zi(e),s=n.ic.get(t),i=n.rc.get(s.targetId);if(i.length>1)return n.rc.set(s.targetId,i.filter((e=>!Qo(e,t)))),void n.ic.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await wu(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),qu(n.remoteStore,s.targetId),ql(n,s.targetId)})).catch(Nr)):(ql(n,s.targetId),await wu(n.localStore,s.targetId,!0))}async function Ml(e,t){const n=Zi(e);try{const e=await function(e,t){const n=Zi(e),s=t.snapshotVersion;let i=n.Ui;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(e=>{const r=n.Gi.newChangeBuffer({trackRemovals:!0});i=n.Ui;const o=[];t.targetChanges.forEach(((r,a)=>{const c=i.get(a);if(!c)return;o.push(n.Cs.removeMatchingKeys(e,r.removedDocuments,a).next((()=>n.Cs.addMatchingKeys(e,r.addedDocuments,a))));let u=c.withSequenceNumber(e.currentSequenceNumber);t.targetMismatches.has(a)?u=u.withResumeToken(jr.EMPTY_BYTE_STRING,gr.min()).withLastLimboFreeSnapshotVersion(gr.min()):r.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(r.resumeToken,s)),i=i.insert(a,u),function(e,t,n){return 0===e.resumeToken.approximateByteSize()||t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(c,u,r)&&o.push(n.Cs.updateTargetData(e,u))}));let a=Ba(),c=Qa();if(t.documentUpdates.forEach((s=>{t.resolvedLimboDocuments.has(s)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,s))})),o.push(gu(e,r,t.documentUpdates).next((e=>{a=e.Wi,c=e.zi}))),!s.isEqual(gr.min())){const t=n.Cs.getLastRemoteSnapshotVersion(e).next((t=>n.Cs.setTargetsMetadata(e,e.currentSequenceNumber,s)));o.push(t)}return Dr.waitFor(o).next((()=>r.apply(e))).next((()=>n.localDocuments.getLocalViewOfDocuments(e,a,c))).next((()=>a))})).then((e=>(n.Ui=i,e)))}(n.localStore,t);t.targetChanges.forEach(((e,t)=>{const s=n.cc.get(t);s&&(Ji(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1),e.addedDocuments.size>0?s.nc=!0:e.modifiedDocuments.size>0?Ji(s.nc):e.removedDocuments.size>0&&(Ji(s.nc),s.nc=!1))})),await zl(n,e,t)}catch(e){await Nr(e)}}function Pl(e,t,n){const s=Zi(e);if(s.isPrimaryClient&&0===n||!s.isPrimaryClient&&1===n){const e=[];s.ic.forEach(((n,s)=>{const i=s.view.bu(t);i.snapshot&&e.push(i.snapshot)})),function(e,t){const n=Zi(e);n.onlineState=t;let s=!1;n.queries.forEach(((e,n)=>{for(const e of n.listeners)e.bu(t)&&(s=!0)})),s&&_l(n)}(s.eventManager,t),e.length&&s.sc.Wo(e),s.onlineState=t,s.isPrimaryClient&&s.sharedClientState.setOnlineState(t)}}async function Ul(e,t,n){const s=Zi(e);s.sharedClientState.updateQueryState(t,"rejected",n);const i=s.cc.get(t),r=i&&i.key;if(r){let e=new Ur(Ir.comparator);e=e.insert(r,wo.newNoDocument(r,gr.min()));const n=Qa().add(r),i=new Ja(gr.min(),new Map,new Fr(fr),e,n);await Ml(s,i),s.uc=s.uc.remove(r),s.cc.delete(t),Gl(s)}else await wu(s.localStore,t,!1).then((()=>ql(s,t,n))).catch(Nr)}async function xl(e,t){const n=Zi(e),s=t.batch.batchId;try{const e=await function(e,t){const n=Zi(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(e=>{const s=t.batch.keys(),i=n.Gi.newChangeBuffer({trackRemovals:!0});return function(e,t,n,s){const i=n.batch,r=i.keys();let o=Dr.resolve();return r.forEach((e=>{o=o.next((()=>s.getEntry(t,e))).next((t=>{const r=n.docVersions.get(e);Ji(null!==r),t.version.compareTo(r)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),s.addEntry(t)))}))})),o.next((()=>e.mutationQueue.removeMutationBatch(t,i)))}(n,e,t,i).next((()=>i.apply(e))).next((()=>n.mutationQueue.performConsistencyCheck(e))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(e,s,t.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=Qa();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t)))).next((()=>n.localDocuments.getDocuments(e,s)))}))}(n.localStore,t);Bl(n,s,null),Fl(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await zl(n,e)}catch(e){await Nr(e)}}async function Vl(e,t,n){const s=Zi(e);try{const e=await function(e,t){const n=Zi(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",(e=>{let s;return n.mutationQueue.lookupMutationBatch(e,t).next((t=>(Ji(null!==t),s=t.keys(),n.mutationQueue.removeMutationBatch(e,t)))).next((()=>n.mutationQueue.performConsistencyCheck(e))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(e,s,t))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,s))).next((()=>n.localDocuments.getDocuments(e,s)))}))}(s.localStore,t);Bl(s,t,n),Fl(s,t),s.sharedClientState.updateMutationState(t,"rejected",n),await zl(s,e)}catch(e){await Nr(e)}}function Fl(e,t){(e.lc.get(t)||[]).forEach((e=>{e.resolve()})),e.lc.delete(t)}function Bl(e,t,n){const s=Zi(e);let i=s.hc[s.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),s.hc[s.currentUser.toKey()]=i}}function ql(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const s of e.rc.get(t))e.ic.delete(s),n&&e.sc.wc(s,n);e.rc.delete(t),e.isPrimaryClient&&e.ac.ls(t).forEach((t=>{e.ac.containsKey(t)||jl(e,t)}))}function jl(e,t){e.oc.delete(t.path.canonicalString());const n=e.uc.get(t);null!==n&&(qu(e.remoteStore,n),e.uc=e.uc.remove(t),e.cc.delete(n),Gl(e))}function Hl(e,t,n){for(const s of n)s instanceof Sl?(e.ac.addReference(s.key,t),Kl(e,s)):s instanceof Al?($i("SyncEngine","Document no longer in limbo: "+s.key),e.ac.removeReference(s.key,t),e.ac.containsKey(s.key)||jl(e,s.key)):Yi()}function Kl(e,t){const n=t.key,s=n.path.canonicalString();e.uc.get(n)||e.oc.has(s)||($i("SyncEngine","New document in limbo: "+n),e.oc.add(s),Gl(e))}function Gl(e){for(;e.oc.size>0&&e.uc.size<e.maxConcurrentLimboResolutions;){const t=e.oc.values().next().value;e.oc.delete(t);const n=new Ir(vr.fromString(t)),s=e.fc.next();e.cc.set(s,new Nl(n)),e.uc=e.uc.insert(n,s),Bu(e.remoteStore,new jc($o(qo(n.path)),s,2,Or.at))}}async function zl(e,t,n){const s=Zi(e),i=[],r=[],o=[];s.ic.isEmpty()||(s.ic.forEach(((e,a)=>{o.push(s._c(a,t,n).then((e=>{if((e||n)&&s.isPrimaryClient&&s.sharedClientState.updateQueryState(a.targetId,(null==e?void 0:e.fromCache)?"not-current":"current"),e){i.push(e);const t=lu.Ci(a.targetId,e);r.push(t)}})))})),await Promise.all(o),s.sc.Wo(i),await async function(e,t){const n=Zi(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(e=>Dr.forEach(t,(t=>Dr.forEach(t.Si,(s=>n.persistence.referenceDelegate.addReference(e,t.targetId,s))).next((()=>Dr.forEach(t.Di,(s=>n.persistence.referenceDelegate.removeReference(e,t.targetId,s)))))))))}catch(e){if(!Rr(e))throw e;$i("LocalStore","Failed to update sequence numbers: "+e)}for(const e of t){const t=e.targetId;if(!e.fromCache){const e=n.Ui.get(t),s=e.snapshotVersion,i=e.withLastLimboFreeSnapshotVersion(s);n.Ui=n.Ui.insert(t,i)}}}(s.localStore,r))}async function $l(e,t){const n=Zi(e);if(!n.currentUser.isEqual(t)){$i("SyncEngine","User change. New user:",t.toKey());const e=await pu(n.localStore,t);n.currentUser=t,function(e,t){e.lc.forEach((e=>{e.forEach((e=>{e.reject(new tr(er.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),e.lc.clear()}(n),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await zl(n,e.ji)}}function Wl(e,t){const n=Zi(e),s=n.cc.get(t);if(s&&s.nc)return Qa().add(s.key);{let e=Qa();const s=n.rc.get(t);if(!s)return e;for(const t of s){const s=n.ic.get(t);e=e.unionWith(s.view.ju)}return e}}function Ql(e){const t=Zi(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ml.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Wl.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Ul.bind(null,t),t.sc.Wo=Il.bind(null,t.eventManager),t.sc.wc=Tl.bind(null,t.eventManager),t}function Xl(e){const t=Zi(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=xl.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Vl.bind(null,t),t}class Yl{constructor(){this.synchronizeTabs=!1}async initialize(e){this.It=Du(e.databaseInfo.databaseId),this.sharedClientState=this.gc(e),this.persistence=this.yc(e),await this.persistence.start(),this.localStore=this.Ic(e),this.gcScheduler=this.Tc(e,this.localStore),this.indexBackfillerScheduler=this.Ec(e,this.localStore)}Tc(e,t){return null}Ec(e,t){return null}Ic(e){return fu(this.persistence,new hu,e.initialUser,this.It)}yc(e){return new au(uu.Bs,this.It)}gc(e){return new _u}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class Jl{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>Pl(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=$l.bind(null,this.syncEngine),await ul(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new vl}createDatastore(e){const t=Du(e.databaseInfo.databaseId),n=(s=e.databaseInfo,new Cu(s));var s;return function(e,t,n,s){return new Pu(e,t,n,s)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){var t,n,s,i,r;return t=this.localStore,n=this.datastore,s=e.asyncQueue,i=e=>Pl(this.syncEngine,e,0),r=Su.C()?new Su:new bu,new xu(t,n,s,i,r)}createSyncEngine(e,t){return function(e,t,n,s,i,r,o){const a=new Dl(e,t,n,s,i,r);return o&&(a.dc=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){const t=Zi(e);$i("RemoteStore","RemoteStore shutting down."),t._u.add(5),await Fu(t),t.mu.shutdown(),t.gu.set("Unknown")}(this.remoteStore)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(e,t,n){if(!n)throw new tr(er.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function eh(e){if(!Ir.isDocumentKey(e))throw new tr(er.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function th(e){if(Ir.isDocumentKey(e))throw new tr(er.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function nh(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":Yi()}function sh(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new tr(er.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=nh(e);throw new tr(er.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ih=new Map;class rh{constructor(e){var t;if(void 0===e.host){if(void 0!==e.ssl)throw new tr(er.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new tr(er.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,function(e,t,n,s){if(!0===t&&!0===s)throw new tr(er.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new rh({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new tr(er.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new tr(er.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new rh(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new ir;switch(e.type){case"gapi":const t=e.client;return new cr(t,e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new tr(er.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=ih.get(e);t&&($i("ComponentProvider","Removing Datastore"),ih.delete(e),t.terminate())}(this),Promise.resolve()}}function ah(e,t,n,s={}){var i;const r=(e=sh(e,oh))._getSettings();if("firestore.googleapis.com"!==r.host&&r.host!==t&&Qi("Host has been set in both settings() and useEmulator(), emulator host will be used"),e._setSettings(Object.assign(Object.assign({},r),{host:`${t}:${n}`,ssl:!1})),s.mockUserToken){let t,n;if("string"==typeof s.mockUserToken)t=s.mockUserToken,n=Hi.MOCK_USER;else{t=D(s.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);const r=s.mockUserToken.sub||s.mockUserToken.user_id;if(!r)throw new tr(er.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new Hi(r)}e._authCredentials=new rr(new sr(t,n))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new lh(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ch(this.firestore,e,this._key)}}class uh{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new uh(this.firestore,e,this._query)}}class lh extends uh{constructor(e,t,n){super(e,t,qo(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ch(this.firestore,null,new Ir(e))}withConverter(e){return new lh(this.firestore,e,this._path)}}function hh(e,t,...n){if(e=H(e),Zl("collection","path",t),e instanceof oh){const s=vr.fromString(t,...n);return th(s),new lh(e,null,s)}{if(!(e instanceof ch||e instanceof lh))throw new tr(er.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=e._path.child(vr.fromString(t,...n));return th(s),new lh(e.firestore,null,s)}}function dh(e,t,...n){if(e=H(e),1===arguments.length&&(t=dr.R()),Zl("doc","path",t),e instanceof oh){const s=vr.fromString(t,...n);return eh(s),new ch(e,null,new Ir(s))}{if(!(e instanceof ch||e instanceof lh))throw new tr(er.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=e._path.child(vr.fromString(t,...n));return eh(s),new ch(e.firestore,e instanceof lh?e.converter:null,new Ir(s))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fh{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Rc(this.observer.next,e)}error(e){this.observer.error?this.Rc(this.observer.error,e):Wi("Uncaught Error in snapshot listener:",e)}bc(){this.muted=!0}Rc(e,t){this.muted||setTimeout((()=>{this.muted||e(t)}),0)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ph{constructor(e,t,n,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=s,this.user=Hi.UNAUTHENTICATED,this.clientId=dr.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,(async e=>{$i("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e})),this.appCheckCredentials.start(n,(e=>($i("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user))))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new tr(er.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new nr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=fl(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function mh(e,t){e.asyncQueue.verifyOperationInProgress(),$i("FirestoreClient","Initializing OfflineComponentProvider");const n=await e.getConfiguration();await t.initialize(n);let s=n.initialUser;e.setCredentialChangeListener((async e=>{s.isEqual(e)||(await pu(t.localStore,e),s=e)})),t.persistence.setDatabaseDeletedListener((()=>e.terminate())),e.offlineComponents=t}async function gh(e,t){e.asyncQueue.verifyOperationInProgress();const n=await yh(e);$i("FirestoreClient","Initializing OnlineComponentProvider");const s=await e.getConfiguration();await t.initialize(n,s),e.setCredentialChangeListener((e=>cl(t.remoteStore,e))),e.setAppCheckTokenChangeListener(((e,n)=>cl(t.remoteStore,n))),e.onlineComponents=t}async function yh(e){return e.offlineComponents||($i("FirestoreClient","Using default OfflineComponentProvider"),await mh(e,new Yl)),e.offlineComponents}async function vh(e){return e.onlineComponents||($i("FirestoreClient","Using default OnlineComponentProvider"),await gh(e,new Jl)),e.onlineComponents}function wh(e){return vh(e).then((e=>e.syncEngine))}async function Eh(e){const t=await vh(e),n=t.eventManager;return n.onListen=Rl.bind(null,t.syncEngine),n.onUnlisten=Ll.bind(null,t.syncEngine),n}function Ih(e,t,n={}){const s=new nr;return e.asyncQueue.enqueueAndForget((async()=>function(e,t,n,s,i){const r=new fh({next:n=>{t.enqueueAndForget((()=>El(e,o))),n.fromCache&&"server"===s.source?i.reject(new tr(er.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),o=new bl(n,r,{includeMetadataChanges:!0,Nu:!0});return wl(e,o)}(await Eh(e),e.asyncQueue,t,n,s))),s.promise}class Th{constructor(){this.Bc=Promise.resolve(),this.Lc=[],this.Uc=!1,this.qc=[],this.Kc=null,this.Gc=!1,this.Qc=!1,this.jc=[],this.xo=new Ru(this,"async_queue_retry"),this.Wc=()=>{const e=Nu();e&&$i("AsyncQueue","Visibility state changed to "+e.visibilityState),this.xo.Po()};const e=Nu();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Wc)}get isShuttingDown(){return this.Uc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.zc(),this.Hc(e)}enterRestrictedMode(e){if(!this.Uc){this.Uc=!0,this.Qc=e||!1;const t=Nu();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Wc)}}enqueue(e){if(this.zc(),this.Uc)return new Promise((()=>{}));const t=new nr;return this.Hc((()=>this.Uc&&this.Qc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Lc.push(e),this.Jc())))}async Jc(){if(0!==this.Lc.length){try{await this.Lc[0](),this.Lc.shift(),this.xo.reset()}catch(e){if(!Rr(e))throw e;$i("AsyncQueue","Operation failed with retryable error: "+e)}this.Lc.length>0&&this.xo.Ro((()=>this.Jc()))}}Hc(e){const t=this.Bc.then((()=>(this.Gc=!0,e().catch((e=>{this.Kc=e,this.Gc=!1;const t=function(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}(e);throw Wi("INTERNAL UNHANDLED ERROR: ",t),e})).then((e=>(this.Gc=!1,e))))));return this.Bc=t,t}enqueueAfterDelay(e,t,n){this.zc(),this.jc.indexOf(e)>-1&&(t=0);const s=dl.createAndSchedule(this,e,t,n,(e=>this.Yc(e)));return this.qc.push(s),s}zc(){this.Kc&&Yi()}verifyOperationInProgress(){}async Xc(){let e;do{e=this.Bc,await e}while(e!==this.Bc)}Zc(e){for(const t of this.qc)if(t.timerId===e)return!0;return!1}ta(e){return this.Xc().then((()=>{this.qc.sort(((e,t)=>e.targetTimeMs-t.targetTimeMs));for(const t of this.qc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Xc()}))}ea(e){this.jc.push(e)}Yc(e){const t=this.qc.indexOf(e);this.qc.splice(t,1)}}function _h(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const e of["next","error","complete"])if(e in n&&"function"==typeof n[e])return!0;return!1}(e)}class bh extends oh{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new Th,this._persistenceKey=(null==s?void 0:s.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||Ah(this),this._firestoreClient.terminate()}}function Sh(e){return e._firestoreClient||Ah(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function Ah(e){var t;const n=e._freezeSettings(),s=function(e,t,n,s){return new Xr(e,t,n,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,s.useFetchStreams)}(e._databaseId,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,n);e._firestoreClient=new ph(e._authCredentials,e._appCheckCredentials,e._queue,s)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class kh{constructor(e){this._byteString=e}static fromBase64String(e){try{return new kh(jr.fromBase64String(e))}catch(e){throw new tr(er.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new kh(jr.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new tr(er.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Er(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Nh{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new tr(er.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new tr(er.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return fr(this._lat,e._lat)||fr(this._long,e._long)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rh=/^__.*__$/;class Oh{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new ka(e,this.data,this.fieldMask,t,this.fieldTransforms):new Aa(e,this.data,t,this.fieldTransforms)}}function Lh(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Yi()}}class Mh{constructor(e,t,n,s,i,r){this.settings=e,this.databaseId=t,this.It=n,this.ignoreUndefinedProperties=s,void 0===i&&this.na(),this.fieldTransforms=i||[],this.fieldMask=r||[]}get path(){return this.settings.path}get sa(){return this.settings.sa}ia(e){return new Mh(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.It,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ra(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),s=this.ia({path:n,oa:!1});return s.ua(e),s}ca(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),s=this.ia({path:n,oa:!1});return s.na(),s}aa(e){return this.ia({path:void 0,oa:!0})}ha(e){return Gh(e,this.settings.methodName,this.settings.la||!1,this.path,this.settings.fa)}contains(e){return void 0!==this.fieldMask.find((t=>e.isPrefixOf(t)))||void 0!==this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))}na(){if(this.path)for(let e=0;e<this.path.length;e++)this.ua(this.path.get(e))}ua(e){if(0===e.length)throw this.ha("Document fields must not be empty");if(Lh(this.sa)&&Rh.test(e))throw this.ha('Document fields cannot begin and end with "__"')}}class Ph{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.It=n||Du(e)}da(e,t,n,s=!1){return new Mh({sa:e,methodName:t,fa:n,path:Er.emptyPath(),oa:!1,la:s},this.databaseId,this.It,this.ignoreUndefinedProperties)}}function Uh(e){const t=e._freezeSettings(),n=Du(e._databaseId);return new Ph(e._databaseId,!!t.ignoreUndefinedProperties,n)}function xh(e,t,n,s,i,r={}){const o=e.da(r.merge||r.mergeFields?2:0,t,n,i);qh("Data must be an object, but it was:",o,s);const a=Fh(s,o);let c,u;if(r.merge)c=new qr(o.fieldMask),u=o.fieldTransforms;else if(r.mergeFields){const e=[];for(const s of r.mergeFields){const i=jh(t,s,n);if(!o.contains(i))throw new tr(er.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);zh(e,i)||e.push(i)}c=new qr(e),u=o.fieldTransforms.filter((e=>c.covers(e.field)))}else c=null,u=o.fieldTransforms;return new Oh(new yo(a),c,u)}function Vh(e,t){if(Bh(e=H(e)))return qh("Unsupported field value:",t,e),Fh(e,t);if(e instanceof Nh)return function(e,t){if(!Lh(t.sa))throw t.ha(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.ha(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.oa&&4!==t.sa)throw t.ha("Nested arrays are not supported");return function(e,t){const n=[];let s=0;for(const i of e){let e=Vh(i,t.aa(s));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),s++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=H(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return ia(t.It,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=mr.fromDate(e);return{timestampValue:lc(t.It,n)}}if(e instanceof mr){const n=new mr(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:lc(t.It,n)}}if(e instanceof Dh)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof kh)return{bytesValue:hc(t.It,e._byteString)};if(e instanceof ch){const n=t.databaseId,s=e.firestore._databaseId;if(!s.isEqual(n))throw t.ha(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:pc(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.ha(`Unsupported field value: ${nh(e)}`)}(e,t)}function Fh(e,t){const n={};return Pr(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Mr(e,((e,s)=>{const i=Vh(s,t.ra(e));null!=i&&(n[e]=i)})),{mapValue:{fields:n}}}function Bh(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof mr||e instanceof Dh||e instanceof kh||e instanceof ch||e instanceof Nh)}function qh(e,t,n){if(!Bh(n)||!function(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}(n)){const s=nh(n);throw"an object"===s?t.ha(e+" a custom object"):t.ha(e+" "+s)}}function jh(e,t,n){if((t=H(t))instanceof Ch)return t._internalPath;if("string"==typeof t)return Kh(e,t);throw Gh("Field path arguments must be of type string or ",e,!1,void 0,n)}const Hh=new RegExp("[~\\*/\\[\\]]");function Kh(e,t,n){if(t.search(Hh)>=0)throw Gh(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Ch(...t.split("."))._internalPath}catch(s){throw Gh(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Gh(e,t,n,s,i){const r=s&&!s.isEmpty(),o=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(r||o)&&(c+=" (found",r&&(c+=` in field ${s}`),o&&(c+=` in document ${i}`),c+=")"),new tr(er.INVALID_ARGUMENT,a+e+c)}function zh(e,t){return e.some((e=>e.isEqual(t)))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ch(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new Wh(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Qh("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class Wh extends $h{data(){return super.data()}}function Qh(e,t){return"string"==typeof t?Kh(e,t):t instanceof Ch?t._internalPath:t._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xh(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new tr(er.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Yh{}function Jh(e,...t){for(const n of t)e=n._apply(e);return e}class Zh extends Yh{constructor(e,t){super(),this.ma=e,this.pa=t,this.type="orderBy"}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new tr(er.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new tr(er.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const s=new Po(t,n);return function(e,t){if(null===Ho(e)){const n=Ko(e);null!==n&&td(e,n,t.field)}}(e,s),s}(e._query,this.ma,this.pa);return new uh(e.firestore,e.converter,function(e,t){const n=e.explicitOrderBy.concat([t]);return new Fo(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function ed(e,t="asc"){const n=t,s=Qh("orderBy",e);return new Zh(s,n)}function td(e,t,n){if(!n.isEqual(t))throw new tr(er.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${t.toString()}' and so you must also use '${t.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{convertValue(e,t="none"){switch(no(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Gr(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(zr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw Yi()}}convertObject(e,t){const n={};return Mr(e.fields,((e,s)=>{n[e]=this.convertValue(s,t)})),n}convertGeoPoint(e){return new Dh(Gr(e.latitude),Gr(e.longitude))}convertArray(e,t){return(e.values||[]).map((e=>this.convertValue(e,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Wr(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Qr(e));default:return null}}convertTimestamp(e){const t=Kr(e);return new mr(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=vr.fromString(e);Ji(Pc(n));const s=new Yr(n.get(1),n.get(3)),i=new Ir(n.popFirst(5));return s.isEqual(t)||Wi(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sd(e,t,n){let s;return s=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,s}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class id{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class rd extends $h{constructor(e,t,n,s,i,r){super(e,t,n,s,r),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new od(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Qh("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class od extends rd{data(e={}){return super.data(e)}}class ad{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new id(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new od(this._firestore,this._userDataWriter,n.key,n,new id(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new tr(er.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map((n=>{const s=new od(e._firestore,e._userDataWriter,n.doc.key,n.doc,new id(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:s,oldIndex:-1,newIndex:t++}}))}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter((e=>t||3!==e.type)).map((t=>{const s=new od(e._firestore,e._userDataWriter,t.doc.key,t.doc,new id(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let i=-1,r=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),r=n.indexOf(t.doc.key)),{type:cd(t.type),doc:s,oldIndex:i,newIndex:r}}))}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function cd(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Yi()}}class ud extends nd{constructor(e){super(),this.firestore=e}convertBytes(e){return new kh(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ch(this.firestore,null,t)}}function ld(e){e=sh(e,uh);const t=sh(e.firestore,bh),n=Sh(t),s=new ud(t);return Xh(e._query),Ih(n,e._query).then((n=>new ad(t,s,e,n)))}function hd(e,t,n){e=sh(e,ch);const s=sh(e.firestore,bh),i=sd(e.converter,t,n);return md(s,[xh(Uh(s),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,va.none())])}function dd(e){return md(sh(e.firestore,bh),[new Ra(e._key,va.none())])}function fd(e,t){const n=sh(e.firestore,bh),s=dh(e),i=sd(e.converter,t);return md(n,[xh(Uh(e.firestore),"addDoc",s._key,i,null!==e.converter,{}).toMutation(s._key,va.exists(!1))]).then((()=>s))}function pd(e,...t){var n,s,i;e=H(e);let r={includeMetadataChanges:!1},o=0;"object"!=typeof t[o]||_h(t[o])||(r=t[o],o++);const a={includeMetadataChanges:r.includeMetadataChanges};if(_h(t[o])){const e=t[o];t[o]=null===(n=e.next)||void 0===n?void 0:n.bind(e),t[o+1]=null===(s=e.error)||void 0===s?void 0:s.bind(e),t[o+2]=null===(i=e.complete)||void 0===i?void 0:i.bind(e)}let c,u,l;if(e instanceof ch)u=sh(e.firestore,bh),l=qo(e._key.path),c={next:n=>{t[o]&&t[o](gd(u,e,n))},error:t[o+1],complete:t[o+2]};else{const n=sh(e,uh);u=sh(n.firestore,bh),l=n._query;const s=new ud(u);c={next:e=>{t[o]&&t[o](new ad(u,s,n,e))},error:t[o+1],complete:t[o+2]},Xh(e._query)}return function(e,t,n,s){const i=new fh(s),r=new bl(t,i,n);return e.asyncQueue.enqueueAndForget((async()=>wl(await Eh(e),r))),()=>{i.bc(),e.asyncQueue.enqueueAndForget((async()=>El(await Eh(e),r)))}}(Sh(u),l,a,c)}function md(e,t){return function(e,t){const n=new nr;return e.asyncQueue.enqueueAndForget((async()=>async function(e,t,n){const s=Xl(e);try{const e=await function(e,t){const n=Zi(e),s=mr.now(),i=t.reduce(((e,t)=>e.add(t.key)),Qa());let r,o;return n.persistence.runTransaction("Locally write mutations","readwrite",(e=>{let a=Ba(),c=Qa();return n.Gi.getEntries(e,i).next((e=>{a=e,a.forEach(((e,t)=>{t.isValidDocument()||(c=c.add(e))}))})).next((()=>n.localDocuments.getOverlayedDocuments(e,a))).next((i=>{r=i;const o=[];for(const e of t){const t=ba(e,r.get(e.key).overlayedDocument);null!=t&&o.push(new ka(e.key,t,vo(t.value.mapValue),va.exists(!0)))}return n.mutationQueue.addMutationBatch(e,s,o,t)})).next((t=>{o=t;const s=t.applyToLocalDocumentSet(r,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,s)}))})).then((()=>({batchId:o.batchId,changes:Ha(r)})))}(s.localStore,t);s.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let s=e.hc[e.currentUser.toKey()];s||(s=new Ur(fr)),s=s.insert(t,n),e.hc[e.currentUser.toKey()]=s}(s,e.batchId,n),await zl(s,e.changes),await Zu(s.remoteStore)}catch(e){const t=fl(e,"Failed to persist write");n.reject(t)}}(await wh(e),t,n))),n.promise}(Sh(e),t)}function gd(e,t,n){const s=n.docs.get(t._key),i=new ud(e);return new rd(e,i,t._key,s,new id(n.hasPendingWrites,n.fromCache),t.converter)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e,t=!0){Ki="9.13.0",be(new K("firestore",((e,{instanceIdentifier:n,options:s})=>{const i=e.getProvider("app").getImmediate(),r=new bh(new or(e.getProvider("auth-internal")),new lr(e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new tr(er.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Yr(e.options.projectId,t)}(i,n),i);return s=Object.assign({useFetchStreams:t},s),r._setSettings(s),r}),"PUBLIC").setMultipleInstances(!0)),De("@firebase/firestore","3.7.2",e),De("@firebase/firestore","3.7.2","esm2017")}();function yd(e,t){var n={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(s=Object.getOwnPropertySymbols(e);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(n[s[i]]=e[s[i]])}return n}Object.create;Object.create;function vd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const wd=vd,Ed=new O("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),Id={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized"},Td=new ee("@firebase/auth");function _d(e,...t){Td.logLevel<=W.ERROR&&Td.error(`Auth (9.13.0): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bd(e,...t){throw Cd(e,...t)}function Sd(e,...t){return Cd(e,...t)}function Ad(e,t,n){const s=Object.assign(Object.assign({},wd()),{[t]:n});return new O("auth","Firebase",s).create(t,{appName:e.name})}function kd(e,t,n){if(!(t instanceof n))throw n.name!==t.constructor.name&&bd(e,"argument-error"),Ad(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Cd(e,...t){if("string"!=typeof e){const n=t[0],s=[...t.slice(1)];return s[0]&&(s[0].appName=e.name),e._errorFactory.create(n,...s)}return Ed.create(e,...t)}function Nd(e,t,...n){if(!e)throw Cd(t,...n)}function Dd(e){const t="INTERNAL ASSERTION FAILED: "+e;throw _d(t),new Error(t)}function Rd(e,t){e||Dd(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Od=new Map;function Ld(e){Rd(e instanceof Function,"Expected a class definition");let t=Od.get(e);return t?(Rd(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Od.set(e,t),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Md(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function Pd(){return"http:"===Ud()||"https:"===Ud()}function Ud(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xd(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&(Pd()||I()||"connection"in navigator))||navigator.onLine}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Vd{constructor(e,t){this.shortDelay=e,this.longDelay=t,Rd(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(E())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return xd()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fd(e,t){Rd(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:void Dd("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:void Dd("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:void Dd("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qd={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"},jd=new Vd(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hd(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function Kd(e,t,n,s,i={}){return Gd(e,i,(async()=>{let i={},r={};s&&("GET"===t?r=s:i={body:JSON.stringify(s)});const o=x(Object.assign({key:e.config.apiKey},r)).slice(1),a=await e._getAdditionalHeaders();return a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode),Bd.fetch()($d(e,e.config.apiHost,n,o),Object.assign({method:t,headers:a,referrerPolicy:"no-referrer"},i))}))}async function Gd(e,t,n){e._canInitEmulator=!1;const s=Object.assign(Object.assign({},qd),t);try{const t=new Wd(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const r=await i.json();if("needConfirmation"in r)throw Qd(e,"account-exists-with-different-credential",r);if(i.ok&&!("errorMessage"in r))return r;{const t=i.ok?r.errorMessage:r.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw Qd(e,"credential-already-in-use",r);if("EMAIL_EXISTS"===n)throw Qd(e,"email-already-in-use",r);if("USER_DISABLED"===n)throw Qd(e,"user-disabled",r);const a=s[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw Ad(e,a,o);bd(e,a)}}catch(t){if(t instanceof R)throw t;bd(e,"network-request-failed")}}async function zd(e,t,n,s,i={}){const r=await Kd(e,t,n,s,i);return"mfaPendingCredential"in r&&bd(e,"multi-factor-auth-required",{_serverResponse:r}),r}function $d(e,t,n,s){const i=`${t}${n}?${s}`;return e.config.emulator?Fd(e.config,i):`${e.config.apiScheme}://${i}`}class Wd{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise(((e,t)=>{this.timer=setTimeout((()=>t(Sd(this.auth,"network-request-failed"))),jd.get())}))}clearNetworkTimeout(){clearTimeout(this.timer)}}function Qd(e,t,n){const s={appName:e.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const i=Sd(e,t,s);return i.customData._tokenResponse=n,i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Xd(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yd(e){return 1e3*Number(e)}function Jd(e){var t;const[n,s,i]=e.split(".");if(void 0===n||void 0===s||void 0===i)return _d("JWT malformed, contained fewer than 3 sections"),null;try{const e=w(s);return e?JSON.parse(e):(_d("Failed to decode base64 JWT payload"),null)}catch(e){return _d("Caught error parsing JWT payload as JSON",null===(t=e)||void 0===t?void 0:t.toString()),null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Zd(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof R&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}class ef{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout((async()=>{await this.iteration()}),t)}async iteration(){var e;try{await this.user.getIdToken(!0)}catch(t){return void("auth/network-request-failed"===(null===(e=t)||void 0===e?void 0:e.code)&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Xd(this.lastLoginAt),this.creationTime=Xd(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nf(e){var t;const n=e.auth,s=await e.getIdToken(),i=await Zd(e,async function(e,t){return Kd(e,"POST","/v1/accounts:lookup",t)}(n,{idToken:s}));Nd(null==i?void 0:i.users.length,n,"internal-error");const r=i.users[0];e._notifyReloadListener(r);const o=(null===(t=r.providerUserInfo)||void 0===t?void 0:t.length)?r.providerUserInfo.map((e=>{var{providerId:t}=e,n=yd(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})):[];const a=(c=e.providerData,u=o,[...c.filter((e=>!u.some((t=>t.providerId===e.providerId)))),...u]);var c,u;const l=e.isAnonymous,h=!(e.email&&r.passwordHash||(null==a?void 0:a.length)),d=!!l&&h,f={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new tf(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(e,f)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class sf{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Nd(e.idToken,"internal-error"),Nd(void 0!==e.idToken,"internal-error"),Nd(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):function(e){const t=Jd(e);return Nd(t,"internal-error"),Nd(void 0!==t.exp,"internal-error"),Nd(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return Nd(!this.accessToken||this.refreshToken,e,"user-token-expired"),t||!this.accessToken||this.isExpired?this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t){const n=await Gd(e,{},(async()=>{const n=x({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:i}=e.config,r=$d(e,s,"/v1/token",`key=${i}`),o=await e._getAdditionalHeaders();return o["Content-Type"]="application/x-www-form-urlencoded",Bd.fetch()(r,{method:"POST",headers:o,body:n})}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,r=new sf;return n&&(Nd("string"==typeof n,"internal-error",{appName:e}),r.refreshToken=n),s&&(Nd("string"==typeof s,"internal-error",{appName:e}),r.accessToken=s),i&&(Nd("number"==typeof i,"internal-error",{appName:e}),r.expirationTime=i),r}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new sf,this.toJSON())}_performRefresh(){return Dd("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rf(e,t){Nd("string"==typeof e||void 0===e,"internal-error",{appName:t})}class of{constructor(e){var{uid:t,auth:n,stsTokenManager:s}=e,i=yd(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ef(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new tf(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Zd(this,this.stsTokenManager.getToken(this.auth,e));return Nd(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=H(e),s=await n.getIdToken(t),i=Jd(s);Nd(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const r="object"==typeof i.firebase?i.firebase:void 0,o=null==r?void 0:r.sign_in_provider;return{claims:i,token:s,authTime:Xd(Yd(i.auth_time)),issuedAtTime:Xd(Yd(i.iat)),expirationTime:Xd(Yd(i.exp)),signInProvider:o||null,signInSecondFactor:(null==r?void 0:r.sign_in_second_factor)||null}}(this,e)}reload(){return async function(e){const t=H(e);await nf(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(Nd(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map((e=>Object.assign({},e))),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new of(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){Nd(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await nf(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Zd(this,async function(e,t){return Kd(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((e=>Object.assign({},e))),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,s,i,r,o,a,c,u;const l=null!==(n=t.displayName)&&void 0!==n?n:void 0,h=null!==(s=t.email)&&void 0!==s?s:void 0,d=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,f=null!==(r=t.photoURL)&&void 0!==r?r:void 0,p=null!==(o=t.tenantId)&&void 0!==o?o:void 0,m=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,g=null!==(c=t.createdAt)&&void 0!==c?c:void 0,y=null!==(u=t.lastLoginAt)&&void 0!==u?u:void 0,{uid:v,emailVerified:w,isAnonymous:E,providerData:I,stsTokenManager:T}=t;Nd(v&&T,e,"internal-error");const _=sf.fromJSON(this.name,T);Nd("string"==typeof v,e,"internal-error"),rf(l,e.name),rf(h,e.name),Nd("boolean"==typeof w,e,"internal-error"),Nd("boolean"==typeof E,e,"internal-error"),rf(d,e.name),rf(f,e.name),rf(p,e.name),rf(m,e.name),rf(g,e.name),rf(y,e.name);const b=new of({uid:v,auth:e,email:h,emailVerified:w,displayName:l,isAnonymous:E,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:_,createdAt:g,lastLoginAt:y});return I&&Array.isArray(I)&&(b.providerData=I.map((e=>Object.assign({},e)))),m&&(b._redirectEventId=m),b}static async _fromIdTokenResponse(e,t,n=!1){const s=new sf;s.updateFromServerResponse(t);const i=new of({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await nf(i),i}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}af.type="NONE";const cf=af;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uf(e,t,n){return`firebase:${e}:${t}:${n}`}class lf{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=uf(this.userKey,s.apiKey,i),this.fullPersistenceKey=uf("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?of._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new lf(Ld(cf),e,n);const s=(await Promise.all(t.map((async e=>{if(await e._isAvailable())return e})))).filter((e=>e));let i=s[0]||Ld(cf);const r=uf(n,e.config.apiKey,e.name);let o=null;for(const n of t)try{const t=await n._get(r);if(t){const s=of._fromJSON(e,t);n!==i&&(o=s),i=n;break}}catch(e){}const a=s.filter((e=>e._shouldAllowMigration));return i._shouldAllowMigration&&a.length?(i=a[0],o&&await i._set(r,o.toJSON()),await Promise.all(t.map((async e=>{if(e!==i)try{await e._remove(r)}catch(e){}}))),new lf(i,e,n)):new lf(i,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hf(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(mf(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(df(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(yf(t))return"Blackberry";if(vf(t))return"Webos";if(ff(t))return"Safari";if((t.includes("chrome/")||pf(t))&&!t.includes("edge/"))return"Chrome";if(gf(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function df(e=E()){return/firefox\//i.test(e)}function ff(e=E()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function pf(e=E()){return/crios\//i.test(e)}function mf(e=E()){return/iemobile/i.test(e)}function gf(e=E()){return/android/i.test(e)}function yf(e=E()){return/blackberry/i.test(e)}function vf(e=E()){return/webos/i.test(e)}function wf(e=E()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Ef(){return T()&&10===document.documentMode}function If(e=E()){return wf(e)||gf(e)||vf(e)||yf(e)||/windows phone/i.test(e)||mf(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Tf(e,t=[]){let n;switch(e){case"Browser":n=hf(E());break;case"Worker":n=`${hf(E())}-${e}`;break;default:n=e}return`${n}/JsCore/9.13.0/${t.length?t.join(","):"FirebaseCore-web"}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise(((n,s)=>{try{n(e(t))}catch(e){s(e)}}));n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){var t;if(this.auth.currentUser===e)return;const n=[];try{for(const t of this.queue)await t(e),t.onAbort&&n.push(t.onAbort)}catch(e){n.reverse();for(const e of n)try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null===(t=e)||void 0===t?void 0:t.message})}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(e,t,n){this.app=e,this.heartbeatServiceProvider=t,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Af(this),this.idTokenSubscription=new Af(this),this.beforeStateQueue=new _f(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ed,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ld(t)),this._initializationPromise=this.queue((async()=>{var n,s;if(!this._deleted&&(this.persistenceManager=await lf.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(s=this.currentUser)||void 0===s?void 0:s.uid)||null,this._deleted||(this._isInitialized=!0)}})),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUser(e){var t;const n=await this.assertedPersistence.getCurrentUser();let s=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,r=null==s?void 0:s._redirectEventId,o=await this.tryRedirectSignIn(e);n&&n!==r||!(null==o?void 0:o.user)||(s=o.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(e){s=n,this._popupRedirectResolver._overrideRedirectResult(this,(()=>Promise.reject(e)))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Nd(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){var t;try{await nf(e)}catch(e){if("auth/network-request-failed"!==(null===(t=e)||void 0===t?void 0:t.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const t=e?H(e):null;return t&&Nd(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Nd(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue((async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()}))}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue((async()=>{await this.assertedPersistence.setPersistence(Ld(e))}))}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new O("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ld(e)||this._popupRedirectResolver;Nd(t,this,"argument-error"),this.redirectPersistenceManager=await lf.create(this,[Ld(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue((async()=>{})),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue((async()=>this.directlySetCurrentUser(e)))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i="function"==typeof t?t:t.next.bind(t),r=this._isInitialized?Promise.resolve():this._initializationPromise;return Nd(r,this,"internal-error"),r.then((()=>i(this.currentUser))),"function"==typeof t?e.addObserver(t,n,s):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Nd(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Tf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());return n&&(t["X-Firebase-Client"]=n),t}}function Sf(e){return H(e)}class Af{constructor(e){this.auth=e,this.observer=null,this.addObserver=B((e=>this.observer=e))}get next(){return Nd(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function kf(e,t,n){const s=Sf(e);Nd(s._canInitEmulator,s,"emulator-config-failed"),Nd(/^https?:\/\//.test(t),s,"invalid-emulator-scheme");const i=!!(null==n?void 0:n.disableWarnings),r=Cf(t),{host:o,port:a}=function(e){const t=Cf(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(s);if(i){const e=i[1];return{host:e,port:Nf(s.substr(e.length+1))}}{const[e,t]=s.split(":");return{host:e,port:Nf(t)}}}(t),c=null===a?"":`:${a}`;s.config.emulator={url:`${r}//${o}${c}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */()}function Cf(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Nf(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class Df{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Dd("not implemented")}_getIdTokenResponse(e){return Dd("not implemented")}_linkToIdToken(e,t){return Dd("not implemented")}_getReauthenticationResolver(e){return Dd("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rf(e,t){return Kd(e,"POST","/v1/accounts:update",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Of extends Df{constructor(e,t,n,s=null){super("password",n),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Of(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Of(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(e,t){return zd(e,"POST","/v1/accounts:signInWithPassword",Hd(e,t))}(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(e,t){return zd(e,"POST","/v1/accounts:signInWithEmailLink",Hd(e,t))}(e,{email:this._email,oobCode:this._password});default:bd(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Rf(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return async function(e,t){return zd(e,"POST","/v1/accounts:signInWithEmailLink",Hd(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:bd(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lf(e,t){return zd(e,"POST","/v1/accounts:signInWithIdp",Hd(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mf extends Df{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Mf(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):bd("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:s}=t,i=yd(t,["providerId","signInMethod"]);if(!n||!s)return null;const r=new Mf(n,s);return r.idToken=i.idToken||void 0,r.accessToken=i.accessToken||void 0,r.secret=i.secret,r.nonce=i.nonce,r.pendingToken=i.pendingToken||null,r}_getIdTokenResponse(e){return Lf(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Lf(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Lf(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=x(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf={USER_NOT_FOUND:"user-not-found"};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Uf extends Df{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new Uf({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Uf({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return async function(e,t){return zd(e,"POST","/v1/accounts:signInWithPhoneNumber",Hd(e,t))}(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return async function(e,t){const n=await zd(e,"POST","/v1/accounts:signInWithPhoneNumber",Hd(e,t));if(n.temporaryProof)throw Qd(e,"account-exists-with-different-credential",n);return n}(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return async function(e,t){return zd(e,"POST","/v1/accounts:signInWithPhoneNumber",Hd(e,Object.assign(Object.assign({},t),{operation:"REAUTH"})),Pf)}(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:s,temporaryProof:i}=e;return n||t||s||i?new Uf({verificationId:t,verificationCode:n,phoneNumber:s,temporaryProof:i}):null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xf{constructor(e){var t,n,s,i,r,o;const a=V(F(e)),c=null!==(t=a.apiKey)&&void 0!==t?t:null,u=null!==(n=a.oobCode)&&void 0!==n?n:null,l=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(s=a.mode)&&void 0!==s?s:null);Nd(c&&u&&l,"argument-error"),this.apiKey=c,this.operation=l,this.code=u,this.continueUrl=null!==(i=a.continueUrl)&&void 0!==i?i:null,this.languageCode=null!==(r=a.languageCode)&&void 0!==r?r:null,this.tenantId=null!==(o=a.tenantId)&&void 0!==o?o:null}static parseLink(e){const t=function(e){const t=V(F(e)).link,n=t?V(F(t)).deep_link_id:null,s=V(F(e)).deep_link_id;return(s?V(F(s)).link:null)||s||n||t||e}(e);try{return new xf(t)}catch(e){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Vf{constructor(){this.providerId=Vf.PROVIDER_ID}static credential(e,t){return Of._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=xf.parseLink(t);return Nd(n,"argument-error"),Of._fromEmailAndCode(e,n.code,n.tenantId)}}Vf.PROVIDER_ID="password",Vf.EMAIL_PASSWORD_SIGN_IN_METHOD="password",Vf.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ff{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf extends Ff{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qf extends Bf{constructor(){super("facebook.com")}static credential(e){return Mf._fromParams({providerId:qf.PROVIDER_ID,signInMethod:qf.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qf.credentialFromTaggedObject(e)}static credentialFromError(e){return qf.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return qf.credential(e.oauthAccessToken)}catch(e){return null}}}qf.FACEBOOK_SIGN_IN_METHOD="facebook.com",qf.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jf extends Bf{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Mf._fromParams({providerId:jf.PROVIDER_ID,signInMethod:jf.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return jf.credentialFromTaggedObject(e)}static credentialFromError(e){return jf.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return jf.credential(t,n)}catch(e){return null}}}jf.GOOGLE_SIGN_IN_METHOD="google.com",jf.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Hf extends Bf{constructor(){super("github.com")}static credential(e){return Mf._fromParams({providerId:Hf.PROVIDER_ID,signInMethod:Hf.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Hf.credentialFromTaggedObject(e)}static credentialFromError(e){return Hf.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Hf.credential(e.oauthAccessToken)}catch(e){return null}}}Hf.GITHUB_SIGN_IN_METHOD="github.com",Hf.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Kf extends Bf{constructor(){super("twitter.com")}static credential(e,t){return Mf._fromParams({providerId:Kf.PROVIDER_ID,signInMethod:Kf.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Kf.credentialFromTaggedObject(e)}static credentialFromError(e){return Kf.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Kf.credential(t,n)}catch(e){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Gf(e,t){return zd(e,"POST","/v1/accounts:signUp",Hd(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Kf.TWITTER_SIGN_IN_METHOD="twitter.com",Kf.PROVIDER_ID="twitter.com";class zf{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await of._fromIdTokenResponse(e,n,s),r=$f(n);return new zf({user:i,providerId:r,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=$f(n);return new zf({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function $f(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Wf extends R{constructor(e,t,n,s){var i;super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,Wf.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new Wf(e,t,n,s)}}function Qf(e,t,n,s){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch((n=>{if("auth/multi-factor-auth-required"===n.code)throw Wf._fromErrorAndOperation(e,n,t,s);throw n}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xf(e,t,n=!1){const s=await Zd(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return zf._forOperation(e,"link",s)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Yf(e,t,n=!1){var s;const{auth:i}=e,r="reauthenticate";try{const s=await Zd(e,Qf(i,r,t,e),n);Nd(s.idToken,i,"internal-error");const o=Jd(s.idToken);Nd(o,i,"internal-error");const{sub:a}=o;return Nd(e.uid===a,i,"user-mismatch"),zf._forOperation(e,r,s)}catch(e){throw"auth/user-not-found"===(null===(s=e)||void 0===s?void 0:s.code)&&bd(i,"user-mismatch"),e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jf(e,t,n=!1){const s="signIn",i=await Qf(e,s,t),r=await zf._fromIdTokenResponse(e,s,i);return n||await e._updateCurrentUser(r.user),r}async function Zf(e,t){return Jf(Sf(e),t)}async function ep(e,t,n){const s=Sf(e),i=await Gf(s,{returnSecureToken:!0,email:t,password:n}),r=await zf._fromIdTokenResponse(s,"signIn",i);return await s._updateCurrentUser(r.user),r}new WeakMap;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem("__sak","1"),this.storage.removeItem("__sak"),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np extends tp{constructor(){super((()=>window.localStorage),"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=function(){const e=E();return ff(e)||wf(e)}()&&function(){try{return!(!window||window===window.top)}catch(e){return!1}}(),this.fallbackToPolling=If(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys(((e,t,n)=>{this.notifyListeners(e,n)}));const n=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const s=this.storage.getItem(n);if(e.newValue!==s)null!==e.newValue?this.storage.setItem(n,e.newValue):this.storage.removeItem(n);else if(this.localCache[n]===e.newValue&&!t)return}const s=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);Ef()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,10):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((()=>{this.forAllChangedKeys(((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)}))}),1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}np.type="LOCAL";const sp=np;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip extends tp{constructor(){super((()=>window.sessionStorage),"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ip.type="SESSION";const rp=ip;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class op{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find((t=>t.isListeningto(e)));if(t)return t;const n=new op(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,r=this.handlersMap[s];if(!(null==r?void 0:r.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const o=Array.from(r).map((async e=>e(t.origin,i))),a=await function(e){return Promise.all(e.map((async e=>{try{return{fulfilled:!0,value:await e}}catch(e){return{fulfilled:!1,reason:e}}})))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ap(e="",t=10){let n="";for(let e=0;e<t;e++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */op.receivers=[];class cp{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,r;return new Promise(((o,a)=>{const c=ap("",20);s.port1.start();const u=setTimeout((()=>{a(new Error("unsupported_event"))}),n);r={messageChannel:s,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(u),i=setTimeout((()=>{a(new Error("timeout"))}),3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(r),s.port1.addEventListener("message",r.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])})).finally((()=>{r&&this.removeMessageHandler(r)}))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function up(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function lp(){return void 0!==up().WorkerGlobalScope&&"function"==typeof up().importScripts}class hp{constructor(e){this.request=e}toPromise(){return new Promise(((e,t)=>{this.request.addEventListener("success",(()=>{e(this.request.result)})),this.request.addEventListener("error",(()=>{t(this.request.error)}))}))}}function dp(e,t){return e.transaction(["firebaseLocalStorage"],t?"readwrite":"readonly").objectStore("firebaseLocalStorage")}function fp(){const e=indexedDB.open("firebaseLocalStorageDb",1);return new Promise(((t,n)=>{e.addEventListener("error",(()=>{n(e.error)})),e.addEventListener("upgradeneeded",(()=>{const t=e.result;try{t.createObjectStore("firebaseLocalStorage",{keyPath:"fbase_key"})}catch(e){n(e)}})),e.addEventListener("success",(async()=>{const n=e.result;n.objectStoreNames.contains("firebaseLocalStorage")?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase("firebaseLocalStorageDb");return new hp(e).toPromise()}(),t(await fp()))}))}))}async function pp(e,t,n){const s=dp(e,!0).put({fbase_key:t,value:n});return new hp(s).toPromise()}function mp(e,t){const n=dp(e,!0).delete(t);return new hp(n).toPromise()}class gp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((()=>{}),(()=>{}))}async _openDb(){return this.db||(this.db=await fp()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return lp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=op._getInstance(lp()?self:null),this.receiver._subscribe("keyChanged",(async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)}))),this.receiver._subscribe("ping",(async(e,t)=>["keyChanged"]))}async initializeSender(){var e,t;if(this.activeServiceWorker=await async function(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}(),!this.activeServiceWorker)return;this.sender=new cp(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await fp();return await pp(e,"__sak","1"),await mp(e,"__sak"),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite((async()=>(await this._withRetries((n=>pp(n,e,t))),this.localCache[e]=t,this.notifyServiceWorker(e))))}async _get(e){const t=await this._withRetries((t=>async function(e,t){const n=dp(e,!1).get(t),s=await new hp(n).toPromise();return void 0===s?null:s.value}(t,e)));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite((async()=>(await this._withRetries((t=>mp(t,e))),delete this.localCache[e],this.notifyServiceWorker(e))))}async _poll(){const e=await this._withRetries((e=>{const t=dp(e,!1).getAll();return new hp(t).toPromise()}));if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((async()=>this._poll()),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}gp.type="LOCAL";const yp=gp;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vp(e){return new Promise(((t,n)=>{const s=document.createElement("script");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var i,r;s.setAttribute("src",e),s.onload=t,s.onerror=e=>{const t=Sd("internal-error");t.customData=e,n(t)},s.type="text/javascript",s.charset="UTF-8",(null!==(r=null===(i=document.getElementsByTagName("head"))||void 0===i?void 0:i[0])&&void 0!==r?r:document).appendChild(s)}))}function wp(e){return`__${e}${Math.floor(1e6*Math.random())}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
wp("rcb"),new Vd(3e4,6e4);async function Ep(e,t,n){var s;const i=await n.verify();try{let r;if(Nd("string"==typeof i,e,"argument-error"),Nd("recaptcha"===n.type,e,"argument-error"),r="string"==typeof t?{phoneNumber:t}:t,"session"in r){const t=r.session;if("phoneNumber"in r){Nd("enroll"===t.type,e,"internal-error");const n=await
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){return Kd(e,"POST","/v2/accounts/mfaEnrollment:start",Hd(e,t))}(e,{idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,recaptchaToken:i}});return n.phoneSessionInfo.sessionInfo}{Nd("signin"===t.type,e,"internal-error");const n=(null===(s=r.multiFactorHint)||void 0===s?void 0:s.uid)||r.multiFactorUid;Nd(n,e,"missing-multi-factor-info");const o=await function(e,t){return Kd(e,"POST","/v2/accounts/mfaSignIn:start",Hd(e,t))}(e,{mfaPendingCredential:t.credential,mfaEnrollmentId:n,phoneSignInInfo:{recaptchaToken:i}});return o.phoneResponseInfo.sessionInfo}}{const{sessionInfo:t}=await async function(e,t){return Kd(e,"POST","/v1/accounts:sendVerificationCode",Hd(e,t))}(e,{phoneNumber:r.phoneNumber,recaptchaToken:i});return t}}finally{n._reset()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ip{constructor(e){this.providerId=Ip.PROVIDER_ID,this.auth=Sf(e)}verifyPhoneNumber(e,t){return Ep(this.auth,e,H(t))}static credential(e,t){return Uf._fromVerification(e,t)}static credentialFromResult(e){const t=e;return Ip.credentialFromTaggedObject(t)}static credentialFromError(e){return Ip.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?Uf._fromTokenResponse(t,n):null}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Tp(e,t){return t?Ld(t):(Nd(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ip.PROVIDER_ID="phone",Ip.PHONE_SIGN_IN_METHOD="phone";class _p extends Df{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Lf(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Lf(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Lf(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function bp(e){return Jf(e.auth,new _p(e),e.bypassAuthState)}function Sp(e){const{auth:t,user:n}=e;return Nd(n,t,"internal-error"),Yf(n,new _p(e),e.bypassAuthState)}async function Ap(e){const{auth:t,user:n}=e;return Nd(n,t,"internal-error"),Xf(n,new _p(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise((async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}}))}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:r,type:o}=e;if(r)return void this.reject(r);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return bp;case"linkViaPopup":case"linkViaRedirect":return Ap;case"reauthViaPopup":case"reauthViaRedirect":return Sp;default:bd(this.auth,"internal-error")}}resolve(e){Rd(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Rd(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cp=new Vd(2e3,1e4);async function Np(e,t,n){const s=Sf(e);kd(e,t,Ff);const i=Tp(s,n);return new Dp(s,"signInViaPopup",t,i).executeNotNull()}class Dp extends kp{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,Dp.currentPopupAction&&Dp.currentPopupAction.cancel(),Dp.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Nd(e,this.auth,"internal-error"),e}async onExecution(){Rd(1===this.filter.length,"Popup operations only handle one event");const e=ap();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch((e=>{this.reject(e)})),this.resolver._isIframeWebStorageSupported(this.auth,(e=>{e||this.reject(Sd(this.auth,"web-storage-unsupported"))})),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(Sd(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Dp.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout((()=>{this.pollId=null,this.reject(Sd(this.auth,"popup-closed-by-user"))}),2e3):this.pollId=window.setTimeout(e,Cp.get())};e()}}Dp.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Rp=new Map;class Op extends kp{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Rp.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=Pp(t),s=Mp(e);if(!await s._isAvailable())return!1;const i="true"===await s._get(n);return await s._remove(n),i}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}Rp.set(this.auth._key(),e)}return this.bypassAuthState||Rp.set(this.auth._key(),(()=>Promise.resolve(null))),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function Lp(e,t){Rp.set(e._key(),t)}function Mp(e){return Ld(e._redirectPersistence)}function Pp(e){return uf("pendingRedirect",e.config.apiKey,e.name)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Up(e,t,n=!1){const s=Sf(e),i=Tp(s,t),r=new Op(s,i,n),o=await r.execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,t)),o}class xp{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach((n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))})),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Fp(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Fp(e)){const s=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(Sd(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(Vp(e))}saveEventToCache(e){this.cachedEventUids.add(Vp(e)),this.lastProcessedEventTime=Date.now()}}function Vp(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter((e=>e)).join("-")}function Fp({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null==t?void 0:t.code)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Bp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,qp=/^https?/;async function jp(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return Kd(e,"GET","/v1/projects",t)}(e);for(const e of t)try{if(Hp(e))return}catch(e){}bd(e,"unauthorized-domain")}function Hp(e){const t=Md(),{protocol:n,hostname:s}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===s?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===s}if(!qp.test(n))return!1;if(Bp.test(e))return s===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(s)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp=new Vd(3e4,6e4);function Gp(){const e=up().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}let zp=null;function $p(e){return zp=zp||function(e){return new Promise(((t,n)=>{var s,i,r;function o(){Gp(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Gp(),n(Sd(e,"network-request-failed"))},timeout:Kp.get()})}if(null===(i=null===(s=up().gapi)||void 0===s?void 0:s.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else{if(!(null===(r=up().gapi)||void 0===r?void 0:r.load)){const t=wp("iframefcb");return up()[t]=()=>{gapi.load?o():n(Sd(e,"network-request-failed"))},vp(`https://apis.google.com/js/api.js?onload=${t}`).catch((e=>n(e)))}o()}})).catch((e=>{throw zp=null,e}))}(e),zp}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wp=new Vd(5e3,15e3),Qp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Xp=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Yp(e){const t=e.config;Nd(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?Fd(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,s={apiKey:t.apiKey,appName:e.name,v:"9.13.0"},i=Xp.get(e.config.apiHost);i&&(s.eid=i);const r=e._getFrameworks();return r.length&&(s.fw=r.join(",")),`${n}?${x(s).slice(1)}`}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Jp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class Zp{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function em(e,t,n,s=500,i=600){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c=Object.assign(Object.assign({},Jp),{width:s.toString(),height:i.toString(),top:r,left:o}),u=E().toLowerCase();n&&(a=pf(u)?"_blank":n),df(u)&&(t=t||"http://localhost",c.scrollbars="yes");const l=Object.entries(c).reduce(((e,[t,n])=>`${e}${t}=${n},`),"");if(function(e=E()){var t;return wf(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(u)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t||"",a),new Zp(null);const h=window.open(t||"",a,l);Nd(h,e,"popup-blocked");try{h.focus()}catch(e){}return new Zp(h)}function tm(e,t,n,s,i,r){Nd(e.config.authDomain,e,"auth-domain-config-required"),Nd(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:"9.13.0",eventId:i};if(t instanceof Ff){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",M(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(r||{}))o[e]=t}if(t instanceof Bf){const e=t.getScopes().filter((e=>""!==e));e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const e of Object.keys(a))void 0===a[e]&&delete a[e];return`${function({config:e}){return e.emulator?Fd(e,"emulator/auth/handler"):`https://${e.authDomain}/__/auth/handler`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)}?${x(a).slice(1)}`}const nm=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=rp,this._completeRedirectFn=Up,this._overrideRedirectResult=Lp}async _openPopup(e,t,n,s){var i;Rd(null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");return em(e,tm(e,t,n,Md(),s),ap())}async _openRedirect(e,t,n,s){var i;return await this._originValidation(e),i=tm(e,t,n,Md(),s),up().location.href=i,new Promise((()=>{}))}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(Rd(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch((()=>{delete this.eventManagers[t]})),n}async initAndGetManager(e){const t=await async function(e){const t=await $p(e),n=up().gapi;return Nd(n,e,"internal-error"),t.open({where:document.body,url:Yp(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Qp,dontclear:!0},(t=>new Promise((async(n,s)=>{await t.restyle({setHideOnLeave:!1});const i=Sd(e,"network-request-failed"),r=up().setTimeout((()=>{s(i)}),Wp.get());function o(){up().clearTimeout(r),n(t)}t.ping(o).then(o,(()=>{s(i)}))}))))}(e),n=new xp(e);return t.register("authEvent",(t=>{Nd(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send("webStorageSupport",{type:"webStorageSupport"},(n=>{var s;const i=null===(s=null==n?void 0:n[0])||void 0===s?void 0:s.webStorageSupport;void 0!==i&&t(!!i),bd(e,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=jp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return If()||ff()||wf()}};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class sm{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged((t=>{var n;e((null===(n=t)||void 0===n?void 0:n.stsTokenManager.accessToken)||null)}));this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Nd(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const im=C("authIdTokenMaxAge")||300;let rm=null;var om;om="Browser",be(new K("auth",((e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),{apiKey:i,authDomain:r}=n.options;return((e,n)=>{Nd(i&&!i.includes(":"),"invalid-api-key",{appName:e.name}),Nd(!(null==r?void 0:r.includes(":")),"argument-error",{appName:e.name});const s={apiKey:i,authDomain:r,clientPlatform:om,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Tf(om)},o=new bf(e,n,s);return function(e,t){const n=(null==t?void 0:t.persistence)||[],s=(Array.isArray(n)?n:[n]).map(Ld);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(s,null==t?void 0:t.popupRedirectResolver)}(o,t),o})(n,s)}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,n)=>{e.getProvider("auth-internal").initialize()}))),be(new K("auth-internal",(e=>(e=>new sm(e))(Sf(e.getProvider("auth").getImmediate()))),"PRIVATE").setInstantiationMode("EXPLICIT")),De("@firebase/auth","0.20.11",function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(om)),De("@firebase/auth","0.20.11","esm2017");const am=Ce({apiKey:"AIzaSyAOPDKBSriKfsmLTkBXa112jVGdHzHdXTg",authDomain:"chat-application-8b946.firebaseapp.com",projectId:"chat-application-8b946",storageBucket:"chat-application-8b946.appspot.com",messagingSenderId:"484897911627",appId:"1:484897911627:web:b75beca5d7490796d4eece"}),cm=document.querySelector("#app"),um=document.querySelector("#registerForm"),lm=document.querySelector("#backLogin"),hm=document.querySelector(".backMain"),dm=document.querySelector("#txtEmail"),fm=document.querySelector("#txtPassword"),pm=document.querySelector("#txtEmailRegister"),mm=document.querySelector("#txtPasswordRegister"),gm=document.getElementById("login"),ym=document.querySelector("#btnLogin"),vm=document.querySelector("#btnSignupForm"),wm=document.querySelector("#btnSignup"),Em=document.querySelector("#btnGoogle"),Im=document.querySelector("#btnLogout"),Tm=(document.querySelector("#divAuthState"),document.querySelector("#authState")),_m=document.querySelector("#divLoginError"),bm=document.querySelector("#divRegisterError"),Sm=document.querySelector("#errorMessage"),Am=document.querySelector("#errorEmail"),km=document.querySelector("#errorPassword"),Cm=document.querySelector("#errorEmailRegister"),Nm=document.querySelector("#errorPasswordRegister"),Dm=document.querySelector("#profiel"),Rm=document.querySelector("#btnprofiel"),Om=document.querySelector("#chats"),Lm=document.querySelector(".chat"),Mm=document.querySelector("#main"),Pm=document.querySelector("#addChat"),Um=document.querySelector(".header"),xm=document.querySelector("#titel"),Vm=document.querySelector("#logoChat"),Fm=document.querySelector(".settings-bullets"),Bm=document.getElementById("header-chat"),qm=document.getElementById("titel-chat"),jm=document.getElementById("search-input"),Hm=document.getElementById("messages"),Km=document.getElementById("messagesDiv"),Gm=(document.querySelector(".channelInfo"),document.getElementById("message-form")),zm=document.getElementById("message-input"),$m=document.getElementById("users-ingelogd"),Wm=()=>{gm.style.display="block",cm.style.display="none",um.style.display="none"},Qm=()=>{$m.style.display="block",gm.style.display="none",cm.style.display="block",Dm.style.display="none",um.style.display="none",Lm.style.display="none",Om.style.display="block",Pm.style.display="block",jm.style.display="block"},Xm=()=>{_m.style.display="none",Am.style.display="none",km.style.display="none",Sm.innerHTML="",Am.innerHTML="",km.innerHTML=""},Ym=()=>{bm.style.display="none",Cm.style.display="none",Nm.style.display="none",Sm.innerHTML="",Cm.innerHTML="",Nm.innerHTML=""},Jm=e=>{_m.style.display="block",e.code==Id.INVALID_PASSWORD?(Sm.innerHTML="ERROR",km.innerHTML="Wachtwoord is fout.",km.style.display="block"):e.code==Id.INVALID_EMAIL?(Sm.innerHTML="ERROR",Am.innerHTML="E-mail is fout.",Am.style.display="block"):Sm.innerHTML=`Error: ${e.message}`},Zm=e=>{bm.style.display="block",e.code==Id.EMAIL_EXISTS?(Sm.innerHTML="ERROR",Cm.innerHTML="E-mail is al reeds in gebruik.",Cm.style.display="block"):e.code==Id.INVALID_EMAIL?(Sm.innerHTML="ERROR",Cm.innerHTML="Ongeldig emailadres.",Nm.style.display="block",Cm.style.display="block"):e.code==Id.WEAK_PASSWORD?(Sm.innerHTML="ERROR",Nm.innerHTML="Wachtwoord te zwak. Minstens 6 karakters.",Nm.style.display="block"):Sm.innerHTML=`Error: ${e.message}`},eg=e=>{Tm.innerHTML=`You're logged in as ${e} (uid: ${e.uid}, email: ${e.email}) `};Xm(),Ym();const tg=document.getElementById("settings-chat"),ng=document.querySelector(".pathSetting"),sg=document.getElementById("btnVerlaatChat"),ig=document.getElementById("verlaatChat"),rg=document.querySelector("#chatDiv");document.querySelector(".contentChannel");ym.addEventListener("click",(async()=>{const e=dm.value,t=fm.value;try{await(n=og,s=e,i=t,Zf(H(n),Vf.credential(s,i)))}catch(e){console.log(`There was an error: ${e}`),Jm(e)}var n,s,i;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */})),wm.addEventListener("click",(async()=>{const e=pm.value,t=mm.value;try{await ep(og,e,t)}catch(e){console.log(`There was an error: ${e}`),Zm(e)}})),Im.addEventListener("click",(async()=>{var e;await(e=og,H(e).signOut())})),vm.addEventListener("click",(()=>{gm.style.display="none",cm.style.display="none",um.style.display="block"})),lm.addEventListener("click",Wm),Em.addEventListener("click",(async()=>{const e=new jf;e.addScope("https://www.googleapis.com/auth/contacts.readonly"),Np(og,e).then((e=>{jf.credentialFromResult(e).accessToken,e.user})).catch((e=>{e.code,e.message,e.customData.email,jf.credentialFromError(e)}))})),Rm.addEventListener("click",(()=>{$m.style.display="none",gm.style.display="none",Om.style.display="none",Lm.style.display="none",Dm.style.display="block",um.style.display="none",Pm.style.display="none",jm.style.display="none"})),xm.addEventListener("click",Qm),Vm.addEventListener("click",Qm),Fm.addEventListener("click",(()=>{tg.classList.contains("showSetting")?(tg.classList.remove("showSetting"),ng.style.color="white",Bm.style.background="blueviolet",hm.style.display="block",Km.style.display="block",ig.style.display="none",ng.style.fill="white",qm.style.color="white"):(tg.classList.add("showSetting"),Bm.style.background="grey",ng.style.color="blueviolet",hm.style.display="none",Km.style.display="none",ig.style.display="block",ng.style.fill="blueviolet",qm.style.color="grey")})),rg.addEventListener("click",(e=>{$m.style.display="none",Mm.style.display="block",Pm.style.display="none",Lm.style.display="block",Om.style.display="none",Um.style.display="block",jm.style.display="none",Km.scrollTop=Km.scrollHeight;let t=e.target.id;qm.innerHTML=t,pd(Jh(hh(ag,`chatss/${t}/berichten`),ed("createdAt","asc")),(e=>{let t=[];e.empty?(console.log("IS LEEG!"),Hm.innerHTML="<span>Nog geen berichten verstuurd in deze chat.</span>",Hm.style.justifyContent="center"):(Hm.innerHTML="",e.docs.forEach((e=>{t.push({...e.data(),id:e.id});const n=og.currentUser.email===e.data().gebruiker?"sent":"receive";let s=`<span class="${n}">${e.data().gebruiker} : ${e.data().createdAt}</span><li class="${n}">${e.data().chat}</li>`;Hm.innerHTML+=s}))),console.log(t)})),Gm.addEventListener("submit",(async e=>{e.preventDefault(),Km.scrollTop=Km.scrollHeight;let n=new Date,s=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate()+" "+(n.getHours()+":"+n.getMinutes()+":"+n.getSeconds());const i=Jh(hh(ag,"test")),r=(await ld(i)).docs.map((e=>({...e.data(),id:e.id})));console.log(r),r.map((async e=>{await hd(dh(ag,`chatss/${t}/berichten/`,zm.value),{chat:zm.value,gebruiker:og.currentUser.email,createdAt:s}),Gm.reset()}))}))})),sg.addEventListener("click",(async e=>{e.preventDefault();const t=Jh(hh(ag,"chatss")),n=await ld(t);console.log(n);n.docs.map((e=>({...e.data(),id:e.id})));console.log(qm.value),await dd(dh(ag,"chatss/",qm.value))})),hm.addEventListener("click",Qm);const og=function(e=Ne()){const t=Se(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=Se(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(P(n.getOptions(),null!=t?t:{}))return e;bd(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:nm,persistence:[yp,sp,rp]}),s=C("authTokenSyncURL");if(s){const e=(i=s,async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>im)return;const s=null==t?void 0:t.token;rm!==s&&(rm=s,await fetch(i,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))});!function(e,t,n){H(e).beforeAuthStateChanged(t,n)}(n,e,(()=>e(n.currentUser))),function(e,t,n,s){H(e).onIdTokenChanged(t,n,s)}(n,(t=>e(t)))}var i;const r=A("auth");return r&&kf(n,`http://${r}`),n}(am);(async()=>{var e,t,n;e=e=>{e?(console.log(e),Qm(),eg(e),Xm(),Ym()):(Wm(),Tm.innerHTML="You're not logged in.")},H(og).onAuthStateChanged(e,t,n)})();const ag=function(e,t){const n="string"==typeof e?e:t||"(default)",s=Se("object"==typeof e?e:Ne(),"firestore").getImmediate({identifier:n});if(!s._initialized){const e=k("firestore");e&&ah(s,...e)}return s}(am),cg=document.querySelector(".add"),ug=hh(ag,"user");hh(ag,"chats"),hh(ag,"channels");ld(ug).then((e=>{let t=[];e.docs.forEach((e=>{t.push({...e.data(),id:e.id})})),console.log(t)})).catch((e=>{console.log(e.message)})),cg.addEventListener("submit",(async e=>{e.preventDefault(),await fd(ug,{email:pm.value,wachtwoord:mm.value}),cg.reset()}));const lg=document.querySelector("#inputChannel"),hg=document.querySelector("#inputChannelDel"),dg=(document.querySelector("#chats"),document.querySelector("#channel-form")),fg=document.querySelector("#channel-formDel");dg.addEventListener("submit",(async e=>{e.preventDefault();let t=new Date,n=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+(t.getHours()+":"+t.getMinutes()+":"+t.getSeconds());await hd(dh(ag,"chatss/",lg.value),{name:lg.value,createdAt:n}),dg.reset()})),fg.addEventListener("submit",(async e=>{e.preventDefault(),await dd(dh(ag,"chatss/",hg.value)),fg.reset()}));document.getElementById("formDiv");pd(Jh(hh(ag,"chatss"),ed("createdAt","asc")),(e=>{let t=[];rg.innerHTML="";e.docs.forEach((e=>{let n;ld(ug).then((e=>{let t=[];e.docs.forEach((e=>{t.push(e.data().email)})),n=t.join(""),console.log(n);let s=`\n      <p><span>● </span>${n}</p>`;$m.innerHTML=s})),t.push({...e.data(),id:e.id});let s=`<div id="${e.data().name}" class = "channelInfo">\n            <div class ="contentChannel"><h2><a id="${e.data().name}" href="#">${e.data().name}</a></h2>\n            \n            </div>`;rg.innerHTML+=s,qm.style.color="white",console.log(e.id)}))}));jm.addEventListener("keyup",(()=>{pd(hh(ag,"chatss"),(e=>{e.docs.forEach((e=>{let t=jm.value.toUpperCase(),n=rg.getElementsByTagName("h2");rg.getElementsByTagName("div");for(let e=0;e<n.length;e++){let s=n[e].getElementsByTagName("a")[0];(s.textContent||s.innerText).toUpperCase().indexOf(t)>-1?n[e].style.display="block":n[e].style.display="none"}}))}))}));document.querySelector(".formDeleteChannel");const pg=document.getElementsByTagName(".btnDeleteChannel");console.log(pg.id);
//# sourceMappingURL=index.c71b244f.js.map
