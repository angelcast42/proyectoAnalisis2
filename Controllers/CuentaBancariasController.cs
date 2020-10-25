using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using proyectoAnalisis2.Data;
using proyectoAnalisis2.DTOS;
using proyectoAnalisis2.Models;

namespace proyectoAnalisis2.Controllers
{
    [Route("api/[controller]")]
    //[RoutePrefix("atm")]
    [ApiController]
    [Produces(MediaTypeNames.Application.Json)]
    public class CuentaBancariasController : ControllerBase
    {
        private readonly proyectoAnalisis2Context _context;

        public CuentaBancariasController(proyectoAnalisis2Context context)
        {
            _context = context;
        }

        /*
         * Valida si existe tarjeta con numero ingresado
         */ 
        [HttpGet("tarjeta/{codigo}")]
        public async Task<ActionResult<StandardResponse>> ExisteTarjeta(string codigo)
        { 
            Tarjeta tarjeta = await _context.Tarjeta.Where(b => b.Numero == codigo).FirstOrDefaultAsync();
            if (tarjeta == null)
            {
                return NotFound();
            }
            else
            {
                StandardResponse standardResponse = new StandardResponse();
                standardResponse.Code = 200;
                standardResponse.Message = "Codigo Exitoso";
                return Ok(standardResponse);
            }
        }

        /**
         * Valida exista tarjeta con codigo y pin
         */
        [HttpGet("tarjeta/{codigo}/pin/{pin}")]
        public async Task<ActionResult<StandardResponse>> CodigoTarjeta(string codigo,string pin)
        {
            Tarjeta tarjeta = await _context.Tarjeta.Where(b => (b.Numero == codigo && b.Pin == pin)).FirstOrDefaultAsync();
            if (tarjeta == null)
            {
                return NotFound();
            }
            else
            {
                StandardResponse standardResponse = new StandardResponse();
                standardResponse.Code = 200;
                standardResponse.Message = "Pin Exitoso";
                standardResponse.data = tarjeta.TarjetaId.ToString();
                return Ok(standardResponse);
            }
        }

        /*
         *Actualiza Pin de tarjeta
         */
        [HttpPut("cambiar-pin")]
        public async Task<ActionResult<StandardResponse>> CambiarPin(CambioPin cambioPin)
        {
            Tarjeta tarjeta = await _context.Tarjeta.Where(b => (b.TarjetaId == cambioPin.TarjetaId && b.Pin == cambioPin.OldPin)).FirstOrDefaultAsync();
            if (tarjeta == null)
            {
                return NotFound();
            }
            tarjeta.Pin = cambioPin.NewPin;
            _context.Entry(tarjeta).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                    throw;
            }
            StandardResponse standardResponse = new StandardResponse();
            standardResponse.Code = 200;
            standardResponse.Message = "Cambio Pin Exitoso";
            standardResponse.data = tarjeta.TarjetaId.ToString();
            return Ok(standardResponse);
        }

        /*
         *Actualiza Pin de tarjeta
         */
        [HttpPut("deposito")]
        public async Task<ActionResult<StandardResponse>> Deposito(Deposito deposito)
        {
            CuentaBancaria cuentaBancariaDestino = await _context.CuentaBancaria.Where(b => b.NumeroCuenta == deposito.CuentaBancaria).FirstOrDefaultAsync();
            if (cuentaBancariaDestino == null)
            {
                return NotFound();
            }
            Tarjeta tarjeta = await _context.Tarjeta.Where(b => b.TarjetaId == deposito.TarjetaId).FirstOrDefaultAsync();
            if (tarjeta == null)
            {
                return NotFound();
            }
            long cuentaOrigen = tarjeta.CuentaBancariaId;
            CuentaBancaria cuentaBancariaOrigen = await _context.CuentaBancaria.Where(b => b.CuentaBancariaId == tarjeta.CuentaBancariaId).FirstOrDefaultAsync();
            if (cuentaBancariaOrigen == null)
            {
                return NotFound();
            }
            StandardResponse standardResponse = new StandardResponse();
           
            if ((cuentaBancariaOrigen.Saldo - deposito.Monto) < 0)
            {
                standardResponse.Code = 200;
                standardResponse.Message = "Saldo Insuficiente";
                standardResponse.data = tarjeta.TarjetaId.ToString();
                return Ok(standardResponse);
            }
            cuentaBancariaDestino.Saldo = cuentaBancariaDestino.Saldo + deposito.Monto;
            cuentaBancariaOrigen.Saldo = cuentaBancariaOrigen.Saldo - deposito.Monto;
            
            _context.Entry(cuentaBancariaDestino).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            _context.Entry(cuentaBancariaOrigen).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            standardResponse.Code = 200;
            standardResponse.Message = "Transferencia Exitosa";
            standardResponse.data = tarjeta.TarjetaId.ToString();
            return Ok(standardResponse);
        }


        // GET: api/CuentaBancarias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CuentaBancaria>>> GetCuentaBancaria()
        {
            return await _context.CuentaBancaria.ToListAsync();
        }
        
        // GET: api/CuentaBancarias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CuentaBancaria>> GetCuentaBancaria(int id)
        {
            var cuentaBancaria = await _context.CuentaBancaria.FindAsync(id);

            if (cuentaBancaria == null)
            {
                return NotFound();
            }

            return cuentaBancaria;
        }

        

        // POST: api/CuentaBancarias
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CuentaBancaria>> PostCuentaBancaria(CuentaBancaria cuentaBancaria)
        {
            _context.CuentaBancaria.Add(cuentaBancaria);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCuentaBancaria", new { id = cuentaBancaria.CuentaBancariaId }, cuentaBancaria);
        }

        // DELETE: api/CuentaBancarias/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CuentaBancaria>> DeleteCuentaBancaria(int id)
        {
            var cuentaBancaria = await _context.CuentaBancaria.FindAsync(id);
            if (cuentaBancaria == null)
            {
                return NotFound();
            }

            _context.CuentaBancaria.Remove(cuentaBancaria);
            await _context.SaveChangesAsync();

            return cuentaBancaria;
        }

        private bool CuentaBancariaExists(int id)
        {
            return _context.CuentaBancaria.Any(e => e.CuentaBancariaId == id);
        }
        
    }
}
