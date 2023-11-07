const { json } = require('express');
const DeviceModel = require('../models/device');
const PermissionsModel = require ('../models/permission')

exports.getAllDevices = async () => {
    //This doesn't show all the users per device.
    return await DeviceModel.find();
}

exports.getDeviceById = async (id) => {
    let device = await DeviceModel.findById(id);

    if (device !== undefined) {
        let users = await PermissionsModel.findUsersForDevice(id);
        device["users"] = users;
    }
    return device;
}

exports.getDeviceByName = async (name) => {
    let device = await DeviceModel.findByName(name);

    if (device !== undefined) {
        let users = await PermissionsModel.findUsersForDevice(id);
        device["users"] = users;
    }
    return device;
}

exports.createDevice = async (device) => {
    return await DeviceModel.create(device);
}

exports.updateDevice = async(device) => {
    return await DeviceModel.update(device);
}

exports.deleteDevice = async(deviceid) => {
    await DeviceModel.delete(deviceid)
    //Delete any permissions associated with this device.
    await PermissionsModel.deleteByDeviceId(deviceid);
}