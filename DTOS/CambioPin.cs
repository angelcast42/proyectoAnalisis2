using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace proyectoAnalisis2.DTOS
{
    public class CambioPin
    {
        public long TarjetaId { get; set; }

        public string OldPin { get; set; }

        public string NewPin { get; set; }
    }
}
