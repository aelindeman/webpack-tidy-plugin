import fs from 'fs';
import path from 'path';
import type { Compiler, Logger, Plugin } from 'webpack';

export interface TidyPluginRunOptions {
  assets: Record<string, any>;
  logger: Logger;
  outputPath: string;
}

class TidyPlugin implements Plugin {
  public apply = (compiler: Compiler): void => {
    const tidyDir = path.resolve(compiler.outputPath);
    if (tidyDir === '' || tidyDir === '/') {
      throw new Error(
        'Webpack config defines an invalid or unsafe output path'
      );
    }

    compiler.hooks.emit.tap('TidyPlugin', ({ assets }) => {
      TidyPlugin.run({
        outputPath: tidyDir,
        logger: compiler.getInfrastructureLogger('TidyPlugin'),
        assets,
      });
    });
  };

  public static run(options: TidyPluginRunOptions) {
    fs.readdir(options.outputPath, (readdirErr, files) => {
      if (readdirErr) {
        options.logger.warn(
          'Could not tidy directory',
          options.outputPath,
          readdirErr
        );
      } else {
        files
          .filter((file) => !options.assets[file])
          .forEach((file) => {
            fs.unlink(path.resolve(options.outputPath, file), (unlinkErr) => {
              if (unlinkErr) {
                options.logger.warn('Could not delete asset', file, unlinkErr);
              } else {
                options.logger.log('Deleted asset', file);
              }
            });
          });
      }
    });
  }
}

export default TidyPlugin;
