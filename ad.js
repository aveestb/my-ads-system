(function () {

    const adBoxId = "myAdBox";

    // 🔒 Password Protection
    const PASSWORD = "7931"; // এখানে নিজের password বসাও
    let userPass = prompt("Enter Ad Password");

    if (userPass !== PASSWORD) {
        document.getElementById(adBoxId).innerHTML = "<p style='text-align:center;'>Access Denied 🚫</p>";
        throw new Error("Unauthorized");
    }

    // 🔒 Domain Lock
    const allowedDomains = ["https://techlystb.blogspot.com", "https://techlyapk.blogspot.com", "https://apkstb.blogspot.com"];

    if (!allowedDomains.some(domain => location.hostname.includes(domain))) {
        document.getElementById(adBoxId).innerHTML = "";
        throw new Error("Blocked Domain");
    }

    // 📂 Category Support
    const category = document.getElementById(adBoxId)?.dataset.category || "all";

    async function loadAd() {
        try {
            let ads = await fetch("https://techlystb.github.io/my-ads-system/ads.json")
                .then(res => res.json());

            // category filter
            if (category !== "all") {
                ads = ads.filter(ad => ad.category === category);
            }

            if (!ads.length) {
                document.getElementById(adBoxId).innerHTML = "No Ads Found";
                return;
            }

            let ad = ads[Math.floor(Math.random() * ads.length)];

            let html = `
                <a href="${ad.link}" target="_blank">
                    <img src="${ad.image}" loading="lazy" style="width:100%;border-radius:10px;">
                    <p style="text-align:center;font-size:14px;">${ad.title}</p>
                </a>
            `;

            document.getElementById(adBoxId).innerHTML = html;

        } catch (err) {
            console.log("Ad load error:", err);
        }
    }

    // first load
    loadAd();

    // 🔁 Auto rotate (5 sec)
    setInterval(loadAd, 5000);

})();
