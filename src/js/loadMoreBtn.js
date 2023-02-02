    class LoadMoreBtn {
    constructor({ selector, isHidden = false }) {
      this.button = this.getButton(selector);
  
      isHidden && this.hide();
    }
  
    getButton(selector) {
      return document.querySelector(selector);
    }
  
    enable() {
      this.button.disabled = false;
    }
  
    disable() {
      this.button.disabled = true;
    }
  
    hide() {
      this.button.classList.add("hidden");
    }
  
    show() {
      this.button.classList.remove("hidden");
    }
  }
  export { LoadMoreBtn }