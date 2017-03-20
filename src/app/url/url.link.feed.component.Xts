/**************************************************************************
 * 
 * Show Feed Link - used in datatable
 * 
 * 
*/
@Component({
  selector: 'url-feed-detail-link',
  template: `
    <div *ngIf="feedUrl">
        <a [routerLink]="['/feed', url.id, feedUrl]">{{feedTitle}}</a> 
    </div>
    <div *ngIf="!feedUrl">
       {{feedTitle}}
    </div>
      `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class UrlFeedDetailLinkComponent {
  @Input() url: Url;

  feedUrl: string="";
  feedTitle: string="";
  feedData: any;


  constructor(private store: Store<AppState>){}
  ngOnInit(){

    if(!this.url) {
      //console.log("UrlFeedDetailLinkComponent url input is empty");
    }

    this.feedTitle = this.url.title;
    this.getFirstFeedUrl();

  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      //console.log(`UrlFeedDetailComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
    
  }
  getFirstFeedUrl(){
    //console.log("feed component::getFirstFeedUrl ");
    if (this.url && this.url.feeds && this.url.feeds.length>0) {
      this.feedUrl = this.url.feeds[0].href;
    } 
  }
  /*

  actionsSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('id')
      .map(id => new book.SelectAction(id))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  */

}