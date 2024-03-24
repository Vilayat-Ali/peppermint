import { connect, connections, model, Model, models } from "mongoose";

// models
import UserSchema, { UserZodType } from "./models/user.model";

export class DB {
    public static async establishConnection() {
        try {
            if(!connections[0].readyState) {
                await connect('mongodb://localhost:27017/peppermint');
            }
        } catch(err: any) {
            console.error(err);
            process.exit(1);
        }
    }

    public static getUserModel(): Model<UserZodType> {
        return models.user || model('user', UserSchema)
    }
}