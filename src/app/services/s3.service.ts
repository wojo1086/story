import {Injectable} from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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

    constructor(private _http: HttpClient) {
    }

    uploadJson(obj) {
        return this._http.post('http://localhost:4000/story', {story: JSON.stringify(obj)});
        // return new Promise((resolve, reject) => {
        //     const params = {
        //         Bucket: 'wojo-stories',
        //         Key: this.FOLDER + 'story-one.json',
        //         Body: JSON.stringify(obj),
        //         ContentType: 'application/json'
        //     };
        //
        //     this.bucket.putObject(params, (err, data) => {
        //         if (err) {
        //             console.log('There was an error with your file: ', err);
        //             reject(err);
        //         }
        //
        //         console.log('Successfully uploaded file.', data);
        //         resolve(data);
        //     });
        // });
    }

    loadStories(): Observable<any> {
        return this._http.get('http://localhost:4000/story');
    }


}
