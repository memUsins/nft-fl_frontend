(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22fd02"],{ea2b:function(t,e,c){"use strict";c.r(e);var l=c("7a23");const a={class:"container container_main levelspage"},n={class:"screen screen_levels"},s=Object(l["g"])("div",{class:"screen__title"},[Object(l["g"])("h1",{class:"title"},"Уровни")],-1),o={class:"list levels"},r=Object(l["g"])("img",{src:"img/screens/7.png",alt:"bg",class:"background background_first"},null,-1),b=Object(l["g"])("img",{src:"img/screens/8.png",alt:"bg",class:"background background_second"},null,-1),i={class:"screen screen_data"},g={class:"block-list"},u={class:"block"},j={class:"item"},O=Object(l["g"])("p",null,"ID:",-1),d={class:"item"},p=Object(l["g"])("p",null,"referers:",-1),f={class:"item"},m=Object(l["g"])("p",null,"reward from tables:",-1),v={class:"item",style:{"margin-bottom":"15px"}},I=Object(l["g"])("p",null,"reward from referers:",-1),h={class:"item"},D=Object(l["g"])("p",null,"общий онлайн:",-1),y={class:"item"},C=Object(l["g"])("p",null,"кол-во транзакций:",-1),k={class:"item"},w=Object(l["g"])("p",null,"общий оборот:",-1),$={class:"block"},A={class:"item"},E=Object(l["g"])("p",null,"reinvest value:",-1),R=Object(l["g"])("li",{class:"item"},[Object(l["g"])("p",null,"farming:"),Object(l["g"])("span",null,"100")],-1),_={class:"item"},T=Object(l["g"])("p",null,"reward from farming:",-1),L={class:"item"},S=Object(l["g"])("p",null,"reward from partners:",-1),U={class:"block info"},B={class:"item"},P=Object(l["g"])("p",null,"Referal Link:",-1),x=["value"],J=Object(l["g"])("button",{class:"button copy"},"Copy",-1),N={class:"item item-passwords"},V=Object(l["g"])("p",null,"Passwords:",-1),Y={class:"passwords"},q=Object(l["g"])("div",{class:"float ufo"},[Object(l["g"])("img",{src:"img/screens/ufo.png",alt:"ufo",class:"img"}),Object(l["g"])("div",{class:"bg"})],-1),F=Object(l["g"])("img",{src:"img/screens/9.png",alt:"bg",class:"background background_first"},null,-1);function G(t,e,c,G,H,M){const z=Object(l["A"])("Card");return Object(l["u"])(),Object(l["f"])("div",a,[Object(l["g"])("div",n,[s,Object(l["g"])("ul",o,[(Object(l["u"])(!0),Object(l["f"])(l["a"],null,Object(l["y"])(t.getContractInfo.cardData,(t,e)=>(Object(l["u"])(),Object(l["d"])(z,{class:"level-item",key:e,cardData:t,onBUYCardId:M.buyTableEvent,onREINVESTCardId:M.reinvestCardEvent},null,8,["cardData","onBUYCardId","onREINVESTCardId"]))),128))]),r,b]),Object(l["g"])("div",i,[Object(l["g"])("div",g,[Object(l["g"])("ul",u,[Object(l["g"])("li",j,[O,Object(l["g"])("span",null,Object(l["D"])(t.getContractInfo.accountInfo.id),1)]),Object(l["g"])("li",d,[p,Object(l["g"])("span",null,Object(l["D"])(t.getContractInfo.accountInfo.referalAddress),1)]),Object(l["g"])("li",f,[m,Object(l["g"])("span",null,Object(l["D"])(t.getContractInfo.accountInfo.paymant.table),1)]),Object(l["g"])("li",v,[I,Object(l["g"])("span",null,Object(l["D"])(t.getContractInfo.accountInfo.paymant.referal),1)]),Object(l["g"])("li",h,[D,Object(l["g"])("span",null,Object(l["D"])(t.getContractInfo.globalInfo.accountCount),1)]),Object(l["g"])("li",y,[C,Object(l["g"])("span",null,Object(l["D"])(t.getContractInfo.globalInfo.tableCount),1)]),Object(l["g"])("li",k,[w,Object(l["g"])("span",null,Object(l["D"])(t.getContractInfo.globalInfo.tableMoney),1)])]),Object(l["g"])("ul",$,[Object(l["g"])("li",A,[E,Object(l["g"])("span",null,Object(l["D"])(t.getContractInfo.accountInfo.paymant.pullDeposit),1)]),R,Object(l["g"])("li",_,[T,Object(l["g"])("span",null,Object(l["D"])(t.getContractInfo.accountInfo.paymant.pull),1)]),Object(l["g"])("li",L,[S,Object(l["g"])("span",null,Object(l["D"])(t.getContractInfo.accountInfo.paymant.pullReferal),1)])]),Object(l["g"])("ul",U,[Object(l["g"])("li",B,[P,Object(l["g"])("form",{class:"form",onSubmit:e[0]||(e[0]=Object(l["J"])(t=>M.copyReferal(),["prevent"]))},[Object(l["g"])("input",{type:"text",class:"input",value:t.referalLink,disabled:"",id:"referalLink"},null,8,x),J],32)]),Object(l["g"])("li",N,[V,Object(l["g"])("ul",Y,[(Object(l["u"])(!0),Object(l["f"])(l["a"],null,Object(l["y"])(this.getAccountInfo.password,(t,e)=>(Object(l["u"])(),Object(l["f"])("li",{key:e},[Object(l["g"])("p",null,Object(l["D"])(t),1)]))),128))])])])]),q,F])])}const H=["src"],M={class:"content block block_bg"},z={class:"list"},K={class:"item level-info"},Q={class:"level"},W={class:"price"},X={class:"line"},Z={class:"item info"},tt=Object(l["g"])("p",null,"Кругов осталось:",-1),et={class:"item info"},ct=Object(l["g"])("p",null,"Выплаты с уровня:",-1),lt={class:"item info"},at=Object(l["g"])("p",null,"Бонус с партнёра:",-1),nt={class:"buttons"};function st(t,e,c,a,n,s){return Object(l["u"])(),Object(l["f"])("li",{class:Object(l["p"])(["card",{disabled:!c.cardData.isActive}])},[Object(l["g"])("img",{src:`img/planets/${c.cardData.lvl}.png`,alt:"planet",class:"card-planet float"},null,8,H),Object(l["g"])("div",M,[Object(l["g"])("ul",z,[Object(l["g"])("li",K,[Object(l["g"])("span",Q,Object(l["D"])(c.cardData.lvl)+" lvl",1),Object(l["g"])("span",W,Object(l["D"])(c.cardData.price)+" lvl",1)]),Object(l["g"])("div",X,[Object(l["g"])("div",{class:"progress",style:Object(l["q"])(`right: ${s.Progress(c.cardData.progress)}%`)},null,4)]),Object(l["g"])("li",Z,[tt,Object(l["g"])("span",null,Object(l["D"])(c.cardData.paymantCount),1)]),Object(l["g"])("li",et,[ct,Object(l["g"])("span",null,Object(l["D"])(c.cardData.paymant),1)]),Object(l["g"])("li",lt,[at,Object(l["g"])("span",null,Object(l["D"])(c.cardData.bonus),1)])]),Object(l["g"])("div",nt,[Object(l["g"])("button",{class:"buy button",onClick:e[0]||(e[0]=t=>s.Buy(c.cardData))},"Купить"),Object(l["g"])("button",{class:"outline button",onClick:e[1]||(e[1]=t=>s.Reinvest(c.cardData))}," Реинвест ")])])],2)}var ot={name:"card",props:["cardData"],methods:{Buy(t){return this.$emit("BUY-cardId",t)},Reinvest(t){return this.$emit("REINVEST-cardId",t)},Progress(t){return t<=0?100:t<=10?90:t<=20?80:t<=30?70:t<=40?60:t<=50?50:t<=60?40:t<=70?30:t<=80?20:t<=90?10:t<=100?0:void 0}}},rt=c("6b0d"),bt=c.n(rt);const it=bt()(ot,[["render",st]]);var gt=it,ut=c("5502"),jt={name:"levels",components:{Card:gt},data(){return{}},computed:{...Object(ut["b"])(["getAccountInfo","getContractInfo"])},mounted(){this.init()},methods:{buyTableEvent(t){const e=[this.getAccountInfo.address,t.lvl,t.price,this.getAccountInfo.referalId];this.$store.dispatch("buyTable",e)},reinvestCardEvent(t){console.log("From the child2:",t)},copyReferal(){document.querySelector("#referalLink").select();try{document.execCommand("copy"),alert("Ссылка успешно скопирована!")}catch(t){console.log(t)}},init(){const t=this.getAccountInfo.address;this.getAccountInfo.address&&void 0!==typeof window.ethereum||this.$router.push({name:"Home"}),this.$store.dispatch("getFullUserInfo",t),this.$store.dispatch("getUserTableProgress",t),this.$store.dispatch("getUserLevels",t),this.$store.dispatch("getGlobalStat",t),this.referalLink=`${window.location.origin}/?referalId=${this.getAccountInfo.id}`}},watch:{getAccountInfo(){this.init()}}};const Ot=bt()(jt,[["render",G]]);e["default"]=Ot}}]);
//# sourceMappingURL=chunk-2d22fd02.dda296b2.js.map