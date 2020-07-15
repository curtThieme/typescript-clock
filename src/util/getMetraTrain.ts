import dotenv from "dotenv";
import fetch from "node-fetch";
import { Base64 } from 'js-base64';
dotenv.config();

function getMetraTrain(trainLine: string) {
    return new Promise((resolve, reject): void => {
        const {METRA_TRAIN_KEY, METRA_TRAIN_SECRET} = process.env;
        const url = "https://gtfsapi.metrarail.com/gtfs/tripUpdates";
        // let requestHeaders: any = new Headers();
        // requestHeaders.set('Content-Type', 'application/json');
        // //requestHeaders.set('X-ApiKeys', 'accessKey=' + METRA_TRAIN_KEY + '; secretKey=' + METRA_TRAIN_SECRET);
        // requestHeaders.set('Authorization', 'Basic '+ btoa(METRA_TRAIN_KEY +":"+ METRA_TRAIN_SECRET));
        fetch(url, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Basic '+ Base64.encode(METRA_TRAIN_KEY + ":" + METRA_TRAIN_SECRET),
            },
          }).then((res): {} => res.json()).then((result: {}): void => resolve(result))
            .catch((err): void => reject(err));
    });
}

export default getMetraTrain;