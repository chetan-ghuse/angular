import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { ApiServiceService } from './../api-service.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-users-blog',
  templateUrl: './users-blog.component.html',
  styleUrls: ['./users-blog.component.scss']
})
export class UsersBlogComponent implements OnInit {

  allUsersBlog: Array<any> = [];
  blogLikes: Array<any> = [];
  blogComments: Array<any> = [];
  private readonly notifier: NotifierService ;

  constructor(private apiService: ApiServiceService,
              private titleService: Title,
              notifierService: NotifierService) {
                this.titleService.setTitle('All blog');
                this.notifier = notifierService;
               }

  ngOnInit(): void {
    this.getAllUsersBlog();
    this.allUsersBlog = JSON.parse(localStorage.getItem('allUsers')!);
  }

  getAllUsersBlog() {
    this.apiService.allUsersBlog().subscribe(bdata => {
      this.allUsersBlog = bdata['response'];
      localStorage.setItem('allUsers', JSON.stringify(this.allUsersBlog));
    });
  }

  getLikes(index: number) {
    this.blogLikes = this.allUsersBlog[index]['likeItems'];
  }

  getComments(index: number) {
    this.blogComments = this.allUsersBlog[index]['commentItems'];
  }

  increaseLikes(blogId: number) {
    this.apiService.addLikes(blogId).subscribe((data) => {
      if(data.msg == 'Like entry added') {
      this.notifier.notify('success','Like added successfully');
      } else if(data.msg == 'Like Deleted'){
          this.notifier.notify('success','Like removed successfully');
      }
      this.getAllUsersBlog();
    },() => this.notifier.notify('error','Like is not added'));
  }

}
