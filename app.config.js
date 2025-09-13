const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.kooooichi24.tottene.dev';
  }

  if (IS_PREVIEW) {
    return 'com.kooooichi24.tottene.preview';
  }

  return 'com.kooooichi24.tottene';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'とってね (Dev)';
  }

  if (IS_PREVIEW) {
    return 'とってね (Preview)';
  }

  return 'とってね';
};

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  // android: {
  //   ...config.android,
  //   package: getUniqueIdentifier(),
  // },
});
