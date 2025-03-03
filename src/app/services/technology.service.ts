import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Technology {
  id: number;
  name: string;
  category: string;
  ring: string;
  description: string;
  is_draft: number;
  created_at: Date | null;
  modified_at: Date | null;
  published_at: Date | null;
}

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  private apiUrl = 'http://localhost:3001/api/technologies'; // Falls nötig, aus environment.ts laden

  constructor(private http: HttpClient) {}

  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(this.apiUrl);
  }

  getTechnologyById(id: number): Observable<Technology> {
    return this.http.get<Technology>(`${this.apiUrl}/${id}`);
  }

  addTechnology(technology: Technology): Observable<Technology> {
    return this.http.post<Technology>(this.apiUrl, technology);
  }

  updateTechnology(technology: Technology): Observable<any> {
    technology = { ...technology, modified_at: new Date() };
    return this.http.put(`${this.apiUrl}/${technology.id}`, technology);
  }

  deleteTechnology(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
