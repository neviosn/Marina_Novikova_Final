import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-previous-training',
  standalone: false,
  templateUrl: './previous-training.component.html',
  styleUrl: './previous-training.component.css'
})
export class PreviousTrainingComponent implements  OnInit, AfterViewInit {

  displayedColumns = ["date", "name", "duration", "calories", "status"];
  exerciseSource = new MatTableDataSource<Exercise>();

  @ViewChild (MatSort) sort!: MatSort;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(){
    this.exerciseSource.data = this.trainingService.getExercises();
  }

  ngAfterViewInit(): void {
    this.exerciseSource.sort = this.sort;
  }
}
