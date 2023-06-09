import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NgChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';
import { IconModule } from '../icon.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAgoPipe } from './pipes/date-ago.pipe';

@NgModule({
  declarations: [DateAgoPipe],
  imports: [
    CommonModule,
    MaterialModule,
    IconModule,
    ColorPickerModule,
    NgChartsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    IconModule,
    NgChartsModule,
    ColorPickerModule,
    ReactiveFormsModule,
    DateAgoPipe,
  ],
})
export class SharedModule {}
