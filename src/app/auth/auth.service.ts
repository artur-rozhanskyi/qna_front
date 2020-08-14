import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthParams } from '../shared/auth.interface';
import { User } from '../shared/user.model';
import { environment } from 'src/environments/environment';
import { Token } from '../shared/token.interface';
import { Profile } from '../shared/profile.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  getToken(authParams: AuthParams) {
    return this.http.post<Token>(`${this.apiUrl}/oauth/token.json`, {
      ...authParams,
      grant_type: 'password',
    });
  }

  signUp(signUpParams: AuthParams) {
    return this.http.post<User>(`${this.apiUrl}/api/v1/users.json`, {
      user: { ...signUpParams },
    });
  }

  getUser() {
    return this.http.get<User>(`${this.apiUrl}/api/v1/users/me.json`);
  }

  forgotPassword(forgotPasswordParams: AuthParams) {
    return this.http.post(`${this.apiUrl}/api/v1/users/password.json`, {
      user: { ...forgotPasswordParams },
    });
  }

  resetPassword(resetPasswordParams: AuthParams) {
    return this.http.patch(`${this.apiUrl}/api/v1/users/password.json`, {
      user: { ...resetPasswordParams },
    });
  }

  updateProfile(user: User, profileParams: Profile) {
    return this.http.patch<User>(
      `${this.apiUrl}/api/v1/users/${user.id}/profile.json`,
      {
        profile: profileParams,
      }
    );
  }

  constructor(private http: HttpClient) {}
}
