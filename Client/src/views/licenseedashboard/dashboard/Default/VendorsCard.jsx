import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCreatedBy } from 'module/vendor/container/userContainer/slice';
import { userLogin } from 'container/LoginContainer/slice';

const getStatusCounts = (userRole, userData) => {
  let filteredData = [];

  switch (userRole) {
    case 'vendor':
      filteredData = userData.filter((user) => user.role === userRole);
      return {
        active: filteredData.filter((user) => user.status === 'active').length,
        suspended: filteredData.filter((user) => user.status === 'suspended').length,
        deleted: filteredData.filter((user) => user.status === 'deleted').length,
        new: filteredData.filter((user) => user.status === 'created').length
      };
    default:
      return {
        active: 0,
        suspended: 0,
        deleted: 0,
        new: 0
      };
  }
};
const VendorsCard = ({ isLoading }) => {
  const theme = useTheme();
  const [statusCounts, setStatusCounts] = useState({
    active: 0,
    suspended: 0,
    deleted: 0,
    new: 0
  });
  const userDetails = useSelector((state) => state.data.user.userData);
  const dispatch = useDispatch();
  const userDataDetailse = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(getUserCreatedBy({}));
    dispatch(userLogin());
  }, [dispatch]);

  useEffect(() => {
    if (userDetails?.rows) {
      const { active, suspended, deleted, new: created } = getStatusCounts('vendor', userDetails.rows);
      setStatusCounts({
        active,
        suspended,
        deleted,
        new: created
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
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h2">Vendor</Typography>
                      {/* <Typography variant="body2">Status</Typography> */}
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          {!userDataDetailse?.ftLogin && (
                            <Link to="/vendor" style={{ textDecoration: 'none' }}>
                              <Typography variant="body2">View All</Typography>
                            </Link>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />
                  <Grid container direction="column">
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            Created
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {statusCounts.new}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Avatar
                                variant="rounded"
                                sx={{
                                  width: 16,
                                  height: 16,
                                  borderRadius: '5px',
                                  backgroundColor: '#c7e4fd',
                                  color: '#1e87e4',
                                  ml: 2
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="subtitle1" color="inherit">
                        Active
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {statusCounts.active}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar
                            variant="rounded"
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: '5px',
                              backgroundColor: '#b9f6ca',
                              color: '#00c853',
                              marginLeft: 1.875
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 1.5 }} />
                  <Grid container direction="column">
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            Suspended
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {statusCounts.suspended}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Avatar
                                variant="rounded"
                                sx={{
                                  width: 16,
                                  height: 16,
                                  borderRadius: '5px',
                                  backgroundColor: '#dfdfdf',
                                  color: theme.palette.orange.dark,
                                  ml: 2
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

VendorsCard.propTypes = {
  isLoading: PropTypes.bool
};

export default VendorsCard;
