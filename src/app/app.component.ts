import { getManifest } from '@angular-architects/module-federation';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomManifest, CustomRemoteConfig } from './utils/config';
import { buildRoutes } from './utils/routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shell';
  remotes: CustomRemoteConfig[] = [];

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    const manifest  = getManifest<CustomManifest>();

    // Hint: Move this to an APP_INITIALIZER 
    //  to avoid issues with deep linking
    const routes = buildRoutes(manifest);
    
    this.router.resetConfig(routes);

    this.remotes = Object.values(manifest);
  }
}
