import React from 'react';
import Item from '@/Components/views/MainPage/Main/Item';
import * as Styled from '@/Components/views/MainPage/Main/style';

const Main = ({ list, observer }) => {
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

export default Main;
