import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";
import { ImgurConfig } from "./types";
// import { ImgurClient } from "imgur";
// import { TypeOfExpression } from "typescript";
import fs from "fs";
import FormData from "form-data";

// const client = new ImgurClient({});

class Imgur {
  // readonly imgurClient;
  readonly baseUrl: string;
  readonly apiVersion: string;
  readonly clientId: string;
  readonly clientSecret: string;

  constructor(config: ImgurConfig) {
    this.baseUrl = config.baseUrl;
    this.apiVersion = config.apiVersion;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    // this.imgurClient = new ImgurClient({
    //   clientId: config.clientId,
    //   clientSecret: config.clientSecret,
    // });
  }

  private async invoke(axiosRequestConfig: AxiosRequestConfig) {
    // axiosRequestConfig.params = {
    //   ...axiosRequestConfig.params,
    // };

    axiosRequestConfig.headers = {
      ...axiosRequestConfig.headers,
      Authorization: `Client-ID ${this.clientId}`,
    };

    axiosRequestConfig.url = `${this.baseUrl}/${this.apiVersion}${axiosRequestConfig.url}`;
    console.log(axiosRequestConfig);
    return axios(axiosRequestConfig);
  }

  async uploadSingleImage({}) {}
  // async uploadImages({ imageFormData }: { imageFormData: FormData }) {
  //   return await this.imgurClient.upload({
  //     image: fs.createReadStream("../../image/dynamic.png"),
  //     type: "stream",
  //   });
  // }

  // async uploadImage({ imageFormData }: { imageFormData: FormData }) {
  //   return await this.invoke({
  //     method: "POST",
  //     url: "/upload",
  //     data: imageFormData,
  //   });
  // }

  async uploadImage({ imagePath }: { imagePath: string }) {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath)); //absolute path
    return await this.invoke({
      method: "POST",
      url: "/upload",
      data: formData,
    });
  }

  async uploadImages({ imagePaths }: { imagePaths: string[] }) {
    return await Promise.all(
      imagePaths.map((imagePath) => {
        return this.uploadImage({ imagePath });
      })
    );
  }
}

export default Imgur;
