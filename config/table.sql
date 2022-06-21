CREATE TABLE cakes (
	id serial NOT NULL,
	name varchar NOT NULL UNIQUE,
	price numeric NOT NULL,
	image varchar NOT NULL,
	description TEXT NOT NULL
);

CREATE TABLE orders (
	id serial NOT NULL,
	"clientId" integer NOT NULL,
	"cakeId" integer NOT NULL,
	quantity integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"totalPrice" numeric NOT NULL
);

CREATE TABLE clients (
	id serial NOT NULL,
	name varchar NOT NULL UNIQUE,
	address varchar NOT NULL,
	phone varchar NOT NULL
);