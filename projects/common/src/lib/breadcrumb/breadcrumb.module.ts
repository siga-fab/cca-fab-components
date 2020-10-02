import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BreadcrumbComponent, BreadcrumbItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [BreadcrumbComponent, BreadcrumbItemComponent],
})
export class BreadcrumbModule {}
