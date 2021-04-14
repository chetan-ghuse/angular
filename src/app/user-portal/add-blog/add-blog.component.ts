import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NotifierService } from 'angular-notifier';
import { ApiServiceService } from 'app/api-service.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent {
  titleBlog = 'Add Blog!';
  private readonly notifier: NotifierService ; 

  get title() {
    return this.blogForm.get('title')!;
  }

  get description() {
    return this.blogForm.get('description')!;
  }

  get content() {
    return this.blogForm.get('content')!;
  }

  constructor(private fb: FormBuilder,
              private apiService: ApiServiceService,
              notifierService: NotifierService,
              private router: Router,
              private titleService: Title,
              public activeModal: NgbActiveModal) { 
              this.notifier = notifierService;
              this.titleService.setTitle('Add blog');
            }

  blogForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(2)]],
    content: ['',[Validators.required, Validators.minLength(2)]],
    visible: ['']
  });

  addBlog() {
    this.activeModal.close(this.blogForm.value);
  }

}
