import { Backdrop, Box, CircularProgress, Fade, FormControl, Grid, InputLabel, MenuItem, Modal, Pagination, Select, SelectChangeEvent, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";
import UserCard from "../../components/userCard/UserCard";

import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, selectUser } from "../../store/user/User.slice";
import { UserModal } from "../../components/userModal/UserModal";

export const UserPage = () => {
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState('10');
    const users = useSelector((state: any) => state.userSlice.users);
    const loading = useSelector((state: any) => state.userSlice.loading);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const onHandleItemsPerPageChange = (event: SelectChangeEvent) => {
        setItemsPerPage(event.target.value as string);
    }
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const start = Math.max((page - 1) * parseInt(itemsPerPage), 0);
    const end = Math.min(page * parseInt(itemsPerPage), users?.length || 0);

    const GridContainer = styled(Grid)(({ theme }) => ({
        height: 'calc(100vh - 60px)',
        overflowY: 'auto',
    }));

    const PaginationContainer = styled('div')(({ theme }) => ({
        height: '60px',
        display: 'flex',
        justifyContent: 'end',
        boxShadow: '0px -5px 5px -5px rgba(0,0,0,0.75)',
        position: 'relative',
        zIndex: 1000,
        padding: theme.spacing(2),
        '@media (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'center',
            height: 'auto',
            padding: theme.spacing(1),
            '.MuiFormControl-root':{
                display: 'none'
            }
        }
    }));

    return <Box component='main'>
        {loading && <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" data-testid="loader"/>
        </Backdrop>}
        {users && !loading && <> <GridContainer container spacing={2}>
            {users.slice(start, end).map((user: any) => {
                return <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
                    <UserCard user={user} cardHeight={350}></UserCard>
                </Grid>
            })}
        </GridContainer>
            {Math.ceil((users?.length || 0) / parseInt(itemsPerPage)) > 1 && <PaginationContainer>
                <FormControl >
                    <InputLabel id="simple-select-label">Items per page</InputLabel>
                    <Select
                        data-testid="items-per-page-select"
                        labelId="simple-select-label"
                        id="simple-select"
                        label="Items per page"
                        onChange={onHandleItemsPerPageChange}
                        style={{ minWidth: '150px' }}
                        value={itemsPerPage}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Pagination count={Math.ceil((users?.length || 0) / parseInt(itemsPerPage))} page={page} onChange={handleChange} />
            </PaginationContainer>}
        </>
        }
        {(!users || users.length == 0) && !loading && <Typography variant='h4'>No users found</Typography>}
        <UserModal />
    </Box>;
}

