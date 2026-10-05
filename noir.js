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
    {name:'Amouage Guidance',group:'universal',sound:'Сладкое, кремовое, древесно-пряное',notes:'Груша, ладан, шафран, миндаль, османтус, ваниль, сандал, амбра'},
    {name:'Miss Dior',group:'universal',sound:'Цветочное, сладкое, нежное',notes:'Роза, ваниль, бобы тонка, сандал, пачули'},
    {name:'Carolina Herrera Good Girl Blush',group:'universal',sound:'Нежное, цветочное, пудрово-сладкое',notes:'Бергамот, горький миндаль, иланг-иланг, пион, ваниль, тонка'},
    {name:'Kilian Good Girl Gone Bad',group:'universal',sound:'Яркое, цветочное, женственное',notes:'Апельсиновый цвет, роза, османтус, тубероза, жасмин, нарцисс'},
    {name:'Lattafa Yara',group:'universal',sound:'Сладкое, кремовое, фруктово-ванильное',notes:'Мандарин, гелиотроп, орхидея, тропические фрукты, ваниль, мускус, сандал'},
    {name:'Givenchy Ange ou Démon',group:'universal',sound:'Сладкое, цветочное, восточное',notes:'Шафран, тимьян, лилия, иланг-иланг, ваниль, тонка, палисандр, дубовый мох'},
    {name:'Victoria’s Secret So Sexy',group:'universal',sound:'Сладкое, фруктово-цветочное, чувственное',notes:'Яблоко, клементины, орхидея, ваниль, мускус'},
    {name:'Lanvin Modern Princess',group:'universal',sound:'Фруктовое, сладкое, цветочное',notes:'Красное яблоко, красная смородина, фрезия, жасмин, ванильная орхидея, белый мускус'},
    {name:'Killer',group:'universal',sound:'Авторский аромат',notes:'Авторская композиция'},
    {name:'Musk Kashmir',group:'universal',sound:'Мягкое, мускусное, пудровое, тёплое',notes:'Белый мускус, амбра, цветочные и древесные оттенки'},
    {name:'Iceberg — Antonio Banderas Aqua Blue',group:'universal',sound:'Свежее, водянистое, лёгкое',notes:'Aqua Blue: акватическое, свежеводное направление'},
    {name:'Creed Absolu Aventus',group:'men',sound:'Свежее, фруктово-пряное, древесное',notes:'Бергамот, грейпфрут, имбирь, ананас, кардамон, корица, ветивер, пачули, лабданум'},
    {name:'Clive Christian Hedonistic',group:'men',sound:'Тёплое, древесно-табачное, глубокое',notes:'Мате, лабданум, табак'},
    {name:'Dior Cologne',group:'men',sound:'Свежее, цитрусовое, чистое',notes:'Калабрийский бергамот, грейпфрут, цветочные и древесные оттенки'},
    {name:'Феромон мужской',group:'men',sound:'Зависит от конкретной формулы',notes:'Состав зависит от формулы продукта'},
    {name:'Louis Vuitton Imagination',group:'men',sound:'Свежее, цитрусовое, пряное',notes:'Амброксан, китайский чёрный чай, нероли, имбирь, корица, сицилийский кедрат'},
    {name:'Louis Vuitton Symphony',group:'men',sound:'Яркое, цитрусовое, свежее',notes:'Грейпфрут, бергамот, апельсин, имбирь'},
    {name:'Bvlgari Tygar',group:'men',sound:'Яркое, свежее, цитрусово-древесное',notes:'Грейпфрут и амбровый аккорд'}
  ];
  const mixes={
    day:{eyebrow:'01 / НА КАЖДЫЙ ДЕНЬ',title:'ЛЁГКО. ЧИСТО. СОБРАННО.',text:'Свежие и цитрусовые направления для города, работы и планов без расписания.',vials:['Свежесть','Цитрус','Чистота','Дерево','Фаворит']},
    night:{eyebrow:'02 / ПОСЛЕ ЗАКАТА',title:'ГЛУБЖЕ. ТЕПЛЕЕ. БЛИЖЕ.',text:'Табачные, древесные и сладкие акценты для свиданий и долгих вечеров.',vials:['Тепло','Специи','Табак','Амбра','Фаворит']},
    signature:{eyebrow:'03 / ПРОИЗВЕСТИ ВПЕЧАТЛЕНИЕ',title:'ЯРКО. ДОРОГО. УЗНАВАЕМО.',text:'Контрастное сочетание, которое подчёркивает характер и остаётся в памяти.',vials:['Акцент','Глубина','Шлейф','Контраст','Фаворит']}
  };
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const params=new URLSearchParams(location.search);
  let offer=['5','10'].includes(params.get('offer'))?params.get('offer'):(root.dataset.offer==='5'?'5':'10');
  let heroIndex=0,heroTimer=null,heroSwapTimer=null,heroVisible=true;
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
  function renderMix(key){
    const mix=mixes[key]||mixes.day;
    $$('[data-mix]').forEach(button=>button.setAttribute('aria-selected',String(button.dataset.mix===key)));
    $('#nk-mix-output').innerHTML=`<span>${escape(mix.eyebrow)}</span><h4>${escape(mix.title)}</h4><p>${escape(mix.text)}</p><div>${mix.vials.map((vial,index)=>`<i><b>0${index+1}</b>${escape(vial)}</i>`).join('')}</div>`;
  }
  function renderCatalog(){
    $('#nk-fragrance-grid').innerHTML=fragrances.map((item,index)=>`<button type="button" class="nk-fragrance-card" data-group="${item.group}" aria-expanded="false"><span class="nk-fragrance-number">${String(index+1).padStart(2,'0')}</span><small>${item.group==='men'?'МУЖСКОЙ':'ЖЕНСКИЙ / УНИСЕКС'}</small><h4>${escape(item.name)}</h4><p>${escape(item.sound)}</p><span class="nk-fragrance-more">Звучание и ноты <b>+</b></span><span class="nk-fragrance-details"><strong>Основные ноты</strong>${escape(item.notes)}</span></button>`).join('');
  }
  function filterCatalog(group){
    $$('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===group)));
    $$('.nk-fragrance-card').forEach(card=>card.hidden=group!=='all'&&card.dataset.group!==group);
  }
  function setOffer(value,updateUrl=true){
    offer=value;root.dataset.offer=value;
    $$('[data-offer-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.offerChoice===offer)));
    $('#nk-offer-description').textContent=offer==='10'?'До 10 ароматов · два сета':'До 5 ароматов · два одинаковых сета';
    $('#nk-box-offer').textContent=offer==='10'?'Во втором сете можно выбрать другое сочетание.':'Подарочный сет полностью повторяет первый.';
    $('#nk-faq-offer').textContent=offer==='10'?'Ты получаешь два сета по 50 мл за 50 000 ₸. Состав подарочного сета можно подобрать отдельно.':'Ты выбираешь до 5 ароматов. Второй сет повторяет первый и идёт в подарок. Всего 100 мл за 50 000 ₸.';
    if(updateUrl){const url=new URL(location.href);url.searchParams.set('offer',offer);history.replaceState(null,'',url);}
  }
  root.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(button?.dataset.hero){setHero(button.dataset.hero);startHeroShow();return;}
    if(button?.dataset.offerChoice){setOffer(button.dataset.offerChoice);return;}
    if(button?.dataset.mix){renderMix(button.dataset.mix);return;}
    if(button?.dataset.filter){filterCatalog(button.dataset.filter);return;}
    const card=event.target.closest('.nk-fragrance-card');
    if(card){const open=card.getAttribute('aria-expanded')==='true';card.setAttribute('aria-expanded',String(!open));return;}
    const anchor=event.target.closest('a[href^="#kp-"]');
    if(anchor){const target=$(anchor.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});}}
  });
  heroCatalog.slice(1).forEach(item=>{const image=new Image();image.src=item.photo;});
  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>{heroVisible=entries[0]?.isIntersecting??true;heroVisible?startHeroShow():stopHeroShow();},{threshold:.15});
    observer.observe($('.nk-hero'));
  }
  const handleViewport=()=>startHeroShow();
  if(mobileHero.addEventListener)mobileHero.addEventListener('change',handleViewport);else mobileHero.addListener(handleViewport);
  document.addEventListener('visibilitychange',handleViewport);
  renderCatalog();renderMix('day');filterCatalog('all');setOffer(offer,false);commitHero(heroCatalog[0].id);startHeroShow();
})();
