using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IEventoPersistence
    {
        Task<Evento[]> BuscarEventosPorTemaAsync(string tema, bool includePalestrantes = false);
        Task<Evento[]> ListarTodosEventosAsync(bool includePalestrantes = false);
        Task<Evento> BuscarEventoPorIdAsync(int eventoId, bool includePalestrantes = false);
    }
}