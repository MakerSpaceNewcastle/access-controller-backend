const {UserModel} = require('../models/user');
const UserService = require('../services/users')
const DeviceService = require('../services/devices');
const { DeviceModel } = require('../models/device');

const PermissionModel  = require('../models/permission');


exports.getHashesForDevice = async (devicename) => {
    //Find the device ID from the device table.
    let device = await DeviceService.getDeviceByName(devicename);
    if (device == undefined) {
        throw Error("Device does not exist");
    }

    let hashes = [];
    if (device.available) {
        //If the device is available, go and find all the hashes of the users who should be able to access it
        hashes = await PermissionModel.getHashesByDeviceId(device.id);
    }
    return hashes;
}