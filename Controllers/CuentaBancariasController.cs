using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using proyectoAnalisis2.Data;
using proyectoAnalisis2.DTOS;
using proyectoAnalisis2.Models;

namespace proyectoAnalisis2.Controllers
{
    [Route("api/[controller]")]
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
         * Devuelvo Saldo de cuenta y ultimos 5 movimientos
         */
        [HttpGet("saldo/{codigo}")]
        public async Task<ActionResult<StandardResponse>> SaldoCuenta(string codigo)
        {
            Tarjeta tarjeta = await _context.Tarjeta.Where(b => b.Numero == codigo).FirstOrDefaultAsync();
            if (tarjeta == null)
            {
                return NotFound();
            }

            CuentaBancaria cuentaBancaria = await _context.CuentaBancaria.Where(b => b.CuentaBancariaId == tarjeta.CuentaBancariaId).FirstOrDefaultAsync();
            if (cuentaBancaria == null)
            {
                return NotFound();
            }
            else
            {
                List<Bitacora> bitacoraList = await _context.Bitacora.Where(b => b.CuentaBancariaOrigen == cuentaBancaria.CuentaBancariaId).ToListAsync();
                String ultimosMovimientos = "";
                for (int i = 0; i < bitacoraList.Count; i++)
                {
                    if (i > 4)
                    {
                        break;
                    }
                    ultimosMovimientos = ultimosMovimientos + "{'CuentaDestino': "+ bitacoraList.ElementAt(i).CuentaBancariaDestino + ", 'Monto':" + bitacoraList.ElementAt(i).Monto + "},";
                }

                StandardResponse standardResponse = new StandardResponse();
                standardResponse.Code = 200;
                standardResponse.Message = "Consulta Exitosa";
                standardResponse.data = "'Saldo':" + cuentaBancaria.Saldo + ", 'UltimosMovimientos': " + ultimosMovimientos;
                return Ok(standardResponse);
            }
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

        //Consulta saldo de luz
        [HttpGet("consulta-luz/{codigo}")]
        public async Task<ActionResult<StandardResponse>> ConsultaLuz(string codigo)
        {
            ServicioLuz servicioLuz = await _context.ServicioLuz.Where(b => b.Correlativo == codigo).FirstOrDefaultAsync();
            if (servicioLuz == null)
            {
                return NotFound();
            }
            else
            {
                StandardResponse standardResponse = new StandardResponse();
                standardResponse.Code = 200;
                standardResponse.Message = "Servicio Existe";
                standardResponse.data = "Saldo:" + servicioLuz.Saldo + ",cuentaBancaria:" + servicioLuz.CuentaBancariaId; 
                return Ok(standardResponse);
            }
        }

        //Consulta saldo de telefono
        [HttpGet("consulta-tel/{numero}")]
        public async Task<ActionResult<StandardResponse>> ConsultaTel(string numero)
        {
            ServicioTelefono servicioTelefono = await _context.ServicioTelefono.Where(b => b.Telefono == numero).FirstOrDefaultAsync();
            if (servicioTelefono == null)
            {
                return NotFound();
            }
            else
            {
                StandardResponse standardResponse = new StandardResponse();
                standardResponse.Code = 200;
                standardResponse.Message = "Servicio Existe";
                standardResponse.data = "Saldo:" + servicioTelefono.Saldo + ",cuentaBancaria:" + servicioTelefono.CuentaBancariaId;
                return Ok(standardResponse);
            }
        }

        /*
         *Realiza retiro cuenta bancaria
         */
        [HttpPut("retiro")]
        public async Task<ActionResult<StandardResponse>> Retiro(Retiro retiro)
        {
            Tarjeta tarjeta = await _context.Tarjeta.Where(b => b.TarjetaId == retiro.TarjetaId).FirstOrDefaultAsync();
            if (tarjeta == null)
            {
                return NotFound();
            }
            long? cuentaOrigen;
            if (retiro.tipoCuenta.Equals("A"))
            {
                cuentaOrigen = tarjeta.CuentaBancariaAhorroId;
            }
            else
            {
                cuentaOrigen = tarjeta.CuentaBancariaId;
            }
            CuentaBancaria cuentaBancariaOrigen = await _context.CuentaBancaria.Where(b => b.CuentaBancariaId == cuentaOrigen).FirstOrDefaultAsync();
            if (cuentaBancariaOrigen == null)
            {
                return NotFound();
            }
            StandardResponse standardResponse = new StandardResponse();
            if ((cuentaBancariaOrigen.Saldo - retiro.Monto) < 0)
            {
                standardResponse.Code = 200;
                standardResponse.Message = "Saldo Insuficiente";
                standardResponse.data = tarjeta.TarjetaId.ToString();
                return Ok(standardResponse);
            }
            cuentaBancariaOrigen.Saldo -= retiro.Monto;
            _context.Entry(cuentaBancariaOrigen).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            //Guarda Bitacora
            long cuenta = tarjeta.CuentaBancariaId;
            Bitacora bitacora = new Bitacora();
            bitacora.CuentaBancariaDestino = cuenta;
            bitacora.CuentaBancariaOrigen = cuenta;
            bitacora.Monto = retiro.Monto;
            _context.Bitacora.Add(bitacora);
            await _context.SaveChangesAsync();
            
            //Devuuelve Respuesta
            standardResponse.Code = 200;
            standardResponse.Message = "Retiro Exitoso";
            standardResponse.data = tarjeta.TarjetaId.ToString();
            return Ok(standardResponse);
        }

        /*
         *Realiza deposito a cuenta externa
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
            cuentaBancariaDestino.Saldo += deposito.Monto;
            cuentaBancariaOrigen.Saldo -= deposito.Monto;
            
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

            //Guarda Bitacora
            Bitacora bitacora = new Bitacora();
            bitacora.CuentaBancariaDestino = cuentaBancariaDestino.CuentaBancariaId;
            bitacora.CuentaBancariaOrigen = cuentaBancariaOrigen.CuentaBancariaId;
            bitacora.Monto = deposito.Monto;
            _context.Bitacora.Add(bitacora);
            await _context.SaveChangesAsync();
            //Devuelve Respuesta
            standardResponse.Code = 200;
            standardResponse.Message = "Transferencia Exitosa";
            standardResponse.data = tarjeta.TarjetaId.ToString();
            return Ok(standardResponse);
        }


        /*
             *Realiza deposito a cuenta externa
             */
        [HttpPut("pago-servicio")]
        public async Task<ActionResult<StandardResponse>> PagoServicio(PagoServicio pagoServicio)
        {
            Tarjeta tarjeta = await _context.Tarjeta.Where(b => b.TarjetaId == pagoServicio.TarjetaId).FirstOrDefaultAsync();
            if (tarjeta == null)
            {
                return NotFound();
            }
            CuentaBancaria cuentaBancariaOrigen = await _context.CuentaBancaria.Where(b => b.CuentaBancariaId == tarjeta.CuentaBancariaId).FirstOrDefaultAsync();
            if (cuentaBancariaOrigen == null)
            {
                return NotFound();
            }
            StandardResponse standardResponse = new StandardResponse();

            if ((cuentaBancariaOrigen.Saldo - pagoServicio.Monto) < 0)
            {
                standardResponse.Code = 200;
                standardResponse.Message = "Saldo Insuficiente";
                standardResponse.data = tarjeta.TarjetaId.ToString();
                return Ok(standardResponse);
            }
            long cuentaDestino;
            if (pagoServicio.TipoServicio.Equals("T"))
            {
                ServicioTelefono servicioTelefono = await _context.ServicioTelefono.Where(b => b.Telefono == pagoServicio.Correlativo).FirstOrDefaultAsync();
                if (servicioTelefono == null)
                {
                    return NotFound();
                }
                cuentaDestino = servicioTelefono.CuentaBancariaId;
                servicioTelefono.Saldo -= pagoServicio.Monto;
                _context.Entry(servicioTelefono).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    throw;
                }
            }
            else
            {
                ServicioLuz servicioLuz = await _context.ServicioLuz.Where(b => b.Correlativo == pagoServicio.Correlativo).FirstOrDefaultAsync();
                if (servicioLuz == null)
                {
                    return NotFound();
                }
                cuentaDestino = servicioLuz.CuentaBancariaId;
                servicioLuz.Saldo -= pagoServicio.Monto;
                _context.Entry(servicioLuz).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    throw;
                }
            }

            CuentaBancaria cuentaBancariaDestino = await _context.CuentaBancaria.Where(b => b.CuentaBancariaId == cuentaDestino).FirstOrDefaultAsync();
            if (cuentaBancariaDestino == null)
            {
                return NotFound();
            }

            cuentaBancariaDestino.Saldo += pagoServicio.Monto;
            cuentaBancariaOrigen.Saldo -= pagoServicio.Monto;


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

        //Guarda Bitacora
        Bitacora bitacora = new Bitacora();
        bitacora.CuentaBancariaDestino = cuentaBancariaDestino.CuentaBancariaId;
        bitacora.CuentaBancariaOrigen = cuentaBancariaOrigen.CuentaBancariaId;
        bitacora.Monto = pagoServicio.Monto;
        _context.Bitacora.Add(bitacora);
        await _context.SaveChangesAsync();
        //Devuelve Respuesta
        standardResponse.Code = 200;
        standardResponse.Message = "Pago Exitoso";
        standardResponse.data = tarjeta.TarjetaId.ToString();
        return Ok(standardResponse);
    }
}
}

