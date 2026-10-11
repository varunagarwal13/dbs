# Database API runtime

The active API connector is now the Java JDBC service in `../java-backend`. The older Flask files in this folder are retained as historical/reference scripts, but they are no longer the intended runtime.

Run the Java service from `java-backend` with `mvn compile exec:java` after configuring Oracle credentials in `java-backend/.env` or environment variables. It listens on port 5000 by default, so the existing frontends keep their API URL.
