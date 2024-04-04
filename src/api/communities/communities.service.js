import * as communitiesRepository from './communities.repository.js';
import * as usersRepository from '../users/users.repository.js';

async function create(req, res) {
  try {
    const userId = req.auth.payload.sub;
    const community = await communitiesRepository.create({
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
  const communities = await communitiesRepository.getAll();
  return communities;
}

async function getByAddress({ normalizedAddress }) {
  const community = await communitiesRepository.getByAddress({ normalizedAddress });
  return community;
}

async function getById({ _id }) {
  const community = communitiesRepository.getById({ ids: [_id] });
  return community;
}

async function getByUserId({ _id }) {
  const user = await usersRepository.getById({ id: _id });
  const communitiesIds = user.community_id;
  const community = await getById({ _id: communitiesIds });
  return community;
}

export {
  getById,
  getAll,
  create,
  getByAddress,
  getByUserId,
};
