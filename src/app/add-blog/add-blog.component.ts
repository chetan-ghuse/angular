import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { NotifierService } from 'angular-notifier';
import { ApiServiceService } from './../api-service.service';


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  titleBlog = "Add Blog!";
  private readonly notifier: NotifierService ;
  userBlog: Array<any> = [];

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
             private titleService: Title) { 
              this.notifier = notifierService;
              this.titleService.setTitle('Add blog');
            }

  blogForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(2)]],
    content: ['',[Validators.required, Validators.minLength(2)]],
    visible: ['']
  });

  

  ngOnInit(): void {
  }
  addBlog() {
    const details = this.blogForm.value;
    console.log(details);
    this.apiService.createBlog(details).subscribe(() => {
      this.router.navigateByUrl('/home');
      this.notifier.notify('success','Blog added successfully');
    }, () => this.notifier.notify('error','Sorry blog is not added')); 
  }
}
