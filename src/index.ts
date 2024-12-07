// index.ts

import connectMongoDb from "./connections/MonoDbConnection";
import app from "./app";
// import connectPostgresDb from "./connections/PostgreDbConnection";

const port = process.env.PORT;

const startServer = async () => {
  try {

    // Establish the database connection
    // await connectMongoDb();
    // await connectPostgresDb();

    app.listen(port, () => {
      console.log(
        `[server]: Hello, Server is running at http://localhost:${port}`
      );
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
