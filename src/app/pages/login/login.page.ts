import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public formLogin:FormGroup;
  public formRegister:FormGroup;
  public userinfo:User;
  private isAndroid:boolean;
  
  constructor(private fb:FormBuilder,
    private platform:Platform,
    private authS:AuthService,
    private router:Router,
    private toast:ToastController) {

      this.formRegister=this.fb.group({
        regmail:["",Validators.required],
        regpass:["",Validators.required],
        username:["",Validators.required],
        repeat:["",Validators.required]
      });

      this.formLogin=this.fb.group({
        mail:["",Validators.required],
        pass:["",Validators.required]
      });
  }

  ngOnInit() {
    if(this.authS.isLogged()){
      this.router.navigate(['private/tabs/tab1']);
    }
  }

  ionViewWillEnter(){
    if(this.authS.isLogged){
      this.router.navigate(['private/tabs/tab1']);
    }
  }
  public async loginGoogle() {
    try {
      await this.authS.loginGoogle();
      this.router.navigate(['private/tabs/tab1']);
    } catch (err) {
      console.error(err);
    }
  }

  public async loginMail(){
    
    let mail:string=this.formLogin.get('mail').value;
    let password:string=this.formLogin.get('pass').value;

    if(
      password==('')
      ||mail==('')
    ){
      this.presentToast("Debe introducir todos los campos.","danger");
    }
    
    else{
      try {
        let result:boolean=await this.authS.signIn(this.formLogin.get("mail").value,this.formLogin.get("pass").value);
        if(result){
          this.router.navigate(['/private/tabs/tab1']);
        }
        else{
          this.presentToast("El usuario o contraseña son incorrectos.","danger");
        }
      } catch (error) {
        console.log(error);
      }
    }  
  }

  public async create(){
    let valid:boolean=true;
    
    let username:string=this.formRegister.get('username').value;
    let password:string=this.formRegister.get('regpass').value;
    let repeat:string=this.formRegister.get('repeat').value;
    let mail:string=this.formRegister.get('regmail').value;

    if(
      
      username==('')
      ||password==('')
      ||repeat==('')
      ||mail==('')
      
    ){
      
      this.presentToast("Debe rellenar todos los campos.","danger");
      valid=false;
      
    }

    else{

      console.log("entro?")
      
      if(password.match(repeat)){
        
        if(password.length<6){
          this.presentToast("La contraseña debe ser al menos de 6 caracteres.","danger");
          valid=false;
        }
        
        else if(!mail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
          this.presentToast("La dirección de correo introducida es inválida.","danger");
          valid=false;
        }
      }

      else{
        this.presentToast("Las contraseñas no coinciden.","danger");
        valid=false;
      }
    }

    if(valid){
      try {
        let result=await this.authS.createUser(mail,password);
        if(result){
          this.router.navigate(['private/tabs/tab1'])
          this.presentToast("Su cuenta se ha creado con éxito ¡Bienvenido a Notea!","success");

        }
        else{
          this.presentToast("Este correo ya está en uso.","danger");

        }
      } catch (error) {
        console.log(error);
        this.presentToast("Ha ocurrido un error.","danger");
      }
    }
    
  }
  
  async presentToast(msg:string,clr:string) {
    const miToast = await this.toast.create({
      message: msg,
      duration: 2000,
      color:clr
    });
    miToast.present();
  }

}


