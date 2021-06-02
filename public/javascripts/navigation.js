// Read cookies to get the user's account type:
var userCookie = decodeURIComponent(document.cookie);
var cookieParts = userCookie.split(";");
var cookieKey = "userType=";
var userType;

function isVenueOwner() {
  var { isOwner } = JSON.parse(localStorage.getItem("user"));

  return isOwner;
}

function isHealthOfficer() {
  var { isHealthOffice } = JSON.parse(localStorage.getItem("user"));

  return isHealthOffice;
}

// isVenueOwner();

for (let part of cookieParts) {
  part = part.trim();
  if (part.indexOf(cookieKey) == 0) {
    userType = part.substring(cookieKey.length, part.length);
  }
}

// Display different navigation links, depending on the user type:
var nav = document.getElementsByTagName("nav")[0];
let navContent = `<ul class="pure-menu-list">
                    <li class="pure-menu-item">
                        <a href="/user/index.html" class="pure-menu-link"><i class="fas fa-chart-line"></i><br />Dashboard</a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="/user/check-in.html" class="pure-menu-link"><i class="fas fa-clipboard-check"></i><br />Check-In</a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="/user/check-in-history.html" class="pure-menu-link"><i class="fas fa-tasks"></i><br />Check-In History</a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="/user/hotspots.html" class="pure-menu-link"><i class="fas fa-exclamation-circle"></i><br />Hotspots</a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="/user/account-details.html" class="pure-menu-link"><i class="fas fa-user"></i><br />Account</a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="/user/settings.html" class="pure-menu-link"><i class="fas fa-cog"></i><br />Settings</a>
                    </li>`;

if (isVenueOwner()) {
  navContent += `<li class="pure-menu-item">
        <a href="/manager/venue-check-in-history.html" class="pure-menu-link"><i class="fas fa-notes-medical"></i><br />Venue Check-in<br>History</a>
    </li>
     <li class="pure-menu-item">
        <a href="/manager/check-in(printable).html" class="pure-menu-link" target="_blank"><i class="fas fa-print"></i><br />Print<br />Check-in Page</a>
    </li>
     <li class="pure-menu-item">
        <a href="/manager/venue-details.html" class="pure-menu-link"><i class="fas fa-hotel"></i><br />Venue Details</a>
    </li>`;
}

if (isHealthOfficer()) {
  navContent += `<li class="pure-menu-item">
        <a href="/admin/manage-users.html" class="pure-menu-link"><i class="far fa-address-book"></i><br />Manage Users</a>
    </li>
    <li class="pure-menu-item">
        <a href="/admin/manage-venues.html" class="pure-menu-link"><i class="fas fa-hotel"></i><br />Manage Venues</a>
    </li>
     <li class="pure-menu-item">
        <a href="/admin/manage-hotspots.html" class="pure-menu-link"><i class="fas fa-exclamation-triangle"></i><br />Manage<br />Hotspots</a>
    </li>
     <li class="pure-menu-item">
        <a href="/admin/register-health-official.html" class="pure-menu-link"><i class="fas fa-user-plus"></i><br />Register Health<br />Official</a>
    </li>`;
}

navContent += `</ul>`;

// Setup the content of the nav menu and the style of links to the current page:
nav.innerHTML = navContent;

for (let page of nav.children[0].children) {
  if (window.location.href == page.children[0].href) {
    page.children[0].classList.add("current-page");
  }
}

// Set the nav menu visibility, depending on whether the page is viewed on a mobile or desktop:
var navHidden = false;

function navVisibility() {
  let hideNav = window.matchMedia("(max-width: 768px)").matches;
  if (navHidden != hideNav) {
    navHidden = hideNav;

    if (navHidden) {
      nav.hidden = true;
    } else {
      nav.hidden = false;
    }
  }
}

navVisibility();

window.addEventListener("resize", navVisibility);
