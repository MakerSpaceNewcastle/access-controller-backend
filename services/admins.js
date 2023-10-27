const { json } = require('express');
const AdminModel = require('../models/admin');


exports.getAllAdmins = async () => {
    return await AdminModel.find();
}

exports.delete = async (id) => {
    return await AdminModel.delete(id);
}

exports.getAdminById = async (id) => {
    return await AdminModel.findById(id);
}

exports.createOrUpdateAdmin = async (admin) => {
    if (admin.id !== undefined) {
        let result = await AdminModel.update(admin);
        return result;
    }
    else {
        return await  AdminModel.create(admin);
    }

}