import fs from 'fs';
import path from 'path';
import type { Compiler, Plugin } from 'webpack';

class TidyPlugin implements Plugin {
  public apply = (compiler: Compiler): void => {
    const logger = compiler.getInfrastructureLogger('TidyPlugin');
    compiler.hooks.emit.tap('TidyPlugin', ({ assets }) => {
      const tidyDir = path.resolve(compiler.outputPath);
      fs.readdir(tidyDir, (readdirErr, files) => {
        if (readdirErr) {
          logger.warn('Could not tidy directory', tidyDir, readdirErr);
        } else {
          files
            .filter((file) => !assets[file])
            .forEach((file) => {
              fs.unlink(path.resolve(tidyDir, file), (unlinkErr) => {
                if (unlinkErr) {
                  logger.warn('Could not delete asset', file, unlinkErr);
                } else {
                  logger.log('Deleted asset', file);
                }
              });
            });
        }
      });
    });
  };
}

export default TidyPlugin;
