import logoDark2 from 'assets/images/Home/Nestora-1-.png';

const Logo2 = () => {
  // const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     */
    <img src={logoDark2} alt="Logo" style={{ width: '135px', height: '55px' }} />
  );
};

export default Logo2;
