import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/item.model';
import { List } from 'src/app/shared/models/list.model';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private readonly BASE_URL: string = `${environment.settings.protocole}${environment.settings.url}:${environment.settings.port}/api`;
  private accessToken: any;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  public getListList(): Observable<any> {
    const url: string = `${this.BASE_URL}/defaultInventory`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.get(url,{ headers: headers });
  }

  public addList(list: List): Observable<any> {
    const url: string = `${this.BASE_URL}/inventory`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.post(url, list, { headers: headers })
  }

  public updateList(list: List): Observable<any> {
    const url: string = `${this.BASE_URL}/inventory/${list.id}`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http
      .put(url, list, { headers: headers })
  }

  public deleteList(list: List): Observable<any> {
    const url: string = `${this.BASE_URL}/inventory/${list.id}`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.delete(url, { headers: headers });
  }

  public getItemList(id?: bigint): Observable<any> {
    const url: string = `${this.BASE_URL}/inventory/items/${id}`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`,
    });
    return this.http.get(url,{ headers: headers });
  }

  public addItem(item: Item): Observable<any> {
    const url: string = `${this.BASE_URL}/item`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.post(url, item, { headers: headers })
  }

  public deleteItem(item: Item): Observable<any> {
    const url: string = `${this.BASE_URL}/item/${item.id}`;
    this.accessToken = this.localStorage.getData('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.delete(url, { headers: headers });
  }
}
