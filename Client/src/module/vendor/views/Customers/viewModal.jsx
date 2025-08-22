import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Tab, Tabs } from '@mui/material';

import commonStyles from 'assets/style/Style';
import { getCustomerById } from 'module/vendor/container/customerContainer/slice';
import formatDate from 'utils/formatDateTime';
import { capitalize } from 'utils/Capitalised';
import { roleMapping } from 'module/utlities/user_name';

const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const customerByIdData = useSelector((state) => state.data.customers.customerByIdData);

  console.log('customerByIdData', customerByIdData);

  useEffect(() => {
    if (data?.id) {
      dispatch(getCustomerById(data?.id));
    }
  }, [dispatch, data]);

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <Box>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          <Tab label="Basic Details" />
          <Tab label="Additional Details" />
          <Tab label="General Details" />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Customer ID</Typography>
              <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.customerId) || ''}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Customer Type</Typography>
              <Typography sx={style.viewModalContent}>
                {customerByIdData?.custType ? roleMapping[customerByIdData.custType] : '-'}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Name</Typography>
              <Typography sx={style.viewModalContent}>
                {capitalize(
                  customerByIdData?.fName ? `${customerByIdData.fName} ${customerByIdData.lName}` : customerByIdData?.lName || ''
                )}
              </Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Email</Typography>
              <Typography>{capitalize(customerByIdData?.email || '')}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Mobile (Primary)</Typography>
              <Typography sx={style.viewModalContent}>+91 {capitalize(customerByIdData?.contactMobile1 || '')}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>WhatsApp</Typography>
              <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.contactMobile2 || '')}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Created Date</Typography>
              <Typography sx={style.viewModalContent}>{formatDate(customerByIdData?.createdAt || '')}</Typography>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Country</Typography>
              <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.address?.country?.name || '')}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>State</Typography>
              <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.address?.state?.name || '')}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>District</Typography>
              <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.address?.district?.name || '')}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>City</Typography>
              <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.address?.city || '')}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Address Line 1</Typography>
              <Box
                sx={{
                  ...style.viewModalContent,
                  maxHeight: '6em',
                  overflowY: 'auto',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  margin: '4px 0',
                  borderRadius: '4px'
                }}
              >
                {capitalize(customerByIdData?.address?.addr1 || '')}
              </Box>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Address Line 2</Typography>
              <Box
                sx={{
                  ...style.viewModalContent,
                  maxHeight: '6em',
                  overflowY: 'auto',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  margin: '4px 0',
                  borderRadius: '4px'
                }}
              >
                {capitalize(customerByIdData?.address?.addr2 || '')}
              </Box>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Postal Code</Typography>
              <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.address?.postalCode || '')}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Created By</Typography>
              <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.createdBy?.fName || '')}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Org ID</Typography>
              <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.orgId || '')}</Typography>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Enquiry Source</Typography>
              <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.enqSource?.name || '')}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Enquiry Mode</Typography>
              <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.enqMode?.name || '')}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Reference By</Typography>
              <Box
                sx={{
                  ...style.viewModalContent,
                  maxHeight: '6em',
                  overflowY: 'auto',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  margin: '4px 0',
                  borderRadius: '4px'
                }}
              >
                {capitalize(customerByIdData?.extRefNo || '')}
              </Box>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Remarks</Typography>
              <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.remarks || '')}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              {customerByIdData?.custType !== 'INDV' && customerByIdData?.companyName && (
                <>
                  <Typography sx={style.viewModalLab}>Company Name</Typography>
                  <Typography sx={style.viewModalContent}>{capitalize(customerByIdData?.companyName || '')}</Typography>
                </>
              )}
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              {customerByIdData.custType !== 'INDV' && (
                <>
                  <Typography sx={style.viewModalLab}>GST No</Typography>
                  <Typography sx={style.viewModalContent}>{customerByIdData?.gstin || ''}</Typography>
                </>
              )}
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              {customerByIdData.custType !== 'INDV' && (
                <>
                  <Typography sx={style.viewModalLab}>License No</Typography>
                  <Typography sx={style.viewModalContent}>{customerByIdData?.licenceNo || ''}</Typography>
                </>
              )}
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
};

export default ViewModal;

function TabPanel(props) {
  const { children, value, index } = props;

  return <div hidden={value !== index}>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div>;
}
