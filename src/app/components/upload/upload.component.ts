import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountingService } from 'src/app/services/accounting.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  fileToUpload: File = null;
  fileName: string = "";
  fileInfo: number = 0;

  constructor(private accountingService: AccountingService, private router: Router) { }

  ngOnInit() {
  }

  handleFileInput(file) {
    this.fileName = file[0].name;
    this.fileInfo = 1;
    if (file[0].type.indexOf('json') > -1) {
      this.fileToUpload = file[0];
      this.fileInfo = 2;
    }
  }

  upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data: string = fileReader.result.toString();
      this.accountingService.setAllData(JSON.parse(data));
      this.router.navigate(['/']);
    }
    fileReader.readAsText(this.fileToUpload);
  }
}
