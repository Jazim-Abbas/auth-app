var vm = new Vue({
  el: "#app",
  data: {
    isLoading: false,
    venue_owner: false,
    credentials: {
      name: "",
      familyName: "",
      email: "",
      password: "",
      phone: "",
      confirmPassword: "",
    },
    venueDetail: {
      venueName: "",
      streetNumber: "",
      streetName: "",
      town: "",
      postcode: "",
    },
    error: "",
    errors: [],
  },
  methods: {
    async onRegister() {
      console.log({ ...this.credentials, ...this.venueDetail });
      const credentials = { ...this.credentials, ...this.venueDetail };

      this.isLoading = true;

      try {
        const res = await axios.post(this.registerURL, credentials);

        this.isLoading = false;

        window.location.href = "/login.html";
      } catch (err) {
        const { response } = err;
        if (response.status === 422) {
          this.error = "";
          this.errors = response.data;
        } else {
          this.errors = [];
          this.error = response.data.message;
        }

        this.isLoading = false;
      }
    },
  },
  computed: {
    registerURL() {
      return this.venue_owner ? "/venue-owner/register" : "/user/register";
    },
  },
});

function back() {
  window.location.href = "/login.html";
}

function register() {
  return true;
}

function validatePassword() {
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("password-confirm");

  if (String(password.value) != String(confirmPassword.value)) {
    confirmPassword.setCustomValidity("Passwords must match.");
  } else {
    confirmPassword.setCustomValidity("");
  }
}
