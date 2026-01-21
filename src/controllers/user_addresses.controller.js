import { userAddressesService } from '../services/user_addresses.service.js';
import { logger } from '../utils/logger.js';

const parseId = (value) => {
  if (!value) {
    const error = new Error('Invalid address id');
    error.status = 400;
    throw error;
  }
  return value;
};

const handleError = (error, req, res) => {
  const status = error.status || 500;
  logger.error('Request failed', {
    error: {
      message: error.message,
      stack: error.stack,
    },
    trace: {
      id: req.requestId,
    },
    http: {
      response: {
        status_code: status,
      },
    },
  });
  res.status(status).json({ message: error.message || 'Unexpected error' });
};

export const userAddressesController = {
  async create(req, res) {
    try {
      const userAddress = await userAddressesService.createUserAddress(req.body);
      res.status(201).json(userAddress);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async list(req, res) {
    try {
      const userAddresses = await userAddressesService.listUserAddresses();
      res.json(userAddresses);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async getById(req, res) {
    try {
      const id = parseId(req.params.id);
      const userAddress = await userAddressesService.getUserAddressById(id);
      res.json(userAddress);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async update(req, res) {
    try {
      const id = parseId(req.params.id);
      const userAddress = await userAddressesService.updateUserAddress(
        id,
        req.body,
      );
      res.json(userAddress);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async remove(req, res) {
    try {
      const id = parseId(req.params.id);
      const userAddress = await userAddressesService.deleteUserAddress(id);
      res.json(userAddress);
    } catch (error) {
      handleError(error, req, res);
    }
  },
};

