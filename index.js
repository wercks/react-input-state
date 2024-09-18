var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)},__read=this&&this.__read||function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||0<n--)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error:error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},__values=this&&this.__values||function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return{value:(o=o&&i>=o.length?void 0:o)&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},__spreadArray=this&&this.__spreadArray||function(to,from,pack){if(pack||2===arguments.length)for(var ar,i=0,l=from.length;i<l;i++)!ar&&i in from||((ar=ar||Array.prototype.slice.call(from,0,i))[i]=from[i]);return to.concat(ar||Array.prototype.slice.call(from))};import React from"react";import validator from"validator";import{mask}from"./util";import{isCnpj,isCpf}from"./common-validators";var useReloader=function(){var _a=__read(React.useState(1),2),setReload=(_a[0],_a[1]);return{reload:function(){return setReload(function(prevState){return prevState+1})}}},DatasetValidation=["validators"],DatasetActions=["reload-component","reloadComponent"],DatasetConditional=["equals","greaterOrEqual","greaterThan","lessOrEqual","lessThan","notEquals"],ReactInputStateConfig={},ReactInputState=(()=>{function ReactInputState(reloader,config){this.validation={},this.fields={},this.root=null,this._config=config,this.state=config&&config.initialState?config.initialState:{},this.reloader=reloader}return Object.defineProperty(ReactInputState.prototype,"values",{get:function(){var name_1,returnValues={};for(name_1 in this.state)this.fields[name_1].field.dataset.private||(returnValues[name_1]=this.state[name_1]);return __assign({},returnValues)},enumerable:!1,configurable:!0}),Object.defineProperty(ReactInputState.prototype,"privateValues",{get:function(){var name_2,returnValues={};for(name_2 in this.state)this.fields[name_2].field.dataset.private&&(returnValues[name_2]=this.state[name_2]);return __assign({},returnValues)},enumerable:!1,configurable:!0}),Object.defineProperty(ReactInputState.prototype,"config",{get:function(){return __assign(__assign({},ReactInputStateConfig),this._config||{})},enumerable:!1,configurable:!0}),ReactInputState.prototype.setInitialState=function(initialState){for(var name_3 in initialState)this.setValue(name_3,initialState[name_3]);this.validateAll()},ReactInputState.prototype.value=function(name){return this.state[name]},ReactInputState.prototype.addField=function(data){if(this.root){var field=data.field;if(!field.dataset.ignore){data=field.name;if(!(data in this.fields)){var name_4,validatorName,validators=[],actions={},conditional={};for(name_4 in field.dataset)Object.hasOwn(field.dataset,name_4)&&(DatasetValidation.includes(name_4)?(validatorName=field.dataset[name_4])&&validators.push(validatorName):DatasetActions.includes(name_4)?actions[name_4]=field.dataset[name_4]:DatasetConditional.includes(name_4)&&(conditional[name_4]=field.dataset[name_4]));var element,errorElement=this.root.querySelector("[data-error-for="+data+"]"),lastRootElementPosition="";errorElement&&(lastRootElementPosition=(element=errorElement).style.position,lastRootElementPosition=element.style.top,element.style.position="fixed",element.style.top="-1500px"),this.fields[field.name]={name:data,validators:validators,field:field,actions:actions,errorElement:errorElement||null,lastErrorElementPosition:lastRootElementPosition,lastErrorElementTop:"",transformers:field.dataset.transform?field.dataset.transform.split(","):[],remove:null!=(element=field.dataset.remove)?element:"",mask:null!=(errorElement=field.dataset.mask)?errorElement:"",touched:!1,regexValidation:null!=(lastRootElementPosition=field.dataset.regexValidation)?lastRootElementPosition:"",conditional:conditional},this.config.initialState&&data in this.config.initialState&&this.setValue(data,this.config.initialState[data])}}}},ReactInputState.prototype.del=function(name){var fieldName,fieldNameValid,newFields={},newValidation={};for(fieldName in this.fields)name!=fieldName&&(newFields[fieldName]=this.fields[fieldName]);for(fieldNameValid in this.validation)name!=fieldNameValid&&(newValidation[fieldNameValid]=this.validation[fieldNameValid]);this.fields=__assign({},newFields),this.validation=__assign({},newValidation)},ReactInputState.prototype.addEvents=function(){for(var fieldName in this.fields){fieldName=this.fields[fieldName];this.addChangeEvent(fieldName),this.addTouchEvents(fieldName)}},ReactInputState.prototype.addTouchEvents=function(item){function handler(event){item.touched=!0}function handlerBlur(event){item.touched=!0,_this.validate(item.name)}var _this=this,field=item.field;field.removeEventListener("focus",handler),field.addEventListener("focus",handler);field.removeEventListener("blur",handlerBlur),field.addEventListener("blur",handlerBlur)},ReactInputState.prototype.addChangeEvent=function(item){var _this=this,field=item.field,reloadOnChangeAction=null!=(_a=item.actions.reloadComponent)?_a:item.actions["reload-component"],_a=null,eventName=null;(eventName=field instanceof HTMLSelectElement?(_a=function(event){event=event.target.value;_this.state[item.name]=event,reloadOnChangeAction&&_this.reloader.reload(),_this.validate(item.name)},"change"):"checkbox"==field.type?(_a=function(event){event=event.target.checked;_this.state[item.name]=event,reloadOnChangeAction&&_this.reloader.reload(),_this.validate(item.name)},"change"):"radio"==field.type?(_a=function(event){event=event.target.value;_this.state[item.name]=event,reloadOnChangeAction&&_this.reloader.reload()},"change"):(_a=function(event){event=event.target.value;_this.state[item.name]=event,reloadOnChangeAction&&_this.reloader.reload(),_this.transform(item.name),_this.remove(item.name),_this.mask(item.name),_this.validate(item.name)},"input"))&&_a&&(field.removeEventListener(eventName,_a),field.addEventListener(eventName,_a))},ReactInputState.prototype.mask=function(name){if(!(name in this.fields))throw new Error('"'.concat(name,'" not found!'));var _a=this.fields[name],_a=_a.mask;_a&&"string"==typeof this.state[name]&&(_a=mask(this.state[name],_a),this.setValue(name,_a))},ReactInputState.prototype.remove=function(name){if(!(name in this.fields))throw new Error('"'.concat(name,'" not found!'));var _a=this.fields[name],_a=_a.remove;_a&&"string"==typeof this.state[name]&&(_a=new RegExp(_a,"g"),_a=this.state[name].replace(_a,""),this.setValue(name,_a))},ReactInputState.prototype.transform=function(name){var e_1,_a,e_2,_b;if(!(name in this.fields))throw new Error('"'.concat(name,'" not found!'));var _c=this.fields[name],transformers=_c.transformers;if(_c.field instanceof HTMLInputElement&&this.state[name]&&"string"==typeof this.state[name])try{for(var transformers_1=__values(transformers),transformers_1_1=transformers_1.next();!transformers_1_1.done;transformers_1_1=transformers_1.next())switch(transformers_1_1.value){case"lowercase":var lowercase=this.state[name].toLowerCase();this.setValue(name,lowercase);break;case"uppercase":var uppercase=this.state[name].toUpperCase();this.setValue(name,uppercase);break;case"titlecase":var text=this.state[name].split(" "),titlecase=[];try{e_2=void 0;for(var text_1=__values(text),text_1_1=text_1.next();!text_1_1.done;text_1_1=text_1.next()){var word=text_1_1.value;titlecase.push(word.substring(0,1).toUpperCase()+word.substring(1))}}catch(e_2_1){e_2={error:e_2_1}}finally{try{text_1_1&&!text_1_1.done&&(_b=text_1.return)&&_b.call(text_1)}finally{if(e_2)throw e_2.error}}var titleCaseJoined=titlecase.join(" ");this.setValue(name,titleCaseJoined);break;case"trim":var trimmed=this.state[name].trim();this.setValue(name,trimmed);break;case"urlsafe":var urlSafe=encodeURIComponent(this.state[name]);this.setValue(name,urlSafe)}}catch(e_1_1){e_1={error:e_1_1}}finally{try{transformers_1_1&&!transformers_1_1.done&&(_a=transformers_1.return)&&_a.call(transformers_1)}finally{if(e_1)throw e_1.error}}},ReactInputState.prototype.validate=function(name){var e_3,_a,_d;if(!(name in this.fields))throw new Error('"'.concat(name,'" not found!'));var _f=this.fields[name],validators=_f.validators,field=_f.field,regexValidation=_f.regexValidation,conditional=_f.conditional,value=(this.validation[name]||(this.validation[name]={}),field.required&&!"".concat(null!=(_f=this.state[name])?_f:"").trim().length?this.validation[name].required=!1:this.validation[name].required=!0,null!=(field=this.state[name])?field:"");if(validators)try{for(var validators_1=__values(validators),validators_1_1=validators_1.next();!validators_1_1.done;validators_1_1=validators_1.next()){var validatorName=validators_1_1.value;switch(validatorName){case"email":validator.isEmail(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"cpf":isCpf(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"cnpj":isCnpj(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"bic_swift":validator.isBIC(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"btc":validator.isBtcAddress(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"credit_card":validator.isCreditCard(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"ean":validator.isEAN(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"iban":validator.isIBAN(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"imei":validator.isIMEI(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"json":validator.isJSON(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"magnet_uri":validator.isMagnetURI(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"numeric":validator.isNumeric(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"octal":validator.isOctal(value)?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1;break;case"strong_password":validator.isStrongPassword(value,{minLength:7})?this.validation[name][validatorName]=!0:this.validation[name][validatorName]=!1}}}catch(e_3_1){e_3={error:e_3_1}}finally{try{validators_1_1&&!validators_1_1.done&&(_a=validators_1.return)&&_a.call(validators_1)}finally{if(e_3)throw e_3.error}}if(regexValidation&&(_f=new RegExp(regexValidation,"g").test(value),this.validation[name].regex=!!_f),conditional)for(var conditionName in conditional){var conditionValue=null!=(_d=conditional[conditionName])?_d:"",conditionNumValue=Number(null!=(_d=conditional[conditionName])?_d:"0"),numValue=Number(null!=value?value:"0");switch(conditionName){case"equals":this.validation[name].equals=value==conditionValue;break;case"greaterOrEqual":this.validation[name].greaterOrEqual=conditionNumValue<=numValue;break;case"greaterThan":this.validation[name].greaterThan=conditionNumValue<numValue;break;case"lessOrEqual":this.validation[name].lessOrEqual=numValue<=conditionNumValue;break;case"lessThan":this.validation[name].lessThan=numValue<conditionNumValue;break;case"notEquals":this.validation[name].notEquals=value!=conditionValue}}this.displayError()},ReactInputState.prototype.displayError=function(){var name_5,submitButton,disableSubmitButton=!1;for(name_5 in this.validation){var validationTypeName,validationType=this.validation[name_5],this_1=this;for(validationTypeName in validationType)(validationTypeName=>{var isValid=this_1.validation[name_5][validationTypeName],errorElement=(_c=this_1.fields[name_5]).errorElement,lastErrorElementPosition=_c.lastErrorElementPosition,lastErrorElementTop=_c.lastErrorElementTop,touched=_c.touched,_c=_c.field;isValid||(disableSubmitButton=!0),this_1.config&&this_1.config.onValidate&&this_1.config.onValidate(name_5,isValid,validationTypeName),touched&&!isValid&&_c instanceof HTMLInputElement&&this_1.config&&this_1.config.inputInvalidClasses&&_c.classList&&_c.classList.length?(validationTypeName=_c.classList).add.apply(validationTypeName,__spreadArray([],__read(this_1.config.inputInvalidClasses.split(" ")),!1)):touched&&isValid&&_c instanceof HTMLInputElement&&this_1.config&&this_1.config.inputInvalidClasses&&_c.classList&&_c.classList.length&&(validationTypeName=_c.classList).remove.apply(validationTypeName,__spreadArray([],__read(this_1.config.inputInvalidClasses.split(" ")),!1)),errorElement&&errorElement.style&&touched&&!isValid?(errorElement.style.position=lastErrorElementPosition,errorElement.style.top=lastErrorElementTop,this_1.config&&this_1.config.closeErrorMessageMilliseconds&&setTimeout(function(){errorElement.style.position="fixed",errorElement.style.top="-1500px"},this_1.config.closeErrorMessageMilliseconds)):errorElement&&errorElement.style&&(errorElement.style.position="fixed",errorElement.style.top="-1500px")})(validationTypeName)}disableSubmitButton&&this.config&&this.config.submitButton&&this.config.submitButton.current?(submitButton=this.config.submitButton.current)instanceof HTMLButtonElement?submitButton.setAttribute("disabled","disabled"):(submitButton.style.pointerEvents="none",submitButton.style.cursor="default"):this.config&&this.config.submitButton&&this.config.submitButton.current&&((submitButton=this.config.submitButton.current)instanceof HTMLButtonElement?submitButton.removeAttribute("disabled"):(submitButton.style.pointerEvents="",submitButton.style.cursor=""))},ReactInputState.prototype.validateAll=function(){for(var name_6 in this.fields)this.validate(name_6)},Object.defineProperty(ReactInputState.prototype,"isValid",{get:function(){for(var name_7 in this.fields)for(var validationName in this.validation[name_7])if(!this.validation[name_7][validationName])return!1;return!0},enumerable:!1,configurable:!0}),ReactInputState.prototype.setValue=function(name,value){if(!(name in this.fields))throw new Error("This field ".concat(name," does not exists!"));this.state[name]=value,this.fields[name].field.value=value},ReactInputState.prototype.init=function(root){for(var _this=this,inputFields=root.getElementsByTagName("input"),selectFields=root.getElementsByTagName("select"),x=0;x<inputFields.length;x++){var field=inputFields[x];if(!field.name)throw new Error('"name" attribute has not been found in field!');this.addField({type:"input",field:field})}for(x=0;x<selectFields.length;x++){var select=selectFields[x];if(!select.name)throw new Error('"name" attribute has not been found in field!');this.addField({type:"select",field:select})}this.addEvents(),this.validateAll(),this.root=root;var searchRemovedFields=function(node,fieldsChanged){var e_4,_a;if(node instanceof HTMLInputElement||node instanceof HTMLSelectElement)++fieldsChanged[0];else try{for(var _b=__values(node.childNodes),_c=_b.next();!_c.done;_c=_b.next()){var domNode=_c.value;searchRemovedFields(domNode,fieldsChanged)}}catch(e_4_1){e_4={error:e_4_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_4)throw e_4.error}}};new MutationObserver(function(mutations,observer){var fieldsChanged=[0];mutations.map(function(mutation){var e_6,_a,e_7,_b;try{for(var _c=__values(mutation.removedNodes),_d=_c.next();!_d.done;_d=_c.next()){var node=_d.value;searchRemovedFields(node,fieldsChanged)}}catch(e_6_1){e_6={error:e_6_1}}finally{try{_d&&!_d.done&&(_a=_c.return)&&_a.call(_c)}finally{if(e_6)throw e_6.error}}if(mutation.addedNodes.length){try{for(var _e=__values(mutation.addedNodes),_f=_e.next();!_f.done;_f=_e.next())((node,fieldsChanged)=>{var e_5,_a;if(node instanceof HTMLInputElement||node instanceof HTMLSelectElement)++fieldsChanged[0];else try{for(var _b=__values(node.childNodes),_c=_b.next();!_c.done;_c=_b.next()){var domNode=_c.value;searchRemovedFields(domNode,fieldsChanged)}}catch(e_5_1){e_5={error:e_5_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_5)throw e_5.error}}})(node=_f.value,fieldsChanged)}catch(e_7_1){e_7={error:e_7_1}}finally{try{_f&&!_f.done&&(_b=_e.return)&&_b.call(_e)}finally{if(e_7)throw e_7.error}}_this.addEvents(),_this.validateAll()}}),fieldsChanged[0]&&_this.reboot()}).observe(this.root,{childList:!0,subtree:!0})},ReactInputState.prototype.reboot=function(){this.fields={},this.validation={},this.root&&this.init(this.root)},ReactInputState})();export default function useInputState(ref,config){var reloader=useReloader(),config=__read(React.useState(new ReactInputState(reloader,config)),2),savedState=config[0];return React.useEffect(function(){ref.current&&savedState.init(ref.current)},[ref.current]),[savedState,reloader]}export{ReactInputStateConfig};