import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private filterModal = new Subject<any>();
  private dataArray = new Subject<any>();
  api_url = 'https://newsapi.org/v2/top-headlines';
  source_url= 'https://newsapi.org/v2/sources';
  listOfOption: any;
  sourceListEntries= new Subject<any>();
  constructor(private _http: HttpClient, private notification: NzNotificationService) {
   }

  sendSource(model: any) {
    console.log(model);
    if (!(model.sources.length)) {
      delete model.sources;
    }
    Object.keys(model).forEach((key) => (model[key] == null) && delete model[key]);
    const params = new HttpParams({
      fromObject: model
    });
    return this._http.get(this.api_url, {
      params
    }).subscribe(res => {
      this.dataArray.next(res);
    },
    (err) => {
      this.notification.create( 'error',
      'Error Occured',
      err ? err.error.message : 'Soemthing Went Wrong');
    }
    );
  }
  public getMessage(): Observable<any> {
    return this.dataArray.asObservable();
  }

  sendModal(modal: any) {
    this.filterModal.next(modal)
  }
  getModal(): Observable<any> {
    return this.filterModal.asObservable();
  }
  sourceList(){
    return this._http.get(this.source_url).subscribe((res: any) => {
      this.sourceListEntries.next(res);
    });
  }
  public getSourceList(): Observable<any> {
    return this.sourceListEntries.asObservable();
  }
}
