import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NotifierService } from 'angular-notifier';
import { ApiServiceService } from 'app/api-service.service';
import { forbiddenSpaceValidator } from 'app/shared/space.validator';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent {

  titleBlog = 'Edit Blog!';
  private readonly notifier: NotifierService;

  editForm = this.fb.group({
    title: ['',
     [
        Validators.required,
        Validators.minLength(2),
        forbiddenSpaceValidator
      ]
    ],
    description: ['',
      [
        Validators.required,
        Validators.minLength(2),
        forbiddenSpaceValidator
      ]
    ],
    content: ['',
      [
        Validators.required,
        Validators.minLength(2),
        forbiddenSpaceValidator
       ]
    ],
    visible: [false]
  });

  get title() {
    return this.editForm.get('title')!;
  }

  get description() {
    return this.editForm.get('description')!;
  }

  get content() {
    return this.editForm.get('content')!;
  }

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private apiService: ApiServiceService,
              notifierService: NotifierService,
              private router: Router,
              private titleService: Title
              ) {
              this.notifier = notifierService;
              this.titleService.setTitle('Edit blog');
            }
  editBlog(): void {
    this.activeModal.close(this.editForm.value);
  }
}
