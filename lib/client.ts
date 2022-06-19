import  { MongoClient } from 'mongodb';

class Client {
  client: MongoClient
  courses: any

  constructor() {
    this.client = new MongoClient(process.env.pass!);
  }

  async connect() {
    await this.client.connect();
    this.courses = this.client.db('edu_hackathon').collection('courses');
  }

  async disconnect() {
    await this.client.close();
  }

  async addItem(item: any) {
    await this.courses.insertOne(item);
  }
  
  async getItems() {
    return await this.courses.find({}).toArray();
  }
}

export default Client