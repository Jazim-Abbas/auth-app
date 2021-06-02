var vm = new Vue({
  el: "#login-app",
  data: {
    acountType: "user",
    credentials: {
      email: "",
    },
    error: "",
    errors: [],
  },
  methods: {
    async onSendMail() {
        try {
          const res = await axios.post(this.sendMailUrl, { ...this.credentials });
          this.errors = [];
          this.error = "";

          window.location.href = "/forget-password.html"
        } catch (err) {
          const { response } = err;

          if (response.status === 422) {
            this.error = "";
            this.errors = response.data;
          } else {
            this.errors = [];
            this.error = response.data;
          }

          console.log(response);
        }
    },
  },
  computed: {
    sendMailUrl() {
      const urls = {
        owner: "/venue-owner/send-verification-code",
        user: "/user/send-verification-code",
        healthOfficial: "/health-official/send-verification-code",
      };

      return urls[this.acountType];
    },
  },
});

function validateLogin() {
  return true;
}
