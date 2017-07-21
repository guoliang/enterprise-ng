import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'soho-fileupload',
  templateUrl: './soho-fileupload.component.html'
})

export class SohoFileUploadComponent implements AfterViewInit, OnDestroy {
  /**
   * Local variables
   */
  public isDisabled: boolean;
  public isReadOnly: boolean;

  // -------------------------------------------
  // Component Input
  // -------------------------------------------
  /**
   * @param disabled
   */
  @Input() set disabled(value: boolean) {
    this.isDisabled = value;

    if (this.fileUpload) {
      if (value) {
        this.fileUpload.disable();
        this.isDisabled = true;
      } else {
        this.fileUpload.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  /**
   * @param readonly
   */
  @Input() set readonly(value: boolean) {
    this.isReadOnly = value;

    if (this.fileUpload) {
      if (value) {
        this.fileUpload.readonly();
        this.isReadOnly = true;
      } else {
        this.fileUpload.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  /**
   * @param name
   */
  @Input() name: string;

  /**
   * @param label
   */
  @Input() label: string;

  /**
   * @param accepts filetypes
   */
  @Input() accept: string;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  /**
   * Called when the fileupload value changes
   */
  @Output() onChange = new EventEmitter<SohoTextAreaEvent>();

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  get disabled() {
    return this.isDisabled;
  }
  get readonly() {
    return this.isReadOnly;
  }

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: JQuery;

  // Reference to the SoHoXi control api.
  private fileUpload: SohoFileUploadStatic;

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Initialise the SohoXi Control
    const $fileUpload = this.jQueryElement.find('.fileupload').fileupload();
    this.fileUpload = $fileUpload.data('fileupload');

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (event: SohoFileUploadEvent) => this.onChange.emit(event));
  }

  ngOnDestroy() {
    if (this.fileUpload) {
      this.fileUpload.destroy();
      this.fileUpload = null;
    }
  }
}
