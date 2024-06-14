export default (env) => {
  if (env == "phase-development-server") {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://konoha33:1IW9wmZW2oitCmUB@cluster0.6enjubo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "threads",
        NEXTAUTH_SECRET: "fshsdfgkjghfktnjhrtbbhbteshvcers",
        NEXTAUTH_URL: "http://localhost:3000",
      },
    };
  } else {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://konoha33:1IW9wmZW2oitCmUB@cluster0.6enjubo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "threads",
        NEXTAUTH_SECRET: "fshsdfgkjghfktnjhrtbbhbteshvcers",
        NEXTAUTH_URL: "http://localhost:3000",
      },
    };
  }
};
