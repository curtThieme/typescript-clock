import { WeatherForecast } from '../models/weatherAPI';
import { MetraTrainInfo } from '../models/metraAPI';
//import * as IMG from '../public/SWS.png';

interface StringIndexes {
    [key: string]: string;
}


//Colors retrieved from metra site with eye dropper tool
const metraRouteColors: StringIndexes = {
    // North/Northwest
    "MD-N": "#e97200",    //Milwaukee District North
    "NCS": "#62319f",     //North Central Service
    "UP-N": "#0f5200",    //Union Pacific North
    "UP-NW": "#ffde00",   //Union Pacific Northwest
    // South/Southwest
    "HC": "#8b1e40",      //Heritage Corridor
    "ME": "#ff4e00",      //Metra Electric District
    "RI": "#e1261c",      //Rock Island District
    "SWS": "#015db9",     //SouthWest Service
    //West
    "BNSF": "#3daf2c",    //BNSF Railway
    "MD-W": "#f4b249",    //Milwaukee District West
    "UP-W": "#ffb2b8",    //Union Pacific West
}

// interface CtaBusPrediction {
//     "tmstmp": string;
//     "typ": string;
//     "stpnm": string;
//     "stpid": string;
//     "vid": string;
//     "dstp": number;
//     "rt": string;
//     "rtdd": string;
//     "rtdir": string;
//     "des": string;
//     "prdtm": string;
//     "tablockid": string;
//     "tatripid": string;
//     "dly": boolean;
//     "prdctdn": string;
//     "zone": string;
// }

// interface CtaBusError {
//     "stpid": string;
//     "msg": string;
// }

// interface CtaBusPredictions {
//     "bustime-response": {
//         "prd"?: CtaBusPrediction[];
//         "error"?: CtaBusError[];
//     };
// }

//TODO: Change train to Metra
// interface CtaTrainPrediction {
//     "staId": string;
//     "stpId": string;
//     "staNm": string;
//     "stpDe": string;
//     "rn": string;
//     "rt": string;
//     "destSt": string;
//     "destNm": string;
//     "trDr": string;
//     "prdt": Date;
//     "arrT": Date;
//     "isApp": string;
//     "isSch": string;
//     "isDly": string;
//     "isFlt": string;
//     "flags": boolean;
//     "lat": string;
//     "lon": string;
//     "heading": string;
// }

// interface CtaTrainPredictions {
//     "ctatt": {
//         "tmst": string;
//         "errCd": string;
//         "errNm": number;
//         "eta": CtaTrainPrediction[];
//     };
// }


export interface Config {
    //"ctaBusStops"?: string[];
    "metraTrainLines"?: string[];
    "weatherLatLong"?: string;
    //"eventCalendars"?: string[];
}

export function clearData(elementSelector?: string): void {
    if (!elementSelector) {
        //document.getElementById("bus").innerHTML = "";
        document.getElementById("train").innerHTML = "";
        document.getElementById("weather").innerHTML = "";
        document.getElementById("events").innerHTML = "";
        document.getElementById("messages").innerHTML = "";
    } else {
        document.querySelector(elementSelector).innerHTML = "";
    }
}

export function getData(): void {
    const { origin } = window.location;
    const urlParams = new URLSearchParams(window.location.search);
    const config = {
        //ctaBusStops: urlParams.get("ctaBusStops"),
        metraTrainLines: urlParams.get("metraTrainLines"),
        weatherLatLong: urlParams.get("weatherLatLong"),
        //eventCalendars: urlParams.get("eventCalendars"),
    };

    // clearData("#bus");
    // fetch(`${origin}/api/ctaBus?bus=${config.ctaBusStops}`).then((res): Promise<CtaBusPredictions> => res.json()).then((result): void => {
    //     const timeNow = new Date();
    //     if (result["bustime-response"].hasOwnProperty("prd")) {
    //         for (let i = 0; i < result["bustime-response"].prd.length; i++) {
    //             const timeFromApi = result["bustime-response"].prd[i].prdtm;
    //             const prdTime = new Date(timeFromApi.slice(0, 4) + "/" + timeFromApi.slice(4, 6) + "/" + timeFromApi.slice(6, 16));
    //             const eta = Math.floor(Math.abs(prdTime.valueOf() - timeNow.valueOf()) / 1000 / 60);
    //             document.getElementById("bus").innerHTML += `<li class='busItem'><span class='route icon'>${result["bustime-response"].prd[i].rt}</span><span class='eta'>${eta}m</span><span class='direction'>${result["bustime-response"].prd[i].rtdir}"</span></li>`;
    //         }
    //         result["bustime-response"].prd.forEach((ele): void => {
    //             const timeFromApi = ele.prdtm;
    //             const prdTime = new Date(timeFromApi.slice(0, 4) + "/" + timeFromApi.slice(4, 6) + "/" + timeFromApi.slice(6, 16));
    //             const eta = Math.floor(Math.abs(prdTime.valueOf() - timeNow.valueOf()) / 1000 / 60);
    //             document.getElementById("bus").innerHTML += `<li class='busItem'><span class='route icon'>${ele.rt}</span><span class='eta'>${eta}m</span><span class='direction'>${ele.rtdir}"</span></li>`;
    //         });
    //     }
    // });

    clearData("#train");
    //config.metraTrain.split(",").forEach((ele): void => {
    fetch(`${origin}/api/metraTrain?train=${config.metraTrainLines}`).then((res): Promise<MetraTrainInfo[]> => res.json()).then((result): void => {
        const timeNow = new Date();
        ///api/metraTrain?train=${config.metraTrainLines}   //TODO: need this for config file
        console.log(result);
        for(let numTrips = 0; numTrips < result.length; numTrips++)
        {
            if(config.metraTrainLines.includes(result[numTrips].trip_update.trip.route_id))
            {
                let routeID = result[numTrips].trip_update.trip.route_id;
                let trainNumber = result[numTrips].trip_update.vehicle.label;
                let eta = 0;
                let stopID = "";
                if(result[numTrips].trip_update.stop_time_update[0])
                {
                    const prdTime = new Date(result[numTrips].trip_update.stop_time_update[0].arrival.time.low);
                    const delay = result[numTrips].trip_update.stop_time_update[0].arrival.delay;
                    eta = Math.floor(Math.abs(((prdTime.valueOf() - timeNow.valueOf()) / 1000) + delay) / 60);
                    stopID = result[numTrips].trip_update.stop_time_update[0].stop_id;
                }
                let routeColor = metraRouteColors[routeID];
                //let imgSrc = `../public/${routeID}.png`;
                document.getElementById("train").innerHTML += `<li class='trainItem'><i class='fa fa-train icon' style=background-color:${routeColor};></i><span class='routeID' style=color:${routeColor};border-color:${routeColor};>${routeID}</span><span class='trainNumber' style=color:${routeColor};border-color:${routeColor};>${trainNumber}</span><span class='eta' style=color:${routeColor};>${stopID}</span><span class='eta' style=color:${routeColor};>${eta}m</span></li>`; 
            }
        }
        //<img src=\"${imgSrc}\">

        //     const prdTime = new Date(result.ctatt.eta[j].arrT);
        //     const eta = Math.floor(Math.abs(prdTime.valueOf() - timeNow.valueOf()) / 1000 / 60);
 
        //     document.getElementById("train").innerHTML += `<li class='trainItem'><i class='fa fa-train icon' style=background-color:${routeColor};></i><span class='eta' style=color:${routeColor};border-color:${routeColor};>${eta}m</span><span class='direction'>${result.ctatt.eta[j].destNm}</span></li>`;
    });
    //});

    clearData("#weather");
    fetch(`${origin}/api/weather?weatherLatLong=${config.weatherLatLong}`).then((res): Promise<WeatherForecast> => res.json()).then((result): void => {
        const temp = result.current.temp;
        const tempF = Math.round(temp);
        const tempC = Math.round(((temp-32)*5)/9);
        const description = result.current.weather[0].main;
        document.getElementById("weather").innerHTML = `<p>${description}</p><p class='fahrenheit'>${tempF} &#176;F</p><p class='celsius'>${tempC} &#176;C</p>`;
    });
}
