import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-dynamic',
  templateUrl:'./dynamic.component.html',
  styles: [
    `
      .dynamic-delete-button {
        cursor: pointer;
        position: relative;
        top: 4px;
        font-size: 24px;
        color: #999;
        transition: all .3s;
      }
    `
  ]
})
export class DynamicComponent implements OnInit {
  validateForm: FormGroup;
  controlArray = [];

  addField(e?: MouseEvent) {
    if (e) {
      e.preventDefault();
    }
    const id = (this.controlArray.length > 0) ? this.controlArray[this.controlArray.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };
    const index = this.controlArray.push(control);
    console.log(this.controlArray[this.controlArray.length - 1]);
    this.validateForm.addControl(this.controlArray[index - 1].controlInstance, new FormControl(null, Validators.required));
  }

  removeField(i, e: MouseEvent) {
    e.preventDefault();
    if (this.controlArray.length > 1) {
      const index = this.controlArray.indexOf(i);
      this.controlArray.splice(index, 1);
      console.log(this.controlArray);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    console.log(this.validateForm.value);
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({});
    this.addField();
  }
}