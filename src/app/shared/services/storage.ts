import { Injectable } from '@angular/core';
import { User } from '../types/user.type';
import { Event } from '../types/event.type';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
    
    private usersKey = 'users';
    private eventsKey = 'events';
    private currentUserKey = 'currentUser';
    
    // ==== USERS ====
    
    getUsers(): User[] {
      return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    }
  
    saveUser(user: User): void {
      const users = this.getUsers();
      users.push(user);
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    }
  
    setUsers(users: User[]): void {
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    }
  
    // ==== CURRENT USER ====
  
    getCurrentUser(): User | null {
      const data = localStorage.getItem(this.currentUserKey);
      return data ? JSON.parse(data) : null;
    }
  
    setCurrentUser(user: User): void {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    }
  
    logout(): void {
      localStorage.removeItem(this.currentUserKey);
    }
  
    // ==== EVENTS ====
  
    getEvents(): Event[] {
      return JSON.parse(localStorage.getItem(this.eventsKey) || '[]');
    }
  
    getEventsByUser(userId: number): Event[] {
      return this.getEvents().filter((e) => e.userId === userId);
    }
  
    saveEvent(event: Event): void {
      const events = this.getEvents();
      events.push(event);
      localStorage.setItem(this.eventsKey, JSON.stringify(events));
    }
  
    setEvents(events: Event[]): void {
      localStorage.setItem(this.eventsKey, JSON.stringify(events));
    }
  
    deleteEvent(eventId: number): void {
      const events = this.getEvents().filter(e => e.id !== eventId);
      this.setEvents(events);
    }
}
