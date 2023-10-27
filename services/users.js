const { json } = require('express');
const UserModel = require('../models/user');
const RfidModel = require('../models/rfid');
const PermissionModel = require('../models/permission')
const DeviceModel = require ('../models/device');

exports.getAllUsers = async () => {
    return await UserModel.find();
}

exports.getUserById = async (id) => {
    let user = await UserModel.findById(id);

    if (user !== undefined) {
        user.rfids = await RfidModel.findByUserId(id);
        let allowedDevices = await PermissionModel.findDevicesForUser(id);
        user.permissions = allowedDevices;
    }
    return user;
}

exports.createOrUpdateUser = async (user) => {
    //Create or update depending on whether user id is set.
    if (user.id !== undefined) {
        let result = await UserModel.update(user);
        }
        else {
           let userId = await UserModel.create(user);
           //Store the created user ID here.
           user.id = userId;
        }
        //Delete all the user's RFIDs
        await RfidModel.deleteByUserId(user.id);
        //Add the desired ones.
        for (let i =0; i< user.rfids.length; ++i) {
           //We need to inject the user id into the rfid record so the RfidModel can use it
           //Also can't use map=> as need to use await.
           user.rfids[i].user_id = user.id;
           await RfidModel.create(user.rfids[i])
        };
        //Clear our permissions
        await PermissionModel.deleteByUserId(user.id);
        //As above, inject the user id
        for (let i=0; i<user.permissions.length; ++i) {
            user.permissions[i].user_id = user.id;
            user.permissions[i].device_id = user.permissions[i].id;
            await PermissionModel.create(user.permissions[i]);
        }
}

exports.deleteUser = async(userId) => {
    //Delete the user, and delete all permissions and rfid records for that user.
    let result = await UserModel.delete(userId);
    await RfidModel.deleteByUserId(userId);
    await PermissionModel.deleteByUserId(userId);
    return result;
}
