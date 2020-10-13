import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {
  public paramsId: any;
  public lessonId: any;
  public AddPageRoute:any='/quiz/add/';
  public LessonList:any='/manage-lesson/list/';

  constructor(public activatedRoute:ActivatedRoute) {
    this.paramsId = activatedRoute.snapshot.params.id;
    this.lessonId = activatedRoute.snapshot.params.lesson_id_object;
  }

  ngOnInit() {
  }

}
