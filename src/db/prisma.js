const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

// 1. Initialize a standard Node-Postgres connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// 2. Wrap it with Prisma's dedicated v7 Driver Adapter
const adapter = new PrismaPg(pool);

// 3. Instantiate PrismaClient by injecting the adapter
const prisma = new PrismaClient({ adapter });

module.exports = prisma;


//const { PrismaClient } = require('@prisma/client');
//
////const { PrismaClient } = require('@prisma/client/index.js');
//
////const { PrismaClient } = require('../generated/client');
////const prisma = new PrismaClient();
//const prisma = new PrismaClient({
//  datasourceUrl: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/shortener"
//});
////const prisma = new PrismaClient({
////    datasources: {
////        db: {
////            url: process.env.DATABASE_URL,
////        },
////    },
////});
//
//module.exports = prisma;
