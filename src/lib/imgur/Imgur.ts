import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";
import { ImgurConfig } from "./types";
import fs from "fs";
import FormData from "form-data";
import { delay } from "../../utils/common";

class Imgur {
  readonly baseUrl: string;
  readonly apiVersion: string;
  readonly clientId: string;
  readonly clientSecret: string;

  constructor(config: ImgurConfig) {
    this.baseUrl = config.baseUrl;
    this.apiVersion = config.apiVersion;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
  }

  private async invoke(axiosRequestConfig: AxiosRequestConfig) {
    try {
      axiosRequestConfig.headers = {
        ...axiosRequestConfig.headers,
        Authorization: `Client-ID ${this.clientId}`,
      };

      axiosRequestConfig.url = `${this.baseUrl}/${this.apiVersion}${axiosRequestConfig.url}`;
      return await axios(axiosRequestConfig);
    } catch (e) {
      throw e;
    }
  }
  //
  async uploadImage({ imagePath }: { imagePath: string }) {
    try {
      console.log("uploading");
      const formData = new FormData();
      formData.append("image", fs.createReadStream(imagePath)); //absolute path
      return await this.invoke({
        method: "POST",
        url: "/upload",
        data: formData,
      });
    } catch (e) {
      throw e;
    }
  }

  // TODO USE FOR LOOP THAN PROMISE ALL
  async uploadImages({ imagePaths }: { imagePaths: string[] }) {
    try {
      const responses: any = [];
      for (let imagePath of imagePaths) {
        await delay(5000).then(async () =>
          responses.push((await this.uploadImage({ imagePath })).data.data)
        );
        // responses.push((await this.uploadImage({ imagePath })).data.data);
      }
      return responses;
    } catch (e) {
      throw e;
    }
  }
}

export default Imgur;
