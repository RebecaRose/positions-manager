import { makeAutoObservable } from "mobx";

export default class PositionsStore{
    constructor(){
        makeAutoObservable(this);
    }

}
