import { Button, Container, Dialog, DialogContent, DialogTitle, Fab, Paper, Table, TableBody, TableCell, 
TableContainer, TableHead, TableRow, TextField, FormControl, Select, InputLabel, MenuItem, Grid } from "@material-ui/core";
import { useStores } from "../../stores/root-store";
import { observer } from "mobx-react";
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';

const Users = () => {
    const { usersStore } = useStores();

    return (
        <Container style={{marginTop: 20}}>
            <Dialog 
                open={usersStore.modal.open} 
                onClose={usersStore.closeModal} 
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>
                    {usersStore.modal.type === 'update' && 'ATUALIZAR USUÁRIO'}
                    {usersStore.modal.type === 'create' && 'CRIAR USUÁRIO'}
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                style={{marginTop: 5}}
                                id="standard-password-input"
                                label="Primeiro nome"
                                variant='outlined'
                                type="text"
                                value={usersStore.modal.user.first_name}
                                onChange={ e => usersStore.updateFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                style={{marginTop: 5, marginLeft: 5}}
                                id="standard-password-input"
                                label="Último nome"
                                variant='outlined'
                                type="text"
                                value={usersStore.modal.user.last_name}
                                onChange={ e => usersStore.updateLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                style={{marginTop: 5}}
                                id="standard-password-input"
                                label="Salário"
                                variant='outlined'
                                type="text"
                                value={usersStore.modal.user.earnings}
                                onChange={ e => usersStore.updateEarnings(parseInt(e.target.value))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                style={{marginTop: 5}}
                                id="standard-password-input"
                                label="Data de nascimento"
                                variant='outlined'
                                type="date"
                                value={usersStore.modal.user.birth_date}
                                onChange={ e => usersStore.updateBirthDate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl>
                                <InputLabel htmlFor="age-native-simple">
                                    Cargo
                                </InputLabel>
                                <Select
                                    value={usersStore.modal.user.position_id}
                                    onChange={e => usersStore.updatePositionId(e.target.value)}
                                >
                                    {usersStore.positions.map( position => (
                                        <MenuItem value={position.id}>
                                            {position.title}
                                        </MenuItem>
                                    ))}
                                    
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{marginTop: 10}}>
                            {usersStore.modal.type === 'update' &&
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    onClick={usersStore.updateUser}
                                >
                                    SALVAR
                                </Button>
                            }

                            {usersStore.modal.type === 'create' &&
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    onClick={usersStore.createUser}
                                >
                                    CRIAR
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Button
                color='secondary'
                variant='contained'
                onClick={() => usersStore.toggleModal('create')}
            >
                Criar novo Usuário
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headerItems.map( item => (
                                <TableCell align="center" style={{fontWeight: 'bold'}}>
                                    {item.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersStore.users.map( (user, index) => (
                            <TableRow>
                                {headerItems.slice(0,headerItems.length - 1).map( item => (
                                    <TableCell align="center">
                                        {user[item.name]}
                                    </TableCell>
                                ))}
                                <TableCell align="center">
                                    <Button 
                                        color='secondary'
                                        aria-label="edit"
                                        onClick={() => usersStore.toggleModal('update', index)}
                                    >
                                        Editar
                                    </Button>
                                    <Button 
                                        color='secondary'
                                        aria-label="delete"
                                        onClick={() => usersStore.deleteUser(user.id)}
                                    >
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

const headerItems = [
    {
        title: 'Id',
        name: 'id',
    },
    {
        title: 'Primeiro Nome',
        name: 'first_name',
    },
    {
        title: 'Último nome',
        name: 'last_name',
    },
    {
        title: 'Data de nascimento',
        name: 'birth_date',
    },
    {
        title: 'Salário',
        name: 'earnings',
    },
    {
        title: 'Cargo',
        name: 'position',
    },
    {
        title: '',
        name: 'functions',
    }
] as HeaderItem[]


interface HeaderItem {
    title: string;
    name: 'id' | 'first_name' | 'last_name' | 'birth_date' | 'earnings' | 'position_id';
}

export default observer(Users);
