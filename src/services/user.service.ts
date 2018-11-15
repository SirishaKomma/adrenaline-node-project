import { ElasticSearchService } from './elasticsearch.service';
import { CommonService } from './common.service';
import { GetResponse, UpdateDocumentParams, SearchResponse } from 'elasticsearch';
import { IAccountModal } from '../modals/iAccount.modal';
import { AccountUserStatus } from '../modals/enums'
var async = require('async');
export class UserService {

    public static getPingDetails(index, type, id, callback) {
        ElasticSearchService.client.get({
            index: index,
            type: type,
            id: id
        }).then((result: GetResponse<IAccountModal>) => {
            if (result.found) {
                const obj = {
                    type: type,
                    result: result._source
                }
                callback(null, obj);
            }
        })
    }

    public registerRoutes(app) {
        app.post('/meta', (req, res) => {
            const params: any = CommonService.getParams(req);
            const userId = params.userId;
            let tasks: any = [];
            tasks.push(function (callback) {
                UserService.getPingDetails('version', 'version', userId, callback);
            });
            tasks.push(function (callback) {
                UserService.getPingDetails('account', 'account', userId, callback);
            });
            async.series(tasks, (erroe, result) => {
                res.send({ error: false, response: result });
            })
        });
        app.post('/updateAdvertiser', (req, res, next) => {
            const params: any = CommonService.getParams(req);
            let updateParams: UpdateDocumentParams = {
                index: 'advertiser',
                type: 'advertiser',
                id: params.id,
                body: {
                    doc: {

                    }
                }
            }
            updateParams.body.doc[params.field] = params.value;
            ElasticSearchService.client.update(updateParams).then((response: GetResponse<any>) => {
                res.send({ error: false, result: response });
            }).catch((e) => {
                res.send({ error: true, result: e });
            })
        });

        app.post('/getUserNotes', (req, response, next) => {
            const params: any = CommonService.getParams(req);
            ElasticSearchService.client.search({
                index: 'account',
                type: 'Account',
                body: {
                    query: {
                        bool: {
                            must: {
                                term: {
                                    userName: params.user.userEmail.toLowerCase()
                                }
                            }
                        }
                    }
                }
            }).then((result: SearchResponse<IAccountModal>) => {
                if (result.hits.hits[0]._source.systemStatus === AccountUserStatus.PENDING_CONFIRMATION) {
                    response.send({
                        error: true,
                        severity: 'error',
                        message: 'your account is pending confirmation, please check your mail'
                    });
                }
                if(result.hits.hits[0]._source.systemStatus===AccountUserStatus.PENDING_APPROVAL){
                    response.send({
                        error:true,
                        severity:'error',
                        message:'your account is pending approval from admin'
                    })
                }
            })
        })

        app.post('/login', (req, res, next) => {
            const params = CommonService.getParams(req)
        })
    }
}