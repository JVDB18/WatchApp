import {Ids} from "./ids"
import {Person} from './person'

    export interface Cast {
        characters: string[];
        person: Person;
    }

    export interface Production {
        jobs: string[];
        person: Person
        job: string[];
    }


    export interface Art {
        jobs: string[];
        person: Person;
    }
    export interface Crew2{
        jobs: string[];
        person: Person;
    }


    export interface CostumeMakeUp {
        jobs: string[];
        person: Person;
    }

    export interface Directing {
        jobs: string[];
        person: Person;
    }
    export interface Writing {
        jobs: string[];
        person: Person;
        job: string[];
    }

    export interface Sound {
        jobs: string[];
        person: Person;
    }

    export interface Camera {
        jobs: string[];
        person: Person;
    }

    export interface Crew {
        production: Production[];
        art: Art[];
        crew: Crew2[];
        directing: Directing[];
        writing: Writing[];
        sound: Sound[];
        camera: Camera[];
    }

    export interface AllPeople {
        cast: Cast[];
        crew: Crew;
    }



