import { Injectable } from '@angular/core';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { LocalStorageService } from '../services/local-storage.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessage: string = '';

  public user: any;
  private isAndroid = false;

  constructor(private afAuth: AngularFireAuth,
    private storage: LocalStorageService,
    private platform: Platform,
    private router: Router) {
    this.isAndroid = platform.is("android");
    if (!this.isAndroid)
      GoogleAuth.init(); //lee la config clientid del meta de index.html
  }
  public test() {
    //SecureStoragePlugin.set();
    //const message, nonce, path, privateKey; // ...
    //const hashDigest = sha256(nonce + message);
    //const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
  }
  public async loadSession() {
    let user = await this.storage.getItem('user');
    if (user) {
      try{
        user = JSON.parse(user);
        this.user = user;
      }
      catch(error){
        this.user=null;
      }
      
    }
  }
  public async loginGoogle() {
    console.log("entro?");
    let user: User = await GoogleAuth.signIn();
    this.user = user;
    await this.keepSession();
  }
  public async logout() {
    await GoogleAuth.signOut();
    await this.storage.removeItem('user');
    this.user = null;
    this.router.navigate([''])
  }
  public async keepSession() {
    await this.storage.setItem('user', JSON.stringify(this.user));
  }
  public isLogged(): boolean {
    if (this.user) return true; else return false;
  }

  async signIn(email: string, password: string): Promise<boolean> {

    try {
      this.user = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.keepSession();
      return true;
    } catch (error) {

      this.user = null;
      return false;
    }

    return true;
  }

  async logoutMailFB() {
    await this.afAuth.signOut();
    this.router.navigate(['']);
  }

  async createUser(email: string, password: string): Promise<boolean> {

    try {
      this.user = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.keepSession();
      return true;
      
    } catch (error) {
      console.log(error);
      return false;
    }

    return false;
  }
}
