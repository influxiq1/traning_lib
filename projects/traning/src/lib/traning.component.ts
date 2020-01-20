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
  public headerText : any="Add Training";

  @Input()
    set formdata(formdata: string) {
        this.formdataval = (formdata) || '<no name set>';
        console.log("total form data",this.formdataval);
    }

  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
    console.log(this.serverDetailsVal);
  }

  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
    this.menuval = this.formSourceVal.formTitleName;
  }
  @Input()
  set ListingPageRoute(val: any) {
    this.listingPageRoute = (val) || '<no name set>';
    console.log("listing page ",this.listingPageRoute);
    
  }
   

  constructor( formgroup: FormBuilder, public cookeiservice: CookieService, public sanitizer: DomSanitizer, public route: ActivatedRoute, public router: Router, public apiService: ApiService, public _http: HttpClient) {
    this.formgroup = formgroup;
   }

  ngOnInit() {

        this.route.params.subscribe(params => {
            this.recid = params['id'];
            if (this.recid !=null && this.recid !='' && this.recid !=undefined) {
              this.headerText="Edit Training";
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
              let tempdefault = [];
              // if (this.formdataval[c].multiple != null && this.formdataval[c].multiple == true){}
              // console.log(tempdefault);
              
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
                console.log('select is workiing');
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
    this.issubmit = 1;
    for (let y in this.dataForm.controls) {
        this.dataForm.controls[y].markAsTouched();
    }
    if (this.dataForm.valid && this.submitval == 1) {
      console.log(this.dataForm.value);
      if (this.dataForm.value.status)
          this.dataForm.value.status = parseInt("1");
        else
          this.dataForm.value.status = parseInt("0");
      
      const link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
        let data: any ={
          source: this.formSourceVal.source,
          data: this.dataForm.value,
          sourceobj: ["parent_category"],
          token:this.serverDetailsVal.jwttoken
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
          token:this.serverDetailsVal.jwttoken,
        }
        
        this.apiService.getData(link, data)
        
            .subscribe(res => {
                let result;
                result = res;
                if (result.status == 'error') {
                    // this.router.navigate(['/']);
                } else {
                    this.formdataval[c].sourceval = result.res;
                }
            }, error => {
                this.formdataval[c].sourceval = [];
            });
    } else {
      
        this.apiService.localJsonSate(source)
            .subscribe((res:any) => {
                this.formdataval[c].sourceval =  res;
            }, error => {
                this.formdataval[c].sourceval = [];
            });
    }

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
      // this.router.navigate(['/']);
  } else {

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

}

