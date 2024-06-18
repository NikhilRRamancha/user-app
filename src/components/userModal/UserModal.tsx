import React from "react";
import { Avatar, Backdrop, Box, Card, CardContent, CardMedia, Chip, Divider, Fade, Modal, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/User.slice";
import {generateColor} from '../../utils/helper';


export const UserModal = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userSlice.user);
    const handleClose = () => {
        dispatch(selectUser(null));
    };
    const ModalBox = styled(Box)(({ theme }) => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: '24px',
        width: '80%',
        padding: theme.spacing(4),
        maxWidth: '600px',
    }));

    const AvatarHolder = styled('div')(({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '120px',
        borderBottomLeftRadius:'20px',
        paddingTop: theme.spacing(3),
    }));

    const ImageHolder = styled(Avatar)(({ theme }) => ({
        width: theme.spacing(18),
        height: theme.spacing(18),
        border: `2px solid ${theme.palette.primary.main}`,
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: '-5px',
        backgroundColor: generateColor(user.firstname + user.lastname),
    }));

    const CardHolder = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'row',
    }));
    const CardContentHolder = styled(CardContent)(({ theme }) => ({
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    }));


    return user && <Modal
        data-testid="user-modal"
        open={!!user}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="user-modal-name"
        aria-describedby="user-modal-description"
        slots={{ backdrop: Backdrop }}
        slotProps={{
            backdrop: {
                timeout: 500,
            },
        }}
    >
        <Fade in={!!user}>
            <ModalBox>
                <CardHolder>
                    <AvatarHolder>
                        <ImageHolder variant="circular" >
                            <CardMedia
                                component="img"
                                image={user.avatar}
                                alt={`${user?.firstname} ${user?.lastname}`}
                            />
                        </ImageHolder>
                    </AvatarHolder>
                    <CardContentHolder>
                        <Typography gutterBottom variant="h5" component="p" id="user-modal-name">
                           {user.username}
                        </Typography>
                        <Typography gutterBottom component="p">
                           {user.firstname} {user.lastname}
                        </Typography>
                        <Typography gutterBottom component="p">
                           {user.role}
                        </Typography>
                        <Typography gutterBottom component="p">
                           {user.email}
                        </Typography>
                        <Typography gutterBottom component="p">
                          doj:  {new Date(user.join_date).toDateString()}
                        </Typography>
                     </CardContentHolder>
                </CardHolder>
                <Divider sx={{ mt: 2 }} />
                <Typography variant="h5" component="h5">
                    Description
                </Typography>
                <Typography id="user-modal-description" sx={{ mt: 2 }}>
                    {user.description}
                </Typography>
            </ModalBox>
        </Fade>
    </Modal>

}