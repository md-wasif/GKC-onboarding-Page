import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ApiService } from '@app/api.service';
import { Console } from 'console';

@Component({
    selector: 'brand-management',
    templateUrl: './brand-management.component.html',
})
export class BrandManagementComponent implements OnInit {

    modalRef: BsModalRef;
    formGroup: FormGroup;
    options: Array<any> = [];
    public val: string;
    public searchInput: String;
    public products: Array<any> = [];
    public brand: Array<any> = [];
    value = true;
    public allBrands:Array<any> = [];

    public getAllBrands:Array<any> = [];
    public viewBrand:Array<any> = [];


    constructor(private modalService: BsModalService, 
      private formBuilder: FormBuilder, 
      private api_service: ApiService,
      private cd:ChangeDetectorRef
      ) {}

    ngOnInit() {
      this.api_service.getAllBrands().subscribe(res => {
        this.getAllBrands.push(res)
        if (this.getAllBrands[0].code == "OK") {
          this.allBrands = this.getAllBrands[0].data.userBrands
        }
        this.cd.detectChanges();
      })

      
      this.formGroup = this.formBuilder.group({
          Age: [null, Validators.required]
      });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
      }


    openCuisineModal(cuisineModal) {
      this.api_service.getCuisines().subscribe(res => {
        if(res.code == "OK") {
          console.log(res.data.cuisines)
          this.options = res.data.cuisines
          if ("cuisine" in localStorage) {
            let selectedCuisine = JSON.parse(localStorage.getItem("cuisine")) 
            this.searchInput = selectedCuisine.name
          }
        }
      })
      this.openModal(cuisineModal)
    }

    cuisineValue(selectedCuisine) {
      localStorage.setItem("cuisine", JSON.stringify(selectedCuisine))
    }

    openBrandModal(brandModal) {
      this.searchInput = ""
      this.api_service.getBrands().subscribe(res => {
        if(res.code == "OK") {
          this.options = res.data.brands
          if ("brand" in localStorage) {
            let selectedBrand = JSON.parse(localStorage.getItem("brand")) 
            this.searchInput = selectedBrand.name
          }
        }
        
      })

      this.openModal(brandModal)
    }

    brandValue(selectedBrand) {
      localStorage.setItem("brand", JSON.stringify(selectedBrand))
    }


    openProductsModal(productsModal) {
      this.searchInput = ""
      this.api_service.getProducts().subscribe(res => {
        if (res.code == "OK") {
          this.options = res.data.products
          if ("brand" in localStorage) {
            let selectedBrand = JSON.parse(localStorage.getItem("brand")) 
            this.searchInput = selectedBrand.name
          }
          this.openModal(productsModal)
        }
      })
    }



    createBrand() {
      let brandId = JSON.parse(localStorage.getItem("brand")) 
      let body = { 
        brandId: brandId,
        productsId: this.products
      }
      console.log(this.products)
      this.api_service.createBrand(body).subscribe(res => {
        if (res) {
          window.location.reload();
          // localStorage.clear();
        }
      })
    }



    testProducts(e, product) {
      if (e.target.checked == true) {
        this.products.push(product._id);
        this.brand.push(product.name)
      }
      else {
        let array = this.products.indexOf(product, 0)
        this.products.splice(array, 1)
      }
    }



    openBrandDetailsModal(brands, viewBrandDetailsModal) {
      this.viewBrand = [];
      this.api_service.viewBrand(brands._id).subscribe(res => {
      this.viewBrand.push(res)
      if(this.viewBrand[0].code == "OK") {
        this.options = this.viewBrand[0].data.getuserbrands
      }
        this.openModal(viewBrandDetailsModal)
      })

    }




    openUpdateBrandDetailsModal(brands, viewUpdateBrandDetailsModal) {
      let selectedProducts: Array<any> = [];
      localStorage.setItem("brand",JSON.stringify(brands.brand._id))
      this.api_service.viewBrand(brands._id).subscribe(response => {
        selectedProducts =  response.data.getuserbrands.product
        console.log(selectedProducts)
      })
      this.api_service.getProducts().subscribe(res => {
        if (res.code == "OK") {
          console.log(res.data.products)
          this.options = res.data.products
          this.options = this.options.map((el)=>{
            if (selectedProducts.find(x => x._id == el._id)) {
              return {...el, isChecked:true}
            }
            else {
              return {...el, isChecked:false}
            }
             
          })
          this.openModal(viewUpdateBrandDetailsModal)
        }
      })
    }


    toggleUser(event:any, brand:any){
      console.log(event, brand)
        let body = {
            isActive: event.checked
          }
        this.api_service.toggleBrand(body, brand).subscribe(res=>{
            console.log(res)
          })
}
  

    // openBrandModal() {
    //   this.searchInput = ""
    //   this.api_service.getBrands().subscribe(res => {
    //     this.options = res
    // }

    // ngOnInit(): void {
    //   this.formGroup = this.formBuilder.group({
    //     Email: ['', [
    //         Validators.required,
    //         Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    //     ]],
    //     Password: ['', [
    //         Validators.required,
    //         Validators.minLength(8),
    //         Validators.maxLength(20)
    //     ]],
    //     Check: [false, Validators.requiredTrue],
    //     Age: [null, Validators.required],
    // });
    // }




    // openCuisineModal(cuisineModal) {
    //     this.userManagementService.viewUser(row._id).subscribe(res => {
    //       this.viewUserDetails = res
    //     })
    //     this.openModal(cuisineModal)
    //   }
}