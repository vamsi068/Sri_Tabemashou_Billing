# Sri Tabemashou Multi-Page Restaurant POS

## Structure
- `index.html` + `billing.js` — billing screen
- `orders.html` + `orders.js` — orders
- `tables.html` + `tables.js` — table management
- `menu.html` + `menu.js` — menu management
- `inventory.html` + `inventory.js` — inventory
- `purchases.html` + `purchases.js` — purchases
- `reports.html` + `reports.js` — reports
- `customers.html` + `customers.js` — customers
- `staff.html` + `staff.js` — staff
- `coupons.html` + `coupons.js` — coupons
- `settings.html` + `settings.js` — settings
- `common.js` — shared demo data and helpers
- `style.css` — one shared stylesheet for every page
- `assets/` — logo and cropped images from your reference screenshot

## Run
Extract the ZIP, open the folder in VS Code, and run `index.html` using Live Server.

## Important data note
Each page has its own HTML and JavaScript file, as requested, while all pages use the same `style.css`. This front-end demo shares data only within the current page session: navigating to another HTML page or refreshing can reset in-memory demo data. For real restaurant use, connect all page scripts to Firebase Firestore and Firebase Authentication; do not rely on in-memory data for production records.


## Persistence update
The app now saves the cart, menu, Quick Items, orders, inventory, purchases, customers, staff, coupons, and settings in IndexedDB. Changes should remain after refresh or closing and reopening the app in the same browser profile. This does not sync across different devices/browsers; use Firebase Firestore for that. No localStorage is used for POS data.


## UI and management improvements
- Standardized New Bill / Orders / Reports header tabs to match the segmented Dine In / Takeaway / Delivery style.
- Added inventory edit/delete, low-stock thresholds, search and CSV export.
- Added staff role/status/contact editing, search and export.
- Added coupon minimum spend, expiry, activate/deactivate, delete and export.
- Added customer loyalty overview, search and export.
- Added table status, seat count display, add/remove table, and select-for-billing.
- Added date-filtered order list and sales reports with CSV export.
- Added restaurant contact/address, tax and default discount settings, navigation shortcuts, and JSON backup.


## Professional receipt / tax invoice
Bills print with restaurant name, address, phone, email, optional GSTIN/FSSAI number, bill ID, date/time, order mode/table, customer details, item quantities and prices, subtotal, discount, CGST, SGST and grand total. Configure restaurant details from Settings before printing. Receipt layout is styled for 80mm thermal printers and standard print dialogs.


## 3-inch thermal receipt
The bill receipt uses a compact 80 mm (3-inch) thermal-printer layout modeled on the uploaded sample: centered restaurant details, customer name, date/time, order type/table, bill number, item/quantity/price/amount columns, total quantity, subtotal, discount when applicable, CGST, SGST, round-off, grand total, and thank-you footer. Configure the real restaurant address and contact details in Settings before printing.


## Sri Tabemashou menu update
The billing and menu-management screens now include the items and prices transcribed from the supplied restaurant menu poster. Waffle flavours are listed as both regular Waffle (₹232) and Pop Waffle (₹115), matching the two price columns in the poster. Menu cards use the included local food photos as category-appropriate image fallbacks; these are local assets and do not require internet access.


## Complete menu visibility fix
- Menu Management now shows every menu item in the main grid, including items also marked as Quick Items.
- The All Items count reflects the complete menu.
- Existing IndexedDB data from an older version is merged with the full built-in 93-item menu, rather than replacing it with a smaller saved list. Saved edits and custom items are retained.


Menu image update: all 93 menu entries now point to the matching supplied item photographs in `assets/`. Waffle and Pop Waffle variants share the corresponding supplied waffle photograph; Regular/Large Chicken Popcorn share the supplied combined photo.


## Publish on GitHub Pages (404 fix)
1. Upload/commit **all contents inside `Sri_Tabemashou_Billing`** to the repository root (so the root `index.html`, `html/`, `css/`, `js/`, and `assets/` are visible at the top level). Do not leave the whole project nested one extra folder deep in the repository.
2. In GitHub, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select your publishing branch (usually `main`) and folder **`/(root)`**, then Save.
3. Wait for the Pages deployment to finish, then open the URL shown in **Settings → Pages**. The root `index.html` forwards to `html/index.html`.
4. If you instead publish the repository's `/html` folder, the app's `../css`, `../js`, and `../assets` paths will not resolve correctly; publish the repository root.

The root redirect is included so the repository's published homepage has an `index.html` and does not return a 404 when GitHub Pages is configured to publish the repository root. This is a static front-end app; IndexedDB data remains local to each browser and does not sync between visitors.
