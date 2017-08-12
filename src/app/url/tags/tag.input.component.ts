import {OnChanges, Component, HostBinding, Input, Output, Provider, forwardRef, EventEmitter, SimpleChanges} from '@angular/core';
import {NgControl} from '@angular/forms';

import {TagInputItemComponent} from './tag.input.item.component';

function isBlank(txt){
  if(txt === null || txt === undefined || txt ===NaN || txt ==='' || txt ===0 || txt ===false) return true;

  return false;
}

@Component({
  selector: 'tag-input',
  template:
  ` 
    <tag-input-item
    [text]="tag"
    [index]="index"
    [selected]="selectedTag === index"
    (tagRemoved)="_removeTag($event)"
    *ngFor="let tag of ngModel; let index = index">
  </tag-input-item>
  <input
    class="ng2-tag-input-field"
    type="text"
    [placeholder]="placeholder"
    [(ngModel)]="inputValue"
    (paste)="inputPaste($event)"
    (keydown)="inputChanged($event)"
    (blur)="inputBlurred($event)"
    (focus)="inputFocused()"
    #tagInputRef>`,

  styles: [`
    :host {
      display: block;
      box-shadow: 0 1px #ccc;
      padding: 5px 0;
    }

    :host.ng2-tag-input-focus {
      box-shadow: 0 2px #0d8bff;
    }

    .ng2-tag-input-field {
      box-shadow: none;
      border: 0;
    }
  `]
})
export class TagInputComponent {
  @Input() placeholder: string = 'Add a tag';
  @Input() ngModel: string[]; //incoming tags
  @Input() delimiterCode: string = '188';
  @Input() addOnBlur: boolean = true;
  @Input() addOnEnter: boolean = true;
  @Input() addOnPaste: boolean = true;
  @Input() allowedTagsPattern: RegExp = /.+/;

  @Output() onTagListChanged = new EventEmitter<string[]>();  

  @HostBinding('class.ng2-tag-input-focus') isFocussed;

  //public tagsList: string[];
  public inputValue: string = '';
  public delimiter: number;
  public selectedTag: number;

  constructor(private _ngControl: NgControl) {
    console.log("TagInputComponent constructor");
    this._ngControl.valueAccessor = this;
  }
/*
  ngOnInit() {
    console.log("TagInputComponent ngOnInit");
    if (this.ngModel) this.tagsList = this.ngModel;
    this.onChange(this.tagsList);
    this.delimiter = parseInt(this.delimiterCode);
  }*/
  ngOnInit() {
    console.log("TagInputComponent ngOnInit");
    //if (this.ngModel) this.tagsList = this.ngModel;
    this.onChange(this.ngModel);
    this.delimiter = parseInt(this.delimiterCode);
  }
  ngOnChanges(changes: SimpleChanges) {
    //console.log("feeds.component.ts::FeedListComponent - ngOnChanges");
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`TagInputComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
     
    }
  }

  ngAfterViewInit() {
    console.log("TagInputComponent ngAfterViewInit");
    // If the user passes an undefined variable to ngModel this will warn
    // and set the value to an empty array
    if (!this.ngModel) {
      console.warn('TagInputComponent was passed an undefined value in ngModel. Please make sure the variable is defined.');
      this.ngModel = [];
      this.onChange(this.ngModel);
    }
  }

  inputChanged(event) {
    console.log("TagInputComponent inputChanged");
    let key = event.keyCode;
    switch(key) {
      case 8: // Backspace
        this._handleBackspace();
        break;
      case 13: //Enter
        this.addOnEnter && this._addTags([this.inputValue]);
        event.preventDefault();
        break;

      case this.delimiter:
        this._addTags([this.inputValue]);
        event.preventDefault();
        break;

      default:
        this._resetSelected();
        break;
    }
  }

  inputBlurred(event) {
    console.log("TagInputComponent inputBlurred");
    this.addOnBlur && this._addTags([this.inputValue]);
    this.isFocussed = false;
  }
  inputFocused(event) {
    console.log("TagInputComponent inputFocused");
    this.isFocussed = true;
  }

  inputPaste(event) {
    console.log("TagInputComponent inputPaste");
    let clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    let pastedString = clipboardData.getData('text/plain');
    let tags = this._splitString(pastedString);
    let tagsToAdd = tags.filter((tag) => this._isTagValid(tag));
    this._addTags(tagsToAdd);
    setTimeout(() => this.inputValue = '', 3000);
  }

  private _splitString(tagString: string) {
    console.log("TagInputComponent _splitString");
    tagString = tagString.trim();
    let tags = tagString.split(String.fromCharCode(this.delimiter));
    return tags.filter((tag) => !!tag);
  }

  private _isTagValid(tagString: string) {
    console.log("TagInputComponent _isTagValid");
    return this.allowedTagsPattern.test(tagString);

  }

  private _addTags(tags: string[]) {
    console.log("TagInputComponent _addTags");
    let validTags = tags.filter((tag) => this._isTagValid(tag));
    this.ngModel = this.ngModel.concat(validTags);
    this._resetSelected();
    this._resetInput();
    this.onChange(this.ngModel);

    // emit to parent
    this.onTagListChanged.emit(this.ngModel);

  }

  private _removeTag(tagIndexToRemove) {
    console.log("TagInputComponent _removeTag");
    this.ngModel.splice(tagIndexToRemove, 1);
    this._resetSelected();
    this.onChange(this.ngModel);

    //emit to parent
    this.onTagListChanged.emit(this.ngModel);

  }

  private _handleBackspace() {
    console.log("TagInputComponent _handleBackspace");
    if (!this.inputValue.length && this.ngModel.length) {
      if (!isBlank(this.selectedTag)) {
        this._removeTag(this.selectedTag);
      }
      else {
        this.selectedTag = this.ngModel.length - 1;
      }
    }
  }

  private _resetSelected() {
    console.log("TagInputComponent _resetSelected");
    this.selectedTag = null;
  }

  private _resetInput() {
    console.log("TagInputComponent _resetInput");
    this.inputValue = '';
  }

  /** Implemented as part of ControlValueAccessor. */
  onChange: (value) => any = () => { 
    console.log("TagInputComponent onChange");
  };

  onTouched: () => any = () => { 
    console.log("TagInputComponent onTouched");
  };

  writeValue(value: any) { 
    console.log("TagInputComponent writeValue");
  }

  registerOnChange(fn: any) {
    console.log("TagInputComponent registerOnChange");
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    console.log("TagInputComponent registerOnTouched");
    this.onTouched = fn;
  }
}
