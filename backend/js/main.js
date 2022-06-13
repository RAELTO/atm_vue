//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        users: [
            {accountn: '1234', pin: '1234', balance: 600000, status: true},
            {accountn: '5678', pin: '5678', balance: 1000000, status: true},
            {accountn: '9012', pin: '9012', balance: 1400000, status: true},
            {accountn: '3456', pin: '3456', balance: 850000, status: false},
        ],
        admin: [
            {accountn: '3333', pin: '3333', balance: 0, status: 1},//admin
        ],
        tcash: [
            {denom: 100000, amount: 50},
            {denom: 50000, amount: 50},
            {denom: 20000, amount: 50},
            {denom: 10000, amount: 50}
        ],
        total: '',
        pin: '',
        accountn: '',
        click_acc: false,
        click_pin: false,
        //login 
        disp_marq: 1, //display marquee
        disp_pininp: 0,//display pin input
        disp_accinp: 1,// display account input
        attempts: 3,//it will block an account if the counter gets to zero
        //users view
        uservw: 0,
        options: 0,
        depovw: 0,
        tfvw: 0,
        wdrvw: 0,
        pos: 0,
        daccountn: '',
        trf_amount: '',
        w_amount: '',
        click_depinp: false, //links the input with numerical buttons - deposit
        depos: '',
        click_trinp: false,//links the input with numerical buttons - transfer amount
        click_trdest: false,//links the input with numerical buttons - destination account
        click_w: false,//links the input with numerical buttons - withdrawals
        //adminview
        admvw: 0,//shows the admin view where the total cash in atm is displayed 
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

            if (this.click_depinp === true) {
                this.depos += n;
            }else{
                this.depos = this.depos;
            }

            if (this.click_trdest === true && this.daccountn.length <= 3) {
                this.daccountn += n;
            }else{
                this.daccountn = this.daccountn;
            }

            if(this.click_trinp === true){
                this.trf_amount += n;
            }else{
                this.trf_amount = this.trf_amount;
            }

            if(this.click_w === true) {
                this.w_amount += n;
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
        dinp(){
            this.click_depinp = true;
            this.click_trinp = false;
            this.click_trdest = false;
            this.click_w = false;
        },
        withdrinp(){
            this.click_depinp = false;
            this.click_trinp = false;
            this.click_trdest = false;
            this.click_w = true;
        },
        trinp(){
            this.click_depinp = false;
            this.click_trinp = true;
            this.click_trdest = false;
            this.click_w = false;
        },
        trdestinp(){
            this.click_depinp = false;
            this.click_trinp = false;
            this.click_trdest = true;
            this.click_w = false;
        },
        userview(){
            this.uservw = 1;
        },
        adminview(){
            this.admvw = 1;
        },
        cancel(){
            this.uservw = 0;
            this.admvw = 1;//--
            this.disp_marq = 1;
            this.disp_accinp = 1;
            this.disp_pininp = 0;
            this.click_acc = false;
            this.click_pin = false;
            this.accountn = '';
            this.pin = '';
            this.depovw = 0;
            this.tfvw = 0;
            this.wdrvw = 0;
            this.options = 0;
            this.trf_amount = '';
            this.w_amount = '';
            this.daccountn = '';
            this.click_trdest = false;
            this.click_trinp = false;
        },
        clear(){
            //with the same views restart the input values
            if(this.click_acc === true){
                this.accountn = '';
                this.click_acc = false;
            }else if(this.click_pin === true){
                this.pin = '';
                this.click_acc = false;
            }else if(this.click_depinp === true){
                this.depos = '';
                this.click_depinp = false;
            }else if(this.click_trdest === true){
                this.daccountn = '';
            }else if(this.click_trinp === true){
                this.trf_amount = '';
            }
        },
        enter(){

            const index = this.users.findIndex((object) => {
                return object.accountn == this.accountn;
            });

            if(index != -1 && this.accountn.length > 0){
                this.disp_pininp = 1;
                this.disp_accinp = 0;
                this.accountn = this.accountn;
            }else{
                alert("The account doesn't exists");
                this.cancel();
            }

            if(this.pin === this.users[index].pin && this.accountn === this.users[index].accountn && this.pin.length > 0){

                if (this.users[index].status === false) {
                    alert('Your account is blocked');
                    this.cancel();
                }else{
    
                    this.disp_pininp = 0;
                    this.click_pin = false;
                    this.attempts = 3;
                    this.uservw = 1;
                    this.options = 1;
                    this.disp_marq = 0;
                    this.pos = index;
                    
                    if (this.depovw === 1 && this.depos.length > 0) {
                        this.uservw = 0;
                        this.options = 0;
                        this.deposit();
                        this.cancel();
                    }
                    
                    if(this.tfvw === 1 && this.daccountn.length > 0 && this.trf_amount.length > 0 && this.trf_amount <= this.users[index].balance) {
                        this.uservw = 0;
                        this.options = 0;
                        this.transfer();
                        this.cancel();
                    }else if(parseInt(this.trf_amount) > this.users[index].balance){
                        alert('Insufficient funds');
                        this.cancel();
                    }

                    if(this.wdrvw === 1 && parseInt(this.w_amount) <= this.users[index].balance && parseInt(this.w_amount) > 0) {
                        this.withdraw();
                        this.cancel();
                    }else if(parseInt(this.w_amount) > this.users[index].balance){
                        alert('Insufficient funds');
                        this.cancel();
                    }

                }

            }else if(this.accountn === this.users[index].accountn && this.pin != this.users[index].pin && this.pin.length > 0){
                this.attempts -= 1;
                alert(`Incorrect password, your account will be blocked if you fail ${this.attempts} times more`);
                if(this.attempts <= 0){
                    this.users[index].status = false;
                    alert(`Your account has been blocked`);
                    this.cancel();
                }
            }
            

        },
        depositvw(){
            this.depovw = 1;
            this.options = 0;
        },
        transfervw(){
            this.tfvw = 1;
            this.options = 0;
        },
        withdrawvw(){
            this.wdrvw = 1;
            this.options = 0;
        },
        deposit(){
            this.users[this.pos].balance +=  parseInt(this.depos);
            alert(`$${this.depos} were successfully deposited into you account`);
            this.depos = '';
            this.click_depinp = false;
            this.cancel();
        },
        transfer(){
            const destination = this.users.findIndex((object) => {
                return object.accountn == this.daccountn;
            });

            if (destination != -1) {
                if(this.daccountn === this.users[this.pos].accountn){
                    alert('The destination account cannot be your own account');
                    this.cancel();
                }else{
                    this.users[this.pos].balance -= parseInt(this.trf_amount);
                    this.users[destination].balance += parseInt(this.trf_amount);
                    alert(`$ ${this.trf_amount} were successfully send to the account ${this.daccountn}`);
                }
            }else{
                alert('The destination account does not exist');
            }
            
        },
        withdraw(){
            this.users[this.pos].balance -= parseInt(this.w_amount);
            this.total -= parseInt(this.w_amount);
            alert('Successful withdrawal');
            this.cancel();
        },

    },
    beforeMount(){
        this.total = this.tcash.map(item => item.denom * item.amount).reduce((a, b) => a + b, 0);
    }
});
