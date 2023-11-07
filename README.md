# Authetication Module

A secure authentication API built with NestJS and integrated with MongoDB Atlas, providing user registration and sign-in functionalities.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Deployment](#deployment)

## Introduction

This backend API is designed to support user registration and authentication for users. It leverages the powerful NestJS framework to provide a scalable and maintainable solution. MongoDB Atlas serves as the database, ensuring data persistence and reliability.

## Features

- User registration with password validation.
- User authentication with JWT token generation.
- MongoDB Atlas database integration for user data storage.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following software installed and configured:

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/)

### Installation

Clone the repository: git clone (git@github.com:dcodewizard/auth-server.git)

## Configuration

To configure the application, you can edit the .env file with your specific settings, such as MongoDB connection details and secret keys.

## Usage

Use the API for user registration and authentication.

## tech-stack

This tech stack forms the foundation of authentication module, providing a powerful registration and authentication for to access application.

- **Backend:**

  - Nestjs

- **Database:**

  - MongoDb Atlas

## Deployemnt

The backend is accessible for testing and integration using Postman at [http://localhost:5000]. This environment allows you to perform user registration and authentication using the provided endpoints: signup for registration and signin for user authentication. These endpoints are essential for interacting with the API and can be utilized for testing and integration purposes.
