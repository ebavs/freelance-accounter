import { Component, OnInit } from '@angular/core';
import { AccountingService } from 'src/app/services/accounting.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  constructor(private accountingService: AccountingService) { }

  ngOnInit() {
  }

  downloadJson() {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const data = JSON.stringify(this.accountingService.readStore());
    const element = this.setting.element.dynamicDownload;
    const fileType = 'text/json';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(data)}`);
    element.setAttribute('download', 'freelanceAccounting.json');

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  // reference : https://stackoverflow.com/a/51806624/7291379
  // author : UnluckyAj
  //  private dyanmicDownloadByBlob(arg: {
  //   fileName: string,
  //   text: string
  // }) {
  //     const fileType = arg.fileName.indexOf('.json') > -1 ? 'application/json' : 'text/plain';
  //   var blob = new Blob([arg.text], { type: fileType });
  //   var url = window.URL.createObjectURL(blob);
  //   var pwa = window.open(url);
  //   if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
  //       alert('Please disable your Pop-up blocker and try again.');
  //   }
  // }
}
