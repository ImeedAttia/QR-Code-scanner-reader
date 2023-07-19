import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticlesService } from 'src/app/Services/articles.service';
import { Artcile } from 'src/app/models/artcile';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent {
  articleFound : Artcile;
  scanned : boolean = false;
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasPermission !: boolean;

  qrResultString : string ="";


  constructor(private _snackBar: MatSnackBar,private articleService : ArticlesService) {
  }



  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.scanned = true;
    console.log(this.qrResultString);
    this.getArticle(this.qrResultString);

  }


  onHasPermission(has: boolean) {
    if(has){
      this.hasPermission = has;
    }else{
      alert("No permission")
    }

  }
  openSticker(){
    this._snackBar.open(
      "Sticker Copied to Clipboard",
      "Close",
      {
        duration: 2000,
        horizontalPosition: "center",
        verticalPosition: "top",
      }
    )
  }


  getArticle(id : string){
    this.articleService.Getarticle(id).subscribe(data => {
      console.log(data)
      this.articleFound = data;
    });
  }

}
