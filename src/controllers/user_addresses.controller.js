import { userAddressesService } from '../services/user_addresses.service.js';

const parseId = (value) => {
  if (!value) {
    const error = new Error('Invalid address id');
    error.status = 400;
    throw error;
  }
  return value;
};

export const userAddressesController = {
  async create(req, res) {
    const userAddress = await userAddressesService.createUserAddress(req.body);
    res.status(201).json(userAddress);
  },

  async list(req, res) {
    const userAddresses = await userAddressesService.listUserAddresses();
    res.json(userAddresses);
  },

  async getById(req, res) {
    const id = parseId(req.params.id);
    const userAddress = await userAddressesService.getUserAddressById(id);
    res.json(userAddress);
  },

  async update(req, res) {
    const id = parseId(req.params.id);
    const userAddress = await userAddressesService.updateUserAddress(
      id,
      req.body,
    );
    res.json(userAddress);
  },

  async remove(req, res) {
    const id = parseId(req.params.id);
    const userAddress = await userAddressesService.deleteUserAddress(id);
    res.json(userAddress);
  },
};

