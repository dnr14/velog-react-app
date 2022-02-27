import React from 'react';
import withLoading from '@/hoc/withLoading';
import Item from './Item';
import * as Styled from './styles';

const List = ({ list, observer }) => {
  if (list) {
    const { posts } = list;
    const itmes = posts.map(post => <Item key={post.id} {...post} />);
    return (
      <>
        <Styled.ListWrapper>
          <div>{itmes}</div>
        </Styled.ListWrapper>
        <div ref={observer} />
      </>
    );
  }
  return null;
};

export default withLoading(List);
