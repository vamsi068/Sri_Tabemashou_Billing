let activeCategory='All';
function loyaltyEscape(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function photo(p,cls='product-photo'){return `<img class="${cls}" src="${resolveProductImage(p)}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.removeAttribute('src');this.style.display='none'">`}
function renderCategories(){const files={'Burger':'menu-01_veg_burger.jpg','Sandwich':'menu-04_veg_sandwich.jpg','Pizza':'menu-07_veg_pizza.jpg','Shawarma':'menu-12_chicken_shawarma.jpg','Veg Fried Snacks':'menu-14_veg_spring_rolls.jpg','Indo-Chinese Noodles':'menu-21_veg_noodles.jpg','Fried Rice':'menu-27_veg_fried_rice.jpg','Manchurian Style':'menu-36_veg_manchurian.jpg','Fried Chicken':'menu-45_chicken_momos.jpg','Waffles':'menu-52_belgian_chocolate_waffle.jpg','Pop Waffle':'menu-52_belgian_chocolate_waffle.jpg','Mocktails':'menu-59_mint_mojito.jpg','Falooda':'menu-63_vanilla_falooda.jpg','Plain Scoops':'menu-68_vanilla_scoop.jpg','Milk Shakes':'menu-72_vanilla_milkshake.jpg','Thick Shakes':'menu-79_vanilla_thickshake.jpg'};$('categoryStrip').innerHTML=categories.map(c=>`<button class="category ${activeCategory===c.name?'active':''}" data-cat="${c.name}">${files[c.name]?`<img class="cat-photo" src="../assets/${files[c.name]}" alt="">`:'<span class="cat-emoji">▦</span>'}<span>${c.name}</span></button>`).join('')}
function renderProducts(){const q=$('searchInput').value.trim().toLowerCase();const list=products.filter(p=>(!q ? (activeCategory==='All'||p.category===activeCategory) : true)&&p.name.toLowerCase().includes(q));$('productGrid').innerHTML=list.map(p=>`<article class="product-card">${p.tag?`<span class="ribbon">${p.tag}</span>`:''}${photo(p)}<div class="product-info"><h3>${p.name}</h3><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}">+</button></div></article>`).join('')}
function renderQuick(){$('quickItems').innerHTML=products.filter(p=>p.quick).map(p=>`<div class="quick-item">${photo(p,'quick-photo')}<strong>${p.name}</strong><small>${money(p.price)}</small><button data-add="${p.id}">+</button></div>`).join('')}
function renderTables(){$('tableButtons').innerHTML=['T1','T2','T3','T4','T5'].map(t=>`<button class="table-btn ${store.selectedTable===t?'active':''}" data-table="${t}">${t}</button>`).join('');$('tableLabel').textContent=store.orderMode==='Dine In'?'Table':'Order'}
function renderCart(){const cart=store.cart;$('cartItems').innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row ${p.loyaltyFree?'loyalty-free-row':''}"><div class="cart-product">${photo(p,'cart-food-photo')}<span>${p.name}${p.loyaltyFree?' <b class=\"free-tag\">FREE REWARD</b>':''}</span></div><div class="qty-control">${p.loyaltyFree?'<span>1</span>':`<button data-qty="${p.cartKey||p.id}" data-delta="-1">−</button><span>${p.qty}</span><button data-qty="${p.cartKey||p.id}" data-delta="1">+</button>`}</div><span class="cart-price">${p.loyaltyFree?'<s>'+money(p.originalPrice||0)+'</s>':money(p.price)}</span><span class="cart-total">${p.loyaltyFree?'<b>FREE</b>':money(p.price*p.qty)}</span><button class="remove-btn" data-remove="${p.cartKey||p.id}" ${p.loyaltyFree?'title=\"Free reward is automatically applied\"':''}>${p.loyaltyFree?'🎁':'♜'}</button></div>`).join(''):'<div class="empty-cart">Your cart is empty. Add dishes to start a bill.</div>';const sub=cart.reduce((s,p)=>s+p.price*p.qty,0),disc=sub*store.discountRate/100,tax=sub-disc,cgst=tax*store.settings.cgst/100,sgst=tax*store.settings.sgst/100;$('subtotal').textContent=money(sub);$('discountAmount').textContent='-'+money(disc);$('cgst').textContent=money(cgst);$('sgst').textContent=money(sgst);$('grandTotal').textContent=money(tax+cgst+sgst);$('discountBtn').textContent=store.discountRate+'%'}
function normalizeCustomerMobile(raw){const digits=String(raw||'').replace(/\D/g,'');return digits.length===12&&digits.startsWith('91')?digits.slice(2):digits}
function customerOrders(mobile){const key=normalizeCustomerMobile(mobile);return key?store.orders.filter(o=>normalizeCustomerMobile(o.mobile)===key):[]}
function favoriteCustomerItem(mobile){const counts=new Map();customerOrders(mobile).forEach(o=>(o.items||[]).filter(i=>!i.loyaltyFree).forEach(i=>{const key=String(i.name||'').trim().toLowerCase();if(!key)return;const row=counts.get(key)||{name:i.name,qty:0,id:Number(i.id)};row.qty+=Number(i.qty)||1;counts.set(key,row)}));return [...counts.values()].sort((a,b)=>b.qty-a.qty)[0]||null}
function loyaltyRewardState(mobile){
 const key=normalizeCustomerMobile(mobile), count=customerOrders(key).length;
 const every=Math.max(1,Number(store.settings?.loyaltyOrderThreshold)||10);
 const redemptions=Array.isArray(store.loyaltyRedemptions)?store.loyaltyRedemptions:[];
 const earned=Math.floor(count/every);
 let milestone=0;
 for(let n=1;n<=earned;n++){
  if(!redemptions.some(r=>normalizeCustomerMobile(r.mobile)===key&&Number(r.milestone)===n)){milestone=n;break}
 }
 const favorite=favoriteCustomerItem(key);
 const product=favorite&&(products.find(p=>p.id===favorite.id)||products.find(p=>p.name.toLowerCase()===favorite.name.toLowerCase()));
 return {key,count,every,milestone,favorite,product,remaining:every-(count%every)};
}
function updateLoyaltyReward(){
 const input=$('customerMobile');if(!input)return;const mobile=normalizeCustomerMobile(input.value);const notice=$('loyaltyNotice');
 // A reward is only added after the cashier explicitly redeems it.
 store.cart=store.cart.filter(p=>!p.loyaltyFree);
 if(!/^\d{10}$/.test(mobile)){if(notice){notice.hidden=true;notice.classList.remove('loyalty-ready');notice.innerHTML=''}renderCart();return}
 const state=loyaltyRewardState(mobile);
 if(notice){
  notice.hidden=false;
  if(state.milestone&&state.product){
   notice.classList.add('loyalty-ready');
   notice.innerHTML=`<span class="loyalty-reward-name">🎁 Free gift: <b>${loyaltyEscape(state.product.name)}</b></span><button type="button" class="loyalty-redeem-btn" id="redeemLoyalty" data-redeem-mobile="${loyaltyEscape(state.key)}" data-redeem-milestone="${state.milestone}">Redeem</button>`;
  }else if(state.milestone&&!state.product){
   notice.classList.remove('loyalty-ready');notice.textContent=`🎉 Reward available after ${state.count} completed orders, but no favourite menu item could be matched. Check the menu item records.`;
  }else{
   notice.classList.remove('loyalty-ready');
   notice.textContent=`Loyalty: ${state.count} completed order${state.count===1?'':'s'} · ${state.remaining} order${state.remaining===1?'':'s'} until the next free item.`;
  }
 }
 const existing=store.customers.find(c=>normalizeCustomerMobile(c.mobile)===mobile);if(existing&&$('customerName')&&!$('customerName').value)$('customerName').value=existing.name||'';
 renderCart();
}
function redeemLoyaltyReward(button){
 const mobile=normalizeCustomerMobile(button.dataset.redeemMobile||$('customerMobile').value);
 if(!/^\d{10}$/.test(mobile)||mobile!==normalizeCustomerMobile($('customerMobile').value))return toast('Enter the eligible customer mobile number first');
 const state=loyaltyRewardState(mobile);
 if(!state.milestone||!state.product)return toast('No unredeemed loyalty reward is available');
 if(store.cart.some(p=>p.loyaltyFree))return toast('A free reward is already in this cart');
 store.cart.push({...state.product,cartKey:`loyalty-${mobile}-${state.milestone}-${state.product.id}`,qty:1,price:0,originalPrice:state.product.price,loyaltyFree:true,loyaltyMobile:mobile,loyaltyMilestone:state.milestone});
 persistState();renderCart();toast(`${state.product.name} added to cart as a free reward`);
}

function add(id){const p=products.find(x=>x.id===+id);if(!p)return;const f=store.cart.find(x=>x.id===p.id&&!x.loyaltyFree);f?f.qty++:store.cart.push({...p,qty:1});renderCart()}
function recent(){$('recentOrders').innerHTML=store.orders.slice(-3).reverse().map(o=>`<div class="recent-row"><b>#${o.id}</b><span class="time">${o.time}</span><strong>${money(o.total)}</strong><span class="paid">PAID</span></div>`).join('')||'<div class="empty-cart">Saved orders will appear here.</div>'}
function normalizeWhatsAppNumber(raw){let n=String(raw||'').replace(/\D/g,'');if(n.length===10)return '91'+n;if(n.length===12&&n.startsWith('91'))return n;return n}
function sendSavedBillWhatsApp(){
 const o=store.lastSavedBill;
 if(!o)return toast('Save the bill first, then send it on WhatsApp');
 const raw=o.mobile||$('customerMobile').value;
 if(!raw||!String(raw).trim())return toast('Enter the customer mobile number before saving the bill');
 const phone=normalizeWhatsAppNumber(raw);
 if(!(phone.length===12&&phone.startsWith('91')))return toast('Enter a valid 10-digit Indian customer mobile number');
 const date=new Date(o.date).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'});
 const lines=(o.items||[]).map((p,i)=>`${i+1}. ${p.name} × ${p.qty} — ₹${(Number(p.price||0)*Number(p.qty||1)).toFixed(2)}`);
 const msg=[
  `*${store.settings?.restaurant||'Sri Tabemashou'} — BILL RECEIPT*`,
  `Bill No: ${o.id}`,
  `Date: ${date}`,
  `Customer: ${o.customerName||'Walk-in Customer'}`,
  `Order type: ${o.mode||'Dine In'}${o.table&&o.table!=='—'?' ('+o.table+')':''}`,
  '', '*Items*', ...lines, '',
  `Subtotal: ₹${Number(o.subtotal||0).toFixed(2)}`,
  `Discount: -₹${Number(o.discount||0).toFixed(2)}`,
  `CGST: ₹${Number(o.cgst||0).toFixed(2)}`,
  `SGST: ₹${Number(o.sgst||0).toFixed(2)}`,
  `*TOTAL: ₹${Number(o.total||0).toFixed(2)}*`,
  '', 'Thank you for visiting Sri Tabemashou! 🙏',
  'Restaurant WhatsApp: +91 88859 99948'
 ].join('\n');
 const url=`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
 const win=window.open(url,'_blank','noopener,noreferrer');
 if(!win)toast('Allow pop-ups to open WhatsApp');
 else toast('WhatsApp opened. Review the bill and tap Send.');
}
function saveBill(){if(!store.cart.length)return toast('Add items first');const sub=store.cart.reduce((s,p)=>s+p.price*p.qty,0),disc=sub*store.discountRate/100,tax=sub-disc,cgst=tax*store.settings.cgst/100,sgst=tax*store.settings.sgst/100,now=new Date(),o={id:'ORD-'+store.nextOrder++,date:now.toISOString(),time:now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}),mode:store.orderMode,table:store.orderMode==='Dine In'?store.selectedTable:'—',customerName:$('customerName').value||'Walk-in Customer',mobile:$('customerMobile').value,items:store.cart.map(p=>({...p})),subtotal:sub,discount:disc,cgst,sgst,total:tax+cgst+sgst,status:'Paid',loyaltyReward:(store.cart.find(p=>p.loyaltyFree)?{mobile:normalizeCustomerMobile(store.cart.find(p=>p.loyaltyFree).loyaltyMobile||$('customerMobile').value),milestone:Number(store.cart.find(p=>p.loyaltyFree).loyaltyMilestone)||0,item:store.cart.find(p=>p.loyaltyFree).name}:null)};store.orders.push(o);if(o.loyaltyReward?.mobile&&o.loyaltyReward.milestone){store.loyaltyRedemptions=Array.isArray(store.loyaltyRedemptions)?store.loyaltyRedemptions:[];if(!store.loyaltyRedemptions.some(r=>normalizeCustomerMobile(r.mobile)===o.loyaltyReward.mobile&&Number(r.milestone)===o.loyaltyReward.milestone))store.loyaltyRedemptions.push({mobile:o.loyaltyReward.mobile,milestone:o.loyaltyReward.milestone,orderId:o.id,date:o.date,item:o.loyaltyReward.item});}persistState();store.lastSavedBill=o;if(o.mobile){const mobileKey=normalizeCustomerMobile(o.mobile);let c=store.customers.find(x=>normalizeCustomerMobile(x.mobile)===mobileKey);if(!c){c={name:o.customerName,mobile:mobileKey,orders:0,spent:0};store.customers.push(c)}c.name=o.customerName||c.name;c.mobile=mobileKey;c.orders=customerOrders(mobileKey).length;c.spent=(c.spent||0)+o.total}const rows=o.items.map(p=>`<tr><td>${p.name} × ${p.qty}</td><td class="r">${money(p.price*p.qty)}</td></tr>`).join('');store.cart=[];$('customerName').value='';$('customerMobile').value='';store.discountRate=0;renderCart();recent();printContent('Tax Invoice - '+o.id,buildReceipt(o));toast('Bill saved — cart and customer details cleared')}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.cat){activeCategory=b.dataset.cat;renderCategories();renderProducts()}if(b.dataset.add)add(b.dataset.add);if(b.dataset.qty){const p=store.cart.find(x=>String(x.cartKey||x.id)===String(b.dataset.qty));if(p&&!p.loyaltyFree){p.qty+=+b.dataset.delta;if(p.qty<=0)store.cart=store.cart.filter(x=>String(x.cartKey||x.id)!==String(b.dataset.qty));renderCart()}}if(b.dataset.remove){const p=store.cart.find(x=>String(x.cartKey||x.id)===String(b.dataset.remove));if(p?.loyaltyFree)return toast('The free reward is automatically managed');store.cart=store.cart.filter(x=>String(x.cartKey||x.id)!==String(b.dataset.remove));renderCart()}if(b.dataset.table){store.selectedTable=b.dataset.table;renderTables()}if(b.id==='nextTable'){store.selectedTable='T'+(Number(store.selectedTable.slice(1))%5+1);renderTables()}if(b.id==='clearCart'){store.cart=[];renderCart()}if(b.id==='discountBtn'){const n=prompt('Discount % (0–100)',store.discountRate);if(n!==null&&+n>=0&&+n<=100){store.discountRate=+n;renderCart()}}if(b.id==='redeemLoyalty')redeemLoyaltyReward(b);if(b.id==='saveBill')saveBill();if(b.id==='whatsAppBill')sendSavedBillWhatsApp();if(b.id==='printKot'){if(!store.cart.length)return toast('Add items first');printContent('KOT',`<h2>Sri Tabemashou — KOT</h2><p>${store.orderMode} ${store.selectedTable}</p><table>${store.cart.map(p=>`<tr><td>${p.name}</td><td>${p.qty}</td></tr>`).join('')}</table>`)}if(b.id==='addCustomer'){if(!$('customerMobile').value)return toast('Enter mobile number');updateLoyaltyReward();toast('Customer recognised by mobile number')}});
$('searchInput').addEventListener('input',()=>{if($('searchInput').value.trim()){activeCategory='All';renderCategories()}renderProducts()});$('orderModes').addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(!b)return;store.orderMode=b.dataset.mode;document.querySelectorAll('.mode').forEach(x=>x.classList.toggle('active',x.dataset.mode===store.orderMode));renderTables()});
$('customerMobile').addEventListener('input',updateLoyaltyReward);
renderCategories();renderProducts();renderQuick();renderTables();renderCart();recent();

window.addEventListener('pos-state-restored',()=>{renderCategories();renderProducts();renderQuick();renderTables();renderCart();recent();updateLoyaltyReward()});
