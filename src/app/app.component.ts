import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  router: Router;
  constructor(private translate: TranslateService, private _router: Router) {
    if(localStorage.getItem('language') != null){
      translate.setDefaultLang(localStorage.getItem('language'));
    } else{
      translate.setDefaultLang('en');
    }
    this.router = _router;
    console.log(this.router.url);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
