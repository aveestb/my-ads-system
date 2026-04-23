(function () {

 const adBoxId = "customAd728x90";
 const category = document.getElementById(adBoxId)?.dataset.category || "all";

 async function loadAd(){

   let ads = await fetch("https://aveestb.github.io/my-ads-system/ads.json").then(r=>r.json());
   let stats = await fetch("https://aveestb.github.io/my-ads-system/stats.json").then(r=>r.json());

   // category filter
   if(category !== "all"){
     ads = ads.filter(ad => ad.category === category);
   }

   let ad = ads[Math.floor(Math.random() * ads.length)];

   // fix stats structure
   if(!stats.ads) stats.ads = {};

   if(!stats.ads[ad.id]){
     stats.ads[ad.id] = {views:0, clicks:0, ctr:0};
   }

   // view count
   stats.ads[ad.id].views++;

   // CTR update
   let v = stats.ads[ad.id].views;
   let c = stats.ads[ad.id].clicks;

   stats.ads[ad.id].ctr = v > 0 ? ((c / v) * 100).toFixed(2) : 0;

   // render ad
   document.getElementById(adBoxId).innerHTML = `
   <div style="max-width:728px;width:100%;border:1px solid #ccc;border-radius:8px;overflow:hidden;background:#f9f9f9;position:relative;">
     
     <div style="position:absolute;top:4px;right:8px;font-size:10px;color:#888;">
       Ads by techlystb
     </div>

     <img src="${ad.image}" style="width:100%;cursor:pointer"
      onclick="trackClick(${ad.id}, '${ad.link}')">

     <div style="padding:8px;">
       <h4>${ad.title}</h4>
       <p>${ad.description || ""}</p>
     </div>

   </div>
   `;

 }

 // click tracking (GLOBAL)
 window.trackClick = function(adId, url){

   fetch("https://aveestb.github.io/my-ads-system/stats.json")
   .then(r=>r.json())
   .then(stats=>{

     if(!stats.ads) stats.ads = {};

     if(!stats.ads[adId]){
       stats.ads[adId] = {views:0, clicks:0, ctr:0};
     }

     stats.ads[adId].clicks++;

     let v = stats.ads[adId].views;
     let c = stats.ads[adId].clicks;

     stats.ads[adId].ctr = v > 0 ? ((c / v) * 100).toFixed(2) : 0;

     console.log("Click tracked", adId);

   });

   window.open(url, "_blank");
 };

 // run
 loadAd();
 setInterval(loadAd, 10000);

})();
