import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { ArticlesService } from 'src/app/Services/articles.service';
import { Artcile } from 'src/app/models/artcile';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  list :any[] =[];
  changing : string = "";
  newArticle : Artcile={
    code_article : "",
    client : "",
    texte_marquage : ""
  };
  public myAngularxQrCode: string = "cvbnvghjklmù";
  public qrCodeDownloadLink: SafeUrl = "";
constructor(private articleService : ArticlesService,private sanitizer: DomSanitizer){

  this.articleService.GetarticlesList().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      )
    )
  ).subscribe(data => {
    this.list = data;
    console.log(data)
  });
}

public qrCodeDownloadLinks: { [key: string]: SafeUrl } = {};

onChangeURL(url: SafeUrl, item: any) {
  this.qrCodeDownloadLinks[item.id] = url;
}

getQrCodeDownloadLink(item: any): SafeUrl {
  return this.qrCodeDownloadLinks[item.id];
}


deleteArticle(id : string){
  console.log(id)
  this.articleService.Deletearticle(id);
}

openModel(item : any){
  this.changing = item.id;
  this.newArticle = item;
}

onSubmit(){
  if(this.changing ==""){
    this.articleService.Addarticle(this.newArticle).then((res :any)=>{
      alert("Added Succefully")
    }).catch((error :any)=>{
      alert(error);
    })
  }else{
    this.articleService.Updatearticle(this.changing,this.newArticle).then((res :any)=>{
      console.log(res);
    }).catch((error : any)=>{
      alert(error)
    })
  }
}

openModelCreate(){
  this.newArticle={
    code_article : "",
    client : "",
    texte_marquage : ""
  };
  this.changing = "";
}
}
