using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace proyectoAnalisis2.DTOS
{
    public class PagoServicio
    {
        public long TarjetaId { get; set; }
        public decimal Monto { get; set; }

        public string Correlativo { get; set; }

        //T: telefono, L: luz
        public string TipoServicio { get; set; }
    }
}
