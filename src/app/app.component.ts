 import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { AppFacade } from './app.facade';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppFacade],
})
export class AppComponent {
  vm$: Observable<{
    headers: string[];
    data: Array<any>;
    factor: number;
  }>;

  constructor(private appFacade: AppFacade) {
    this.vm$ = combineLatest({
      headers: appFacade.players$,
      data: appFacade.data$,
      factor: appFacade.factor$,
    });
  }

  onFileSelected(event): void {
    this.appFacade.processFiles(event.target.files);
  }

  onFactorChange(value: string): void {
    this.appFacade.factor = +value;
  }

  onExportClicked(): void {
    this.appFacade.downloadAsCsv();
  }
}
