import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { forbiddenSpaceValidator } from 'app/shared/validators/space.validator';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent {
  titleBlog = 'Add Blog!';

  blogForm = this.fb.group({
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
    return this.blogForm.get('title')!;
  }

  get description() {
    return this.blogForm.get('description')!;
  }

  get content() {
    return this.blogForm.get('content')!;
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private titleService: Title
    ) {
    this.titleService.setTitle('Add blog');
  }

  addBlog(): void {
    this.activeModal.close(this.blogForm.value);
  }

}
