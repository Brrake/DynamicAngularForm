
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PanelService {

    constructor(
        private router: Router
    ) { }
    goTo(path: string, reload = false, reloadPlugins = false, queryParams?: any, scrollToTop = false) {
        return new Promise<void>((resolve) => {
            if (path == 'pannello' || path == 'panel') {
                this.goToPanel(path, reload, reloadPlugins, queryParams, scrollToTop).then(() => resolve());
                return
            }
            this.router.navigate([path], queryParams).then(() => {
                reload ? window.location.reload() : null;
                resolve();
            })
        })
    }
    goToPanel(path: string, reload = false, reloadPlugins = false, queryParams?: any, scrollToTop = false) {
        return new Promise<void>((resolve) => {
            this.router.navigate(['/pannello/' + path], queryParams).then(() => {
                reload ? window.location.reload() : null;
                resolve();
            })
        })
    }
}

