using System.Threading.Tasks;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos
{
    public interface IEventoService
    {
        Task<EventoDto> IncluirEvento(EventoDto model);
        Task<EventoDto> EditarEvento(int eventoId, EventoDto model);
        Task<bool> ExcluirEvento(int eventoId);

        Task<EventoDto[]> ListarTodosEventosAsync(bool includePalestrantes = false);
        Task<EventoDto[]> BuscarEventosPorTemaAsync(string tema, bool includePalestrantes = false);
        Task<EventoDto> BuscarEventoPorIdAsync(int eventoId, bool includePalestrantes = false);
    }
}
