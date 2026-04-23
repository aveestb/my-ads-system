(function () {

    const adBoxId = "myAdBox";
    const category = document.getElementById(adBoxId)?.dataset.category || "all";

    async function loadAd() {
        let ads = await fetch("https://aveestb.github.io/my-ads-system/ads.json").then(r => r.json());
        let stats = await fetch("https://aveestb.github.io/my-ads-system/stats.json").then(r => r.json());

        // filter by category
        if (category !== "all") {
            ads = ads.filter(ad => ad.category === category);
        }

        let ad = ads[Math.floor(Math.random() * ads.length)];

        // view count
        if (!stats[ad.id]) stats[ad.id] = { clicks: 0, views: 0 };
        stats[ad.id].views++;

        updateStats(stats);

        let html = `
            <a href="${ad.link}?ad_id=${ad.id}" target="_blank">
                <img src="${ad.image}" style="width:100%">
                <p>${ad.title}</p>
            </a>
        `;

        document.getElementById(adBoxId).innerHTML = html;
    }

    async function updateStats(stats) {
        // ⚠️ GitHub API লাগবে (token ছাড়া কাজ করবে না)
        console.log("Stats updated locally", stats);
    }

    loadAd();
    setInterval(loadAd, 5000);

})();


// 👉 তোমার আগের code (trackView, trackClick etc)
// ================================



// 👉 NEW FUNCTION (ADD ONLY)
async function loadCustomAd(){

 let res = await fetch("https://aveestb.github.io/my-ads-system/ads.json");
 let data = await res.json();

 let ad = data[Math.floor(Math.random() * data.length)];

 let html = `
 <div style="max-width:728px;width:100%;border:1px solid #ccc;border-radius:8px;overflow:hidden;background:#f9f9f9;position:relative;">

  <div style="position:absolute;top:4px;right:8px;font-size:10px;color:#888;">
    Ads by techlystb
  </div>

  <a href="${ad.link}" target="_blank">
    <img src="${ad.image}" style="height:90px;width:auto;">
    <div style="padding:8px;">
      <h4>${ad.title}</h4>
      <p>${ad.description || ""}</p>
    </div>
  </a>

 </div>
 `;

 document.getElementById("customAd728x90").innerHTML = html;

 // tracking
 if(typeof trackView === "function"){
   trackView(ad.id);
 }
}


// 👉 AUTO RUN (ADD)
loadCustomAd();

// 👉 AUTO ROTATE (optional)
setInterval(loadCustomAd, 10000);


