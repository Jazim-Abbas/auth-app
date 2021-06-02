var vm = new Vue({
  el: "#login-app",
  data: {
    acountType: "owner",
    credentials: {
      email: "",
    },
    error: "",
    errors: [],
  },
  methods: {
    async onSendMail() {
      alert(this.sendMailUrl);

      //   try {
      //     const res = await axios.post(this.loginURL, { ...this.credentials });
      //     this.errors = [];
      //     this.error = "";

      //     console.log(res.data);
      //   } catch (err) {
      //     const { response } = err;

      //     if (response.status === 422) {
      //       this.error = "";
      //       this.errors = response.data;
      //     } else {
      //       this.errors = [];
      //       this.error = response.data.message;
      //     }

      //     console.log(response);
      //   }
    },
  },
  computed: {
    sendMailUrl() {
      const urls = {
        owner: "/owner",
        user: "/user",
        healthOfficial: "/healt",
      };

      return urls[this.acountType];
    },
  },
});

function validateLogin() {
  return true;
}
