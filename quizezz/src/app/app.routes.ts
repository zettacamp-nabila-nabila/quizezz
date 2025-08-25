import { Routes } from '@angular/router';
import { NamePageComponent } from './features/name-page/name-page.component';
import { DoneComponent } from './features/done/done.component';
import { ScoreboardComponent } from './features/scoreboard/scoreboard/scoreboard.component';
import { PlayPageComponent } from './features/play-page/play-page.component';

export const routes: Routes = [
  { path: '', component: NamePageComponent, title: 'Enter Name' },
  { path: 'play', component: PlayPageComponent, title: 'Play' },
  { path: 'done', component: DoneComponent, title: 'All Done' },
  {
    path: 'scoreboard',
    component: ScoreboardComponent,
    title: 'Scoreboard',
  },
  { path: '**', redirectTo: '' },
];
