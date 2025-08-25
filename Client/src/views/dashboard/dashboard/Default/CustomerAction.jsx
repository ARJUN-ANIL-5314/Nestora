import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, CardContent, Divider, Grid, Typography, CardActions } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomer } from 'module/vendor/container/customerContainer/slice';
import TotalIncomeDarkCard from './TotalIncomeDarkCard.jsx';

const getStatusCounts = (userData) => {
  return {
    active: userData.filter((user) => user.status === 'active').length,
    suspended: userData.filter((user) => user.status === 'suspended').length,
    created: userData.filter((user) => user.status === 'created').length
  };
};

const CustomerAction = ({ isLoading }) => {
  const [statusCounts, setStatusCounts] = useState({
    active: 0,
    suspended: 0,
    created: 0
  });

  const customerData = useSelector((state) => state.data.customers.customerData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomer({}));
  }, [dispatch]);

  useEffect(() => {
    if (customerData?.rows) {
      const counts = getStatusCounts(customerData.rows);
      setStatusCounts(counts);
    }
  }, [customerData]);

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
                      <h2>Orders</h2>
                    </Grid>
                    <Grid item>
                      <Link to="/orders" style={{ textDecoration: 'none' }}>
                        <Typography variant="body2">View All</Typography>
                      </Link>
                    </Grid>
                  </Grid> */}

                  <TotalIncomeDarkCard />

                  <Divider sx={{ my: 1.5 }} />

                  {/* Created Customers */}
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
                            {statusCounts.created}
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
                  <Divider sx={{ my: 1.5 }} />

                  {/* Active Customers */}
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
                              backgroundColor: '#dfdfdf',
                              color: '#807f7e',
                              ml: 2
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />

                  {/* Suspended Customers */}
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
                              backgroundColor: '#fff7bd',
                              color: '#f3c419',
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
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }} />
        </MainCard>
      )}
    </>
  );
};

CustomerAction.propTypes = {
  isLoading: PropTypes.bool
};

export default CustomerAction;
