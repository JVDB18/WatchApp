import {Ids} from "./ids"

export interface Person {
    name: string;
    ids: Ids;
    biography: string;
    birthday: string;
    death?: any;
    birthplace: string;
    homepage: string;
}