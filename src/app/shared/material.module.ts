import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatSliderModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDialogModule,
  ],
  exports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatSliderModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDialogModule,
  ],
  providers: [MatIconRegistry],
})
export class MaterialModule {}
