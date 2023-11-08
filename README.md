# Authetication Module

A secure authentication API built with NestJS and integrated with MongoDB Atlas, providing user registration and sign-in functionalities.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Node.js Version Requirement](#node-js-version-requirement)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Configuaration](#configuration)
  - [Installation](#installation)
- [Postman Collection](#postman-collection)
- [Tech Stack](#tech-stack)
- [Deployment](#deployment)

## Introduction

This backend API is designed to support user registration and authentication for users. It leverages the powerful NestJS framework to provide a scalable and maintainable solution. MongoDB Atlas serves as the database, ensuring data persistence and reliability.

## Features

- User registration with password validation.
- User authentication with JWT token generation.
- MongoDB Atlas database integration for user data storage.

## Node.js Version Requirement

Authentication Module requires Node.js version 18.16.0 to run. Ensure that you have Node.js 18 or a compatible version installed on your system.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following software installed and configured:

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/)

### Configuration

To configure the application, you can edit the .env file with your specific settings, such as MongoDB connection details and secret keys.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dcodewizard/auth-server.git
   cd server-app
   ```

2. Build and start the server:

   ```bash
   npm i
   npm run start:dev
   ```

This will create and start the backend at [http://localhost:5000]

## Postman-collection

Explore the authentication module using the Postman collection:

- [Authentication Module Postman Collection](https://api.postman.com/collections/31034066-e435f7be-644c-4aac-9f90-3f8f8f3cbbf1?access_key=PMAT-01HEQGSRHCBH3Y4RCRYNM2ANVZ)

## tech-stack

This tech stack forms the foundation of authentication module, providing a powerful registration and authentication for to access application.

- **Backend:**

  - Nestjs

- **Database:**

  - MongoDb Atlas

## Deployemnt

The backend is accessible for testing and integration using Postman at [http://localhost:5000]. This environment allows you to perform user registration and authentication using the provided endpoints: signup for registration and signin for user authentication. These endpoints are essential for interacting with the API and can be utilized for testing and integration purposes.
