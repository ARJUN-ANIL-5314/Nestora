import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import commonStyles from 'assets/style/Style';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import styles from './style.js';

const CardHead = ({
  tableHeading,
  count,
  orderAdd,
  rateSetUpAdd,
  rateCardAdd,
  specificationAdd,
  hasHead = true,
  hasAdd = true,
  handleAddModal,
  hasSearch = true,
  searchHandler
}) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const styling = styles(theme);
  const navigate = useNavigate();

  const HandleOrderClick = () => {
    navigate('/orderAddPage');
  };

  const HandleSpecificationClick = () => {
    navigate('/specificationAddPage');
  };
  const HandleRateSetUpClick = () => {
    navigate('/rate_cardSetup_add');
  };
  const HandleRateCardClick = () => {
    navigate('/rate_card_add');
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {hasHead && (
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ ...styling.modalHeadContent, textAlign: 'left' }}>{tableHeading ? tableHeading : 'Add Heading'}</Box>
        </Grid>
      )}

      {hasSearch && (
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            sx={{ width: '100%' }}
            placeholder="Search Here"
            InputLabelProps={{
              shrink: false
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            className="searchOne"
            onChange={searchHandler}
          />
        </Grid>
      )}

      <Grid item xs={12} sm={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ ...styling.modalResult, marginRight: 1 }}>
            <FilterAltSharpIcon />
            <span style={{ fontWeight: '900' }}>Result:{count ? count : '0'}</span>
          </Box>
          {hasAdd && (
            <Button
              color="info"
              variant="contained"
              // onClick={orderAdd ? HandleOrderClick : (specificationAdd ? HandleSpecificationClick : handleAddModal)}
              // onClick={orderAdd ? HandleOrderClick : (specificationAdd ? HandleSpecificationClick : (rateSetUpAdd ? HandleRateSetUpClick : handleAddModal))}
              onClick={
                orderAdd
                  ? HandleOrderClick
                  : specificationAdd
                  ? HandleSpecificationClick
                  : rateSetUpAdd
                  ? HandleRateSetUpClick
                  : rateCardAdd
                  ? HandleRateCardClick
                  : handleAddModal
              }
              sx={style.addBtnHead}
            >
              +ADD
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CardHead;
