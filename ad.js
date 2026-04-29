(function () {

    const adBoxes = document.querySelectorAll(".myAdBox");
    if (!adBoxes.length) return;

    const API = "https://aveestb.github.io/my-ads-system/ads.json";
    const CACHE_KEY = "ads_cache";
    const CACHE_TIME = 5 * 60 * 1000; // 5 min

    let ads = [];

    // 📦 Load from cache
    function loadCache() {
        let cache = localStorage.getItem(CACHE_KEY);
        if (!cache) return null;

        let data = JSON.parse(cache);
        if (Date.now() - data.time < CACHE_TIME) {
            return data.ads;
        }
        return null;
    }

    // 💾 Save cache
    function saveCache(data) {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            time: Date.now(),
            ads: data
        }));
    }

    // 🚀 Fetch ads
    async function fetchAds() {
        let cached = loadCache();
        if (cached) {
            ads = cached;
            renderAllAds();
            return;
        }

        try {
            let res = await fetch(API);
            ads = await res.json();
            saveCache(ads);
            renderAllAds();
        } catch (e) {
            console.log("Ad load failed", e);
        }
    }

    // 🧠 Smart filter (per box)
    function getFilteredAds(box) {
        let category = box.dataset.category || "all";

        if (category !== "all") {
            let filtered = ads.filter(a => a.category === category);
            if (filtered.length) return filtered;
        }
        return ads;
    }

    // 🖼 Preload image
    function preload(src) {
        let img = new Image();
        img.src = src;
    }

    // 🎯 Render single ad
    function renderAd(box) {
        let list = getFilteredAds(box);
        if (!list.length) return;

        let ad = list[Math.floor(Math.random() * list.length)];

        preload(ad.image);

        box.innerHTML = `
            <a href="${ad.link}" target="_blank">
                <img src="${ad.image}" loading="lazy" style="width:100%;border-radius:10px;">
                <p style="text-align:center;font-size:14px;">${ad.title}</p>
            </a>
        `;
    }

    // 🎯 Render all boxes
    function renderAllAds() {
        adBoxes.forEach(box => renderAd(box));
    }

    // 🔁 Rotate
    function startRotation() {
        setInterval(() => {
            renderAllAds();
        }, 5000);
    }

    // 🚀 Start
    fetchAds();
    startRotation();

})();
