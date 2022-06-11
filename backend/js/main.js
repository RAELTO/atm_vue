//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        users: [
            {accountn: '3333', pin: '3333', balance: 0},//admin
            {accountn: '1234', pin: '1234', balance: 0, status: 1},
            {accountn: '5678', pin: '1234', balance: 0, status: 1},
            {accountn: '9012', pin: '1234', balance: 0, status: 1},
        ],
        atm: [

        ],
        pin: '',
        accountn: '',
    },
    methods: {
        buttons(n){
            this.pin += n;
            console.log(this.pin);
        },
    },
});
