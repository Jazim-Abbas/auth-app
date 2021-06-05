var vm = new Vue({
  el: "#app",
  data: {
    isLoading: false,
    credentials: {
      verificationCode: "",
      name: "",
      familyName: "",
      phone: "",
      newOfficialEmail: "",
      password: "",
      confirmPassword: "",
    },
    errors: [],
    error: "",
  },
  methods: {
    async onSubmit() {
      const URL = "/health-official/verify-new-official";
      this.isLoading = true;

      try {
        const res = await axios.post(URL, { ...this.credentials });

        this.isLoading = false;

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

        this.isLoading = false;

        console.log(response);
      }
    },
  },
});
