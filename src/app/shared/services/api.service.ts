import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../types/user.type';
import { Event } from '../types/event.type';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);

  private readonly USERS_URL = 'https://raw.githubusercontent.com/felipeRAMOS2612/ciclo-de-vida-angular/main/users.json';
  private readonly EVENTS_URL = 'https://raw.githubusercontent.com/felipeRAMOS2612/ciclo-de-vida-angular/main/events.json';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.USERS_URL).pipe(
      catchError(error => {
        console.error('Error loading users:', error);
        return of([]);
      })
    );
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.EVENTS_URL).pipe(
      catchError(error => {
        console.error('Error loading events:', error);
        return of([]);
      })
    );
  }

  loadInitialData(): Observable<{users: User[], events: Event[]}> {
    return forkJoin({
      users: this.getUsers(),
      events: this.getEvents()
    }).pipe(
      catchError(error => {
        console.error('Error loading initial data:', error);
        return of({ users: [], events: [] });
      })
    );
  }

  authenticateUser(email: string, password: string): Observable<User | null> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(u => 
          u.email.toLowerCase() === email.toLowerCase() && 
          u.password === password
        );
        return user || null;
      }),
      catchError(error => {
        console.error('Error authenticating user:', error);
        return of(null);
      })
    );
  }

  getEventsByUser(userId: number): Observable<Event[]> {
    return this.getEvents().pipe(
      map(events => events.filter(event => event.userId === userId)),
      catchError(error => {
        console.error('Error loading user events:', error);
        return of([]);
      })
    );
  }
}