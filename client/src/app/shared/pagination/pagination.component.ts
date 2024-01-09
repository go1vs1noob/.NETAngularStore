import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {



  @Input() collectionSize = 0;
  @Input() pageSize = 0;
  @Input() maxPagesDisplayed = 3;
  @Output() pageChanged = new EventEmitter<number>();
  @Input() currentPage = 1;

  ngOnInit() {
    console.log(this.collectionSize, this.pageSize);
  }
  onChangeCurrentPage(index: number) {
    this.currentPage = index;
    this.pageChanged.emit(this.currentPage);
  }
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.pageChanged.emit(this.currentPage);
    }

  }
  onNextPage() {
    if (this.currentPage < this.getPageAmount()) {
      this.currentPage += 1;
      this.pageChanged.emit(this.currentPage);
    }
  }
  getPageAmount() {
    return Math.ceil(this.collectionSize / this.pageSize);
  }
  pageIsDisplayed(index: number) {
    return true;
    return Math.abs(index - this.currentPage) <= this.maxPagesDisplayed / 2;
  }
}
