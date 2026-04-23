(function () {
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

    // auto rotate every 5 sec
    setInterval(loadAd, 5000);

})();
