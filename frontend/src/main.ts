import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { NavbarComponent } from './app/componentes/navbar/navbar.component';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers!,
    NavbarComponent 
  ]
}).catch((err) => console.error(err));