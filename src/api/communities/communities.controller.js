import * as communitiesService from './communities.service.js';
// esto esta mal salta directamente al model sin pasar ni por service ni por repo - Se corregirá
// Marc:
// he tenido que trabajar con una de estas funciones
// he comentado los demás y vamos refactorizando el código en cuanto necesitemos una función

// import * as communityModel from './communities.model.js';

// async function create(req, res) {
//   try {
//     const userId = req.auth.payload.sub;
//     const community = await communityModel.create({
//       ...req.body,
//       admin: userId,
//       incidences: [],
//     });
//     res
//       .status(201)
//       .send({ message: 'Comunidad creada con éxito', community });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'No se ha podido crear la comunidad' });
//   }
// }

function normalizeDirection(direction) {
  // Convert the address to lowercase and remove special characters, except numbers and accents
  return direction
    .toLowerCase()
    .normalize('NFD') // Decompose characters with diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]/g, ''); // Remove special characters
}

async function getAll(req, res) {
  try {
    const communities = await communitiesService.getAll();
    res.status(200).send(communities);
  } catch (error) {
    res.status(500).send({ message: 'Error al acceder a las comunidades' });
  }
}

async function getByAddress(req, res) {
  try {
    const { address } = req.body;
    if (!address) {
      res
        .status(400)
        .send({ message: 'Por favor, introduce una dirección válida' });
      return;
    }
    const normalizedAddress = normalizeDirection(address);
    const communities = await communitiesService.getByAddress({ normalizedAddress });
    res.status(200).json(communities);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al buscar comunidades por dirección' });
  }
}

async function getById(req, res) {
  const { _id } = req.params;
  const community = await communitiesService.getById({ _id });
  if (!community) {
    res.status(500).send({ msg: 'Error al buscar comunidad por id' });
  }
  return res.json(community);
}

async function getByUserId(req, res) {
  const { _id } = req.params;
  const communities = await communitiesService.getByUserId({ _id });
  if (!communities) {
    res.status(500).send({ msg: 'Error al buscar comunidad por id' });
  }
  return res.json(communities);
}

export {
  getByAddress,
  getById,
  getByUserId,
  getAll,
//   create,
};
