import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Note } from '../model/Note';
import { NoteService } from '../services/note.service';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { OCR, OCRResult, OCRSourceType } from '@ionic-native/ocr/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public formNota: FormGroup;
  public miLoading: HTMLIonLoadingElement;
  private miToast: HTMLIonToastElement;

  public img_path:string;
  public text:string;

  constructor(private fb: FormBuilder,
    private noteS: NoteService,
    private loading: LoadingController,
    private toast: ToastController,
    private ocr: OCR) {

    this.formNota = this.fb.group({
      title: ["", Validators.required],
      description: [""]
    });
  }

  async presentLoading() {
    this.miLoading = await this.loading.create({
      message: ''
    });
    await this.miLoading.present();
  }

  async presentToast(msg: string, clr: string) {
    this.miToast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: clr
    });
    this.miToast.present();
  }

  ionViewDidEnter() {
  }

  public async addNote() {
    let newNote: Note = {
      title: this.formNota.get("title").value,
      description: this.formNota.get("description").value
    }
    await this.presentLoading();
    try {
      let id = await this.noteS.add_update_Issue(newNote);
      this.miLoading && this.miLoading.dismiss();
      await this.presentToast("Nota agregada correctamente", "success");
      this.formNota.reset();
    } catch (err) {
      this.miLoading && this.miLoading.dismiss();
      await this.presentToast("Error agregando nota", "danger");
    }

  }

  public async hazFoto(){
    let options:ImageOptions={
      resultType:CameraResultType.Uri,
      allowEditing:false,
      quality:90,
      source:CameraSource.Camera
    }
    let result:Photo = await Camera.getPhoto(options);
    this.img_path=result.path;
    this.getImageText();

  }

  async getImageText(){
    await this.ocr.recText(OCRSourceType.NORMFILEURL, this.img_path)
  .then((res: OCRResult) => {
    let result=res.blocks.blocktext;
    let final_text:string="";
    for(let s of result){
      final_text+=s+" ";
    }
    //this.text=final_text; //<---- this.formNota.
    this.formNota.get("description").setValue(final_text);

  })
  .catch((error: any) => console.error(error));
  }

}
