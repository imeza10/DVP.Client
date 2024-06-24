import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SharedService } from '../../../../../../services/shared.service';
import { GitHubUser } from '../interface/main.interface';
import { ConfigService } from '../../../../../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
      this.configService.getAppConfig();
    }

   searchUsers(query: string): Observable<any> {
    return this.http.get<any>(`${this.configService?.config?.urlApi}/search/users?q=${query}`)
      .pipe(map(response => response.items.slice(0, 10)));
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get<any>(`${this.configService?.config?.urlApi}/users/${username}`);
  }

  // Método que utiliza Promises
  getUserDetailsPromise(username: string): Promise<any> {
    return this.http.get<GitHubUser>(`${this.configService?.config?.urlApi}/users/${username}`).toPromise();
  }
}
