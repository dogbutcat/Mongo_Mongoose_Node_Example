import { Write, Read } from '../dal/Common';
export interface BaseBusiness<T> extends Write<T>, Read<T> { }