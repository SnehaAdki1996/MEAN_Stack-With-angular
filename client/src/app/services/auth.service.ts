import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: Http) {}

  //this line is used to run the server
  domain = "http://localhost:3000";
  registerUser(user) {
    return this.http.post(this.domain + "/authentication/register", user);
  }
}
