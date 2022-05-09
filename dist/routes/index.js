var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import SpaceXAPI from '../services/SpaceXAPI.js';
const indexRoute = express.Router();
const spaceXAPI = new SpaceXAPI();
indexRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield spaceXAPI.getUpcomingLaunches());
}));
indexRoute.get('/upcomingLaunches', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield spaceXAPI.getUpcomingLaunches());
}));
indexRoute.get('/pastLaunches', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield spaceXAPI.getPastLaunches());
}));
indexRoute.get('/lastLaunch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield spaceXAPI.getLastLaunch());
}));
indexRoute.get('/nextLaunch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield spaceXAPI.getNextLaunch());
}));
export default indexRoute;
