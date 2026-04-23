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
