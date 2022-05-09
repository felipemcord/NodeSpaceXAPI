var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Launch from "../models/launch.js";
import Payload from "../models/payload.js";
import Rocket from "../models/rocket.js";
import fetch from 'node-fetch';
import Launchpad from "../models/launchpad.js";
class SpaceXAPI {
    constructor(basePath = 'https://api.spacexdata.com/v4') {
        this.basePath = basePath;
    }
    getUpcomingLaunches() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                "query": {
                    "upcoming": true
                },
                "options": {
                    "populate": ["rocket", "payloads", "launchpad"],
                    "sort": {
                        "flight_number": "asc"
                    }
                }
            };
            let response = yield fetch(this.basePath + '/launches/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let responseData = yield response.json();
            const launches = this.getLaunchesFromResponse(responseData);
            return new Promise((resolve) => resolve(launches));
        });
    }
    getPastLaunches() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                "query": {
                    "upcoming": false
                },
                "options": {
                    "populate": ["rocket", "payloads", "launchpad"],
                    "sort": {
                        "flight_number": "desc"
                    }
                }
            };
            let response = yield fetch(this.basePath + '/launches/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let responseData = yield response.json();
            const launches = this.getLaunchesFromResponse(responseData);
            return new Promise((resolve) => resolve(launches));
        });
    }
    getNextLaunch() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                "query": {
                    "upcoming": true
                },
                "options": {
                    "limit": 1,
                    "sort": {
                        "flight_number": "asc"
                    },
                    "populate": ["rocket", "payloads", "launchpad"]
                }
            };
            let response = yield fetch(this.basePath + '/launches/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let responseData = yield response.json();
            const launch = this.getLaunchesFromResponse(responseData)[0];
            return new Promise((resolve) => resolve(launch));
        });
    }
    getLastLaunch() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                "query": {
                    "upcoming": false
                },
                "options": {
                    "limit": 1,
                    "sort": {
                        "flight_number": "desc"
                    },
                    "populate": ["rocket", "payloads", "launchpad"]
                }
            };
            let response = yield fetch(this.basePath + '/launches/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let responseData = yield response.json();
            const launch = this.getLaunchesFromResponse(responseData)[0];
            return new Promise((resolve) => resolve(launch));
        });
    }
    getLaunchesFromResponse(responseData) {
        const launches = [];
        for (const responseLaunch of responseData["docs"]) {
            let launch = this.getLaunchFromResponse(responseLaunch);
            launches.push(launch);
        }
        return launches;
    }
    getLaunchFromResponse(responseLaunch) {
        let launch = new Launch(responseLaunch.id, responseLaunch.name, new Date(responseLaunch.date_utc), responseLaunch.flightNumber);
        launch.rocket = new Rocket(responseLaunch.rocket.name, responseLaunch.rocket.flickr_images, responseLaunch.rocket.type, responseLaunch.rocket.description);
        for (const payload of responseLaunch.payloads) {
            launch.payloads.push(new Payload(payload.type, payload.customers, payload.nationalities));
        }
        const responseLaunchpad = responseLaunch.launchpad;
        const launchpadImages = [];
        for (const size in responseLaunchpad['images']) {
            for (const image of responseLaunchpad['images'][size]) {
                launchpadImages.push(image);
            }
        }
        launch.launchpad = new Launchpad(responseLaunchpad.full_name, launchpadImages, responseLaunchpad.region);
        launch.date_precision = responseLaunch.date_precision;
        return launch;
    }
}
export default SpaceXAPI;
