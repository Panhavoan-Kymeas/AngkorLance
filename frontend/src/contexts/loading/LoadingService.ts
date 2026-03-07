class LoadingServiceClass {
  private setLoadingFn: ((loading: boolean) => void) | null = null;

  register(fn: (loading: boolean) => void) {
    this.setLoadingFn = fn;
  }

  show() {
    this.setLoadingFn?.(true);
  }

  hide() {
    this.setLoadingFn?.(false);
  }
}

export default new LoadingServiceClass();