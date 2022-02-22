import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';

const fontSize = {
  options: [
    14,
    15,
    16,
    17,
    18,
    19,
    'default',
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
  ],
};

const fontFamily = {
  options: [
    'default',
    'Ubuntu, Arial, sans-serif',
    'Ubuntu Mono, Courier New, Courier, monospace',
  ],
};

const toolbar = [
  'heading',
  'bold',
  '|',
  'italic',
  'alignment',
  '|',
  'fontFamily',
  'fontSize',
  '|',
  'imageUpload',
  '|',
  'undo',
  'redo',
];

const editorConfiguration = {
  language: 'ko',
  plugins: [
    Heading,
    Essentials,
    Bold,
    Italic,
    Alignment,
    Paragraph,
    Base64UploadAdapter,
    FontSize,
    FontFamily,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
  ],
  fontFamily,
  fontSize,
  toolbar,
  image: {
    resizeUnit: 'px',
    toolbar: [
      'imageStyle:full',
      'imageStyle:alignLeft',
      'imageStyle:alignCenter',
      'imageStyle:alignRight',
    ],
    styles: ['full', 'alignLeft', 'alignCenter', 'alignRight'],
    type: ['JPEG', 'JPG', 'GIF', 'PNG'],
  },

  heading: {
    options: [
      {
        model: 'paragraph',
        view: 'p',
        title: '본문',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading1',
        view: 'h1',
        title: '헤더1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: '헤더2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: '헤더3',
        class: 'ck-heading_heading3',
      },
    ],
  },

  placeholder: '당신이 이야기를 적어주세요.',
};

const Editor = ({ ...rest }) => (
  <CKEditor editor={ClassicEditor} config={editorConfiguration} {...rest} />
);

export default Editor;
