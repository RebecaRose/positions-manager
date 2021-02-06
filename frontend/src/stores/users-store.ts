import { makeAutoObservable } from "mobx";
import { User, Position } from '../models';
import requestService from '../request-service';

export default class UsersStore{
    public users = [] as User[];
    public modal = {
        open: false,
        type: 'update',
        user: {
            id: undefined,
            first_name: '',
            last_name: '',
            birth_date: null,
            earnings: 0,
            position_id: 1,
        } as User,
    }

    public positions = [] as Position[];
    constructor(){
        makeAutoObservable(this);
        this.getPositions();
    }

    public getUsers = async() => {
        console.log(2);
        const endpoint = 'http://localhost:3500/users';
        const method = 'GET';
        const response = await requestService(endpoint, method);
        if(response.success){
            console.log(response.users);
            this.users = response.users.map( (user: User) => {
                user.position = this.positions.find(position => position.id === user.position_id)?.title;
                console.log(user);
                return user;
            });
            console.log(this.users);
        }
    }

    public getPositions = async() => {
        console.log(1);
        const endpoint = 'http://localhost:3500/positions';
        const method = 'GET';
        const response = await requestService(endpoint, method);
        console.log(response);
        if(response.success){
            this.positions = response.positions;
            this.getUsers();
        }
    }

    public updateUser = async() => {
        const user = this.modal.user;
        const endpoint = 'http://localhost:3500/users';
        const method = 'POST';
        const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            birth_date: user.birth_date,
            earnings: user.earnings,
            position_id: user.position_id,
        };
        const response = await requestService(endpoint, method, payload);
        if(response.success){
            this.modal = {
                open: false,
                type: 'update',
                user: {
                    id: 0,
                    first_name: '',
                    last_name: '',
                    birth_date: null,
                    earnings: 0,
                    position_id: 1,
                }
            }
            alert('Usuário atualizado com sucesso!');
            return;
        }
        alert('Erro ao tentar atualizar usuário. Por favor, tente novamente mais tarde.');
        
    }

    public deleteUser = async(id?: number) => {
        const endpoint = `http://localhost:3500/users/${id}`;
        const method = 'DELETE';
        const response = await requestService(endpoint, method);
        if(response.success){
            alert('Usuário excluído com sucesso!');
            this.users = this.users.filter(user => user.id !== id);
            return;
        }
        alert('Erro ao tentar excluír usuário. Por favor, tente novamente mais tarde.');
        
    }

    public createUser = async() => {
        const user = this.modal.user;
        const endpoint = 'http://localhost:3500/users';
        const method = 'POST';
        const payload = {user};
        const response = await requestService(endpoint, method, payload);
        if(response.success){
            alert('Usuário criado com sucesso!');
            this.getUsers();
            this.modal = {
                open: false,
                type: 'update',
                user: {
                    id: undefined,
                    first_name: '',
                    last_name: '',
                    birth_date: null,
                    earnings: 0,
                    position_id: 1,
                }
            }
            return;
        }
        alert('Erro ao tentar criar usuário. Por favor, tente novamente mais tarde.');
        
    }

    public toggleModal = (type: 'update' | 'create', userIndex?: number) => {
        if(type === 'update' && userIndex !== undefined){
            const user = this.users[userIndex];
            this.modal.user = user;
        }
        this.modal.type = type;
        this.modal.open = true;
    }

    public closeModal = () => {
        this.modal.open = false;
    }

    public updateFirstName = (name: string) => {
        this.modal.user.first_name = name;
    }

    public updateLastName = (name: string) => {
        this.modal.user.last_name = name;
    }

    public updateBirthDate = (date: string | null) => {
        this.modal.user.birth_date = date;
    }

    public updateEarnings = (earnings: number) => {
        this.modal.user.earnings = earnings;
    }

    public updatePositionId = (positionId: any) => {
        if(typeof positionId == 'number'){
            this.modal.user.position_id = positionId;
        }
    }

}
