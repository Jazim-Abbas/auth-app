var vm = new Vue({
  el: "#login-app",
  data: {
    isOwner: false,
    credentials: {
      email: "",
      password: "",
    },
    error: "",
    errors: [],
  },
  methods: {
    async onLogin() {
      try {
        const res = await axios.post(this.loginURL, { ...this.credentials });
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
  },
  computed: {
    loginURL() {
      return this.isOwner ? "/venue-owner/login" : "/user/login";
    },
  },
});

function validateLogin() {
  return true;
}
