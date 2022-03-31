using System.ComponentModel.DataAnnotations;

namespace ACServiceAPI.Models
{
    public class AdminModel
    {
        [Key]
        public int AdminID { get; set; }
        [Required]
        public string userRole { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        [StringLength(10)]
        public string mobileNumber { get; set; }
        [Required]
        public string password { get; set; }

    }
}
