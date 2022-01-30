using System;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class EventoService : IEventoService
    {
        private readonly IGeralPersistence _geralPersist;
        private readonly IEventoPersistence _eventoPersist;
        private readonly IMapper _mapper;

        public EventoService(IGeralPersistence geralPersist, IEventoPersistence eventoPersist, IMapper mapper)
        {
            _mapper = mapper;
            _geralPersist = geralPersist;
            _eventoPersist = eventoPersist;
        }

        public async Task<EventoDto> IncluirEvento(EventoDto model)
    {
        try
        {
            var evento = _mapper.Map<Evento>(model);

            _geralPersist.Add<Evento>(evento);

            if (await _geralPersist.SaveChangesAsync())
            {
                var eventoRetorno = await _eventoPersist.BuscarEventoPorIdAsync(evento.Id, false);

                return _mapper.Map<EventoDto>(eventoRetorno);
            }
            return null;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

        public async Task<EventoDto> EditarEvento(int eventoId, EventoDto model)
    {
        try
        {
            var evento = await _eventoPersist.BuscarEventoPorIdAsync(eventoId, false);
            if (evento == null) return null;

            model.Id = evento.Id;

            _mapper.Map(model, evento);

            _geralPersist.Update<Evento>(evento);

            if (await _geralPersist.SaveChangesAsync())
            {
                var eventoRetorno = await _eventoPersist.BuscarEventoPorIdAsync(evento.Id, false);

                return _mapper.Map<EventoDto>(eventoRetorno);
            }
            return null;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

        public async Task<bool> ExcluirEvento(int eventoId)
    {
        try
        {
            var evento = await _eventoPersist.BuscarEventoPorIdAsync(eventoId, false);
            if (evento == null) throw new Exception("Evento para delete não encontrado.");

            _geralPersist.Delete<Evento>(evento);
            return await _geralPersist.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

        public async Task<EventoDto[]> ListarTodosEventosAsync(bool includePalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersist.ListarTodosEventosAsync(includePalestrantes);
                if (eventos == null) return null;

                var eventoMap = _mapper.Map<EventoDto[]>(eventos);

                return eventoMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto> BuscarEventoPorIdAsync(int eventoId, bool includePalestrantes)
        {
            try
            {
                var evento = await _eventoPersist.BuscarEventoPorIdAsync(eventoId, includePalestrantes);
                if (evento == null) return null;

                var eventoMap = _mapper.Map<EventoDto>(evento);

                return eventoMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto[]> BuscarEventosPorTemaAsync(string tema, bool includePalestrantes)
        {
            try
            {
                var eventos = await _eventoPersist.BuscarEventosPorTemaAsync(tema, includePalestrantes);
                if (eventos == null) return null;

                var eventoMap = _mapper.Map<EventoDto[]>(eventos);

                return eventoMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}