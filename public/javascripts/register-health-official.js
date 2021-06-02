var pendingRegistrations = [
    {
        email: "joey.price2323@gmail.com",
        expires: "5/13/2021, 5:34:22 AM"
    },
    {
        email: "jasper.shaw7528@gmail.com",
        expires: "5/14/2021, 3:56:65 PM"
    },
    {
        email: "melissa.walker7001@gmail.com",
        expires: "5/21/2021, 7:12:45 PM"
    }
];

var vm = new Vue({
    el: '#app',
    data: {
        pending: pendingRegistrations
    },
    methods: {
        cancelPendingRegistration: function(email) {
            // Send POST request to server, to cancel admin registration for given email address.
        }
    }
});