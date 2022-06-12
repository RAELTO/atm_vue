//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        users: [
            {accountn: '1234', pin: '1234', balance: 600000, status: 1},
            {accountn: '5678', pin: '5678', balance: 1000000, status: 1},
            {accountn: '9012', pin: '9012', balance: 1400000, status: 1},
        ],
        admin: [
            {accountn: '3333', pin: '3333', balance: 0, status: 1},//admin
        ],
        tcash: [
            {denom: 100000, amount: 50},
            {denom: 50000, amount: 100},
            {denom: 20000, amount: 100},
            {denom: 10000, amount: 100}
        ],
        pin: '',
        accountn: '',
        click_acc: false,
        click_pin: false,
        //login 
        disp_marq: 1, //display marquee
        disp_pininp: 0,
        disp_accinp: 1,
        //users view and components
        uservw: 0,
        depovw: 0,
        tfvw: 0,
        wdrvw: 0,
        pos: 0,
        //adminview
        admvw: 0,
    },
    methods: {
        buttons(n){
            if (this.click_acc === true && this.accountn.length <= 3) {
                this.accountn += n;
            }else{
                this.accountn = this.accountn;
            }

            if (this.click_pin === true && this.pin.length <=3) {
                this.pin += n;
            }else{
                this.pin = this.pin;
            }

        },
        acc_input(){
            this.click_acc = true;
            this.click_pin = false;
        },
        pin_input(){
            this.click_pin = true;
            this.click_acc = false;
        },
        userview(){
            this.uservw = 1;
        },
        adminview(){
            this.admvw = 1;
        },
        cancel(){
            this.uservw = 0;
            this.admvw = 0;
            this.disp_marq = 1;
            this.disp_accinp = 1;
            this.disp_pininp = 0;
            this.click_acc = false;
            this.click_pin = false;
            this.accountn = '';
            this.pin = '';
        },
        clear(){

        },
        enter(){

            const index = this.users.findIndex((object, index, users) => {
                return object.accountn == this.accountn;
            });
            
            if(index != -1 && this.accountn.length > 0){
                this.disp_pininp = 1;
                this.disp_accinp = 0;
                this.accountn = this.accountn;
                if(this.pin === this.users[index].pin){
                    this.disp_pininp = 0;
                    this.click_pin
                    this.click_pin = false;
                    this.dis
                    this.uservw = 1;
                    this.disp_marq = 0;
                    this.pos = index;
                }
            }else{
                alert("The account doesn't exists");
            }
        },
        depositvw(){

        },
        transfervw(){

        },
        depositvw(){

        },
        deposit(){
            
        },
        transfer(){

        },
        withdraw(){

        },

    }
});
