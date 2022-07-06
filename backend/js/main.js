//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        users: [
            {accountn: '3333', pin: '3333', balance: 0, status: 1},//admin
            {accountn: '1234', pin: '1234', balance: 600000, status: true},
            {accountn: '5678', pin: '5678', balance: 1000000, status: true},
            {accountn: '9012', pin: '9012', balance: 14000000, status: true},
            {accountn: '3456', pin: '3456', balance: 850000, status: false},
        ],
        admin: [
            {accountn: '3333', pin: '3333', balance: 0, status: 1},//admin
        ],
        tcash: [
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
        admvw: 0,//change it to zero value to hide the admin view or to 1 to display the admin view
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
            this.admvw = 0;//change it to zero value to hide the admmin view or to 1 to display the admmin view
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
            this.click_w = false;
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
            }else if(this.click_w === true){
                this.w_amount = '';
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
            }else if(index === -1){
                alert("The account doesn't exists");
                this.cancel();
            }

            if(this.pin === this.users[index].pin && this.accountn === this.users[index].accountn && this.pin.length > 0){

                if(this.users[index].pin === this.users[0].pin && this.users[index].accountn === this.users[0].accountn){
                    this.admvw = 1;
                }

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

                    if(this.wdrvw === 1 && parseInt(this.w_amount) <= this.users[index].balance && parseInt(this.w_amount) > 0 && parseInt(this.w_amount) <= this.total) {
                        this.w_amount = parseInt(this.w_amount);
                        this.withdraw();
                        this.cancel();
                    }else if(parseInt(this.w_amount) > this.users[index].balance || parseInt(this.w_amount) > this.total){
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
            alert(`Your balances is: ${this.users[this.pos].balance}`);
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
                    alert(`Your balances is: ${this.users[this.pos].balance}`);
                }
            }else{
                alert('The destination account does not exist');
            }
            
        },
        withdraw(){

            let b50 = 0;
            let b20 = 0;
            let b10 = 0;

            if(parseInt(this.total) - this.w_amount <= 0){
            total = 0;
            }
            if(this.w_amount <= parseInt(this.total)){
                b50 = Math.trunc(this.w_amount/50000);
                this.w_amount = this.w_amount % 50000;
                if(b50 >= this.tcash[0].amount){
                    this.w_amount += (b50-this.tcash[0].amount)*50000;
                    b50 = this.tcash[0].amount;
                }
                b20 = Math.trunc(this.w_amount/20000);
                this.w_amount = this.w_amount % 20000;
                
                if(b20 >= this.tcash[1].amount){
                    this.w_amount += (b20 - this.tcash[1].amount)*20000;
                    b20 = this.tcash[1].amount
                }

                b10 = Math.trunc(this.w_amount/10000);
                this.w_amount = this.w_amount % 10000;
                console.log(b10);
                console.log(this.w_amount);
                if(b10 >= this.tcash[2].amount){
                    this.w_amount += (b10 - this.tcash[2].amount)*10000;
                    b10 = this.tcash[2].amount
                    console.log(b10);
                    console.log(this.w_amount);
                }

                if(this.w_amount === 0){
                    this.tcash[0].amount -= b50;
                    this.tcash[1].amount -= b20;
                    this.tcash[2].amount -= b10;
                    this.total = this.tcash.map(item => item.denom * item.amount).reduce((a, b) => a + b, 0);
                    this.users[this.pos].balance -= (b50*50000+b20*20000+b10*10000);
                    alert(`Successfull withdrawal, you have received: 50.000 bill (${b50}), 20.000 bill (${b20}), 10.000 bill (${b10})`);
                    alert(`Your balances is: ${this.users[this.pos].balance}`);
                    this.cancel();
                }else{
                    alert("Invalid amount");
                    this.cancel();
                }
            
            }

        },

    },
    beforeMount(){
        this.total = this.tcash.map(item => item.denom * item.amount).reduce((a, b) => a + b, 0);
    }
});
