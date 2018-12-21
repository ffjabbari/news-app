import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ArchivedComponent } from './news/archived/archived.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: HeaderComponent, children: [
      { path: '', redirectTo: 'news', pathMatch: 'full'},
      { path: 'news', component: NewsComponent },
      { path: 'news/archived', component: ArchivedComponent },
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '404'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
