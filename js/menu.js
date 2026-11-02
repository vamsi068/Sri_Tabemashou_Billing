// Menu management: add, edit, remove items and mark Quick Items.
let editingMenuId = null;
let activeMenuCategory = 'All';
let selectedMenuImageData = null;

function menuImage(p){
  return `<img class="menu-thumb" src="${resolveProductImage(p)}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.removeAttribute('src');this.style.display='none'">`;
}
function renderMenu(){
  const normalItems = products;
  const quickItems = products.filter(p=>p.quick);
  $('pageContent').innerHTML = `
    <div class="menu-toolbar">
      <div><h2>Menu Items</h2><p>Manage dish details, prices, categories and quick-sale shortcuts.</p></div>
      <button class="primary-btn" id="newMenuItem">＋ Add Menu Item</button>
    </div>
    <div class="menu-summary">
      <div class="menu-summary-card"><span>All Items</span><strong>${products.length}</strong></div>
      <div class="menu-summary-card"><span>Menu Items</span><strong>${normalItems.length}</strong></div>
      <div class="menu-summary-card"><span>Quick Items</span><strong>${quickItems.length}</strong></div>
    </div>
    <div class="data-card menu-editor-card">
      <div class="menu-section-heading"><div><h2>Menu Items</h2><p>Edit or remove dishes available in billing.</p></div><input id="menuFilter" class="menu-filter" placeholder="Search item name..."></div>
      <div class="menu-category-strip" id="menuCategoryStrip" aria-label="Filter menu by category"></div>
      <div class="menu-filter-status" id="menuFilterStatus"></div>
      <div class="menu-item-grid" id="menuItemGrid"></div>
    </div>
    <div class="data-card menu-editor-card">
      <div class="menu-section-heading"><div><h2>Quick Items</h2><p>Items displayed in the Quick Items strip on the billing screen.</p></div><span class="quick-count">${quickItems.length} shortcuts</span></div>
      <div class="quick-manage-grid" id="quickManageGrid"></div>
    </div>
    <div id="menuModal" class="menu-modal-backdrop" hidden>
      <form id="menuForm" class="menu-modal">
        <div class="menu-modal-heading"><div><p class="eyebrow">MENU CONFIGURATION</p><h2 id="menuFormTitle">Add menu item</h2></div><button type="button" class="icon-close" id="closeMenuModal" aria-label="Close">×</button></div>
        <div class="menu-form-grid">
          <label>Item name<input name="name" id="menuName" placeholder="e.g. Chicken Biryani" required maxlength="70"></label>
          <label>Category<select name="category" id="menuCategory">${categories.filter(c=>c.name!=='All').map(c=>`<option value="${c.name}">${c.name}</option>`).join('')}</select></label>
          <label>Price (₹)<input name="price" id="menuPrice" type="number" min="0" step=".01" placeholder="0.00" required></label>
          <label>Emoji / icon<input name="emoji" id="menuEmoji" placeholder="🍽️" maxlength="8" value="🍽️"></label>
          <label class="menu-image-upload-label">Food image<input type="file" id="menuImageFile" name="imageFile" accept="image/*"><small>Choose a photo from your computer. The preview updates before saving.</small></label>
          <div class="menu-image-preview-wrap"><img id="menuImagePreview" class="menu-image-preview" alt="Menu item image preview"><span id="menuImagePreviewEmpty">No image selected</span></div>
          <label class="menu-check-label"><input type="checkbox" id="menuQuick" name="quick"> Show in Quick Items</label>
          <label class="menu-check-label"><input type="checkbox" id="menuFeatured" name="featured"> Mark as Bestseller</label>
        </div>
        <div class="menu-modal-actions"><button type="button" class="secondary-btn" id="cancelMenuModal">Cancel</button><button type="submit" class="primary-btn" id="saveMenuItem">Save Item</button></div>
      </form>
    </div>`;
  renderMenuCards();
}
function renderMenuCategoryStrip(){
  const strip=$('menuCategoryStrip');
  if(!strip)return;
  strip.innerHTML=categories.map(c=>{
    const sample=products.find(p=>p.category===c.name && p.image);
    const visual=c.name==='All' ? '<span class="menu-category-all-icon">▦</span>' : (sample ? `<img src="${resolveProductImage(sample)}" alt="" loading="lazy" onerror="this.style.display='none'">` : '<span class="menu-category-all-icon">🍽️</span>');
    const count=c.name==='All'?products.length:products.filter(p=>p.category===c.name).length;
    return `<button type="button" class="menu-category-chip ${activeMenuCategory===c.name?'active':''}" data-menu-cat="${c.name}">${visual}<span class="menu-category-name">${c.name}</span><small>${count}</small></button>`;
  }).join('');
}
function renderMenuCards(){
  const q=($('menuFilter')?.value||'').trim().toLowerCase();
  const filtered=products.filter(p=>(activeMenuCategory==='All'||p.category===activeMenuCategory)&&p.name.toLowerCase().includes(q));
  renderMenuCategoryStrip();
  const status=$('menuFilterStatus');
  if(status)status.textContent=`Showing ${filtered.length} of ${products.length} items${activeMenuCategory!=='All'?' · '+activeMenuCategory:''}`;
  $('menuItemGrid').innerHTML=filtered.map(p=>`
    <article class="menu-manage-card">
      <div class="menu-manage-image">${menuImage(p)}${p.tag?`<span class="menu-tag">${p.tag}</span>`:''}</div>
      <div class="menu-manage-info"><span class="menu-category-pill">${p.category}</span><h3>${p.name}</h3><strong class="menu-price">${money(p.price)}</strong></div>
      <div class="menu-card-actions"><button class="secondary-btn" data-edit-menu="${p.id}">✎ Edit</button><button class="secondary-btn" data-toggle-quick="${p.id}">＋ Quick Item</button><button class="danger-btn" data-delete-menu="${p.id}" aria-label="Delete ${p.name}">Delete</button></div>
    </article>`).join('') || `<div class="menu-empty">No menu items match your search.</div>`;
  const quick=products.filter(p=>p.quick);
  $('quickManageGrid').innerHTML=quick.map(p=>`
    <article class="quick-manage-card">
      <div class="quick-manage-image">${menuImage(p)}</div><div class="quick-manage-details"><h3>${p.name}</h3><span>${money(p.price)} · ${p.category}</span></div>
      <div class="quick-manage-actions"><button class="secondary-btn" data-edit-menu="${p.id}">✎ Edit</button><button class="danger-btn" data-toggle-quick="${p.id}">Remove shortcut</button></div>
    </article>`).join('') || `<div class="menu-empty">No Quick Items yet. Edit any menu item and enable “Show in Quick Items”.</div>`;
}
function openMenuModal(id=null){
  editingMenuId=id;
  const p=id===null?null:products.find(x=>x.id===+id);
  $('menuForm').reset();
  $('menuFormTitle').textContent=p?'Edit menu item':'Add menu item';
  $('saveMenuItem').textContent=p?'Save Changes':'Add Item';
  $('menuName').value=p?.name||'';
  $('menuCategory').value=p?.category||'Starters';
  $('menuPrice').value=p?.price??'';
  $('menuEmoji').value=p?.emoji||'🍽️';
  $('menuImageFile').value='';
  selectedMenuImageData=null;
  setMenuImagePreview(p?.image ? resolveProductImage(p) : '');
  $('menuQuick').checked=!!p?.quick;
  $('menuFeatured').checked=p?.tag==='Bestseller';
  $('menuModal').hidden=false;
  $('menuName').focus();
}
function closeMenuModal(){$('menuModal').hidden=true;editingMenuId=null}
function setMenuImagePreview(src){const img=$('menuImagePreview'),empty=$('menuImagePreviewEmpty');if(!img||!empty)return;img.src=src||'';img.hidden=!src;empty.hidden=!!src}
async function imageFileToDataUrl(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=()=>reject(new Error('Could not read selected image'));reader.onload=()=>{const source=new Image();source.onerror=()=>resolve(reader.result);source.onload=()=>{const max=1200,scale=Math.min(1,max/Math.max(source.width,source.height)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(source.width*scale));canvas.height=Math.max(1,Math.round(source.height*scale));const ctx=canvas.getContext('2d');ctx.drawImage(source,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL('image/jpeg',0.86))};source.src=reader.result};reader.readAsDataURL(file)})}
$('pageContent').addEventListener('change',async e=>{if(e.target.id!=='menuImageFile')return;const file=e.target.files?.[0];if(!file)return;if(!file.type.startsWith('image/')){toast('Please choose an image file');e.target.value='';return}try{const data=await imageFileToDataUrl(file);selectedMenuImageData=data;setMenuImagePreview(data)}catch(err){toast('Could not load that image')}})
$('pageContent').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.menuCat){activeMenuCategory=b.dataset.menuCat;renderMenuCards();return;}
  if(b.id==='newMenuItem')openMenuModal();
  if(b.id==='closeMenuModal'||b.id==='cancelMenuModal')closeMenuModal();
  if(b.dataset.editMenu)openMenuModal(+b.dataset.editMenu);
  if(b.dataset.deleteMenu){
    const p=products.find(x=>x.id===+b.dataset.deleteMenu);if(!p)return;
    if(confirm(`Delete "${p.name}" from the menu?`)){const i=products.findIndex(x=>x.id===p.id);if(i>=0)products.splice(i,1);renderMenu();toast('Menu item deleted')}
  }
  if(b.dataset.toggleQuick){
    const p=products.find(x=>x.id===+b.dataset.toggleQuick);if(!p)return;
    p.quick=!p.quick;renderMenu();toast(p.quick?'Added to Quick Items':'Removed from Quick Items');
  }
});
$('pageContent').addEventListener('input',e=>{if(e.target.id==='menuFilter'){activeMenuCategory='All';renderMenuCards();const strip=$('menuCategoryStrip');if(strip)strip.querySelectorAll('[data-menu-cat]').forEach(b=>b.classList.toggle('active',b.dataset.menuCat==='All'))}});
$('pageContent').addEventListener('submit',e=>{
  if(e.target.id!=='menuForm')return;e.preventDefault();
  const name=$('menuName').value.trim(),category=$('menuCategory').value,price=Number($('menuPrice').value),emoji=$('menuEmoji').value.trim()||'🍽️',quick=$('menuQuick').checked,featured=$('menuFeatured').checked;
  const image=selectedMenuImageData;
  if(!name||!Number.isFinite(price)||price<0)return toast('Enter a valid item name and price');
  const duplicate=products.find(p=>p.name.toLowerCase()===name.toLowerCase()&&p.id!==editingMenuId);
  if(duplicate)return toast('An item with this name already exists');
  if(editingMenuId!==null){
    const p=products.find(x=>x.id===editingMenuId);
    if(p){p.name=name;p.category=category;p.price=price;p.emoji=emoji;p.quick=quick;if(image)p.image=image;p.tag=featured?'Bestseller':(p.tag==='Bestseller'?undefined:p.tag)}
  }else{
    const categoryDefault=products.find(x=>x.category===category&&x.image)?.image||products[0]?.image;
    products.push({id:Math.max(0,...products.map(p=>p.id))+1,name,category,price,emoji,quick,tag:featured?'Bestseller':undefined,image:image||categoryDefault});
  }
  const wasEditing=editingMenuId!==null;closeMenuModal();persistState();renderMenu();toast(wasEditing?'Menu item updated':'Menu item added');
});
$('pageContent').addEventListener('click',e=>{if(e.target.id==='menuModal')closeMenuModal()});
renderMenu(); 


window.addEventListener('pos-state-restored',()=>renderMenu());
