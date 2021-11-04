export const newlineCount = body => {
  const regex = /(\\r|\\n|\r|\n)/g;
  let count = 1;
  while (true) {
    const result = regex.exec(body);
    if (result === null) break;
    count += 1;
  }
  return count;
};
