var vm = new Vue({
  el: "#login-app",
  data: {
    acountType: "user",
    isLoading: false,
    credentials: {
      email: "",
      password: "",
      verificationCode: "",
      confirmPassword: ""
    },
    error: "",
    errors: [],
  },
  methods: {
    async onForgetPassword() {
      this.isLoading = true;

        try {
          const res = await axios.post(this.forgetPasswordURL, { ...this.credentials });
          this.errors = [];
          this.error = "";

          this.isLoading = false;

          console.log(res.data);
        } catch (err) {
          const { response } = err;

          // if (response.status === 422) {
          //   this.error = "";
          //   this.errors = response.data;
          // } else {
          //   this.errors = [];
          //   this.error = response.data.message;
          // }

          this.error = response.data;

          this.isLoading = false;

          console.log(response);
        }
    },
  },
  computed: {
    forgetPasswordURL() {
      const urls = {
        owner: "/venue-owner/forget-password",
        user: "/user/forget-password",
        healthOfficial: "/health-official/forget-password",
      };

      return urls[this.acountType];
    },
  },
});

function validateLogin() {
  return true;
}
