create extension if not exists "uuid-ossp";

create table if not exists public."Partner" (
  id uuid primary key default uuid_generate_v4(),
  "secretKey" text not null unique,
  "referrerCode" text not null unique,
  "commissionRate" numeric not null default 0.2,
  "createdAt" timestamp without time zone not null default now()
);
