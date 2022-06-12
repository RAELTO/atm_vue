//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        users: [
            {accountn: '3333', pin: '3333', balance: 0, status: 1},//admin
            {accountn: '1234', pin: '1234', balance: 0, status: 1},
            {accountn: '5678', pin: '1234', balance: 0, status: 1},
            {accountn: '9012', pin: '1234', balance: 0, status: 1},
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

            if(n === 11 && this.accountn.length > 0){
                this.disp_accinp = 0;

                this.disp_pininp = 1;
                alert();
            }else{

            }

            /*const index = users.findIndex((object, index, users) => {
                return object.accountn == this.accountn;
            });
            
            if(index != -1){
                this.disp_pininp = 1;
            if(pin === users[index].pin){
                console.log("Valid pin, entering in user view...");
            }else{
                console.log("incorrect pin 2 attempts left..")
            }
            }else{
            console.log("The account doesn't exists");
            }*/

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
        }
    }
});
