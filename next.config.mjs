export default (env) => {
  if (env.PHRASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://konoha33:1IW9wmZW2oitCmUB@cluster0.6enjubo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "threads",
        NEXTAUTH_SECRET: "fshsdfgkjghfktnjhrtbbhbteshvcers",
      },
    };
  } else {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://konoha33:1IW9wmZW2oitCmUB@cluster0.6enjubo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "threads",
        NEXTAUTH_SECRET: "fshsdfgkjghfktnjhrtbbhbteshvcers",
      },
    };
  }
};
