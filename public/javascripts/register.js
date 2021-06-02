var vm = new Vue({
  el: "#app",
  data: {
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

      try {
        const res = await axios.post(this.registerURL, credentials);
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
