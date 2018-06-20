import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    if(localStorage.getItem('language') != null){
      translate.setDefaultLang(localStorage.getItem('language'));
    } else{
      translate.setDefaultLang('en');
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
