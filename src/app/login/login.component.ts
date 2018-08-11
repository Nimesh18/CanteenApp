import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { CanteenSeverApiService } from '../server-api/canteen-sever-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private serverApi: CanteenSeverApiService) { }

  ngOnInit() {
  }

  async signin(path) {
    // let response = await this.serverApi.Login(this.loginForm.get('username').value, this.loginForm.get('password').value);
    // if (response == true)
    //   this.router.navigate([path]);

    // TODO: remove the below once the above is made to work
    if (this.loginForm.get('username').value === 'Nimesh' && this.loginForm.get('password').value === '1') {
      this.router.navigate([path]);
    }

  }

}
