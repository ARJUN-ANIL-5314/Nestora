import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import LicenseeCard from './LicenseeCard';
import MyTeamCard from './MyTeamCard';
import Teams from './Teams';
import TeamsCards from './TeamsCards';
import MyTeam from './MyTeam';
import Support from './Support';
import Licensee from './Licensee';

import { gridSpacing } from 'store/constant';
// import SupportCard from './SupportCard';
//import Support from './Support';
import SupportAction from './SupportCard';
import InternalSupport from './InternalSupport';
import InternalSupportAction from './InternalSupportCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading completion after component mounts
    setLoading(false);
  }, []);

  return (
    <>
      {/* Grid layout */}
      <Grid container spacing={gridSpacing}>
        {/* Left column */}
        <Grid item lg={4} xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Licensee isLoading={isLoading} />
            </Grid>
            <Grid item xs={12}>
              <LicenseeCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>

        {/* Middle column */}
        <Grid item lg={4} xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <MyTeam isLoading={isLoading} />
            </Grid>
            <Grid item xs={12}>
              <MyTeamCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>

        {/* Right column */}

        <Grid item lg={4} xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Teams isLoading={isLoading} />
            </Grid>
            <Grid item xs={12}>
              <TeamsCards isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={4} xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Support isLoading={isLoading} />
            </Grid>
            <Grid item xs={12}>
              <SupportAction isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={4} xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <InternalSupport isLoading={isLoading} />
            </Grid>
            <Grid item xs={12}>
              <InternalSupportAction isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
