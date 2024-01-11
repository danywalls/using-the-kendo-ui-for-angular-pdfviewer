import {Component, inject, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {PDFViewerComponent, PDFViewerModule, PDFViewerPageChangeEvent} from "@progress/kendo-angular-pdfviewer";
import {ReaderService} from "./services/reader.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PDFViewerModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'elearning-platform';
  readerService = inject(ReaderService);
  toolbarOptions = this.readerService.toolbar;
  @ViewChild('pdfViewer') pdfViewer!: PDFViewerComponent;
  acceptTerms: boolean = false;
  pdfAssetUrl = '';
  bookName!: string;
  pageLimit = 2;
  showMessageWall = false;

  bookPage = this.readerService.getPage();
  selectBook() {
    this.pdfAssetUrl = `${this.readerService.assetURL}${this.bookName}`;
  }

  saveCurrentPage($event: PDFViewerPageChangeEvent) {
    const { currentPage } = $event;
    this.readerService.savePage(currentPage);
    this.canReadMore(currentPage);

  }
  loadPage() {
    this.bookPage = this.readerService.getPage();
    this.pdfViewer.scrollToPage(this.bookPage);
  }

  activateDownload() {
    this.readerService.allowDownload(this.acceptTerms);
  }

  private canReadMore(currentPage: number) {

    if (currentPage > this.pageLimit) {
      
      this.pdfViewer.scrollToPage(this.pageLimit);
      this.showMessageWall = true;
    } else {
      this.showMessageWall = false;
    }
  }



}
