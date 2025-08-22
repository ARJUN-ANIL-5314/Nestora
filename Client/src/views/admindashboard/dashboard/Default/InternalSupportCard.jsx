import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInternalSupport } from 'container/SupportContainer/slice';
import { userLogin } from 'container/LoginContainer/slice';

const getStatusCounts = (supportData) => ({
  created: supportData.filter((item) => item.status === 'created').length,
  active: supportData.filter((item) => item.status === 'active').length,
  inprogress: supportData.filter((item) => item.status === 'inprogress').length,
  completed: supportData.filter((item) => item.status === 'completed').length
});

const InternalSupportAction = ({ isLoading }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [statusCounts, setStatusCounts] = useState({
    created: 0,
    active: 0,
    inprogress: 0,
    completed: 0
  });

  const supportDetails = useSelector((state) => state.support?.supportInternal || []);
  const userDataDetailse = useSelector((state) => state.login?.user || {}); // ✅ Fallback added

  useEffect(() => {
    dispatch(getInternalSupport({}));
    dispatch(userLogin());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(supportDetails)) {
      const counts = getStatusCounts(supportDetails);
      setStatusCounts(counts);
    }
  }, [supportDetails]);

  const isFtLogin = userDataDetailse?.ftLogin ?? false;

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
                      <Typography variant="h2">Internal Support</Typography>
                    </Grid>
                    <Grid item>
                      {!isFtLogin && (
                        <Link to="/licensee_internalSupport" style={{ textDecoration: 'none' }}>
                          <Typography variant="body2">View All</Typography>
                        </Link>
                      )}
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />

                  {['Created', 'Active', 'In Progress', 'Completed'].map((label, idx) => {
                    const key = label.toLowerCase().replace(' ', '');
                    const colors = [
                      { bg: '#b9f6ca', color: '#00c853' },
                      { bg: '#c7e4fd', color: '#1e87e4' },
                      { bg: '#dfdfdf', color: theme.palette.orange.dark },
                      { bg: '#fff7bd', color: '#f3c419' }
                    ];
                    const color = colors[idx];

                    return (
                      <React.Fragment key={key}>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">{label}</Typography>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle1" color="inherit">{statusCounts[key]}</Typography>
                              </Grid>
                              <Grid item>
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '5px',
                                    backgroundColor: color.bg,
                                    color: color.color,
                                    ml: 2
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        {idx < 3 && <Divider sx={{ my: 1.5 }} />}
                      </React.Fragment>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

InternalSupportAction.propTypes = {
  isLoading: PropTypes.bool
};

export default InternalSupportAction;
