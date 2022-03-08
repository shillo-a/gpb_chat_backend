import vaidator from 'validator';

export const signinSanitization = (userKey) => {

    const sanitizedUserKey = userKey ? userKey.toLowerCase() : '';

    return {
        sanitizedUserKey
    }
}