(function () {

    // 🔒 Domain Lock (এখানে বসাতে হবে)
    const allowedDomains = ["https://techlystb.blogspot.com", "https://techlyapk.blogspot.com"];

    if (!allowedDomains.includes(location.hostname)) {
        console.log("Unauthorized domain blocked");
        return; // এখানেই stop
    }

    const adBoxId = "myAdBox";

    function loadAd() {
        fetch("https://techlystb.github.io/my-ads-system/ads.json")
        .then(res => res.json())
        .then(data => {
            let ad = data[Math.floor(Math.random() * data.length)];

            let html = `
                <a href="${ad.link}" target="_blank">
                    <img src="${ad.image}" style="width:100%;border-radius:10px;">
                    <p style="text-align:center;font-size:14px;">${ad.title}</p>
                </a>
            `;

            document.getElementById(adBoxId).innerHTML = html;
        });
    }

    loadAd();
    setInterval(loadAd, 5000);

})();




