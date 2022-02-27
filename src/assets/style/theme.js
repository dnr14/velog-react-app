const theme = {
  colors: {
    brandColor1: `rgb(18, 184, 134)`,
    brandColor2: `rgb(46, 204, 113)`,
    brandColor3: `rgba(46, 204, 113, 0.8)`,
    brandColor4: `rgba(18, 184, 134, 0.8)`,
    darks: {
      1: `rgb(33, 37, 41)`,
      2: `rgb(52, 58, 64)`,
      3: `rgba(0, 0, 0, 0.043)`,
      4: `rgb(134, 142, 150)`,
      5: `rgb(73, 80, 87)`,
    },
    whites: {
      1: `rgb(241, 243, 245)`,
      2: `rgb(248, 249, 250)`,
      3: `rgb(233, 236, 239)`,
      4: `rgba(233, 236, 239, 0.8)`,
      5: `rgba(134, 142, 150, 0.8)`,
    },
    reds: {
      1: `#e74c3c`,
    },
  },
  media: {
    tab1: `@media screen and (max-width: 767px)`,
    tab2: `@media screen and (max-width: 944px)`,
    pc1: `@media screen and (max-width: 1056px)`,
    pc2: `@media screen and (max-width: 1440px)`,
    pc3: `@media screen and (max-width: 1919px)`,
  },
};

export const tab1 = ({ theme }) => theme.media.tab1;
export const tab2 = ({ theme }) => theme.media.tab2;
export const pc1 = ({ theme }) => theme.media.pc1;
export const pc2 = ({ theme }) => theme.media.pc2;
export const pc3 = ({ theme }) => theme.media.pc3;
export const getBrandColor1 = ({ theme }) => theme.colors.brandColor1;
export const getBrandColor2 = ({ theme }) => theme.colors.brandColor2;
export const getBrandColor3 = ({ theme }) => theme.colors.brandColor3;
export const getBrandColor4 = ({ theme }) => theme.colors.brandColor4;
export const getDarkColor1 = ({ theme }) => theme.colors.darks[1];
export const getDarkColor2 = ({ theme }) => theme.colors.darks[2];
export const getDarkColor3 = ({ theme }) => theme.colors.darks[3];
export const getDarkColor4 = ({ theme }) => theme.colors.darks[4];
export const getDarkColor5 = ({ theme }) => theme.colors.darks[5];
export const getWhiteColor1 = ({ theme }) => theme.colors.whites[1];
export const getWhiteColor2 = ({ theme }) => theme.colors.whites[2];
export const getWhiteColor3 = ({ theme }) => theme.colors.whites[3];
export const getWhiteColor4 = ({ theme }) => theme.colors.whites[4];
export const getWhiteColor5 = ({ theme }) => theme.colors.whites[5];
export const getRedColor1 = ({ theme }) => theme.colors.reds[1];

export default theme;
