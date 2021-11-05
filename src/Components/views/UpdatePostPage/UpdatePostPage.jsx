import React, { useCallback, useEffect, useState } from 'react';
import CoustomEditor from 'Components/InsertPostPage/Editor/CoustomEditor';
import { useParams } from 'react-router-dom';
import http from '@/api/http';
import { decodeEntities } from '@/utils/editorUtil.js';

function UpdatePostPage() {
  const { id } = useParams();
  const [body, setBody] = useState('');

  const onReady = useCallback(
    editor => {
      console.log('onReady', body);
      editor.setData('<p>1212</p>');
    },
    [body]
  );

  useEffect(() => {
    http.get(`/posts/${id}`).then(({ data }) => {
      const { body } = data;
      console.log(body);
      setBody(body);
    });
  }, []);

  return (
    <div>
      <CoustomEditor data={decodeEntities(body)} />
    </div>
  );
}

export default UpdatePostPage;
