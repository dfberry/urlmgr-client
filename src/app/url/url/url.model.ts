//import { FeedDefinition, FeedResponse } from './feed.model';

/** Url definition
 * id: currently next numeric value
 * url: string - currently no checking for valid url string
 */

export interface IUrl{
    id: string;
    url: string;

    status: string;
    statusDate: string;
    tags: Array<string>; 
    createdAt: string;
    updatedAt: string;
}

export class Url implements IUrl{
    id: string;
    url: string;
    //feeds: FeedDefinition[];  
    //feedResponse: FeedResponse ;
    title: string;
    status: string;
    tags: Array<string>; 
    statusDate: string;
    createdAt: string;
    updatedAt: string;   
}