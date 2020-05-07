import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson-plan-material',
  templateUrl: './lesson-plan-material.component.html',
  styleUrls: ['./lesson-plan-material.component.css']
})
export class LessonPlanMaterialComponent implements OnInit {
public lessonplandata:any;
public serverDetails: any = {
  "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": ""
};
  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.lessonplandata.res;
      this.lessonplandata = result;      
      console.log("lesson plan data",this.lessonplandata);

    })
  }

}
