using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace proyectoAnalisis2.Models
{
    public class Tarjeta
    {
        [Key]
        public long TarjetaId { get; set; }
        
        [ForeignKey("CuentaBancariaId")]
        public long CuentaBancariaId { get; set; }

        [ForeignKey("CuentaBancariaId")]
        public long? CuentaBancariaAhorroId { get; set; }

        public string Pin { get; set; }

        public string Numero { get; set; }
    }
}
