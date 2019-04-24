import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class queryInterceptor implements HttpInterceptor {
  constructor() { }
  //function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //how to update the request Parameters
    
    //logging the updated Parameters to browser's console
    let newParams = new HttpParams({fromString: request.params.toString()});

  // Add any params (can also chain .append() but I was conditionally adding params)
    newParams = newParams.append('apiKey', '72c3c4704a274e2eb1f48315f7584ceb');
    const updatedRequest = request.clone({
        params: newParams
      });
      console.log("Before making api call : ", updatedRequest);
    return next.handle(updatedRequest).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (error instanceof ErrorEvent) {
            console.log("api call error :", error);
          }
        }
      )
    );
  }
}