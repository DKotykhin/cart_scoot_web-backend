import { basename } from 'path';

import { GraphQLError } from 'graphql';

import UserModel from '../models/User.js';
import { findUserById, findUserByIdAndRole, checkAuth } from '../utils/_index.js';

class UploadService {

    async uploadAvatarUrl(_id, avatarURL) {
        await findUserById(_id);

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id },
            {
                $set: { avatarURL }
            },
            { new: true },
        );
        if (!updatedUser) {
            throw new GraphQLError("Modified forbidden")
        } else return updatedUser
    }

    async deleteAvatarUrl(_id) {
        await findUserById(_id);

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id },
            { avatarURL: null },
            { new: true },
        );

        return updatedUser;
    }

    async uploadLicenseUrl(_id, licenseURL) {
        await findUserById(_id);

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id },
            {
                $push: { 'license.url': licenseURL },
                $set: { 'license.status': 'PENDING' }
            },
            { new: true },
        );
        if (!updatedUser) {
            throw new GraphQLError("Modified forbidden")
        } else return updatedUser
    }

    async deleteLicenseUrl(_id) {
        const user = await findUserById(_id);

        const imageKeyList = user.license.url.map(item => basename(item));

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id },
            { 'license.url': [] },
            { new: true },
        );

        if (!updatedUser) {
            throw new GraphQLError("Modified forbidden")
        } else return { imageKeyList, updatedUser };
    }

    async changeLicenseStatus(status, role, token) {
        const { _id } = checkAuth(token);
        await findUserByIdAndRole(_id, role);

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id },
            {
                $set: { 'license.status': status }
            },
            { new: true },
        );
        if (!updatedUser) {
            throw new GraphQLError("Modified forbidden")
        } else return updatedUser
    }

}

export default new UploadService;