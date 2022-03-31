using System.ComponentModel.DataAnnotations;

namespace ACServiceAPI.Models
{
    public class LoginModel
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        public string password { get; set; }
    }
}
