import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsComponent } from './news/news.component';
import { ListComponent } from './news/list/list.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatIconModule, MatDialogModule, MatDividerModule } from '@angular/material';
import { CoreModule } from './core/core.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { AddNewsComponent } from './news/add/add-news.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ArchivedComponent } from './news/archived/archived.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ListComponent,
    AddNewsComponent,
    ArchivedComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    MatDividerModule
  ],
  entryComponents: [
    HeaderComponent,
    FooterComponent,
    ToastComponent,
    AddNewsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
