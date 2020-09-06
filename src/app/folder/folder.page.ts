import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  incial=true;

  data: any;
  data2
  items
  result=false;
  barcodeData
  constructor(private barcodeScanner: BarcodeScanner, private http: HttpClient, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  scan() {
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      this.incial=false
      console.log('Barcode data', barcodeData);
      this.data = barcodeData;
      this.barcodeData=JSON.stringify(barcodeData)
      this.callService(this.data)
    }).catch(err => {
      console.log('Error', err);
    });
  }

  nuevoLogin(){
    this.incial=true;
    this.result=false;
  }
  callService(e) {
    var data = {
      "user_secret": "AF02F874-E255-4523-9ED0-3169B5651F1D",
      "token": e.text,
      "latitude": 0,
      "longitude": 0,
    };
    this.data2 = JSON.stringify(data);

    // let headers = new Headers(); 
    this.http.post<any>('https://la14.epik.com.co:6620/api/v1/device', data).subscribe(
      result => {
        // Handle result
        if(result.error==0){
          this.result=true;
        }else{
          this.result=false;
        }
      },
      error => {
          alert(JSON.stringify(error));
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }
}
