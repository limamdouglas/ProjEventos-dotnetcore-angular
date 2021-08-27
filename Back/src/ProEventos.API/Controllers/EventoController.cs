using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {

        public IEnumerable<Evento> _evento = new Evento[]{
            new Evento{
                EventoId = 1,
                Local = "Rio de Janeiro",
                DataEvento = DateTime.Now.AddDays(2).ToString(),
                Tema = "Angular 11 e .NET Core 5",
                QtdPessoas = 50,
                Lote = "1°",
                ImagemURL = "foto.png"
            },
                new Evento{
                EventoId = 2,
                Local = "São Pualo",
                DataEvento = DateTime.Now.AddDays(5).ToString(),
                Tema = "Front-End: React",
                QtdPessoas = 100,
                Lote = "2°",
                ImagemURL = "imagem.png"
            }
        };

        public EventoController()
        {
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _evento;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetId(int id)
        {
            return _evento.Where(ev => ev.EventoId == id);
        }

        [HttpPost]
        public string Post()
        {
            return "Exemplo de POST";
        }
    }
}
