import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { CanteenSeverApiService } from '../server-api/canteen-sever-api.service';
import { SessionStorageService } from '../session-storage.service';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private serverApi: CanteenSeverApiService,
    private sessionStorage: SessionStorageService) { }

  ngOnInit() {
  }

  async login(path) {
    this.loading = true;
    try {
      const response = await this.serverApi.Login();
      if (response) {
        console.log(response);
        // this.sessionStorage.save('username', response['name']);
        this.sessionStorage.save('username', 'Manuel');
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
  }

  show() {
    $('#myModal').modal('show');
  }

  hide() {
    $('#myModal').modal('hide');
  }

}
