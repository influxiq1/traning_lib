import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
@Component({
  selector: 'lib-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public manageQuizForm: FormGroup;
  public serverDetailsVal: any;
  public formSourceVal: any;
  public listingPageRoute: any;
  public paramId: any;
  public listingData: any = [];
  public headerText: any = "Add Question";
  public buttonText: any = "Submit"
  public lessonId: any;
  public statuschecked: boolean = true;
  public skippablechecked:boolean = false;
  public lessonidineditForm: any;
  public imageConfigData: any = '';
  public img_var: any;
  image_name: any;
  image_type: any;
  public images_array: any = [];
  public images_array_edit:any=[];
  public img_flag: boolean = false;
  public editorconfig:any={};


  public questionTypeVal: any;
  public textAreaTypeVal: any;
  @Input()
  set imageUpload(getConfig: any) {
    this.imageConfigData = getConfig;
  }
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
  }
  @Input()
  set lessonIdInedit(id: any) {

    this.lessonidineditForm = id;
  }
  @Input()           //getting data for edit from application
  set DataList(val: any) {
    this.listingData = (val) || 'no name set';
    this.listingData = val;
    if (this.paramId) {
      this.img_flag=true;
      this.manageQuizForm.controls['question_type'].patchValue(val[0].question_type);
      this.manageQuizForm.controls['question'].patchValue(val[0].question);
      this.manageQuizForm.controls['priority'].patchValue(val[0].priority);
      this.manageQuizForm.controls['status'].patchValue(val[0].status);
      this.manageQuizForm.controls['description'].patchValue(val[0].description);
      this.manageQuizForm.controls['title'].patchValue(val[0].title);
      this.manageQuizForm.controls['text_area_type'].patchValue(val[0].text_area_type);
      this.manageQuizForm.controls['question_img'].patchValue(val[0].question_img);
      this.manageQuizForm.controls['skippable'].patchValue(val[0].skippable);



      // for answer
      for (const i in this.listingData[0].answerdata) {
        this.addAnswer(this.listingData[0].answerdata[i].answer);
      }

           /*Image works*/
           for (let i = 0; i < this.listingData[0].question_img.length; i++) {
            this.img_var = this.listingData[0].question_img[i].basepath + this.listingData[0].question_img[i].image;
            this.image_name = this.listingData[0].question_img[i].name;
            this.image_type = this.listingData[0].question_img[i].type;
            this.images_array_edit.push({ 'img_var': this.img_var, 'image_name': this.image_name, 'image_type': this.image_type });
            this.images_array.push({
              "basepath": this.listingData[0].question_img[i].basepath,
              "image": this.listingData[0].question_img[i].image,
              "name": this.listingData[0].question_img[i].name,
              "type": this.listingData[0].question_img[i].type
            });
          }
    }
  }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
    // console.log("dddd",this.formSourceVal);                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  }
  @Input()
  set ListingPageRoute(val: any) {
    this.listingPageRoute = (val) || '<no name set>';
  }
  @Input()
  set LessonId(id: any) {
    this.lessonId = (id) || '<no name set>';
  }

  constructor(public apiService: ApiService, public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute) {
    this.manageQuizForm = this.fb.group({
      lesson_id: [''],
      question_type: [''],
      question: ["", Validators.required],
      priority: [""],
      status: [""],
      description: ['',Validators.required],
      title: ['', Validators.required],
      text_area_type: [''],
      answerdata: this.fb.array([]), 
      question_img:[''],
      skippable:['']
    })
    this.paramId = activatedRoute.snapshot.params._id;
    if (this.paramId) {
      this.headerText = "Edit Question";
      this.buttonText = "Update";
    }

    this.editorconfig.extraAllowedContent = '*[class](*),span;ul;li;table;td;style;*[id];*(*);*{*}';
  }

  ngOnInit() {
    // this.addAnswer('');

    if(this.paramId){
      if(this.listingData[0].question_type == 'text_area'){
        this.questionTypeVal=this.listingData[0].question_type;
      }
      if(this.listingData[0].question_type == 'multiple_selection'){
        this.questionTypeVal=this.listingData[0].question_type;
      }
      if(this.listingData[0].question_type == 'pick_picture'){
        this.questionTypeVal=this.listingData[0].question_type;
        console.log(this.images_array_edit)
      }
    }

  }
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

  ManageQuizFormSubmit() {


    if(this.imageConfigData.files){
      if (this.imageConfigData.files.length > 0 )
      
      // this.manageQuizForm.value.team_img=
      //   {
      //     "basepath": this.imageConfigData.files[0].upload.data.basepath + '/' + this.imageConfigData.path + '/',
      //     "image": this.imageConfigData.files[0].upload.data.data.fileservername,
      //     "name": this.imageConfigData.files[0].name,
      //     "type": this.imageConfigData.files[0].type
      //   };


        for (let loop = 0; loop < this.imageConfigData.files.length; loop++) {
          this.images_array =
            this.images_array.concat({
              "upload_server_id": this.imageConfigData.files[loop].upload.data._id,
              "basepath": this.imageConfigData.files[loop].upload.data.basepath + '/' + this.imageConfigData.path + '/',
              "image": this.imageConfigData.files[loop].upload.data.data.fileservername,
              "name": this.imageConfigData.files[loop].name,
              "type": this.imageConfigData.files[loop].type,
              "bucketname": this.imageConfigData.bucketName
            });
        }
  
        this.manageQuizForm.controls['question_img'].patchValue(this.images_array);
      } else {
    }



    // console.log("soursh test",this.manageQuizForm.value);
    // return;
    for (let x in this.manageQuizForm.controls) {
      this.manageQuizForm.controls[x].markAsTouched();
    }
    if (this.manageQuizForm.valid) {
      this.manageQuizForm.controls['lesson_id'].patchValue(this.lessonId);

      if (this.manageQuizForm.value.status)
        this.manageQuizForm.value.status = parseInt("1");
      else
        this.manageQuizForm.value.status = parseInt("0");

        if (this.manageQuizForm.value.skippable)
        this.manageQuizForm.value.skippable = parseInt("1");
      else
        this.manageQuizForm.value.skippable = parseInt("0");


      if (this.manageQuizForm.value.priority) {
        this.manageQuizForm.value.priority = Number(this.manageQuizForm.value.priority);

      }

      const link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
      var data;
      if (this.paramId) {
        data = {
          "source": this.formSourceVal.source,
          "token": this.serverDetailsVal.jwttoken,
          "data": {
            "id": this.paramId,
            'question_type': this.manageQuizForm.value.question_type,
            'question': this.manageQuizForm.value.question,
            'priority': this.manageQuizForm.value.priority,
            'status': this.manageQuizForm.value.status,
            'description': this.manageQuizForm.value.description,
            'title': this.manageQuizForm.value.title,
            'text_area_type': this.manageQuizForm.value.text_area_type,
            'answerdata': this.manageQuizForm.value.answerdata,
            'question_img': this.manageQuizForm.value.question_img,
            'skippable': this.manageQuizForm.value.skippable,

          },
          "sourceobj": ["lesson_id"],
        }
      } else {
        data = {
          "source": this.formSourceVal.source,
          "token": this.serverDetailsVal.jwttoken,
          "data": this.manageQuizForm.value,
          "sourceobj": ["lesson_id"],
        }
      }
      this.apiService.postData(link, data).subscribe((res: any) => {
        if (res.status = "success") {
          if (this.paramId) {
            this.router.navigateByUrl(this.listingPageRoute + this.lessonidineditForm);

          } else {
            this.router.navigateByUrl(this.listingPageRoute + this.lessonId);
          }

        }
      })
    }
  }


  //get Question Type Value
  getQuestionTypeValue(val: any) {
    console.log(val, '??');
    this.questionTypeVal = val;

    if(this.questionTypeVal == 'text_area'){
      this.manageQuizForm.controls['text_area_type'].patchValue('medium');
    }
  }

  // get text area value(s,m,l)
  // getTextAreaValue(val: any){
  //   console.log(val,'??');
  //   this.textAreaTypeVal=val;

  // }
  addAnswer(a: any) {
    const answer = this.manageQuizForm.controls.answerdata as FormArray;
    answer.push(this.fb.group({
      answer: [a]
    }))
  }

  removeAnswer(index: any) {
    const answer = this.manageQuizForm.controls.answerdata as FormArray;
    answer.removeAt(index);
  }

  trackByFn(index) {
    return index;
  }

  clear_image(index) {
    this.images_array.pop(this.listingData[0].question_img[index]);
    this.images_array_edit.splice(index, 1);
  }

  cancelroute(){
    if (this.paramId) {
      this.router.navigateByUrl(this.listingPageRoute + this.lessonidineditForm);

    } else {
      this.router.navigateByUrl(this.listingPageRoute + this.lessonId);
    }
  }

}
