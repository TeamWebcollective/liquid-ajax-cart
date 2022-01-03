var t={d:(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{x$:()=>U,nd:()=>N,yF:()=>J,fi:()=>O,Be:()=>H,ih:()=>M,KJ:()=>Q,Q4:()=>G,w0:()=>K});const r={productFormsFilter:t=>!0,messageBuilder:t=>{let e="";return t.forEach((t=>{e+=`<div class="js-ajax-cart-message js-ajax-cart-message--${t.type}">${t.text}</div>`})),e},lineItemQuantityErrorText:"You can't add more of this item to your cart",requestErrorText:"There was an error while updating your cart. Please try again.",updateOnWindowFocus:!0,computed:{productFormsErrorsAttribute:"data-ajax-cart-form-error",sectionsAttribute:"data-ajax-cart-section",binderAttribute:"data-ajax-cart-bind-state",requestButtonAttribute:"data-ajax-cart-request-button",toggleClassButtonAttribute:"data-ajax-cart-toggle-class-button",initialStateAttribute:"data-ajax-cart-initial-state",sectionScrollAreaAttribute:"data-ajax-cart-section-scroll",quantityInputAttribute:"data-ajax-cart-quantity-input",propertyInputAttribute:"data-ajax-cart-property-input",messagesAttribute:"data-ajax-cart-messages",configurationAttribute:"data-ajax-cart-configuration",cartStateSetBodyClass:"js-ajax-cart-set",requestInProgressBodyClass:"js-ajax-cart-request-in-progress",emptyCartBodyClass:"js-ajax-cart-empty",notEmptyCartBodyClass:"js-ajax-cart-not-empty",productFormsProcessingClass:"js-ajax-cart-form-in-progress"}},a=(t,e)=>{t in r&&"computed"!==t?r[t]=e:console.error(`Liquid Ajax Cart: unknown configuration parameter "${t}"`)},o=[],n=t=>{switch(t){case"add":return"/cart/add.js";case"change":return"/cart/change.js";case"get":return"/cart.js";case"clear":return"/cart/clear.js";case"update":return"/cart/update.js";default:return}},s=(t,e,r={})=>{const a=n(t);let s;"get"!==t&&(s=e||{});const i="get"===t?"GET":"POST",c=r.info||{},u="firstComplete"in r?[r.firstComplete]:[],d={requestType:t,endpoint:a};o.forEach((e=>{try{e({requestType:t,endpoint:a,info:c,requestBody:s},(t=>u.push(t)))}catch(t){console.error("Liquid Ajax Cart: Error during Ajax request subscriber callback in ajax-api"),console.error(t)}})),"lastComplete"in r&&u.push(r.lastComplete),d.requestBody=s,d.info=c;const l={method:i};"get"!==t&&(s instanceof FormData||s instanceof URLSearchParams?(l.body=s,l.headers={"x-requested-with":"XMLHttpRequest"}):(l.body=JSON.stringify(s),l.headers={"Content-Type":"application/json"})),fetch(a,l).then((t=>t.json().then((e=>({ok:t.ok,status:t.status,body:e}))))).then((e=>(d.responseData=e,"add"===t&&d.responseData.ok?fetch(n("update"),{method:"POST",headers:{"Content-Type":"application/json"}}).then((t=>t.json().then((e=>(d.extraResponseData={ok:t.ok,status:t.status,body:e},d))))):d))).catch((t=>{console.error("Liquid Ajax Cart: Error while performing cart Ajax request"),console.error(t),d.fetchError=t})).finally((()=>{u.forEach((t=>{try{t(d)}catch(t){console.error("Liquid Ajax Cart: Error during Ajax request result callback in ajax-api"),console.error(t)}}))}))},i=t=>{s("get",void 0,t)},c=(t,e)=>{s("add",t,e)},u=(t,e)=>{s("change",t,e)},d=(t,e)=>{s("update",t,e)},l=(t,e)=>{s("clear",t,e)},p=t=>{o.push(t)},m={all:0},f=[];let h={},y={requestInProgress:!1,cartStateSet:!1};const g=()=>{y.requestInProgress=m.all>0,y.cartStateSet="item_count"in h,A()},b=t=>{try{t({cart:h,status:y}),f.push(t)}catch(t){console.log("Liquid Ajax Cart: Error during subscribing to the state"),console.error(t)}},q=()=>({cart:h,status:y}),A=()=>{f.forEach((t=>{try{t({cart:h,status:y})}catch(t){console.error(t)}}))},S=t=>{const e=r.computed.binderAttribute;t.status.cartStateSet&&document.querySelectorAll(`[${e}]`).forEach((t=>{const r=t.getAttribute(e),a=x(r);void 0!==a&&(t.innerText=a)}))},x=t=>{const[e,...r]=t.split("|");let a=C(e);return r.forEach((t=>{const e=t.trim();""!==e&&(e in j?a=j[e](a):console.error(`Liquid Ajax Cart: the "${e}" formatter doesn't exist`))})),a};function C(t,e=q()){q();const r=t.split("."),a=r.shift().trim();return a in e&&r.length>0?C(r.join("."),e[a]):e[a]}const j={amount:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount }}")},amount_no_decimals:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount_no_decimals }}")},amount_with_comma_separator:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount_with_comma_separator }}")},amount_no_decimals_with_comma_separator:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount_no_decimals_with_comma_separator }}")},amount_with_apostrophe_separator:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount_with_apostrophe_separator }}")}};function w(t,e){const{requestButtonAttribute:a}=r.computed;let o;const n=["/cart/change","/cart/add","/cart/clear","/cart/update"];if(t.hasAttribute(a)){const e=t.getAttribute(a);if(e){let t;try{if(t=new URL(e,window.location.origin),!n.includes(t.pathname))throw"URL should be one of the following: /cart/change, /cart/add, /cart/update, /cart/clear";o=t}catch(t){console.error(`Liquid Ajax Cart: ${a} contains an invalid URL as a parameter.`,t)}}}if(void 0===o&&t.hasAttribute("href")&&"A"===t.tagName.toUpperCase()){const e=new URL(t.href);n.includes(e.pathname)?o=e:t.hasAttribute(a)&&console.error(`Liquid Ajax Cart: a link with the ${a} contains an invalid href URL.`,"URL should be one of the following: /cart/change, /cart/add, /cart/update, /cart/clear")}if(void 0===o)return;if(e&&e.preventDefault(),q().status.requestInProgress)return;const s=new FormData;switch(o.searchParams.forEach(((t,e)=>{s.append(e,t)})),o.pathname){case"/cart/add":c(s,{info:{initiator:t}});break;case"/cart/change":u(s,{info:{initiator:t}});break;case"/cart/update":d(s,{info:{initiator:t}});break;case"/cart/clear":l({},{info:{initiator:t}})}}function L(t,e){let r,a;return e.status.cartStateSet&&(t.length>3?(r=e.cart.items.find((e=>e.key===t)),a="id"):(r=e.cart.items[Number(t)-1],a="line"),void 0===r&&(r=null,console.error(`Liquid Ajax Cart: line item with ${a}="${t}" not found`))),[r,a]}function v(t,e){const{quantityInputAttribute:a}=r.computed;if(!t.hasAttribute(a))return;if(e&&e.preventDefault(),q().status.requestInProgress)return;let o=Number(t.value.trim());const n=t.getAttribute(a).trim();if(isNaN(o))return void console.error("Liquid Ajax Cart: input value of a data-ajax-cart-quantity-input must be an Integer number");if(o<1&&(o=0),!n)return void console.error("Liquid Ajax Cart: attribute value of a data-ajax-cart-quantity-input must be an item key or an item index");const s=n.length>3?"id":"line",i=new FormData;i.set(s,n),i.set("quantity",o),u(i,{info:{initiator:this}}),t.blur()}const $=["checkbox","radio"];function E(t){const{propertyInputAttribute:e}=r.computed,a=t.getAttribute(e),o=t.getAttribute("name");console.error(`Liquid Ajax Cart: the element [${e}="${a}"]${o?`[name="${o}"]`:""} has wrong attributes.`)}function k(t){const{propertyInputAttribute:e}=r.computed;if(!t.hasAttribute(e))return[void 0,void 0];let a=t.getAttribute(e).trim();if(!a){const e=t.getAttribute("name").trim();e&&(a=e)}if(!a)return E(),[void 0,void 0];if("note"===a)return[a,void 0];let[o,...n]=a.trim().split("[");return!n||1!==n.length||n[0].length<2||n[0].indexOf("]")!==n[0].length-1?(E(),[void 0,void 0]):(n=n[0].replace("]",""),[o,n])}function _(t,e){const{propertyInputAttribute:a}=r.computed;if(!t.hasAttribute(a))return;e&&e.preventDefault(),t.blur();const o=q();if(!o.status.cartStateSet)return;if(o.status.requestInProgress)return;let n=t.getAttribute(a).trim();if(!n){const e=t.getAttribute("name").trim();e&&(n=e)}const[s,i]=k(t);if(!s)return;let c=t.getAttribute("type")||"";c=c.toLowerCase();let l=t.value;if("checkbox"===c&&!t.checked){let t=document.querySelector(`input[type="hidden"][${a}="${n}"]`);t||"note"!==s&&"attributes"!==s||(t=document.querySelector(`input[type="hidden"][${a}][name="${n}"]`)),l=t?t.value:""}if("note"===s){const e=new FormData;e.set("note",l),d(e,{info:{initiator:t}})}else if("attributes"===s){const e={...o.cart.attributes};e[i]=l;const r=new FormData;for(let t in e)r.set(`attributes[${t}]`,e[t]);d(r,{info:{initiator:t}})}else{const[e,r]=L(s,o);if(null===e&&console.error(`Liquid Ajax Cart: line item with ${r}="${s}" was not found when the [${a}] element with "${n}" value tried to update the cart`),!e)return;const c={...e.properties};c[i]=l;const d=new FormData;d.set(r,s),d.set("quantity",e.quantity);for(let t in c)d.set(`properties[${t}]`,c[t]);u(d,{info:{initiator:t}})}}function T(t,e){const{toggleClassButtonAttribute:a}=r.computed;if(!t.hasAttribute(a))return;e&&e.preventDefault();const o=t.getAttribute(a).split("|");if(!o)return void console.error("Liquid Ajax Cart: Error while toggling body class");const n=o[0].trim();let s=o[1]?o[1].trim():"toggle";if("add"!==s&&"remove"!==s&&(s="toggle"),n)try{"add"===s?document.body.classList.add(n):"remove"===s?document.body.classList.remove(n):document.body.classList.toggle(n)}catch(e){console.error("Liquid Ajax Cart: Error while toggling body class:",n),console.error(e)}}const D=new WeakMap;function R(t){const e=D.get(t);r.computed.productFormsProcessingClass&&(e>0?t.classList.add(r.computed.productFormsProcessingClass):t.classList.remove(r.computed.productFormsProcessingClass))}const B=(t,e)=>{const{messagesAttribute:a}=r.computed;let o,n,s,i,c,u,d=[];const l=q();if(t.requestBody instanceof FormData||t.requestBody instanceof URLSearchParams?(n=t.requestBody.get("line"),o=t.requestBody.get("id"),s=t.requestBody.get("quantity")):(n=t.requestBody.line,o=t.requestBody.id,s=t.requestBody.quantity),n){const t=Number(n);t>0&&l.status.cartStateSet&&(i=t-1,o=l.cart.items[i]?.key)}if(o){if(l.status.cartStateSet&&(l.cart.items.forEach((t=>{t.key!==o&&t.id!=o||d.push(t)})),u=l.cart.item_count),o.indexOf(":")>-1)void 0===n&&1===d.length&&(n=d[0].key),c=document.querySelectorAll(`[${a}="${o}"]`);else{const t=d.map((t=>`[${a}="${t.key}"]`));c=document.querySelectorAll(t.join(","))}c.length>0&&c.forEach((t=>{t.innerHTML=""}))}e((t=>{const{lineItemQuantityErrorText:e,messageBuilder:a}=r,{messagesAttribute:n}=r.computed;let i=[];const d=[];if(t.responseData?.ok){o&&(i=t.responseData.body.items.reduce(((t,e)=>(e.key!==o&&e.id!=o||t.push(e),t)),[])),i.forEach((e=>{e.quantity<s&&u===t.responseData.body.item_count&&d.push(e)}));const r=d.reduce(((t,e)=>(t.push(`[${n}="${e.key}"]`),t)),[]);c=[],r.length>0&&(c=document.querySelectorAll(r.join(","))),c.forEach((r=>{r.innerHTML=a([{type:"error",text:e,code:"line_item_quantity_error",requestState:t}])}))}else{const e=I(t);if(c=[],o)if(o.indexOf(":")>-1)c=document.querySelectorAll(`[${n}="${o}"]`);else{i=[];const t=q();t.status.cartStateSet&&t.cart.items.forEach((t=>{t.key!==o&&t.id!=o||i.push(t)}));const e=i.map((t=>`[${n}="${t.key}"]`));c=document.querySelectorAll(e.join(","))}c.length>0&&c.forEach((t=>{t.innerHTML=a([e])}))}}))},F=(t,e)=>{const a=t.info?.initiator;let o;a instanceof HTMLFormElement&&(o=a.querySelectorAll(`[${r.computed.messagesAttribute}="form"]`),o.length>0&&o.forEach((t=>{t.innerHTML=""}))),e((t=>{const{messageBuilder:e}=r,a=I(t);a&&o&&o.forEach((t=>{t.innerHTML=e([a])}))}))},I=t=>{const{requestErrorText:e}=r;if(!t.responseData?.ok){if("responseData"in t){if("description"in t.responseData.body)return{type:"error",text:t.responseData.body.description,code:"shopify_error",requestState:t};if("message"in t.responseData.body)return{type:"error",text:t.responseData.body.message,code:"shopify_error",requestState:t}}return{type:"error",text:e,code:"request_error",requestState:t}}},P=t=>{const{cartStateSetBodyClass:e,requestInProgressBodyClass:a,emptyCartBodyClass:o,notEmptyCartBodyClass:n}=r.computed;e&&(t.status.cartStateSet?document.body.classList.add(e):document.body.classList.remove(e)),a&&(t.status.requestInProgress?document.body.classList.add(a):document.body.classList.remove(a)),o&&(t.status.cartStateSet&&0===t.cart.item_count?document.body.classList.add(o):document.body.classList.remove(o)),n&&(t.status.cartStateSet&&0===t.cart.item_count?document.body.classList.remove(n):document.body.classList.add(n))};"liquidAjaxCart"in window||((()=>{const t=document.querySelector(`[${r.computed.configurationAttribute}]`);if(t)try{const e=JSON.parse(t.textContent),o=["productFormsFilter","messageBuilder"];for(let t in e)o.includes(t)?console.error(`Liquid Ajax Cart: the "${t}" parameter is not supported inside the "${r.computed.configurationAttribute}" script — use the "configureCart" function for it`):a(t,e[t])}catch(t){console.error(`Liquid Ajax Cart: can't parse configuration JSON from the "${r.computed.configurationAttribute}" script`),console.error(t)}})(),document.addEventListener("submit",(t=>{const e=t.target;let a;if("/cart/add"!==new URL(t.target.action).pathname)return;if("productFormsFilter"in r&&!r.productFormsFilter(e))return;if(t.preventDefault(),a=D.get(e),a>0||(a=0),a>0)return;const o=new FormData(e);D.set(e,a+1),R(e),c(o,{lastComplete:t=>{const r=D.get(e);r>0&&D.set(e,r-1),R(e)},info:{initiator:e}})})),p(((t,e)=>{const{sectionsAttribute:a,sectionScrollAreaAttribute:o}=r.computed;if(void 0!==t.requestBody){const e=[];document.querySelectorAll(`[${a}]`).forEach((t=>{const r=t.closest('[id^="shopify-section-"]');if(r){const t=r.id.replace("shopify-section-","");-1===e.indexOf(t)&&e.push(t)}})),e.length&&(t.requestBody instanceof FormData||t.requestBody instanceof URLSearchParams?t.requestBody.append("sections",e.join(",")):t.requestBody.sections=e.join(","))}e((t=>{const{sectionsAttribute:e,sectionScrollAreaAttribute:a}=r.computed,o=new DOMParser;if(t.responseData?.ok&&"sections"in t.responseData.body){const r=t.responseData.body.sections;for(let t in r)r[t]?document.querySelectorAll(`#shopify-section-${t}`).forEach((n=>{const s="__noId__",i={};n.querySelectorAll(` [${a}] `).forEach((t=>{let e=t.getAttribute(a).toString().trim();""===e&&(e=s),e in i||(i[e]=[]),i[e].push(t.scrollTop)}));const c=n.querySelectorAll(`[${e}]`);if(c){const a=o.parseFromString(r[t],"text/html"),s=a.querySelectorAll(`[${e}]`);if(c.length!==s.length){console.error(`Liquid Ajax Cart: the received HTML for the "${t}" section has a different quantity of the "${e}" containers. The section will be updated completely.`);const r=a.querySelector(`#shopify-section-${t}`);r&&(n.innerHTML=r.innerHTML)}else c.forEach(((t,e)=>{t.before(s[e]),t.parentElement.removeChild(t)}))}for(let t in i)n.querySelectorAll(` [${a}="${t.replace(s,"")}"] `).forEach(((e,r)=>{r+1<=i[t].length&&(e.scrollTop=i[t][r])}))})):console.error(`Liquid Ajax Cart: the HTML for the "${t}" section was requested but the response is ${r[t]}`)}}))})),(()=>{p(((t,e)=>{m.all++,g(),e((t=>{(t=>{m.all--,"responseData"in t&&t.responseData.ok&&("add"===t.requestType?"extraResponseData"in t&&t.extraResponseData.ok?h=t.extraResponseData.body:i():h=t.responseData.body)})(t),g()}))}));const t=document.querySelector(`[${r.computed.initialStateAttribute}]`);if(t)try{const e=JSON.parse(t.textContent);if(!("item_count"in e))throw`JSON from ${r.computed.initialStateAttribute} script is not correct cart object`;h=e,g()}catch(t){console.error(`Liquid Ajax Cart: can't parse cart JSON from the "${r.computed.initialStateAttribute}" script. A /cart.js request will be performed to receive the cart state`),console.error(t),i()}else i()})(),b(S),S(q()),document.addEventListener("click",(function(t){for(var e=t.target;e&&e!=this;e=e.parentNode)w(e,t)}),!1),document.addEventListener("change",(function(t){_(t.target,t)}),!1),document.addEventListener("keydown",(function(t){"Enter"===t.key&&("TEXTAREA"!==t.target.tagName.toUpperCase()||t.ctrlKey)&&_(t.target,t),"Escape"===t.key&&function(t){const{propertyInputAttribute:e}=r.computed;if(!t.hasAttribute(e))return;const a=q();if(!a.status.cartStateSet)return void t.blur();const o=t.getAttribute(e);let[n,...s]=o.split(" ");if(0===s.length)return void console.error(`Liquid Ajax Cart: ${e} attribute must contain two parameters separated by the space symbol`);n=n.trim(),s=s.join(" ");const[i]=L(n,a);if(i){let e;for(let t in i.properties)if(s===t){e=i.properties[t];break}void 0!==e&&(t.value=e)}t.blur()}(t.target)}),!1),b((function(t){const{propertyInputAttribute:e}=r.computed;t.status.requestInProgress?document.querySelectorAll(`[${e}]`).forEach((t=>{let e=t.getAttribute("type")||"";e=e.toLowerCase(),"hidden"!==e&&(t.readOnly=!0,($.includes(e)||"SELECT"===t.tagName.toUpperCase())&&(t.disabled=!0))})):document.querySelectorAll(`[${e}]`).forEach((r=>{r.tagName.toUpperCase();let a=r.getAttribute("type")||"";if(a=a.toLowerCase(),"hidden"===a)return;const[o,n]=k(r);if(!o)return;if(!t.status.cartStateSet)return;let s,i=!1;if("note"===o)s=t.cart.note;else if("attributes"===o)s=t.cart.attributes[n];else{const[a,c]=L(o,t);if(a&&(s=a.properties[n]),null===a){let t=r.getAttribute(e).trim();if(!t){const e=r.getAttribute("name").trim();e&&(t=e)}console.error(`Liquid Ajax Cart: line item with ${c}="${o}" was not found when the [${e}] element with "${t}" value tried to get updated from the State`),i=!0}}"checkbox"===a||"radio"===a?r.value===s?r.checked=!0:r.checked=!1:(s||"string"==typeof s||s instanceof String||(s=""),r.value=s),i||(r.readOnly=!1,($.includes(a)||"SELECT"===r.tagName.toUpperCase())&&(r.disabled=!1))}))})),document.addEventListener("change",(function(t){v(t.target,t)}),!1),document.addEventListener("keydown",(function(t){"Enter"===t.key&&v(t.target,t),"Escape"===t.key&&function(t){const{quantityInputAttribute:e}=r.computed;if(!t.hasAttribute(e))return;const a=t.getAttribute(e).trim();let o;const n=q();if(n.status.cartStateSet){if(a.length>3)o=n.cart.items.find((t=>t.key===a));else{const t=Number(a)-1;o=n.cart.items[t]}o&&(t.value=o.quantity)}t.blur()}(t.target)}),!1),b((function(t){const{quantityInputAttribute:e}=r.computed;t.status.requestInProgress?document.querySelectorAll(`[${e}]`).forEach((t=>{t.readOnly=!0})):document.querySelectorAll(`[${e}]`).forEach((r=>{const a=r.getAttribute(e).trim(),[o,n]=L(a,t);o?r.value=o.quantity:null===o&&(r.value=0),r.readOnly=!1}))})),document.addEventListener("click",(function(t){for(var e=t.target;e&&e!=this;e=e.parentNode)T(e,t)}),!1),b(P),P(q()),p(((t,e)=>{const r={};r.add=F,r.change=B,t.requestType in r&&r[t.requestType](t,e)})),window.liquidAjaxCart={configureCart:a,cartRequestGet:i,cartRequestAdd:c,cartRequestChange:u,cartRequestUpdate:d,cartRequestClear:l,subscribeToCartAjaxRequests:p,getCartState:q,subscribeToCartStateUpdate:b},window.addEventListener("focus",(()=>{r.updateOnWindowFocus&&d()})));const M=liquidAjaxCart.configureCart,O=liquidAjaxCart.cartRequestGet,U=liquidAjaxCart.cartRequestAdd,N=liquidAjaxCart.cartRequestChange,H=liquidAjaxCart.cartRequestUpdate,J=liquidAjaxCart.cartRequestClear,G=liquidAjaxCart.subscribeToCartAjaxRequests,Q=liquidAjaxCart.getCartState,K=liquidAjaxCart.subscribeToCartStateUpdate;var W=e.x$,X=e.nd,Y=e.yF,z=e.fi,V=e.Be,Z=e.ih,tt=e.KJ,et=e.Q4,rt=e.w0;export{W as cartRequestAdd,X as cartRequestChange,Y as cartRequestClear,z as cartRequestGet,V as cartRequestUpdate,Z as configureCart,tt as getCartState,et as subscribeToCartAjaxRequests,rt as subscribeToCartStateUpdate};