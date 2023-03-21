// @ts-ignore
import CircularDependencyPlugin from 'circular-dependency-plugin';
// @ts-ignore
import CracoAlias from 'craco-alias';
import path from 'path';

import { getLoader, loaderByName, whenDev } from '@craco/craco';
import type { CracoConfig } from '@craco/craco';

const resolvePackage = (relativePath: string) => path.join(__dirname, relativePath);

const config: CracoConfig = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.json',
      },
    },
  ],
  webpack: {
    plugins: {
      add: [
        // 开发环境
        ...whenDev(
          () => [
            // 检测循环依赖
            new CircularDependencyPlugin({
              exclude: /node_modules/,
              include: /src/,
              failOnError: true,
              allowAsyncCycles: false,
              cwd: process.cwd(),
            }),
          ],
          [],
        ),
      ],
    },
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
      if (isFound) {
        const include = Array.isArray((match as any).loader.include)
          ? (match as any).loader.include
          : [(match as any).loader.include];
        // features 中的文件是不需要发布的包，只在这个Monorepo中重复使用。
        // 需要在使用应用的webpack中添加配置
        (match as any).loader.include = include.concat([resolvePackage('../../features')]);
      }
      return webpackConfig;
    },
  },
};

export default config;
