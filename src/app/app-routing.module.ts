import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { HomeComponent } from './Components/home/home.component';
import { ScanComponent } from './Components/scan/scan.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { GeneratorComponent } from './Components/generator/generator.component';
import { ArticlesComponent } from './Components/articles/articles.component';

const routes: Routes = [
  {path : "scan" , component : ScannerComponent},
  {path : "Home" , component : HomeComponent},
  {path : "Scan" , component : ScanComponent},
  {path : "Login" , component : LoginComponent},
  {path : "" , redirectTo : "/Home" , pathMatch : "full"},
  {path : "Generate" , component : GeneratorComponent},
  {path : "Articles" , component : ArticlesComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
