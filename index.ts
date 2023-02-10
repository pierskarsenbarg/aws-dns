import * as aws from "@pulumi/aws";

// First you need a hosted zone 
const hostedZone = new aws.route53.Zone("example2.com",{
    name: "example2.com"
});

// Get the nameservers to add to your DNS registrar
export const zone = hostedZone.nameServers;

// Apex domain record:
const apexRecord = new aws.route53.Record("arecord", {
    zoneId: hostedZone.zoneId,
    name: "example2.com",
    type: aws.route53.RecordType.A,
    records: ["127.0.0.1"], // IP address you want to point the record to
    ttl: 3600
});

// Subdomain
const subDomain = new aws.route53.Record("subdomain", {
    zoneId: hostedZone.zoneId,
    name: "www",
    type: aws.route53.RecordType.A,
    records: ["127.0.0.1"],
    ttl: 3600
});

// Subdomain CNAME
const subdomainCname = new aws.route53.Record("subdomainCname", {
    zoneId: hostedZone.zoneId,
    name: "dev",
    type: aws.route53.RecordType.CNAME,
    records: ["www.example2.com"],
    ttl: 3600
})