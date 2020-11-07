import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import LoadingDoge from '../images/spinning_doge.gif';
import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql'; 

function Home() {

  const { user } = useContext(AuthContext);

  let posts = '';
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (data) {
    posts = { data: data.getPosts }
  }

  return (
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1> Recent Posts </h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm/>
            </Grid.Column>
          )}
          {loading ? (
            <img src={LoadingDoge} alt="loading doge" className="loadingDoge"/>
          ): (
            <Transition.Group>
              {posts.data && posts.data.map(post => (
              <Grid.Column key={post.id} style={{marginBottom: 20}}>
                <PostCard post={post}/>
              </Grid.Column>
            ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
  );
}



export default Home;