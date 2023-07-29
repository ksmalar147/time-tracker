import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  @Input() taskDetail: any;
  @Output() stopped: EventEmitter<number> = new EventEmitter<number>();
  @Output() timerStarted: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteTask: EventEmitter<void> = new EventEmitter<void>();

  totalSeconds: number = 0;
  isTimerRunning: boolean = false;
  timerId: any;
  showStartBtn: boolean = true;
  showStopBtn: boolean = false;


  ngOnInit(): void {
    this.totalSeconds = this.taskDetail.totalSeconds;
  }

  startTimer() { // Function to update the time for every second
    if (!this.isTimerRunning) {
      this.isTimerRunning = true;
      this.showStartBtn = false;
      this.showStopBtn = true;
      this.timerStarted.emit();
      this.timerId = setInterval(() => {
        this.totalSeconds++;
      }, 1000);
    }
  }

  stopTimer() { //Function to stop the time
    clearInterval(this.timerId);
    this.isTimerRunning = false;
    // Emitting the totalSeconds to the tracker(parent) component
    this.stopped.emit(this.totalSeconds);
    this.showStopBtn = false;
    this.showStartBtn = true;
  }

  onDeleteTask(): void {
    // Emitting the delete trigger action
    this.deleteTask.emit();
  }

  getFormattedTime() {
    const hours = Math.floor(this.totalSeconds / 3600);
    const minutes = Math.floor((this.totalSeconds % 3600) / 60);
    const seconds = this.totalSeconds % 60;
    // Formating the seconds to hr:min:sec
    return `${this.formatTimeUnit(hours)}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
  }

  private formatTimeUnit(unit: number) {
    return unit.toString().padStart(2, '0');
  }
}
