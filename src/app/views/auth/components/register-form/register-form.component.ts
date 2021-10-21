import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ApiService } from '@app/api.service';
import { Router } from '@angular/router';


@Component({
    selector: 'register-form',
    templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {
    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private api_service: ApiService, private router: Router) {}

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            firstname: [null, [Validators.required]],
            lastname: [null, [Validators.required]],
            email: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    register() {
        let body = { 
            firstName: this.formGroup.value.firstname,
            lastName: this.formGroup.value.lastname,
            email: this.formGroup.value.email,
            password: this.formGroup.value.password
          }
        this.api_service.register(body).subscribe(res => {
            if (res.code == "OK") {
              this.router.navigate(['/auth/login']);
            }
          })
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.formGroup.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    };
}
