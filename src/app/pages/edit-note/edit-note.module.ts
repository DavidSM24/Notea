import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNotePageRoutingModule } from './edit-note-routing.module';

import { EditNotePage } from './edit-note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditNotePageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EditNotePage]
})
export class EditNotePageModule {}
