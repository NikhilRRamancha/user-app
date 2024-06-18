import React from 'react';
import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Typography, styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../store/user/User.slice';
import {generateColor} from '../../utils/helper';




interface UserCardProps {
    user: User.IUser
    cardHeight?: number
}


const UserCard: React.FC<UserCardProps> = ({user, cardHeight}) => {

  const dispatch = useDispatch();
    const curtailDescription = (description: string) => {   
        if(description.length > 100) {
            return description.slice(0, 100) + '...';
        }
        return description;
    }
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

    const CardHolder = styled(Card)(({ theme }) => ({
        height: cardHeight? cardHeight+'px': 'unset',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main,
    }));
    const CardContentHolder = styled(CardContent)(({ theme }) => ({
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    }));
    const onUserClick = () => {
      dispatch(selectUser(user));
    }
    return (
        <CardHolder data-testid="user-card">
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
              <Typography gutterBottom variant="h5" component="div">
                  {user.username}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{flexGrow:1}}>
              {curtailDescription(user.description)}
              </Typography>
              <Button variant="contained" onClick={onUserClick}>View More</Button>
            </CardContentHolder>
      </CardHolder>
    )
}

export default UserCard;