(this["webpackJsonpizze-admin"]=this["webpackJsonpizze-admin"]||[]).push([[14],{582:function(e,t,i){"use strict";var n=i(41),o=i(42);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(i(0)),a=(0,n(i(43)).default)(r.createElement("path",{d:"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"ControlPoint");t.default=a},585:function(e,t,i){"use strict";i(0);var n=i(601),o=i(602),r=i(627),a=i(372),l=i(367),c=i(592),s=i.n(c),u=i(593),d=i.n(u),j=i(594),m=i.n(j),v=i(595),b=i.n(v),h=i(596),p=i.n(h),g=i(597),O=i.n(g),f=i(598),x=i.n(f),w=i(4),k=Object(l.a)((function(e){return{inActive:{borderRadius:"unset",color:e.palette.green.main,border:"1px solid ".concat(e.palette.green.main)},active:{borderRadius:"unset",color:e.palette.white,border:"1px solid ".concat(e.palette.green.main),backgroundColor:e.palette.green.main,"&:hover":{backgroundColor:e.palette.green.dark}},btnGroup:{display:"block"}}})),_=function(e){var t=e.editor,i=k();return Object(w.jsxs)(r.a,{disableElevation:!0,fullWidth:!0,className:i.btnGroup,variant:"contained",size:"small",children:[Object(w.jsx)(a.a,{size:"small",classes:{root:(null===t||void 0===t?void 0:t.isActive("bold"))?i.active:i.inActive},onClick:function(){return null===t||void 0===t?void 0:t.chain().focus().toggleBold().run()},children:Object(w.jsx)(s.a,{})}),Object(w.jsx)(a.a,{size:"small",classes:{root:(null===t||void 0===t?void 0:t.isActive("italic"))?i.active:i.inActive},onClick:function(){return null===t||void 0===t?void 0:t.chain().focus().toggleItalic().run()},children:Object(w.jsx)(d.a,{})}),Object(w.jsx)(a.a,{size:"small",classes:{root:(null===t||void 0===t?void 0:t.isActive("strike"))?i.active:i.inActive},onClick:function(){return null===t||void 0===t?void 0:t.chain().focus().toggleStrike().run()},children:Object(w.jsx)(m.a,{})}),Object(w.jsx)(a.a,{size:"small",classes:{root:(null===t||void 0===t?void 0:t.isActive("code"))?i.active:i.inActive},onClick:function(){return null===t||void 0===t?void 0:t.chain().focus().toggleCode().run()},children:Object(w.jsx)(b.a,{})}),Object(w.jsx)(a.a,{size:"small",classes:{root:(null===t||void 0===t?void 0:t.isActive("paragraph"))?i.active:i.inActive},onClick:function(){return null===t||void 0===t?void 0:t.chain().focus().setParagraph().run()},children:Object(w.jsx)(p.a,{})}),Object(w.jsx)(a.a,{size:"small",classes:{root:(null===t||void 0===t?void 0:t.isActive("bulletList"))?i.active:i.inActive},onClick:function(){return null===t||void 0===t?void 0:t.chain().focus().toggleBulletList().run()},children:Object(w.jsx)(O.a,{})}),Object(w.jsx)(a.a,{size:"small",classes:{root:(null===t||void 0===t?void 0:t.isActive("orderedList"))?i.active:i.inActive},onClick:function(){return null===t||void 0===t?void 0:t.chain().focus().toggleOrderedList().run()},children:Object(w.jsx)(x.a,{})})]})};t.a=function(e){var t=e.value,i=e.onChange,r=e.onBlur,a=Object(n.b)({extensions:[o.a],content:t,onUpdate:function(e){var t=e.editor;return i(t.getHTML())},onBlur:function(e){e.editor;return r()}});return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(_,{editor:a}),Object(w.jsx)(n.a,{editor:a})]})}},635:function(e,t,i){"use strict";i.r(t);var n=i(39),o=i(13),r=i(28),a=i.n(r),l=i(47),c=i(21),s=i(367),u=i(557),d=i(167),j=i(377),m=i(558),v=i(559),b=i(560),h=i(561),p=i(562),g=i(370),O=i(371),f=i(563),x=i(578),w=i(564),k=i(372),_=i(565),q=i(526),C=i(528),y=i(566),N=i(534),W=i(540),B=i(530),A=i(207),I=i(214),E=i.n(I),S=i(212),T=i.n(S),R=i(582),F=i.n(R),z=i(215),P=i.n(z),V=i(213),L=i.n(V),M=i(576),D=i(649),G=i(125),U=i(0),H=i(61),J=i(169),K=i(52),Q=i(126),X=i(585),Y=i(94),Z=i(81),$=i(80),ee=i(216),te=i(217),ie=i.n(te),ne=i(4),oe=Object(s.a)((function(e){return{root:{width:e.breakpoints.values.lg,maxWidth:"100%",margin:"0 auto",padding:e.spacing(3)},addIcon:{marginRight:e.spacing(1)},content:{padding:0},inner:{minWidth:700},actions:{padding:e.spacing(1),justifyContent:"center"},tabCard:{marginTop:e.spacing(3)},sEvenly:{display:"flex",justifyContent:"space-evenly"},iconPadd:{padding:5},jCenter:{display:"flex",justifyContent:"center"},imageView:{width:"100%",height:"100%"},themeButton:{color:e.palette.white,backgroundColor:e.palette.green.main,"&:hover":{backgroundColor:e.palette.green.dark}},lColor:{color:"white"},workouttermsavatar:{width:"100%",height:"100%"},deleteButton:{width:"100%",height:"50px"},avatarStyles:{width:e.spacing(15),height:e.spacing(15)},ingredientsAvatarStyle:{width:e.spacing(10),height:e.spacing(10),margin:"auto"},marginTopStyle:{marginTop:e.spacing(2)},adjustmentTop:{marginTop:"5px"},avatarRoot:{borderRadius:10,marginRight:15,width:e.spacing(10),height:e.spacing(10)},textPrimary:{marginTop:10,fontWeight:"bold"},textSecondary:{marginTop:10},ingrdientsGridMain:{marginTop:10},ingredientsAvatarRoot:{width:e.spacing(7),height:e.spacing(7),margin:"auto"},htmlContentGrid:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3),paddingTop:e.spacing(1)},noIngredientsText:{marginBottom:e.spacing(3),display:"flex",justifyContent:"center"},htmlContent:{"& ul":{paddingLeft:"1.2rem"},"& p":{textAlign:"justify"}}}})),re=function(e){var t=e.isOpen,i=e.title,r=e.onClose,s=e.isEdit,d=e.data,m=e.onSuccess,v=e.okBtnText,b=void 0===v?"Ok":v,h=oe(),p=Object(U.useRef)(null),g=Object(U.useRef)(null),O=Object(U.useRef)(null),f=Object($.a)(),x=Object(Z.b)().Post,w=Object(U.useState)([]),k=Object(c.a)(w,2),_=k[0],I=k[1],E={name:"",image:{file:null,prevImage:"",isNew:null},description:""},S={workout_name:"",workout_image:{file:null,prevImage:"",isNew:null},workout_description:"",workout_thumbnail:{file:null,prevImage:"",isNew:null},workout_type:"",workout_terms:[E],required_equipments:[{id:""}],how_to_do:""},T=Object(U.useState)(Object(o.a)({},S)),R=Object(c.a)(T,2),z=R[0],P=R[1],V=function(){var e=Object(l.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:x("app/listAllEquipment",{}).then((function(e){if(e.error)f.show(e.message,"error");else{var t=e.data.map((function(e){return e.id=e._id,e}));I(t)}})).catch((function(e){f.show(e.message,"error")}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=function(e){e.persist();var t=e.target.files;if(t&&0!=t.length){var i=new FileReader,n=t[0];i.onloadend=function(){p.current.setFieldValue("workout_image",{file:n,prevImage:i.result,isNew:!0})},i.readAsDataURL(n)}else p.current.setFieldValue("workout_image",{file:null,prevImage:"",isNew:null})},M=function(e){e.persist();var t=e.target.files;if(t&&0!=t.length){var i=new FileReader,n=t[0];i.onloadend=function(){p.current.setFieldValue("workout_thumbnail",{file:n,prevImage:i.result,isNew:!0})},i.readAsDataURL(n)}else p.current.setFieldValue("workout_thumbnail",{file:null,prevImage:"",isNew:null})},K=function(e,t){var i=t.setSubmitting,n=t.resetForm;console.log(e),i(!0),x("app/addWorkout",e).then((function(e){f.show(e.message,"success"),i(!1),n(),m()})).catch((function(e){i(!1),f.show(e.message,"error")}))},Q=function(e,t){var i=t.setSubmitting,n=t.resetForm;i(!0),x("app/editWorkout",e).then((function(e){f.show(e.message,"success"),i(!1),n(),m()})).catch((function(e){i(!1),f.show(e.message,"error")}))},Y=function(e,t){var i=t.map((function(e){return{id:e._id}}));p.current.setFieldValue("required_equipments",i)};return Object(U.useEffect)((function(){if(s){var e=d.required_equipments,t=d.workout_terms,i=d._id,r=d.workout_thumbnail,a=d.workout_image,l=Object(n.a)(d,["required_equipments","workout_terms","_id","workout_thumbnail","workout_image"]),c=Object(o.a)(Object(o.a)({},l),{},{id:i});c.required_equipments=e.map((function(e){return{id:e._id}}));var u=_.map((function(e){return e._id}));c.required_equipments=e.filter((function(e){var t=e._id;return u.includes(t)})).map((function(e){return{id:e._id}})),c.workout_terms=t.map((function(e){var t;return{name:e.name,image:{file:e.image,prevImage:null===(t=e.image)||void 0===t?void 0:t.url,isNew:!1},description:e.description}})),c.workout_thumbnail={file:r,prevImage:null===r||void 0===r?void 0:r.url,isNew:!1},c.workout_image={file:a,prevImage:null===a||void 0===a?void 0:a.url,isNew:!1},P(c)}else P(S)}),[e]),Object(U.useEffect)((function(){V()}),[]),Object(ne.jsxs)(q.a,{disableBackdropClick:!0,disableEscapeKeyDown:!0,fullWidth:!0,maxWidth:"md","aria-labelledby":"dialog-title",open:t,children:[Object(ne.jsx)(J.a,{id:"dialog-title",onClose:r,children:i}),Object(ne.jsx)(G.b,{innerRef:p,enableReinitialize:!0,initialValues:z,onSubmit:function(e,t){try{t.setSubmitting(!0),function(){var i=Object(l.a)(a.a.mark((function i(){var r,l,u,d,j,m,v,b,h,p,g;return a.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return r=e.workout_image,l=e.workout_thumbnail,u=e.workout_terms,d=Object(n.a)(e,["workout_image","workout_thumbnail","workout_terms"]),j=d,m=Promise.all(u.map((function(e){var t=e.image,i=Object(n.a)(e,["image"]);return Object(ee.b)(t).then((function(e){return Object(o.a)({image:e},i)}))}))),i.next=5,Promise.all([Object(ee.b)(r),Object(ee.b)(l),m]);case 5:v=i.sent,b=Object(c.a)(v,3),h=b[0],p=b[1],g=b[2],j.workout_image=h,j.workout_thumbnail=p,j.workout_terms=g,!s&&K(j,t),s&&Q(j,t);case 15:case"end":return i.stop()}}),i)})));return function(){return i.apply(this,arguments)}}()()}catch(i){f.show("Image Upload Failed","error")}},validationSchema:H.d().shape({workout_name:H.f().trim().required("Workout name is required"),workout_image:H.d({file:H.b().required("A file is required")}),workout_description:H.f().trim().max(250,"Must be 250 characters or less").required("Workout description is required"),workout_thumbnail:H.d({file:H.b().required("A file is required")}),workout_type:H.f().trim().required("Workout type is required"),workout_terms:H.a().of(H.d().shape({name:H.f().trim().required("Workout term name is Required"),image:H.d({file:H.b().required("required")}),description:H.f().max(250,"Must be 250 characters or less").required("Workout description is Required")})),required_equipments:H.a().of(H.d().shape({id:H.f().trim().required(" Equipments is Required")})),how_to_do:H.f().trim().required("Steps is required")}),children:function(e){var t,i,n,a,l,c,s,d,m,v,p,f,x=e.values,w=e.errors,k=e.touched,q=e.handleChange,I=e.setFieldValue,S=e.handleBlur,T=e.setFieldTouched,R=e.submitForm,z=e.isSubmitting;return Object(ne.jsxs)(ne.Fragment,{children:[Object(ne.jsx)(C.a,{dividers:!0,children:Object(ne.jsxs)(u.a,{container:!0,spacing:3,children:[Object(ne.jsx)(u.a,{item:!0,md:12,xs:12,children:Object(ne.jsx)(y.a,{fullWidth:!0,label:"Workout name",name:"workout_name",variant:"outlined",error:Boolean(k.workout_name&&w.workout_name),helperText:k.workout_name&&w.workout_name,value:x.workout_name,onChange:q,onBlur:S})}),Object(ne.jsx)(u.a,{item:!0,md:12,xs:12,children:Object(ne.jsx)(y.a,{fullWidth:!0,multiline:!0,label:"Workout description",name:"workout_description",variant:"outlined",error:Boolean(k.workout_description&&w.workout_description),helperText:k.workout_description&&w.workout_description,value:x.workout_description,onChange:q,onBlur:S})}),Object(ne.jsx)(u.a,{item:!0,md:12,xs:12,children:Object(ne.jsx)(y.a,{fullWidth:!0,multiline:!0,label:"Workout type",name:"workout_type",variant:"outlined",error:Boolean(k.workout_type&&w.workout_type),helperText:k.workout_type&&w.workout_type,value:x.workout_type,onChange:q,onBlur:S})}),Object(ne.jsx)(G.a,{name:"workout_terms",validateOnChange:!0,children:function(e){var t,i=e.push;e.remove;return Object(ne.jsxs)(ne.Fragment,{children:[Object(ne.jsx)(u.a,{item:!0,md:12,xs:12,children:Object(ne.jsx)(j.a,{fullWidth:!0,className:h.themeButton,variant:"contained",color:"default",onClick:function(){return function(e,t){e.workout_terms,t(E)}(x,i)},endIcon:Object(ne.jsx)(F.a,{}),children:"Add workout terms"})}),null===x||void 0===x||null===(t=x.workout_terms)||void 0===t?void 0:t.map((function(e,t){return Object(ne.jsx)(ae,{index:t},t)}))]})}}),Object(ne.jsx)(u.a,{item:!0,md:12,xs:12,children:Object(ne.jsx)(D.a,{multiple:!0,id:"combo-box-demo",options:_,value:_.filter((function(e){return x.required_equipments.map((function(e){return e.id})).includes(e._id)})),onChange:Y,getOptionLabel:function(e){return e.name},renderInput:function(e){var t,i,n,r;return Object(ne.jsx)(y.a,Object(o.a)(Object(o.a)({},e),{},{label:"Equipments",name:"required_equipments",variant:"outlined",error:Boolean((null===k||void 0===k?void 0:k.required_equipments)&&(null===k||void 0===k||null===(t=k.required_equipments[0])||void 0===t?void 0:t.id)&&(null===w||void 0===w?void 0:w.required_equipments)&&(null===w||void 0===w||null===(i=w.required_equipments[0])||void 0===i?void 0:i.id)),helperText:(null===k||void 0===k?void 0:k.required_equipments)&&(null===k||void 0===k||null===(n=k.required_equipments[0])||void 0===n?void 0:n.id)&&(null===w||void 0===w?void 0:w.required_equipments)&&(null===w||void 0===w||null===(r=w.required_equipments[0])||void 0===r?void 0:r.id),inputProps:Object(o.a)({},e.inputProps)}))}})}),Object(ne.jsx)(u.a,{item:!0,md:12,xs:12,children:Object(ne.jsxs)(N.a,{fullWidth:!0,error:Boolean((null===k||void 0===k?void 0:k.how_to_do)&&(null===w||void 0===w?void 0:w.how_to_do)),children:[Object(ne.jsx)(X.a,{value:x.how_to_do,onChange:function(e){return I("how_to_do",e)},onBlur:function(){return T("how_to_do",!0,!0)}}),Object(ne.jsx)(W.a,{children:(null===k||void 0===k?void 0:k.how_to_do)&&(null===w||void 0===w?void 0:w.how_to_do)})]})}),Object(ne.jsxs)(u.a,{item:!0,md:6,xs:6,children:[Object(ne.jsx)("input",{name:"recipe_image",ref:g,type:"file",accept:".jpg,.png,jpeg",onChange:L,onBlur:S,hidden:!0}),Object(ne.jsx)(j.a,{fullWidth:!0,className:h.themeButton,variant:"contained",color:"default",onClick:function(){return g.current.click()},startIcon:Object(ne.jsx)(ie.a,{}),children:"Workout image"}),Object(ne.jsx)(N.a,{error:Boolean((null===k||void 0===k||null===(t=k.workout_image)||void 0===t?void 0:t.file)&&(null===w||void 0===w||null===(i=w.workout_image)||void 0===i?void 0:i.file)),children:Object(ne.jsx)(W.a,{children:(null===k||void 0===k||null===(n=k.workout_image)||void 0===n?void 0:n.file)&&(null===w||void 0===w||null===(a=w.workout_image)||void 0===a?void 0:a.file)})})]}),Object(ne.jsxs)(u.a,{item:!0,md:6,xs:6,children:[Object(ne.jsx)("input",{name:"recipe_image",ref:O,type:"file",accept:".jpg,.png,jpeg",onChange:M,onBlur:S,hidden:!0}),Object(ne.jsx)(j.a,{fullWidth:!0,className:h.themeButton,variant:"contained",color:"default",onClick:function(){return O.current.click()},startIcon:Object(ne.jsx)(ie.a,{}),children:"Workout Thumbnail"}),Object(ne.jsx)(N.a,{error:Boolean((null===k||void 0===k||null===(l=k.workout_thumbnail)||void 0===l?void 0:l.file)&&(null===w||void 0===w||null===(c=w.workout_thumbnail)||void 0===c?void 0:c.file)),children:Object(ne.jsx)(W.a,{children:(null===k||void 0===k||null===(s=k.workout_thumbnail)||void 0===s?void 0:s.file)&&(null===w||void 0===w||null===(d=w.workout_thumbnail)||void 0===d?void 0:d.file)})})]}),Object(ne.jsx)(u.a,{item:!0,md:6,xs:6,children:(null===(m=x.workout_image)||void 0===m?void 0:m.prevImage)&&Object(ne.jsx)("img",{className:h.imageView,src:null===(v=x.workout_image)||void 0===v?void 0:v.prevImage})}),Object(ne.jsx)(u.a,{item:!0,md:6,xs:6,children:(null===(p=x.workout_thumbnail)||void 0===p?void 0:p.prevImage)&&Object(ne.jsx)("img",{className:h.imageView,src:null===(f=x.workout_thumbnail)||void 0===f?void 0:f.prevImage})})]})}),Object(ne.jsxs)(B.a,{children:[Object(ne.jsx)(j.a,{onClick:r,variant:"outlined",color:"secondary",children:"Cancel"}),Object(ne.jsx)(j.a,{className:h.themeButton,onClick:function(){return R()},disabled:z,variant:"outlined",children:z?Object(ne.jsx)(A.a,{size:24,className:h.lColor}):b})]})]})}})]})},ae=function(e){var t,i,n,o,r,a=oe(),l=Object(G.d)(),s=Object(U.useState)(l),d=Object(c.a)(s,2),m=d[0],v=m.values,b=m.errors,h=m.touched,p=m.setFieldValue,g=m.handleBlur,O=m.handleChange,f=d[1],w=e.index,k=Object(U.useRef)(null),_="workout_terms[".concat(w,"]"),q=Object(G.c)(v,"workout_terms[".concat(w,"]")),C=Object(G.c)(b,"workout_terms[".concat(w,"]")),B=Object(G.c)(h,"workout_terms[".concat(w,"]"));return Object(U.useEffect)((function(){f(l)}),[l]),Object(ne.jsxs)(u.a,{item:!0,container:!0,md:12,xs:12,direction:"row",spacing:2,children:[Object(ne.jsxs)(u.a,{item:!0,md:1,xs:12,children:[Object(ne.jsx)("input",{name:"".concat(_,".image"),ref:k,type:"file",accept:".jpg,.png,jpeg",onChange:function(e){return function(e){e.persist();var t=e.target.files;if(t&&0!=t.length){var i=new FileReader,n=t[0];i.onloadend=function(){p("".concat(_,".image"),{file:n,prevImage:i.result,isNew:!0})},i.readAsDataURL(n)}else p("".concat(_,".image"),{file:null,prevImage:"",isNew:null})}(e)},onBlur:g,hidden:!0}),Object(ne.jsx)(x.a,{className:a.workouttermsavatar,variant:"square",onClick:function(){var e;return null===k||void 0===k||null===(e=k.current)||void 0===e?void 0:e.click()},src:null===q||void 0===q||null===(t=q.image)||void 0===t?void 0:t.prevImage}),Object(ne.jsx)(N.a,{error:Boolean((null===B||void 0===B||null===(i=B.image)||void 0===i?void 0:i.file)&&(null===C||void 0===C||null===(n=C.image)||void 0===n?void 0:n.file)),children:Object(ne.jsx)(W.a,{children:(null===B||void 0===B||null===(o=B.image)||void 0===o?void 0:o.file)&&(null===C||void 0===C||null===(r=C.image)||void 0===r?void 0:r.file)})})]}),Object(ne.jsx)(u.a,{item:!0,md:5,xs:12,children:Object(ne.jsx)(y.a,{fullWidth:!0,multiline:!0,label:"Workout terms name",name:"".concat(_,".name"),variant:"outlined",error:Boolean((null===B||void 0===B?void 0:B.name)&&(null===C||void 0===C?void 0:C.name)),helperText:(null===B||void 0===B?void 0:B.name)&&(null===C||void 0===C?void 0:C.name),value:q.name,onChange:O,onBlur:g})}),Object(ne.jsx)(u.a,{item:!0,md:5,xs:8,children:Object(ne.jsx)(y.a,{fullWidth:!0,multiline:!0,label:"Workout terms description",name:"".concat(_,".description"),variant:"outlined",error:Boolean((null===B||void 0===B?void 0:B.description)&&(null===C||void 0===C?void 0:C.description)),helperText:(null===B||void 0===B?void 0:B.description)&&(null===C||void 0===C?void 0:C.description),value:q.description,onChange:O,onBlur:g})}),Object(ne.jsx)(u.a,{item:!0,md:1,xs:4,children:(null===v||void 0===v?void 0:v.workout_terms.length)>1&&Object(ne.jsx)(j.a,{fullWidth:!0,className:a.deleteButton,variant:"contained",color:"secondary",onClick:function(){return function(){var e=Object(G.c)(v,"workout_terms").filter((function(e,t){return t!=w}));p("workout_terms",e)}()},children:Object(ne.jsx)(P.a,{})})})]})},le=function(e){var t,i,n,o,r,a=e.isOpen,l=e.title,s=e.onClose,m=e.data,v=oe(),b=Object(U.useState)(m),h=Object(c.a)(b,2),p=h[0],g=h[1];return Object(U.useEffect)((function(){g(m)}),[e]),Object(ne.jsxs)(q.a,{disableBackdropClick:!0,disableEscapeKeyDown:!0,fullWidth:!0,maxWidth:"sm","aria-labelledby":"dialog-view-title",open:a,children:[Object(ne.jsx)(J.a,{id:"dialog-view-title",onClose:s,children:l}),Object(ne.jsxs)(C.a,{dividers:!0,children:[Object(ne.jsx)("div",{children:Object(ne.jsx)("img",{src:null===p||void 0===p||null===(t=p.workout_image)||void 0===t?void 0:t.url,alt:"Workout image",className:v.imageView})}),Object(ne.jsx)(d.a,{variant:"h5",align:"left",className:v.textPrimary,children:null===p||void 0===p?void 0:p.workout_name}),Object(ne.jsxs)(u.a,{container:!0,spacing:2,className:v.ingrdientsGridMain,justify:"center",children:[null===p||void 0===p||null===(i=p.workout_terms)||void 0===i?void 0:i.map((function(e,t){var i;return Object(ne.jsxs)(u.a,{item:!0,xs:4,md:3,children:[Object(ne.jsx)(x.a,{className:v.ingredientsAvatarRoot,src:null===e||void 0===e||null===(i=e.image)||void 0===i?void 0:i.url}),Object(ne.jsx)(d.a,{variant:"h6",align:"center",children:null===e||void 0===e?void 0:e.name}),Object(ne.jsx)(d.a,{variant:"subtitle2",align:"center",children:e.description.length>=25?"".concat(e.description.substring(0,30),"..."):e.description})]},t)})),0==(null===p||void 0===p||null===(n=p.workout_terms)||void 0===n?void 0:n.length)&&Object(ne.jsx)(u.a,{item:!0,xs:12,md:12,className:v.noIngredientsText,children:Object(ne.jsx)("div",{children:"No workout terms added"})})]}),Object(ne.jsx)(d.a,{variant:"h6",align:"left",className:v.textSecondary,children:null===p||void 0===p?void 0:p.workout_description}),Object(ne.jsx)(d.a,{variant:"h5",align:"left",style:{color:"#41A58D"},className:v.textPrimary,children:"Equipments"}),Object(ne.jsxs)(u.a,{container:!0,spacing:2,className:v.ingrdientsGridMain,justify:"center",children:[null===p||void 0===p||null===(o=p.required_equipments)||void 0===o?void 0:o.map((function(e,t){var i;return Object(ne.jsxs)(u.a,{item:!0,xs:4,md:3,children:[Object(ne.jsx)(x.a,{className:v.ingredientsAvatarRoot,src:null===e||void 0===e||null===(i=e.image)||void 0===i?void 0:i.url}),Object(ne.jsx)(d.a,{variant:"h6",align:"center",children:null===e||void 0===e?void 0:e.name})]},t)})),0==(null===p||void 0===p||null===(r=p.required_equipments)||void 0===r?void 0:r.length)&&Object(ne.jsx)(u.a,{item:!0,xs:12,md:12,className:v.noIngredientsText,children:Object(ne.jsx)("div",{children:"No Equipments Added"})})]}),Object(ne.jsx)(d.a,{variant:"h6",align:"left",style:{color:"#41A58D"},children:"How to do"}),Object(ne.jsx)(u.a,{container:!0,children:Object(ne.jsx)(u.a,{item:!0,xs:12,md:12,className:v.htmlContentGrid,children:Object(ne.jsx)("div",{className:v.htmlContent,dangerouslySetInnerHTML:{__html:null===p||void 0===p?void 0:p.how_to_do}})})})]}),Object(ne.jsx)(B.a,{children:Object(ne.jsx)(j.a,{onClick:s,variant:"outlined",color:"secondary",children:"Close"})})]})};t.default=function(){var e=oe(),t=Object(Z.b)().Post,i=Object($.a)(),n=Object(Y.b)(),r=Object(U.useState)({page_no:1,page_limit:10}),s=Object(c.a)(r,2),q=s[0],C=s[1],y=Object(U.useState)(0),N=Object(c.a)(y,2),W=N[0],B=N[1],A=Object(U.useState)([]),I=Object(c.a)(A,2),S=I[0],R=I[1],F=Object(U.useState)(!0),z=Object(c.a)(F,2),V=z[0],D=z[1],G=Object(U.useState)({isOpen:!1,title:"",okBtnText:"",isEdit:!1,data:{}}),H=Object(c.a)(G,2),J=H[0],X=H[1],ee=Object(U.useState)({isOpen:!1,title:"",data:{}}),te=Object(c.a)(ee,2),ie=te[0],ae=te[1],ce=function(){var e=Object(l.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:D(!0),t("app/listWorkout",q).then((function(e){D(!1),e.error?i.show(e.message,"error"):(R(e.data),B(e.page_count))})).catch((function(e){D(!1),i.show(e.message,"error")}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),se=function(){X((function(e){return Object(o.a)(Object(o.a)({},e),{},{isOpen:!1})}))},ue=function(){ce(),se()};return Object(U.useEffect)((function(){ce()}),[q]),Object(ne.jsxs)("div",{className:e.root,children:[Object(ne.jsx)(Q.a,{title:"Workout Exercise"}),Object(ne.jsxs)(u.a,{alignItems:"flex-end",container:!0,justify:"space-between",spacing:3,children:[Object(ne.jsx)(u.a,{item:!0,children:Object(ne.jsx)(d.a,{component:"h1",variant:"h3",children:"Workout Exercise"})}),Object(ne.jsx)(u.a,{item:!0,children:Object(ne.jsx)(j.a,{variant:"contained",onClick:function(){X((function(e){return Object(o.a)(Object(o.a)({},e),{},{isOpen:!0,isEdit:!1,title:"Add Exercise",okBtnText:"Save"})}))},className:e.themeButton,startIcon:Object(ne.jsx)(E.a,{}),children:"Add"})})]}),Object(ne.jsxs)(m.a,{className:e.tabCard,children:[Object(ne.jsx)(v.a,{className:e.content,children:Object(ne.jsx)(b.a,{children:Object(ne.jsxs)(h.a,{children:[Object(ne.jsx)(p.a,{children:Object(ne.jsxs)(g.a,{children:[Object(ne.jsx)(O.a,{align:"center",children:"#"}),Object(ne.jsx)(O.a,{align:"center",children:"Workout Image"}),Object(ne.jsx)(O.a,{align:"center",children:"Workout Name"}),Object(ne.jsx)(O.a,{align:"center",children:"Workout Description"}),Object(ne.jsx)(O.a,{align:"center",children:"Actions"})]})}),Object(ne.jsxs)(f.a,{children:[!V&&S.map((function(r,c){var s,u;return Object(ne.jsxs)(g.a,{hover:!0,children:[Object(ne.jsx)(O.a,{align:"center",children:q.page_limit*(q.page_no-1)+c+1}),Object(ne.jsx)(O.a,{align:"center",children:Object(ne.jsx)("div",{className:e.jCenter,children:Object(ne.jsx)(x.a,{variant:"square",src:null===r||void 0===r||null===(s=r.workout_image)||void 0===s?void 0:s.url})})}),Object(ne.jsx)(O.a,{align:"center",children:null===r||void 0===r?void 0:r.workout_name}),Object(ne.jsx)(O.a,{align:"center",children:Object(ne.jsx)(w.a,{title:null===r||void 0===r?void 0:r.workout_description,children:Object(ne.jsx)("span",{children:(u=null===r||void 0===r?void 0:r.workout_description,(null===u||void 0===u?void 0:u.length)>=25?"".concat(u.substring(0,40),"..."):u)})})}),Object(ne.jsx)(O.a,{align:"center",children:Object(ne.jsxs)("div",{className:e.sEvenly,children:[Object(ne.jsx)(w.a,{title:"View",arrow:!0,children:Object(ne.jsx)(k.a,{className:e.iconPadd,onClick:function(){return function(e){ae((function(t){return Object(o.a)(Object(o.a)({},t),{},{isOpen:!0,data:e,title:"View Workout Exerice"})}))}(r)},children:Object(ne.jsx)(T.a,{color:"primary"})})}),Object(ne.jsx)(w.a,{title:"Edit",arrow:!0,children:Object(ne.jsx)(k.a,{className:e.iconPadd,onClick:function(){return function(e){X((function(t){return Object(o.a)(Object(o.a)({},t),{},{isOpen:!0,isEdit:!0,data:e,title:"Edit Exercise",okBtnText:"Edit"})}))}(r)},children:Object(ne.jsx)(L.a,{color:"action"})})}),Object(ne.jsx)(w.a,{title:"Delete",arrow:!0,children:Object(ne.jsx)(k.a,{className:e.iconPadd,onClick:function(){return function(e){var o=n.openModel,r=n.setLoading,c=n.closeModel;o((function(){r(!0),t("app/deleteWorkout",{id:e._id}).then(function(){var e=Object(l.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r(!1),c(),ue(),i.show(t.message,"success");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){r(!1),i.show("Internal Server Error","error")}))}))}(r)},children:Object(ne.jsx)(P.a,{color:"secondary"})})})]})})]},c)})),V&&Object(ne.jsx)(K.a,{}),!V&&0==S.length&&Object(ne.jsx)(K.b,{children:"No Data Found"})]})]})})}),Object(ne.jsx)(_.a,{className:e.actions,children:Object(ne.jsx)(M.a,{count:W,page:q.page_no,onChange:function(e,t){C((function(e){return Object(o.a)(Object(o.a)({},e),{},{page_no:t})}))}})})]}),Object(ne.jsx)(re,Object(o.a)(Object(o.a)({},J),{},{onClose:se,onSuccess:ue})),Object(ne.jsx)(le,Object(o.a)(Object(o.a)({},ie),{},{onClose:function(){ae((function(e){return Object(o.a)(Object(o.a)({},e),{},{isOpen:!1})}))}}))]})}}}]);
//# sourceMappingURL=14.9eeff170.chunk.js.map