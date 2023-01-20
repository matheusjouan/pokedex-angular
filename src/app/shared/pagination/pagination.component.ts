import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pagination } from 'src/app/models/Pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() pageProps: Pagination = {} as Pagination;
  @Output() emitEventChangePage: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number = 1;
  pageSize: number = 20;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.pageProps.count / this.pageSize)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createPaginationItem();
    console.log(this.currentPage);
  }

  public setPage(page: number) : void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;

      var offset = (this.currentPage * this.pageProps.limit) - this.pageProps.limit;
      this.emitEventChangePage.emit(offset);
    }
  }

  public createPaginationItem() {
    if (this.currentPage == 1) {
      this.pages = [];
      this.pages.push(this.currentPage, this.currentPage + 1, this.currentPage + 2);
    }

    else if(this.currentPage == this.totalPages) {
      this.pages = [];
      this.pages.push(this.currentPage - 2, this.currentPage - 1, this.currentPage);
    }

    else {
      this.pages = [];
      this.pages.push(this.currentPage - 1, this.currentPage, this.currentPage + 1);
    }
  }
}
