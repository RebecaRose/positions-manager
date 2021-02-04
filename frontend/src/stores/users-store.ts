import { makeAutoObservable } from "mobx";

export default class UsersStore{
    constructor(){
        makeAutoObservable(this);
    }

}
