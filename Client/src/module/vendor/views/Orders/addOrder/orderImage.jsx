import React, { useState, useEffect } from 'react';
import { Grid, Card, Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMediaQuery } from '@mui/material';
import NoPeviewImg from 'assets/images/no-preview1.jpeg';
import NoPeview from 'assets/images/no-preview.png';

const CustomPrevArrow = ({ onClick, disabled }) => (
  <Button onClick={onClick} disabled={disabled} style={{ marginLeft: '-5px' }}>
    <ExpandLessIcon />
  </Button>
);

const CustomNextArrow = ({ onClick, remainingCards }) => (
  <Button onClick={onClick} disabled={remainingCards <= 0} style={{ marginLeft: '-5px' }}>
    <KeyboardArrowDownIcon />
  </Button>
);

function OrderImage({ subCategories, selectedSubCategory, setSelectedSubCategory, selectedMainCategory }) {
  const [startIndex, setStartIndex] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width:1199px)');

  const totalCards = 10;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    // slidesToScroll: 5,
    vertical: !isSmallScreen,
    verticalSwiping: true,
    initialSlide: startIndex,
    afterChange: (current) => setStartIndex(current),
    prevArrow: <CustomPrevArrow disabled={startIndex === 0} />,
    nextArrow: <CustomNextArrow remainingCards={totalCards - startIndex - 5} />
  };

  useEffect(() => {
    // Reset selectedSubCategory when selectedMainCategory changes
    setSelectedSubCategory(null);
  }, [selectedMainCategory, setSelectedSubCategory]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} lg={2} padding={1}>
          <Slider {...settings}>
            {subCategories.length > 0
              ? subCategories.map((subCat, index) => (
                  <div key={index}>
                    <Button
                      onClick={() => setSelectedSubCategory(subCat)}
                      style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', minWidth: '0px' }}
                    >
                      <Card variant="outlined" style={{ height: '50px', marginBottom: '10px', background: '#eef2f6' }}>
                        <img src={subCat.subCatgImg} height={'100%'} width={'100%'} alt="" style={{ objectFit: 'contain' }} />
                      </Card>
                    </Button>
                  </div>
                ))
              : [...Array(5)].map((_, index) => (
                  <div key={index}>
                    <Card
                      variant="outlined"
                      style={{
                        height: '50px',
                        marginBottom: '10px',
                        background: '#eef2f6',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={NoPeview} alt="" width={'50%'} style={{ objectFit: 'cover' }} />
                      </div>
                    </Card>
                  </div>
                ))}
          </Slider>
        </Grid>
        <Grid item xs={12} lg={9} padding={0}>
          {selectedSubCategory ? (
            <Card variant="outlined" style={{ height: '360px', background: '#eef2f6', marginTop: '20px' }}>
              <img src={selectedSubCategory.subCatgImg} alt="" height={'100%'} width={'100%'} style={{ objectFit: 'cover' }} />
            </Card>
          ) : (
            <Card variant="outlined" style={{ height: '360px', background: '#eeeeee', marginTop: '20px' }}>
              <img src={NoPeviewImg} alt="" width={'100%'} />
            </Card>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderImage;
