import * as providersService from './providers.service.js';

async function getAll(req, res) {
  const providers = await providersService.getAll();
  res.json(providers);
}

async function getById(req, res) {
  const { _id } = req.params;
  const provider = await providersService.getById({ _id });
  res.json(provider);
}

export {
  getAll,
  getById,
};
