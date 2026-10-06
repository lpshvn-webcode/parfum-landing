const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 const base='http://127.0.0.1:3000';
 const artifacts=path.join(__dirname,'../artifacts');await fs.mkdir(artifacts,{recursive:true});
 const noOverflow=async()=>assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 try{
  await page.goto(base+'/noir.html?offer=10&utm_source=test');await page.evaluate(()=>document.fonts.ready);await noOverflow();
  assert(await page.locator('#nk-hero-image').evaluate(image=>image.complete&&image.naturalWidth>0));
  assert.equal(await page.locator('.nk-hero-switch').evaluate(element=>getComputedStyle(element).display),'none');
  assert.equal(await page.locator('.nk-stage-progress i').count(),5);
  assert.equal(await page.locator('.nk-fragrance-card').count(),18);
  assert.equal(await page.locator('.nk-fragrance-card:visible').count(),3);
  assert.equal(await page.locator('.nk-brand-group').count(),2);
  assert(await page.locator('.nk-fragrance-card:visible img').first().evaluate(image=>image.complete&&image.naturalWidth>0));
  assert.equal(await page.locator('.nk-mode-switch').count(),0);
  assert.equal(await page.locator('dialog, #nk-form').count(),0);
  const ctas=page.locator('a.nk-button, .nk-header-cta, .nk-text-link, .nk-dock a');
  assert((await ctas.count())>=6);
  for(let i=0;i<await ctas.count();i++){assert.equal(await ctas.nth(i).getAttribute('href'),'#popup1');assert((await ctas.nth(i).textContent()).includes('Приобрести сет'));}
  await page.screenshot({path:path.join(artifacts,'noir-mobile.png')});
  console.log('PASS mobile hero, Tilda CTAs and simplified set story');

  await page.locator('[data-mix="night"]').click();
  assert((await page.locator('#nk-mix-output').textContent()).includes('ПОСЛЕ ЗАКАТА'));
  assert.equal(await page.locator('#nk-mix-output i').count(),5);
  await page.locator('.nk-set-showcase').screenshot({path:path.join(artifacts,'noir-set-mobile.png')});
  await page.locator('.nk-fragrance-card').first().click();
  assert.equal(await page.locator('.nk-fragrance-card').first().getAttribute('aria-expanded'),'true');
  await page.locator('[data-filter="universal"]').click();
  assert.equal(await page.locator('.nk-fragrance-card:visible').count(),3);
  assert((await page.locator('#nk-show-more').textContent()).includes('8'));
  await page.locator('#nk-show-more').click();assert.equal(await page.locator('.nk-fragrance-card:visible').count(),11);
  await page.locator('[data-filter="men"]').click();
  assert.equal(await page.locator('.nk-fragrance-card:visible').count(),3);
  await page.locator('#nk-show-more').click();assert.equal(await page.locator('.nk-fragrance-card:visible').count(),7);
  console.log('PASS mood examples, 18-item catalogue, details and filters');

  await page.locator('[data-offer-choice="5"]').click();
  assert((await page.locator('#nk-offer-description').textContent()).includes('одинаковых'));
  assert(new URL(page.url()).searchParams.get('offer')==='5');
  const stacked=await page.evaluate(()=>{const photo=document.querySelector('.nk-statement-photo').getBoundingClientRect();const copy=document.querySelector('.nk-statement-content').getBoundingClientRect();return copy.top>=photo.bottom-30;});
  assert(stacked);await noOverflow();
  const boxOrder=await page.evaluate(()=>{const photo=document.querySelector('.nk-box-photo').getBoundingClientRect();const copy=document.querySelector('.nk-box-copy').getBoundingClientRect();return copy.top<photo.top;});
  assert(boxOrder);
  await page.locator('.nk-statement').screenshot({path:path.join(artifacts,'noir-statement-mobile.png')});
  console.log('PASS mobile statement composition and offer variants');

  await page.setViewportSize({width:320,height:740});await noOverflow();
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/noir.html?offer=10');await page.evaluate(()=>document.fonts.ready);await noOverflow();
  assert.equal(await page.locator('.nk-fragrance-grid').evaluate(element=>getComputedStyle(element).gridTemplateColumns.split(' ').length),3);
  await page.screenshot({path:path.join(artifacts,'noir-desktop.png')});
  await page.screenshot({path:path.join(artifacts,'noir-full.png'),fullPage:true});
  console.log('PASS 320px and desktop layouts');

  for(const offer of ['5','10']){
    await page.goto(base+`/dist/preview-${offer}.html`);await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('#killer-perfume').getAttribute('data-offer'),offer);
    assert((await page.locator('#nk-hero-image').getAttribute('src')).startsWith('data:image/webp'));
    assert.equal(await page.locator('.nk-fragrance-card').count(),18);
    assert((await page.locator('.nk-fragrance-card img').first().getAttribute('src')).startsWith('data:image/png'));await noOverflow();
  }
  console.log('PASS standalone Tilda previews');

  const motionContext=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const motionPage=await motionContext.newPage();await motionPage.goto(base+'/noir.html?offer=10');
  await motionPage.waitForFunction(()=>document.querySelector('#nk-hero-name')?.textContent!=='Imagination',{timeout:6500});
  assert.equal(await motionPage.locator('.nk-stage-progress .is-active').count(),1);await motionContext.close();
  assert.deepEqual(errors,[]);
  console.log('PASS mobile hero slideshow and no browser errors');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
