import * as communitiesRepository from './communities.repository.js';

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
    console.error(error);
    res.status(500).send({ message: 'No se ha podido crear la comunidad' });
  }
}

async function getAll(req, res) {
  try {
    const communities = await communitiesRepository.find().populate({
      path: 'incidences',
      select: 'status category description',
    });
    res.status(200).send(communities);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al acceder a las comunidades' });
  }
}

// async function getByAddress(req, res) {
//   try {
//     const { address } = req.query;
//     if (!address) {
//       return res
//         .status(400)
//         .send({ message: 'Por favor, introduce una dirección válida' });
//     }
//     const searchRegex = new RegExp(address, 'i');
//     const communities = await communitiesRepository.find({
//       address: searchRegex,
//     }).sort({ createdAt: -1 });
//     res.status(200).send(communities);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .send({ message: 'Error al buscar comunidades por dirección' });
//   }
// }

async function getById(req, res) {
  try {
    const community = await communitiesRepository.findById(req.params._id);
    res.status(200).send(community);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al buscar comunidad por id' });
  }
}

export {
  getById,
  getAll,
  create,
  // getByAddress,
};
