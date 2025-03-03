import { Component } from '@angular/core';
import { MainComponent } from './page-elements/main/main.component';
import { FooterComponent } from './page-elements/footer/footer.component';
import { HeaderComponent } from './page-elements/header/header.component';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, MainComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weblab';
}
