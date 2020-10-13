import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {

  public paramsId: any;
  public lessonId: any;
  public addPageRoute:any;
  public lessonList:any;

  @Input()
  set ParamsId(val: any) {
    this.paramsId = (val) || '<no name set>';
  }
  @Input()
  set LessonId(val: any) {
    this.lessonId = (val) || '<no name set>';
  }

  @Input()
  set AddPageRoute(val: any) {
    this.addPageRoute = (val) || '<no name set>';
  }

  @Input()
  set LessonList(val: any) {
    this.lessonList = (val) || '<no name set>';
  }


  constructor(public router:Router,public activateRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  addButton(){
    this.router.navigateByUrl(this.addPageRoute + this.lessonId);

  }

  goTolessonList(){
    this.router.navigateByUrl(this.lessonList);

  }

}
