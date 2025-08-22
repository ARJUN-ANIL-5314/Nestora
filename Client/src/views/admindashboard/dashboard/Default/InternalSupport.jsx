import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getInternalSupport } from 'container/SupportContainer/slice';
import { userLogin } from 'container/LoginContainer/slice';
import { IconHelp } from '@tabler/icons';

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

const InternalSupport = ({ isLoading }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const supportInternalDetails = useSelector((state) => state.support?.supportInternal || []);
  const userDataDetailse = useSelector((state) => state.login?.user || {});
  const isFtLogin = userDataDetailse?.ftLogin;

  useEffect(() => {
    dispatch(getInternalSupport({}));
    dispatch(userLogin());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List
              sx={{ py: 0, textDecoration: 'none' }}
              component={!isFtLogin ? Link : 'div'}
              to={!isFtLogin ? '/licensee_internalSupport' : undefined}
            >
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
                  <IconHelp />
                </ListItemAvatar>
                <ListItemText
                  sx={{ py: 0, mt: 0.45, mb: 0.45 }}
                  primary={<Typography variant="h4">Internal Support</Typography>}
                  secondary={
                    <Typography variant="h5" sx={{ color: theme.palette.grey[500], mt: 0.5 }}>
                      {supportInternalDetails.length}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

InternalSupport.propTypes = {
  isLoading: PropTypes.bool
};

export default InternalSupport;
