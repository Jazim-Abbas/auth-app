// Read cookies to get the user's account type:
var settingsCookie = decodeURIComponent(document.cookie);
var cookieParts = settingsCookie.split(';');
var cookieKey = "settings=";
var settings;

for (let part of cookieParts) {
    part = part.trim();
    if (part.indexOf(cookieKey) == 0) {
        settings = JSON.parse(part.substring(cookieKey.length + 1, part.length - 1));

        document.getElementById('dash-cases').checked = settings.dashCases;
        document.getElementById('dash-deaths').checked = settings.dashDeaths;
        document.getElementById('dash-info').checked = settings.dashInfo;
    }
}

function revert() {
    location.reload();
}

function applySettings() {
    let newSettings = {
        dashCases: document.getElementById('dash-cases').checked,
        dashDeaths: document.getElementById('dash-deaths').checked,
        dashInfo: document.getElementById('dash-info').checked
    };

    let expiry = new Date() + new Date(10 * 365 * 24 * 60 * 60 * 1000);
    document.cookie = `settings="${JSON.stringify(newSettings)}";path=/;expires=${expiry.toString()}`;

    return true;
}