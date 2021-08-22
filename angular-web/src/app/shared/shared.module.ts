import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    EditorModule
  ],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxMaskModule,
    EditorModule
  ]
})
export class SharedModule { }
