import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StorageService } from "../../shared/services/storage";
import { Events } from "./events";

// events.component.spec.ts
describe('Events Component', () => {
  let component: Events;
  let fixture: ComponentFixture<Events>;
  let storage: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Events],
      providers: [StorageService]
    }).compileComponents();

    fixture = TestBed.createComponent(Events);
    component = fixture.componentInstance;
    storage = TestBed.inject(StorageService);
    fixture.detectChanges();
  });

  it('should create the Events component', () => {
    expect(component).toBeTruthy();
  });

  it('should load user events', () => {
    spyOn(storage, 'getCurrentUser').and.returnValue({ id: 1 } as any);
    spyOn(storage, 'getEventsByUser').and.returnValue([
      { id: 1, userId: 1, title: 'Test', date: '2023-01-01', category: 'personal', color:"#ff0000" }
    ]);
    component.loadUserEvents();
    expect(component.events.length).toBe(1);
  });

  it('should delete event', () => {
    spyOn(storage, 'getCurrentUser').and.returnValue({ id: 1 } as any);
    spyOn(storage, 'getEventsByUser').and.returnValue([]);
    spyOn(storage, 'deleteEvent');

    component.events = [
      { id: 1, userId: 1, title: 'Test', date: '2023-01-01', category: 'personal', color: "#ff0000" }
    ];
    component.deleteEvent(component.events[0]);
    expect(storage.deleteEvent).toHaveBeenCalledWith(1);
  });
});