import mongoose from 'mongoose';

export default class Mongo {
  private static _instance: Mongo = null;

  private readonly uris: string;

  private readonly options: any;

  public static current(): Mongo {
    if (!Mongo._instance) {
      Mongo._instance = new Mongo();
      Mongo._instance.connect();
    }
    return Mongo._instance;
  }

  private constructor() {
    if (Mongo._instance) return;

    this.uris = process.env.MONGO_HOST;

    this.options = {};
  }

  public async connect(): Promise<void> {
    this.options.maxPoolSize = this.options.maxPoolSize || 4;

    // eslint-disable-next-line global-require
    mongoose.Promise = require('bluebird');

    const connectWithRetry = (url: string, options: any) => mongoose
      .connect(url, options, (err) => {
        if (err) {
          console.log(err);
          const reconnectionInterval = Number(
            process.env.MONGO_RECONNECTION_INTERVAL || 5000,
          );
          console.error(
            `Failed to connect to mongo on startup - retrying in ${
              reconnectionInterval / 1000
            } sec`,
            err,
          );
          setTimeout(
            () => connectWithRetry(url, options),
            Number(process.env.MONGO_RECONNECTION_INTERVAL || 5000),
          );
        }
      });

    try {
      await connectWithRetry(this.uris, this.options);
    } catch (error) {
      console.error(error);
    }

    mongoose.connection
      .on('connected', Mongo.onReady)
      .on('disconnected', Mongo.onEnd)
      .on('error', Mongo.onError);
  }

  private static onReady(...args): void {
    console.info(`[+] Mongo connection was successfully established.${args}`);
  }

  private static onEnd(): void {
    console.info('[+] Mongo connection was closed.');
  }

  private static onError(err: any): void {
    console.error(`[-] Couldn't connect to Mongo err => ${err}`);
  }
}
