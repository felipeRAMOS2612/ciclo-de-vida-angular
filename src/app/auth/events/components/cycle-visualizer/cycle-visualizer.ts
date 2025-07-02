import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../shared/types/event.type';


@Component({
  selector: 'app-cycle-visualizer',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #canvas class="event-canvas"></canvas>`,
  styleUrls: ['./cycle-visualizer.scss']
})
export class CycleVisualizer implements AfterViewInit, OnChanges {

  @Input() diameter = 350;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() events: Event[] = [];

  private ctx!: CanvasRenderingContext2D;
  private positions: any[] = [];

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.setupMouseHover();
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['events'] && this.ctx) {
      this.draw();
    }
  }

  draw() {
    const canvas = this.canvasRef.nativeElement;

  const parent = canvas.parentElement!;
  const width = parent.clientWidth;

  // Asignar tamaño real al canvas (¡esto es lo que lo corrige!)
  canvas.width = width;
  canvas.height = width;

  const ctx = this.ctx;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = canvas.width / 2 - 10;
    this.positions = [];

    if (this.events.length === 0) return;

    const angleSize = (2 * Math.PI) / this.events.length;
    let start = 0;

    for (const event of this.events) {
      const end = start + angleSize;
      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy);
      this.ctx.arc(cx, cy, radius, start, end);
      this.ctx.closePath();
      this.ctx.fillStyle = event.color ?? '#cccccc';
      this.ctx.fill();

      this.positions.push({ startAngle: start, endAngle: end, radius, centerX: cx, centerY: cy, event });
      start = end;
    }
  }

  private setupMouseHover() {
    const canvas = this.canvasRef.nativeElement;
    canvas.onmousemove = (e) => {
      const { left, top } = canvas.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const dx = x - cx;
      const dy = y - cy;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      const angle = Math.atan2(dy, dx);
      const normalized = angle >= 0 ? angle : 2 * Math.PI + angle;
      canvas.title = '';

      for (const pos of this.positions) {
        if (
          distance <= pos.radius &&
          normalized >= pos.startAngle &&
          normalized < pos.endAngle
        ) {
          canvas.title = `${pos.event.category.toUpperCase()} - ${pos.event.description}\n${pos.event.date}`;
          break;
        }
      }
    };
  }
}
