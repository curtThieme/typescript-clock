import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

function getMetraTrain(trainStation: string): Promise<{}> {
    return new Promise((resolve, reject): void => {
        const {METRA_TRAIN_KEY, METRA_TRAIN_SECRET} = process.env;
        const url = "https://gtfsapi.metrarail.com/gtfs/positions";
        let requestHeaders: any = new Headers();
        requestHeaders.set('Content-Type', 'application/json');
        requestHeaders.set('X-ApiKeys', 'accessKey=' + METRA_TRAIN_KEY + '; secretKey=' + METRA_TRAIN_SECRET);
        fetch(url, {
            method: 'GET',
            headers: requestHeaders,
          }).then((res): {} => res.json()).then((result: {}): void => resolve(result))
            .catch((err): void => reject(err));
    });
}

export default getMetraTrain;