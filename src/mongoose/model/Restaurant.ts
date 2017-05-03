import { Document } from 'mongoose';
interface Addres {
    building: string;
    coord: number[];
    street: string;
    zipcode: string;
}

interface Grade {
    date: string;
    grade: string;
    score: number;
}

// export interface RestaurantDoc extends Document {
//     address: Addres;
//     borough: string;
//     cuisine: string;
//     grades: Grade[];
//     name: string;
// }

export type RestaurantDoc = {
    address: Addres;
    borough: string;
    cuisine: string;
    grades: Grade[];
    name: string;
} & Document;