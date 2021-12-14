import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Note } from 'src/app/model/Note';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {

  public formNota: FormGroup;
  public miLoading: HTMLIonLoadingElement;
  public miToast: HTMLIonToastElement;

  @Input() note: Note;
  note2: Note;

  constructor(private authS: AuthService,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private noteS: NoteService,
    private loading: LoadingController,
    private toast: ToastController) {
  }

  ngOnInit() {

    this.formNota = this.fb.group({
      title: [this.note.title, Validators.required],
      description: [this.note.description]
    });

  }

  public async logOut() {
    this.close();
    this.authS.logout();

  }

  close() {
    this.modalCtrl.dismiss();
  }

  public async editNote() {
    let N: Note = {
      key: this.note.key,
      title: this.formNota.get("title").value,
      description: this.formNota.get("description").value
    }

    let id = await this.noteS.add_update_Issue(N);
    
    this.modalCtrl.dismiss({
      newNote:N
    })
  }

  async presentToast(msg: string, clr: string) {
    this.miToast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: clr
    });
    this.miToast.present();
  }

}
