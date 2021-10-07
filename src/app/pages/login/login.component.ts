import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   user = {
		login: 'admin',
		pwd: 'admin'
	};
  ui = {
		shake:false
	};
  //login="";
  pwd="";
  alert={type:'',message:''}

  email: string="";
  password: string="";

  constructor() { }

  ngOnInit(): void {
  }
  /*loginaction(){
		if(this.login == this.user.login && this.pwd == this.user.pwd){
			this.alert = {
				type: 'good',
				message: 'Welcome ! Your are logged ' + this.user.login
			};
			console.log(this.alert);
			//todo go to
		}
		else{
			this.alert = {
				type: 'error',
				message: 'Warning ! Your account does not appear to exist'
			};
			this.ui.shake = true;
			console.log(this.alert);
		}

		  if(this.ui.shake == true){
        setTimeout(() => {
					this.ui.shake = false;
        }, 1000);

			}
	};*/
  login() {
    console.log(this.email);
    console.log(this.password);
  }
}
