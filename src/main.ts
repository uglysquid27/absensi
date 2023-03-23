import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'tw-elements';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
