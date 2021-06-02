function checkIn() {
    vm.checkin = {
        venue: "Venue Name",
        time: new Date().toLocaleString()
    };
    vm.checkin_status = 1;

    return false;
}

var vm = new Vue({
    el: '#app',
    data: {
        checkin_status: -1,
        checkin: {}
    }
});