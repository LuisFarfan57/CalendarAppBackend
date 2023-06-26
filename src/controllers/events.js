const { request } = require('express')
const Evento = require('../models/Evento')

const getEventos = async (req = request, res) => {
  try {
    const eventos = await Evento.find({ user: req.uid }).populate('user', 'name')

    return res.json({
      ok: true,
      eventos
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error al obtener los eventos'
    })
  }
}

const createEvento = async (req = request, res) => {
  try {
    // El usuario del evento es quien lo creo
    const newEvento = new Evento({ ...req.body, user: req.uid })

    const savedEvento = await newEvento.save()

    return res.status(201).json({
      ok: true,
      evento: savedEvento
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error al crear el evento'
    })
  }
}

const updateEvento = async (req = request, res) => {
  const eventoId = req.params.id

  try {
    const eventoExistente = await Evento.findById(eventoId)
    console.log(eventoExistente)

    if (!eventoExistente) {
      return res.status(404).json({
        ok: false,
        message: 'El evento no existe'
      })
    }

    // Verificar que el usuario que lo quiere actualizar es el mismo que lo creo
    if (eventoExistente.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        message: 'No autorizado'
      })
    }

    const nuevoEvento = {
      ...req.body,
      user: req.uid
    }

    // new: true para que devuelva los datos actualizados
    const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true })

    return res.status(201).json({
      ok: true,
      evento: eventoActualizado
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error al actualizar el evento'
    })
  }
}

const deleteEvento = async (req = request, res) => {
  const idEvento = req.params.id

  try {
    const evento = await Evento.findById(idEvento)

    if (!evento) {
      return res.status(404).json({
        ok: false,
        message: 'El evento no existe'
      })
    }

    if (evento.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        message: 'No autorizado'
      })
    }

    await Evento.findByIdAndDelete(evento.id)

    return res.json({
      ok: true
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Ha ocurrido un error al eliminar el evento'
    })
  }
}

module.exports = {
  getEventos,
  createEvento,
  updateEvento,
  deleteEvento
}
