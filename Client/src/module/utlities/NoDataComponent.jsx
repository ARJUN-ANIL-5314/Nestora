import React from 'react';
import noDataImage from 'assets/images/nodata.png';

const NoDataComponent = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', width: '100%' }}>
      <img src={noDataImage} width={700} alt="No data available" style={{ width: '200px', marginBottom: '10px' }} />
      <div style={{ fontWeight: 'bolder', fontSize: '18px' }}>No Data Found</div>
    </div>
  );
};

export default NoDataComponent;
