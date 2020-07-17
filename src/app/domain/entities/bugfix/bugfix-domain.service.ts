import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViewList } from '../../common/view-list';
import { BugfixView } from './view/bugfix-view';
import { BugfixUpdateRequest } from './request/bugfix-update-request';

@Injectable({
  providedIn: 'root',
})
export class BugfixDomainService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
  }

  read(id: string): Observable<ViewList<BugfixView>> {
    return this.httpClient.get<ViewList<BugfixView>>(`${this.baseUrl}/bugfixes/${id}`);
  }

  update(id: string, body: BugfixUpdateRequest): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/bugfixes/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/bugfixes/${id}`);
  }
}
