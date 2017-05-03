export interface Read<T> {
    retrieve: (callback: (err: any, result: any) => void) => void;
    findById: (id: string, callback: (err: any, result: T) => void) => void;
}
export interface Write<T> {
    create: (item: T, callback: (err: any, result: any) => void) => void;
    update: (id: string, item: T, callback: (err, result) => void) => void;
    delete: (id: string, callback: (err) => void) => void;
}