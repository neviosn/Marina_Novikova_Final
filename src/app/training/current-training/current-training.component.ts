import { Component } from '@angular/core';

@Component({
  selector: 'app-current-training',
  standalone: false,
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.css'
})
export class CurrentTrainingComponent {

  progress = 0;
  timer: any;

  /* ngOnInit() {
    setInterval(() => { this.progress += 5; }, 1000 )
  } */
 
  ngOnInit() {
    this.timer = setInterval(() => { 
      this.progress += 5; 
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 1000 )
  }  

  onStop() {
    clearInterval(this.timer);
  }

  
}
