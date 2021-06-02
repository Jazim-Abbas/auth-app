function revert() {
  location.reload();
}

function apply() {
  // Send POST request to server, containing the updated account details.
}

var userDetails = {
  name: "",
  familyName: "",
  email: "",
  phone: "",
  password: "",
};

var vm = new Vue({
  el: "#app",
  data: {
    user: userDetails,
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      const headers = this.getHeaders();
      let url = "/user/profile";

      if (this.isOwner()) {
        url = "/venue-owner/profile";
      }

      try {
        const res = await axios.get(url, { headers });
        this.user = { ...res.data };
        console.log(res);
      } catch (err) {
        console.log(err.response);
      }
    },
    async onUpdateProfile() {
      const headers = this.getHeaders();
      console.log("user", this.user);

      try {
        const res = await axios.patch(
          this.getUpdateURL(),
          { ...this.user },
          { headers }
        );
        console.log(res);
      } catch (err) {
        console.log(err.response);
      }
    },
    getHeaders() {
      const { token } = JSON.parse(window.localStorage.getItem("user"));
      const headers = { authorization: token };
      return headers;
    },
    getUpdateURL() {
      let url = "/user/update";

      const { isOwner } = JSON.parse(window.localStorage.getItem("user"));
      if (isOwner) {
        url += "?isOwner=1";
      }

      return url;
    },
    isOwner() {
      const { isOwner } = JSON.parse(window.localStorage.getItem("user"));
      return isOwner;
    },
  },
});
