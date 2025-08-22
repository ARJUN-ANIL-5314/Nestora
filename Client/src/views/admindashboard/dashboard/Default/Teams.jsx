import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, styled } from '@mui/material/styles';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import { getAllmyteam } from 'module/vendor/container/userContainer/slice';
import { IconSteam } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { userLogin } from 'container/LoginContainer/slice';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

const MyTeam = ({ isLoading }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const userDetails = useSelector((state) => state.data.user.getAllTeam);
  const userDataDetailse = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(getAllmyteam({}));
    dispatch(userLogin());
  }, [dispatch]);

  const teamData = useMemo(() => {
    return userDetails?.rows?.filter((row) => row.role !== 'licensee') || [];
  }, [userDetails]);

  useEffect(() => {
    setCount(teamData.length);
  }, [teamData]);

  const WrapperComponent = !userDataDetailse?.ftLogin ? Link : React.Fragment;
  const wrapperProps = !userDataDetailse?.ftLogin ? { to: '/admin_AllTeam' } : {};

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <WrapperComponent {...wrapperProps}>
          <CardWrapper border={false} content={false}>
            <Box sx={{ p: 2 }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                  <ListItemAvatar
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '5px',
                      background: 'linear-gradient(210.04deg, #000000 29.06%, rgb(101 101 101 / 75%) 83.49%)',
                      color: '#ffffff',
                      mr: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconSteam sx={{ fontSize: 32 }} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ py: 0, mt: 0.45, mb: 0.45 }}
                    primary={<Typography variant="h4">Teams</Typography>}
                    secondary={
                      <Typography variant="h5" sx={{ color: theme.palette.grey[500], mt: 0.5 }}>
                        {count}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
          </CardWrapper>
        </WrapperComponent>
      )}
    </>
  );
};

MyTeam.propTypes = {
  isLoading: PropTypes.bool
};

export default MyTeam;
