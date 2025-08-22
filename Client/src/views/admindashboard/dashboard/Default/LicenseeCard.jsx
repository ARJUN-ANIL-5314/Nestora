import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { Link } from 'react-router-dom';
import { getUserCreatedBy } from 'module/vendor/container/userContainer/slice';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from 'container/LoginContainer/slice';

const getStatusCounts = (userRole, userData) => {
  const filteredData = userData.filter((user) => user.role === userRole);
  return {
    active: filteredData.filter((user) => user.status === 'active').length,
    suspended: filteredData.filter((user) => user.status === 'suspended').length,
    deleted: filteredData.filter((user) => user.status === 'deleted').length,
    created: filteredData.filter((user) => user.status === 'created').length
  };
};

const LicenseeCard = ({ isLoading }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [statusCounts, setStatusCounts] = useState({
    active: 0,
    suspended: 0,
    deleted: 0,
    created: 0
  });

  const userDetails = useSelector((state) => state.data?.user?.userData || {});
  const userDataDetailse = useSelector((state) => state.login?.user || {}); // ✅ fallback

  useEffect(() => {
    dispatch(getUserCreatedBy({}));
    dispatch(userLogin());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(userDetails?.rows)) {
      const { active, suspended, deleted, created } = getStatusCounts('licensee', userDetails.rows);
      setStatusCounts({ active, suspended, deleted, created });
    }
  }, [userDetails]);

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
                      <Typography variant="h2">Licensee</Typography>
                    </Grid>
                    <Grid item>
                      {!isFtLogin && (
                        <Link to="/licensee" style={{ textDecoration: 'none' }}>
                          <Typography variant="body2">View All</Typography>
                        </Link>
                      )}
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />

                  {/* Status Blocks */}
                  {[
                    { label: 'Active', key: 'active', color: '#00c853', bg: '#b9f6ca' },
                    { label: 'Created', key: 'created', color: '#1e87e4', bg: '#c7e4fd' },
                    { label: 'Suspended', key: 'suspended', color: theme.palette.orange.dark, bg: '#dfdfdf' }
                  ].map(({ label, key, color, bg }) => (
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
                                  backgroundColor: bg,
                                  color: color,
                                  ml: 2
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 1.5 }} />
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

LicenseeCard.propTypes = {
  isLoading: PropTypes.bool
};

export default LicenseeCard;
