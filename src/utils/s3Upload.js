import AWS from 'aws-sdk';

const s3Upload = file => {
  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      // API_KEY는 웹팩에서 설정
      IdentityPoolId: API_KEY, // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: BUCKET,
      Key: file.name,
      Body: file,
    },
  });
  return upload;
};

export default s3Upload;
