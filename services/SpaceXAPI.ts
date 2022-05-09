import Launch from "../models/launch.js";
import Payload from "../models/payload.js";
import Rocket from "../models/rocket.js";
import fetch from 'node-fetch';
import Launchpad from "../models/launchpad.js";


class SpaceXAPI {
    constructor(private basePath: string = 'https://api.spacexdata.com/v4') {}

    async getUpcomingLaunches() : Promise<Launch[]> {
        let data = {
            "query": {
                "upcoming": true
            },
            "options": {
                "populate": ["rocket", "payloads", "launchpad"],
                "sort":{
                   "flight_number":"asc"
                }
            }
        };
        let response = await fetch(this.basePath + '/launches/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        let responseData: any = await response.json();
        const launches: Launch[] = this.getLaunchesFromResponse(responseData);
        return new Promise((resolve) => resolve(launches));

    }

    async getPastLaunches() : Promise<Launch[]> {
        let data = {
            "query": {
                "upcoming": false
            },
            "options": {
                "populate": ["rocket", "payloads", "launchpad"],
                "sort":{
                   "flight_number":"desc"
                }
            }
        };
        let response = await fetch(this.basePath + '/launches/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        let responseData: any = await response.json();
        const launches: Launch[] = this.getLaunchesFromResponse(responseData);
        return new Promise((resolve) => resolve(launches));

    }

    async getNextLaunch() : Promise<Launch> {
        let data = {
            "query": {
                "upcoming": true
            },
            "options": {
                "limit":1,
                "sort":{
                   "flight_number":"asc"
                },
                "populate": ["rocket", "payloads", "launchpad"]
            }
        };
        let response = await fetch(this.basePath + '/launches/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        let responseData: any = await response.json();
        const launch: Launch = this.getLaunchesFromResponse(responseData)[0];
        return new Promise((resolve) => resolve(launch));

    }

    async getLastLaunch() : Promise<Launch> {
        let data = {
            "query": {
                "upcoming": false
            },
            "options": {
                "limit":1,
                "sort":{
                   "flight_number":"desc"
                },
                "populate": ["rocket", "payloads", "launchpad"]
            }
        };
        let response = await fetch(this.basePath + '/launches/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        let responseData: any = await response.json();
        const launch: Launch = this.getLaunchesFromResponse(responseData)[0];
        return new Promise((resolve) => resolve(launch));

    }

    private getLaunchesFromResponse(responseData: any) {
        const launches: Launch[] = [];
        for (const responseLaunch of responseData["docs"]) {

            let launch = this.getLaunchFromResponse(responseLaunch);


            launches.push(launch);
        }
        return launches;
    }

    private getLaunchFromResponse(responseLaunch: any) {
        let launch = new Launch(responseLaunch.id, responseLaunch.name, new Date(responseLaunch.date_utc), responseLaunch.flightNumber);

        launch.rocket = new Rocket(responseLaunch.rocket.name,
            responseLaunch.rocket.flickr_images, responseLaunch.rocket.type,
            responseLaunch.rocket.description);

        for (const payload of responseLaunch.payloads) {
            launch.payloads.push(new Payload(payload.type, payload.customers, payload.nationalities));
        }

        const responseLaunchpad = responseLaunch.launchpad;
        const launchpadImages: string[] = [];
        for (const size in responseLaunchpad['images']) {
            for (const image of responseLaunchpad['images'][size]) {
                launchpadImages.push(image);
            }
        }

        launch.launchpad = new Launchpad(responseLaunchpad.full_name,
            launchpadImages, responseLaunchpad.region);

        launch.date_precision = responseLaunch.date_precision;
        return launch;
    }
}

export default SpaceXAPI