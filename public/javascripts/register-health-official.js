var pendingRegistrations = [
  {
    email: "joey.price2323@gmail.com",
    expires: "5/13/2021, 5:34:22 AM",
  },
  {
    email: "jasper.shaw7528@gmail.com",
    expires: "5/14/2021, 3:56:65 PM",
  },
  {
    email: "melissa.walker7001@gmail.com",
    expires: "5/21/2021, 7:12:45 PM",
  },
];

var vm = new Vue({
  el: "#app",
  data: {
    pending: pendingRegistrations,
    isLoading: false,
    credentials: {
      email: "",
    },
  },
  methods: {
    cancelPendingRegistration: function (email) {
      // Send POST request to server, to cancel admin registration for given email address.
    },
    async onSubmit() {
      const URL = "/health-official/register";
      const headers = { authorization: this.getUserToken() };
      this.isLoading = true;

      try {
        const res = await axios.post(URL, { ...this.credentials }, { headers });
        this.errors = [];
        this.error = "";

        this.isLoading = false;

        console.log(res);
      } catch (err) {
        const { response } = err;

        this.isLoading = false;

        // if (response.status === 422) {
        //   this.error = "";
        //   this.errors = response.data;
        // } else {
        //   this.errors = [];
        //   this.error = response.data.message;
        // }

        // this.error = response.data;

        console.log(response);
      }
    },
    getUserToken() {
      const { token } = JSON.parse(localStorage.getItem("user"));
      return token;
    },
  },
});
