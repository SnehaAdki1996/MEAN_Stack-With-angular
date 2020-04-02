import { AuthService } from "./../../services/auth.service";
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
  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.createForm();
  }

  form: FormGroup;
  message;
  messageClass;
  emailValid;
  emailMessage;
  userValid;
  userMessage;
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

  disableForm() {
    this.form.controls["email"].disable();
    this.form.controls["username"].disable();
    this.form.controls["password"].disable();
    this.form.controls["confirm"].disable();
  }
  enableForm() {
    this.form.controls["email"].enable();
    this.form.controls["username"].enable();
    this.form.controls["password"].enable();
    this.form.controls["confirm"].enable();
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
  logIn() {
    this.disableForm();
    const user = {
      email: this.form.get("email").value,
      password: this.form.get("password").value,
      userName: this.form.get("username").value
    };
    this.auth.registerUser(user).subscribe(res => {
      console.log(res);
      if (!res["success"]) {
        this.messageClass = "alert alert-danger";
        this.message = res["message"];
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = res["message"];
      }
    });
  }

  checkEmail() {
    this.auth.checkEmail(this.form.get("email").value).subscribe(res => {
      if (res.success) {
        this.emailValid = true;
        this.emailMessage = res["message"];
      } else {
        this.emailValid = false;
        this.emailMessage = res["message"];
      }
    });
  }

  checkUserName() {
    this.auth.checkUsername(this.form.get("username").value).subscribe(res => {
      if (res.success) {
        this.userValid = true;
        this.userMessage = res["message"];
      } else {
        this.userValid = false;
        this.userMessage = res["message"];
      }
    });
  }
}
