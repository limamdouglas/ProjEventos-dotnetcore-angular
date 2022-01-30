using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using Microsoft.AspNetCore.Http;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventoService eventoService;

        public EventosController(IEventoService eventoService)
        {
            this.eventoService = eventoService;
        }

        [HttpGet]
        public async Task<IActionResult> ListarTodos()
        {
            try
            {
                 var eventos = await this.eventoService.ListarTodosEventosAsync(true);
                 if (eventos == null) return NoContent();

                 return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> BuscarPorId(int id)
        {
            try
            {
                 var evento = await this.eventoService.BuscarEventoPorIdAsync(id, true);
                 if (evento == null) return NoContent();

                 return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{tema}/tema")]
        public async Task<IActionResult> BuscarPorTema(string tema)
        {
            try
            {
                 var eventos = await this.eventoService.BuscarEventosPorTemaAsync(tema, true);
                 if (eventos == null) return NoContent();

                 return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(EventoDto model)
        {
            try
            {
                 var evento = await this.eventoService.IncluirEvento(model);
                 if(evento == null) return NoContent();

                 return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar evento. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, EventoDto model)
        {
            try
            {
                 var evento = await this.eventoService.EditarEvento(id, model);
                 if(evento == null) return NoContent();

                 return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar evento. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                 var evento = await eventoService.BuscarEventoPorIdAsync(id, true);
                 if(evento == null) return NoContent();

                 return await eventoService.ExcluirEvento(id)
                        ? Ok(new { message = "Deletado"})
                        : throw new Exception("Ocorreu um problema ao deletar o evento.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar excluir evento. Erro: {ex.Message}");
            }
        }
    }
}
