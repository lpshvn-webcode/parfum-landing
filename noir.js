(() => {
  'use strict';
  const root=document.getElementById('killer-perfume');
  if(!root||root.dataset.initialized)return;
  root.dataset.initialized='true';
  const $=selector=>root.querySelector(selector), $$=selector=>[...root.querySelectorAll(selector)];
  const config=window.KILLER_PERFUME_CONFIG||{};
  const catalog=[
    {id:'imagination',brand:'LOUIS VUITTON',name:'Imagination',full:'Louis Vuitton Imagination',photo:'./assets/imagination.webp',description:'Свежий акцент для города и твоего ритма.',tone:'ice'},
    {id:'tygar',brand:'BVLGARI LE GEMME',name:'Tygar',full:'Bvlgari Le Gemme Tygar',photo:'./assets/tygar.webp',description:'Выразительный характер для важных встреч.',tone:'gold'},
    {id:'hedonistic',brand:'CLIVE CHRISTIAN',name:'Hedonistic',full:'Clive Christian Hedonistic',photo:'./assets/hedonistic.webp',description:'Вечерний образ с насыщенным характером.',tone:'wine'},
    {id:'absolu',brand:'CREED',name:'Aventus Absolu',full:'Creed Aventus Absolu',photo:'./assets/absolu.webp',description:'Собранный, уверенный акцент твоего образа.',tone:'ice'},
    {id:'pheramone',brand:'ЛИЧНЫЙ ВЫБОР',name:'Pheramone',full:'Pheramone',photo:'./assets/pheramone.webp',description:'Добавь в коллекцию. Характер уточни при подборе.',tone:'wine'}
  ];
  const byId=Object.fromEntries(catalog.map(item=>[item.id,item]));
  const presets={
    city:{label:'THE EVERYDAY EDIT',title:'В СВОЁМ<br>РИТМЕ.',description:'Свежий старт и собранный характер. Сочетание для города, работы и спонтанных планов.',photos:['imagination','tygar','absolu'],first:['imagination','imagination','tygar','absolu','pheramone'],gift:['imagination','tygar','hedonistic','hedonistic','pheramone']},
    night:{label:'THE AFTER HOURS EDIT',title:'ПОСЛЕ<br>ЗАКАТА.',description:'Для свиданий и вечеров, которые хочется запомнить. Выразительное сочетание под особое настроение.',photos:['pheramone','hedonistic','absolu'],first:['hedonistic','hedonistic','pheramone','pheramone','absolu'],gift:['tygar','imagination','hedonistic','pheramone','absolu']},
    impact:{label:'THE SIGNATURE EDIT',title:'ТВОЁ<br>ПРИСУТСТВИЕ.',description:'Когда хочется произвести впечатление. Собранный характер и яркие акценты в одном сете.',photos:['absolu','tygar','hedonistic'],first:['tygar','tygar','absolu','absolu','hedonistic'],gift:['imagination','tygar','hedonistic','absolu','pheramone']}
  };
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const params=new URLSearchParams(location.search);
  let offer=['5','10'].includes(params.get('offer'))?params.get('offer'):(root.dataset.offer==='5'?'5':'10');
  let boxes=[[],[]],activeBox=0,mode='ready',preset='city',pending=false,priorOverflow='',returnFocus=null;
  const dialog=$('#nk-order'),form=$('#nk-form');
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const complete=()=>boxes.every(box=>box.length===5);
  const storageKey=()=>`kp-noir-v3-${offer}`;
  function restore(){
    try{const saved=JSON.parse(localStorage.getItem(storageKey()));boxes=[0,1].map(i=>Array.isArray(saved?.[i])?saved[i].filter(id=>byId[id]).slice(0,5):[]);}catch{boxes=[[],[]];}
    if(offer==='5')boxes[1]=[...boxes[0]];
  }
  function persist(){if(offer==='5')boxes[1]=[...boxes[0]];try{localStorage.setItem(storageKey(),JSON.stringify(boxes));}catch{}}
  function announce(text){$('#nk-message').textContent=text;}
  function event(name,detail={}){root.dispatchEvent(new CustomEvent(`kp:${name}`,{bubbles:true,detail:{offer,...detail}}));}
  function scrollTo(element){element.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});}
  function describe(box){
    const counts=new Map();box.forEach(id=>counts.set(id,(counts.get(id)||0)+1));
    return [...counts].map(([id,count])=>`${byId[id].full}${count>1?' × '+count:''}`).join(' · ');
  }
  function setHero(id){
    const item=byId[id];if(!item)return;
    root.dataset.tone=item.tone;
    const img=$('#nk-hero-image');img.src=item.photo;img.alt=`Визуализация флакона ${item.full}`;
    $('#nk-hero-brand').textContent=item.brand;$('#nk-hero-name').textContent=item.name;
    $('#nk-hero-index').textContent=String(catalog.indexOf(item)+1).padStart(2,'0');
    $$('[data-hero]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.hero===id)));
  }
  function renderPreset(){
    const set=presets[preset];
    $$('[data-preset]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.preset===preset)));
    $('#nk-ready-art').innerHTML=set.photos.map(id=>`<img src="${byId[id].photo}" alt="${escape(byId[id].full)}" width="850" height="1275" loading="lazy">`).join('')+'<span>YOUR SCENT. YOUR SIGNATURE.</span>';
    $('#nk-preset-eyebrow').textContent=set.label;$('#nk-preset-name').innerHTML=set.title;$('#nk-preset-description').textContent=set.description;
    $('#nk-preset-composition').innerHTML=`<p><b>Первый сет · 50 мл</b><br>${escape(describe(set.first))}</p><p><b>Подарочный сет · 50 мл</b><br>${escape(describe(offer==='5'?set.first:set.gift))}</p>`;
    const selected=JSON.stringify(boxes[0])===JSON.stringify(set.first)&&JSON.stringify(boxes[1])===JSON.stringify(offer==='5'?set.first:set.gift);
    $('#nk-choose-preset').innerHTML=`${selected?'Сет выбран — оформить':'Выбрать этот сет'} <span class="nk-arrow" aria-hidden="true"></span>`;
    $('#nk-choose-preset').dataset.selected=String(selected);
  }
  function renderCards(){
    const track=$('#nk-scent-track');
    track.innerHTML=catalog.map((item,i)=>`<article class="nk-scent-card" data-scent="${item.id}"><div class="nk-scent-photo"><img src="${item.photo}" width="850" height="1275" loading="lazy" alt="Визуализация флакона ${escape(item.full)}"><span class="nk-scent-number">0${i+1} / 05</span><span class="nk-picked-badge" hidden></span></div><div class="nk-scent-copy"><span class="nk-scent-brand">${escape(item.brand)}</span><h4>${escape(item.name)}</h4><p>${escape(item.description)}</p><button type="button" class="nk-scent-add" data-add="${item.id}" aria-label="Добавить ${escape(item.full)} в сет">В мой сет · 10 мл <span aria-hidden="true">+</span></button></div></article>`).join('');
  }
  function updateCards(){
    $$('.nk-scent-card').forEach(card=>{
      const id=card.dataset.scent,count=boxes[activeBox].filter(value=>value===id).length;
      card.classList.toggle('is-picked',count>0);
      const badge=card.querySelector('.nk-picked-badge');badge.hidden=!count;badge.textContent=`В сете: ${count}`;
      const button=card.querySelector('[data-add]');button.disabled=boxes[activeBox].length===5;
      button.innerHTML=`${count?'Ещё 10 мл':'В мой сет · 10 мл'} <span aria-hidden="true">+</span>`;
    });
  }
  function renderProgress(){
    $('#nk-step-label').textContent=activeBox===0?'ТВОЙ ПЕРВЫЙ СЕТ':'ТВОЙ ПОДАРОЧНЫЙ СЕТ';
    const count=boxes[activeBox].length;
    $('#nk-progress-count').textContent=`${count} / 5`;
    $('#nk-progress-text').textContent=count===5?'Сет собран · 50 мл':`Добавь ещё ${5-count} ${5-count===1?'флакон':5-count<5?'флакона':'флаконов'} по 10 мл`;
    $('#nk-slots').innerHTML=Array.from({length:5},(_,i)=>{
      const id=boxes[activeBox][i];return `<button type="button" class="nk-slot ${id?'is-filled':''}" data-remove-index="${i}" ${!id||(offer==='5'&&activeBox===1)?'disabled':''} aria-label="${id?`Убрать ${escape(byId[id].full)}`:'Свободное место'}">${id?`<img src="${byId[id].photo}" alt="" width="850" height="1275">`:'+'}</button>`;
    }).join('');
    const next=$('#nk-custom-next');
    next.disabled=count!==5;
    next.innerHTML=`${complete()?'Оформить два сета':count!==5?`Добавь ещё ${5-count}`:activeBox===0?'Дальше: сет в подарок':'Вернуться к первому сету'} <span class="nk-arrow" aria-hidden="true"></span>`;
  }
  function updateDock(){
    const count=boxes.flat().length;
    $('#nk-dock-status').textContent=complete()?'Коллекция собрана':count?`${count} из 10 флаконов`:'Два сета · 100 мл';
    $('#nk-dock-action').innerHTML=`${complete()?'Оформить':boxes[0].length===5?'Выбрать подарок':count?'Продолжить':'Выбрать сет'} <span class="nk-arrow" aria-hidden="true"></span>`;
  }
  function render(){
    $$('[data-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mode===mode)));
    $$('[data-box]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.box)===activeBox)));
    $('#nk-ready').hidden=mode!=='ready';$('#nk-custom').hidden=mode!=='custom';
    const mirror=offer==='5'&&activeBox===1;
    $('#nk-gift-mirror').hidden=!mirror;$('#nk-catalog-area').hidden=mirror;
    $('#nk-selection-bar').hidden=!complete();
    renderPreset();renderProgress();updateCards();updateDock();
  }
  function setOffer(value,updateUrl=true){
    offer=value;root.dataset.offer=value;activeBox=0;restore();
    $$('[data-offer-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.offerChoice===offer)));
    $('#nk-offer-description').textContent=offer==='10'?'До 10 ароматов · два сета':'До 5 ароматов · двойной объём';
    $('#nk-box-offer').textContent=offer==='10'?'Во втором сете можно выбрать другое сочетание.':'Подарочный сет полностью повторяет твой первый набор.';
    $('#nk-faq-offer').textContent=offer==='10'?'Ты получаешь два сета по 50 мл за 50 000 ₸. Состав подарочного сета можно выбрать отдельно. Сейчас в подборке 5 ароматов, их можно повторять.':'Ты выбираешь до 5 разных ароматов. Второй сет полностью повторяет первый и идёт в подарок. Всего 100 мл за 50 000 ₸.';
    if(updateUrl){try{const url=new URL(location.href);url.searchParams.set('offer',offer);history.replaceState(null,'',url);}catch{}}
    announce('');render();
  }
  function openOrder(){
    if(!complete()||dialog.open)return;
    $('#nk-order-content').hidden=false;$('#nk-order-result').hidden=true;$('#nk-form-error').textContent='';
    $('#nk-order-summary').innerHTML=boxes.map((box,i)=>`<p><b>${i?'Подарочный сет':'Первый сет'} · 50 мл</b><br>${escape(describe(box))}</p>`).join('')+'<strong>100 мл · 50 000 ₸</strong>';
    priorOverflow=document.body.style.overflow;returnFocus=document.activeElement;document.body.style.overflow='hidden';dialog.showModal();event('checkout_open');
  }
  function closeOrder(){if(!pending)dialog.close();}
  function next(){
    if(complete()){openOrder();return;}
    if(boxes.flat().length){mode='custom';activeBox=boxes[0].length===5?1:0;render();scrollTo($('#nk-custom'));}
    else scrollTo($('#kp-builder'));
  }
  root.addEventListener('click',e=>{
    const button=e.target.closest('button');if(!button||!root.contains(button)||button.disabled)return;
    if(button.dataset.hero){setHero(button.dataset.hero);return;}
    if(button.dataset.offerChoice){setOffer(button.dataset.offerChoice);scrollTo($('#kp-top'));return;}
    if(button.dataset.mode){mode=button.dataset.mode;announce('');render();return;}
    if(button.dataset.preset){preset=button.dataset.preset;renderPreset();return;}
    if(button.dataset.box!==undefined){activeBox=Number(button.dataset.box);announce('');render();return;}
    if(button.dataset.add){
      if(boxes[activeBox].length===5)return;
      const id=button.dataset.add;boxes[activeBox].push(id);persist();render();
      announce(`${byId[id].name} добавлен. ${boxes[activeBox].length} из 5 флаконов${complete()?'. Можно оформить заявку.':'.'}`);
      if(button.disabled)$('#nk-custom-next').focus({preventScroll:true});
      event('selection_change',{count:boxes.flat().length});return;
    }
    if(button.dataset.removeIndex!==undefined){
      const i=Number(button.dataset.removeIndex),id=boxes[activeBox][i];boxes[activeBox].splice(i,1);persist();render();
      announce(`${byId[id].name} убран. Добавь другой аромат.`);
      const focus=$('.nk-slot:not(:disabled)')||$(`[data-box="${activeBox}"]`);focus.focus({preventScroll:true});event('selection_change',{count:boxes.flat().length});return;
    }
    if(button.dataset.slide){
      const track=$('#nk-scent-track'),card=track.querySelector('.nk-scent-card');
      const style=getComputedStyle(track),gap=parseFloat(style.gap)||18;
      track.scrollBy({left:Number(button.dataset.slide)*(card.getBoundingClientRect().width+gap),behavior:reduced()?'instant':'smooth'});return;
    }
    if(button.id==='nk-choose-preset'){
      if(button.dataset.selected==='true'){openOrder();return;}
      const selected=presets[preset];boxes=[[...selected.first],[...(offer==='5'?selected.first:selected.gift)]];persist();render();
      announce('Готово. Оба сета выбраны — можно оформить заявку.');event('selection_change',{count:10});scrollTo($('#nk-selection-bar'));return;
    }
    if(button.id==='nk-dock-action'||button.id==='nk-custom-next'){next();return;}
    if(button.id==='nk-checkout'){openOrder();return;}
    if(button.id==='nk-edit-selection'){mode='custom';activeBox=0;render();scrollTo($('#nk-custom'));return;}
    if(button.id==='nk-edit-first'){activeBox=0;render();return;}
    if(button.id==='nk-close-order'||button.id==='nk-result-close'){closeOrder();return;}
    if(button.id==='nk-privacy-toggle'){$('#nk-privacy').hidden=!$('#nk-privacy').hidden;button.setAttribute('aria-expanded',String(!$('#nk-privacy').hidden));}
  });
  root.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#kp-"]');if(!a)return;const target=$(a.getAttribute('href'));if(target){e.preventDefault();scrollTo(target);}
  });
  dialog.addEventListener('cancel',e=>{if(pending)e.preventDefault();});
  dialog.addEventListener('close',()=>{document.body.style.overflow=priorOverflow;if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeOrder();}});
  $('#nk-name').addEventListener('input',()=>$('#nk-name').setCustomValidity(''));
  $('#nk-phone').addEventListener('input',()=>$('#nk-phone').setCustomValidity(''));
  form.addEventListener('submit',async e=>{
    e.preventDefault();if(pending||!complete())return;
    const name=$('#nk-name').value.trim();let phone=$('#nk-phone').value.replace(/\D/g,'');
    if(phone.length===11&&phone[0]==='8')phone='7'+phone.slice(1);
    if(name.length<2){$('#nk-name').setCustomValidity('Укажи имя: минимум два символа.');$('#nk-name').reportValidity();return;}
    if(!/^7\d{10}$/.test(phone)){$('#nk-phone').setCustomValidity('Укажи номер: +7 и ещё 10 цифр.');$('#nk-phone').reportValidity();return;}
    if(!form.reportValidity())return;
    const search=new URLSearchParams(location.search);
    const attribution=Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','ttclid'].filter(key=>search.has(key)).map(key=>[key,search.get(key).slice(0,500)]));
    const payload={name,phone:'+'+phone,consent:true,consentVersion:config.consentVersion||'noir-prototype-v3',offer,priceKzt:50000,totalMl:100,sets:boxes.map(box=>box.map(id=>({id,name:byId[id].full,ml:10}))),attribution};
    const submit=form.querySelector('[type=submit]');pending=true;submit.disabled=true;submit.textContent='Отправляем…';$('#nk-form-error').textContent='';
    try{
      const live=typeof config.submitLead==='function';
      if(live){const response=await config.submitLead(payload);if(response?.ok!==true)throw new Error('Unconfirmed submission');event('lead_submitted');}else event('demo_completed');
      $('#nk-order-content').hidden=true;const result=$('#nk-order-result');result.hidden=false;
      result.innerHTML=`<h2>${live?'ЗАЯВКА<br><span>ПРИНЯТА.</span>':'ВСЁ<br><span>СОБРАНО.</span>'}</h2><p>${live?'Свяжемся с тобой, чтобы подтвердить состав и доставку.':'Это проверка оформления. Контакты никуда не отправлены. Подключим приём заявок перед запуском.'}</p><button type="button" id="nk-result-close" class="nk-button nk-button-light">Вернуться к ароматам <span class="nk-arrow" aria-hidden="true"></span></button>`;
      result.focus();form.reset();
    }catch{$('#nk-form-error').textContent='Не удалось подтвердить отправку. Контакты и выбор остались в форме — попробуй ещё раз.';}
    finally{pending=false;submit.disabled=false;submit.innerHTML='Оформить заявку <span class="nk-arrow" aria-hidden="true"></span>';}
  });
  if(typeof config.submitLead==='function'){$('#nk-form-note').textContent='Передадим оба сета вместе с твоими контактами.';$('#nk-privacy').textContent=config.privacyText||'Политику обработки данных необходимо настроить перед запуском.';}
  renderCards();setOffer(offer,false);
})();
