using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace proyectoAnalisis2.DTOS
{
    public class Deposito
    {
        public long TarjetaId { get; set; }

        public string CuentaBancaria { get; set; }

        public decimal Monto { get; set; }
    }
}
