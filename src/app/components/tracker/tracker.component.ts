import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent {

  taskName: string | undefined;
  taskList: any[] = [];
  showStartBtn: boolean = true;
  showStopBtn: boolean = false;
  nameInvalid: boolean = false;
  totalTime: string = '';

  ngOnInit(): void {
    // Getting the data from local storage
    const savedData = localStorage.getItem('tasks');
    if (savedData) {
      this.taskList = JSON.parse(savedData);
      // Sorted the data in descending
      this.taskList = this.taskList.sort((a, b) => b.id - a.id);
      this.updateTotalSeconds();
    }
  }

  // Function to calculate the total time spent on all tasks
  updateTotalSeconds() {
    let sumOfTotalSeconds = this.taskList.reduce((acc, curr) => acc + curr.totalSeconds, 0);
    const hours = Math.floor(sumOfTotalSeconds / 3600);
    const minutes = Math.floor((sumOfTotalSeconds % 3600) / 60);
    const seconds = sumOfTotalSeconds % 60;
    this.totalTime = `${this.formatTimeUnit(hours)}hr ${this.formatTimeUnit(minutes)}min ${this.formatTimeUnit(seconds)}sec`;
  }

  private formatTimeUnit(unit: number) {
    return unit.toString().padStart(1, '0');
  }

  openModal() {
    $('#modal').modal('show');
  }

  closeModal() {
    $('#modal').modal('hide');
  }

  onTimerStopped(value: number, id: number) {
    // Getting the index of the current object
    let selectedIdx = this.taskList.findIndex((a) => a.id == id);
    // Updating the total seconds and adding the stop time
    this.taskList[selectedIdx].totalSeconds = value;
    this.taskList[selectedIdx].history[0].endTime = new Date();
    // Storing the data in local storage
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
    this.updateTotalSeconds();
  }

  onSave() {
    if (this.taskName) {
      this.nameInvalid = false;
      // Creating a new task with 0 seconds and empty history list
      const newData: any = {
        id: this.taskList.length ? this.taskList[0].id + 1 : 1,
        taskName: this.taskName,
        totalSeconds: 0,
        history: []
      };
      this.taskList.unshift(newData);
      localStorage.setItem('tasks', JSON.stringify(this.taskList));
      this.taskName = '';
      this.closeModal();
    } else {
      this.nameInvalid = true;
    }
  }

  startTimer(id: number) {
    // Getting the index of the current object
    let selectedTaskIdx = this.taskList.findIndex((a) => a.id == id);
    // Adding the startTime to the first object of the history
    this.taskList[selectedTaskIdx].history.unshift({ startTime: new Date() });
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  onDeleteTask(idToDelete: number) {
    // Filtering the objects except the current object;
    this.taskList = this.taskList.filter(item => item.id !== idToDelete);
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

}
