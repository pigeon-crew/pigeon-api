import mongoose from "mongoose";

export function connectToDatabase(cb: (err: any) => void) {
  const uri: string | undefined = process.env.ATLAS_URI;
  mongoose.Promise = global.Promise;
  mongoose.connect(uri!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on(
    "error",
    console.error.bind(
      console,
      "MongoDB connection error. Please make sure MongoDB is running."
    )
  );

  mongoose.connection.once("open", () => {
    console.log("MongoDB database connection established succesfully!");
  });
  return cb;
}