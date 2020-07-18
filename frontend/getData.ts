import { WeatherForecast } from '../models/weatherAPI';
import { MetraTrainInfo } from '../models/metraAPI';

interface StringIndexes {
    [key: string]: string;
}

// const ctaRouteColors: StringIndexes = {
//     // TODO: Pick Better Colors
//     Red: "#c10000",
//     Blue: "#03396c",
//     Brown: "#560d0d",
//     Green: "#004a2f",
//     Orange: "#ff6337",
//     Pink: "#ff3e6d",
//     Purple: "#866ec7",
//     Yellow: "#e4c666",
// }

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

// interface WeatherForecast {
//     "lat": number;
//     "lon": number;
//     "timezone": string;
//     "timezone_offset"?: number | null;
//     "current": {
//         "dt": number;
//         "sunrise": number;
//         "sunset": number;
//         "temp": number;
//         "feels_like"?: number | null;
//         "pressure": number;
//         "humidity": number;
//         "dew_point": number;
//         "uvi": number;
//         "clouds": number;
//         "visibility": number;
//         "wind_speed"?: number | null;
//         "wind_deg"?: number | null;
//         "wind_gust"?: number | null;
//         "weather"?: (WeatherInfo)[] | null;
//     };
// }

// export interface WeatherInfo{
//     "id": number;
//     "main": string;
//     "description": string;
//     "icon": string;
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
    fetch(`${origin}/api/metraTrain?train=${config.metraTrainLines}`).then((res): Promise<MetraTrainInfo> => res.json()).then((result): void => {
        const timeNow = new Date();
        console.log(result);
        // for (let j = 0; j < result.ctatt.eta.length; j++) {
        //     const prdTime = new Date(result.ctatt.eta[j].arrT);
        //     const eta = Math.floor(Math.abs(prdTime.valueOf() - timeNow.valueOf()) / 1000 / 60);
        //     const routeColor = ctaRouteColors[result.ctatt.eta[j].rt];
        //     document.getElementById("train").innerHTML += `<li class='trainItem'><i class='fa fa-train icon' style=background-color:${routeColor};></i><span class='eta' style=color:${routeColor};border-color:${routeColor};>${eta}m</span><span class='direction'>${result.ctatt.eta[j].destNm}</span></li>`;
        // }
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
