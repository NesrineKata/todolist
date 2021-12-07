import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  constructor(  private authService: AuthenticateService) { }

  ngOnInit() {
  }
  reset(value){
    console.log(value);
    this.authService.resetPasswordInit(value.email);
  }
}
