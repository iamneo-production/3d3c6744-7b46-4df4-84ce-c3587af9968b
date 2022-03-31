using System;
using System.ComponentModel.DataAnnotations;

namespace ACServiceAPI.Models
{

    public class ProductModel
    {
        [Key]
        [Required]
        public int ProductID { get; set; }

        [Required]
        public string productName { get; set; }

        [Required]
        public string productModelNo { get; set; }

        [Required]
        public string dateOfPurchase { get; set; }

        [Required]
        [MinLength(10),MaxLength(10)]
        public string contactNumber { get; set; }

        [Required]
        public string problemDescription { get; set; }

        [Required]
        public string availableSlots { get; set; }

        [Required]
        public string BookingDate { get; set; }

        [Required]
        public string servicecentername { get; set; }

        [Required]
        public int userId { get; set; }

        

    }
}
