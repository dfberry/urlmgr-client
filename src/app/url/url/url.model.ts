//import { FeedDefinition, FeedResponse } from './feed.model';

/** Url definition
 * id: currently next numeric value
 * url: string - currently no checking for valid url string
 */
import { Injectable, OnInit} from '@angular/core';


export interface IUrl{
    id: string;
    url: string;

    status: string;
    statusDate: string;
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
    statusDate: string;
    createdAt: string;
    updatedAt: string;   
}