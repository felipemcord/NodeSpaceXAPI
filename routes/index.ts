import express from 'express';
import SpaceXAPI from '../services/SpaceXAPI.js'
const indexRoute = express.Router();

const spaceXAPI = new SpaceXAPI();

indexRoute.get('/', async (req: express.Request, res: express.Response) => {
    res.send(await spaceXAPI.getUpcomingLaunches());
});

indexRoute.get('/upcomingLaunches', async (req: express.Request, res: express.Response) => {
    res.send(await spaceXAPI.getUpcomingLaunches());
});

indexRoute.get('/pastLaunches', async (req: express.Request, res: express.Response) => {
    res.send(await spaceXAPI.getPastLaunches());
});

indexRoute.get('/lastLaunch', async (req: express.Request, res: express.Response) => {
    res.send(await spaceXAPI.getLastLaunch());
});

indexRoute.get('/nextLaunch', async (req: express.Request, res: express.Response) => {
    res.send(await spaceXAPI.getNextLaunch());
});

export default indexRoute;