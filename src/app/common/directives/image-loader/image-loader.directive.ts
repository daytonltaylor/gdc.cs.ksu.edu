import { AfterContentInit, Directive, ElementRef, Renderer2, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Directive({
  selector: '[image-loader]'
})
export class ImageLoaderDirective implements AfterContentInit, OnDestroy {
  @Output() error: EventEmitter<any> = new EventEmitter<any>();
  @Input('alt-url') set setFallbackUrl(url: string) {
    this.alternateUrl = url;
  }

  private cancelOnLoad: Function;
  private cancelOnError: Function;

  private element: HTMLElement;
  private alternateUrl = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterContentInit() {
    this.element = this.el.nativeElement;
    this.onLoad = this.onLoad.bind(this);
    this.onError = this.onError.bind(this);
    this.cancelOnLoad = this.renderer.listen(this.element, 'load', this.onLoad);
    this.cancelOnError = this.renderer.listen(this.element, 'error', this.onError);
  }

  updateImage(url: string): void {
    this.renderer.setAttribute(this.element, 'src', url);
  }

  reload(): void {
    this.updateImage(this.element.getAttribute('src') + '?ts=' + Date.now());
  }

  private onLoad(): void {
    this.removeOnLoadEvent();
  }

  private onError(): void {
    if (this.element.getAttribute('src') !== this.alternateUrl) {
      this.renderer.setAttribute(this.element, 'src', this.alternateUrl);
      this.error.emit();
    } else {
      this.removeOnLoadEvent();
    }
  }

  private removeOnLoadEvent() {
    if (this.cancelOnLoad) {
      this.cancelOnError();
    }
  }

  private removeOnErrorEvent() {
    if (this.cancelOnError) {
      this.cancelOnError();
    }
  }

  ngOnDestroy() {
    this.removeOnLoadEvent();
    this.removeOnErrorEvent();
  }
}

// Code source: https://itnext.io/angular-2-progressive-image-loader-a1b053195d14
