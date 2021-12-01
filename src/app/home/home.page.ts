import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentDate: string;
  addTask: boolean;
  tasks = [];
  myTask = '';
  userEmail: string;
  
  constructor(
    private navCtrl: NavController,

    public afDB: AngularFireDatabase, private authService: AuthenticateService

  ) {
    const date = new Date();
    //const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('fr-FR',{ weekday: 'long', month: 'long', day: 'numeric' });
    this.getTasks();

  }
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
  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }

  addTaskToFirebase() {
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      email:this.userEmail,
      date: new Date().toISOString(),
      checked: false
    });
    this.showForm();
  }

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

  changeCheckState(ev: any) {
    console.log('checked: ' + ev.checked);
    this.afDB.object('Tasks/' + ev.key + '/checked/').set(ev.checked);
  }

  deleteTask(task: any) {
    this.afDB.list('Tasks/').remove(task.key);
  }

}
