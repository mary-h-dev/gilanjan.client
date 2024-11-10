declare module 'jquery' {
    interface JQuery<TElement = HTMLElement> {
      pDatepicker(options?: any): JQuery<TElement>;
    }
  }
  