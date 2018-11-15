import { Client } from 'elasticsearch';
export class ElasticSearchService {
constructor(){}
    public static client=new Client({
        host:'http://34.254.247.3:9200'
    });

}