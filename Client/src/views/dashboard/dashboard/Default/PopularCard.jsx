import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
// import { Link } from 'react-router-dom';
import { getUserCreatedBy } from 'module/vendor/container/userContainer/slice';
import MyteamDarkCard from './MyteamDarkCard';

const getStatusCounts = (userRoles, userData) => {
  let filteredData = [];

  userRoles.forEach((role) => {
    filteredData = [...filteredData, ...userData.filter((user) => user.role === role)];
  });

  return {
    active: filteredData.filter((user) => user.status === 'active').length,
    suspended: filteredData.filter((user) => user.status === 'suspended').length,
    deleted: filteredData.filter((user) => user.status === 'deleted').length,
    Created: filteredData.filter((user) => user.status === 'created').length
  };
};

const MyTeamCard = ({ isLoading }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [statusCounts, setStatusCounts] = useState({
    active: 0,
    suspended: 0,
    deleted: 0,
    Created: 0
  });
  const userDetails = useSelector((state) => state.data.user.userData);

  useEffect(() => {
    dispatch(getUserCreatedBy({}));
  }, [dispatch]);

  useEffect(() => {
    if (userDetails?.rows) {
      const {
        active,
        suspended,
        deleted,
        Created: created
      } = getStatusCounts(['vendorAcnt', 'vendorMngr', 'vendorOptr'], userDetails.rows);
      setStatusCounts({
        active,
        suspended,
        deleted,
        Created: created
      });
    }
  }, [userDetails]);

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container direction="column">
                  {/* <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h2">My Team</Typography>
                    </Grid>
                    <Grid item>
                      <Link to="/myteam" style={{ textDecoration: 'none' }}>
                        <Typography variant="body2">View All</Typography>
                      </Link>
                    </Grid>
                  </Grid> */}
                  <MyteamDarkCard />
                  <Divider sx={{ my: 1.5 }} />
                  {['active', 'Created', 'suspended'].map((status, index) => (
                    <React.Fragment key={status}>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
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
                                  backgroundColor: {
                                    active: '#b9f6ca',
                                    Created: '#c7e4fd',
                                    suspended: '#dfdfdf',
                                    deleted: '#fff7bd'
                                  }[status],
                                  color: {
                                    active: '#00c853',
                                    Created: '#1e87e4',
                                    suspended: theme.palette.orange.dark,
                                    deleted: '#f3c419'
                                  }[status],
                                  marginLeft: 1.875
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      {index < 2 && <Divider sx={{ my: 1.5 }} />}
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

MyTeamCard.propTypes = {
  isLoading: PropTypes.bool
};

export default MyTeamCard;
