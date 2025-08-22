import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { Link } from 'react-router-dom';
import { getAllmyteam } from 'module/vendor/container/userContainer/slice';
import { userLogin } from 'container/LoginContainer/slice';

const MyTeamCard = ({ isLoading }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.data.user.getAllTeam);
  const userDataDetailse = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(getAllmyteam({}));
    dispatch(userLogin());
  }, [dispatch]);

  const statusCounts = useMemo(() => {
    const rolesToShow = [
      'adminAcnt',
      'adminMngr',
      'adminOptr',
      'vendor',
      'vendorAcnt',
      'vendorMngr',
      'vendorOptr',
      'licnseAcnt',
      'licnseMngr',
      'licnseOptr'
    ];

    const data = userDetails?.rows || [];

    const filtered = data.filter((user) => rolesToShow.includes(user.role));

    return {
      active: filtered.filter((u) => u.status === 'active').length,
      Created: filtered.filter((u) => u.status === 'created').length,
      suspended: filtered.filter((u) => u.status === 'suspended').length,
      deleted: filtered.filter((u) => u.status === 'deleted').length
    };
  }, [userDetails]);

  const avatarStyles = {
    active: {
      background: '#b9f6ca',
      color: '#00c853'
    },
    Created: {
      background: '#c7e4fd',
      color: '#1e87e4'
    },
    suspended: {
      background: '#dfdfdf',
      color: theme.palette.orange.dark
    },
    deleted: {
      background: '#fff7bd',
      color: '#f3c419'
    }
  };

  const displayStatuses = ['active', 'Created', 'suspended'];

  return isLoading ? (
    <SkeletonPopularCard />
  ) : (
    <MainCard content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container direction="column">
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h2">Teams</Typography>
                </Grid>
                <Grid item>
                  {!userDataDetailse?.ftLogin && (
                    <Link to="/admin_AllTeam" style={{ textDecoration: 'none' }}>
                      <Typography variant="body2">View All</Typography>
                    </Link>
                  )}
                </Grid>
              </Grid>

              <Divider sx={{ my: 1.5 }} />

              {displayStatuses.map((status, index) => (
                <React.Fragment key={status}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="subtitle1" color="inherit">
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {statusCounts[status]}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar
                            variant="rounded"
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: '5px',
                              ml: 1.875,
                              backgroundColor: avatarStyles[status]?.background,
                              color: avatarStyles[status]?.color
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {index < displayStatuses.length - 1 && <Divider sx={{ my: 1.5 }} />}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

MyTeamCard.propTypes = {
  isLoading: PropTypes.bool
};

export default MyTeamCard;
