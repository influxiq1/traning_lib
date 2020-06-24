import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer} from '@angular/platform-browser';
import { CookieService } from "ngx-cookie-service";
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
declare var moment: any;
declare var $: any;

@Component({
  selector: 'lib-traning',
  templateUrl: './traning.component.html',
  styleUrls: ['./traning.component.css']
})
export class TraningComponent implements OnInit {
  public chkboxval:any;
  public progressLoader:boolean=false;
  public formdataval: any = [];
  public serverDetailsVal: any;
  public formgroup: FormBuilder;
  public dataForm: FormGroup;
  public percentageis: any = [];
  public lengthis: any = [];
  public nameis: any = [];
  public issubmit = 0;
  public isedit: number = 0;
  public start_time: any;
  public end_time: any;
  public submitval: any = 1;
  public usertype: any;
  public jsonLinkVal: any;
  public formSourceVal: any;
  public menuval: string = '';
  public recid: any;
  public listingPageRoute:any;
  public buttonText : any="Submit";
  public headerText : any;
  public objectId : any;
  public pageFlag : any;
  public mediaTypeValue:any;
  public editorconfig:any={};
  public uploadConfigData:any='';
  public cancelBtnRoute:any;
  public htmType:any;
  public title:any;
  public description:any;
  public images_array:any=[];
  public checked:boolean=true;
  public allLessonData:any=[];
  public imagePath:any='';
  public fileArray:any;
  public audioVideoFlag:boolean=true;
  public hasLessonVal:any;
  public dnaFlag:any;
  public lessonplanValue:any;
  public  
  @Input()
    set formdata(formdata: string) {
        this.formdataval = (formdata) || '<no name set>';
    }
    @Input()
    set PageName(val: {}) {
      this.pageFlag = (val) || '<no name set>';
    } 

  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
    
  }

  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
  
  }
  @Input()
  set ListingPageRoute(val: any) {
    this.listingPageRoute = (val) || '<no name set>';
  }
  @Input()
  set ObjectId(val: any) {
    this.objectId = (val) || '<no name set>';
  }
  
  @Input()
  set FileUpload(getConfig: any) {
    this.uploadConfigData = getConfig;
  }
  @Input()
  set IsItDna(val:any){
    this.dnaFlag = val;
    console.log("dna flag",this.dnaFlag);
  }
   

  constructor( formgroup: FormBuilder, public cookeiservice: CookieService, public sanitizer: DomSanitizer, public route: ActivatedRoute, public router: Router, public apiService: ApiService, public _http: HttpClient) {
    this.formgroup = formgroup;
    this.editorconfig.extraAllowedContent = '*[class](*),span;ul;li;table;td;style;*[id];*(*);*{*}';
   }

  ngOnInit() {
    this.headerText = this.formSourceVal.AddheaderText;
        this.route.params.subscribe(params => {
            this.recid = params['id'];
            if (this.recid !=null && this.recid !='' && this.recid !=undefined) {
              this.headerText = this.formSourceVal.EditheaderText;
              this.buttonText="Update";
              this.geteditdata();
            }
        });
        
    
    let formgrp: any = [];
    for (let c in this.formdataval) {
      if ( (this.formdataval[c].isaddonly == null && this.formdataval[c].isaddonly != true)) {
          this.start_time = '';
          this.end_time = '';
          if (this.formdataval[c].inputtype == 'checkbox') {
              formgrp[this.formdataval[c].name] = [false];
          }
          else if (this.formdataval[c].inputtype == 'dateis') {
              formgrp[this.formdataval[c].name] = [moment().format('MM-DD-YY'), Validators.required];
          }
           else {
              let tempdefault = '';
              
              
              if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.required){ 
                formgrp[this.formdataval[c].name] = [tempdefault, Validators.required];
              }
              if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.email){
                 formgrp[this.formdataval[c].name] = [tempdefault, Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])];
                }
              if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.confirmpass){ 
                formgrp[this.formdataval[c].name] = [tempdefault, Validators.compose([Validators.required, this.equalToPass('password')])];
              }
              if (this.formdataval[c].validationrule != null && !this.formdataval[c].validationrule && this.formdataval[c].value == null) {
                formgrp[this.formdataval[c].name] = [tempdefault];
              }
              if (this.formdataval[c].validationrule == null && !this.formdataval[c].validationrule && this.formdataval[c].value == null){
                 formgrp[this.formdataval[c].name] = [tempdefault];
                }
              if (this.formdataval[c].validationrule == null && !this.formdataval[c].validationrule && this.formdataval[c].value != null){
                 formgrp[this.formdataval[c].name] = [this.formdataval[c].value];
                }
              if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.url){
                 formgrp[this.formdataval[c].name] = [tempdefault, Validators.compose([Validators.required, Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')])];
                }
              if (this.formdataval[c].inputtype == 'select') {
              
                  this.getselectdata(this.formdataval[c].sourceview, this.formdataval[c].endpoint, c);
              }
          }

          if (this.formdataval[c].role != null) {
              if (this.formdataval[c].role.indexOf(this.usertype) == -1) {
                  this.formdataval[c].inputtype = 'hidden';
                  setTimeout(() => {
                      this.dataForm.controls[this.formdataval[c].name].patchValue(this.cookeiservice.get(this.formdataval[c].defaultval));
                  }, 1000);
              }
          }
      }
  }
  this.dataForm = this.formgroup.group(formgrp);


  }
  formsubmit() {
    console.log("data value",this.dataForm.value);
  // return;
    this.issubmit = 1;
    for (let y in this.dataForm.controls) {
        this.dataForm.controls[y].markAsTouched();
    }
    switch (this.mediaTypeValue) {
      case 'image':
        this.dataForm.value.image_typeHtml=this.htmType;
    this.dataForm.value.image_title=this.title;
    this.dataForm.value.image_description=this.description;
        break;
      case 'video':
        this.dataForm.value.video_typeHtml=this.htmType;
    this.dataForm.value.video_title=this.title;
    this.dataForm.value.video_description=this.description;
       
        break;
      case 'audio':
        this.dataForm.value.audio_typeHtml=this.htmType;
        this.dataForm.value.audio_title=this.title;
        this.dataForm.value.audio_description=this.description;
      
          break;
      case 'file':
        this.dataForm.value.file_typeHtml=this.htmType;
        this.dataForm.value.file_title=this.title;
        this.dataForm.value.file_description=this.description;
        
          break;
    
    }
    
 
  
    if (this.dataForm.valid && this.submitval == 1) {
      if (this.dataForm.value.status)
          this.dataForm.value.status = parseInt("1");
        else
          this.dataForm.value.status = parseInt("0");


          
    
      const link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
        let data: any ={
          source: this.formSourceVal.source,
          data: this.dataForm.value,
          sourceobj: [this.objectId.objectId,this.objectId.objectId2],
          token:this.serverDetailsVal.jwttoken
        }
        if(this.dnaFlag==true){
          if(this.hasLessonVal==true){
            data.data['has_lessonplan'] = 1;
            data.data['lessonplan_value']=this.lessonplanValue;
          } 
          else
          data.data['has_lessonplan'] = 0;

        if(this.hasLessonVal==0){
          delete this.dataForm.value.lessonplan_value;
        }
          
        }
        
        
         
        if(this.mediaTypeValue == 'html'){
          data.data['typeHtml'] = this.htmType;
        }
      
        if(this.mediaTypeValue == 'image' || this.mediaTypeValue == 'video' || this.mediaTypeValue == 'audio' ||this.mediaTypeValue == 'file'){
          if (typeof(this.uploadConfigData.files) != 'undefined' && this.uploadConfigData.files.length >=0) {
            for (let loop = 0; loop < this.uploadConfigData.files.length; loop++) {
              this.images_array =
                this.images_array.concat({
                  "upload_server_id": this.uploadConfigData.files[loop].upload.data._id,
                  "basepath": this.uploadConfigData.files[loop].upload.data.basepath + '/' + this.uploadConfigData.path + '/',
                  "fileservername": this.uploadConfigData.files[loop].upload.data.data.fileservername,
                  "name": this.uploadConfigData.files[loop].name,
                  "type": this.uploadConfigData.files[loop].type,
                  "bucketname": this.uploadConfigData.bucketName
                });
            }
            
            data.data['fileType'] =  this.images_array;
            switch (this.mediaTypeValue) {
              case 'image':
                data.data['image_typeHtml'] = this.htmType;
                data.data['image_title']=this.title;
                data.data['image_description']=this.description;
                break;
              case 'video':
                data.data['video_typeHtml'] = this.htmType;
                data.data['video_title']=this.title;
                data.data['video_description']=this.description;
                break;
              case 'audio':
                data.data['audio_typeHtml'] = this.htmType;
                data.data['audio_title']=this.title;
                data.data['audio_description']=this.description;
                  break;
              case 'file':
                data.data['file_typeHtml'] = this.htmType;
                data.data['file_title']=this.title;
                data.data['file_description']=this.description;
                  break;
            
            }
          } 
        }
      this.apiService.postData(link,data).subscribe((res: any)=>{
        
        if(res.status = "success"){
          this.router.navigateByUrl(this.listingPageRoute);
        }
      })
    }
  }

  equalToPass(fieldname): ValidatorFn {                                 //password match custom function
    return (control: AbstractControl): { [key: string]: any } => {      ///abstractcontrol function call here with key string any type

        let input = control.value;      //class create here
        let isValid = control.root.value[fieldname] == input;       //value valid or not
        if (!isValid)
            return {
                equalTo: true            //this value will be called
            };
    };
}

  getselectdata(source: any, endpoint: string, c: any) {
    if (this.formdataval[c].sourcetype == null || this.formdataval[c].sourcetype != 'static') {
        const link = this.serverDetailsVal.serverUrl + endpoint;
        let data: any ={
          source: source ,
          condition:{'is_trash':{$ne:1}},
          token:this.serverDetailsVal.jwttoken,
        }

        
        this.apiService.getData(link, data)
            .subscribe(res => {
                let result;
                result = res;
                console.log("drop down",result);
                if (result.status == 'error') {
                    // this.router.navigate(['/']);
                } else {
                    this.formdataval[c].sourceval = result.res;

                    // this.formdataval[c].sourceval = "";
                }
            }, error => {
                this.formdataval[c].sourceval = '';
            });
    } else {
      
        this.apiService.localJsonSate(source)
            .subscribe((res:any) => {
                this.formdataval[c].sourceval =  res;
            }, error => {
                this.formdataval[c].sourceval = '';
            });
    }

}
getMediaTypeVal(value:any,name:any){
  this.imagePath = null;
  if(name == 'mediaType'){
    this.mediaTypeValue = value;
  }
  if(name =='associated_training'){
    this.progressLoader=true;
    let link =this.serverDetailsVal.serverUrl + this.formSourceVal.lessonDataEndpoint;
    let data: any ={
      condition:{
        "associated_training_id": value,
        'is_trash':{$ne:1}
      }
    }
    this.apiService.postDatawithoutToken(link,data).subscribe((response:any)=>{
      this.progressLoader=false;
       this.allLessonData = response.lesson_list;
       for (let key in this.formdataval) {
         if(this.formdataval[key].name=='prerequisite_lession'){
          this.formdataval[key].sourceval=this.allLessonData;
         }
       }
       

    })
  }
}
cancelButton(){
  this.router.navigateByUrl(this.listingPageRoute);
}
clear(){
  this.imagePath = '';
  this.audioVideoFlag=false;
  
}

geteditdata() {

  const link = this.serverDetailsVal.serverUrl + this.formSourceVal.showEndpoint;
        let data: any ={
          source: this.formSourceVal.source,
          token:this.serverDetailsVal.jwttoken,
          condition:{
            _id: this.recid
          }
        }

  this.apiService.getData(link, data).subscribe((res: any)=>{
    if (res.status == 'error') {
     
  } else {
    console.log("edited data",res);
    if(this.route.snapshot.url[0].path=="manage-lesson"){
     if(this.route.snapshot.url[1].path=="edit"){
      this.getMediaTypeVal(res.res[0].associated_training,'associated_training');
      this.getMediaTypeVal(res.res[0].mediaType,'mediaType');
      let imageBasepath:any;
      let fileserverName:any;
      this.fileArray = res.res[0].fileType;
      // console.log("dingle data",res.res[0]);

      this.htmType = res.res[0].typeHtml;
      // this.hasLessonVal=res.res[0].has_lessonplan;
      this.chkboxval=res.res[0].has_lessonplan;
      this.getchkboxval(this.chkboxval);
      this.lessonplanValue=res.res[0].lessonplan_value;
      switch (res.res[0].mediaType) {
        case 'image':
          this.htmType = res.res[0].image_typeHtml;
          this.title=res.res[0].image_title;
          this.description=res.res[0].image_description;
          
          break;
        case 'video':
          this.htmType = res.res[0].video_typeHtml;
          this.title=res.res[0].video_title;
          this.description=res.res[0].video_description;
          break;
        case 'audio':
          this.htmType = res.res[0].audio_typeHtml;
          this.title=res.res[0].audio_title;
          this.description=res.res[0].audio_description;
          break;
        case 'file':
          this.htmType = res.res[0].file_typeHtml;
          this.title=res.res[0].file_title;
          this.description=res.res[0].file_description;
          break;
      
      }
      for (let key in res.res[0].fileType) {
           imageBasepath = res.res[0].fileType[key].basepath;
           fileserverName = res.res[0].fileType[key].fileservername;
      }
      this.imagePath = imageBasepath+fileserverName;
      this.fileArray = this.imagePath;
     }
    }

    let folder: any = '';
   
    for (let c in this.dataForm.controls) {
      
        this.dataForm.controls[c].patchValue(res.res[0][c]);
        for (let j in this.formdataval) {

          if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'checkbox') {
            let checkval = res.res[0][c];
            if (res.res[0][c] == 1) checkval = true;
            else checkval = false;
            this.dataForm.controls[c].patchValue(checkval);
        }
            // if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'daterange') {
            //     $('#inputdate' + this.formdataval[j].name).val(this.showdate(result.res[0][c]));
            //     let bsValue = new Date(result.res[0][c][0]);
            //     let maxDate = new Date(result.res[0][c][1]);
            //     let datearr = [bsValue, maxDate];
            //     this.dataForm.controls[c].patchValue(datearr);
            // }
            // if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'dateis') {
            //     let a = result.res[0][c].split('T');
            //     $('#inputdateis' + this.formdataval[j].name).val(moment(a[0]).format('MM-DD-YYYY'));
            //     let bsValue = new Date(result.res[0][c][0]);
            //     let maxDate = new Date(result.res[0][c][1]);
            // }
            // if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'timeis') {
            //     if (this.formdataval[j].name == 'start_time') {
            //         let sttime = new Date();
            //         var spl = result.res[0][c].split(':');
            //         sttime.setHours(spl[0]);
            //         sttime.setMinutes(spl[1]);
            //         this.start_time = sttime;
            //     }
            //     if (this.formdataval[j].name == 'end_time') {
            //         let sttime = new Date();
            //         var spl = result.res[0][c].split(':');
            //         sttime.setHours(spl[0]);
            //         sttime.setMinutes(spl[1]);
            //         this.end_time = sttime;
            //     }
            // }

            // if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'image') {
            //     folder = this.formdataval[j].imagefolder;
            //     const link = this._commonservice.base64encode + '&img=' + this.dataForm.controls[c].value + '&type=' + folder;
            //     this._http.get(link)
            //         .subscribe(res => {
            //             let result: any;
            //             result = res;
            //             if (result.data != null) {
            //                 this.unsafebase64imgdata[j] = result.data;
            //                 this.croppedImage[j] = result.data;
            //             }
            //         }, error => {
            //             console.log('Oooops!');
            //         });
            // }
            // if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'file') {
            //     this.percentageis[j] = 100;
            //     this.lengthis[j] = 1;
            //     this.flag = 0;
            //     this.nameis[j] = result.res[0][c];
            // }
        }
    }
    this.dataForm.addControl('id', new FormControl(this.recid, Validators.required));
    if(this.route.snapshot.url[0].path=="manage-lesson"){
      if(this.route.snapshot.url[1].path=="edit"){
        this.dataForm.addControl('has_lessonplan', new FormControl(this.hasLessonVal, Validators.required));

    this.dataForm.addControl('lessonplan_value', new FormControl(this.lessonplanValue, Validators.required));
      }
    }
    
   
    switch (res.res[0].mediaType) {
      case 'image':
        this.dataForm.addControl('image_typeHtml', new FormControl(this.htmType, Validators.required));
        this.dataForm.addControl('image_title', new FormControl(res.res[0].image_title, Validators.required));
        this.dataForm.addControl('image_description', new FormControl(res.res[0].image_description, Validators.required));

        break;
      case 'video':
        this.dataForm.addControl('video_typeHtml', new FormControl(this.htmType, Validators.required));
        this.dataForm.addControl('video_title', new FormControl(res.res[0].video_title, Validators.required));
        this.dataForm.addControl('video_description', new FormControl(res.res[0].video_description, Validators.required));

        break;
      case 'audio':
        this.dataForm.addControl('audio_typeHtml', new FormControl(this.htmType, Validators.required));
        this.dataForm.addControl('audio_title', new FormControl(res.res[0].audio_title, Validators.required));
        this.dataForm.addControl('audio_description', new FormControl(res.res[0].audio_description, Validators.required));
 
        break;
      case 'file':
        this.dataForm.addControl('file_typeHtml', new FormControl(this.htmType, Validators.required));
        this.dataForm.addControl('file_title', new FormControl(res.res[0].file_title, Validators.required));
        this.dataForm.addControl('file_description', new FormControl(res.res[0].file_description, Validators.required));

        break;
    
    }
}
}, error => {
// this.datalist = [];
});
    
  // }
  // })
  // this._http.post(link, { source: sourcevalue, condition: { _id: this.selecteditem._id } })
  //     .subscribe(res => {
  //         let result;
  //         result = res;
  //         if (result.status == 'error') {
  //             this.router.navigate(['/']);
  //         } else {

  //             let folder: any = '';
  //             for (let c in this.dataForm.controls) {
  //                 this.dataForm.controls[c].patchValue(result.res[0][c]);
  //                 for (let j in this.formdataval) {

  //                   if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'checkbox') {
  //                     let checkval = result.res[0][c];
  //                     if (result.res[0][c] == 1) checkval = true;
  //                     else checkval = false;
  //                     this.dataForm.controls[c].patchValue(checkval);
  //                 }
  //                     // if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'daterange') {
  //                     //     $('#inputdate' + this.formdataval[j].name).val(this.showdate(result.res[0][c]));
  //                     //     let bsValue = new Date(result.res[0][c][0]);
  //                     //     let maxDate = new Date(result.res[0][c][1]);
  //                     //     let datearr = [bsValue, maxDate];
  //                     //     this.dataForm.controls[c].patchValue(datearr);
  //                     // }
  //                     // if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'dateis') {
  //                     //     let a = result.res[0][c].split('T');
  //                     //     $('#inputdateis' + this.formdataval[j].name).val(moment(a[0]).format('MM-DD-YYYY'));
  //                     //     let bsValue = new Date(result.res[0][c][0]);
  //                     //     let maxDate = new Date(result.res[0][c][1]);
  //                     // }
  //                     // if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'timeis') {
  //                     //     if (this.formdataval[j].name == 'start_time') {
  //                     //         let sttime = new Date();
  //                     //         var spl = result.res[0][c].split(':');
  //                     //         sttime.setHours(spl[0]);
  //                     //         sttime.setMinutes(spl[1]);
  //                     //         this.start_time = sttime;
  //                     //     }
  //                     //     if (this.formdataval[j].name == 'end_time') {
  //                     //         let sttime = new Date();
  //                     //         var spl = result.res[0][c].split(':');
  //                     //         sttime.setHours(spl[0]);
  //                     //         sttime.setMinutes(spl[1]);
  //                     //         this.end_time = sttime;
  //                     //     }
  //                     // }

  //                     // if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'image') {
  //                     //     folder = this.formdataval[j].imagefolder;
  //                     //     const link = this._commonservice.base64encode + '&img=' + this.dataForm.controls[c].value + '&type=' + folder;
  //                     //     this._http.get(link)
  //                     //         .subscribe(res => {
  //                     //             let result: any;
  //                     //             result = res;
  //                     //             if (result.data != null) {
  //                     //                 this.unsafebase64imgdata[j] = result.data;
  //                     //                 this.croppedImage[j] = result.data;
  //                     //             }
  //                     //         }, error => {
  //                     //             console.log('Oooops!');
  //                     //         });
  //                     // }
  //                     // if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'file') {
  //                     //     this.percentageis[j] = 100;
  //                     //     this.lengthis[j] = 1;
  //                     //     this.flag = 0;
  //                     //     this.nameis[j] = result.res[0][c];
  //                     // }
  //                 }
  //             }
  //             this.dataForm.addControl('id', new FormControl(this.selecteditem._id, Validators.required));
  //         }
  //     }, error => {
  //         this.datalist = [];
  //     });
}

 getchkboxval(val:any){
   this.hasLessonVal = val;
     if(this.hasLessonVal==false){
     this.lessonplanValue="";
     }
}

}

