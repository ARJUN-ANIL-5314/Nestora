import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, CardContent, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { Link } from 'react-router-dom';
import { getAllmyteam } from 'module/vendor/container/userContainer/slice';
import { userLogin } from 'container/LoginContainer/slice';

const getStatusCounts = (userRoles, userData) => {
  let filteredData = [];

  userRoles.forEach((role) => {
    filteredData = [...filteredData, ...userData.filter((user) => user.role === role)];
  });

  return {
    active: filteredData.filter((user) => user.status === 'active').length,
    suspended: filteredData.filter((user) => user.status === 'suspended').length,
    deleted: filteredData.filter((user) => user.status === 'deleted').length,
    created: filteredData.filter((user) => user.status === 'created').length
  };
};

const statusDisplay = {
  active: { label: 'Active', bg: '#b9f6ca', color: '#00c853' },
  created: { label: 'Created', bg: '#c7e4fd', color: '#1e87e4' },
  suspended: { label: 'Suspended', bg: '#dfdfdf', color: '#f57c00' },
  deleted: { label: 'Deleted', bg: '#fff7bd', color: '#f3c419' }
};

const MyTeamCard = ({ isLoading }) => {
  const dispatch = useDispatch();

  const [statusCounts, setStatusCounts] = useState({
    active: 0,
    suspended: 0,
    deleted: 0,
    created: 0
  });

  const userDetails = useSelector((state) => state.data?.user?.userData || {});
  const userDataDetailse = useSelector((state) => state.login?.user || {});

  useEffect(() => {
    dispatch(getAllmyteam({}));
    dispatch(userLogin());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(userDetails?.rows)) {
      const rolesToShow = ['adminAcnt', 'adminMngr', 'adminOptr'];
      const counts = getStatusCounts(rolesToShow, userDetails.rows);
      setStatusCounts(counts);
    }
  }, [userDetails]);

  const showStatuses = ['active', 'created', 'suspended'];

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
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h2">My Team</Typography>
                    </Grid>
                    <Grid item>
                      {!userDataDetailse?.ftLogin && (
                        <Link to="/licensee_myteam" style={{ textDecoration: 'none' }}>
                          <Typography variant="body2">View All</Typography>
                        </Link>
                      )}
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />
                  {showStatuses.map((status, index) => (
                    <React.Fragment key={status}>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {statusDisplay[status].label}
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
                                  backgroundColor: statusDisplay[status].bg,
                                  color: statusDisplay[status].color,
                                  ml: 2
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      {index < showStatuses.length - 1 && <Divider sx={{ my: 1.5 }} />}
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
