const { json } = require('express');
const DeviceModel = require('../models/device');
const PermissionsModel = require ('../models/permission')

exports.getAllDevices = async () => {
    return await DeviceModel.find();
}

exports.getDeviceById = async (id) => {
    return await DeviceModel.findById(id);
}

exports.getDeviceByName = async (name) => {
    return await DeviceModel.findByName(name);
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