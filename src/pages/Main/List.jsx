import React from 'react';
import Item from './Item';
import * as Styled from './styles';

const List = ({ list, observer }) => {
  const { posts } = list;
  return (
    <main>
      <section>
        <Styled.LayOut>
          <Styled.ListBox>
            {posts.map(post => (
              <Item key={post.id} {...post} />
            ))}
          </Styled.ListBox>
        </Styled.LayOut>
        <div ref={observer} />
      </section>
    </main>
  );
};

export default List;
