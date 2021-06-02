/*

Redirects user to dashboard if they are not a health official. Disabling, to make accessing each page easier.

// Read cookies to get the user's account type:
var userCookie = decodeURIComponent(document.cookie);
var cookieParts = userCookie.split(';');
var cookieKey = "userType=";
var userType;

for (let part of cookieParts) {
    part = part.trim();
    if (part.indexOf(cookieKey) == 0) {
        userType = part.substring(cookieKey.length, part.length);
    }
}

if (userType != "health-official") {
    window.location.href = "/index.html";
}*/