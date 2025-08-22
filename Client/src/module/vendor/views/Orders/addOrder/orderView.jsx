// import Box from '@mui/system/Box';
// import Grid from '@mui/material/Grid';
// import { useTheme } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import commonStyles from 'assets/style/Style';

// const OrderView = ({datas}) => {
//     console.log("===data====", datas);
//   const theme = useTheme();
//   const style = commonStyles(theme);

//   return (
//     <>
//     <Box>
//         <Grid container spacing={3}>
//           {Object.entries(datas).map(([key, value]) => (
//             <Grid item xs={12} lg={4} xl={4} md={6} sm={12} key={key}>
//               <Typography sx={style.viewModalLab}>{key}</Typography>
//               <Typography sx={style.viewModalContent}>{value}</Typography>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default OrderView;

import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';

const OrderView = ({ datas }) => {
  console.log('==datas==', datas);
  const theme = useTheme();
  const style = commonStyles(theme);

  const filteredDatas = Object.entries(datas).filter(([key]) => !['breadcrumbs', 'spcfctnId'].includes(key));

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          {filteredDatas.map(([key, value]) => (
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12} key={key}>
              <Typography sx={style.viewModalLab}>{key}</Typography>
              <Typography sx={style.viewModalContent}>{typeof value === 'object' ? value.value : value}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default OrderView;
