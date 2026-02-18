process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const services = [
  "Auth Service",
  "Payment Service",
  "User Service",
  "API Gateway",
  "Database",
  "Cache Layer",
  "Email Service",
  "Notification Service",
  "Analytics Service",
  "Storage Service",
];

const severities = ["SEV1", "SEV2", "SEV3", "SEV4"];
const statuses = ["OPEN", "MITIGATED", "RESOLVED"];

const owners = [
  "john@example.com",
  "sarah@example.com",
  "mike@example.com",
  "emma@example.com",
  "david@example.com",
  null,
];

const incidentTitles = [
  "High latency detected",
  "Service unavailable",
  "Database connection timeout",
  "Memory leak detected",
  "API rate limit exceeded",
  "Failed deployment",
  "Disk space critical",
  "SSL certificate expiring",
  "Authentication failures",
  "Payment processing errors",
  "Cache invalidation issue",
  "CDN performance degradation",
  "Load balancer misconfiguration",
  "Background job failures",
  "5xx errors spike",
  "Slow query performance",
  "Network connectivity issues",
  "Third-party API outage",
  "Data inconsistency detected",
  "Security vulnerability found",
];

const summaries = [
  "System experiencing degraded performance due to high traffic load.",
  "Critical service outage affecting multiple customers.",
  "Database queries timing out, investigating connection pool.",
  "Memory usage increasing steadily, potential memory leak in recent deployment.",
  "Rate limiting triggered due to unusual traffic patterns.",
  "Deployment rolled back due to failing health checks.",
  "Available disk space below 10%, cleanup required.",
  "SSL certificate expires in 7 days, renewal needed.",
  "Multiple authentication failures reported by users.",
  "Payment gateway returning errors for credit card transactions.",
  null,
];

async function main() {
  console.log("Starting seed...");

  await prisma.incident.deleteMany({});

  const incidents = [];
  const now = new Date();

  for (let i = 0; i < 200; i++) {
    const createdDaysAgo = Math.floor(Math.random() * 90);
    const createdAt = new Date(now);
    createdAt.setDate(createdAt.getDate() - createdDaysAgo);

    const incident = {
      title: incidentTitles[Math.floor(Math.random() * incidentTitles.length)],
      service: services[Math.floor(Math.random() * services.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      owner: owners[Math.floor(Math.random() * owners.length)],
      summary: summaries[Math.floor(Math.random() * summaries.length)],
      createdAt: createdAt,
      updatedAt: createdAt,
    };

    incidents.push(incident);
  }

  await prisma.incident.createMany({
    data: incidents,
  });

  console.log(`Seeded ${incidents.length} incidents successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
