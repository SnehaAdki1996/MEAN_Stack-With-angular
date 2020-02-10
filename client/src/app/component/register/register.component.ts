import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  form: FormGroup;

  createForm() {
    this.form = this.formBuilder.group(
      {
        email: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
            this.validateEmail
          ])
        ],
        username: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(15),
            this.validateUserName
          ])
        ],
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(15),
            this.validatePassword
          ])
        ],
        confirm: ["", Validators.required]
      },
      { validator: this.matchPassword("password", "confirm") }
    );
  }

  validateEmail(controls) {
    const regExp = new RegExp(
      "^(?=^.{10,30}$)(?=^[A-Za-z0-9])[A-Za-z0-9.]+@[A-Za-z0-9]+.[A-Za-z]{2,}"
    );
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { validateEmail: true };
    }
  }

  validateUserName(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { validateUserName: true };
    }
  }

  validatePassword(controls) {
    const regEx = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]){8,35}/
    );
    if (regEx.test(controls.value)) {
      return null;
    } else {
      return { validatePassword: true };
    }
  }

  matchPassword(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { matchPassword: true };
      }
    };
  }
  ngOnInit() {}
  logIn() {}
}
