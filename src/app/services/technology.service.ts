import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Technology {
  id: number;
  name: string;
  category: string;
  ring: string;
  description: string;
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

  updateTechnology(id: number, technology: Technology): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, technology);
  }

  deleteTechnology(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
