import { Component, OnInit } from '@angular/core';

import { ApiServiceService } from './../api-service.service';

@Component({
  selector: 'app-users-blog',
  templateUrl: './users-blog.component.html',
  styleUrls: ['./users-blog.component.scss']
})
export class UsersBlogComponent implements OnInit {

  allUsersBlog: Array<any> = [];
  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllUsersBlog();
    this.allUsersBlog = JSON.parse(localStorage.getItem('allUsers')!);
      // console.log(this.allUsersBlog);
  }

  getAllUsersBlog() {
    this.apiService.allUsersBlog()
                        .subscribe(bdata => {
                          //console.log("get block successfully", bdata["response"]);
                          this.allUsersBlog = bdata["response"];
                          localStorage.setItem('allUsers', JSON.stringify(this.allUsersBlog));
                        },
                        error => {
                          console.log("Error",error);
                        });
  }

}
