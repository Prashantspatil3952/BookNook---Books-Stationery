
const products = [
 {id:1,title:"The Silent Garden",author:"Maya Collins",category:"Fiction",price:399,rating:4.8,reviews:124,color:"#52664d",desc:"A quiet story about family, memory and the small places that become home.",pages:312,year:2024,isbn:"978-100001"},
 {id:2,title:"Atomic Habits",author:"James Clear",category:"Self Help",price:499,rating:4.9,reviews:386,color:"#8b5e3c",desc:"A practical guide to building better habits through small, consistent changes.",pages:320,year:2018,isbn:"978-100002"},
 {id:3,title:"Design Basics",author:"Lena Morris",category:"Education",price:349,rating:4.6,reviews:82,color:"#3f6375",desc:"An approachable introduction to visual design, layout, type and colour.",pages:248,year:2023,isbn:"978-100003"},
 {id:4,title:"Moon Over Kyoto",author:"Eli Parker",category:"Fiction",price:429,rating:4.7,reviews:91,color:"#66547c",desc:"A warm travel novel filled with friendship, food and second chances.",pages:286,year:2022,isbn:"978-100004"},
 {id:5,title:"JavaScript Made Simple",author:"Rohan Shah",category:"Technology",price:599,rating:4.7,reviews:155,color:"#a27b27",desc:"Learn modern JavaScript with clear examples and small practical projects.",pages:410,year:2025,isbn:"978-100005"},
 {id:6,title:"The Little Astronomer",author:"Nora Reed",category:"Children",price:299,rating:4.8,reviews:67,color:"#405d82",desc:"A colourful introduction to stars, planets and the night sky for young readers.",pages:96,year:2024,isbn:"978-100006"},
 {id:7,title:"Notes From Home",author:"Aria Sen",category:"Lifestyle",price:379,rating:4.5,reviews:54,color:"#9b6258",desc:"Simple ideas for journaling, planning and creating a calmer everyday life.",pages:180,year:2023,isbn:"978-100007"},
 {id:8,title:"History in Stories",author:"Dev Mehta",category:"Education",price:449,rating:4.6,reviews:73,color:"#765a3a",desc:"Important moments in history explained through short, memorable stories.",pages:350,year:2021,isbn:"978-100008"},
 {id:9,title:"Watercolour Journal",author:"Ivy Brooks",category:"Stationery",price:249,rating:4.4,reviews:38,color:"#6a8292",desc:"A compact blank journal made for sketches, notes and everyday ideas.",pages:120,year:2025,isbn:"978-100009"},
 {id:10,title:"The Daily Planner",author:"BookNook Studio",category:"Stationery",price:199,rating:4.5,reviews:42,color:"#a56d49",desc:"A clean undated planner for tasks, goals and weekly notes.",pages:160,year:2025,isbn:"978-100010"},
 {id:11,title:"Focus",author:"Daniel West",category:"Self Help",price:459,rating:4.6,reviews:118,color:"#4c665a",desc:"A practical book about protecting attention and getting meaningful work done.",pages:270,year:2020,isbn:"978-100011"},
 {id:12,title:"Stories Before Sleep",author:"Anya Roy",category:"Children",price:329,rating:4.8,reviews:88,color:"#7d5d79",desc:"Ten gentle stories written for a peaceful bedtime routine.",pages:112,year:2024,isbn:"978-100012"}
];

const reviews = [
 {product:1,name:"Aarav",rating:5,text:"Beautiful writing and an easy book to get lost in."},
 {product:1,name:"Meera",rating:4,text:"Good story. The middle was a little slow for me."},
 {product:2,name:"Karan",rating:5,text:"Very practical. I started using the ideas immediately."},
 {product:5,name:"Riya",rating:5,text:"Clear explanations and useful examples."},
 {product:6,name:"Neha",rating:5,text:"My daughter really enjoyed it."}
];

function money(n){return "₹"+n.toLocaleString("en-IN")}
function getCart(){return JSON.parse(localStorage.getItem("booknookCart")||"[]")}
function saveCart(c){localStorage.setItem("booknookCart",JSON.stringify(c)); updateCartCount()}
function updateCartCount(){let n=getCart().reduce((a,x)=>a+x.qty,0);document.querySelectorAll(".cart-count").forEach(e=>e.textContent=n)}
function addToCart(id){
 const cart=getCart(), item=cart.find(x=>x.id===id);
 if(item)item.qty++;else cart.push({id,qty:1});
 saveCart(cart); alert("Book added to your cart.");
}
function removeFromCart(id){saveCart(getCart().filter(x=>x.id!==id)); renderCart()}
function changeQty(id,qty){let c=getCart(),x=c.find(i=>i.id===id);if(x)x.qty=Math.max(1,qty);saveCart(c);renderCart()}
function stars(r){return "★".repeat(Math.round(r))+"☆".repeat(5-Math.round(r))}
function cover(p,large=false){return `<div class="cover${large?" detail-cover":""}"><div class="cover-inner" style="background:${p.color}"><b>${p.title}</b><small>${p.author}</small><small>BOOKNOOK</small></div></div>`}
function productCard(p){
 return `<article class="card">${cover(p)}<div class="card-body"><div class="eyebrow">${p.category}</div><h3>${p.title}</h3><div class="author">by ${p.author}</div><div class="stars">${stars(p.rating)} <span style="color:#756c65">${p.rating} (${p.reviews})</span></div><div class="price">${money(p.price)}</div><div class="card-actions"><button class="btn" onclick="addToCart(${p.id})">Add to Cart</button><a class="btn light" href="product.html?id=${p.id}">View</a></div></div></article>`
}
function renderProducts(list=products,target="product-grid"){let el=document.getElementById(target);if(el)el.innerHTML=list.length?list.map(productCard).join(""):`<div class="empty">No books found. Try another search.</div>`}
function initShop(){
 renderProducts();
 const search=document.getElementById("search"),cat=document.getElementById("category"),sort=document.getElementById("sort");
 function filter(){
  let q=(search?.value||"").toLowerCase(), c=cat?.value||"all", s=sort?.value||"default";
  let list=products.filter(p=>(p.title+" "+p.author+" "+p.category).toLowerCase().includes(q)&&(c==="all"||p.category===c));
  if(s==="low")list.sort((a,b)=>a.price-b.price); if(s==="high")list.sort((a,b)=>b.price-a.price); if(s==="rating")list.sort((a,b)=>b.rating-a.rating);
  renderProducts(list);
 }
 search?.addEventListener("input",filter);cat?.addEventListener("change",filter);sort?.addEventListener("change",filter);
}
function renderFeatured(){renderProducts(products.slice(0,4),"featured-grid")}
function renderCategory(cat){renderProducts(products.filter(p=>p.category===cat),"category-grid")}
function initDetail(){
 const id=Number(new URLSearchParams(location.search).get("id"))||1,p=products.find(x=>x.id===id)||products[0];
 document.getElementById("detail").innerHTML=`<div>${cover(p,true)}</div><div><div class="eyebrow">${p.category}</div><h1>${p.title}</h1><p class="author">by <a href="author.html?name=${encodeURIComponent(p.author)}"><b>${p.author}</b></a></p><div class="stars">${stars(p.rating)} ${p.rating} (${p.reviews} reviews)</div><p style="margin-top:18px;color:#756c65">${p.desc}</p><div class="price" style="font-size:26px">${money(p.price)}</div><button class="btn" onclick="addToCart(${p.id})">Add to Cart</button><div class="specs"><div><b>Pages</b><span>${p.pages}</span></div><div><b>Published</b><span>${p.year}</span></div><div><b>ISBN</b><span>${p.isbn}</span></div><div><b>Format</b><span>Paperback</span></div></div></div>`;
 const box=document.getElementById("reviews");if(box)box.innerHTML=reviews.filter(r=>r.product===p.id).map(r=>`<div class="review"><strong>${r.name} · <span class="stars">${stars(r.rating)}</span></strong><p>${r.text}</p></div>`).join("")||"<p>No reviews yet.</p>";
}
function renderCart(){
 const box=document.getElementById("cart-items"),cart=getCart();
 if(!box)return;
 if(!cart.length){box.innerHTML='<div class="empty"><h3>Your cart is empty</h3><p>Find a book you like and add it here.</p><a class="btn" href="products.html">Browse Books</a></div>';document.getElementById("cart-total").textContent=money(0);return}
 box.innerHTML=cart.map(x=>{let p=products.find(a=>a.id===x.id);return `<div class="cart-item"><div class="mini-cover" style="background:${p.color}">${p.title}</div><div><b>${p.title}</b><p class="author">${p.author}</p></div><div class="qty"><input type="number" min="1" value="${x.qty}" onchange="changeQty(${p.id},Number(this.value))" style="width:60px;padding:6px"></div><b>${money(p.price*x.qty)}</b><button class="icon-btn" onclick="removeFromCart(${p.id})">×</button></div>`}).join("");
 let total=cart.reduce((a,x)=>a+(products.find(p=>p.id===x.id).price*x.qty),0);document.getElementById("cart-total").textContent=money(total);
}
function initCheckout(){
 const cart=getCart(),summary=document.getElementById("checkout-summary");
 if(!cart.length){summary.innerHTML="<div class='notice'>Your cart is empty. Add some books before checkout.</div>";return}
 let total=cart.reduce((a,x)=>a+products.find(p=>p.id===x.id).price*x.qty,0);
 summary.innerHTML=`<h3>Order Summary</h3>${cart.map(x=>{let p=products.find(a=>a.id===x.id);return `<p style="display:flex;justify-content:space-between;margin:8px 0"><span>${p.title} × ${x.qty}</span><b>${money(p.price*x.qty)}</b></p>`}).join("")}<div class="total-row final"><span>Total</span><span>${money(total)}</span></div>`;
 document.getElementById("order-form")?.addEventListener("submit",e=>{e.preventDefault();let orders=JSON.parse(localStorage.getItem("booknookOrders")||"[]");orders.push({id:"BN"+Date.now().toString().slice(-6),date:new Date().toLocaleDateString("en-IN"),total,status:"Confirmed"});localStorage.setItem("booknookOrders",JSON.stringify(orders));localStorage.removeItem("booknookCart");location.href="confirmation.html"});
}
function initOrders(){let box=document.getElementById("orders"),orders=JSON.parse(localStorage.getItem("booknookOrders")||"[]");box.innerHTML=orders.length?orders.reverse().map(o=>`<div class="review"><b>Order ${o.id}</b><p>${o.date} · ${o.status}</p><strong>${money(o.total)}</strong></div>`).join(""):"<div class='empty'>No orders yet.</div>"}
function initAuthor(){let name=new URLSearchParams(location.search).get("name")||"James Clear";let books=products.filter(p=>p.author.toLowerCase()===name.toLowerCase());document.getElementById("author-name").textContent=name;renderProducts(books.length?books:products.slice(0,3),"author-books")}
document.addEventListener("DOMContentLoaded",()=>{updateCartCount();if(document.getElementById("product-grid"))initShop();if(document.getElementById("featured-grid"))renderFeatured();if(document.getElementById("detail"))initDetail();if(document.getElementById("cart-items"))renderCart();if(document.getElementById("checkout-summary"))initCheckout();if(document.getElementById("orders"))initOrders();if(document.getElementById("author-books"))initAuthor()});
