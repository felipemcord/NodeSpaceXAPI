import express from 'express';
import SpaceXAPI from './services/SpaceXAPI';
const indexRoute = express.Router();
const spaceXAPI = new SpaceXAPI();
indexRoute.get('/', (req, res) => {
    res.send(spaceXAPI.getUpcomingLaunches());
});
export default indexRoute;
