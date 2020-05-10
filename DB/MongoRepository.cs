
using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;

namespace Preferanse.DB
{
    public class MongoRepository
    {
        private IMongoDatabase database;
        public MongoRepository()
        {
            var client = new MongoClient("mongodb+srv://prefuser:miser123@cluster0-hfdau.azure.mongodb.net/test");
            database = client.GetDatabase("test1");
        }

        public void InsertRecord<T>(string table, T record)
        {
            var collection = database.GetCollection<T>(table);
            collection.InsertOne(record);
        }
    }
   

}