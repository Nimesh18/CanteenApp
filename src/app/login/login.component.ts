import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { CanteenSeverApiService } from '../server-api/canteen-sever-api.service';

declare var $: any;
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

  public loading = false;
  showModal = false;
  modalHeader: string;
  modalText: string;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private serverApi: CanteenSeverApiService) { }

  ngOnInit() {
  }

  async login(path) {
    this.loading = true;
    try {
      const response = await this.serverApi.Login();
      if (response) {
        console.log(response);
        this.loading = false;
        this.router.navigate([path]);
      } else {
        this.loading = false;
        this.modalHeader = 'Error';
        this.modalText = 'Unable to identify tag';
        this.show();
      }
    } catch (error) {
      console.log(error);
      this.loading = false;
      this.modalHeader = 'Error';
      this.modalText = 'Unable to identify tag';
      this.show();
    }

    // let response = await this.serverApi.Login(this.loginForm.get('username').value, this.loginForm.get('password').value);
    // if (response == true)
    //   this.router.navigate([path]);


    // TODO: remove the below once the above is made to work
    // if (this.loginForm.get('username').value === 'Nimesh' && this.loginForm.get('password').value === '1') {
    //   this.router.navigate([path]);
    // }

  }

  show() {
    $('#myModal').modal('show');
  }

  hide() {
    $('#myModal').modal('hide');
  }

}
