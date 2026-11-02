// Shared in-memory demo data and utilities used by all page-specific scripts.
const money=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(Number(n)||0);
const $=id=>document.getElementById(id);
function toast(msg){const t=$('toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2300)}
function clockInit(){const update=()=>{const d=new Date();if($('clock'))$('clock').textContent=d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});if($('todayDate'))$('todayDate').textContent=d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})};update();setInterval(update,30000)}
const categories=[{"name":"All","icon":"▦"},{"name":"Burger","icon":"🍽️"},{"name":"Sandwich","icon":"🍽️"},{"name":"Pizza","icon":"🍽️"},{"name":"Shawarma","icon":"🍽️"},{"name":"Veg Fried Snacks","icon":"🍽️"},{"name":"Indo-Chinese Noodles","icon":"🍽️"},{"name":"Fried Rice","icon":"🍽️"},{"name":"Manchurian Style","icon":"🍽️"},{"name":"Fried Chicken","icon":"🍽️"},{"name":"Waffles","icon":"🍽️"},{"name":"Pop Waffle","icon":"🍽️"},{"name":"Mocktails","icon":"🍽️"},{"name":"Falooda","icon":"🍽️"},{"name":"Plain Scoops","icon":"🍽️"},{"name":"Milk Shakes","icon":"🍽️"},{"name":"Thick Shakes","icon":"🍽️"}];
const products=[{"id":1,"name":"Veg Burger","category":"Burger","price":249,"emoji":"🍽️","image":"correct-01_veg_burger.jpg","quick":false},{"id":2,"name":"Paneer Burger","category":"Burger","price":315,"emoji":"🍽️","image":"correct-02_paneer_burger.jpg","quick":false},{"id":3,"name":"Chicken Burger","category":"Burger","price":332,"emoji":"🍽️","image":"correct-03_chicken_burger.jpg","quick":false,"tag":"Bestseller"},{"id":4,"name":"Veg Sandwich","category":"Sandwich","price":232,"emoji":"🍽️","image":"correct-04_veg_sandwich.jpg","quick":false},{"id":5,"name":"Paneer Sandwich","category":"Sandwich","price":299,"emoji":"🍽️","image":"correct-05_paneer_sandwich.jpg","quick":false},{"id":6,"name":"Chicken Sandwich","category":"Sandwich","price":315,"emoji":"🍽️","image":"correct-06_chicken_sandwich.jpg","quick":false},{"id":7,"name":"Veg Pizza","category":"Pizza","price":315,"emoji":"🍽️","image":"correct-07_veg_pizza.jpg","quick":false},{"id":8,"name":"Cheese & Corn Pizza","category":"Pizza","price":299,"emoji":"🍽️","image":"correct-08_cheese_and_corn_pizza.jpg","quick":false},{"id":9,"name":"Margherita Pizza","category":"Pizza","price":265,"emoji":"🍽️","image":"correct-09_margherita_pizza.jpg","quick":false},{"id":10,"name":"Paneer Pizza","category":"Pizza","price":382,"emoji":"🍽️","image":"correct-10_paneer_pizza.jpg","quick":false},{"id":11,"name":"Chicken Pizza","category":"Pizza","price":399,"emoji":"🍽️","image":"correct-11_chicken_pizza.jpg","quick":false,"tag":"Bestseller"},{"id":12,"name":"Chicken Shawarma","category":"Shawarma","price":249,"emoji":"🍽️","image":"correct-12_chicken_shawarma.jpg","quick":false,"tag":"Bestseller"},{"id":13,"name":"Sp Chicken Shawarma","category":"Shawarma","price":265,"emoji":"🍽️","image":"correct-13_sp_chicken_shawarma.jpg","quick":false},{"id":14,"name":"Veg Spring Rolls","category":"Veg Fried Snacks","price":199,"emoji":"🍽️","image":"categoryfix-14_veg_spring_rolls.jpg","quick":false},{"id":15,"name":"Paneer Spring Rolls","category":"Veg Fried Snacks","price":282,"emoji":"🍽️","image":"categoryfix-15_paneer_spring_rolls.jpg","quick":false},{"id":16,"name":"Potato Shots","category":"Veg Fried Snacks","price":199,"emoji":"🍽️","image":"categoryfix-16_potato_shots.jpg","quick":false},{"id":17,"name":"Veg Momos","category":"Veg Fried Snacks","price":199,"emoji":"🍽️","image":"categoryfix-17_veg_momos.jpg","quick":false},{"id":18,"name":"French Fries","quick":false,"category":"Veg Fried Snacks","price":165,"emoji":"🍽️","image":"categoryfix-18_french_fries.jpg"},{"id":19,"name":"Peri Peri French Fries","category":"Veg Fried Snacks","price":199,"emoji":"🍽️","image":"categoryfix-19_peri_peri_french_fries.jpg","quick":false},{"id":20,"name":"Onion Rings (6P)","category":"Veg Fried Snacks","price":199,"emoji":"🍽️","image":"categoryfix-20_onion_rings_6p.jpg","quick":false},{"id":21,"name":"Veg Noodles","category":"Indo-Chinese Noodles","price":249,"emoji":"🍽️","image":"categoryfix-21_veg_noodles.jpg","quick":false},{"id":22,"name":"Egg Noodles","category":"Indo-Chinese Noodles","price":299,"emoji":"🍽️","image":"categoryfix-22_egg_noodles.jpg","quick":false},{"id":23,"name":"Veg Manchurian Noodles","category":"Indo-Chinese Noodles","price":299,"emoji":"🍽️","image":"categoryfix-23_veg_manchurian_noodles.jpg","quick":false},{"id":24,"name":"Egg Manchurian Noodles","category":"Indo-Chinese Noodles","price":332,"emoji":"🍽️","image":"categoryfix-24_egg_manchurian_noodles.jpg","quick":false},{"id":25,"name":"Chicken Noodles","category":"Indo-Chinese Noodles","price":332,"emoji":"🍽️","image":"categoryfix-25_chicken_noodles.jpg","quick":false},{"id":26,"name":"Paneer Noodles","category":"Indo-Chinese Noodles","price":315,"emoji":"🍽️","image":"categoryfix-26_paneer_noodles.jpg","quick":false},{"id":27,"name":"Veg Fried Rice","category":"Fried Rice","price":249,"emoji":"🍽️","image":"categoryfix-27_veg_fried_rice.jpg","quick":false},{"id":28,"name":"Jeera Rice","category":"Fried Rice","price":249,"emoji":"🍽️","image":"categoryfix-28_jeera_rice.jpg","quick":false},{"id":29,"name":"Egg Fried Rice","category":"Fried Rice","price":299,"emoji":"🍽️","image":"categoryfix-29_egg_fried_rice.jpg","quick":false},{"id":30,"name":"Manchurian Fried Rice","category":"Fried Rice","price":299,"emoji":"🍽️","image":"categoryfix-30_manchurian_fried_rice.jpg","quick":false},{"id":31,"name":"Egg Manchurian Fried Rice","category":"Fried Rice","price":332,"emoji":"🍽️","image":"categoryfix-31_egg_manchurian_fried_rice.jpg","quick":false},{"id":32,"name":"Chicken Fried Rice","category":"Fried Rice","price":332,"emoji":"🍽️","image":"categoryfix-32_chicken_fried_rice.jpg","quick":false,"tag":"Bestseller"},{"id":33,"name":"Paneer Fried Rice","category":"Fried Rice","price":315,"emoji":"🍽️","image":"categoryfix-33_paneer_fried_rice.jpg","quick":false},{"id":34,"name":"Kaju Fried Rice","category":"Fried Rice","price":332,"emoji":"🍽️","image":"categoryfix-34_kaju_fried_rice.jpg","quick":false},{"id":35,"name":"Prawns Fried Rice","category":"Fried Rice","price":365,"emoji":"🍽️","image":"categoryfix-35_prawns_fried_rice.jpg","quick":false},{"id":36,"name":"Veg Manchurian","category":"Manchurian Style","price":249,"emoji":"🍽️","image":"categoryfix-36_veg_manchurian.jpg","quick":false},{"id":37,"name":"Paneer Manchurian","category":"Manchurian Style","price":332,"emoji":"🍽️","image":"categoryfix-37_paneer_manchurian.jpg","quick":false},{"id":38,"name":"Egg Manchurian","category":"Manchurian Style","price":299,"emoji":"🍽️","image":"categoryfix-38_egg_manchurian.jpg","quick":false},{"id":39,"name":"Chicken Manchurian","category":"Manchurian Style","price":399,"emoji":"🍽️","image":"categoryfix-39_chicken_manchurian.jpg","quick":false},{"id":40,"name":"Chilli Chicken","category":"Manchurian Style","price":415,"emoji":"🍽️","image":"categoryfix-40_chilli_chicken.jpg","quick":false,"tag":"Bestseller"},{"id":41,"name":"Chicken 65","category":"Manchurian Style","price":415,"emoji":"🍽️","image":"categoryfix-41_chicken_65.jpg","quick":false},{"id":42,"name":"Loose Prawns","category":"Manchurian Style","price":432,"emoji":"🍽️","image":"categoryfix-42_loose_prawns.jpg","quick":false},{"id":43,"name":"Chilli Prawns","category":"Manchurian Style","price":449,"emoji":"🍽️","image":"categoryfix-43_chilli_prawns.jpg","quick":false},{"id":44,"name":"Prawns 65","category":"Manchurian Style","price":449,"emoji":"🍽️","image":"categoryfix-44_prawns_65.jpg","quick":false},{"id":45,"name":"Chicken Momos","category":"Fried Chicken","price":232,"emoji":"🍽️","image":"categoryfix-45_chicken_momos.jpg","quick":false},{"id":46,"name":"Chicken Spring Roll","category":"Fried Chicken","price":315,"emoji":"🍽️","image":"categoryfix-46_chicken_spring_roll.jpg","quick":false},{"id":47,"name":"Chicken Nuggets (6P)","category":"Fried Chicken","price":249,"emoji":"🍽️","image":"categoryfix-47_chicken_nuggets_6p.jpg","quick":false},{"id":48,"name":"Chicken Popcorn (Regular)","category":"Fried Chicken","price":265,"emoji":"🍽️","image":"categoryfix-48_chicken_popcorn_regular.jpg","quick":false},{"id":49,"name":"Chicken Popcorn (Large)","category":"Fried Chicken","price":299,"emoji":"🍽️","image":"categoryfix-49_chicken_popcorn_large.jpg","quick":false},{"id":50,"name":"Full Wings (4pc)","category":"Fried Chicken","price":665,"emoji":"🍽️","image":"categoryfix-50_full_wings_4pc.jpg","quick":false},{"id":51,"name":"Chicken Lollypop (6pc)","category":"Fried Chicken","price":499,"emoji":"🍽️","image":"categoryfix-51_chicken_lollypop_6pc.jpg","quick":false},{"id":52,"name":"Crispy Prawns","category":"Fried Chicken","price":499,"emoji":"🍽️","image":"categoryfix-52_crispy_prawns.jpg","quick":false},{"id":53,"name":"Belgian Chocolate Waffle","category":"Waffles","price":232,"emoji":"🍽️","image":"categoryfix-53_belgian_chocolate_waffle.jpg","quick":false},{"id":54,"name":"Belgian Chocolate Pop Waffle","category":"Pop Waffle","price":115,"emoji":"🍽️","image":"categoryfix-54_belgian_chocolate_pop_waffle.jpg","quick":false},{"id":55,"name":"Dark Chocolate Waffle","category":"Waffles","price":232,"emoji":"🍽️","image":"categoryfix-55_dark_chocolate_waffle.jpg","quick":false},{"id":56,"name":"Dark Chocolate Pop Waffle","category":"Pop Waffle","price":115,"emoji":"🍽️","image":"categoryfix-56_dark_chocolate_pop_waffle.jpg","quick":false},{"id":57,"name":"Overload Waffle","category":"Waffles","price":232,"emoji":"🍽️","image":"categoryfix-57_overload_waffle.jpg","quick":false},{"id":58,"name":"Overload Pop Waffle","category":"Pop Waffle","price":115,"emoji":"🍽️","image":"categoryfix-58_overload_pop_waffle.jpg","quick":false},{"id":59,"name":"Kitkat Whitty Waffle","category":"Waffles","price":232,"emoji":"🍽️","image":"categoryfix-59_kitkat_whitty_waffle.jpg","quick":false},{"id":60,"name":"Kitkat Whitty Pop Waffle","category":"Pop Waffle","price":115,"emoji":"🍽️","image":"categoryfix-60_kitkat_whitty_pop_waffle.jpg","quick":false},{"id":61,"name":"Oreo Crumble Waffle","category":"Waffles","price":232,"emoji":"🍽️","image":"categoryfix-61_oreo_crumble_waffle.jpg","quick":false},{"id":62,"name":"Oreo Crumble Pop Waffle","category":"Pop Waffle","price":115,"emoji":"🍽️","image":"categoryfix-62_oreo_crumble_pop_waffle.jpg","quick":false},{"id":63,"name":"Triple Chocolate Waffle","category":"Waffles","price":232,"emoji":"🍽️","image":"categoryfix-63_triple_chocolate_waffle.jpg","quick":false},{"id":64,"name":"Triple Chocolate Pop Waffle","category":"Pop Waffle","price":115,"emoji":"🍽️","image":"categoryfix-64_triple_chocolate_pop_waffle.jpg","quick":false},{"id":65,"name":"White Chocolate Waffle","category":"Waffles","price":232,"emoji":"🍽️","image":"categoryfix-65_white_chocolate_waffle.jpg","quick":false},{"id":66,"name":"White Chocolate Pop Waffle","category":"Pop Waffle","price":115,"emoji":"🍽️","image":"categoryfix-66_white_chocolate_pop_waffle.jpg","quick":false},{"id":67,"name":"Mint Mojito","category":"Mocktails","price":199,"emoji":"🍽️","image":"categoryfix-67_mint_mojito.jpg","quick":false},{"id":68,"name":"Blue Curaçao","category":"Mocktails","price":199,"emoji":"🍽️","image":"categoryfix-68_blue_cura_ao.jpg","quick":false},{"id":69,"name":"Strawberry Mocktail","category":"Mocktails","price":199,"emoji":"🍽️","image":"categoryfix-69_strawberry_mocktail.jpg","quick":false},{"id":70,"name":"Salt Soda","quick":false,"category":"Mocktails","price":149,"emoji":"🍽️","image":"categoryfix-70_salt_soda.jpg"},{"id":71,"name":"Vanilla Falooda","category":"Falooda","price":249,"emoji":"🍽️","image":"categoryfix-71_vanilla_falooda.jpg","quick":false},{"id":72,"name":"Strawberry Falooda","category":"Falooda","price":249,"emoji":"🍽️","image":"categoryfix-72_strawberry_falooda.jpg","quick":false},{"id":73,"name":"Butterscotch Falooda","category":"Falooda","price":282,"emoji":"🍽️","image":"categoryfix-73_butterscotch_falooda.jpg","quick":false},{"id":74,"name":"Chocolate Falooda","category":"Falooda","price":282,"emoji":"🍽️","image":"categoryfix-74_chocolate_falooda.jpg","quick":false},{"id":75,"name":"American Dry Fruit Falooda","category":"Falooda","price":299,"emoji":"🍽️","image":"categoryfix-75_american_dry_fruit_falooda.jpg","quick":false},{"id":76,"name":"Vanilla Scoop","quick":false,"category":"Plain Scoops","price":115,"emoji":"🍽️","image":"categoryfix-76_vanilla_scoop.jpg"},{"id":77,"name":"Strawberry Scoop","category":"Plain Scoops","price":115,"emoji":"🍽️","image":"categoryfix-77_strawberry_scoop.jpg","quick":false},{"id":78,"name":"Chocolate Scoop","category":"Plain Scoops","price":132,"emoji":"🍽️","image":"categoryfix-78_chocolate_scoop.jpg","quick":false},{"id":79,"name":"Butterscotch Scoop","category":"Plain Scoops","price":132,"emoji":"🍽️","image":"categoryfix-79_butterscotch_scoop.jpg","quick":false},{"id":80,"name":"Vanilla Milkshake","category":"Milk Shakes","price":232,"emoji":"🍽️","image":"correct-72_vanilla_milkshake.jpg","quick":false},{"id":81,"name":"Strawberry Milkshake","category":"Milk Shakes","price":232,"emoji":"🍽️","image":"correct-73_strawberry_milkshake.jpg","quick":false},{"id":82,"name":"Chocolate Milkshake","category":"Milk Shakes","price":249,"emoji":"🍽️","image":"correct-74_chocolate_milkshake.jpg","quick":false},{"id":83,"name":"Butterscotch Milkshake","category":"Milk Shakes","price":249,"emoji":"🍽️","image":"correct-75_butterscotch_milkshake.jpg","quick":false},{"id":84,"name":"Nuts Milkshake","category":"Milk Shakes","price":265,"emoji":"🍽️","image":"correct-76_nuts_milkshake.jpg","quick":false},{"id":85,"name":"Oreo Milkshake","category":"Milk Shakes","price":265,"emoji":"🍽️","image":"correct-77_oreo_milkshake.jpg","quick":false},{"id":86,"name":"KitKat Milkshake","category":"Milk Shakes","price":265,"emoji":"🍽️","image":"correct-78_kitkat_milkshake.jpg","quick":false},{"id":87,"name":"Vanilla Thickshake","category":"Thick Shakes","price":249,"emoji":"🍽️","image":"correct-79_vanilla_thickshake.jpg","quick":false},{"id":88,"name":"Strawberry Thickshake","category":"Thick Shakes","price":249,"emoji":"🍽️","image":"correct-80_strawberry_thickshake.jpg","quick":false},{"id":89,"name":"Chocolate Thickshake","category":"Thick Shakes","price":265,"emoji":"🍽️","image":"correct-81_chocolate_thickshake.jpg","quick":false,"tag":"Bestseller"},{"id":90,"name":"Butterscotch Thickshake","category":"Thick Shakes","price":265,"emoji":"🍽️","image":"correct-82_butterscotch_thickshake.jpg","quick":false},{"id":91,"name":"Nuts Thickshake","category":"Thick Shakes","price":282,"emoji":"🍽️","image":"correct-83_nuts_thickshake.jpg","quick":false},{"id":92,"name":"Oreo Thickshake","category":"Thick Shakes","price":282,"emoji":"🍽️","image":"correct-84_oreo_thickshake.jpg","quick":false},{"id":93,"name":"KitKat Thickshake","category":"Thick Shakes","price":282,"emoji":"🍽️","image":"correct-85_kitkat_thickshake.jpg","quick":false}];
function resolveProductImage(p){const image=p&&p.image;if(!image)return '../assets/fried-rice.jpg';if(/^(data:image\/|blob:|https?:\/\/|\/)/i.test(image))return image;return '../assets/'+image}

const store={orders:[],cart:[],loyaltyRedemptions:[],lastSavedBill:null,inventory:[{name:'Chicken',qty:12,unit:'kg'},{name:'Paneer',qty:5,unit:'kg'},{name:'Rice',qty:25,unit:'kg'},{name:'Cooking Oil',qty:8,unit:'L'}],purchases:[],expenses:[],wastage:[],customers:[],staff:[{name:'Staff Member',role:'Cashier',status:'Active'}],coupons:[{code:'WELCOME10',discount:10,status:'Active'}],settings:{restaurant:'Sri Tabemashou',cgst:2.5,sgst:2.5},discountRate:10,selectedTable:'T1',orderMode:'Dine In',nextOrder:4822};
function applyAppSettings(){
 const s=store.settings||{}, root=document.documentElement;
 root.style.setProperty('--orange',s.accentColor||'#ff6818');
 root.style.setProperty('--orange2',s.accentColor||'#ff7a22');
 root.style.setProperty('--menu-card-min',(Number(s.menuCardMinWidth)||170)+'px');
 root.style.setProperty('--menu-image-height',(Number(s.menuImageHeight)||130)+'px');
 document.body.style.fontSize=(Number(s.fontSize)||14)+'px';
 const status=document.querySelector('.sidebar-footer'); if(status)status.classList.toggle('hidden',s.showSystemStatus===false);
 // Apply user-editable navigation labels and page titles globally.
 const labels=s.labelNames||{};
 const navMap=[['index.html','New Bill'],['orders.html','Orders'],['reports.html','Reports'],['tables.html','Tables'],['menu.html','Menu'],['inventory.html','Inventory'],['purchases.html','Purchases'],['customers.html','Customers'],['staff.html','Staff'],['coupons.html','Coupons'],['settings.html','Settings']];
 document.querySelectorAll('.top-shortcuts a').forEach(a=>{const key=a.getAttribute('href')?.split('/').pop();const item=navMap.find(x=>x[0]===key);if(item){const icon=a.querySelector('span')?.outerHTML||'';a.innerHTML=icon+' '+escapeReceipt(labels[item[1]]||item[1]);}});
 document.querySelectorAll('.sidebar .nav-link').forEach(a=>{const key=a.getAttribute('href')?.split('/').pop();const item=navMap.find(x=>x[0]===key);if(item){const icon=a.querySelector('span')?.outerHTML||'';a.innerHTML=icon+' '+escapeReceipt(labels[item[1]]||item[1]);}});
 const page=(location.pathname.split('/').pop()||'index.html');
 const titleItem=navMap.find(x=>x[0]===page);
 if(titleItem){const h=document.querySelector('.page-header h1');if(h)h.textContent=labels[titleItem[1]]||titleItem[1];}
 renderConfiguredSections(page,s.customSections||[]);
}
function renderConfiguredSections(page,sections){
 const main=document.querySelector('.page-workspace');if(!main)return;
 main.querySelectorAll('.user-custom-section').forEach(el=>el.remove());
 (sections||[]).filter(x=>x.page===page).forEach(x=>{
  const section=document.createElement('section');section.className='data-card user-custom-section';
  const heading=document.createElement('h2');heading.textContent=x.title;section.appendChild(heading);
  if(x.type==='table'){
   const cols=String(x.content||'').split(',').map(v=>v.trim()).filter(Boolean);const rows=String(x.rows||'').split(/\r?\n/).map(r=>r.split(',').map(v=>v.trim())).filter(r=>r.some(Boolean));
   const table=document.createElement('table');table.className='data-table';const thead=document.createElement('thead'),tr=document.createElement('tr');cols.forEach(c=>{const th=document.createElement('th');th.textContent=c;tr.appendChild(th)});thead.appendChild(tr);table.appendChild(thead);const tbody=document.createElement('tbody');rows.forEach(row=>{const rr=document.createElement('tr');cols.forEach((_,i)=>{const td=document.createElement('td');td.textContent=row[i]||'';rr.appendChild(td)});tbody.appendChild(rr)});if(!rows.length){const rr=document.createElement('tr'),td=document.createElement('td');td.colSpan=Math.max(cols.length,1);td.textContent='No rows added yet.';rr.appendChild(td);tbody.appendChild(rr)}table.appendChild(tbody);section.appendChild(table);
  }else{const p=document.createElement('p');p.textContent=x.content||'';section.appendChild(p)}
  main.appendChild(section);
 });
}
function tableHTML(headers,rows){return `<div class="data-card"><table class="data-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.join(''):`<tr><td colspan="${headers.length}">No records yet.</td></tr>`}</tbody></table></div>`}
function escapeReceipt(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function escapeReceipt(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function buildReceipt(order){
 const s=store.settings||{};
 const restaurant=s.restaurant||'Sri Tabemashou';
 const address=s.address||'Restaurant address not configured';
 const phone=s.phone||'Phone number not configured';
 const email=s.email||'', gstin=s.gstin||'', fssai=s.fssai||'';
 const items=order.items||[];
 const qty=items.reduce((n,p)=>n+(Number(p.qty)||1),0);
 const subtotal=Number(order.subtotal??items.reduce((n,p)=>n+(Number(p.price)||0)*(Number(p.qty)||1),0));
 const discount=Number(order.discount)||0, cgst=Number(order.cgst)||0, sgst=Number(order.sgst)||0;
 const beforeRound=Math.max(0,subtotal-discount)+cgst+sgst;
 const total=Number(order.total)||beforeRound;
 const rounded=Math.round(total), roundOff=rounded-total;
 const date=order.date?new Date(order.date):new Date();
 const orderType=(order.mode||'Dine In')+(order.mode==='Dine In'&&order.table&&order.table!=='—'?' : '+order.table:'');
 const itemRows=items.map(p=>`<tr><td class="item-name">${escapeReceipt(p.name)}</td><td class="qty">${Number(p.qty)||1}</td><td class="price">${Number(p.price||0).toFixed(2)}</td><td class="amount">${((Number(p.price)||0)*(Number(p.qty)||1)).toFixed(2)}</td></tr>`).join('');
 return `<main class="thermal-receipt">
 <header class="shop-head">
  <h1>${escapeReceipt(restaurant)}</h1>
  <p>${escapeReceipt(address)}</p>
  ${phone?`<p>PH: ${escapeReceipt(phone)}</p>`:''}
  ${email?`<p>${escapeReceipt(email)}</p>`:''}
  ${gstin?`<p>GSTIN: ${escapeReceipt(gstin)}</p>`:''}
  ${fssai?`<p>FSSAI: ${escapeReceipt(fssai)}</p>`:''}
 </header>
 <div class="dash"></div>
 <div class="customer-line">Name: ${escapeReceipt(order.customerName||'')}</div>
 <div class="bill-meta"><span>Date: ${escapeReceipt(date.toLocaleDateString('en-GB'))}</span><b>${escapeReceipt(orderType)}</b></div>
 <div class="bill-meta"><span>${escapeReceipt(date.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}))}</span><span>Bill No.: ${escapeReceipt(order.id||'—')}</span></div>
 ${order.mobile?`<div class="bill-meta"><span>Mobile: ${escapeReceipt(order.mobile)}</span><span></span></div>`:''}
 <div class="dash"></div>
 <table class="thermal-items"><thead><tr><th>Item</th><th>Qty.</th><th>Price</th><th>Amount</th></tr></thead><tbody>${itemRows}</tbody></table>
 <div class="dash"></div>
 <div class="totals-line"><span>Total Qty: ${qty}</span><span>Sub Total</span><b>${subtotal.toFixed(2)}</b></div>
 ${discount?`<div class="totals-line"><span>Discount</span><span></span><b>-${discount.toFixed(2)}</b></div>`:''}
 <div class="totals-line"><span>CGST @${Number(s.cgst??2.5)}%</span><span></span><b>${cgst.toFixed(2)}</b></div>
 <div class="totals-line"><span>SGST @${Number(s.sgst??2.5)}%</span><span></span><b>${sgst.toFixed(2)}</b></div>
 <div class="totals-line"><span>Round off</span><span></span><b>${roundOff>=0?'+':''}${roundOff.toFixed(2)}</b></div>
 <div class="grand-total"><span>Grand Total</span><strong>₹${rounded.toFixed(2)}</strong></div>
 <div class="dash"></div>
 <footer class="thermal-footer"><strong>${escapeReceipt(s.footer||'Thank You...!!! Visit Again...!!!')}</strong><p>Computer generated bill</p></footer>
 </main>`;
}
function printContent(title,body){
 const w=window.open('','_blank','width=360,height=700');
 if(!w){toast('Allow pop-ups to print');return}
 w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeReceipt(title)}</title><style>
 @page{size:80mm auto;margin:3mm}
 *{box-sizing:border-box}html,body{margin:0;padding:0;background:#fff;color:#111;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.3}
 .thermal-receipt{width:100%;max-width:74mm;margin:0 auto;padding:0 1mm 2mm}
 .shop-head{text-align:center;padding:0 0 5px}.shop-head h1{font-size:16px;font-weight:800;line-height:1.2;margin:0 0 4px;text-transform:uppercase;letter-spacing:.2px}.shop-head p{font-size:10px;font-weight:600;margin:1px 0;overflow-wrap:anywhere}
 .dash{border-top:1px dashed #111;margin:5px 0}
 .customer-line{min-height:18px;padding:2px 0;overflow-wrap:anywhere}
 .bill-meta{display:flex;justify-content:space-between;gap:5px;margin:2px 0;font-size:10px}.bill-meta>*{max-width:60%;overflow-wrap:anywhere}
 .thermal-items{width:100%;border-collapse:collapse;table-layout:fixed;margin:4px 0}.thermal-items th{font-weight:700;text-align:right;border-bottom:1px dashed #111;padding:3px 1px;font-size:10px}.thermal-items th:first-child{text-align:left;width:43%}.thermal-items th:nth-child(2){width:12%}.thermal-items th:nth-child(3){width:20%}.thermal-items th:nth-child(4){width:25%}
 .thermal-items td{padding:4px 1px;text-align:right;vertical-align:top;font-size:10px;overflow-wrap:anywhere}.thermal-items td:first-child{text-align:left}.thermal-items td:not(:first-child){white-space:nowrap}
 .totals-line{display:grid;grid-template-columns:1fr auto auto;gap:8px;margin:3px 0;font-size:10px}.totals-line span:nth-child(2){text-align:right}.totals-line b{min-width:42px;text-align:right;font-weight:500}
 .grand-total{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #111;border-bottom:1px solid #111;padding:5px 0;margin-top:4px;font-weight:800;font-size:13px}.grand-total strong{font-size:15px}
 .thermal-footer{text-align:center;padding-top:6px;overflow-wrap:anywhere}.thermal-footer strong{font-size:11px}.thermal-footer p{font-size:9px;margin:5px 0 0}
 @media print{html,body{width:74mm}.thermal-receipt{max-width:none;width:100%}}
 </style></head><body>${body}<script>window.onload=()=>{window.focus();setTimeout(()=>window.print(),300)}<\/script></body></html>`);
 w.document.close();
}
function downloadFile(name,content,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();URL.revokeObjectURL(a.href)}
clockInit();
applyAppSettings();

// Persistent browser database (IndexedDB): survives refreshes and closing/reopening the app.
// No localStorage is used. Data is stored on this browser/device; use Firestore for multi-device sync.
const POS_DB_NAME = 'SriTabemashouPOS';
const POS_DB_VERSION = 1;
let posDb = null;
function openPosDB(){
  return new Promise((resolve,reject)=>{
    const request=indexedDB.open(POS_DB_NAME,POS_DB_VERSION);
    request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains('appState'))db.createObjectStore('appState')};
    request.onsuccess=()=>{posDb=request.result;resolve(posDb)};
    request.onerror=()=>reject(request.error);
  });
}
let lastPersistedSignature='';
const posSyncChannel=typeof BroadcastChannel!=='undefined'?new BroadcastChannel('SriTabemashouPOS-sync'):null;
function persistState(){
  if(!posDb)return;
  try{
    const snapshot={store,products};
    const signature=JSON.stringify(snapshot);
    // Avoid redundant writes and cross-tab notifications from the periodic safety save.
    if(signature===lastPersistedSignature)return;
    const tx=posDb.transaction('appState','readwrite');
    tx.objectStore('appState').put(snapshot,'main');
    tx.oncomplete=()=>{
      lastPersistedSignature=signature;
      window.dispatchEvent(new CustomEvent('pos-state-changed'));
      if(posSyncChannel)posSyncChannel.postMessage({type:'state-updated',signature});
    };
    tx.onerror=()=>console.error('Could not save POS state:',tx.error);
  }catch(err){console.error('Could not save POS state:',err)}
}
if(posSyncChannel){
  posSyncChannel.addEventListener('message',event=>{
    if(event.data?.type==='state-updated'&&event.data.signature!==lastPersistedSignature){
      restoreState();
    }
  });
}
async function restoreState(){
  try{
    const db=await openPosDB();
    const snapshot=await new Promise((resolve,reject)=>{
      const tx=db.transaction('appState','readonly');
      const req=tx.objectStore('appState').get('main');
      req.onsuccess=()=>resolve(req.result||null);
      req.onerror=()=>reject(req.error);
    });
    if(snapshot){
      lastPersistedSignature=JSON.stringify(snapshot);
      if(snapshot.store){
        Object.keys(snapshot.store).forEach(k=>{
          const v=snapshot.store[k];
          if(Array.isArray(store[k])&&Array.isArray(v)){store[k].splice(0,store[k].length,...v)}
          else if(v&&typeof v==='object'&&!Array.isArray(v)&&store[k]&&typeof store[k]==='object'){Object.assign(store[k],v)}
          else store[k]=v;
        });
      }
      if(Array.isArray(snapshot.products)){
        // Preserve the complete built-in restaurant menu when an older browser database
        // contains only a small/legacy set of products. Saved edits override matching
        // built-in items; saved custom items are retained as well.
        const builtIn = products.map(p=>({...p}));
        const saved = snapshot.products;
        const byName = new Map(saved.map(p=>[String(p.name||'').trim().toLowerCase(),p]));
        const merged = builtIn.map(base=>{
          const existing=byName.get(String(base.name||'').trim().toLowerCase());
          return existing ? {...base,...existing,id:base.id,image:existing.image||base.image} : base;
        });
        const builtNames = new Set(builtIn.map(p=>String(p.name||'').trim().toLowerCase()));
        const usedIds = new Set(merged.map(p=>Number(p.id)));
        let nextId = Math.max(0,...usedIds)+1;
        saved.forEach(item=>{
          const key=String(item.name||'').trim().toLowerCase();
          if(!builtNames.has(key)){
            const custom={...item};
            if(usedIds.has(Number(custom.id))){custom.id=nextId++;}
            usedIds.add(Number(custom.id));
            merged.push(custom);
          }
        });
        products.splice(0,products.length,...merged);
      }
    }
  }catch(err){console.error('Could not restore POS state:',err);toast('Could not load saved data. Check browser storage settings.')}
  applyAppSettings();
  window.dispatchEvent(new CustomEvent('pos-state-restored'));
}
restoreState();
// Save state after interactions and as a safety net for changes made by any page script.
document.addEventListener('click',()=>setTimeout(persistState,0));
document.addEventListener('submit',()=>setTimeout(persistState,0));
document.addEventListener('change',()=>setTimeout(persistState,0));
// Capture inline edits as well as button/form actions so changes from every module
// are committed promptly to the shared browser database. Unchanged snapshots are skipped.
document.addEventListener('input',()=>setTimeout(persistState,0));
window.addEventListener('pagehide',persistState);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')restoreState();else persistState()});
setInterval(persistState,1000);


// Shared header search: route each page's top search to that page's real data filter.
(function initPageSearch(){
  const targetByPage={
    'orders.html':'orderSearch','tables.html':'tableSearch','menu.html':'menuFilter',
    'inventory.html':'stockSearch','purchases.html':'purchaseSearch','reports.html':'reportSearch',
    'customers.html':'customerSearch','staff.html':'staffSearch','coupons.html':'couponSearch','settings.html':'settingsSearch'
  };
  function applyPageSearch(value){
    const q=String(value||'');
    const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    const targetId=targetByPage[file];
    if(targetId && targetId!=='settingsSearch'){
      const target=document.getElementById(targetId);
      if(target){if(target.value!==q)target.value=q;target.dispatchEvent(new Event('input',{bubbles:true}));return;}
    }
    if(file==='tables.html'){
      document.querySelectorAll('#tableGrid .table-tile').forEach(el=>el.hidden=!el.textContent.toLowerCase().includes(q.toLowerCase()));
      return;
    }
    if(file==='settings.html'){
      document.querySelectorAll('#pageContent .data-card').forEach(el=>el.hidden=!el.textContent.toLowerCase().includes(q.toLowerCase()));
      return;
    }
    // Fallback for any page section without a dedicated data filter.
    document.querySelectorAll('#pageContent .data-table tbody tr, #pageContent .table-management-grid > *, #pageContent .data-card').forEach(el=>{
      if(el.querySelector('input,select,button,form') && el.classList.contains('data-card')) return;
      el.hidden=!!q&&!el.textContent.toLowerCase().includes(q.toLowerCase());
    });
  }
  document.addEventListener('input',e=>{if(e.target && e.target.id==='pageSearch')applyPageSearch(e.target.value)});
  document.addEventListener('DOMContentLoaded',()=>{const search=document.getElementById('pageSearch');if(search)search.removeAttribute('disabled')});
})();

// Functional shared-header notification bell and staff menu.
(function initHeaderActions(){
  function closeHeaderPopovers(except){
    document.querySelectorAll('.header-popover').forEach(p=>{if(p!==except)p.remove()});
    document.querySelectorAll('[aria-expanded="true"]').forEach(b=>{if(!except||!except.contains(b))b.setAttribute('aria-expanded','false')});
  }
  function makePopover(anchor,kind,title,body){
    closeHeaderPopovers();
    const panel=document.createElement('section');panel.className='header-popover '+kind+'-popover';panel.setAttribute('role','dialog');panel.setAttribute('aria-label',title);
    panel.innerHTML=`<div class="header-popover-head"><strong>${title}</strong><button type="button" class="popover-close" aria-label="Close">×</button></div><div class="header-popover-body">${body}</div>`;
    const parent=anchor.closest('.top-right')||anchor.parentElement;parent.style.position='relative';parent.appendChild(panel);
    panel.querySelector('.popover-close').addEventListener('click',()=>{panel.remove();anchor.setAttribute('aria-expanded','false')});
    anchor.setAttribute('aria-expanded','true');
    return panel;
  }
  function escHeader(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function getNotifications(){
    const orders=Array.isArray(store.orders)?store.orders:[];
    const inventory=Array.isArray(store.inventory)?store.inventory:[];
    const staff=Array.isArray(store.staff)?store.staff:[];
    const alerts=[];
    const low=inventory.filter(x=>Number(x.qty||0)<=Number(x.reorder??3));
    if(low.length) alerts.push({icon:'⚠️',title:`${low.length} low-stock item${low.length===1?'':'s'}`,detail:low.slice(0,3).map(x=>`${escHeader(x.name)} (${escHeader(x.qty)} ${escHeader(x.unit||'')})`).join(', '),href:'inventory.html'});
    if(orders.length) alerts.push({icon:'🧾',title:`${orders.length} saved order${orders.length===1?'':'s'}`,detail:'Open the order register to review bills.',href:'orders.html'});
    if(!staff.length) alerts.push({icon:'👥',title:'No staff members added',detail:'Add your team in Staff Management.',href:'staff.html'});
    if(!alerts.length) alerts.push({icon:'✓',title:'You’re all caught up',detail:'No new alerts right now.',href:'reports.html'});
    return alerts;
  }
  function refreshBadge(){
    const low=(store.inventory||[]).filter(x=>Number(x.qty||0)<=Number(x.reorder??3)).length;
    const badge=document.querySelector('.bell .notification-count');if(!badge)return;
    const count=low;badge.textContent=count;badge.hidden=count===0;
    const bell=document.querySelector('.bell');if(bell)bell.setAttribute('aria-label',count?`${count} low-stock notifications`:'Notifications');
  }
  document.addEventListener('click',e=>{
    const bell=e.target.closest('.bell');
    if(bell){e.preventDefault();e.stopPropagation();const body=getNotifications().map(n=>`<a class="notification-item" href="${n.href}"><span>${n.icon}</span><div><strong>${n.title}</strong><small>${n.detail}</small></div><span class="notification-arrow">›</span></a>`).join('');makePopover(bell,'notifications','Notifications',body);return;}
    const staffTrigger=e.target.closest('.staff-trigger');
    if(staffTrigger){e.preventDefault();e.stopPropagation();const body=`<a class="staff-menu-link" href="staff.html">👥 <span><strong>Staff Management</strong><small>View and manage team members</small></span> ›</a><a class="staff-menu-link" href="settings.html">⚙ <span><strong>Settings</strong><small>Restaurant and application settings</small></span> ›</a>`;makePopover(staffTrigger,'staff','Staff Menu',body);return;}
    if(!e.target.closest('.header-popover'))closeHeaderPopovers();
  });
  window.addEventListener('pos-state-restored',refreshBadge);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refreshBadge);else refreshBadge();
})();
