(function () {

    const adBoxes = document.querySelectorAll(".myAdBox");
    if (!adBoxes.length) return;

    const API = "https://aveestb.github.io/my-ads-system/ads.json";

    let ads = [];

    // 🚀 Fetch ads
    async function fetchAds() {
        try {
            let res = await fetch(API);
            if (!res.ok) throw new Error("API error");

            ads = await res.json();

            if (!Array.isArray(ads) || !ads.length) {
                console.log("No ads found");
                return;
            }

            renderAllAds();
            startRotation(); // 👉 fetch হওয়ার পর start
        } catch (e) {
            console.log("Ad load failed", e);
        }
    }

    // 🎯 Render single ad
    function renderAd(box) {
        if (!ads.length) return;

        let ad = ads[Math.floor(Math.random() * ads.length)];

        box.innerHTML = `
            <a href="${ad.link}" target="_blank">
                <img src="${ad.image}" loading="lazy" style="width:100%;border-radius:10px;">
                <p style="text-align:center;">${ad.title}</p>
            </a>
        `;
    }

    // 🎯 Render all boxes
    function renderAllAds() {
        adBoxes.forEach(box => renderAd(box));
    }

    // 🔁 Rotate ads (only after ads loaded)
    function startRotation() {
        setInterval(() => {
            renderAllAds();
        }, 5000);
    }

    // 🚀 Start
    fetchAds();

})();
