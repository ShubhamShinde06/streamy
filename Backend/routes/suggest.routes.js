import {Router} from 'express'
import { addSuggest, deleteSuggest, getSuggest, getUserSuggest } from '../controllers/suggest.controller.js'

const route = Router()

route.post('/add', addSuggest)
route.get('/get/:userId', getUserSuggest)
route.get('/get', getSuggest)
route.post("/delete", deleteSuggest);

export default route