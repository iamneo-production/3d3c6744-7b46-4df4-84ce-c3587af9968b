using System.ComponentModel.DataAnnotations;
using static System.Net.Mime.MediaTypeNames;

namespace ACServiceAPI.Models
{
    public class ServiceCenterModel
    {
        [Key]
        [Required]
        public int serviceCenterID { get; set; }

        [Required]
        public string serviceCenterName { get; set; }

        [Required]
        [Phone]
        public string serviceCenterPhone { get; set; }

        [Required]
        public string serviceCenterAddress { get; set; }

        [Required]
        public string serviceCenterImageUrl { get;  set; }

        [Required]
        [EmailAddress]
        public string serviceCentermailId { get; set; }

        [Required]
        [MinLength(50)]
        public string serviceCenterDescription { get; set; }
    }
}

