function toggleNavMenu() {
  let navmenu = document.getElementsByTagName("nav")[0];
  if (navmenu.hidden == false) {
    navmenu.hidden = true;
    window.removeEventListener("click", hideNav);
  } else {
    navmenu.hidden = false;
    window.setTimeout(() => {
      window.addEventListener("click", hideNav);
    }, 0);
  }
}

function hideNav(event) {
  let width = window.matchMedia("(max-width: 768px)");
  if (width.matches) {
    toggleNavMenu();
  }
}

function signOut() {
  document.cookie = "userType=;path=/";
  window.localStorage.removeItem("user");
  window.location.href = "/login.html";
}

var header = document.getElementsByTagName("header")[0];
header.innerHTML = `<button onclick="toggleNavMenu()" id="nav-menu" class="pure-button"><i class="fas fa-bars"></i></button><button class='pure-button pure-button-primary sign-out' onclick="signOut()">Sign Out</button>
                    <div class="left">
                        <p class="left">Select user type (for testing purposes only):</p>
                        <form class="left">
                            <button onclick='document.cookie = "userType=user;path=/"'>User</button>
                            <button onclick='document.cookie = "userType=venue-owner;path=/"'>Venue Owner</button>
                            <button onclick='document.cookie = "userType=health-official;path=/"'>Health Official</button>
                        </form>
                    </div>`;
