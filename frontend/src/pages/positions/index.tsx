import { Button, Container, Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, TextField, FormControl, Select, InputLabel, MenuItem, Grid } from "@material-ui/core";
    import { useStores } from "../../stores/root-store";
    import { observer } from "mobx-react";
    const Positions = () => {
        const { positionsStore } = useStores();
    
        return (
            <Container style={{marginTop: 20}}>
                <Dialog 
                    open={positionsStore.modal.open} 
                    onClose={positionsStore.closeModal} 
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>
                        {positionsStore.modal.type === 'update' && 'ATUALIZAR CARGO'}
                        {positionsStore.modal.type === 'create' && 'CRIAR CARGO'}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    style={{marginTop: 5}}
                                    id="standard-password-input"
                                    label="Título"
                                    variant='outlined'
                                    type="text"
                                    value={positionsStore.modal.position.title}
                                    onChange={ e => positionsStore.updateTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    style={{marginTop: 5, marginLeft: 5}}
                                    id="standard-password-input"
                                    label="Descrição"
                                    variant='outlined'
                                    type="text"
                                    value={positionsStore.modal.position.description}
                                    onChange={ e => positionsStore.updateDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} style={{marginTop: 10}}>
                                {positionsStore.modal.type === 'update' &&
                                    <Button
                                        color='secondary'
                                        variant='contained'
                                        onClick={positionsStore.updatePosition}
                                    >
                                        SALVAR
                                    </Button>
                                }
    
                                {positionsStore.modal.type === 'create' &&
                                    <Button
                                        color='secondary'
                                        variant='contained'
                                        onClick={positionsStore.createPosition}
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
                    onClick={() => positionsStore.toggleModal('create')}
                >
                    Criar novo Cargo
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
                            {positionsStore.positions.map( (position, index) => (
                                <TableRow>
                                    {headerItems.slice(0,headerItems.length - 1).map( item => (
                                        <TableCell align="center">
                                            {position[item.name]}
                                        </TableCell>
                                    ))}
                                    <TableCell align="center">
                                        <Button 
                                            color='secondary'
                                            aria-label="edit"
                                            onClick={() => positionsStore.toggleModal('update', index)}
                                        >
                                            Editar
                                        </Button>
                                        <Button 
                                            color='secondary'
                                            aria-label="delete"
                                            onClick={() => positionsStore.deletePosition(position.id)}
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
            title: 'Título',
            name: 'title',
        },
        {
            title: 'Descrição',
            name: 'description',
        },
        {
            title: '',
            name: 'functions',
        }
    ] as HeaderItem[]
    
    
    interface HeaderItem {
        title: string;
        name: 'id' | 'title' | 'description';
    }
    
    export default observer(Positions);
    