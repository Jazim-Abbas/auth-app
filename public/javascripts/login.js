var vm = new Vue({
  el: "#login-app",
  data: {
    isLoading: false,
    isOwner: false,
    acountType: "user",
    credentials: {
      email: "",
      password: "",
    },
    error: "",
    errors: [],
  },
  methods: {
    async onLogin() {
      this.isLoading = true;

      try {
        const res = await axios.post(this.loginURL, { ...this.credentials });

        this.isLoading = false;

        this.errors = [];
        this.error = "";
        let userData = res.data;
        if (this.isOwner) {
          userData.isOwner = true;
        } else {
          userData.isOwner = false;
        }
        window.localStorage.setItem("user", JSON.stringify(userData));
        console.log(res.data);
        window.location.href = "/user/account-details.html";
      } catch (err) {
        this.isLoading = false;
        const { response } = err;

        if (response.status === 422) {
          this.error = "";
          this.errors = response.data;
        } else {
          this.errors = [];
          this.error = response.data.message;
        }

        console.log(response);
      }
    },
    async onGoogleLogin(email) {
      this.checkUser({ email }, "/user/get-user");
    },
    async checkUser(credentials, url) {
      this.signoutFromGoogle();
      this.isLoading = true;

      try {
        const res = await axios.post(url, { ...credentials });

        this.isLoading = false;

        this.errors = [];
        this.error = "";
        let userData = res.data;
        if (this.isOwner) {
          userData.isOwner = true;
        } else {
          userData.isOwner = false;
        }
        window.localStorage.setItem("user", JSON.stringify(userData));
        console.log(res.data);
        window.location.href = "/user/account-details.html";
      } catch (err) {
        this.isLoading = false;
        const { response } = err;

        if (response.status === 422) {
          this.error = "";
          this.errors = response.data;
        } else {
          this.errors = [];
          this.error = response.data.message;
        }

        console.log(response);
      }
    },
    signoutFromGoogle() {
      gapi.auth2
        .getAuthInstance()
        .signOut()
        .then(() => {
          console.log("sign out from google");
        });
    },
  },
  computed: {
    loginURL() {
      const urls = {
        owner: "/venue-owner/login",
        user: "/user/login",
        healthOfficial: "/health-official/login",
      };

      return urls[this.acountType];
    },
    googleLoginURL() {
      const urls = {
        owner: "/venue-owner/google",
        user: "/user/google",
        healthOfficial: "/health-official/google",
      };

      return urls[this.acountType];
    },
  },
});

function validateLogin() {
  return true;
}

function onSignIn(googleUser) {
  const user = googleUser.getBasicProfile();
  console.log("user", user);
  console.log("user email", user.ku);

  vm.onGoogleLogin(user.ku);
  // console.log("google user", JSON.stringify(googleUser.getBasicProfile()));
}
