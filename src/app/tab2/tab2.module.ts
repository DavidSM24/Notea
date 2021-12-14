import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { HeaderModule } from '../components/header/header.module';
import { OCR } from '@ionic-native/ocr/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule
  ],
  providers:[OCR],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
