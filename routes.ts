import { express } from 'express';

const { Router } = express;
const routes = Router();

routes.get('/hello', (req, res) => {
    res.json({ mesage: 'response mesage' });
});

export default routes;
