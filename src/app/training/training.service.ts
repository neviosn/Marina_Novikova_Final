import { Exercise } from "./exercise.model";

export class TrainingService {
    private exercises: Exercise[] = [
        { id: 'running', name: 'Morning running', duration: 15, calories: 100, date: new Date(), status: 'done'},
        { id: 'walking', name: 'Morning walking', duration: 35, calories: 500, date: new Date(), status: 'done'},
        { id: 'squats', name: 'Midday squats', duration: 80, calories: 400, date: new Date(), status: 'canceled'},
        { id: 'running', name: 'Evening running', duration: 45, calories: 900, date: new Date(), status: 'done'},
        { id: 'walking', name: 'Midday running', duration: 130, calories: 350, date: new Date(), status: 'canceled'},
    ];

    getExercises() {
        return this.exercises;
    }
}