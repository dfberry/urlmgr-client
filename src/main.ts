import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (process.env.ENV==='production') {
  enableProdMode();
} else {
  console.log("development mode");
}

platformBrowserDynamic().bootstrapModule(AppModule);
