import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSupport } from 'container/SupportContainer/slice';
import { userLogin } from 'container/LoginContainer/slice';

const getStatusCounts = (supportData) => ({
  created: supportData.filter((item) => item.status === 'created').length,
  active: supportData.filter((item) => item.status === 'active').length,
  inprogress: supportData.filter((item) => item.status === 'inprogress').length,
  completed: supportData.filter((item) => item.status === 'completed').length
});

const statusDisplay = (theme) => ({
  created: {
    label: 'Created',
    bg: '#b9f6ca',
    color: '#00c853'
  },
  active: {
    label: 'Active',
    bg: '#c7e4fd',
    color: '#1e87e4'
  },
  inprogress: {
    label: 'In Progress',
    bg: '#dfdfdf',
    color: theme.palette.orange.dark
  },
  completed: {
    label: 'Completed',
    bg: '#fff7bd',
    color: '#f3c419'
  }
});

const SupportAction = ({ isLoading }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [statusCounts, setStatusCounts] = useState({
    created: 0,
    active: 0,
    inprogress: 0,
    completed: 0
  });

  const supportDetails = useSelector((state) => state.support?.supportData || []);
  const userDataDetailse = useSelector((state) => state.login?.user || {});

  useEffect(() => {
    dispatch(getSupport({}));
    dispatch(userLogin());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(supportDetails)) {
      setStatusCounts(getStatusCounts(supportDetails));
    }
  }, [supportDetails]);

  const statusMap = statusDisplay(theme);
  const statuses = ['created', 'active', 'inprogress', 'completed'];

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
                      <Typography variant="h2">Support</Typography>
                    </Grid>
                    <Grid item>
                      {!userDataDetailse?.ftLogin && (
                        <Link to="/admin_support" style={{ textDecoration: 'none' }}>
                          <Typography variant="body2">View All</Typography>
                        </Link>
                      )}
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />

                  {statuses.map((status, index) => (
                    <React.Fragment key={status}>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {statusMap[status].label}
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
                                  backgroundColor: statusMap[status].bg,
                                  color: statusMap[status].color,
                                  ml: 2
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      {index < statuses.length - 1 && <Divider sx={{ my: 1.5 }} />}
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

SupportAction.propTypes = {
  isLoading: PropTypes.bool
};

export default SupportAction;
