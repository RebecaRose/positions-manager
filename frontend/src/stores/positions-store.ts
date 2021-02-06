import { makeAutoObservable } from "mobx";
import { Position } from '../models';
import requestService from '../request-service';

export default class PositionsStore{
    public positions = [] as Position[];
    public modal = {
        open: false,
        type: 'update',
        position: {
            id: undefined,
            title: '',
            description: '',
        } as Position,
    }

    constructor(){
        makeAutoObservable(this);
        this.getPositions();
    }

    public getPositions = async() => {
        const endpoint = 'http://localhost:3500/positions';
        const method = 'GET';
        const response = await requestService(endpoint, method);
        if(response.success){
            this.positions = response.positions;
        }
    }

    public updatePosition = async() => {
        const position = this.modal.position;
        const endpoint = 'http://localhost:3500/positions';
        const method = 'POST';
        const payload = {
            id: position.id,
            title: position.title,
            description: position.description,
        };
        const response = await requestService(endpoint, method, payload);
        if(response.success){
            this.modal = {
                open: false,
                type: 'update',
                position: {
                    id: undefined,
                    title: '',
                    description: '',
                }
            }
            alert('Cargo atualizado com sucesso!');
            return;
        }
        alert('Erro ao tentar atualizar cargo. Por favor, tente novamente mais tarde.');
        
    }

    public deletePosition = async(id?: number) => {
        const endpoint = `http://localhost:3500/positions/${id}`;
        const method = 'DELETE';
        const response = await requestService(endpoint, method);
        if(response.success){
            alert('Cargo excluído com sucesso!');
            this.positions = this.positions.filter(position => position.id !== id);
            return;
        }
        alert('Erro ao tentar excluír cargo. Por favor, tente novamente mais tarde.');
        
    }

    public createPosition = async() => {
        const position = this.modal.position;
        const endpoint = 'http://localhost:3500/positions';
        const method = 'POST';
        const payload = {
            position: { 
                id: Math.floor((Math.random() * 999) + 100), 
                title: position.title,
                description: position.description,
            }
        };
        const response = await requestService(endpoint, method, payload);
        if(response.success){
            alert('Cargo criado com sucesso!');
            this.getPositions();
            this.modal = {
                open: false,
                type: 'update',
                position: {
                    id: undefined,
                    title: '',
                    description: '',
                }
            }
            return;
        }
        alert('Erro ao tentar criar cargo. Por favor, tente novamente mais tarde.');
        
    }

    public toggleModal = (type: 'update' | 'create', positionIndex?: number) => {
        if(type === 'update' && positionIndex !== undefined){
            const position = this.positions[positionIndex];
            this.modal.position = position;
        }
        this.modal.type = type;
        this.modal.open = true;
    }

    public closeModal = () => {
        this.modal.open = false;
    }

    public updateTitle = (name: string) => {
        this.modal.position.title = name;
    }

    public updateDescription = (description: string) => {
        this.modal.position.description = description;
    }


}
