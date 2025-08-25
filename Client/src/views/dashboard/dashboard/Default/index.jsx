import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PopularCard from './PopularCard.jsx';
import OrderAction from './OrderAction.jsx';
import PaymentAction from './PaymentAction.jsx';
import MyTeam from './MyTeam.jsx';
import Payment from './Payment.jsx';
import Orders from './Orders.jsx';
import Support from './support.jsx';
import SupportAction from './supportCard.jsx';
import InternalSupport from './internalSupport.jsx';
import InternalSupportAction from './internalSupportCard.jsx';
import Customers from './Customers.jsx';
import CustomerAction from './CustomerAction.jsx';

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
