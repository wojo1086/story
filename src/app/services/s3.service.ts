import {Injectable} from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as textEncoding from 'text-encoding';

@Injectable({
    providedIn: 'root'
})
export class S3Service {
    readonly FOLDER = 'stories/';
    private bucket = new S3({
        accessKeyId: 'AKIAJKYUQZHSJABHZPAQ',
        secretAccessKey: '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',
        region: 'us-east-1'
    });
    private TextDecoder = textEncoding.TextDecoder;

    constructor() {
    }

    uploadJson(obj) {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: 'wojo-stories',
                Key: this.FOLDER + 'story-one.json',
                Body: JSON.stringify(obj),
                ContentType: 'application/json'
            };

            this.bucket.putObject(params, (err, data) => {
                if (err) {
                    console.log('There was an error with your file: ', err);
                    reject(err);
                }

                console.log('Successfully uploaded file.', data);
                resolve(data);
            });
        });
    }

    loadStories(): Promise<any> {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: 'wojo-stories',
                Key: this.FOLDER + 'story-one.json'
            };

            this.bucket.getObject(params, (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    const string = new this.TextDecoder('utf-8').decode(data.Body);
                    console.log(JSON.parse(string));
                    resolve(JSON.parse(string));
                }
            });
        });
    }


}
