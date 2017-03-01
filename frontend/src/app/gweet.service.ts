import { Injectable }           from '@angular/core';
import { Http, Headers, Jsonp, URLSearchParams } from '@angular/http';
import { Gweet } from './gweet';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GweetService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private gweetsUrl = 'http://localhost:8000/gweets/';
  private usersUrl  = 'http://localhost:8000/get_auth_token/';

  public token = "";

  constructor(private http: Http,
              private jsonp: Jsonp) { }

  getGweets() {
    return this.jsonp
               .get(`${this.gweetsUrl}?format=jsonp&callback=JSONP_CALLBACK`)
               .toPromise()
               .then((response) => response.json().results)
               .catch(this.handleError);
  }

  create(post: string): Promise<Gweet> {
    var auth_headers = this.headers;
    auth_headers.append("Authorization", `Token ${this.token}`);
    return this.http
               .post(this.gweetsUrl, JSON.stringify({text: post}), {headers: auth_headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  login(username: string, password: string) {
    this.http
        .post(this.usersUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
        .toPromise()
        .then(res => this.token = res.json().token)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
