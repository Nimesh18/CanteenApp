import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { SessionStorageService } from '../../session-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private sessionStorage: SessionStorageService) { }

  ngOnInit() {
  }

  isActive(path: string) {
    return this.router.url.includes(path);
  }

  Logout(path: string) {
    this.sessionStorage.clear('username');
    this.router.navigate([path]);
  }
}
