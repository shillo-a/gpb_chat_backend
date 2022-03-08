import User from "../models/User.js"

export class CustomValidators {

    static async isUserExists(userKey){
        const user = await User.findOne({
            where: {key: userKey}
        })

        return user ? true : false
    }

}