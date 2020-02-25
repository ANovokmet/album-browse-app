import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListItemFieldComponent } from './list-item-field/list-item-field.component';

@NgModule({
  declarations: [ListComponent, ListItemComponent, ListItemFieldComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
