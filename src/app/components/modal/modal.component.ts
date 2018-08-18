import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() modalHeader: string;
  @Input() modalText: string;

  constructor() { }

  ngOnInit() {
  }

}
