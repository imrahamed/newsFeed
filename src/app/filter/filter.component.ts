import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
categories: any = ['business', 'entertainment' ,'general', 'health', 'science', 'sports', 'technology'];
listOfOption = [];
model: any = {
  sources : []
};
  data: any;
  datasubscription: any;
  sourcesubscription: any;
  constructor(private dataService: DataService) {
    this.dataService.sourceList();
    this.sourcesubscription = this.dataService.getSourceList().subscribe(data =>{
      this.listOfOption = data.sources;
      console.log(data);
      });
   }

  ngOnInit() {
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // this.datasubscription.unsubscribe();
    this.sourcesubscription.unsubscribe();
}
  countryChanged(event){
    console.log(this.model.country, event);
    
    
  }

  submitquery(){
    this.dataService.sendSource(this.model);
  }

}
