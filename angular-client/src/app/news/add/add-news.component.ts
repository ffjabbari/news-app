import { Component, OnInit } from '@angular/core';
import { News } from '../../core/models/news.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.pug',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  addNewsFormGroup: FormGroup;
  news: News = {
    title: null,
    body: '',
    date: null,
    archived: false,
    deleted: false,
  };

  constructor(private dialogRef: MatDialogRef<AddNewsComponent>) {}

  ngOnInit() {
    this.addNewsFormGroup = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      body: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onAccept() {
    this.news.title = this.title.value;
    this.news.body = this.body.value;
    this.news.date = new Date();
    this.dialogRef.close(this.news);
  }

  onReset() {
    this.title.reset();
    this.body.reset();
  }

  get title() { return this.addNewsFormGroup.get('title'); }

  get body() { return this.addNewsFormGroup.get('body'); }

}
