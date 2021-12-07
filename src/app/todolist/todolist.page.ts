import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {

  tasks = [];
  userEmail: string;
  
  constructor(
   private navCtrl: NavController,

    public afDB: AngularFireDatabase, private authService: AuthenticateService
  ) {}
ngOnInit(){
  this.authService.userDetails().subscribe(res => {
    console.log('res', res);
    if (res !== null) {
      this.userEmail = res.email;
    } else {
      this.navCtrl.navigateBack('');
    }
  }, err => {
    console.log('err', err);
  })
  this.getTasks();

}
logout() {
  this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
}
  //Get list of tasks to update badge of current user
  getTasks() {
    this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      actions.forEach(action => {
        console.log(action.payload.exportVal().email);
        if(action.payload.exportVal().email==this.userEmail)
        this.tasks.push({
          key: action.key,
          text: action.payload.exportVal().text,
          hour: action.payload.exportVal().date.substring(11, 16),
          checked: action.payload.exportVal().checked
        });
      });
    });
  }
}