import {customAttribute, inject, bindingMode, TaskQueue} from 'aurelia-framework';

@customAttribute('focus', bindingMode.twoWay)
@inject(Element, TaskQueue)
export class Focus {
  constructor(element, taskQueue) {
    this.element = element;
    this.taskQueue = taskQueue;

    this.focusListener = e => this.value = true;
    this.blurListener = e => {
      if (document.activeElement !== this.element) {
        this.value = false;
      }
    };
  }

  giveFocus() {
    this.taskQueue.queueMicroTask(() => {
      if (this.value) {
          this.element.focus();
      }
    });
  }

  valueChanged(newValue) {
    if (newValue) {
      this.giveFocus();
    } else {
      this.element.blur();
    }
  }

  attached() {
    this.element.addEventListener('focus', this.focusListener);
    this.element.addEventListener('blur', this.blurListener);
  }

  detached() {
    this.element.removeEventListener('focus', this.focusListener);
    this.element.removeEventListener('blur', this.blurListener);
  }

}
