import express from 'express';
import {createTask, getAllTasks, getTask} from "../controllers/tasks";
import {validateAdministrator, validateCreator, validateJWT} from "../controllers/authentication";
import {authenticateJWT} from "../middlewares";


export default (router: express.Router) => {
    router.post('/task', authenticateJWT, createTask);
    router.get('/task/:id', authenticateJWT, validateCreator, getTask);
    router.get('/task',authenticateJWT, validateAdministrator, getAllTasks)
};
