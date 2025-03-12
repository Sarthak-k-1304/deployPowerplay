import { Client, ID, Databases, Storage, Query } from "appwrite";
import { conf } from "../conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createUser({ UserName, theme }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteUserCollectionID,
        ID.unique(),
        {
          UserName,
          theme,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: creatuser error", error.response);
    }
  }

  async checkUser(userName) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteUserCollectionID,
        [Query.equal("UserName", userName)]
      );
      return response.documents.length > 0;
    } catch (error) {
      console.log("Appwrite service :: userExisted", error.response);
    }
  }

  async createRow({ UserId, Game, Won, Lost, Date }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        ID.unique(),
        {
          Game,
          Won,
          Lost,
          Date,
          UserId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createTable error", error.response);
    }
  }

  async getTable(userName, limit, offset) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        [
          Query.equal("UserId", userName),
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc("$createdAt"),
        ]
      );
    } catch (error) {
      console.log("Appwrite service :: getTable error", error.response);
    }
  }

  async uploadImg(file, userName) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketID,
        `${userName}-${ID.unique()}`,
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadImg error", error);
    }
  }

  async getUserImage(userName) {
    try {
      const response = await this.bucket.listFiles(conf.appwriteBucketID, [
        Query.startsWith("$id", `${userName}`), // Match files starting with "userName-"
        Query.orderDesc("$createdAt"), // Sort by creation date, descending
      ]);

      const file = response.files[0];
      console.log(response);

      if (file) {
        console.log("Latest image ID:", file.$id);
        const imgurl = this.bucket.getFilePreview(
          conf.appwriteBucketID,
          file.$id
        );
        console.log(imgurl);
        return imgurl;
      } else {
        console.log("No image found for user:", userName);
        return null;
      }
    } catch (error) {
      console.log("Appwrite service :: getUserImage error", error);
    }
  }
}

export const service = new Service();
