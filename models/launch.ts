import Payload from "./payload";
import Rocket from "./rocket";
import Launchpad from "./launchpad";

class Launch {
    constructor(public id:string, public name:string,public  date:Date,public  flightNumber: number){}
    rocket?: Rocket;
    launchpad? : Launchpad;
    payloads: Payload[] = [];
    date_precision?: string;
}

export default Launch;