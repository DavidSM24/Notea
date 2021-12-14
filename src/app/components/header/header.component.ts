import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo:string ='';

  constructor(private authS:AuthService) {}

  public async logOut(){
    this.authS.logout();
  }

  ngOnInit() {}

}
