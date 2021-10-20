import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ApiService } from '@app/api.service';
import { Router } from '@angular/router';


@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

    formGroup: FormGroup;
    showResult = false
    showPassword = false

    @Input() thirPartyLogin = true
 
    constructor(private formBuilder: FormBuilder, private api_service: ApiService, private router: Router) {}

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            email: ['', [
                Validators.required
            ]],
            password: ['', [
                Validators.required
            ]]
        });
    }
 
    login() {
        let body = { 
            email: this.formGroup.value.email,
            password: this.formGroup.value.password
          }
        
        this.api_service.login(body).subscribe(res => {
            localStorage.setItem("token",res.data.token)
            if (res.code) {
              this.router.navigate(['/dashboard/usermanagement']);
            }
          })
    }

    onShowPasswordClick () {
        this.showPassword = !this.showPassword
    }
 
    onReset() {
        this.formGroup.reset();
    }
}
