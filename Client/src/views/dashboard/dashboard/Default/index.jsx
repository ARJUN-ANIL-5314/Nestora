import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PopularCard from './PopularCard';
import OrderAction from './OrderAction';
import PaymentAction from './PaymentAction';
import MyTeam from './MyTeam';
import Payment from './Payment';
import Orders from './Orders';
import Support from './support';
import SupportAction from './supportCard';
import InternalSupport from './internalSupport';
import InternalSupportAction from './internalSupportCard';
import Customers from './Customers';
import CustomerAction from './CustomerAction';

import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <Customers isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={12}>
            <CustomerAction isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <Orders isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={12}>
            <OrderAction isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <Payment isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={12}>
            <PaymentAction isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <MyTeam isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={12}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <Support isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={12}>
            <SupportAction isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <InternalSupport isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={12}>
            <InternalSupportAction isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
