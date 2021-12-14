
// COMO REFERENCIA DE IMAGEN

import { Component, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { IonToggle } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../services/local-storage.service';
import { OCR, OCRResult, OCRSourceType } from '@ionic-native/ocr/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('mitoogle',{static:false}) mitoogle:IonToggle;
  public image:any;
  public img_path:string;
  public text:string;

  constructor(private traductor:TranslateService,
    private storage:LocalStorageService,
    private ocr: OCR) {

  }

  async ionViewDidEnter(){
    const lang=this.traductor.getDefaultLang();
    if(lang=='es'){
      this.mitoogle.checked=false;
    }else{
      this.mitoogle.checked=true;
    }
  }
  public async cambiaIdioma(event){
    console.log(event)
    if(event && event.detail && event.detail.checked){
      await this.storage.setItem('lang',{lang:'en'});
      this.traductor.use('en');
    }else{
      await this.storage.setItem('lang',{lang:'es'});
      this.traductor.use('es');
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
    this.image=result.webPath;
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
    this.text=final_text;

  })
  .catch((error: any) => console.error(error));
  }
}
