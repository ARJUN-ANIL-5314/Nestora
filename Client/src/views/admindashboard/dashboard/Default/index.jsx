import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import LicenseeCard from './LicenseeCard.jsx';
import MyTeamCard from './MyTeamCard.jsx';
import Teams from './Teams.jsx';
import TeamsCards from './TeamsCards.jsx';
import MyTeam from './MyTeam.jsx';
import Support from './Support.jsx';
import Licensee from './Licensee.jsx';

import { gridSpacing } from 'store/constant';
// import SupportCard from './SupportCard.jsx';
//import Support from './Support.jsx';
import SupportAction from './SupportCard.jsx';
import InternalSupport from './InternalSupport.jsx';
import InternalSupportAction from './InternalSupportCard.jsx';

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
