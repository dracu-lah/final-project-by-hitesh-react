import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";
export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL) // Your API Endpoint
      .setProject(conf.projectID); // Your project ID
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.databaseID,
        conf.collectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      );
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error);
      return false;
    }
  }
  async updatePost(slug, { title, slug, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseID,
        conf.collectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error", error);
      return false;
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.updateDocument(
        conf.databaseID,
        conf.collectionID,
        slug,
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseID,
        conf.collectionID,
        slug,
      );
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.getDocument(
        conf.databaseID,
        conf.collectionID,
        queries,
      );
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.bucketID, ID.unique(), file);
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.bucketID, fileId);
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.bucketID, fileId);
    } catch (error) {
      console.error("Appwrite service :: getFilePreview :: error", error);
      return false;
    }
  }
}
const service = new Service();
export default service;
