import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnChanges
} from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() blogs: Array<any> =[];
  @Output() updateLikeEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();
  @Output() editBlogEmitter = new EventEmitter();
  tableDataSource$: any;
  displayedColumns!: string[];
  displayedColumnsRow2!: string[];
  blogId!: number;
  blogLikes: Array<any> = [];
  blogComments: Array<any> = [];

  constructor(
    private modalService: NgbModal,
    private cd: ChangeDetectorRef
  ) { }

  ngOnChanges(): void {
    const userBlogs = JSON.parse(JSON.stringify(this.blogs));
    userBlogs.forEach((row: any) => {
      row['isCollapsed'] = true;
    });
    this.tableDataSource$ = new BehaviorSubject(userBlogs);
    this.displayedColumns = [
      'user',
      'title',
      'description',
      'content',
      'likeAndComment',
      'image',
      'createdAt',
      'delete'
    ];
    this.displayedColumnsRow2 = [
      'titleRow2',
    ];
  }

  sortData(sort: Sort) {
    const data = this.tableDataSource$._value.slice();
    if (!sort.active || sort.direction === '') {
      this.tableDataSource$._value = data;
      return;
    }

    this.tableDataSource$._value = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'user': return this.compare(a.user.firstName, b.user.firstName, isAsc);
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'description': return this.compare(a.description, b.description, isAsc);
        case 'content': return this.compare(a.content, b.content, isAsc);
        case 'likeAndComment': return this.compare(a.likeItems, b.likeItems, isAsc);
        case 'createdAt': return this.compare(a.createdAt, b.createdAt, isAsc);
        default: return 0;
      }
    });
    this.tableDataSource$.next(this.tableDataSource$._value);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getBlogId(id: number, content: any): void {
    this.blogId = id;
    this.modalService.open(content, { centered: true });
  }

  getLikes(index: number): void {
    this.blogLikes = this.blogs[index]['likeItems'];
  }

  getComments(index: number): void {
    this.blogComments = this.blogs[index]['commentItems'];
  }
  openEditModal(currBlog: any) {
     this.editBlogEmitter.emit(currBlog);
  }

  addRemoveLike(id: number): void {
    this.updateLikeEmitter.emit(id);
  }

  delBlog(): void {
    this.deleteEmitter.emit(this.blogId);
  }
}
