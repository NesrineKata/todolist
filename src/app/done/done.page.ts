import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
