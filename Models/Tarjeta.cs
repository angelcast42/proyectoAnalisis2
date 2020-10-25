using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace proyectoAnalisis2.Models
{
    public class Tarjeta
    {
        public long TarjetaId { get; set; }
        [Key]
        [ForeignKey("CuentaBancariaId")]
        public long CuentaBancariaId { get; set; }

        public string Pin { get; set; }

        public string Numero { get; set; }
    }
}
