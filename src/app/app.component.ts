import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private langsAvailable=['es','en'];
  constructor(private traductor:TranslateService,
    private storage:LocalStorageService,
    private authS:AuthService) {
    
    (async() =>{
      let lang= await storage.getItem("lang");
      if(lang==null){
        lang=this.traductor.getBrowserLang();
      }else{
        lang=lang.lang;
      }
      console.log("SETEANDO "+lang)
      if(this.langsAvailable.indexOf(lang)>-1){
        traductor.setDefaultLang(lang);
      }else{
        traductor.setDefaultLang('en');
      }
    })();

    
  }
  async ngOnInit() {
    await this.authS.loadSession();
  }
}
