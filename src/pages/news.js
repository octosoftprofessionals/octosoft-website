import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import { useNavigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import PostPreView from '../components/PostPreView';
import Container from '../components/Container';
import Events from '../components/Events';
import BackgroundImage from '../assets/Trama.png';
import PrimaryInput from '../components/PrimaryInput';

const styles = makeStyles({
  root: {
    margin: 18,
  },
  link: {
    textDecoration: 'none',
  },
  backgroundGlobal: {
    padding: 17,
    background: '#fff',
  },
  stylesEvent: { paddingTop: 30 },
  headTitle: {
    margin: 0,
    fontSize: 35,
    lineHeight: '48px',
    color: '#a96cb0',
  },
  subTitle: {
    margin: 0,
    marginBottom: 10,
    color: '#a96cb0',
  },
  inputSearch: {
    fontFamily: 'Montserrat',
  },
  titleListPost: {
    margin: 0,
    padding: 5,
  },
  backgroundListPost: { background: '#ECECEC' },
});

const Blogs = (props) => {
  const classes = styles(props);
  const [search, setSearch] = useState();

  const posts = get(props, 'data.allContentfulPost.edges');
  const postsRecommended = posts.filter((p) => p.node.recommended);
  const events = get(props, 'data.allContentfulEvents.edges');

  const navigate = useNavigate();

  return (
    <Container
      background={`url(${BackgroundImage})`}
      innerBackground={'none'}
    >
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} className={classes.backgroundGlobal}>
              <h1 className={classes.headTitle}>News</h1>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} className={classes.backgroundGlobal}>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                xs={12}
              >
                <Grid item xs={10}>
                  <Autocomplete
                    freeSolo
                    disableClearable
                    options={posts.map(({ node }) => node)}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, option) => {
                      navigate(`/news/${option.slug}`);
                    }}
                    renderInput={(params) => (
                      <PrimaryInput
                        {...params}
                        className={classes.inputSearch}
                        id="outlined-search"
                        label="Search..."
                        value={search}
                        size="small"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                        onChange={({ target }) =>
                          setSearch(target.value)
                        }
                      />
                    )}
                  />
                </Grid>
                <SearchIcon md={2} fontSize="large" />
              </Grid>
            </Paper>
          </Grid>

          <Events
            stylesGlobal={`${classes.backgroundGlobal} ${classes.stylesEvent}`}
            events={events}
          />

          <Grid item md={8}>
            <Grid container spacing={3}>
              {posts.map(({ node }) => (
                <PostPreView
                  background={`url(${node.photo.file.url})`}
                  title={node.title}
                  content={node.content.json}
                  slug={node.slug}
                  firm={node.firm}
                  linkFirm={node.linkFirm}
                  avatar={`${node.avatar.file.url}`}
                />
              ))}
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  elevation={2}
                  className={classes.backgroundGlobal}
                >
                  <h2 className={classes.subTitle}>Latest Posts</h2>
                  <Grid container spacing={3}>
                    {posts.map(({ node }) => (
                      <Grid item xs={12}>
                        <Link
                          className={classes.link}
                          to={`/news/${node.slug}`}
                        >
                          <Paper
                            elevation={0}
                            className={classes.backgroundListPost}
                          >
                            <h4 className={classes.titleListPost}>
                              {node.title}
                            </h4>
                          </Paper>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  elevation={2}
                  className={classes.backgroundGlobal}
                >
                  <h2 className={`${classes.subTitle}`}>
                    Recommended Posts
                  </h2>
                  <Grid container spacing={3}>
                    {postsRecommended.map(({ node }) => (
                      <Grid item xs={12}>
                        <Link
                          className={classes.link}
                          to={`/news/${node.slug}`}
                        >
                          <Paper
                            elevation={0}
                            className={classes.backgroundListPost}
                          >
                            <h4 className={classes.titleListPost}>
                              {node.title}
                            </h4>
                          </Paper>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Blogs;

export const pageQuery = graphql`
  query NewsQuery {
    allContentfulPost {
      edges {
        node {
          id
          slug
          title
          linkFirm
          firm
          avatar {
            file {
              url
            }
          }
          recommended
          photo {
            file {
              url
            }
          }
          content {
            json
          }
        }
      }
    }
    allContentfulEvents(sort: { fields: date }) {
      edges {
        node {
          id
          link
          title
          date(formatString: "")
        }
      }
    }
  }
`;
