using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace proyectoAnalisis2.DTOS
{
    public class Retiro
    {
        public long TarjetaId { get; set; }

        public decimal Monto { get; set; }

        //A: Ahorro, M:Monetaria
        public string tipoCuenta { get; set; }
    }
}
