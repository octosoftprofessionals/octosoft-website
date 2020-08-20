import React, { useState } from 'react';
import Container from '../components/Container';
import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from '../assets/Background.png';
import { data as DummyData } from '../assets/DummyData';

const styles = makeStyles({
  containHead: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  titleHead: {
    margin: '30px 0 25px 0',
    fontSize: 40,
  },
  subTitleHead: {
    margin: 0,
    fontSize: 19,
    fontWeight: 500,
  },
  keypad: {
    margin: '20px 90px 0 90px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containButton: {
    width: '25%',
  },
  stylesButton: {
    cursor: 'pointer',
    height: 50,
    margin: '15px 10px 0 0',
    boxShadow:
      '0px 3px 1px 2px rgba(0 0 0 / 10%), 0px 0px 0px 0px rgb(0 0 0 / 15%), 0px 5px 5px 0px rgb(0 0 0 / 13%), 0px 5px 5px 0px rgb(0 0 0 / 13%)',
    display: 'flex',
    alignItems: 'center',
  },
  iconsButton: {
    margin: '0 25px 0 15px',
    width: 32,
    height: 32,
  },
  textButton: {
    width: '50%',
    fontWeight: 'bolder',
  },
  containerInfo: {
    margin: '69px 25px',
    display: 'flex',
    flexDirection: 'row',
  },
  iconsDescriptions: {
    margin: '20px 50px 0 50px',
  },
  titleDescriptions: {
    fontSize: 27,
    fontWeight: 'bolder',
    textAlign: 'center',
    margin: '50px 25px',
  },
  containerDescription: {
    background: '#ECECEC',
    margin: 26,
    padding: 25,
    width: '38vw',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  stylesBulletpoint: {
    fontWeight: 'bolder',
  },
});

const OurServices = () => {
  const classes = styles();
  const [index, setSelectIndex] = useState('0');
  return (
    <Container background={`url(${BackgroundImage})`}>
      <div className={classes.containHead}>
        <h1 className={classes.titleHead}>Our Services</h1>
        <p className={classes.subTitleHead}>
          Learn about our departaments and the services they can
          provide to your business
        </p>
      </div>
      <div className={classes.keypad}>
        {DummyData.map((data, i) => (
          <div
            className={classes.containButton}
            onClick={() => {
              setSelectIndex(i);
            }}
          >
            <div className={classes.stylesButton}>
              <img
                src={data.iconUrl}
                className={classes.iconsButton}
              />
              <div className={classes.textButton}>
                {`${data.title}`}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.containerInfo}>
        <div>
          <img
            src={DummyData[index].iconUrl}
            className={classes.iconsDescriptions}
          />
          <div className={classes.titleDescriptions}>
            {DummyData[index].title}
          </div>
        </div>
        <div className={classes.containerDescription}>
          {DummyData[index].description.map((item) => (
            <li className={classes.stylesBulletpoint}>{item}</li>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default OurServices;
