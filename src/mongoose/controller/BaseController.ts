import { ReadController, WriteController } from './Common';
import { BaseBusiness } from '../business/BaseBusiness';

export interface BaseController<T extends BaseBusiness<Object>> extends ReadController, WriteController { }
