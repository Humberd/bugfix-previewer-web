import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewList } from '../../common/view-list';
import { SprintView } from './view/sprint-view';
import { Observable } from 'rxjs';
import { SprintCreateRequest } from './request/sprint-create-request';
import { SprintUpdateRequest } from './request/sprint-update-request';
import { BugfixView } from '../bugfix/view/bugfix-view';
import { BugfixCreateRequest } from '../bugfix/request/bugfix-create-request';

@Injectable({
  providedIn: 'root',
})
export class SprintDomainService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  readList(): Observable<ViewList<SprintView>> {
    return this.httpClient.get<ViewList<SprintView>>(`${this.baseUrl}/sprints`);
  }

  read(id: string): Observable<SprintView> {
    return this.httpClient.get<SprintView>(`${this.baseUrl}/sprints/${id}`);
  }

  create(body: SprintCreateRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/sprints`, body);
  }

  update(id: string, body: SprintUpdateRequest): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/sprints/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/sprints/${id}`);
  }

  readBugfixesList(id: string): Observable<ViewList<BugfixView>> {
    return this.httpClient.get<ViewList<BugfixView>>(`${this.baseUrl}/sprints/${id}/bugfixes`);
  }

  createBugfix(id: string, body: BugfixCreateRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/sprints/${id}/bugfixes`, body);
  }

}
