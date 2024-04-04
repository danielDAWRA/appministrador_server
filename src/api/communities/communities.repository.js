import communityModel from './communities.model.js';

async function create(req, res) {
  try {
    const userId = req.auth.payload.sub;
    const community = await communityModel.create({
      ...req.body,
      admin: userId,
      incidences: [],
    });
    res
      .status(201)
      .send({ message: 'Comunidad creada con éxito', community });
  } catch (error) {
    res.status(500).send({ message: 'No se ha podido crear la comunidad' });
  }
}

async function getAll() {
  const communities = await communityModel.find().lean();
  return communities;
}

async function getByAddress({ normalizedAddress }) {
  const communities = await communityModel.find({ address: { $regex: normalizedAddress, $options: 'i' } }).sort({ address: 1 }).lean();
  return communities;
}

async function getById({ ids }) {
  const community = await communityModel.find({ _id: { $in: ids } }).lean();
  return community;
}

export {
  getById,
  getAll,
  create,
  getByAddress,
};
