var vm = new Vue({
  el: "#app",
  data: {
    credentials: {
      verificationCode: "291100",
      name: "Adbul",
      familyName: "Adbul",
      phone: "1231",
      newOfficialEmail: "abduliscoool@gmail.com",
      password: "password",
      confirmPassword: "password",
    },
    errors: [],
    error: "",
  },
  methods: {
    async onSubmit() {
      const URL = "/health-official/verify-new-official";

      try {
        const res = await axios.post(URL, { ...this.credentials });

        console.log(res);
      } catch (err) {
        const { response } = err;
        if (response.status === 422) {
          if (typeof response.data === "string") {
            this.errors = [];
            this.error = response.data;
          } else {
            this.errors = response.data;
            this.error = "";
          }
        } else {
          this.errors = [];
          this.error = response.data.message;
        }

        console.log(response);
      }
    },
  },
});
