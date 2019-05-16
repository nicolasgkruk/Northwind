using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DB
{
    public partial class Customers
    {
        public Customers()
        {
            CustomerCustomerDemo = new HashSet<CustomerCustomerDemo>();
            Orders = new HashSet<Orders>();
        }

        [StringLength(5)]
        [Required(ErrorMessage = "Por favor, rellene el identificador de la empresa. Este campo es obligatorio. Recuerde que solo se permiten cinco caracteres (solo letras y/o números: no se permiten espacios ni símbolos).")]
        [RegularExpression("^[a-zA-Z0-9]{5}$")]
        [Display(Name = "Identificador")]
        public string CustomerID { get; set; }

        [Display(Name = "Empresa")]
        [Required(ErrorMessage = "Por favor, rellene el nombre de la empresa. Este campo es obligatorio.")]
        public string CompanyName { get; set; }

        [Display(Name = "Persona de contacto")]
        public string ContactName { get; set; }

        [Display(Name = "Cargo")]
        public string ContactTitle { get; set; }

        [Display(Name = "Dirección")]
        public string Address { get; set; }

        [Display(Name = "Ciudad")]
        public string City { get; set; }

        [Display(Name = "Región")]
        public string Region { get; set; }

        [Display(Name = "Código postal")]
        public string PostalCode { get; set; }

        [Display(Name = "País")]
        public string Country { get; set; }

        [Display(Name = "Teléfono")]
        public string Phone { get; set; }

        public string Fax { get; set; }

        public virtual ICollection<CustomerCustomerDemo> CustomerCustomerDemo { get; set; }
        [JsonIgnore]
        public virtual ICollection<Orders> Orders { get; set; }
    }
}
