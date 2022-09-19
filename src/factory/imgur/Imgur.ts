import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";
import { ImgurConfig } from "./types";
import { ImgurClient } from "imgur";
import { TypeOfExpression } from "typescript";
import fs from "fs";

const client = new ImgurClient({});

class Imgur {
  readonly imgurClient;
  readonly baseUrl: string;
  readonly apiVersion: string;
  readonly clientId: string;
  readonly clientSecret: string;

  constructor(config: ImgurConfig) {
    this.baseUrl = config.baseUrl;
    this.apiVersion = config.apiVersion;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.imgurClient = new ImgurClient({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    });
  }

  async uploadSingleImage({}) {}
  async uploadImages({ imageFormData }: { imageFormData: FormData }) {
    return await this.imgurClient.upload({
      image: fs.createReadStream("../../image/dynamic.png"),
      type: "stream",
    });
  }
}

export default Imgur;
