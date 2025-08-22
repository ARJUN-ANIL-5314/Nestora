import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  //getSupportAll ,
  getSupport
  // getInternalSupport
} from 'container/SupportContainer/slice';
import { userLogin } from 'container/LoginContainer/slice';

const getStatusCounts = (supportData) => {
  return {
    created: supportData.filter((item) => item.status === 'created').length,
    active: supportData.filter((item) => item.status === 'active').length,
    inprogress: supportData.filter((item) => item.status === 'inprogress').length,
    completed: supportData.filter((item) => item.status === 'completed').length
  };
};

const SupportAction = ({ isLoading }) => {
  const theme = useTheme();
  const [statusCounts, setStatusCounts] = useState({
    created: 0,
    active: 0,
    inprogress: 0,
    completed: 0
  });

  const dispatch = useDispatch();

  const supportDetails = useSelector((state) => state.support?.supportData);
  const userDataDetailse = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(getSupport({}));
    dispatch(userLogin());
  }, [dispatch]);

  useEffect(() => {
    if (supportDetails) {
      const { created, active, inprogress, completed } = getStatusCounts(supportDetails);
      setStatusCounts({
        created,
        active,
        inprogress,
        completed
      });
    }
  }, [supportDetails]);

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
                      <h2>Support</h2>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          {/* <Link to="/admin_support" style={{ textDecoration: 'none' }}>
                            <Typography variant="body2">View All</Typography>
                          </Link> */}
                          {!userDataDetailse?.ftLogin && (
                            <Link to="/admin_support" style={{ textDecoration: 'none' }}>
                              <Typography variant="body2">View All</Typography>
                            </Link>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 1.5 }} />
                  {/* Display counts for each priority */}
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
                  <Grid container direction="column">
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            In Progress
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {statusCounts.inprogress}
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
                  <Divider sx={{ my: 1.5 }} />
                  <Grid container direction="column">
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            Completed
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {statusCounts.completed}
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
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

SupportAction.propTypes = {
  isLoading: PropTypes.bool
};

export default SupportAction;
