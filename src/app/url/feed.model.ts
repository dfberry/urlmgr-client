export class Feed {
  feedDefinition: FeedDefinition;
  feedResponse: FeedResponse;
  urlId: string;

  constructor(){
    this.feedResponse = new FeedResponse();
    this.feedDefinition = new FeedDefinition();
    this.urlId = "";
  }
}
export class FeedDefinition {
    title: string;
    type: string;
    href: string;
    url: string;
    

    constructor(){
      this.title = "";
      this.type = "";
      this.href = "";
      this.url = "";
    }
}
export class FeedResponse {
  status: string;
  feed: FeedInfo;
  items: Array<Article>;

  constructor(){
    this.status = "";
    this.feed = new FeedInfo();
    this.items = [];
  }
}
export class Article {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  categories: Array<string>;
  author: string;
  thumbnail: string;
  description: string;
  content: string;

  constructor(){
    this.title = "";
    this.link = "";
    this.guid = "";
    this.pubDate = "";
    this.categories = [];
    this.author = "";
    this.thumbnail = "";
    this.description = "";
    this.content = "";
  }
}
export class FeedInfo {
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
  type: string;

  constructor(){
    this.title = "";
    this.link = "";
    this.author = "";
    this.description = "";
    this.image = "";
    this.type = "";
  }
}