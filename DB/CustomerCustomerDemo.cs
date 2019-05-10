using System;
using System.Collections.Generic;

namespace DB
{
    public partial class CustomerCustomerDemo
    {
        public string CustomerID { get; set; }
        public string CustomerTypeID { get; set; }

        public virtual Customers Customer { get; set; }
        public virtual CustomerDemographics CustomerType { get; set; }
    }
}
