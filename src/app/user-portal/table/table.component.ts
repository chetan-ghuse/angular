import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnChanges,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import {Sort} from '@angular/material/sort';

import * as fromGetUser from 'app/state/selector/get-user.selectors';
import { AddBlogComponent } from '../add-blog/add-blog.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() blogs: Array<any> =[];
  @Output() passBlogIdForLike = new EventEmitter();
  @Output() passBlogIdForDel = new EventEmitter();
  @Output() passBlogRow = new EventEmitter();
  public controlRow: Array<any> = [];
  public currUser!: string;
  tableDataSource$: any;
  displayedColumns!: string[];
  displayedColumnsRow2!: string[];
  blogId!: number;
  blogLikes: Array<any> = [];
  blogComments: Array<any> = [];

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  currBlogs!: any;

  constructor(
    private modalService: NgbModal,
    private store: Store,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(fromGetUser.getCurrentUser)).subscribe(
      currUser => this.currUser = currUser.response.firstName
    );
    
  }

  ngOnChanges(): void {
    this.currBlogs = new MatTableDataSource(this.blogs);
    console.log(this.currBlogs);
    this.tableDataSource$ = new BehaviorSubject(this.currBlogs.data);
    console.log(this.tableDataSource$);
    this.blogs.forEach(row => {
      this.controlRow.push({
        isCollapsed: true
      })
    });
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

  ngAfterViewInit() {
    this.tableDataSource$.sort = this.sort;
  }

  sortData(event: any) {
    console.log(event);
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
     this.passBlogRow.emit(currBlog);
  }

  addRemoveLike(id: number): void {
    this.passBlogIdForLike.emit(id);
  }

  delBlog(): void {
    this.passBlogIdForDel.emit(this.blogId);
  }
}
