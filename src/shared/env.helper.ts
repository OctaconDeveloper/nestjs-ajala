import * as env from 'env-var';
import {config} from 'dotenv'

config()



export const GLADE_LOG_PATH = env.get('GLADE_LOG_PATH').asString()