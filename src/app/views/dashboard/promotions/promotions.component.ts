import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener, TemplateRef } from '@angular/core';
import { ColumnMode, SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { PromotionsService } from './promotions.service'
import { ScreenSizeService } from '@app/shared/services/screen-size.service';
import { delay } from 'rxjs/operators';
import { SCREEN_SIZE } from '@app/shared/types/screen-size.enum';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '@app/api.service';
import { Router } from '@angular/router';


@Component({
    selector: 'promotions',
    templateUrl: './promotions.component.html',
    styleUrls: ['./promotions.component.scss'],
    providers: [
        PromotionsService,
        ScreenSizeService
    ],
})
export class PromotionsComponent implements OnInit {
    formGroup = this.formBuilder.group({
                firstname: [null, [Validators.required]],
                lastname: [null, [Validators.required]],
                email: [null, [Validators.required]],
                password: [null, [Validators.required]]
            });
    
    temp = [];
    selected = [];
    users = []
    columnMode: ColumnMode = ColumnMode.force;
    SelectionType = SelectionType;
    rowHeight: 'auto' | number = 'auto'
    scrollbarH: boolean = false
    modalRef: BsModalRef;
    public viewUserDetails:Array<any> = [];
    value = true;
    public allUsers:Array<any> = []
    public user;

    public getAllUsersResponse:Array<any> = [];
    public getUserResponse:Array<any> = [];

    
    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(private promotionsService: PromotionsService, private cdr: ChangeDetectorRef, private screenSizeSvc: ScreenSizeService, private modalService: BsModalService, private formBuilder: FormBuilder, private api_service: ApiService, private router: Router) {  
        this.screenSizeSvc.onResize$.pipe(delay(0)).subscribe(sizes => {
            const sizeTabletAbove = sizes.includes(SCREEN_SIZE.XXL) ||  sizes.includes(SCREEN_SIZE.XL) || sizes.includes(SCREEN_SIZE.LG)
            if(sizeTabletAbove){
                this.rowHeight = 'auto'
                this.scrollbarH = false
                this.columnMode = ColumnMode.force;
            } else {
                this.rowHeight = 68
                this.scrollbarH = true
                this.columnMode = ColumnMode.force;
            }
            this.cdr.markForCheck()
        });
    }

    ngOnInit() {
        this.getUsers();
         
    }

    //get users data on load
    getUsers() {
        this.promotionsService.getUsers().subscribe(data => {
            this.getAllUsersResponse.push(data)
            if (this.getAllUsersResponse[0].code == "OK") {
                this.users = this.getAllUsersResponse[0].data.users
                console.log(this.users)
            }
            // this.temp = [...data]
            this.cdr.markForCheck();
        });
    }


    //create user API
    createUser(createusertemplate) {
    let body = { 
      firstName: this.formGroup.value.firstname,
      lastName: this.formGroup.value.lastname,
      email: this.formGroup.value.email,
      password: this.formGroup.value.password
    }
    this.promotionsService.createUser(body).subscribe(res => {
      if (res) {
        this.modalService.hide(createusertemplate);
        window.location.reload();
        }
      })
    }


    // view user API
    viewUserModal(row, viewUserModal) {
        this.promotionsService.viewUser(row._id).subscribe(res => {
            this.getUserResponse.push(res)
            if(this.getUserResponse[0].code == "OK") {
                this.viewUserDetails = this.getUserResponse[0].data.getuserDetails
            }
        
        })
        this.openModal(viewUserModal)
    }


    // open update user modal
    updateUserModal(row, updatetemplate) {
        this.user = row;
        this.promotionsService.viewUser(row._id).subscribe(res => {
            this.viewUserDetails = res[0]
            console.log(this.viewUserDetails)
            })
        this.openModal(updatetemplate)
    }


    // open update user modal
    updateUserDetails(user, updatetemplate) {
        let body = { 
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }
          this.promotionsService.updateUserDetails(body, user._id).subscribe(res => {
              if(res) {
                this.modalService.hide(updatetemplate);
                window.location.reload();
              }
          })
    }

    // delete user
    deleteUser(user) {
        this.promotionsService.deleteUser(user).subscribe(res=>{
          if(res) {
            let array = this.allUsers.indexOf(user, 0)
                  this.allUsers.splice(array, 1)
            window.location.reload();
          }
        })
      }


      toggleUser(event:any, user:any){
            let body = {
                isActive: event.checked
              }
            this.promotionsService.toggleUser(body, user).subscribe(res=>{
              })
    }

    
    // createUserForm(){
    //     this.formGroup = this.formBuilder.group({
    //         firstname: [null, [Validators.required]],
    //         lastname: [null, [Validators.required]],
    //         email: [null, [Validators.required]],
    //         password: [null, [Validators.required]]
    //     });
    // }

   

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
            // this.createUserForm();
        
      }

    @HostListener('window:resize', ['$event'])windowResize(event) {
        this.getScreenWidth(event.target.innerWidth)
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.users = temp;
        this.table.offset = 0;
    }

    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }
    
    onActivate(event) {
    }

    getScreenWidth(size:number) {
        this.screenSizeSvc.onResize(size)
    }


  

  


  
}
