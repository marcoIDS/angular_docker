import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listFormGroup : FormGroup;
  songs:any;
  isNew=true;
  isEdit=false;
  id:any;

  constructor(
    private API : ApiService,    
    private formBuilder : FormBuilder,
  ){
    this.listFormGroup = this.formBuilder.group({    
      'artist' : ['',Validators.required],  
      'title': ['',Validators.required], 
    });    
  }
  ngOnInit(){
    this.API.getAll().subscribe(response =>{
      console.log(response);
      this.songs = response.songs;
    },error =>{
      console.log(error)
    })
  }

  create(){
    console.log(JSON.stringify(this.listFormGroup.value))
    this.API.create(JSON.stringify(this.listFormGroup.value)).subscribe(response =>{
      console.log(response);
      this.ngOnInit();
    },error =>{
      console.log(error)
    })
  }

  update(item){
    this.isNew=false;
    this.isEdit=true;
    this.id=item.id;
    this.listFormGroup.get('title').setValue(item.title);
    this.listFormGroup.get('artist').setValue(item.artist);    
  }

  edit(){
    this.API.update(JSON.stringify(this.listFormGroup.value),this.id).subscribe(response =>{
      console.log(response);
      this.listFormGroup.get('title').setValue("");
      this.listFormGroup.get('artist').setValue("");
      this.isNew=true;
      this.isEdit=false;
      this.ngOnInit();
    },error =>{
      console.log(error)
    })
  }

  delete(id){    
    this.API.detele(id).subscribe(response =>{
      console.log(response);
      this.ngOnInit();
    },error =>{
      console.log(error)
    })
    
  }

}
