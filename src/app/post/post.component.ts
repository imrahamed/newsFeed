import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  datasubscription: any;
  data: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.datasubscription = this.dataService.getMessage().subscribe(data =>{
      this.data = data.articles;
      console.log(data);
      });
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.datasubscription.unsubscribe();
}
}
