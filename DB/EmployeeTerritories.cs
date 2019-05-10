using System;
using System.Collections.Generic;

namespace DB
{
    public partial class EmployeeTerritories
    {
        public int EmployeeID { get; set; }
        public string TerritoryID { get; set; }

        public virtual Employees Employee { get; set; }
        public virtual Territories Territory { get; set; }
    }
}
