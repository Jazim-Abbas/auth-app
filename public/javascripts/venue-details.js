var venueDetails = {
  venueName: "My Business",
  streetNumber: "12A",
  streetName: "First Street",
  town: "Adelaide",
  postcode: 5000,
};

var vm = new Vue({
  el: "#app",
  data: {
    venue: venueDetails,
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      const headers = this.getHeaders();

      try {
        const res = await axios.get("/venue-owner/profile", { headers });
        this.venue = res.data;
        console.log(res);
      } catch (err) {
        const { response } = err;
        console.log(response);
      }
    },
    async onUpdateProfile() {
      const headers = this.getHeaders();

      try {
        const res = await axios.patch(
          "/venue-owner/update",
          { ...this.venue },
          { headers }
        );
        console.log(res);
      } catch (err) {
        const { response } = err;
        console.log(response);
      }
    },
    getHeaders() {
      const { token } = JSON.parse(window.localStorage.getItem("user"));
      const headers = { authorization: token };
      return headers;
    },
  },
});
