(() => {
  'use strict';
  const root=document.getElementById('killer-perfume');
  if(!root||root.dataset.initialized)return;
  root.dataset.initialized='true';
  const $=selector=>root.querySelector(selector), $$=selector=>[...root.querySelectorAll(selector)];
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileHero=matchMedia('(max-width: 700px)');
  const heroCatalog=[
    {id:'imagination',brand:'LOUIS VUITTON',name:'Imagination',full:'Louis Vuitton Imagination',photo:'./assets/imagination.webp',tone:'ice'},
    {id:'tygar',brand:'BVLGARI LE GEMME',name:'Tygar',full:'Bvlgari Le Gemme Tygar',photo:'./assets/tygar.webp',tone:'gold'},
    {id:'hedonistic',brand:'CLIVE CHRISTIAN',name:'Hedonistic',full:'Clive Christian Hedonistic',photo:'./assets/hedonistic.webp',tone:'wine'},
    {id:'absolu',brand:'CREED',name:'Aventus Absolu',full:'Creed Aventus Absolu',photo:'./assets/absolu.webp',tone:'ice'},
    {id:'pheramone',brand:'ЛИЧНЫЙ ВЫБОР',name:'Pheramone',full:'Pheramone',photo:'./assets/pheramone.webp',tone:'wine'}
  ];
  const fragrances=[
    {name:'Amouage Guidance',group:'universal',image:'amouage-guidance.png',sound:'Сладкое, кремовое, древесно-пряное',notes:'Груша, ладан, шафран, миндаль, османтус, ваниль, сандал, амбра'},
    {name:'Miss Dior',group:'universal',image:'miss-dior.png',sound:'Цветочное, сладкое, нежное',notes:'Роза, ваниль, бобы тонка, сандал, пачули'},
    {name:'Carolina Herrera Good Girl Blush',group:'universal',image:'good-girl-blush.png',sound:'Нежное, цветочное, пудрово-сладкое',notes:'Бергамот, горький миндаль, иланг-иланг, пион, ваниль, тонка'},
    {name:'Kilian Good Girl Gone Bad',group:'universal',image:'good-girl-gone-bad.png',sound:'Яркое, цветочное, женственное',notes:'Апельсиновый цвет, роза, османтус, тубероза, жасмин, нарцисс'},
    {name:'Lattafa Yara',group:'universal',image:'lattafa-yara.png',sound:'Сладкое, кремовое, фруктово-ванильное',notes:'Мандарин, гелиотроп, орхидея, тропические фрукты, ваниль, мускус, сандал'},
    {name:'Givenchy Ange ou Démon',group:'universal',image:'ange-ou-demon.png',sound:'Сладкое, цветочное, восточное',notes:'Шафран, тимьян, лилия, иланг-иланг, ваниль, тонка, палисандр, дубовый мох'},
    {name:'Victoria’s Secret So Sexy',group:'universal',image:'so-sexy.png',sound:'Сладкое, фруктово-цветочное, чувственное',notes:'Яблоко, клементины, орхидея, ваниль, мускус'},
    {name:'Lanvin Modern Princess',group:'universal',image:'modern-princess.png',sound:'Фруктовое, сладкое, цветочное',notes:'Красное яблоко, красная смородина, фрезия, жасмин, ванильная орхидея, белый мускус'},
    {name:'Killer',group:'universal',image:'killer.png',sound:'Авторский аромат',notes:'Авторская композиция'},
    {name:'Musk Kashmir',group:'universal',image:'musk-kashmir.png',sound:'Мягкое, мускусное, пудровое, тёплое',notes:'Белый мускус, амбра, цветочные и древесные оттенки'},
    {name:'Iceberg — Antonio Banderas Aqua Blue',group:'universal',image:'aqua-blue.png',sound:'Свежее, водянистое, лёгкое',notes:'Aqua Blue: акватическое, свежеводное направление'},
    {name:'Creed Absolu Aventus',group:'men',image:'creed-absolu-aventus.png',sound:'Свежее, фруктово-пряное, древесное',notes:'Бергамот, грейпфрут, имбирь, ананас, кардамон, корица, ветивер, пачули, лабданум'},
    {name:'Clive Christian Hedonistic',group:'men',image:'clive-hedonistic.png',sound:'Тёплое, древесно-табачное, глубокое',notes:'Мате, лабданум, табак'},
    {name:'Dior Cologne',group:'men',image:'dior-cologne.png',sound:'Свежее, цитрусовое, чистое',notes:'Калабрийский бергамот, грейпфрут, цветочные и древесные оттенки'},
    {name:'Феромон мужской',group:'men',image:'pheromone-men.png',sound:'Зависит от конкретной формулы',notes:'Состав зависит от формулы продукта'},
    {name:'Louis Vuitton Imagination',group:'men',image:'lv-imagination.png',sound:'Свежее, цитрусовое, пряное',notes:'Амброксан, китайский чёрный чай, нероли, имбирь, корица, сицилийский кедрат'},
    {name:'Louis Vuitton Symphony',group:'men',image:'lv-symphony.png',sound:'Яркое, цитрусовое, свежее',notes:'Грейпфрут, бергамот, апельсин, имбирь'},
    {name:'Bvlgari Tygar',group:'men',image:'bvlgari-tygar.png',sound:'Яркое, свежее, цитрусово-древесное',notes:'Грейпфрут и амбровый аккорд'},
    {name:'Clive Christian Blond Amber',group:'men',image:'clive-blond-amber.png',sound:'Тёплое, амбровое, пряно-древесное',notes:'Ром, сухофрукты, табак, бобы тонка, мирра, пачули'},
    {name:'Arabian Oud Madawi',group:'men',image:'arabian-oud-madawi.png',sound:'Сладкое, фруктово-цветочное, мускусное',notes:'Ананасовый цвет, персик, яблоневый цвет, пачули, мускус'},
    {name:'Orto Parisi Megamare',group:'men',image:'orto-parisi-megamare.png',sound:'Морское, солёное, минеральное',notes:'Морские аккорды, соль, амбра, мускус'},
    {name:'Hormone Parisi Gaba',group:'men',image:'hormone-parisi-gaba.png',sound:'Мягкое, мускусное, амбровое',notes:'Мускус, амбра, древесные и минеральные оттенки'}
  ];
  const escape=value=>{const holder=document.createElement('div');holder.textContent=String(value);return holder.innerHTML.split('"').join('&quot;').split("'").join('&#39;');};
  const params=new URLSearchParams(location.search);
  let offer=['5','10'].includes(params.get('offer'))?params.get('offer'):(root.dataset.offer==='5'?'5':'10');
  let heroIndex=0,heroTimer=null,heroSwapTimer=null,heroVisible=true,catalogFilter='all',catalogExpanded=false;
  function commitHero(id){
    const item=heroCatalog.find(entry=>entry.id===id);if(!item)return;
    heroIndex=heroCatalog.indexOf(item);root.dataset.tone=item.tone;
    const image=$('#nk-hero-image');image.src=item.photo;image.alt=`Визуализация флакона ${item.full}`;
    $('#nk-hero-brand').textContent=item.brand;$('#nk-hero-name').textContent=item.name;
    $('#nk-hero-index').textContent=String(heroIndex+1).padStart(2,'0');
    $$('[data-hero]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.hero===id)));
    $$('.nk-stage-progress i').forEach((segment,index)=>segment.classList.toggle('is-active',index===heroIndex));
  }
  function setHero(id,animate=true){
    const stage=$('.nk-hero-stage');clearTimeout(heroSwapTimer);
    if(!animate||reduced()){stage.classList.remove('is-changing');commitHero(id);return;}
    stage.classList.add('is-changing');
    heroSwapTimer=setTimeout(()=>{commitHero(id);requestAnimationFrame(()=>stage.classList.remove('is-changing'));},360);
  }
  function stopHeroShow(){clearInterval(heroTimer);heroTimer=null;}
  function startHeroShow(){
    stopHeroShow();if(!mobileHero.matches||reduced()||!heroVisible||document.hidden)return;
    heroTimer=setInterval(()=>setHero(heroCatalog[(heroIndex+1)%heroCatalog.length].id),4800);
  }
  function renderCatalog(){
    $('#nk-fragrance-grid').innerHTML=fragrances.map((item,index)=>{const photo=/^(data:|https?:\/\/)/.test(item.image)?item.image:`./assets/catalog/${item.image}`;return `<button type="button" class="nk-fragrance-card" data-group="${item.group}" aria-expanded="false"><span class="nk-fragrance-visual"><img src="${photo}" width="720" height="720" loading="${index<3?'eager':'lazy'}" alt="Флакон ${escape(item.name)}"><span class="nk-fragrance-number">${String(index+1).padStart(2,'0')}</span></span><span class="nk-fragrance-copy"><small>${item.group==='men'?'МУЖСКОЙ':'ЖЕНСКИЙ / УНИСЕКС'}</small><h4>${escape(item.name)}</h4><p>${escape(item.sound)}</p><span class="nk-fragrance-more">Звучание и ноты <b>+</b></span><span class="nk-fragrance-details"><strong>Основные ноты</strong>${escape(item.notes)}</span></span></button>`;}).join('');
  }
  function filterCatalog(group){
    catalogFilter=group;catalogExpanded=false;
    $$('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===group)));
    updateCatalogVisibility();
  }
  let motionReady=false;
  function updateCatalogVisibility(animateAll=false){
    const matches=$$('.nk-fragrance-card').filter(card=>catalogFilter==='all'||card.dataset.group===catalogFilter);
    $$('.nk-fragrance-card').forEach(card=>card.hidden=true);
    matches.forEach((card,index)=>card.hidden=!catalogExpanded&&index>=3);
    if(motionReady){let step=0;matches.forEach(card=>{if(card.hidden)return;card.style.setProperty('--rd',Math.min(step++,8)*70+'ms');if(animateAll){card.classList.remove('is-in');void card.offsetWidth;card.classList.add('is-in');}});}
    const more=$('#nk-show-more'),remaining=Math.max(0,matches.length-3);
    more.hidden=!remaining;more.setAttribute('aria-expanded',String(catalogExpanded));
    more.innerHTML=catalogExpanded?'Скрыть каталог <span>↑</span>':`Показать ещё <span>${remaining}</span>`;
  }
  const certificates=window.KP_CERTS||[
    {src:'./assets/certs/cert-1.webp',title:'ISO 9001 / ISO 14001 · Swiss Safety Center'},
    {src:'./assets/certs/cert-2.webp',title:'Сертификат происхождения · Швейцария'},
    {src:'./assets/certs/cert-3.webp',title:'Сертификат анализа · Luzi'},
    {src:'./assets/certs/cert-4.webp',title:'Сертификат происхождения · Великобритания'}
  ];
  let certIndex=0;
  function renderCerts(){
    $('#nk-proof-track').innerHTML=certificates.map((cert,index)=>cert.src?`<button type="button" class="nk-cert" data-cert="${index}" aria-label="Открыть: ${escape(cert.title)}"><img src="${escape(cert.src)}" loading="lazy" alt="${escape(cert.title)}"><span class="nk-cert-zoom" aria-hidden="true">+</span></button>`:`<div class="nk-cert" aria-disabled="true"><span class="nk-cert-empty"><b>${escape(cert.title)}</b>СКОРО ЗДЕСЬ</span></div>`).join('');
    updateProofCount();
  }
  function updateProofCount(){
    const track=$('#nk-proof-track'),items=[...track.children];if(!items.length)return;
    const left=track.scrollLeft+(parseFloat(getComputedStyle(track).paddingLeft)||0);
    let current=0;items.forEach((item,index)=>{if(item.offsetLeft-left<=item.offsetWidth/2)current=index;});
    $('#nk-proof-count').textContent=`${String(current+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
  }
  function openCert(index){
    const real=certificates.map((cert,n)=>cert.src?n:-1).filter(n=>n>=0);if(!real.length)return;
    certIndex=real.includes(index)?index:real[0];
    const cert=certificates[certIndex],box=$('#nk-lightbox');
    $('#nk-lightbox-img').src=cert.src;$('#nk-lightbox-img').alt=cert.title;$('#nk-lightbox-caption').textContent=`${cert.title} · ${real.indexOf(certIndex)+1} / ${real.length}`;
    box.hidden=false;document.documentElement.style.overflow='hidden';box.querySelector('.nk-lightbox-close').focus();
  }
  function stepCert(direction){
    const real=certificates.map((cert,n)=>cert.src?n:-1).filter(n=>n>=0),at=real.indexOf(certIndex);
    openCert(real[(at+direction+real.length)%real.length]);
  }
  function closeCert(){$('#nk-lightbox').hidden=true;document.documentElement.style.overflow='';}
  document.addEventListener('keydown',event=>{if($('#nk-lightbox').hidden)return;if(event.key==='Escape')closeCert();if(event.key==='ArrowRight')stepCert(1);if(event.key==='ArrowLeft')stepCert(-1);});
  $('#nk-proof-track').addEventListener('scroll',()=>requestAnimationFrame(updateProofCount),{passive:true});
  function collapseCatalog(){
    const extra=$$('.nk-fragrance-card').filter(card=>!card.hidden).slice(3);
    const finish=()=>{catalogExpanded=false;updateCatalogVisibility();extra.forEach(card=>card.classList.remove('is-leaving'));};
    $('#kp-builder').scrollIntoView({behavior:reduced()?'auto':'smooth',block:'start'});
    if(reduced()||!extra.length){finish();return;}
    extra.forEach((card,index)=>{card.style.setProperty('--ld',Math.min(index,6)*25+'ms');card.classList.add('is-leaving');});
    setTimeout(finish,620);
  }
  function setOffer(value){
    offer=value;root.dataset.offer=value;
    $$('[data-offer-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.offerChoice===offer)));
    $('#nk-offer-description').textContent=offer==='10'?'До 10 ароматов · два сета':'До 5 ароматов · два одинаковых сета';
    $('#nk-box-offer').textContent=offer==='10'?'Во втором сете можно выбрать другое сочетание.':'Подарочный сет полностью повторяет первый.';
    $('#nk-stack-gift').textContent=offer==='10'?'Во втором сете можно выбрать другое сочетание. Доставка по Казахстану бесплатная.':'Второй сет повторяет первый и идёт в подарок. Доставка по Казахстану бесплатная.';
    $('#nk-faq-offer').textContent=offer==='10'?'Ты получаешь два сета по 50 мл за 50 000 ₸. Состав подарочного сета можно подобрать отдельно.':'Ты выбираешь до 5 ароматов. Второй сет повторяет первый и идёт в подарок. Всего 100 мл за 50 000 ₸.';
  }
  root.addEventListener('click',event=>{
    const button=event.target.closest('button');
    const certButton=event.target.closest('[data-cert]');if(certButton){openCert(Number(certButton.dataset.cert));return;}
    if(button?.hasAttribute('data-cert-close')||event.target.id==='nk-lightbox'){closeCert();return;}
    if(button?.dataset.certNav){stepCert(Number(button.dataset.certNav));return;}
    if(button?.dataset.proofScroll){const track=$('#nk-proof-track'),card=track.firstElementChild;track.scrollBy({left:Number(button.dataset.proofScroll)*(card.offsetWidth+20),behavior:reduced()?'auto':'smooth'});return;}
    if(button?.dataset.hero){setHero(button.dataset.hero);startHeroShow();return;}
    if(button?.dataset.offerChoice){setOffer(button.dataset.offerChoice);return;}
    if(button?.dataset.filter){filterCatalog(button.dataset.filter);return;}
    if(button?.id==='nk-show-more'){if(catalogExpanded)collapseCatalog();else{catalogExpanded=true;updateCatalogVisibility();}return;}
    const card=event.target.closest('.nk-fragrance-card');
    if(card){const open=card.getAttribute('aria-expanded')==='true';card.setAttribute('aria-expanded',String(!open));return;}
    const anchor=event.target.closest('a[href^="#kp-"]');
    if(anchor){const target=$(anchor.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});}}
  });
  const stackCards=$$('.nk-stack-card');
  if(stackCards.length){
    root.classList.add('nk-js');
    const unlockSticky=()=>{const value=CSS.supports('overflow','clip')?'clip':'visible';for(let node=root.parentElement;node&&node!==document.documentElement;node=node.parentElement){const style=getComputedStyle(node);if(/hidden|auto|scroll/.test(style.overflowX+' '+style.overflowY))node.style.setProperty('overflow',value,'important');}};
    unlockSticky();addEventListener('load',()=>{unlockSticky();setTimeout(unlockSticky,1200);});
    const stackList=$('.nk-stack-list');
    stackCards.forEach((card,index)=>{
      card.style.setProperty('--i',index);
      const nav=document.createElement('span');nav.className='nk-stack-nav';
      nav.innerHTML=stackCards.map((_,n)=>`<button type="button" data-stack="${n}" aria-label="Плашка ${n+1}" aria-current="${n===index}"></button>`).join('');
      card.querySelector('.nk-stack-meta').insertBefore(nav,card.querySelector('.nk-stack-meta span:last-child'));
    });
    const format=value=>Math.round(value).toLocaleString('ru-RU');
    const countUp=card=>{
      card.querySelectorAll('.nk-count').forEach(el=>{
        const target=Number(el.dataset.to);if(reduced()||!target)return;
        el.style.minWidth=el.offsetWidth+'px';const start=performance.now(),duration=1100;
        const step=now=>{const t=Math.min(1,(now-start)/duration),eased=1-Math.pow(1-t,3);el.textContent=format(target*eased);if(t<1)requestAnimationFrame(step);else el.textContent=format(target);};
        requestAnimationFrame(step);
      });
    };
    if('IntersectionObserver'in window){
      const seen=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting&&!entry.target.classList.contains('is-seen')){entry.target.classList.add('is-seen');countUp(entry.target);seen.unobserve(entry.target);}}),{threshold:.35});
      stackCards.forEach(card=>seen.observe(card));
    }else stackCards.forEach(card=>card.classList.add('is-seen'));
    let stackTick=false,activeStack=-1,jsSticky=false,brokenFrames=0;
    const stackTops=()=>stackCards.map(card=>parseFloat(getComputedStyle(card).top)||0);
    const updateStack=()=>{
      stackTick=false;
      const tops=stackTops(),listRect=stackList.getBoundingClientRect(),heights=stackCards.map(card=>card.offsetHeight),gap=parseFloat(getComputedStyle(stackCards[0]).marginBottom)||0;
      const rects=stackCards.map(card=>card.getBoundingClientRect());
      if(!jsSticky&&!reduced()){
        const broken=rects.some((rect,index)=>rect.top<tops[index]-4&&listRect.bottom-rect.bottom>60);
        brokenFrames=broken?brokenFrames+1:0;
        if(brokenFrames>=3){jsSticky=true;root.dataset.sticky='js';}
      }
      let layout=rects.map(rect=>({top:rect.top,height:rect.height,bottom:rect.bottom}));
      if(jsSticky){
        let natural=listRect.top;
        layout=stackCards.map((card,index)=>{
          const start=natural;natural+=heights[index]+gap;
          const limit=Math.max(0,listRect.bottom-12-(start+heights[index]+(index<stackCards.length-1?gap:0)));
          const shift=Math.min(Math.max(tops[index]-start,0),limit);
          card.style.setProperty('--ty',shift.toFixed(1)+'px');
          return {top:start+shift,height:heights[index],bottom:start+shift+heights[index]};
        });
      }
      const progress=layout.map((item,index)=>Math.min(1,Math.max(0,1-(item.top-tops[index])/Math.max(item.height,1))));
      let active=0;
      stackCards.forEach((card,index)=>{
        const depth=reduced()?0:progress.slice(index+1).reduce((sum,value)=>sum+value,0);
        card.style.setProperty('--d',depth.toFixed(3));
        card.style.setProperty('--s',Math.min(1,Math.max(0,(innerHeight-layout[index].top)/(innerHeight+layout[index].height))).toFixed(3));
        if(index>0&&progress[index]>=.6)active=index;
      });
      const inView=layout[0].top<innerHeight*.7&&layout[stackCards.length-1].bottom>0;
      stackCards.forEach((card,index)=>card.classList.toggle('is-active',inView&&index===active));
      if(inView&&active!==activeStack){activeStack=active;$$('.nk-stack-nav button').forEach(button=>button.setAttribute('aria-current',String(Number(button.dataset.stack)===active)));}
    };
    const requestStack=()=>{if(!stackTick){stackTick=true;requestAnimationFrame(updateStack);}};
    addEventListener('scroll',requestStack,{passive:true});addEventListener('resize',requestStack);updateStack();
    root.addEventListener('click',event=>{
      const dot=event.target.closest('[data-stack]');if(!dot)return;
      const index=Number(dot.dataset.stack),tops=stackTops(),gap=parseFloat(getComputedStyle(stackCards[0]).marginBottom)||0;
      let natural=stackList.getBoundingClientRect().top+scrollY;
      for(let n=0;n<index;n++)natural+=stackCards[n].offsetHeight+gap;
      scrollTo({top:natural-tops[index]+(index?2:-12),behavior:reduced()?'auto':'smooth'});
    });
  }
  function initMotion(){
    if(reduced())return;
    root.classList.add('nk-js','nk-motion');
    const seen=new Set();
    const watch=(el,delay)=>{if(seen.has(el))return;seen.add(el);el.classList.add('nk-rv');if(delay!==undefined)el.style.setProperty('--rd',delay+'ms');io.observe(el);};
    const io='IntersectionObserver'in window?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-in');io.unobserve(entry.target);}}),{threshold:.1,rootMargin:'0px 0px -4% 0px'}):{observe:el=>el.classList.add('is-in'),unobserve(){}};
    let wordIndex=0;
    const split=node=>[...node.childNodes].forEach(child=>{
      if(child.nodeType===3){
        const fragment=document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(part=>{if(!part)return;if(/^\s+$/.test(part)){fragment.append(document.createTextNode(part));return;}const word=document.createElement('b');word.className='nk-w';word.textContent=part;word.style.setProperty('--wi',wordIndex++);fragment.append(word);});
        child.parentNode.insertBefore(fragment,child);child.remove();
      }else if(child.nodeType===1&&child.tagName!=='BR')split(child);
    });
    $$('h2').forEach(heading=>{wordIndex=0;split(heading);heading.classList.add('nk-split');io.observe(heading);});
    const groups=['.nk-section-head>p','.nk-section-head .nk-eyebrow','.nk-catalog-filters','.nk-fragrance-card','.nk-process article','.nk-statement-content>*:not(h2)','.nk-box-copy>*:not(h2)','.nk-box-photo','.nk-faq .nk-eyebrow','.nk-questions details','.nk-proof-bar','.nk-cert','.nk-contacts .nk-eyebrow','.nk-contact-list>div','.nk-finale>*:not(h2)','.nk-stack>.nk-eyebrow','.nk-footer'];
    groups.forEach(selector=>{
      const parents=new Map();
      $$(selector).forEach(el=>{
        const index=parents.get(el.parentElement)||0;parents.set(el.parentElement,index+1);
        if(el.hidden){el.classList.add('nk-rv','is-in');el.style.setProperty('--rd','0ms');seen.add(el);return;}
        watch(el,Math.min(index,6)*90);
      });
    });
    const bar=document.createElement('div');bar.className='nk-scrollbar';bar.setAttribute('aria-hidden','true');root.append(bar);
    const parallax=$$('.nk-statement-photo img,.nk-box-photo img'),word=$('.nk-hero-word'),hero=$('.nk-hero'),stage=$('.nk-hero-stage');
    let tick=false;
    const update=()=>{
      tick=false;const vh=innerHeight,max=document.documentElement.scrollHeight-vh;
      root.style.setProperty('--sp',max>0?Math.min(1,scrollY/max).toFixed(4):0);
      parallax.forEach(img=>{const rect=img.parentElement.getBoundingClientRect();if(rect.bottom<-50||rect.top>vh+50)return;img.style.setProperty('--py',(((rect.top+rect.height/2-vh/2)/vh)*-52).toFixed(1)+'px');});
      if(word&&scrollY<vh*1.4)word.style.setProperty('--wy',(scrollY*.16).toFixed(1)+'px');
    };
    const request=()=>{if(!tick){tick=true;requestAnimationFrame(update);}};
    addEventListener('scroll',request,{passive:true});addEventListener('resize',request);update();
    if(hero&&matchMedia('(hover:hover) and (pointer:fine)').matches){
      hero.addEventListener('pointermove',event=>{
        const rect=hero.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;
        hero.style.setProperty('--mx',(x*100).toFixed(1)+'%');hero.style.setProperty('--my',(y*100).toFixed(1)+'%');
        stage.style.setProperty('--tx',((x-.5)*-22).toFixed(1)+'px');stage.style.setProperty('--ty',((y-.5)*-16).toFixed(1)+'px');
      });
      hero.addEventListener('pointerleave',()=>{stage.style.setProperty('--tx','0px');stage.style.setProperty('--ty','0px');});
    }
    motionReady=true;
  }
  heroCatalog.slice(1).forEach(item=>{const image=new Image();image.src=item.photo;});
  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>{heroVisible=entries[0]?.isIntersecting??true;heroVisible?startHeroShow():stopHeroShow();},{threshold:.15});
    observer.observe($('.nk-hero'));
  }
  const handleViewport=()=>startHeroShow();
  if(mobileHero.addEventListener)mobileHero.addEventListener('change',handleViewport);else mobileHero.addListener(handleViewport);
  document.addEventListener('visibilitychange',handleViewport);
  renderCatalog();renderCerts();filterCatalog('all');setOffer(offer);commitHero(heroCatalog[0].id);startHeroShow();initMotion();
})();
