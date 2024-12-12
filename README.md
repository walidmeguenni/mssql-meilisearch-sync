# Mssql Meilisearch Sync

**Mssql Meilisearch Sync** is a middleware that enables real-time synchronization between Microsoft SQL Server and Meilisearch. This project leverages the power of SQL Server, Node.js, Meilisearch, and Docker to maintain data consistency and provide seamless integration between these technologies.

## Features

- **Real-Time Synchronization**: Automatically sync data between SQL Server and Meilisearch.
- **Scalable and Efficient**: Designed for high performance using Node.js and Docker.
- **Easy Integration**: Works seamlessly with your existing Meilisearch and SQL Server setup.
- **Customizable**: Easily extend the middleware to support custom use cases.

## Technologies Used

- **SQL Server**: Database for storing and managing data.
- **Node.js**: Backend runtime for implementing the synchronization logic.
- **Meilisearch**: Search engine for indexing and searching data.
- **Docker**: Containerization for easy deployment and scalability.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Docker](https://www.docker.com/)
- SQL Server instance
- Meilisearch instance

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mssql-meilisearch-sync.git
   cd mssql-meilisearch-sync
   ```

2. Install dependencies:

   ```bash
   npm install
   ```


## Usage

1. Start the middleware:

   ```bash
   npm start
   ```

2. Run with Docker:

   Build and start the Docker container:

   ```bash
   docker-compose up --build
   ```

   The middleware will automatically connect to the configured SQL Server and Meilisearch instances.

## How It Works

- The middleware listens for changes in the SQL Server database.
- When changes occur, it synchronizes the updated data with Meilisearch in real time.
- It uses efficient data polling and processing to ensure minimal latency.


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Create a pull request describing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

