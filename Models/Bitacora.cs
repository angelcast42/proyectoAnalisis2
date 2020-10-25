using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace proyectoAnalisis2.Models
{
    public class Bitacora
    {
        [Key]
        public long BitacoraId { get; set; }

        [ForeignKey("CuentaBancariaId")]
        public long CuentaBancariaOrigen { get; set; }

        [ForeignKey("CuentaBancariaId")]
        public long CuentaBancariaDestino { get; set; }

        public Decimal Monto { get; set; }
    }
}
