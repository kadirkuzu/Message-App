import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {
  }

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(environment.api + url)
  }

  post<T>(url: string, body = {}): Observable<T> {
    return this.httpClient.post<T>(environment.api + url , body)
  }

  put<T>(url: string, body = {}): Observable<T> {
    return this.httpClient.put<T>(environment.api + url , body)
  }

  delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(environment.api + url)
  }
}
